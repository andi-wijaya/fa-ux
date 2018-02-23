<?php

$post_data = $_POST;
$page = isset($post_data['page']) ? $post_data['page'] : 1;
$row_per_page = isset($post_data['row_per_page']) ? $post_data['row_per_page'] : 10;

$sample_data = [
  [
    'id'=>1,
    'code'=>'FA105303',
    'description'=>'AS-Choco Espresso Cake',
    'price'=>250000,
    'countries'=>'Indonesia, Singapore, Malaysia',
    'categories'=>'Red Roses, Best Seller',
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-ChocoEspressoCakeDN.jpg',
  ],
  [
    'id'=>2,
    'code'=>'FA105304',
    'description'=>'AS-Blueberry Cheese Cake',
    'price'=>275000,
    'countries'=>'Indonesia, Singapore, Malaysia',
    'categories'=>'Red Roses, Best Seller',
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BlueberryCheeseCakeDN.jpg',
  ],
  [
    'id'=>3,
    'code'=>'FA105310',
    'description'=>'AS-Bear Aphrodite',
    'price'=>245000,
    'countries'=>'Indonesia, Singapore, Malaysia',
    'categories'=>'Red Roses, Best Seller',
    'imageurl'=>'https://d3gv02tnixa5js.cloudfront.net/florist/AS-BearAphroditeDN.jpg',
  ],
];

$offset = ($page - 1) * $row_per_page;

$data = [];
for($i = 0 ; $i < $row_per_page ; $i++){
  $obj = $sample_data[$i % (count($sample_data))];
  $obj['id'] = $offset + $i;
  $data[] = $obj;
}

//$data = [];

$result = [
  'data'=>$data,
  'page'=>$page,
  'next_page'=>$page + 1,
  'total_page'=>10
];

header('Content-Type: application/json');
echo json_encode($result);

?>