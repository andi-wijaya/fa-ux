<?php

$response = [
  'data'=>[
    [ 'text'=>'(All Countries)', 'value'=>'*', 'code'=>'All' ],
    [ 'text'=>'Indonesia', 'value'=>'indonesia', 'code'=>'ID' ],
    [ 'text'=>'Malaysia', 'value'=>'malaysia', 'code'=>'MY' ],
    [ 'text'=>'Singapore', 'value'=>'singapore', 'code'=>'SG', ],
  ]
];

header('Content-Type: application/json');
echo json_encode($response);

?>