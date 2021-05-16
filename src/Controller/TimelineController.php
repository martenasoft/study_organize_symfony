<?php

namespace App\Controller;

use App\Controller\Traits\TraitGetCalendarItems;
use App\Controller\Traits\TraitGetCalendarRepository;
use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\DailyChecklist;
use App\Entity\Interfaces\StatusInterface;
use App\Repository\CalendarItemChecklistTagsRepository;
use App\Repository\CalendarItemRepository;
use App\Repository\CalendarRepository;
use App\Repository\DailyChecklistRepository;
use App\Service\EntityValueByIdFactoryService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/timeline")
 */
class TimelineController extends AbstractController
{
    use TraitGetCalendarRepository, TraitGetCalendarItems;

    private EntityManagerInterface $entityManager;
    private CalendarItemRepository $calendarItemRepository;
    private CalendarItemChecklistTagsRepository $calendarItemChecklistTagsRepository;
    private DailyChecklistRepository $dailyChecklistRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        CalendarItemRepository $calendarItemRepository,
        CalendarItemChecklistTagsRepository $calendarItemChecklistTagsRepository,
        DailyChecklistRepository $dailyChecklistRepository
    ) {
        $this->calendarItemRepository = $calendarItemRepository;
        $this->entityManager = $entityManager;
        $this->calendarItemChecklistTagsRepository = $calendarItemChecklistTagsRepository;
        $this->dailyChecklistRepository = $dailyChecklistRepository;
    }

    /**
     * @Route("/", name="timeline_index")
     */
    public function index(Request $request, PaginatorInterface $paginator): Response
    {
        $prev = $request->query->get('prev', 1);
        $next = $request->query->get('next', 1);
        //$this->isActiveOnly(false);
        $dateStart = new \DateTime('now');
        $dateStart->setTime(0, 0);
        $dateEnd = new \DateTime('now');
        $dateEnd->modify('+1 day');
        $dateEnd->setTime(23, 23, 59);

        if ($prev > 1) {
            $dateStart->modify('-'.($prev - 1) .' day');
            $dateEnd->modify('-'.($prev - 1) .' day');
        }

        if ($next > 1) {
            $dateStart->modify('+'.($next - 1) .' day');
            $dateEnd->modify('+'.($next - 1) .' day');
        }

        $timelines = $this
            ->calendarItemRepository
            ->getLoadItems(
                $this->getUser(),
                null,
                $dateStart,
                $dateEnd,
                function (QueryBuilder $queryBuilder, string $alias) {
                    $queryBuilder->orderBy("{$alias}.start", "DESC");
                }
            )
          ;

     //   dump($timelines);die;

        return $this->render(
            'timeline/index.html.twig',
            [
                'timelines' => $timelines,
                'dateStart' => $dateStart,
                'dateEnd' => $dateEnd,
                'prev' => $prev,
                'next' => $next
            ]
        );
    }



    public function index_(Request $request, PaginatorInterface $paginator): Response
    {
        $prev = $request->query->get('prev', 1);
        $next = $request->query->get('next', 1);
        //$this->isActiveOnly(false);
        $dateStart = new \DateTime('now');
        $dateStart->setTime(0, 0);
        $dateEnd = new \DateTime('now');
        $dateEnd->setTime(23, 23, 59);

        if ($prev > 1) {
            $dateStart->modify('-'.($prev - 1) .' day');
            $dateEnd->modify('-'.($prev - 1) .' day');
        }

        if ($next > 1) {
            $dateStart->modify('+'.($next - 1) .' day');
            $dateEnd->modify('+'.($next - 1) .' day');
        }

        $alias = $this
            ->calendarItemRepository
            ->getAlias();

        $queryBuilder = $this
            ->calendarItemRepository
            ->getLoadItemsQueryBuilder(
                $this->getUser(),
                null,
                $dateStart,
                $dateEnd

            )
            ->orderBy(
                $this
                    ->calendarItemRepository->getAlias() . '.start',
                'DESC'
            );


        $query = $queryBuilder->getQuery();


        $pagination = $paginator->paginate(
            $query, /* query NOT result */
            $request->query->getInt('page', 1)
        );

        return $this->render(
            'timeline/index.html.twig',
            [
                'pagination' => $pagination,
                'dateStart' => $dateStart,
                'dateEnd' => $dateEnd,
                'prev' => $prev,
                'next' => $next
            ]
        );
    }

    /**
     * @Route("/status/{id}", name="timeline_status")
     */
    public function status(CalendarItem $calendarItem): Response
    {
        $status = $calendarItem->getStatus();
        $calendarItem
            ->setStatus(
                $status == StatusInterface::STATUS_ACTIVE ?
                    StatusInterface::STATUS_DONE : StatusInterface::STATUS_ACTIVE
            )
            ->setUpdatedAt(new \DateTime('now'));

        $this->entityManager->flush();

        $this->saveDailyStatus(
            $calendarItem,
            DailyChecklist::CALENDAR_ITEM_TYPE,
            $calendarItem->getId(),
            $calendarItem->getStatus(),
            (new \DateTime('now'))->setTime(0,0,0)->format('U')
        );


        return $this->redirectToRoute("timeline_index");
    }

    /**
     * @Route ("/save-daily-status/{id?}/{datatype}/{record}/{unixtime}/{status?}", name="save_daily_status")
     */
    public function saveDailyStatus(
        CalendarItem $calendarItem,
        int $datatype,
        int $record,
        int $status,
        int $unixtime
    ): Response {
        $dailyChecklist = new DailyChecklist();
        $dailyChecklist->setUser($this->getUser());
        $dailyChecklist->setStatus($status);
        $dailyChecklist->setCalendarItem($calendarItem);

        $curdate = new \DateTime();
        if (!empty($unixtime)) {
            $curdate->setTimestamp($unixtime);
        }
        $curdate->setTime(0,0, 0);

        $dailyChecklist->setDatetime((int)$curdate->format('U'));
        $dailyChecklist->setDatatype($datatype);
        $dailyChecklist->setRecordId($record);

        try {
            $this->dailyChecklistRepository->save($dailyChecklist);
            $result = 'ok';
        } catch (\Exception $exception) {
            $result = 'Error';
        }
        return $this->json(['result' => $result]);
    }
}

