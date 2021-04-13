<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Form\CalendarSmallType;
use App\Form\CalendarType;
use App\Repository\CalendarRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/calendar")
 */
class CalendarController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private CalendarRepository $calendarRepository;

    public function __construct(EntityManagerInterface $entityManager, CalendarRepository $calendarRepository)
    {
        $this->entityManager = $entityManager;
        $this->calendarRepository = $calendarRepository;
    }

    /**
     * @Route("/{id?}", name="calendar_index", methods={"GET","POST"})
     */
    public function index(Request $request, ?Calendar $calendar): Response
    {
        $id = null;
        if (empty($calendar)) {
            $calendar = new Calendar();
            $calendar->setStatus(Calendar::STATUS_ACTIVE);
            $calendar->setUser($this->getUser());
        } else {
            $id = $calendar->getId();
        }

        $form = $this->createForm(CalendarType::class, $calendar);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManager->persist($calendar);
            $this->entityManager->flush();
            return $this->redirectToRoute('calendar_index');
        }

        $items = $this
            ->calendarRepository
            ->getQueryBuilderByUser($this->getUser())
            ->getQuery()
            ->getArrayResult();

        return $this->render('calendar/index.html.twig', [
            'id' => $id,
            'form' => $form->createView(),
            'items' => $items
        ]);
    }

    /**
     * @Route("/change_date/{id?}/{start}/{end}", name="calendar_change_data")
     */
    public function changeDate(Calendar $calendar, ?string $start = null, ?string $end = null): Response
    {
        $datePattern = "/\d{4}\-\d{2}\-\d{2}/";
        if (!empty($calendar) && preg_match($datePattern, $start) && preg_match($datePattern, $end)) {
            $calendar
                ->setStart((new \DateTime($start)))
                ->setEnd((new \DateTime($end)));

            $this->entityManager->flush();
            return $this->redirectToRoute("calendar_index", ["id" => $calendar->getId()]);
        }
        return $this->redirectToRoute("calendar_index");
    }

    /**
     * @Route ("/delete/{id}/{retTl?}", name="calendar_delete")
     */
    public function delete(Calendar $calendar, ?int $retTl): Response
    {
        if (!empty($calendar)) {
            $this->entityManager->remove($calendar);
            $this->entityManager->flush();
        }

        return $this->redirectToRoute(!empty($retTl) ? "timeline_index" : "calendar_index");
    }

}
