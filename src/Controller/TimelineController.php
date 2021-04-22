<?php

namespace App\Controller;

use App\Controller\Traits\TraitGetCalendarItems;
use App\Controller\Traits\TraitGetCalendarRepository;
use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\Interfaces\StatusInterface;
use App\Repository\CalendarItemRepository;
use App\Repository\CalendarRepository;
use Doctrine\ORM\EntityManagerInterface;
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

    public function __construct(EntityManagerInterface $entityManager, CalendarItemRepository $calendarItemRepository)
    {
        $this->calendarItemRepository = $calendarItemRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/", name="timeline_index")
     */
    public function index(Request $request, PaginatorInterface $paginator): Response
    {
        //$this->isActiveOnly(false);
        $query = $this
            ->calendarItemRepository
            ->getLoadItems()
            ->orderBy($this
                          ->calendarItemRepository->getAlias().'.start', 'DESC')
            ->getQuery();

        $pagination= $paginator->paginate(
            $query, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/

        );


        return $this->render('timeline/index.html.twig', [
            'pagination' => $pagination,
        ]);
    }

    /**
     * @Route("/status/{id}", name="timeline_status")
     */
    public function status(CalendarItem $calendarItem): Response
    {
        $status = $calendarItem->getStatus();
        $calendarItem
            ->setStatus($status == StatusInterface::STATUS_ACTIVE ?
                            StatusInterface::STATUS_DONE : StatusInterface::STATUS_ACTIVE)
            ->setUpdatedAt(new \DateTime('now'));

        $this->entityManager->flush();
        return $this->redirectToRoute("timeline_index");
    }
}
