<?php

$response = [
  'data'=>[
    [ 'text'=>'(All Domains)', 'value'=>'*' ],
    [ 'text'=>'fa.co.id', 'value'=>'fa.co.id' ],
    [ 'text'=>'fa.com.sg', 'value'=>'fa.com.sg' ],
    [ 'text'=>'fa.com', 'value'=>'fa.com' ],
  ]
];

header('Content-Type: application/json');
echo json_encode($response);

?>