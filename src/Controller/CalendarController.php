<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Form\CalendarSmallType;
use App\Form\CalendarType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
/**
 * @Route("/user/calendar")
 */

class CalendarController extends AbstractController
{
    /**
     * @Route("/", name="calendar_index")
     */
    public function index(Request $request): Response
    {
        $calendar = new Calendar();
    //    dump($request->request); die;
        $form = $this->createForm(CalendarSmallType::class, $calendar);
        $form = $this->createForm(CalendarType::class, $calendar);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            dump($calendar); die;
        }
        return $this->render('calendar/index.html.twig', [
            'controller_name' => 'CalendarController',
            'form' => $form->createView()
        ]);
    }
}
