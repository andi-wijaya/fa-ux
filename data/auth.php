<?php

include __DIR__ . '/whitelist.php';

$email = isset($_GET['email']) ? $_GET['email'] : '';

session_start();
if(in_array($email, $allowed_emails)){
  $error = 0;
  $error_message = '';
  $_SESSION['auth_email'] = $email;
}
else{
  $error = 1;
  $error_message = 'Not allowed';
  unset($_SESSION['auth_email']);
}

echo json_encode([
  'error'=>$error,
  'error_message'=>$error_message
]);


?>