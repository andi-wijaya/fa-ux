<?php

$response = [
  'data'=>[
    [ 'text'=>'(All Countries)', 'value'=>'*' ],
    [ 'text'=>'Indonesia', 'value'=>'indonesia' ],
    [ 'text'=>'Malaysia', 'value'=>'malaysia' ],
    [ 'text'=>'Singapore', 'value'=>'singapore' ],
  ]
];

header('Content-Type: application/json');
echo json_encode($response);

?>