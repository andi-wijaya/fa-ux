<?php

$post_data = json_decode(file_get_contents('php://input'), true);
$page = isset($post_data['page']) ? $post_data['page'] : 1;

$data = [
  [
    'id'=>1,
    'code'=>'FA105303',
    'description'=>'AS-Choco Espresso Cake',
    'price'=>250000,
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-ChocoEspressoCakeDN.jpg',
  ],
  [
    'id'=>2,
    'code'=>'FA105304',
    'description'=>'AS-Blueberry Cheese Cake',
    'price'=>275000,
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BlueberryCheeseCakeDN.jpg',
  ],
  [
    'id'=>3,
    'code'=>'FA105310',
    'description'=>'AS-Bear Aphrodite',
    'price'=>245000,
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BearAphroditeDN.jpg',
  ],
];

$result = [
  'data'=>$data,
  'page'=>$page,
  'next_page'=>$page + 1,
  'total_page'=>10
];

header('Content-Type: application/json');
echo json_encode($result);

?>