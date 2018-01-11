<?php

require_once __DIR__ . '/../assets/php/pdo.php';
$mysqlpdo_database = 'indosps';

$data = pmrs("select code, customerdescription, address, total from salesinvoice limit 20");

$response = [
  'data'=>$data
];

header('Content-Type: application/json');
echo json_encode($response);

?>