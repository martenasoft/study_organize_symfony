<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\Interfaces\StatusInterface;
use App\Form\CalendarItemType;
use App\Repository\CalendarItemRepository;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
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
    private CalendarItemRepository $calendarItemRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        CalendarItemRepository $calendarItemRepository
    ) {
        $this->entityManager = $entityManager;
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

        $alias = $this
            ->calendarItemRepository
            ->getAlias();

        $ret = [];
        $items = $this
            ->calendarItemRepository
            ->getLoadItems($this->getUser(), $calendarId, new \DateTime($start), new \DateTime($end))
            ->getQuery()
            ->getResult()
        ;

        foreach ($items as $item) {
            $ret[]  = [
                "id" => $item->getId(),
                "calendar_id" => $item->getCalendar()->getId(),
                "title" => $item->getTitle(),
                "color" => $item->getCalendar()->getColor(),
                "textColor" => $item->getTextColor(),
                "about" => $item->getAbout(),
                "className" => "label-important",
                "start" => $item->getStart()->format('Y-m-d H:i:s'),
                "end" => $item->getEnd()->format('Y-m-d H:i:s'),
            ];
        }

        // return new JsonResponse($serializer->serialize($ret));
        return $this->json($ret);
    }


    /**
     * @Route("/", name="calendar_item_index", methods={"GET"})
     */
    public function index(CalendarItemRepository $calendarItemRepository): Response
    {
        return $this->render('calendar_item/index.html.twig', [
            'calendar_items' => $calendarItemRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="calendar_item_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $calendarItem = new CalendarItem();
        $form = $this->createForm(CalendarItemType::class, $calendarItem);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($calendarItem);
            $entityManager->flush();

            return $this->redirectToRoute('calendar_item_show');
        }

        return $this->render('calendar_item/new.html.twig', [
            'calendar_item' => $calendarItem,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id?}", name="calendar_item_show", methods={"GET"})
     */
    public function show(CalendarItem $calendarItem): Response
    {
        if (empty($calendarItem)) {
            throw new NotFoundHttpException();
        }
        return $this->render('calendar_item/show.html.twig', [
            'calendar_item' => $calendarItem,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="calendar_item_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, CalendarItem $calendarItem): Response
    {
        $form = $this->createForm(CalendarItemType::class, $calendarItem);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('calendar_item_index');
        }

        return $this->render('calendar_item/edit.html.twig', [
            'calendar_item' => $calendarItem,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/move-to-bin", name="move_calendar_item_to_bin", methods={"GET"})
     */
    public function moveToBin(Request $request, CalendarItem $calendarItem): Response
    {
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
        if ($this->isCsrfTokenValid('delete'.$calendarItem->getId(), $request->request->get('_token'))) {
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
