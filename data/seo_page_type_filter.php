<?php

$response = [
  'data'=>[
    [ 'text'=>'(All Pages)', 'value'=>'*' ],
    [ 'text'=>'Home', 'value'=>'home' ],
    [ 'text'=>'Catalog', 'value'=>'catalog' ],
    [ 'text'=>'Product', 'value'=>'product' ],
  ]
];

header('Content-Type: application/json');
echo json_encode($response);

?>