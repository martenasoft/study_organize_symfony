<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Entity\Checklist;
use App\Entity\TagsSearch;
use App\Form\ChecklistType;
use App\Form\TagSearchType;
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
    public function status(Request $request, ?Checklist $checklist = null): Response
    {

        if ($checklist) {
            $status = $checklist->getStatus();
            $checklist->setStatus($status != 1 ? 1 : 2);
            $this->entityManager->flush();
        }
        return $this->redirectToRoute("checklist_index", $request->query->all());
    }

    /**
     * @Route ("/calendar/{id?}", name="checklist_calendar")
     */
    public function calendar(Request $request, ?Checklist $checklist = null): Response
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

        $queryBuilder = $this
            ->checklistRepository
            ->getQueryBuilderByUser($this->getUser())
            ->orderBy($this->checklistRepository->getAlias().".id", "DESC")

        ;

        $queryBuilder1 = clone $queryBuilder;

        $tagSearch = new TagsSearch();

        $q = $request->query->get('q');
        if (!empty($q)) {
            $tagSearch->setQuery($q);

            if (substr($q, 0, 1) == '#') {
                $this
                    ->checklistRepository
                    ->findTagQueryBuilder($q, $queryBuilder);
            } else {
                $this
                    ->checklistRepository
                    ->findByTitleAboutQueryBuilder($q, $queryBuilder);
            }
        }

        $tagSearchForm = $this->createForm(TagSearchType::class, $tagSearch);
        $tagSearchForm->handleRequest($request);


        if ($tagSearchForm->isSubmitted() && $tagSearchForm->isValid()) {
            return $this->redirectToRoute("checklist_index", ["q"=>$tagSearch->getQuery()]);
        }

        $pagination = $paginator->paginate(
            $queryBuilder, /* query NOT result */
            $request->query->getInt('page', 1) /*page number*/
        );

        $form = $this->createForm(ChecklistType::class, $checklist);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if (preg_match_all('/\#[a-zA-Z-0-9]+/', $checklist->getAbout(), $matches) && !empty($matches[0])) {


                $this
                    ->checklistRepository
                    ->findTagQueryBuilder($checklist->getAbout(), $queryBuilder1)
                ;

                $queryBuilder1->getMaxResults(5);
                $tagsData = $queryBuilder1->getQuery()->getResult();

                if (!empty($tagsData)) {
                    $about = '';
                    foreach ($tagsData as $tagsDataItem) {
                        $about .= (!empty($about) ? ', ' : '') . $tagsDataItem->getTitle();
                    }
                    $checklist->setAbout($about);
                }
            }

            $this->entityManager->persist($checklist);
            $this->entityManager->flush();

            return $this->redirectToRoute("checklist_index");
        }

        return $this->render('checklist/index.html.twig', [
            'form' => $form->createView(),
            'pagination' => $pagination,
            'id' => $id,
            'tagSearchForm' => $tagSearchForm->createView()
        ]);
    }



    /**
     * @Route ("/delete/{id}/{retTl?}", name="checklist_delete")
     */
    public function delete(Request $request, Checklist $checklist, ?int $retTl): Response
    {

        if (!empty($checklist)) {
            $this->entityManager->remove($checklist);
            $this->entityManager->flush();
        }

        return $this->redirectToRoute("checklist_index");
    }

    /**
     * @Route ("/tags/{q?}", name="checklist_tags")
     */
    public function getTags(?string $q): Response
    {
        $ret = $this->checklistRepository->getTags($this->getUser(), $q);
        return $this->json($ret);
    }
}
