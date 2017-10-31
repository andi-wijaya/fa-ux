<?php

sleep(1);

$data = [
  'labels'=> [1501,1600,1700,1750,1800,1850,1900,1950,1999,2050],
  'datasets'=> [
    [
      'data'=> [86,114,106,106,107,111,133,221,783,2478],
      'label'=> "Africa",
      'borderColor'=> "#3e95cd",
      'fill'=> "#3e95cd"
    ],
    [
      'data'=> [282,350,411,502,635,809,947,1402,3700,5267],
      'label'=> "Asia",
      'borderColor'=> "#8e5ea2",
      'fill'=> "#8e5ea2"
    ],
    [
      'data'=> [168,170,178,190,203,276,408,547,675,734],
      'label'=> "Europe",
      'borderColor'=> "#3cba9f",
      'fill'=> "#3cba9f"
    ],
    [
      'data'=> [40,20,10,16,24,38,74,167,508,784],
      'label'=> "Latin America",
      'borderColor'=> "#e8c3b9",
      'fill'=> "#e8c3b9"
    ],
    [
      'data'=> [6,3,2,2,7,26,82,172,312,433],
      'label'=> "North America",
      'borderColor'=> "#c45850",
      'fill'=> "#c45850"
    ]
  ]
];

$result = [
  'data'=>$data,
];

header('Content-Type: application/json');
echo json_encode($result);

?>