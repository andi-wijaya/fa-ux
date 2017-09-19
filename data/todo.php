<?php

$data = [
  [ 'id'=>1, 'title'=>'Laundry', 'description'=>'', 'status'=>'ACTIVE' ],
  [ 'id'=>2, 'title'=>'Clean the Floors', 'description'=>'', 'status'=>'COMPLETED' ],

];


$response = [
  'data'=>$data,
  'page'=>1,
  'max_page'=>2
];

header('Content-Type: application/json');
echo json_encode($response);

?>