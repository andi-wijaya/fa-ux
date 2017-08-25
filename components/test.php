<?php

function onshutdown(){
  $content = ob_get_contents();
  ob_end_clean();

  $err = error_get_last();
  if($err){
    $type = $err["type"];
    $message = $err["message"];
    $file = $err["file"];
    $line = $err["line"];
    echo $message . "\n" . $file . ":" . $line . "\n";
  }
  else{
    echo $content;
  }
}
register_shutdown_function("onshutdown");
ob_start();

$api_key = '39159006-4016-43fb-baac-fc4b5c7b4f77';
$api_secret = '56031000-0483-4c53-a08b-fcbc00cd5e77';
$oath_client_id = '80aa7970-96f9-4c96-9206-197af1f2f867';
$oath_client_secret = '5079aac9-b8d9-42a3-b5a7-8ba5aa42a51e';

echo 'api_key: ' . $api_key . "<br />";
echo 'api_secret: ' . $api_secret . "<br />";
echo 'oath_client_id: ' . $oath_client_id . "<br />";
echo 'oath_client_secret: ' . $oath_client_secret . "<br />";

//$info = get_access_token();
$info = get_balance_information('BCAAPI2016', '0063001004');

echo "<pre>" . print_r($info, 1) . "<pre>";




//
//$data = [
//
//];
//$encryptedData = (empty($data)) ? '' : strtolower(bin2hex(hash('sha256', $data)));
//$signature = hash_hmac('sha256', $HTTPMethod.":".$relativeUrl.":".self::$accessToken.":".$encryptedData.":".$timestamp, self::$APISecret);
//return $signature;

//Signature
//$data = array();
//$relativeUrl = "/banking/corporates/transfers";
//$encryptedData = (empty($data)) ? '' : strtolower(bin2hex(hash('sha256', $data)));
//$signature = hash_hmac('sha256', "POST:".$relativeUrl.":".$decode->access_token.":".$encryptedData.":".$timestamp, "56031000-0483-4c53-a08b-fcbc00cd5e77");


function get_access_token(){

  global $oath_client_id, $oath_client_secret;
  $decoder = base64_encode($oath_client_id . ':' . $oath_client_secret);

  $headers = array();
  $headers[] = "Content-Type: application/x-www-form-urlencoded";
  $headers[] = "Authorization: Basic ". $decoder ."";

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://sandbox.bca.co.id/api/oauth/token");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  $result = curl_exec($ch);
  if (curl_errno($ch)) die('Error:' . curl_error($ch));
  $obj = json_decode($result, true);

  curl_close($ch);

  return $obj;

}

function get_signature($access_token, $method, $url, $timestamp, $data = array()){

  global $api_secret;
  $encryptedData = (empty($data)) ? '' : strtolower(bin2hex(hash('sha256', $data)));
  $string_to_sign = [
    strtoupper($method),
    $url,
    $access_token,
    $encryptedData,
    $timestamp
  ];
  $string_to_sign = implode(':', $string_to_sign);
  echo 'string_to_sign: ' . $string_to_sign . "<br />";
  $signature = hash_hmac('sha256', $string_to_sign, $api_secret);
  return $signature;

}

function get_balance_information($corporateid, $account_number){

  global $api_key;
  $method = 'GET';
  $url = "/banking/v2/corporates/{$corporateid}/accounts/{$account_number}";
  $credential = get_access_token();
  $access_token = $credential['access_token'];
  echo 'access_token: ' . $access_token . "<br />";
  $token_type = $credential['token_type'];
  $timestamp = date('o-m-d') . 'T' . date('H:i:s') . '.' . substr(date('u'), 0, 3) . date('P');
  $data = [];

  $signature = get_signature($access_token, $method, $url, $timestamp, $data);
  echo 'signature: ' . $signature . "<br />";

  $headers = array();
  $headers[] = "Content-Type: application/json";
  $headers[] = "Authorization: $token_type $access_token";
  $headers[] = "Origin: " . $_SERVER['SERVER_NAME'];
  $headers[] = "X-BCA-Key: $api_key";
  $headers[] = "X-BCA-Timestamp: $timestamp";
  $headers[] = "X-BCA-Signature: $signature";

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_URL, 'https://sandbox.bca.co.id' . $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_VERBOSE, 1);
  curl_setopt($ch, CURLOPT_HEADER, 1);
  curl_setopt($ch, CURLINFO_HEADER_OUT, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

  $response = curl_exec($ch);

  $information = curl_getinfo($ch);
  echo "<br /><br />";
  echo "<pre>" . $information['request_header'] . "</pre>";


  echo "<br /><br />";
  echo "<pre>" . $response . "</pre>";

  curl_close($ch);

  $response = json_decode($response, true);
  return $response;

}

?>