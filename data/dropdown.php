<?php


$data = [
  [
    'text'=>'Lorem ipsum',
    'value'=>'1',
  ],
  [
    'text'=>'dolor sit amet',
    'value'=>'2',
  ],
  [
    'text'=>'consectetur adipiscing',
    'value'=>'3',
  ],
  [
    'text'=>'Ut risus ipsum',
    'value'=>'4',
  ],
  [
    'text'=>'gravida ultricies',
    'value'=>'5',
  ],
];

$result = [
  'data'=>$data,
];

header('Content-Type: application/json');
echo json_encode($result);

?>