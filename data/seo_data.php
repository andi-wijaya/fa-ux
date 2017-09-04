<?php

if(isset($_GET['id'])){

  switch($_GET['id']){
    case 1: $response = [ 'data'=>[ 'id'=>1, 'type'=>'(all pages)', 'domain'=>'(all domains)', 'country'=>'(all countries)' ] ]; break;
    case 2: $response = [ 'data'=>[ 'id'=>2, 'type'=>'Home', 'domain'=>'(all domains)', 'country'=>'(all countries)' ] ]; break;
    case 3: $response = [ 'data'=>[ 'id'=>3, 'type'=>'Catalog', 'domain'=>'(all domains)', 'country'=>'(all countries)' ] ]; break;
  }

}
else{
  $response = [
    'data'=>[
      [ 'id'=>1, 'type'=>'(all pages)', 'domain'=>'(all domains)', 'country'=>'(all countries)' ],
      [ 'id'=>2, 'type'=>'Home', 'domain'=>'(all domains)', 'country'=>'(all countries)' ],
      [ 'id'=>3, 'type'=>'Catalog', 'domain'=>'(all domains)', 'country'=>'(all countries)' ],
    ]
  ];
}

header('Content-Type: application/json');
echo json_encode($response);

?>