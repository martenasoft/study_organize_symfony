<?php

namespace App\Controller;

use App\Controller\Traits\TraitGetCalendarItems;
use App\Controller\Traits\TraitGetCalendarRepository;
use App\Entity\Calendar;
use App\Repository\CalendarRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/timeline")
 */
class TimelineController extends AbstractController
{
    use TraitGetCalendarRepository, TraitGetCalendarItems;

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager, CalendarRepository $calendarRepository)
    {
        $this->calendarRepository = $calendarRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/", name="timeline_index")
     */
    public function index(): Response
    {
        //$this->isActiveOnly(false);
        $items = $this
            ->getCalendarQueryBuilder($this->getUser())
            ->getQuery()
            ->getResult();

        return $this->render('timeline/index.html.twig', [
            'items' => $items,
        ]);
    }

    /**
     * @Route("/status/{id}/{status}", name="timeline_status")
     */
    public function status(Calendar $calendar, int $status): Response
    {

        $calendar
            ->setStatus($status == Calendar::STATUS_ACTIVE ? Calendar::STATUS_DONE : Calendar::STATUS_ACTIVE)
            ->setChangedStatus(new \DateTime('now'));
        ;

        $this->entityManager->flush();
        return $this->redirectToRoute("timeline_index");
    }
}
