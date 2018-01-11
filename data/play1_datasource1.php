<?php

$page = $_REQUEST['page'];
$columns = $_REQUEST['columns'];
$sorts = $_REQUEST['sorts'];
$filters = $_REQUEST['filters'];
$row_per_page = $_REQUEST['row_per_page'];

if(!$page || $page < 1) $page = 1;
$next_page = $page + 1;

require_once __DIR__ . '/../assets/php/pdo.php';
$mysqlpdo_database = 'fa';

$limit = $row_per_page;
$offset = ($page - 1) * $limit;

$data = pmrs("select code, title, description, createdon from product limit $limit offset $offset");

$response = [
  'data'=>$data,
  'page'=>$page,
  'next_page'=>$next_page,
  'max_page'=>10,
  'sorts'=>$sorts,
  'filters'=>$filters,
  'columns'=>$columns
];

header('Content-Type: application/json');
echo json_encode($response);

?>