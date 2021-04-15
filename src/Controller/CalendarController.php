<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Form\CalendarSmallType;
use App\Form\CalendarType;
use App\Repository\CalendarRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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
            $calendar
                ->setColor('#f2f6f9')
                ->setTextColor('#646871')
                ->setIconColor('#4986e7')
                ->setIconTextColor('#fff')
                ->setStatus(Calendar::STATUS_ACTIVE)
                ->setUser($this->getUser());
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

    /**
     * @Route("/items/{start?}/{end?}", name="calendar_get_items")
     */
    public function getItems(SerializerInterface $serializer, ?string $start = null, ?string $end): Response
    {
        if (
            !preg_match('/(\d{4}\-(\d{2})\-(\d{2}))/', $start) ||
            !preg_match('/(\d{4}\-(\d{2})\-(\d{2}))/', $end)) {
            return $this->json(["Error params"], 504);
        }

        $alias = $this->calendarRepository->getAlias();
        $ret = [];
        $items = $this
            ->calendarRepository
            ->getLoadItems($this->getUser(), new \DateTime($start), new \DateTime($end))
         //   ->select("$alias.id, $alias.textColor, $alias.title, $alias.start, $alias.end, 'label-important' AS className, $alias.about")
            ->getQuery()
            ->getResult()
        ;

        foreach ($items as $item) {
            $ret[]  = [
                "id" => $item->getId(),
                "title" => $item->getTitle(),
                "color" => $item->getColor(),
                "textColor" => $item->getTextColor(),
                "about" => $item->getAbout(),
                "className" => "label-important",
                "start" => $item->getStart()->format('Y-m-d'),
                "end" => $item->getEnd()->format('Y-m-d'),
            ];
        }

       // return new JsonResponse($serializer->serialize($ret));
        return $this->json($ret);
    }

}
