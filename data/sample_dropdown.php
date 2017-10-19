<?php


$data = [
  [
    'title'=>'Lorem ipsum',
    'code'=>'1',
  ],
  [
    'title'=>'dolor sit amet',
    'code'=>'2',
  ],
  [
    'title'=>'consectetur adipiscing',
    'code'=>'3',
  ],
  [
    'title'=>'Ut risus ipsum',
    'code'=>'4',
  ],
  [
    'title'=>'gravida ultricies',
    'code'=>'5',
  ],
];

$result = [
  'data'=>$data,
];

header('Content-Type: application/json');
echo json_encode($result);

?>