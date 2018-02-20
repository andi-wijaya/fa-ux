<?php

$key = $_GET['key'];

$data = [];
$count = rand(3, 30);
for($i = 0 ; $i < $count ; $i++)
  $data[] = [ 'text'=>ucwords($key . ' ' . $i), 'value'=>$key . '-' . $i ];

$response = [
  'data'=>$data
];

header('Content-Type: application/json');
echo json_encode($response);

?>