<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ShareController extends AbstractController
{
    /**
     * @Route("/user/share-calendar", name="share_calendar")
     */
    public function index(): Response
    {
        return $this->render('share/index.html.twig', [
            'controller_name' => 'ShareController',
        ]);
    }
}
