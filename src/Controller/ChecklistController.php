<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Entity\Checklist;
use App\Form\ChecklistType;
use App\Repository\ChecklistRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("/user/checklist")
 */
class ChecklistController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ChecklistRepository $checklistRepository;

    public function __construct(EntityManagerInterface $entityManager, ChecklistRepository $checklistRepository)
    {
        $this->entityManager = $entityManager;
        $this->checklistRepository = $checklistRepository;
    }

    /**
     * @Route ("/status/{id?}", name="checklist_status")
     */
    public function status(?Checklist $checklist = null): Response
    {
        if ($checklist) {
            $status = $checklist->getStatus();
            $checklist->setStatus($status != 1 ? 1 : 2);
            $this->entityManager->flush();
        }
        return $this->redirectToRoute("checklist_index");
    }

    /**
     * @Route ("/calendar/{id?}", name="checklist_calendar")
     */
    public function calendar(?Checklist $checklist = null): Response
    {
        if ($checklist) {
            $calendar = new Calendar();
            $dateStart = new \DateTime('now');
            $dateEnd = new \DateTime('now');
            $dateEnd->modify("+1 day");
            $calendar
                ->setUser($this->getUser())
                ->setStart($dateStart)
                ->setEnd($dateEnd)
                ->setStatus(Calendar::STATUS_ACTIVE)
                ->setTitle($checklist->getTitle())
                ->setAbout($checklist->getAbout())
                ->setColor($checklist->getColor())
            ;

            $this->entityManager->persist($calendar);
            $this->entityManager->remove($checklist);
            $this->entityManager->flush();

            return $this->redirectToRoute("calendar_index", ['id' => $calendar->getId()]);
        }
        return $this->redirectToRoute("checklist_index");
    }


    /**
     * @Route("/{id?}", name="checklist_index")
     */
    public function index(Request $request, PaginatorInterface $paginator, ?Checklist $checklist = null): Response
    {
        $id = null;
        if (empty($checklist)) {
            $checklist = new Checklist();
            $checklist
                ->setStatus(1)
                ->setUser($this->getUser());
        } else {
            $id = $checklist->getId();
        }

        $query = $this
            ->checklistRepository
            ->getQueryBuilderByUser($this->getUser());

        $pagination = $paginator->paginate(
            $query, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/

        );


        $form = $this->createForm(ChecklistType::class, $checklist);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->entityManager->persist($checklist);
            $this->entityManager->flush();

            return $this->redirectToRoute("checklist_index");
        }

        return $this->render('checklist/index.html.twig', [
            'form' => $form->createView(),
            'pagination' => $pagination,
            'id' => $id
        ]);
    }



    /**
     * @Route ("/delete/{id}/{retTl?}", name="checklist_delete")
     */
    public function delete(Checklist $checklist, ?int $retTl): Response
    {
        if (!empty($checklist)) {
            $this->entityManager->remove($checklist);
            $this->entityManager->flush();
        }

        return $this->redirectToRoute("checklist_index");
    }
}
