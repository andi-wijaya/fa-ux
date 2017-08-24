<?php

$data = [
  [
    'code'=>'FA105303',
    'description'=>'AS-Choco Espresso Cake',
    'price'=>250000,
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-ChocoEspressoCakeDN.jpg',
  ],
  [
    'code'=>'FA105304',
    'description'=>'AS-Blueberry Cheese Cake',
    'price'=>275000,
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BlueberryCheeseCakeDN.jpg',
  ],
  [
    'code'=>'FA105310',
    'description'=>'AS-Bear Aphrodite',
    'price'=>245000,
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BearAphroditeDN.jpg',
  ],
];

$result = [
  'data'=>$data
];

header('Content-Type: application/json');
echo json_encode($result);

?>