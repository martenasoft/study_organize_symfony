<?php

namespace App\Controller;

use App\Repository\CalendarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
/**
 * @Route("/user/statistic")
 */
class StatisticController extends AbstractController
{
    private CalendarRepository $calendarRepository;

    public function __construct(CalendarRepository $calendarRepository)
    {
        $this->calendarRepository = $calendarRepository;
    }

    /**
     * @Route("/", name="statistic_index")
     */
    public function index(): Response
    {
        return $this->render('statistic/index.html.twig', [
            'controller_name' => 'StatisticController',
        ]);
    }

    public function short(): Response
    {
        $data = $this->calendarRepository->getStatistics($this->getUser());
        return $this->render('statistic/short.html.twig', [
            'data' => $data
        ]);
    }
}
