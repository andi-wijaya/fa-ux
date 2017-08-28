<?php

$data = [
  'id'=>1,
  'code'=>'FA99999',
  'title'=>'Test Product',
  'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BearAphroditeDN.jpg'
];

$response = [
  'data'=>$data,
];

header('Content-Type: application/json');
echo json_encode($response);

?>