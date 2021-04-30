<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\CalendarStatus;
use App\Entity\Interfaces\StatusInterface;
use App\Form\CalendarItemType;
use App\Form\CalendarType;
use App\Repository\CalendarItemRepository;
use App\Repository\CalendarRepository;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Knp\Component\Pager\PaginatorInterface;
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

    public function __construct(
        EntityManagerInterface $entityManager,
        CalendarRepository $calendarRepository
    ) {
        $this->entityManager = $entityManager;
        $this->calendarRepository = $calendarRepository;
    }

    /**
     * @Route("/", name="calendar_index", methods={"GET"})
     */
    public function index(Request $request, PaginatorInterface $paginator): Response
    {
        $queryBuilder = $this->calendarRepository
            ->getItemsByUserQueryBuilder($this->getUser())
            ->getQuery()
            ->getResult();

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1)
        );

        $params = (!empty($calendars[0]) ? [$calendars[0]-> getId()] : []);

        return $this->render('calendar/index.html.twig', [
            'pagination' => $pagination,
            'calendars_params' => $request->query->get('show_calendar', $params)
        ]);
    }

    /**
     * @Route("/show-as-table", name="calendar_show_as_table", methods={"GET"})
     */
    public function tableView(Request $request, PaginatorInterface $paginator): Response
    {
        $queryBuilder =  $this->calendarRepository
            ->getItemsByUserQueryBuilder($this->getUser()
                , StatusInterface::STATUS_ACTIVE
            );

        $pagination = $paginator->paginate(
            $queryBuilder, /* query NOT result */
            $request->query->getInt('page', 1) /*page number*/

        );


        return $this->render('calendar/vew_table.twig', [
            'pagination' => $pagination
        ]);
    }

    /**
     * @Route("/new", name="calendar_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $calendar = new Calendar();
        $calendar
            ->setStatus()
            ->setCreatedAt(new \DateTime('now'))
            ->setUser($this->getUser())
        ;




        $form = $this->createForm(CalendarType::class, $calendar);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManager->persist($calendar);
            $this->entityManager->flush();

            return $this->redirectToRoute('calendar_show_as_table');
        }

        return $this->render('calendar/new.html.twig', [
            'calendar' => $calendar,
            'form' => $form->createView()

        ]);
    }

    /**
     *
     * @Route("/show/{id?}/{item?}", name="calendar_show", methods={"GET", "POST"})
     */
    public function show(Request $request, Calendar $calendar, ?int $item = null): Response
    {

        $calendarItem = null;
        if (!empty($item)) {
            $calendarItem = $this->entityManager->find(CalendarItem::class, $item);
        }
        $id = null;
        if (empty($calendarItem))  {
            $calendarItem = new CalendarItem();
            $calendarItem->setCalendar($calendar);
            $calendarItem->setCreatedAt(new \DateTime('now'));
            $calendarItem->setStatus(StatusInterface::STATUS_ACTIVE);
        } else {
            $calendarItem->setUpdatedAt(new \DateTime('now'));
            $id = $calendarItem->getId();
        }

        $calendarItemForm = $this->createForm(CalendarItemType::class, $calendarItem);
        $calendarItemForm->handleRequest($request);

        if ($calendarItemForm->isSubmitted() && $calendarItemForm->isValid()) {

            $this->entityManager->persist($calendarItem);
            $this->entityManager->flush();
            return $this->redirectToRoute('calendar_show', ['id' => $calendar->getId()]);
        }

        return $this->render('calendar/show.html.twig', [
            'calendar' => $calendar,
            'form' => $calendarItemForm->createView(),
            'id' => $id,
            'calendarId' => $calendar->getId()
        ]);
    }

    /**
     * @Route("/{id}/edit", name="calendar_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Calendar $calendar): Response
    {
        $form = $this->createForm(CalendarType::class, $calendar);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $calendar->setUpdatedAt(new \DateTime('now'));
            $this->entityManager->flush();

            return $this->redirectToRoute('calendar_show_as_table');
        }

        return $this->render('calendar/edit.html.twig', [
            'calendar' => $calendar,
            'form' => $form->createView(),
        ]);
    }


    /**
     * @Route("/{id}", name="calendar_delete", methods={"POST"})
     */
    public function delete(Request $request, Calendar $calendar): Response
    {
        if ($this->isCsrfTokenValid('delete'.$calendar->getId(), $request->request->get('_token'))) {
          //  $this->entityManager->remove($calendar);
           // $this->entityManager->flush();
        }

        return $this->redirectToRoute('calendar_index');
    }

}
