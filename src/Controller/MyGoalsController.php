<?php

namespace App\Controller;

use App\Entity\DailyChecklist;
use App\Entity\Interfaces\StatusInterface;
use App\Repository\CalendarItemChecklistTagsRepository;
use App\Repository\DailyChecklistRepository;
use App\Service\CheckListCalendarItemService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/my-goals")
 */
class MyGoalsController extends AbstractController
{
    private DailyChecklistRepository $dailyChecklistRepository;

    public function __construct(
        DailyChecklistRepository $dailyChecklistRepository
    ) {
        $this->dailyChecklistRepository = $dailyChecklistRepository;
    }

    /**
     * @Route("/", name="my_goals_index")
     */
    public function index(): Response
    {
        return $this->render(
            'my_goals/index.html.twig',
            [
                'controller_name' => 'MyGoalsController',
            ]
        );
    }

    /**
     * @Route("/get-charset-data", name="get_charset_data")
     */
    public function getCharsetData(CheckListCalendarItemService $checkListCalendarItemService): Response
    {
        $labels = [];
        $dateStart = new \DateTime('now');
        $w = ((int)$dateStart->format('w'));
        $dateStart->modify("-$w day");

        $dateEnd = new \DateTime('now');
        $w = 8 - ((int)$dateEnd->format('w'));
        $dateEnd->modify("+$w day");


        for ($i = 0; $i < 7; $i++) {
            $dateStartS = clone $dateStart;
            //  dump($dateStartS->format('Y-M-D w d')); die;
            $labels[] = $dateStartS->modify("+$i day")->format('D');
            unset($dateStartS);
        }

        $queryBuilder = $this
            ->dailyChecklistRepository
            ->getByUserQueryBuilder(
                $this->getUser(),
                null,
                $dateStart,
                $dateEnd
            )
            ->innerJoin($this->dailyChecklistRepository->getAlias() . '.calendarItem', 'ci')
            ->addSelect('ci')
            ->innerJoin('ci.calendar', 'c')
            ->addSelect('c')
            ->orderBy($this->dailyChecklistRepository->getAlias() . '.datetime', 'ASC');

        $items = $queryBuilder
            ->getQuery()
            ->getResult();


        $return = [
            'type' => 'line',
            'options' => [
                'scales' => [
                    'y' => [
                        'min' => 0,
                        'max' => 100,
                        'beginAtZero' => false
                    ]
                ]
            ],
            'data' => [
                'labels' => $labels,
                'datasets' => []
            ]
        ];


        if (!empty($items)) {
            $data = [];
            $options = [];
            $dataTotalLength = [];
            //  $labels = [];
            foreach ($items as $item) {
                $d = new \DateTime();
                $d->setTimestamp($item->getDatetime());
                $calendarItemId = $item->getCalendarItem()->getId();

                $dayS = ((int)$d->format('w'));

                $calendarColor = $item->getCalendarItem()->getCalendar()->getColor();
                $calendarTextColor = $item->getCalendarItem()->getCalendar()->getTextColor();

                if (!isset($data[$calendarItemId]) || !isset($data[$calendarItemId][$dayS])) {
                    $data[$calendarItemId][$dayS] = [
                        'checked' => 0,
                        'value' => 0
                    ];
                }

                if ($item->getCalendarItem()->getStatus() == StatusInterface::STATUS_DONE) {
                    $data[$calendarItemId][$dayS]['value'] = 100;
                } elseif ($item->getStatus() == StatusInterface::STATUS_DONE) {
                    $data[$calendarItemId][$dayS]['checked']++;
                }

                if ($item->getDatatype() === DailyChecklist::CHECK_LIST_TYPE) {

                    if (!isset($dataTotalLength[$calendarItemId])) {
                        $hashItems = $checkListCalendarItemService->getHashTagItems($this->getUser(), $item->getCalendarItem());
                        $totalLength = $checkListCalendarItemService->getChecklistLength($this->getUser(), $hashItems);
                        $dataTotalLength[$calendarItemId] = $totalLength;
                    }


                    if (!empty($dataTotalLength[$calendarItemId])) {
                        $data[$calendarItemId][$dayS]['value'] =
                            (int)round(
                                $data[$calendarItemId][$dayS]['checked'] /
                                $dataTotalLength[$calendarItemId] * 100
                            );
                    }
                }

                if (empty($options[$item->getCalendarItem()->getId()])) {
                    $options[$calendarItemId] = [
                        'label' => $item->getCalendarItem()->getCalendar()->getTitle(),
                        'backgroundColor' => [$calendarColor],
                        'borderColor' => [$calendarTextColor],
                        'borderWidth' => 4

                    ];
                }
            }

            $datasets = [];
            foreach ($data as $calendarItemId => $item) {
                foreach ($labels as $index => $day) {
                    if (!isset($item[$index])) {
                        $options[$calendarItemId]['data'][] = 0;
                    } else {
                        $options[$calendarItemId]['data'][] = $item[$index]['value'];
                    }
                    $options[$calendarItemId]['backgroundColor'][$index] = $options[$calendarItemId]['backgroundColor'][0];
                    $options[$calendarItemId]['borderColor'][$index] = $options[$calendarItemId]['backgroundColor'][0];
                }
                $datasets[] = $options[$calendarItemId];
            }

            $return['data']['datasets'] = $datasets;
        }
        return $this->json($return);
    }
}
