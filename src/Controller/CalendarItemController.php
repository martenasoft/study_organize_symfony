<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\CalendarItemChecklistTags;
use App\Entity\Filter\CalendarItem as CalendarItemFilter;
use App\Entity\Interfaces\StatusInterface;
use App\Form\Filter\CalendarItemType as CalendarItemTypeFilter;
use App\Form\CalendarItemType;
use App\Repository\CalendarItemRepository;
use App\Repository\CalendarRepository;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/calendar-item")
 */
class CalendarItemController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private CalendarRepository $calendarRepository;
    private CalendarItemRepository $calendarItemRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        CalendarRepository $calendarRepository,
        CalendarItemRepository $calendarItemRepository
    ) {
        $this->entityManager = $entityManager;
        $this->calendarRepository = $calendarRepository;
        $this->calendarItemRepository = $calendarItemRepository;
    }

    /**
     * @Route("/items", name="calendar_items_ajax")
     */
    public function getItems(
        Request $request
    ): Response {
        $calendarId = $request->query->get('calendarId');
        $start = $request->query->get('start');
        $end = $request->query->get('end');
        if (
            !preg_match('/(\d{4}\-(\d{2})\-(\d{2}))/', $start) ||
            !preg_match('/(\d{4}\-(\d{2})\-(\d{2}))/', $end)) {
            return $this->json(["Error params"], 501);
        }

        if (!empty($calendarId) && is_numeric($calendarId)) {
            $calendarId = [$calendarId];
        }

        $items = $this
            ->calendarItemRepository
            ->getLoadItems($this->getUser(), $calendarId, new \DateTime($start), new \DateTime($end))
            ;
        // return new JsonResponse($serializer->serialize($ret));
        return $this->json(array_values($items));
    }


    /**
     * @Route("/", name="calendar_item_index", methods={"GET"})
     */
    public function index(Request $request, PaginatorInterface $paginator): Response
    {
        $calendarFilterEntity = new CalendarItemFilter();
        $calendarFilterType = $this->createForm(
            CalendarItemTypeFilter::class,
            $calendarFilterEntity,
            [
                'user' => $this->getUser()
            ]
        );

        $calendarFilterType->handleRequest($request);

        $queryBuilder = $this
            ->calendarItemRepository
            ->getItemsByUserQueryBuilder($this->getUser(), $calendarFilterType)
            ->orderBy($this->calendarItemRepository->getAlias() . '.id', 'DESC');

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1)

        );
        return $this->render(
            'calendar_item/index.html.twig',
            [
                'pagination' => $pagination,
                'calendarFilterType' => $calendarFilterType->createView()
            ]
        );
    }

    /**
     * @Route("/new", name="calendar_item_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $calendarItem = new CalendarItem();

        $calendars = $request->get('calendar_item');
        $selectedCalendarsItems = null;

        if (!empty($calendars['calendar'])) {
            $selectedCalendarsItems = $this
                ->calendarRepository
                ->getItemsByUserAndItemsIds($this->getUser(), $calendars['calendar'])
                ->getQuery()
                ->getResult();
        }

        $calendarItem->setCreatedAt(new \DateTime('now'));
        $calendarItem->setStatus(StatusInterface::STATUS_ACTIVE);
        $form = $this->createForm(
            CalendarItemType::class,
            $calendarItem,
            [
                'user' => $this->getUser(),
                'calendars' => $selectedCalendarsItems
            ]
        );

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $calendars = $form->get('calendars')->getData();
            foreach ($calendars as $index => $calendar) {
                $calendarItem->setCalendar($calendar);

                if ($index > 0) {
                    $this->entityManager->persist(clone $calendarItem);
                } else {
                    $this->entityManager->persist($calendarItem);
                }
            }

            $this->entityManager->flush();
            $q = $request->query->get('q');

            if (!empty($q)) {
                $calendarItemChecklistTags = new CalendarItemChecklistTags();
                $calendarItemChecklistTags
                    ->setTag(trim($q))
                    ->setUser($this->getUser())
                    ->setCalendarItem($calendarItem);

                $this->entityManager->persist($calendarItemChecklistTags);
                $calendarItem->setTagsCount($calendarItem->getTagsCount() + 1);
                $this->entityManager->flush();
            }

            return $this->redirectToRoute('calendar_item_show');
        }

        return $this->render(
            'calendar_item/new.html.twig',
            [
                'calendar_item' => $calendarItem,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{id?}", name="calendar_item_show", methods={"GET"})
     */
    public function show(CalendarItem $calendarItem): Response
    {
        if (empty($calendarItem)) {
            throw new NotFoundHttpException();
        }
        return $this->render(
            'calendar_item/show.html.twig',
            [
                'calendar_item' => $calendarItem,
            ]
        );
    }

    /**
     * @Route("/{id}/edit", name="calendar_item_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, CalendarItem $calendarItem): Response
    {
        if ($calendarItem->getCalendar()->getUser()->getId() != $this->getUser()->getId()) {
            throw $this->createAccessDeniedException();
        }
        $form = $this->createForm(
            CalendarItemType::class,
            $calendarItem,
            [
                'user' => $this->getUser(),
                'calendars' => [$calendarItem->getCalendar()],
                'isMultiple' => false
            ]
        );


        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $calendarItem->setUpdatedAt(new \DateTime('now'));
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('calendar_item_index');
        }

        return $this->render(
            'calendar_item/edit.html.twig',
            [
                'calendar_item' => $calendarItem,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{id}/move-to-bin", name="move_calendar_item_to_bin", methods={"GET"})
     */
    public function moveToBin(Request $request, CalendarItem $calendarItem): Response
    {
        if ($calendarItem->getCalendar()->getUser()->getId() != $this->getUser()->getId()) {
            throw $this->createAccessDeniedException();
        }
        $calendarItem->setStatus(StatusInterface::STATUS_DELETED);
        $calendarItem->getDeletedAt(new \DateTime('now'));
        $this->entityManager->flush();

        return $this->redirectToRoute('calendar_show', ['id' => $calendarItem->getCalendar()->getId()]);
    }

    /**
     * @Route("/{id}", name="calendar_item_delete", methods={"POST"})
     */
    public function delete(Request $request, CalendarItem $calendarItem): Response
    {
        if ($this->isCsrfTokenValid('delete' . $calendarItem->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($calendarItem);
            $entityManager->flush();
        }

        return $this->redirectToRoute('calendar_item_index');
    }


    /**
     * @Route("/change_date/{id?}/{start}/{end}", name="calendar_item_change_data")
     */
    public function changeDate(CalendarItem $calendarItem, ?string $start = null, ?string $end = null): Response
    {
        $datePattern = "/\d{4}\-\d{2}\-\d{2}/";
        if (!empty($calendarItem) && preg_match($datePattern, $start) && preg_match($datePattern, $end)) {
            $calendarItem
                ->setStart((new \DateTime($start)))
                ->setEnd((new \DateTime($end)));

            $this->entityManager->flush();
        }
        return $this->redirectToRoute("calendar_show", ['id' => $calendarItem->getCalendar()->getId()]);
    }


}
