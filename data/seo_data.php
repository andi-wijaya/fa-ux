<?php

if(isset($_GET['id'])){

  switch($_GET['id']){
    case 1: $response = [ 'data'=>[ 'id'=>1, 'type'=>'*', 'domain'=>'*', 'country'=>'*' ] ]; break;
    case 2: $response = [ 'data'=>[ 'id'=>2, 'type'=>'home', 'domain'=>'*', 'country'=>'*' ] ]; break;
    case 3: $response = [ 'data'=>[ 'id'=>3, 'type'=>'catalog', 'domain'=>'*', 'country'=>'*' ] ]; break;
  }

}
else{
  $response = [
    'data'=>[
      [ 'id'=>1, 'type'=>'**', 'domain'=>'*', 'country'=>'*' ],
      [ 'id'=>2, 'type'=>'Home', 'domain'=>'*', 'country'=>'*' ],
      [ 'id'=>3, 'type'=>'Catalog', 'domain'=>'*', 'country'=>'*' ],
    ]
  ];
}

header('Content-Type: application/json');
echo json_encode($response);

?>