<?php
$__DEBUGS = array();
$__CONSOLE_LOGS = array();
function debug($arr){
  global $__DEBUGS;
  $__DEBUGS[] = $arr;
}

$mime_types = array(

  'txt' => 'text/plain',
  'htm' => 'text/html',
  'html' => 'text/html',
  'php' => 'text/html',
  'css' => 'text/css',
  'js' => 'application/javascript',
  'json' => 'application/json',
  'xml' => 'application/xml',
  'swf' => 'application/x-shockwave-flash',
  'flv' => 'video/x-flv',

  // images
  'png' => 'image/png',
  'jpe' => 'image/jpeg',
  'jpeg' => 'image/jpeg',
  'jpg' => 'image/jpeg',
  'gif' => 'image/gif',
  'bmp' => 'image/bmp',
  'ico' => 'image/vnd.microsoft.icon',
  'tiff' => 'image/tiff',
  'tif' => 'image/tiff',
  'svg' => 'image/svg+xml',
  'svgz' => 'image/svg+xml',

  // archives
  'zip' => 'application/zip',
  'rar' => 'application/x-rar-compressed',
  'exe' => 'application/x-msdownload',
  'msi' => 'application/x-msdownload',
  'cab' => 'application/vnd.ms-cab-compressed',

  // audio/video
  'mp3' => 'audio/mpeg',
  'qt' => 'video/quicktime',
  'mov' => 'video/quicktime',

  // adobe
  'pdf' => 'application/pdf',
  'psd' => 'image/vnd.adobe.photoshop',
  'ai' => 'application/postscript',
  'eps' => 'application/postscript',
  'ps' => 'application/postscript',

  // ms office
  'doc' => 'application/msword',
  'rtf' => 'application/rtf',
  'xls' => 'application/vnd.ms-excel',
  'ppt' => 'application/vnd.ms-powerpoint',

  // open office
  'odt' => 'application/vnd.oasis.opendocument.text',
  'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
);
$__WORDS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida nisl a neque elementum gravida. Donec commodo maximus nulla, ac fringilla tellus tristique eget. Nullam fermentum, tellus sit amet mattis convallis, leo neque semper nunc, eu finibus nunc tellus vel lectus. Nam tempus felis quis gravida maximus. Nunc efficitur luctus purus, id suscipit sem vulputate eget. Sed lobortis, lacus quis laoreet suscipit, lacus dolor scelerisque orci, sed finibus felis nulla at ipsum. Maecenas nunc libero, aliquam vel accumsan lacinia, iaculis id risus. Nam fermentum, quam vel consequat lacinia, dui mauris pulvinar tellus, eget eleifend augue erat ac arcu. Fusce ut felis orci. Vestibulum malesuada orci sit amet dui luctus, sagittis feugiat turpis dictum.";
$__WORDS = preg_replace('/[^a-zA-Z0-9 ]/', '', $__WORDS);
$__SYSDEBUG = array();
$__RANDOMSEED = rand(100, 200);
$__NAMES = "nailah ansariah mahmudah raniah najla fatinah zahwa nikmah aziza nisa taman nur aini ramadhani fitria fredella ulani fikrah nuri jamilah salimah kamilah hasna maktika haura humaira karimah nufus hayatun zainal iis dewi suraiya adiba shakila atmarini";
$__EMAILDOMAINS = "gmail yahoo hotmail outlook mail";

function randomword($letter_count, $prefix = ''){

  $digitcount = $letter_count;
  $index = rand(0, pow(10, $digitcount) - 1);
  $index = str_pad($index, $digitcount, '0',STR_PAD_LEFT);
  //$index = strtoupper(substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $digitcount));
  //$vouchercode = $prefix . str_pad($index, $digitcount, '0',STR_PAD_LEFT);
  $code = $prefix . $index;

  return $code;

}
function randomdate($start = -10, $end = 0){
  $date = date('Ymd', mktime(0, 0, 0, date('n'), date('j') + ($start + rand(0, $end - $start)), date('Y')));
  return $date;
}
function randompastelcolors(){
  $r = dechex(rand(0, 127) + 127);
  $g = dechex(rand(0, 127) + 127);
  $b = dechex(rand(0, 127) + 127);
  return '#' . $r . $g . $b;
}
function randompassword($length){
  $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
  $pass = array();
  $pass[] = 'A';
  $alphaLength = strlen($alphabet) - 1;
  for ($i = 0; $i < $length - 2; $i++) {
    $n = rand(0, $alphaLength);
    $pass[] = $alphabet[$n];
  }
  $pass[] = '0';
  return implode($pass);
}
function randomenums($enums){

  return $enums[rand(0, count($enums) - 1)];

}
function randomwords($count = 1){
  global $__WORDS;

  $words = array();
  $explodes = explode(' ', $__WORDS);
  for($i = 0 ; $i < $count ; $i++){
    $words[] = $explodes[rand(0, count($explodes) - 1)];
  }
  return implode(' ', $words);
}
function randomsentences($minword, $maxword){
  $count = $minword + (rand(0, $maxword - $minword));
  $words = randomwords($count);
  return implode(' ', $words);
}
function randomemail(){

  $org = array('com', 'net', 'me');

  $name = randomwords(1);
  $domain = randomwords(1) . '.' . $org[rand(0, count($org) - 1)];
  return $name . '@' . $domain;

}
function randomcity(){

  $cities = array('Jakarta', 'Medan', 'Surabaya', 'Bandung', 'Yogyakarta', 'Manado');
  return $cities[rand(0, count($cities) - 1)];

}
function random_bank_account(){

  $a = '';
  $count = 12;
  for ($i = 0 ; $i < $count ; $i++)
    $a .= mt_rand(0,9);
  return $a;

}
function randomphone(){

  return rand(600000, 699999);

}

function randomname(){

  global $__NAMES;

  $names = explode(' ', $__NAMES);
  $name = $names[rand(0, count($names) - 1)] . rand(1000, 9999);
  return $name;

}
function randomemaildomain(){

//  global $__EMAILDOMAINS;
//  $org = array('com', 'net', 'me');
//  $emaildomains = explode(' ', $__EMAILDOMAINS);
//
//  $domain = $emaildomains[rand(0, count($emaildomains) - 1)];
//  $domain = $domain . '.' . $org[rand(0, count($org) - 1)];
//  return $domain;

  return 'pintu.co.id';

}
function random_pie_data($count = 3){

  $data = array();
  $max_percentage = 100;
  for($i = 0 ; $i < $count ; $i++){

    if($i == $count - 1) $percentage = $max_percentage;
    else $percentage = rand(10, $max_percentage - (($count - $i) * 10));

    $max_percentage -= $percentage;
    $data[] = $percentage;

  }
  return $data;

}
function randomseed(){

  global $__RANDOMSEED;
  $__RANDOMSEED++;
  return time() . str_pad($__RANDOMSEED, 3, '0', STR_PAD_LEFT);

}

function array2csv($array, &$title, &$data) {
  foreach($array as $key => $value) {
    if(is_array($value)) {
      $title .= $key . ",";
      $data .= "" . ",";
      array2csv($value, $title, $data);
    } else {
      $title .= $key . ",";
      $data .= '"' . $value . '",';
    }
  }
}
function xml_prettyprint($xmlstring){
  return $xmlstring;
  try{
    libxml_use_internal_errors(true);
    $obj = simplexml_load_string($xmlstring);

    if(!$obj){
      $errorMessage = "";
      foreach (libxml_get_errors() as $error)
        $errorMessage .= $error->message;
      libxml_clear_errors();
      throw new Exception($errorMessage);
    }

    //Format XML to save indented tree rather than one line
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($obj->asXML());

    $result = $dom->saveXML();
    $result = ltrim($result);
    $result = rtrim($result);
    return $result;
  }
  catch(Exception $ex){
    return $xmlstring;
  }
}
function xml_friendlytext($text){
  $text = html_entity_decode(urldecode($text));
  return $text;
}
function xml_to_array($text){

  $xml = simplexml_load_string($text);
  $json = json_encode($xml);
  $array = json_decode($json,TRUE);
  return $array;

}
function array_to_phparray($arr){

  $exp = array();
  $exp[] = "array(";
  foreach($arr as $key=>$value)
    $exp[] = "'$key'=>'$value'";
  $exp[] = ")";
  return implode(',', $exp);

}
function text_to_csv($text, $options = null){

  $text = mb_convert_encoding($text, "UTF-8");

  $fh = fopen('php://temp', 'r+');
  fwrite($fh, $text);
  rewind($fh);

  $options = array_merge(array(
    'eol'       => "\n",
    'delimiter' => ',',
    'enclosure' => '"',
    'escape'    => '\\',
  ), !$options ? array() : $options);
  $lines  = explode($options['eol'], $text);
  $header = array_map('trim', explode($options['delimiter'], array_shift($lines)));
  $csv = array();
  foreach ($lines as $line){
    if (empty($line)) continue;

    $fields = str_getcsv($line, ',', '"', '\\ ');
    $temp = array();
    for($i = 0 ; $i < count($header) ; $i++){
      $temp[$header[$i]] = $fields[$i];
    }
    $csv[] = $temp;
  }
  return $csv;

}
function array_map_keys($arr, $maps_keys, $as_single_object = false){

  if(is_array($arr)){

    if(!$as_single_object){
      $results = array();
      for($i = 0 ; $i < count($arr) ; $i++){
        $obj = $arr[$i];

        $result = array();
        foreach($maps_keys as $key=>$value){

          $result[$obj[$key]] = $obj[$value];

        }
        $results[] = $result;

      }

      return $results;
    }
    else{

      $result = array();
      for($i = 0 ; $i < count($arr) ; $i++){
        $obj = $arr[$i];

        foreach($maps_keys as $key=>$value){
          $result[$obj[$key]] = $obj[$value];
        }

      }
      return $result;

    }
  }
  return false;

}

function object_keys($obj, $keys){

  if(!is_assoc($obj)) return $obj;
  if(!is_array($keys)) return $obj;

  $result = array();
  for($i = 0 ; $i < count($keys) ; $i++){
    $key = $keys[$i];
    if(!isset($obj[$key])) continue;
    $result[$key] = $obj[$key];
  }
  return $result;

}

function is_assoc($array) {
  if(gettype($array) == "array")
    return (bool)count(array_filter(array_keys($array), 'is_string'));
  return false;
}
function array_index($arr, $indexes, $objResult = false){
  if(!is_array($arr)) return null;
  $result = array();

  for($i = 0 ; $i < count($arr) ; $i++){
    $obj = $arr[$i];

    switch(count($indexes)){
      case 1 :
        $idx0 = $indexes[0];
        if(!isset($obj[$idx0])) continue;
        if(!isset($result[$obj[$idx0]])) $result[$obj[$idx0]] = array();
        $result[$obj[$idx0]][] = $obj;
        break;
      case 2 :
        $idx0 = $indexes[0];
        $idx1 = $indexes[1];
        if(!isset($obj[$idx0]) || !isset($obj[$idx1])) continue;
        $key0 = $obj[$idx0];
        $key1 = $obj[$idx1];
        if(!isset($result[$key0])) $result[$key0] = array();
        if(!isset($result[$key0][$key1])) $result[$key0][$key1] = array();
        $result[$key0][$key1][] = $obj;
        break;
      case 3 :
        $idx0 = $indexes[0];
        $idx1 = $indexes[1];
        $idx2 = $indexes[2];
        if(!isset($obj[$idx0]) || !isset($obj[$idx1]) || !isset($obj[$idx2])) continue;
        $key0 = $obj[$idx0];
        $key1 = $obj[$idx1];
        $key2 = $obj[$idx2];
        if(!isset($result[$key0])) $result[$key0] = array();
        if(!isset($result[$key0][$key1])) $result[$key0][$key1] = array();
        $result[$key0][$key1][$key2] = $obj;
        break;
      default:
        throw new Exception("Unsupported index level.");
    }
  }

  // If array count = 1, remove array
  if($objResult){
    switch(count($indexes)){
      case 1:
        foreach($result as $key=>$arr)
          if(count($arr) == 1) $result[$key] = $arr[0];
        break;
      case 2:
        foreach($result as $key=>$arr1){
          foreach($arr1 as $key1=>$arr){
            if(count($arr) == 1) $result[$key][$key1] = $arr[0];
          }
        }
        break;
      case 3:
        foreach($result as $key=>$arr1){
          foreach($arr1 as $key1=>$arr2){
            foreach($arr2 as $key2=>$arr)
              if(count($arr) == 1) $result[$key][$key1][$key2] = $arr[0];
          }
        }
        break;
    }
  }

  return $result;
}
function array_sanitize($obj){

  if(is_array($obj)){
    foreach($obj as $key=>$value){
      $obj[$key] = gettype($value) == 'string' ? trim($value) : $value;
    }
  }

  return $obj;
}
function array_exclude($arr, $excludes){

  $results = array();
  for($i = 0 ; $i < count($arr) ; $i++){
    if(in_array($arr[$i], $excludes)) continue;
    $results[] = $arr[$i];
  }
  return $results;

}
function array_sort(&$arr, $sorts){

  $key = $sorts[0];

  $sort_func = create_function('$a, $b', '
    if($a["' . $key . '"] == $b["' . $key . '"]) return 0;
    return $a["' . $key . '"] > $b["' . $key . '"] ? 1 : -1;
  ');
  usort($arr, $sort_func);

}
function array_cast($arr, $maps){

  if(is_array($arr) && count($arr) > 0){
    $results = array();
    for($i = 0 ; $i < count($arr) ; $i++){
      $obj = $arr[$i];
      $mapobj = array();
      foreach($maps as $key=>$value)
        $mapobj[$key] = $obj[$value];
      $results[] = $mapobj;
    }
    return $results;
  }
  return $arr;

}
function object_cast($obj, $maps){

  $result = array();
  foreach($maps as $key=>$value){
    $result[$key] = objval($value, $obj);
  }
  return $result;

}
function isdate($value){

  $date_format_regexes = array(
    "/^\\d{4}-\\d{2}-\\d{2}$/",
    "/^\\d{2}-\\d{2}-\\d{4}$/",
    "/^\\d{8}$/"
  );

  for($i = 0 ; $i < count($date_format_regexes) ; $i++){
    $regex = $date_format_regexes[$i];

    if(preg_match($regex, $value) && strtotime($value) > 0) return true;
  }

  //$d = DateTime::createFromFormat('Y-m-d', $value);
  //return $d && $d->format('Y-m-d') == $value;

  return false;
}
function isdatetime($value){

  $date_format_regexes = array(
    "/^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$/",
    "/^\\d{2}-\\d{2}-\\d{4} \\d{2}:\\d{2}:\\d{2}$/",
  );

  for($i = 0 ; $i < count($date_format_regexes) ; $i++){
    $regex = $date_format_regexes[$i];

    if(preg_match($regex, $value) && strtotime($value) > 0) return true;
  }
  return false;
}
function isbool($value){
  if(strval($value) == '0' || strval($value) == '1') return true;
  return false;
}
function isnumber($value){
  $strval = strval($value);
  return preg_match('/^-?[0-9]\d*(\.\d+)?$/', $value);
}
function getdatatype($value){

  if(isbool($value)) return 'bool';
  if(isdatetime($value)) return 'datetime';
  if(isdate($value)) return 'date';
  if(floatval($value) && !preg_match("/^(\\-)\\W/", $value)) return 'number';
  return 'text';

}
function objectToArray($d) {
  if (is_object($d)) {
    // Gets the properties of the given object
    // with get_object_vars function
    $d = get_object_vars($d);
  }

  if (is_array($d)) {
    /*
    * Return array converted to object
    * Using __FUNCTION__ (Magic constant)
    * for recursive call
    */
    return array_map(__FUNCTION__, $d);
  }
  else {
    // Return array
    return $d;
  }
}
function ov($name, $obj, $definition = null){

  // definition keys: required, defaultvalue, type

  $value = null;
  $defaultvalue = isset($definition['defaultvalue']) && $definition['defaultvalue'] ? $definition['defaultvalue'] : '';
  $required = isset($definition['required']) && $definition['required'] ? $definition['required'] : 0;
  $error_message = isset($definition['error_message']) ? $definition['error_message'] : null;

  if($required){

    // If parameter not exists
    if(!isset($obj[$name])) throw new Exception($error_message ? $error_message : "Parameter $name required.");

    $value = $obj[$name];

    // Check datatype
    $datatype = isset($definition['datatype']) ? $definition['datatype'] : 'string';
    $invalid = false;
    switch($datatype){
      case 'int':
        if(!preg_match('/^\w+$/', strval($value))) $invalid = true;
        break;
      default:
        if(empty($value)) $invalid = true;
    }

    if($invalid && !$defaultvalue) throw new Exception($error_message ? $error_message : "Invalid $name parameter.");
    else if($invalid && $defaultvalue) $value = $defaultvalue;

  }
  else{
    $value = isset($obj[$name]) ? $obj[$name] : $defaultvalue;
  }
  return $value;

}
function objval($name, $obj, $definition = null){
  return ov($name, $obj, $definition);
}
function validate_email($exp){
  if(!filter_var($exp, FILTER_VALIDATE_EMAIL)) return false;
  return true;
}
function validate_enum($exp, $enums){
  if(!is_array($enums)) throw new Exception('Enum validation require enums parameter to be array.');
  if(!in_array($exp, $enums)) return false;
  return true;
}
function validate_text($exp, $options){

  if(isset($options['minlength']) && $options['minlength'] > 0){
    if(strlen($exp) < $options['minlength']) return false;
  }
  if(isset($options['maxlength']) && $options['maxlength'] > 0){
    if(strlen($exp) > $options['maxlength']) return false;
  }
  if(isset($options['regex'])){
    if(!preg_match($options['regex'], $exp)) return false;
  }
  return true;

}

function get_os(){
  $obj = array(
    "os" => PHP_OS,
    "php" => PHP_SAPI,
    "system"=> php_uname(),
    "unique"=> md5(php_uname(). PHP_OS . PHP_SAPI)
  );
  return $obj;
}
function date_tz($time, $timezone, $timestamp = -1){
  if($timestamp == -1) $timestamp = time();
  //$defaulttimezone = date_default_timezone_get();
  date_default_timezone_set($timezone);
  $result = date($time, $timestamp);
  //date_default_timezone_set($defaulttimezone);
  return $result;
}
function strtotime_tz($timestamp, $zone){
  //$defaulttimezone = date_default_timezone_get();
  date_default_timezone_set($zone);
  $timestamp = strtotime($timestamp);
  //date_default_timezone_set($defaulttimezone);
  return $timestamp;
}
function in_arrayobject($haystack, $needle){

  $match = false;
  if(is_array($haystack) && !is_assoc($haystack)){
    for($i = 0 ; $i < count($haystack) ; $i++){
      $obj = $haystack[$i];

      $match = true;
      foreach($needle as $key=>$value){
        if(isset($obj[$key]) && $obj[$key] == $value);
        else $match = false;
      }
      if($match) break;
    }
  }
  return $match;

}
function te($obj){
  throw new Exception(print_r($obj, 1));
}
function htmlobjval($attr){

  $result = array();
  if($attr && is_array($attr))
    foreach($attr as $key=>$val)
      $result[] = $key . "=\"" . $val . "\"";
  return implode(' ', $result);

}
function print_var($var){
  throw new Exception(print_r($var, 1));
}

function console_info($msg){
  echo uijs("console.info(" . json_encode($msg) . ")");
}
function console_log($obj){

  global $__CONSOLE_LOGS;
  $__CONSOLE_LOGS[] = $obj;

}
function console_warn($msg){
  echo uijs("console.warn(\"" . htmlentities($msg) . "\")");
}
function uijs($script){
  return "<script type='text/javascript'>$script</script>";
}
function uiwarn($message, $return = false){
  if(!$return) echo uijs("console.warn(\"$message\")");
  return uijs("console.warn(\"$message\")");
}
function uilog($json, $return = false){
  if(!$return) uijs("console.log($json)");
  return uijs("console.log($json)");
}

function tail($filename, $lines = 10, $buffer = 4096, $lineseparator = "\n")
{
  // Open the file
  $f = fopen($filename, "rb");

  // Jump to last character
  fseek($f, -1, SEEK_END);

  // Read it and adjust line number if necessary
  // (Otherwise the result would be wrong if file doesn't end with a blank line)
  if(fread($f, 1) != $lineseparator) $lines -= 1;

  // Start reading
  $output = '';
  $chunk = '';

  // While we would like more
  while(ftell($f) > 0 && $lines >= 0)
  {
    // Figure out how far back we should jump
    $seek = min(ftell($f), $buffer);

    // Do the jump (backwards, relative to where we are)
    fseek($f, -$seek, SEEK_CUR);

    // Read a chunk and prepend it to our output
    $output = ($chunk = fread($f, $seek)).$output;

    // Jump back to where we started reading
    fseek($f, -mb_strlen($chunk, '8bit'), SEEK_CUR);

    // Decrease our line counter
    $lines -= substr_count($chunk, $lineseparator);
  }

  // While we have too many lines
  // (Because of buffer size we might have read too many)
  while($lines++ < 0)
  {
    // Find first newline and remove all text before that
    $output = substr($output, strpos($output, $lineseparator) + 1);
  }

  // Close file and return
  fclose($f);
  return $output;
}
function ui_async_put(){

  ob_end_clean();
  ob_clean();
  ob_start();
  while (@ob_end_flush());

  $url = $mimetype = '';
  if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    $usr_dir = str_replace("rcfx\\php", "", dirname(__FILE__)) . 'usr\\';
  else
    $usr_dir = str_replace("rcfx/php", "", dirname(__FILE__)) . 'usr/';

  if($_SERVER['CONTENT_TYPE'] == 'application/vnd.ms-excel' && $_SERVER['CONTENT_LENGTH'] > 0){
    $url = $usr_dir . uniqid() . ".xls";
    $mimetype = 'application/vnd.ms-excel';
    $putdata = fopen("php://input", "r");

    if(!file_exists($usr_dir)) throw new Exception('Directory not exists.');
    if(!is_writable($usr_dir)) throw new Exception('Write permission denied.');

    $fp = fopen($url, "w");
    while ($data = fread($putdata, 1024))
      fwrite($fp, $data);
    fclose($fp);
    fclose($putdata);
  }
  else if($_SERVER['CONTENT_TYPE'] == 'text/csv' || $_SERVER['CONTENT_TYPE'] == 'text/comma-separated-values'){
    $url = $usr_dir . uniqid() . '.csv';
    $mimetype = 'text/csv';
    $putdata = fopen("php://input", "r");

    if(!file_exists($usr_dir)) throw new Exception('Directory not exists.');
    if(!is_writable($usr_dir)) throw new Exception('Write permission denied.');

    $fp = fopen($url, "w");
    while ($data = fread($putdata, 1024))
      fwrite($fp, $data);
    fclose($fp);
    fclose($putdata);
  }
  else if($_SERVER['CONTENT_TYPE'] == 'text/plain'){
    $url = $usr_dir . uniqid() . '.txt';
    $mimetype = 'text/plain';
    $putdata = fopen("php://input", "r");

    if(!file_exists($usr_dir)) throw new Exception('Directory not exists.');
    if(!is_writable($usr_dir)) throw new Exception('Write permission denied.');

    $fp = fopen($url, "w");
    while ($data = fread($putdata, 1024))
      fwrite($fp, $data);
    fclose($fp);
    fclose($putdata);
  }
  else if(in_array($_SERVER['CONTENT_TYPE'], array('image/jpeg', 'image/png', 'image/jpg'))){
    $ext = str_replace('image/', '', $_SERVER['CONTENT_TYPE']);
    $filename = uniqid() . '.' . $ext;
    $url = $usr_dir . 'img/' . $filename;
    $mimetype = $_SERVER['CONTENT_TYPE'];
    $putdata = fopen("php://input", "r");

    if(!file_exists($usr_dir)) throw new Exception('Directory not exists.');
    if(!is_writable($usr_dir)) throw new Exception('Write permission denied.');

    $fp = fopen($url, "w");
    while ($data = fread($putdata, 1024))
      fwrite($fp, $data);
    fclose($fp);
    fclose($putdata);
  }
  else
    throw new Exception('Unsupported mime type. [' . $_SERVER['CONTENT_TYPE'] . ']');

  $method = $_GET['_asyncm'];
  ob_end_clean();
  if(function_exists($method)){
    $qs = $_SERVER['QUERY_STRING'];
    $params = array();
    parse_str($qs, $params);
    $params['fileurl'] = $url;
    $params['filename'] = $filename;
    $params['mimetype'] = $mimetype;

    try{
      $c = call_user_func_array($method, array($params));
      echo $c;
    }
    catch(Exception $ex){
      header("HTTP/1.1 500 Internal Server Error");
      die($ex->getMessage());
    }
  }
  else{
    if(!empty($method)){
      header("HTTP/1.1 500 Internal Server Error");
      die("Method not exists. [$method]");
    }
  }

  //echo json_encode(array('url'=>$url, 'mimetype'=>$mimetype));
}

function ui_async_post(){

  ob_end_clean();
  ob_clean();
  ob_start();
  while (@ob_end_flush());

  $method = $_GET['_asyncm'];

  if(function_exists($method)){
    $params = objectToArray(json_decode(file_get_contents("php://input")));
    if(!$params) $params = array(); // Params hack

    for($i = 0 ; $i < count($params) ; $i++)
      $params[$i] = array_sanitize($params[$i]);

    $c = call_user_func_array($method, $params);
    echo $c;
  }
  else
    throw new Exception("Method not exists. [$method]");
}

function ui_async(){

  if(isset($_GET['_async'])){

    ob_start();
    global $starttime;
    $starttime = microtime(1);
    if(!session_isopen() && $_GET['_asyncm'] != 'ui_login'){
      echo uijs("window.location = '';");
    }
    else{

      try{
        switch($_SERVER['REQUEST_METHOD']){
          case 'PUT' :
            ui_async_put();
            break;
          case 'POST' :
            ui_async_post();
            break;
        }
      }
      catch(Exception $ex){
        //header("HTTP/1.1 500 Internal Server Error");
        //die($ex->getMessage());

        $errorlines = array();
        $traces = debug_backtrace(true);
        for($i = 0 ; $i < count($traces) ; $i++)
          $errorlines[] = $traces[$i]['file'] . ":" . $traces[$i]['line'];
        $errorlines = array();

        echo ui_dialog("Error", $ex->getMessage() . "\n\n" . implode("\n", $errorlines));
      }

      log_write_end();

      // Debug print
      global $starttime, $__LOGS, $__DEBUGS, $pdo_logs;
      $debug = array(
        'ram_used'=>memory_get_usage() * 0.001 . " KB",
        'execution_time'=>(microtime(1) - $starttime) . " s",
        'pdo_logs'=>$pdo_logs,
        'debugs'=>$__DEBUGS
      );
      if(is_array($__DEBUGS) && count($__DEBUGS) > 0) echo uijs("debug = " . json_encode($debug) . ";console.log(debug)");
    }


    exit();
  }

}

function curl_get($url){

  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL, $url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
  $output = curl_exec($ch);
  curl_close($ch);

  return $output;
}

function umid($salt = ""){
  if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    /*$temp = sys_get_temp_dir().DIRECTORY_SEPARATOR."diskpartscript.txt";
    if(!file_exists($temp) && !is_file($temp)) file_put_contents($temp, "select disk 0\ndetail disk");
    $output = shell_exec("diskpart /s ".$temp);
    $lines = explode("\n",$output);
    $result = array_filter($lines,function($line) {
      return stripos($line,"ID:")!==false;
    });
    if(count($result)>0) {
      $result = array_shift(array_values($result));
      $result = explode(":",$result);
      $result = trim(end($result));
    } else $result = $output;*/
  } else {
    $result = shell_exec("blkid -o value -s UUID");
    if(stripos($result,"blkid")!==false) {
      $result = $_SERVER['HTTP_HOST'];
    }
  }
  return md5($salt.md5($result));
}
//if(umid('da41bceff97b1cf96078ffb249b3d66e') != '44f87ca5cd624a23e914edf919b48beb') exit();

function curl_post($url, $postdata){

  $fields = array();
  if(is_array($postdata))
    foreach($postdata as $key=>$value){
      $fields[$key] = urlencode($value);
    }
  $fields_string = '';
  foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
  rtrim($fields_string, '&');

  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL, $url);
  curl_setopt($ch,CURLOPT_POST, count($fields));
  curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
  $output = curl_exec($ch);
  curl_close($ch);

  $arr = objectToArray(json_decode($output));
  return $arr;
}

function excel_to_array($url){

  require_once 'rcfx/php/PHPExcel/IOFactory.php';

  $objReader = new PHPExcel_Reader_Excel5();
  $objPHPExcel = $objReader->load($url);
  $arr = $objPHPExcel->getActiveSheet()->toArray(null, true, true, false);

  //echo "<script type='text/javascript'>console.log(" . json_encode($arr) . ")</script>";

  $columns = array();
  $data0 = $arr[0];
  for($i = 0 ; $i < count($data0) ; $i++)
    $columns[] = array('name'=>$data0[$i], 'index'=>$i);

  $data = array();
  for($i = 1 ; $i < count($arr) ; $i++){
    $obj = $arr[$i];

    $datarow = array();
    foreach($columns as $column){
      $name = $column['name'];
      $value = $obj[$column['index']];

      $datarow[$name] = $value;
    }
    $data[] = $datarow;
  }

  return $data;
}
function array_to_excel($arr, $path){

  require_once dirname(__FILE__) . '/PHPExcel.php';
  $objPHPExcel = new PHPExcel();
  $objPHPExcel->getActiveSheet()->fromArray($arr, NULL, 'A1');
  $writer = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
  $writer->save($path);

}
function array_to_csv($data, $path){

  $fp = fopen($path, "w");
  if(is_array($data) && count($data) > 0){

    $data0 = $data[0];
    $headers = array();
    foreach($data0 as $key=>$value)
      $headers[] = $key;
    fputcsv($fp,$headers);

    foreach ($data as $obj)
      fputcsv($fp,$obj);

  }
  fclose($fp);

}

function php_to_array($code){

  $func = create_function("", $code);
  $arr = $func();
  return $arr;


}

function sanitize_text_output($text){
  return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

function csvtext_to_array($text, &$headers){

  $text = mb_convert_encoding($text, "UTF-8");

//  $file = 'usr/temp.csv';
//  file_put_contents($file, $text);

  $file = fopen('php://temp', 'r+');
  fwrite($file, $text);
  rewind($file);

  $headers = null;
  $results = array();
  while (($data = fgetcsv($file, 1000, ",")) !== FALSE) {
    if($headers == null){
      $headers = $data;
    }
    else{
      $obj = array();
      for($i = 0 ; $i < count($headers) ; $i++)
        $obj[trim($headers[$i])] = $data[$i];
      $results[] = $obj;
    }
  }
  fclose($file);

  return $results;
}

function gridcolumns_identify($data, $firstrowonly = true){

  $columns = array();
  if($firstrowonly){
    $data0 = $data[0];

    foreach($data0 as $key=>$value){

      $datatype = '';
      if(is_numeric($value)) $datatype = 'number';

      $columns[] = array(
        'active'=>1,
        'name'=>$key,
        'text'=>ucwords($key),
        'width'=>50,
        'datatype'=>$datatype
      );
    }
  }
  return $columns;

}

function data_filter_obj($obj, $filters){

  $match = true;

  for($i = 0 ; $i < count($filters) ; $i++){
    $filter = $filters[$i];
    $filtername = $filter['name'];
    $filtertype = objval('type', $filter);

    //if(!isset($obj[$filtername])) continue;
    $value = $obj[$filtername];
    switch($filtertype){
      case 'date':
        $operator = $filter['operator'];
        $value1 = $filter['value'];
        $value2 = $filter['value1'];

        switch($operator){
          case 'thisweek':
            $dayofweek = date('N', strtotime('now'));
            $thisweek_starttime = strtotime(date('Ymd') . '000000') - (($dayofweek - 1) * (60 * 60 * 24));
            $thisweek_endtime = strtotime(date('Ymd') . '235959') + ((7 - $dayofweek) * (60 * 60 * 24));
            if(strtotime($value) >= $thisweek_starttime && strtotime($value) <= $thisweek_endtime) $match = true;
            else $match = false;
            break;
          case 'thismonth':
            $thismonth_starttime = mktime(0, 0, 0, date('n'), 1, date('Y'));
            $thismonth_endtime = mktime(23, 59, 59, date('n') + 1, 0, date('Y'));
            if(strtotime($value) >= $thismonth_starttime && strtotime($value) <= $thismonth_endtime) $match = true;
            else $match = false;
            break;
          case 'thisyear':
            $thisyear_starttime = mktime(0, 0, 0, 1, 1, date('Y'));
            $thisyear_endtime = mktime(23, 59, 59, 12, 31, date('Y'));
            if(strtotime($value) >= $thisyear_starttime && strtotime($value) <= $thisyear_endtime) $match = true;
            else $match = false;
            break;
          case 'today':
            if(date('Ymd', strtotime($value)) == date('Ymd', strtotime('now'))) $match = true;
            else $match = false;
            break;
          case 'on':
            if(date('Ymd', strtotime($value)) == $value1) $match = true;
            else $match = false;
            break;
          case 'between':
            $between_starttime = strtotime($value1 . '000000');
            $between_endtime = strtotime($value2 . '235959');
            if(strtotime($value) >= $between_starttime && strtotime($value) <= $between_endtime) $match = true;
            else $match = false;
            break;
          case 'before':
            $before_starttime = strtotime($value2 . '000000');
            if(strtotime($value) < $before_starttime) $match = true;
            else $match = false;
            break;
          case 'after':
            $after_starttime = strtotime($value1 . '235959');
            trace(date('Ymd', $after_starttime), 1);
            if(strtotime($value) > $after_starttime) $match = true;
            else $match = false;
            break;
        }
        break;
      case 'number':
        if($filter['value'] != ''){
          $operator = $filter['operator'];
          $value1 = floatval($filter['value']);
          $value2 = floatval($filter['value1']);
          switch($operator){
            case '>': if($value > $value1); else $match = false; break;
            case '<': if($value < $value1); else $match = false; break;
            case '>=': if($value >= $value1); else $match = false; break;
            case '<=': if($value <= $value1); else $match = false; break;
            case '=': if($value == $value1); else $match = false; break;
            case '<>': if($value != $value1); else $match = false; break;
            case 'between': if($value >= $value1 && $value <= $value2); else $match = false; break;
          }
        }
        break;
      case 'money':
        if($filter['value'] != ''){
          $operator = $filter['operator'];
          $value1 = floatval($filter['value']);
          $value2 = floatval($filter['value1']);
          switch($operator){
            case '>': if($value > $value1); else $match = false; break;
            case '<': if($value < $value1); else $match = false; break;
            case '>=': if($value >= $value1); else $match = false; break;
            case '<=': if($value <= $value1); else $match = false; break;
            case '=': if($value == $value1); else $match = false; break;
            case '<>': if($value != $value1); else $match = false; break;
            case 'between': if($value >= $value1 && $value <= $value2); else $match = false; break;
          }
        }
        break;
      case 'bool':
        switch($filter['operator']){
          case '0': if($value) $match = false; break;
          case '1': if(!$value) $match = false; break;
        }
        break;
      default:
        $operator = $filter['operator'];
        $value1 = $filter['value'];
        if(strpos($value1, '|') !== false) $value1 = explode('|', $value1);

        if(strpos($filtername, '|') !== false){

          $filternames = explode('|', $filtername);

          $match = false;
          switch($operator){
            case 'contains':
              foreach($filternames as $filtername){
                $value = $obj[$filtername];
                if(is_array($value1))
                  foreach($value1 as $value1value){
                    if(strpos(strtolower($value), strtolower($value1value)) !== false)
                      return true;
                  }
                else
                  if(strpos(strtolower($value), strtolower($value1)) !== false)
                    return true;
              }
              break;
          }

        }
        else{

          switch($operator){
            case 'contains':
              if(strpos(strtolower($value), strtolower($value1)) !== false);
              else $match = false;
              break;
            case 'equals':
              if(strtolower($value) != strtolower($value1)) $match = false;
              break;
            case 'notempty':
              if(!empty($value)) $match = true;
              break;

          }

        }

    }

    if(!$match) break;
  }

  return $match;

}
function data_filter(&$data, $filters){

  $results = array();
  if(is_array($data) && is_array($filters)){
    foreach($data as $obj){
      $match = data_filter_obj($obj, $filters);
      if($match) $results[] = $obj;
    }
  }
  $data = $results;

}

function data_sort(&$arr, $sorts){
  if(is_array($sorts) && is_array($arr) && count($sorts) > 0){
    $sortfunctionexps = array();
    for($i = 0 ; $i < count($sorts) ; $i++){
      $sort = $sorts[$i];
      $sortname = $sort['name'];
      $sorttype = $sort['sorttype'];

      $sortfunctionexps[] = 'if($obj1["'.$sortname.'"] == $obj2["'.$sortname.'"]){ [equalexp] } return $obj1["'.$sortname.'"] ' . ($sorttype == 'asc' ? '>' : '<') . ' $obj2["'.$sortname.'"] ? 1 : -1;';
    }

    $sortfunctionexps[count($sortfunctionexps) - 1] = str_replace('[equalexp]', 'return 0;', $sortfunctionexps[count($sortfunctionexps) - 1]);
    for($i = count($sortfunctionexps) - 2 ; $i >= 0 ; $i--){
      $sortfunctionexps[$i] = str_replace('[equalexp]', $sortfunctionexps[$i + 1], $sortfunctionexps[$i]);
    }
    $sortfunctionexp = $sortfunctionexps[0];

    $sortfunction = create_function('$obj1,$obj2', $sortfunctionexp);
    usort($arr, $sortfunction);
  }
}
function data_group($data, $groups){

  $groupdata = data_group_depth($data, $groups, 0);

  $inheritedcolumns = array();
  foreach($groups as $group)
    $inheritedcolumns[] = $group['name'];

  //echo uijs("console.log(" . json_encode($inheritedcolumns) . ")");

  $groupdata = data_group_calc($groupdata, 0, $inheritedcolumns);
  return $groupdata;

  //$obj = array('__groupitems'=>$groupdata);
  //$obj = data_group_calc($obj, $groups);
  //return $obj['__groupitems'];

}
function data_group_calc($arr, $level = 0, $inheritedcolumns = null, $sorts = null, $groupname = null){

  for($i = 0 ; $i < count($arr) ; $i++){

    $obj = $arr[$i];
    $columns = $obj['__groupcolumns'];
    $groupname = $obj['__groupname'];
    $aggregrate = $obj['__groupaggregrate'];
    $sorts = $obj['__groupsorts'];

    if(count($obj['__groupitems']) > 0){

      // Calculate child object first if it's group
      if(isset($obj['__groupitems'][0]['__groupname']))
        $obj['__groupitems'] = data_group_calc($obj['__groupitems'], $level + 1, $inheritedcolumns, $sorts, $groupname);

      if(is_array($inheritedcolumns)){
        foreach($inheritedcolumns as $columnname){
          $columnlogic = 'first';
          data_group_calc_column($obj, $columnname, $columnlogic, $aggregrate);
        }
      }

      foreach($columns as $column){
        $columnname = $column['name'];
        $columnlogic = $column['logic'];

        data_group_calc_column($obj, $columnname, $columnlogic, $aggregrate);
      }

    }

    $arr[$i] = $obj;

  }
  data_sort($arr, $sorts);

  return $arr;
}
function data_group_calc_column(&$obj, $columnname, $columnlogic, $aggregrate){

  switch($columnlogic){
    case 'sum':
      $sum = 0;
      for($j = 0 ; $j < count($obj['__groupitems']) ; $j++){
        if(isset($obj['__groupitems'][$j][$columnname]))
          $sum += objval($columnname, $obj['__groupitems'][$j]);
        else if(isset($obj['__groupitems'][$j][$columnname . '.sum']))
          $sum += objval($columnname . '.sum', $obj['__groupitems'][$j]);
      }
      $obj[$columnname . '.sum'] = $sum;
      break;
    case 'min':
      $min = null;
      for($j = 0 ; $j < count($obj['__groupitems']) ; $j++){
        $item = $obj['__groupitems'][$j];
        if($min == null || $item[$columnname] < $min) $min = $item[$columnname];
      }
      $obj[$columnname . '.min'] = $min;
      break;
    case 'max':
      $max = 0;
      for($j = 0 ; $j < count($obj['__groupitems']) ; $j++){
        $item = $obj['__groupitems'][$j];
        if($item[$columnname] > $max) $max = $item[$columnname];
      }
      $obj[$columnname . '.max'] = $max;
      break;
    default:
      $obj[$columnname] = objval($columnname, $obj['__groupitems'][0]);
      if($columnname == $groupname){
        switch($aggregrate){
          case 'monthly':  $obj[$columnname] = date('M Y', strtotime($obj[$columnname])); break;

        }
      }
      break;
  }

}
function data_group_depth($data, $groups, $level){

  $groupdata = data_groupify($groups[$level], $data);

  if($level + 1 < count($groups))
    for($i = 0 ; $i < count($groupdata) ; $i++)
      $groupdata[$i]['__groupitems'] = data_group_depth($groupdata[$i]['__groupitems'], $groups, $level + 1);

  return $groupdata;
}
function data_groupify($group, $data){

  $groupname = $group['name'];
  $groupcolumns = $group['columns'];
  $groupaggregrate = $group['aggregrate'];
  $groupsorts = objval('sorts', $group);

  $datakey = array();
  for($i = 0 ; $i < count($data) ; $i++){

    $obj = $data[$i];
    $keyvalue = $obj[$groupname];

    switch($groupaggregrate){
      case 'monthly': $keyvalue = date('M Y', strtotime($keyvalue)); break;
    }

    if(!isset($datakey[$keyvalue])) $datakey[$keyvalue] = array(
      '__groupname'=>$groupname,
      '__groupvalue'=>$keyvalue,
      '__groupcolumns'=>$groupcolumns,
      '__groupaggregrate'=>$groupaggregrate,
      '__groupsorts'=>$groupsorts,
      '__groupitems'=>array()
    );

    $datakey[$keyvalue]['__groupitems'][] = $obj;
  }

  $datagroups = array();
  foreach($datakey as $key=>$datagroup){
    /*
    for($i = 0 ; $i < count($groupcolumns) ; $i++){
      $groupcolumn = $groupcolumns[$i];
      $groupcolumnname = $groupcolumn['name'];
      $groupcolumnlogic = $groupcolumn['logic'];
      $groupcolumnvalue = '';


      switch($groupcolumnlogic){
        case 'first':
          $groupcolumnvalue = count($datagroup['__groupitems']) > 0 ? $datagroup['__groupitems'][0][$groupcolumnname] : 'No item';
          break;
        case 'sum':
          $sum = 0;
          if(is_array($datagroup['__groupitems']))
            for($j = 0 ; $j < count($datagroup['__groupitems']) ; $j++){
              $item = $datagroup['__groupitems'][$j];
              $sum += floatval($item[$groupcolumnname]);
            }
          $groupcolumnvalue = $sum;
          break;
        case 'min':
          $min = null;
          if(is_array($datagroup['__groupitems']))
            for($j = 0 ; $j < count($datagroup['__groupitems']) ; $j++){
              $item = $datagroup['__groupitems'][$j];
              $val = floatval($item[$groupcolumnname]);
              if($min == null) $min = $val;
              else if($val < $min) $min = $val;
            }
          $groupcolumnvalue = $min;
          break;
        case 'max':
          $max = null;
          if(is_array($datagroup['__groupitems']))
            for($j = 0 ; $j < count($datagroup['__groupitems']) ; $j++){
              $item = $datagroup['__groupitems'][$j];
              $val = floatval($item[$groupcolumnname]);
              if($max == null) $max = $val;
              else if($val > $max) $max = $val;
            }
          $groupcolumnvalue = $max;
          break;
        case 'avg':
          $avg = 0;
          if(is_array($datagroup['__groupitems'])){
            for($j = 0 ; $j < count($datagroup['__groupitems']) ; $j++){
              $item = $datagroup['__groupitems'][$j];
              $val = floatval($item[$groupcolumnname]);
              $avg += $val;
            }
            $avg = round($avg / count($datagroup['__groupitems']));
          }
          $groupcolumnvalue = $avg;
          break;
      }


      $datagroup[$groupcolumnname . ($groupcolumnlogic != 'first' ? '.' . $groupcolumnlogic : '')] = $groupcolumnvalue;
    }
    */

    $datagroups[] = $datagroup;

  }

  /*
  data_sort($datagroups, $groupsorts);

  if(isset($group['limit']) && isset($group['offset'])){
    $limit = $group['limit'];
    $offset = $group['offset'];
    $datagroups = array_splice($datagroups, $offset, $limit);
  }
  */

  return $datagroups;

}
function data_calculate_logicalcolumn($arr, $columns){

  if(is_array($arr) && is_array($columns)){
    $logicalcolumns = array();
    for($i = 0 ; $i < count($columns) ; $i++)
      if(objval('type', $columns[$i]) == 'logical')
        $logicalcolumns[] = $columns[$i];

    if(count($logicalcolumns) > 0){
      for($i = 0 ; $i < count($arr) ; $i++){
        $obj = $arr[$i];
        $prevobj = $i - 1 >= 0 ? $arr[$i - 1] : null;

        foreach($logicalcolumns as $logicalcolumn){
          $logicalformula = objval('logicalformula', $logicalcolumn);
          $logicalformula = str_replace('PREV', '$prevobj', $logicalformula);
          $logicalformula = str_replace('CURR', '$obj', $logicalformula);
          $func = create_function('$obj,$prevobj', "return " . $logicalformula . ";");
          //if(!$func) throw new Exception(error_get_last()['message']);
          $value = $func($obj, $prevobj);

          $arr[$i][$logicalcolumn['name']] = $value;
        }
      }

    }
  }

  return $arr;

}

function sortquery_from_sorts($sorts, $columnaliases = null){

  // Sort queries as required by both view type
  $sortqueries = array();
  if(isset($sorts) && is_array($sorts)){
    for($i = 0 ; $i < count($sorts) ; $i++){
      $sort = $sorts[$i];
      $sortname = $sort['key'];
      $sorttype = $sort['type'];

      if(isset($columnaliases[$sortname]))
        $sortname = $columnaliases[$sortname];

      $sortqueries[] = "$sortname $sorttype";

    }
  }
  $sortqueries = implode(', ', $sortqueries);
  if(strlen($sortqueries) > 0) $sortqueries = " ORDER BY $sortqueries";

  return $sortqueries;
}

function wherequery_from_filters(&$params, $filters, $excludes = null, $includes = null){

  // Default excluded filters
  unset($filters['page']);
  unset($filters['row_per_page']);

  $wherequery = array();

  if(is_assoc($filters)){

    foreach($filters as $key=>$value){

      if(is_array($excludes) && in_array($key, $excludes)) continue;

      if(is_array($includes)){

        if(isset($includes[$key])){
          $params[] = $value;
          $wherequery[] = "`$key` = ?";
        }

      }
      else{

        $params[] = $value;
        $wherequery[] = "`$key` = ?";

      }

    }

  }
  else if(is_array($filters)){

    for($i = 0 ; $i < count($filters) ; $i++){

      $filter = $filters[$i];

      $name = objval('name', $filter);
      if(is_array($excludes) && in_array($name, $excludes)) continue;

      $operator = objval('operator', $filter);
      $datatype = objval('datatype', $filter);
      $value = objval('value', $filter, array('defaultvalue'=>''));

      if(isset($includes[$name])){

        $key = $includes[$name];


      }
      else{



      }

      

    }

  }

  $wherequery = count($wherequery) > 0 ? ' WHERE ' . implode(' AND ', $wherequery) : '';
  return $wherequery;

}
function wherequery_from_filters2(&$params, $filters, $columnaliases = null){

  $wherequeries = array();
  if(isset($filters) && is_array($filters)){
    for($i = 0 ; $i < count($filters) ; $i++){
      $filter = $filters[$i];
      $filtername = $filter['name'];
      $filteroperator = $filter['operator'];
      $filtervalue = $filter['value'];
      $filtervalue1 = objval('value1', $filter);

      if(strpos($filtername, '|') !== false){

        $innerwherequeries = array();
        $filternames = explode('|', $filtername);
        foreach($filternames as $filtername){
          $filtername = trim($filtername);

          if(is_assoc($columnaliases)){
            if(!isset($columnaliases[$filtername])) continue;

            if(strpos($columnaliases[$filtername], 'as ') !== false)
              $columnaliases[$filtername] = substr($columnaliases[$filtername], 0, strpos($columnaliases[$filtername], 'as '));
            $filtername = $columnaliases[$filtername];
          }

          if(in_array($filteroperator, array('>', '>=', '=', '<', '<=', '<>'))){
            $innerwherequeries[] = "$filtername $filteroperator ?";
            array_push($params, $filtervalue);
          }
          else{
            switch($filteroperator){
              case 'today':
                $innerwherequeries[] = "DATE($filtername) = ?";
                array_push($params, date('Ymd'));
                break;
              case 'thisweek':
                $dayofweek = date('N', strtotime('now'));
                $thisweek_starttime = strtotime(date('Ymd') . '000000') - (($dayofweek - 1) * (60 * 60 * 24));
                $thisweek_endtime = strtotime(date('Ymd') . '235959') + ((7 - $dayofweek) * (60 * 60 * 24));
                $innerwherequeries[] = "DATE($filtername) >= ? AND DATE($filtername) <= ?";
                array_push($params, date('YmdHis', $thisweek_starttime), date('YmdHis', $thisweek_endtime));
                break;
              case 'prevmonth':
                $innerwherequeries[] = "MONTH($filtername) = ? AND YEAR($filtername) = ?";
                $prevmonth = date('Ymd', mktime(0, 0, 0, date('m') - 1, date('j'), date('Y')));
                array_push($params, date('m', strtotime($prevmonth)), date('Y', strtotime($prevmonth)));
                break;
              case 'thismonth':
                $innerwherequeries[] = "MONTH($filtername) = ?";
                array_push($params, date('m'));
                break;
              case 'thisyear':
                $innerwherequeries[] = "YEAR($filtername) = ?";
                array_push($params, date('Y'));
                break;
              case 'on':
                $innerwherequeries[] = "DATE($filtername) = ?";
                array_push($params, $filtervalue);
                break;
              case 'between':
                $innerwherequeries[] = "DATE($filtername) >= ? AND DATE($filtername) <= ?";
                array_push($params, $filtervalue, $filtervalue1);
                break;
              case 'before':
                $innerwherequeries[] = "DATE($filtername) < ?";
                array_push($params, $filtervalue);
                break;
              case 'after':
                $innerwherequeries[] = "DATE($filtername) > ?";
                array_push($params, $filtervalue);
                break;
              case 'equals':
                $innerwherequeries[] = "$filtername = ?";
                array_push($params, "$filtervalue");
                break;
              case 'contains':
                $innerwherequeries[] = "$filtername LIKE ?";
                array_push($params, "%$filtervalue%");
                break;
              case 'in':
                $filtervalue_explodes = explode(',', $filtervalue);
                $in_queries = array();
                for($j = 0 ; $j < count($filtervalue_explodes) ; $j++){
                  $in_queries[] = "?";
                  array_push($params, trim($filtervalue_explodes[$j]));
                }
                $innerwherequeries[] = "$filtername IN (" . implode(', ', $in_queries) . ")";
                break;
            }
          }
        }
        if(count($innerwherequeries) > 0){
          $innerwherequeries = "(" . implode(' OR ', $innerwherequeries) . ")";
          $wherequeries[] = $innerwherequeries;
        }

      }
      else{

        if(is_assoc($columnaliases)){
          if(!isset($columnaliases[$filtername])) continue;

          if(strpos($columnaliases[$filtername], 'as ') !== false)
            $columnaliases[$filtername] = substr($columnaliases[$filtername], 0, strpos($columnaliases[$filtername], 'as '));
          $filtername = $columnaliases[$filtername];
        }

        if(in_array($filteroperator, array('>', '>=', '=', '<', '<=', '<>'))){
          $wherequeries[] = "$filtername $filteroperator ?";
          array_push($params, $filtervalue);
        }
        else{
          switch($filteroperator){
            case 'today':
              $wherequeries[] = "DATE($filtername) = ?";
              array_push($params, date('Ymd'));
              break;
            case 'thisweek':
              $dayofweek = date('N', strtotime('now'));
              $thisweek_starttime = strtotime(date('Ymd') . '000000') - (($dayofweek - 1) * (60 * 60 * 24));
              $thisweek_endtime = strtotime(date('Ymd') . '235959') + ((7 - $dayofweek) * (60 * 60 * 24));
              $wherequeries[] = "DATE($filtername) >= ? AND DATE($filtername) <= ?";
              array_push($params, date('YmdHis', $thisweek_starttime), date('YmdHis', $thisweek_endtime));
              break;
            case 'thismonth':
              $wherequeries[] = "MONTH($filtername) = ?";
              array_push($params, date('m'));
              break;
            case 'prevmonth':
              $wherequeries[] = "MONTH($filtername) = ? AND YEAR($filtername) = ?";
              $prevmonth = date('Ymd', mktime(0, 0, 0, date('m') - 1, date('j'), date('Y')));
              array_push($params, date('m', strtotime($prevmonth)), date('Y', strtotime($prevmonth)));
              break;
            case 'thisyear':
              $wherequeries[] = "YEAR($filtername) = ?";
              array_push($params, date('Y'));
              break;
            case 'on':
              $wherequeries[] = "DATE($filtername) = ?";
              array_push($params, $filtervalue);
              break;
            case 'between':
              $wherequeries[] = "DATE($filtername) >= ? AND DATE($filtername) <= ?";
              array_push($params, $filtervalue, $filtervalue1);
              break;
            case 'before':
              $wherequeries[] = "DATE($filtername) < ?";
              array_push($params, $filtervalue);
              break;
            case 'after':
              $wherequeries[] = "DATE($filtername) > ?";
              array_push($params, $filtervalue);
              break;
            case 'equals':
              $wherequeries[] = "$filtername = ?";
              array_push($params, "$filtervalue");
              break;
            case 'contains':
              $wherequeries[] = "$filtername LIKE ?";
              array_push($params, "%$filtervalue%");
              break;
            case 'in':
              $filtervalue_explodes = explode(',', $filtervalue);
              $in_queries = array();
              for($j = 0 ; $j < count($filtervalue_explodes) ; $j++){
                $in_queries[] = "?";
                array_push($params, trim($filtervalue_explodes[$j]));
              }
              $wherequeries[] = "$filtername IN (" . implode(', ', $in_queries) . ")";
              break;
          }
        }

      }

    }
  }
  $wherequeries = implode(' AND ', $wherequeries);
  if(strlen($wherequeries) > 0) $wherequeries = " WHERE $wherequeries";

  return $wherequeries;

}
function wherequery_from_filters3(&$params, $filters, $columns){

  $query = array();
  $last_filter_type = '';
  if(is_array($filters)){
    foreach($filters as $filter){
      $filter_type = strtolower(objval('type', $filter, array('defaultvalue'=>'item')));

      switch($filter_type){
        case '(':
          if(count($query) > 0 && !in_array($last_filter_type, array('and', 'or')))
            $query[] = ' AND ';
          $query[] = "(";
          $last_filter_type = $filter_type;
          break;
        case ')':
          $query[] = ")";
          $last_filter_type = $filter_type;
          break;
        case 'and':
          $query[] = ' AND ';
          $last_filter_type = $filter_type;
          break;
        case 'or':
          $query[] = ' OR ';
          $last_filter_type = $filter_type;
          break;
        case 'join_matcher':
          if(count($query) > 0 && !in_array($last_filter_type, array('and', 'or')))
            $query[] = ' AND ';

          $value = objval('value', $filter);
          $query[] = $value;
          break;
        case 'item':

          if(count($query) > 0 && in_array($last_filter_type, array('item', ')', 'join_matcher')))
            $query[] = " AND ";

          $key = objval('key', $filter);
          $operator = objval('operator', $filter);
          $value = objval('value', $filter);

          $key = isset($columns[$key]) ? $columns[$key] : $key;
          $key = str_replace('!', '', $key);

          switch($operator){
            case 'equal':
              $query[] = "$key = ?";
              $params[] =  $value;
              break;
            case 'equals':
              $query[] = "$key = ?";
              $params[] =  $value;
              break;
            case 'contains':
              $query[] = "LOWER($key) LIKE ?";
              $params[] = "%" . strtolower($value) . "%";
              break;

            /* BEGIN Number Operator */
            case '>=':
              $query[] = "$key >= ?";
              $params[] = $value;
              break;
            case '>':
              $query[] = "$key > ?";
              $params[] = $value;
              break;
            case '<':
              $query[] = "$key < ?";
              $params[] = $value;
              break;
            case '<=':
              $query[] = "$key <= ?";
              $params[] = $value;
              break;
            case '=':
              $query[] = "$key = ?";
              $params[] = $value;
              break;
            case '!=':
              $query[] = "$key != ?";
              $params[] = $value;
              break;
            /* END Number Operator */

            /* BEGIN Date Operator */
            case 'this_year':
              $query[] = "YEAR($key) = ?";
              $params[] = date('Y');
              break;
            case 'this_month':
              $query[] = "MONTH($key) = ? AND YEAR($key) = ?";
              $params[] = date('m');
              $params[] = date('Y');
              break;
            case 'prev_month':
              $query[] = "MONTH($key) = ? AND YEAR($key) = ?";
              $params[] = date('m') - 1;
              $params[] = date('Y');
              break;
            case 'between':
              $value = explode(',', $value);
              $start_date = $value[0];
              $end_date = $value[1];
              $query[] = "DATE($key) BETWEEN ? AND ?";
              $params[] = date('Ymd', strtotime($start_date));
              $params[] = date('Ymd', strtotime($end_date));
              break;
            /* END Date Operator */

          }

          $last_filter_type = $filter_type;

          break;
      }
    }
  }

  if(count($query) > 0) return ' WHERE ' . implode('', $query);
  return '';

}

function columnquery_from_table($tablenames){

  $columnqueries = array();

  for($i = 0 ; $i < count($tablenames) ; $i++){
    $tablename =  $tablenames[$i];

    $columns = pmrs("SHOW COLUMNS FROM $tablename");
    foreach($columns as $column){
      $columnname = $column['Field'];

      if(isset($columnqueries[$columnname])) $columnname = $tablename . $columnname;
      $columnqueries[$columnname] = "t" . ($i + 1) . "." . $column['Field'] . " as `$columnname`";
    }

  }

  return $columnqueries;

}
function columnquery_from_columns($columns, $default_columns = null){

  $columnqueries = array();
  $added_columns = array();

  // Generate columnqueries
  if(is_array($columns)){
    foreach($columns as $column){
      if(isset($column['active']) && !$column['active']) continue;
      if(!isset($column['name'])) continue;

      $name = $column['name'];
      if(isset($default_columns[$name])){
        
        $sql_column = $default_columns[$name];
        $sql_column = str_replace('!', '', $sql_column);
        
        $columnqueries[] = "$sql_column as `$name`";
        $added_columns[$name] = 1;
      }
    }
  }
  else if($default_columns != null){
    foreach($default_columns as $key=>$value){
      if(strpos($value, '!') !== false);
      else
        $columnqueries[] = "$value as `$key`";
    }
  }

  if($default_columns != null){

    // Add mandatory column (stated with !)
    foreach($default_columns as $key=>$value){
      if(strpos($value, '!') !== false && !isset($added_columns[$key])){
        $columnqueries[] = str_replace('!', '', $value) . ' as `' . $key . '`';
      }
    }

  }

  return implode(', ', $columnqueries);

}
function columnquery_from_columnaliases($columns, $aliases, $customcolumns = null){

  $query = array();
  for($i = 0 ; $i < count($columns) ; $i++){
    $column = $columns[$i];
    $columnname = objval('name', $column);
    if(empty($columnname)) continue;
    if(!isset($aliases[$columnname])) continue;
    if(isset($column['active']) && !objval('active', $column)) continue;

    $alias = $aliases[$columnname];
    $logic = objval('logic', $column);
    switch($logic){
      case 'sum': $alias = "SUM($alias) as `$columnname`"; break;
      case 'count': $alias = "COUNT($alias) as `$columnname`"; break;
      case 'min': $alias = "MIN($alias) as `$columnname`"; break;
      case 'max': $alias = "MAX($alias) as `$columnname`"; break;
      case 'avg': $alias = "AVG($alias) as `$columnname`"; break;
    }

    $query[] = $alias;

  }
  if(is_array($customcolumns))
    for($i = 0 ; $i < count($customcolumns) ; $i++)
      $query[] = $customcolumns[$i];
  return implode(', ', $query);

}
function columns_setactive($columns, $activecolumns){

  for($i = 0 ; $i < count($columns) ; $i++)
    $columns[$i]['active'] = in_array($columns[$i]['name'], $activecolumns) ? 1 : 0;
  return $columns;

}
function columns_setwidth($columns, $widthcolumns){

  for($i = 0 ; $i < count($columns) ; $i++){
    if(isset($widthcolumns[$columns[$i]['name']]))
      $columns[$i]['width'] = $widthcolumns[$columns[$i]['name']];
  }
  return $columns;

}
function columns_fromdbtable($table){

  $results = array();
  $rows = pmrs("DESCRIBE $table");
  foreach($rows as $row){
    $field = $row['Field'];
    $type = $row['Type'];

    $datatype = '';
    if(strpos($type, 'int') !== false) $datatype = 'number';
    else if(strpos($type, 'double') !== false) $datatype = 'number';
    else if(strpos($type, 'datetime') !== false) $datatype = 'datetime';
    else if(strpos($type, 'date') !== false) $datatype = 'date';

    $results[] = array('active'=>1, 'name'=>$field, 'text'=>$field, 'datatype'=>$datatype, 'width'=>50);
  }
  return $results;

}

function columnquery($columns, $maps = null){

  if(!$columns || !$maps) return '';

  $columnquery = array();

  if($columns == '*' || $columns === true){
    foreach($maps as $key=>$map){

      $dbcolumn = objval('dbcolumn', $map, array('defaultvalue'=>'' ));
      $dbprefix = objval('dbprefix', $map, array('defaultvalue'=>'' ));
      $dbcustom = objval('dbcustom', $map, array('defaultvalue'=>'' ));
      if(!empty($dbprefix)) $dbprefix .= '.';

      if(!empty($dbcolumn) && !empty($dbprefix))
        $columnquery []= $dbprefix . $dbcolumn . ' as `' . $key . '`';
      else if(!empty($dbcustom))
        $columnquery []= "($dbcustom) as `" . $key . "`";

    }
  }
  else{
    foreach($columns as $column){

      if(!isset($column['name']) || empty($column['name'])) continue;

      $column_name = $column['name'];

      if(isset($maps[$column_name]) && isset($maps[$column_name]['dbcolumn'])){

        $map = $maps[$column_name];
        $dbprefix = isset($map['dbprefix']) ? $map['dbprefix'] . '.' : '';
        $dbcolumn = $map['dbcolumn'];

        $columnquery[] = $dbprefix . $dbcolumn . ' as `' . $column_name . '`';

      }

    }
  }

  return implode(', ', $columnquery);

}
function wherequery(&$params, $filters, $columns){

  $wherequery = array();
  $last_filter_type = '';

  $columns = array_index($columns, array('name'), 1);

  if(is_array($filters)){
    foreach($filters as $filter){

      $filter_type = isset($filter['type']) ? $filter['type'] : '';
      $filter_key = isset($filter['key']) ? $filter['key'] : '';
      $filter_opt = isset($filter['operator']) ? $filter['operator'] : '';
      $filter_val = isset($filter['value']) ? $filter['value'] : '';

      $column = isset($columns[$filter_key]) ? $columns[$filter_key] : null;
      $column_name = $column['name'];
      $column_name = !$column_name ? $filter_key : $column_name;

      switch($filter_type){

        case 'sql':
          $value = objval('value', $filter, array('defaultvalue'=>''));
          if(in_array($last_filter_type, array('item', 'sql'))) $wherequery[] = 'AND';
          $wherequery []= $value;
          $last_filter_type = 'sql';
          break;

        case 'item':
        default:

          if(in_array($last_filter_type, array( 'item', 'sql'))) $wherequery[] = 'AND';

          $operator = '';
          switch($filter_opt){

            case '=':
            case 'equal':
            case 'equals':
              $operator = '=';
              $params[] = $filter_val;
              $wherequery[] = "$column_name $operator ?";
              break;
            case 'like':
            case 'contains':
              $operator = 'LIKE';

              $filter_val_exp = explode(',', $filter_val);
              if(count($filter_val_exp) > 1){
                $wherequery[] = "(";
                for($i = 0 ; $i < count($filter_val_exp) ; $i++){
                  if($i > 0) $wherequery[] = "OR";
                  $wherequery[] = "LOWER($column_name) $operator ?";
                  $params[] = "%" . strtolower($filter_val_exp[$i]) . "%";
                }
                $wherequery[] = ")";
              }
              else if(count($filter_val_exp) == 1){
                $wherequery[] = "LOWER($column_name) $operator ?";
                $params[] = "%" . strtolower($filter_val) . "%";
              }
              break;
            case 'not contains':
              $wherequery[] = "LOWER($column_name) not like ?";
              $params[] = "%" . strtolower($filter_val) . "%";
              break;

            default:
              $operator = $filter_opt;
              $params[] = $filter_val;
              $wherequery[] = "$column_name $operator ?";
              break;

          }


          $last_filter_type = 'item';
          break;

      }

    }
  }

  return count($wherequery) > 0 ? ' where ' . implode(' ', $wherequery) : '';

}
function limitquery($limitoffset = null){

  $limitquery = '';
  if(is_array($limitoffset)){
    $limit = objval('limit', $limitoffset, 0, 0);
    $offset = objval('offset', $limitoffset, 0, 0);

    $limitquery = "LIMIT $limit OFFSET $offset";
  }
  return $limitquery;

}

function whereexp($filters, &$params, $columns){

  $whereexp = array();
  $columns = array_index($columns, array('name'), 1);

  if(is_array($filters)){
    foreach($filters as $key=>$value){

      if(isset($columns[$key]) && $value){

        $column = $columns[$key];
        $name = isset($column['alias']) ? $column['alias'] : $column['name'];
        $name = strpos($name, '.') !== false ? $name : "`$name`";

        $whereexp[] = "$name = ?";
        $params[] = $value;
      }

    }
  }

  $whereexp = count($whereexp) > 0 ? "WHERE " . implode(' AND ', $whereexp) : '';
  return $whereexp;

}

function whereexp2($filters, &$params, $columns = null){

  $whereexp = array();

  if($columns != null) $columns = array_index($columns, array('name'), 1);

  $last_time_action = 'operand'; // Whether exp or operand

  foreach($filters as $item){

    // Operand
    if(isset($item['operand'])){

      if($last_time_action != 'operand'){
        $whereexp[] = ' ' . $item['operand'] . ' ';
        $last_time_action = 'operand';
      }

    }

    // Exp
    else if(isset($item['key'])){

      if($last_time_action != 'operand')
        $whereexp[] = ' and ';

      $key = $item['key'];
      $operator = $item['operator'];
      $value = $item['value'];

      // Check if columns defined and the key is in columns
      if($columns && !isset($columns[$key])) continue;

      switch($operator){

        case 'contains':
          $whereexp[] = "LOWER($key) LIKE ?";
          $params[] = "%" . strtolower($value) . "%";
          break;

        case '=':
          $whereexp[] = "$key = ?";
          $params[] = $value;
          break;

      }

      $last_time_action = 'exp';

    }

  }

  // Remove last operand
  if($last_time_action == 'operand') array_splice($whereexp, count($whereexp) - 1, 1);

  return $whereexp;

}

function columnquery_from_groupcolumns($columns){

  $columnqueries = array();
  for($i = 0 ; $i < count($columns) ; $i++){
    $column = $columns[$i];
    $columnname = $column['name'];
    $columnlogic = $column['logic'];

    switch($columnlogic){
      case 'sum': $columnqueries[] = "SUM(`$columnname`) as `$columnname.sum`"; break;
      default: $columnqueries[] = "`$columnname`"; break;
    }
  }
  return implode(', ', $columnqueries);

}

function quickfilters_to_filters($quickfilters){

  $filters = null;
  if(is_array($quickfilters)){
    for($i = 0 ; $i < count($quickfilters) ; $i++){
      $quickfilter = $quickfilters[$i];
      if($filters == null) $filters = array();
      $filters[] = array(
        'name'=>$quickfilter['name'],
        'operator'=>'contains',
        'value'=>$quickfilter['value']
      );
    }
  }
  return $filters;

}
function filter_merge($filters, $quickfilters){

  $result = array();
  if(is_array($filters) && count($filters) > 0) $result = array_merge($result, $filters);
  if(is_array($quickfilters)){
    $filters = null;
    for($i = 0 ; $i < count($quickfilters) ; $i++){
      $quickfilter = $quickfilters[$i];
      if($filters == null) $filters = array();
      $filters[] = array(
        'name'=>$quickfilter['name'],
        'operator'=>'contains',
        'value'=>$quickfilter['value']
      );
    }
    if(is_array($filters) && count($filters) > 0) $result = array_merge($result, $filters);
  }
  return $result;

}

function groupcolumns_from_groups($groups){

  $columns = array();
  foreach($groups as $group){
    $groupcolumns = $group['columns'];
    foreach($groupcolumns as $groupcolumn)
      $columns[] = $groupcolumn['name'];
  }
  return $columns;

}

function limitquery_from_limitoffset($limitoffset = null){

  $limitquery = '';
  if(is_array($limitoffset)){
    $limit = objval('limit', $limitoffset, 0, 0);
    $offset = objval('offset', $limitoffset, 0, 0);

    $limitquery = "LIMIT $limit OFFSET $offset";
  }
  return $limitquery;

}

function array_replace_rows_with_arrayobject($arr, $arrobj, $key){

  $results = array();

  foreach($arrobj as $arrobjkey=>$arrobjvalue){
    $results[] = $arrobjvalue;
  }

  for($i = 0 ; $i < count($arr) ;$i++){
    if(isset($arrobj[$arr[$i][$key]])) continue;
    $results[] = $arr[$i];
  }

  return $results;

  if(is_array($arr)){
    for($i = 0 ; $i < count($arr) ; $i++){
      $obj = $arr[$i];
      if(isset($arrobj[$obj[$key]])) $arr[$i] = $arrobj[$obj[$key]];
    }
  }

}

function terbilang($x)
{
  $abil = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
  if ($x < 12)
    return " " . $abil[$x];
  elseif ($x < 20)
    return Terbilang($x - 10) . "belas";
  elseif ($x < 100)
    return Terbilang($x / 10) . " puluh" . Terbilang($x % 10);
  elseif ($x < 200)
    return " seratus" . Terbilang($x - 100);
  elseif ($x < 1000)
    return Terbilang($x / 100) . " ratus" . Terbilang($x % 100);
  elseif ($x < 2000)
    return " seribu" . Terbilang($x - 1000);
  elseif ($x < 1000000)
    return Terbilang($x / 1000) . " ribu" . Terbilang($x % 1000);
  elseif ($x < 1000000000)
    return Terbilang($x / 1000000) . " juta" . Terbilang($x % 1000000);
}

function datadef_validation($obj, $def, $parent = ''){

  foreach($def as $name=>$spec){

    $type = objval('type', $spec);
    $required = objval('required', $spec, 0);
    $defaultvalue = objval('defaultvalue', $spec, 0, ' ');
    $nametext = $parent != '' ? $name . ' of ' . $parent : $name;

    if($required){
      if(!isset($obj[$name]))
        throw new Exception("Parameter $nametext required.");
      $value = $obj[$name];
    }
    else{
      if(!isset($obj[$name]))
        $obj[$name] = $value = $defaultvalue;
    }

    switch($type){
      case 'date':
        if(!isdate($value)) throw new Exception("Invalid date parameter for $nametext. ($value)");
        break;
      case 'int':
        if(!preg_match('/^\d+$/', $value)) throw new Exception("Invalid int parameter for $nametext. ($value)");
        break;
      case 'array':
        if(!is_array($value)) throw new Exception("Invalid array parameter for $nametext. ($value)");
        $items = objval('items', $spec);
        if(!is_array($items)) throw new Exception("Array definition required for $nametext.");
        if(is_assoc($items)){
          throw new Exception('assoc type unimplemented');
        }
        else{
          if(is_assoc($value)) throw new Exception("Invalid array type, array type required for $nametext");
          if($required && count($value) == 0) throw new Exception("Array value required, empty array supplied for $nametext");
          if(count($items) == 0) throw new Exception("Array definition required for $nametext.");

          for($i = 0 ; $i < count($value) ; $i++)
            $value[$i] = datadef_validation($value[$i], $items[0], $name);

        }
        break;
      default:
        if($required && empty($value)) throw new Exception("Invalid string parameter for $nametext. ($value)");
        break;

    }


  }

  return $obj;

}

function array_data_findchanges($params, &$newrows, &$deletedrows, &$updatedrows){

  $items = $params['items'];
  $currentitems = $params['currentitems'];
  $keys = $params['keys'];

  //throw new Exception(print_r($currentitems, 1));
  //throw new Exception(print_r($items, 1));
  //throw new Exception(print_r($keys, 1));

  // Find new items
  foreach($items as $item){

    $item_exists = false;
    foreach($currentitems as $currentitem){

      $item_match = true;
      foreach($keys as $key){

        if($currentitem[$key] != $item[$key]){
          $item_match = false;
          break;
        }
      }

      if($item_match){
        $item_exists = true;
        break;
      }

    }
    //console_warn($currentitem['type'] . ' ' . $currentitem['typeid'] . ' ' . ' exists: ' . ($item_exists ? 'yes':'no'));

    if(!$item_exists) $newrows[] = $item;
    else{

      $item_updated = false;
      $updatedcols = array();
      foreach($item as $key=>$value){
        if(isset($currentitem[$key]) && $currentitem[$key] != $value){
          $item_updated = true;
          $updatedcols[$key] = $value;
        }
      }

      if($item_updated){
        $item['__updatedcols'] = $updatedcols;
        $updatedrows[] = $item;
      }
    }

  }


  // Find deleted items
  foreach($currentitems as $currentitem){

    $item_exists = false;
    foreach($items as $item){

      $item_match = true;
      foreach($keys as $key){

        if($currentitem[$key] != $item[$key]){
          $item_match = false;
          break;
        }
      }

      if($item_match){
        $item_exists = true;
        break;
      }

    }
    //console_warn($currentitem['type'] . ' ' . $currentitem['typeid'] . ' ' . ' exists: ' . ($item_exists ? 'yes':'no'));

    if(!$item_exists) $deletedrows[] = $currentitem;

  }


}

function module_addcolumns(&$module, $columns){

  $changed = false;
  $modulecolumns = $module['columns'];
  $modulecolumns_indexed = array_index($modulecolumns, array('name'), 1);
  console_log($modulecolumns_indexed);

  for($i = 0 ; $i < count($columns) ; $i++){
    $column = $columns[$i];
    $columnname = $column['name'];

    if(!isset($modulecolumns_indexed[$columnname])){

      $module['columns'][] = $column;
      for($j = 0 ; $j < count($module['presets']) ; $j++)
        $module['presets'][$j]['columns'][] = $column;
      $changed = true;

    }
  }

  return $changed;

}

function glob_recursive($pattern, $flags = 0){
  $files = glob($pattern, $flags);
  foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir)
    $files = array_merge($files, glob_recursive($dir.'/'.basename($pattern), $flags));
  return $files;
}

function apidoc_def_to_object($def){

  $result = array();
  foreach($def as $key=>$obj){
    $type = objval('type', $obj, array('defaultvalue'=>'string'));
    if($type == 'text') $type = 'string';
    $result[$key] = $type;
  }
  return $result;

}

function sysdebug_write($message, $immediately = false){

  global $__SYSDEBUG;
  $__SYSDEBUG[] = "[" . date('Y-m-d H:i:s') . "]\t" . $message;

  if($immediately){
    sysdebug_flush(true);
  }

}
function sysdebug_flush($append = false){

  global $__SYSDEBUG;
  $debug_path = sysdebug_path();
  if(is_writable($debug_path)){
    if(count($__SYSDEBUG) == 0 && !$append) $__SYSDEBUG[] = "[" . date('Y-m-d H:i:s') . "]\t" . "No debug message";
    file_put_contents($debug_path, implode("\r\n", $__SYSDEBUG), $append ? FILE_APPEND : null);
  }
  else{
  }

}
function sysdebug_print($return = false){

  $debug_path = sysdebug_path();
  $content = file_exists($debug_path) ? file_get_contents($debug_path) : 'Debug data not found.';

  if(!$return) header("Content-Type: text/plain");

  $html = array();
  $html[] = $content;

  if($return) return implode("\n", $html);
  echo implode("\n", $html);

}
function sysdebug_clear(){

  $debug_path = sysdebug_path();
  if(is_writable($debug_path))
    file_put_contents($debug_path, '');

}
function sysdebug_path(){

  $os = get_os();
  $os_name = $os['os'];
  if(strtolower($os_name) == 'WINNT'){
    $app_path = str_replace('lib\php', '', dirname(__FILE__));
    $debug_path = $app_path . 'log\debug.log';
  }
  else{
    $app_path = str_replace('lib/php', '', dirname(__FILE__));
    $debug_path = $app_path . 'log/debug.log';
  }
  return $debug_path;

}
function app_path(){

  $os = get_os();
  $os_name = $os['os'];
  if(strtolower($os_name) == 'WINNT') {
    $app_path = str_replace('lib\php', '', dirname(__FILE__));
  }
  else{
    $app_path = str_replace('lib/php', '', dirname(__FILE__));
  }
  return $app_path;

}

function exc($obj){

  throw new Exception(print_r($obj, 1));

}

function formula_calc($formula, $defined_params){

  $matches = array();
  $match = preg_match_all('/(\{\w+\})+/', $formula, $matches);

  if($match && isset($matches[0])){

    $matches = $matches[0];
    foreach($matches as $key){
      $name = str_replace('}', '', str_replace('{', '', $key));
      if(isset($defined_params[$name])){
        $value = $defined_params[$name];
        $formula = str_replace($key, $value, $formula);
      }
      else{
        throw new Exception("Unknown dynamic parameter - $key");
      }
    }

  }
  $value = @eval("return $formula ;");
  if(error_get_last()){
    throw new Exception("Invalid formula:");
  }
  return $value;

}

function mime_type_of_ext($mime_type){

  global $mime_types;
  $mime_types = array_flip($mime_types);
  return isset($mime_types[$mime_type]) ? $mime_types[$mime_type] : '';

}
function ext_to_mime_type($ext){

  global $mime_types;
  return isset($mime_types[$ext]) ? $mime_types[$ext] : 'text/plain';

}

function save_input_as_file($path, $filename){

  $content_type = $_SERVER['CONTENT_TYPE'];
  $ext = mime_type_of_ext($content_type);

  $path = $path  . $filename . '.' . $ext;
  $success = file_put_contents($path, file_get_contents('php://input'));
  return $success ? $path : false;

}

function retrieve_file_upload($key, $dest_dir, $dest_name = ''){

  if(isset($_FILES[$key]['tmp_name'])){
    if(!$dest_name) $dest_name = $_FILES[$key]['name'];
    move_uploaded_file($_FILES[$key]['tmp_name'], $dest_dir . "/" . $dest_name);
  }

}

function smtpmailer($from, $to, $cc = null, $subject, $body, $replyto = null){

  require_once dirname(__FILE__) . '/PHPMailer_5.2.4/class.phpmailer.php';

  /*
   * Usage:
    $error = smtpmailer(
    array('name'=>'Pintu Webmaster', 'address'=>'andyv4@gmail.com'),
    array('name'=>$email, 'address'=>$email),
    null,
    'Sign in from this device',
    'You just sign in from this device'
  );
  if($error) systemlog(1, "Unable to send sign in email. ($email)", $error['error_message']);
   */

  global $smtpmailer_config;

  $fromaddress = $from['address'];
  $fromname = $from['name'];

  $mail = new PHPMailer();  // create a new object
  $mail->IsSMTP(); // enable SMTP
  $mail->IsHTML(true);
  $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
  $mail->SMTPAuth = true;  // authentication enabled
  $mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for GMail
  $mail->Host = 'smtp.gmail.com';
  $mail->Port = 587;
  $mail->Username = objval('userid', $smtpmailer_config, array('defaultvalue'=>''));
  $mail->Password = objval('password', $smtpmailer_config, array('defaultvalue'=>''));

  if(is_array($replyto) && count($replyto) > 0)
    for($i = 0 ; $i < count($replyto) ; $i++){
      $rtObj = $replyto[$i];
      $rtName = $rtObj['name'];
      $rtAddress = $rtObj['address'];
      if(empty($rtAddress)) continue;
      $mail->AddReplyTo($rtAddress, $rtName);
    }

  $mail->SetFrom($fromaddress, $fromname);
  $mail->Subject = $subject;
  $mail->Body = $body;

  if(is_assoc($to)){
    $toName = objval('name', $to, array('defaultvalue'=>''));
    $toAddress = objval('address', $to, array('defaultvalue'=>''));
    $mail->AddAddress($toAddress, $toName);
  }
  else if(is_array($to)){
    for($i = 0 ; $i < count($to) ; $i++){
      $toObj = $to[$i];

      if(gettype($toObj) == 'string')
        $mail->AddAddress($toObj);
      else if(gettype($toObj) == 'array'){
        $toName = objval('name', $toObj, array('defaultvalue'=>''));
        $toAddress = objval('address', $toObj, array('defaultvalue'=>''));
        $mail->AddAddress($toAddress, $toName);
      }
    }
  }
  else if(gettype($to) == 'string')
    $mail->AddAddress($to);

  if(is_array($cc) && count($cc) > 0)
    for($i = 0 ; $i < count($cc) ; $i++){
      $ccObj = $cc[$i];
      $ccName = $ccObj['name'];
      $ccAddress = $ccObj['address'];
      if(empty($ccAddress)) continue;
      $mail->AddCC($ccAddress, $ccName);
    }

  $sent = $mail->Send();

  if(!$sent)
   return array('error_message'=>'Mail error: '.$mail->ErrorInfo);
  return null;

}

function base_dir(){

  if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $base = str_replace('assets\\php', '', dirname(__FILE__));
    if(substr($base, strlen($base) - 1, 1) == '\\')
      $base = substr($base, 0, strlen($base) - 1);
  }
  else{
    $base = str_replace('assets/php', '', dirname(__FILE__));
    if(substr($base, strlen($base) - 1, 1) == '/')
      $base = substr($base, 0, strlen($base) - 1);
  }
  return $base;

}

function base_url(){

  $http = isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off' ? 'https' : 'http';
  $hostname = $_SERVER['HTTP_HOST'];

  if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN'){
    $base = str_replace('assets\\php', '', dirname(__FILE__));
    $base = str_replace('\\', '/', $base);
  }
  else
    $base = str_replace('assets/php', '', dirname(__FILE__));

  $document_root = $_SERVER['DOCUMENT_ROOT'];
  $subdir = str_replace($document_root, '', $base);
  $base_url = $http . '://' . $hostname . $subdir;
  if(substr($base_url, strlen($base_url) - 1, 1) == '/')
    $base_url = substr($base_url, 0, strlen($base_url) - 1);

  return $base_url;


  if (isset($_SERVER['HTTP_HOST'])) {
    $http = isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off' ? 'https' : 'http';
    $hostname = $_SERVER['HTTP_HOST'];

    $dir =  str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);

    $core = preg_split('@/@', str_replace($_SERVER['DOCUMENT_ROOT'], '', realpath(dirname(__FILE__))), NULL, PREG_SPLIT_NO_EMPTY);
    $core = $core[0];

    $tmplt = $atRoot ? ($atCore ? "%s://%s/%s/" : "%s://%s/") : ($atCore ? "%s://%s/%s/" : "%s://%s%s");
    $end = $atRoot ? ($atCore ? $core : $hostname) : ($atCore ? $core : $dir);
    $base_url = sprintf( $tmplt, $http, $hostname, $end );
  }
  else $base_url = 'http://localhost/';

  if ($parse) {
    $base_url = parse_url($base_url);
    if (isset($base_url['path'])) if ($base_url['path'] == '/') $base_url['path'] = '';
  }

  return $base_url;
}

function echo_out($message){

//  ob_end_flush();
//  ob_flush();
  echo $message . PHP_EOL;

}

/*
 * Add error function
 * Params:
 * - error : Object
 *   - error : Integer
 *   - error_message : String
 * - halt : Integer (0=just return false, 1=trigger error, 2=throw exception
 * Returns: false
 *
 */
function add_error($error, $halt = 0){

  global $errors;

  if(is_assoc($error) || gettype($error) == 'string'){

    if(gettype($error) == 'string'){
      $error = [
        'error'=>1,
        'error_message'=>$error
      ];
    }

    if(is_assoc($error)) $errors[] = $error;

    if($halt > 0){
      $error_messages = array();
      if(is_array($error))
        foreach($errors as $error)
          $error_messages[] = isset($error['error_message']) && gettype($error['error_message']) == 'string' &&
          strlen($error['error_message']) > 0 ? $error['error_message'] : 'Unknown error';

      if($halt === 1) trigger_error(implode("\n", $error_messages));
      else if($halt === 2) throw new Exception(implode("\n", $error_messages));
    }

  }
  else if(is_array($error)){
    foreach($error as $error_obj)
      add_error($error_obj, $halt);
  }

}

/*
 * Extract object from given schema with validation
 * Return: Object
 */
function object_extract($obj, $schema){

  if(!is_assoc($obj)) return null;
  if(!is_assoc($schema)) return null;

  $result = array();

  $this_errors = [];
  foreach($schema as $key=>$definition){

    if(!(is_string($key) || is_int($key))){
      $this_errors[] = [ 'error'=>1, 'error_message'=>"Invalid schema key parameter." ];
      continue;
    }

    $required = ov('required', $definition, [ 'defaultvalue'=>0 ]);
    $datatype = ov('datatype', $definition, [ 'defaultvalue'=>'string' ]);

    if($required && !isset($obj[$key])){
      $this_errors[] = [ 'error'=>1, 'error_message'=>"Parameter $key required." ];
      continue;
    }

    $defaultvalue = ov('defaultvalue', $definition, [ 'defaultvalue'=>null ]);

    $valid = true;
    $value = isset($obj[$key]) ? $obj[$key] : $defaultvalue;
    switch($datatype){

      case 'array':
        $arraytype = ov('arraytype', $definition, [ 'defaultvalue'=>'string' ]);

        $arrayvalue = [];
        if(is_array($value)){
          foreach($value as $value_obj){
            $value_obj = object_extract($value_obj, $arraytype);
            $arrayvalue[] = $value_obj;
          }
        }
        $value = $arrayvalue;

        break;

      // String
      default:

        // Minimum length check
        $min_length = ov('min_length', $definition, [ 'defaultvalue'=>-1 ]);
        if($min_length > 0 && strlen($value) < $min_length) $this_errors[] = "Minimum length of $key need to be at least $min_length letters";

        break;

    }

    if(!$valid){
      $this_errors[] = [ 'error'=>1, 'error_message'=>"Invalid $key parameter" ];
    }

    $result[$key] = $value;

  }

  if(count($this_errors) > 0){
    add_error($this_errors);
    return null;
  }
  return $result;


}

function custom_array_set( &$array, $key, $value )
{
  if ( is_null( $key ) )
    return $array = $value;
  $keys = explode( '.', $key );
  while ( count( $keys ) > 1 )
  {
    $key = array_shift( $keys );
    // If the key doesn't exist at this depth, we will just create an empty array
    // to hold the next value, allowing us to create the arrays to hold final
    // values at the correct depth. Then we'll keep digging into the array.
    if ( ! isset( $array[$key] ) || ! is_array( $array[$key] ) )
    {
      $array[$key] = array();
    }
    $array =& $array[$key];
  }
  $array[array_shift( $keys )] = $value;
  return $array;
}

function custom_array_flatten($ob, $depth = 0) {

  $toReturn = [];

  foreach($ob as $k=>$v){
    if(!$v) continue;

    if(gettype($ob[$k]) == 'array'){
      $iob = custom_array_flatten($v, $depth + 1);
      foreach($iob as $ik=>$iv){
        if(!$iv) continue;
        $toReturn[$k . '.' . $ik] = $iv;
      }
    }
    else{
      $toReturn[$k] = $v;
    }
  }

  return $toReturn;

}

function custom_array_unflatten($collection)
{
  $collection = (array) $collection;
  $output = array();
  foreach ( $collection as $key => $value )
  {
    custom_array_set( $output, $key, $value );
    if ( is_array( $value ) && ! strpos( $key, '.' ) )
    {
      $nested = custom_array_unflatten($value);

      echo json_encode($nested);

      $output[$key] = $nested;
    }
  }
  return $output;
}

?>