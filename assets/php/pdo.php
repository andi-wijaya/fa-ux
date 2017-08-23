<?php

$pdo_con = null;
$pdo_logs = array();

$mysqlpdo_database = '';
$mysqlpdo_username = 'root';
$mysqlpdo_password = 'fa2014';
$mysqlpdo_host = '127.0.0.1';

function pdo_con($emulate_prepare = true, $forceinit = false){
  global $pdo_con, $mysqlpdo_database, $mysqlpdo_username, $mysqlpdo_password, $mysqlpdo_host;
  if(!$pdo_con || $forceinit){
    $pdo_con = new PDO("mysql:dbname=$mysqlpdo_database;host=$mysqlpdo_host;charset=utf8", $mysqlpdo_username, $mysqlpdo_password);
    $pdo_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$pdo_con->setAttribute(PDO::ATTR_PERSISTENT, true);
    $pdo_con->exec("set names utf8");
  }
  $pdo_con->setAttribute(PDO::ATTR_EMULATE_PREPARES, $emulate_prepare);
  return $pdo_con;
}
function pdo_close(){
  global $pdo_con;
  if($pdo_con) $pdo_con = null;
}
function pm($query, $arr = null, $params = null){

  $emulate_prepares = isset($params['emulate_prepares']) && !$params['emulate_prepares'] ? false : true;
  $pdo_con = pdo_con($emulate_prepares);
  $pdo_res = $pdo_con->prepare($query);
  $pdo_res->execute($arr);

}
function pmc($query, $arr = null, $params = null){

  $emulate_prepares = isset($params['emulate_prepares']) && !$params['emulate_prepares'] ? false : true;
  $pdo_con = pdo_con($emulate_prepares);
  $pdo_res = $pdo_con->prepare($query);
  $pdo_res->setFetchMode(PDO::FETCH_ASSOC);
  $pdo_res->execute($arr);
  $value = null;
  while($row = $pdo_res->fetch()){
    foreach($row as $key=>$val){
      $value = $val;
      break;
    }
  }

  return $value;
}
function pmi($query, $arr = null, $params = null){

  $emulate_prepares = isset($params['emulate_prepares']) && !$params['emulate_prepares'] ? false : true;
  $pdo_con = pdo_con($emulate_prepares);
  $pdo_res = $pdo_con->prepare($query);
  $pdo_res->execute($arr);
  $id = $pdo_con->lastInsertId();
  return $id;
}
function pmr($query, $arr = null, $params = null){

  $emulate_prepares = isset($params['emulate_prepares']) && !$params['emulate_prepares'] ? false : true;
  $pdo_con = pdo_con($emulate_prepares);
  $pdo_res = $pdo_con->prepare($query);
  $pdo_res->setFetchMode(PDO::FETCH_ASSOC);
  $pdo_res->execute($arr);
  while($row = $pdo_res->fetch())
    return $row;

  return null;
}
function pmrs($query, $arr = null, $params = null){

  $emulate_prepares = isset($params['emulate_prepares']) && !$params['emulate_prepares'] ? false : true;
  $pdo_con = pdo_con($emulate_prepares);
  $pdo_res = $pdo_con->prepare($query);
  $pdo_res->setFetchMode(PDO::FETCH_ASSOC);
  $pdo_res->execute($arr);
  $items = array();
  while($row = $pdo_res->fetch())
    array_push($items, $row);

  return count($items) == 0 ? null : $items;
}
function pmn($query, $arr = null, $params = null){

  $rows = pmrs($query, $arr);
  if($rows != null) return count($rows);
  return false;

}

function mysql_createtable($name, $columns){
  if(gettype($name) != "string" || !is_array($columns)) return;

  global $mysqlpdo_database;

  $childtables = array();

  $columnqueries = array();
  $primarykeys = array();
  $foreignkeys = array();
  $foreignkeycount = 0;
  foreach($columns as $properties){
    $key = $properties['name'];
    switch($properties["type"]){
      case "date" :
        array_push($columnqueries, "`$key` DATE");
        break;
      case "datetime" :
        array_push($columnqueries, "`$key` DATETIME");
        break;
      case "double" :
        $maxlength = ov("maxlength", $properties, "10,2");
        array_push($columnqueries, "`$key` DOUBLE($maxlength)");
        break;
      case "fk" :
        $fkref = ov("fkref", $properties);
        $fkrefid = ov("fkrefid", $properties);
        $fkonupdate = ov('fkonupdate', $properties, 0, 'CASCADE');
        $fkondelete = ov('fkondelete', $properties, 0, 'CASCADE');
        array_push($columnqueries, "`$key` INT(10)");
        $foreignkeys[] = "CONSTRAINT `fk_" . $name . "_" . $foreignkeycount . "` FOREIGN KEY (`$key`) REFERENCES $fkref(`$fkrefid`) ON UPDATE $fkonupdate ON DELETE $fkondelete";
        $foreignkeycount++;
        break;
      case 'pf' :
        array_push($primarykeys, "`$key`");
        $fkref = ov("fkref", $properties);
        $fkrefid = ov("fkrefid", $properties);
        array_push($columnqueries, "`$key` INT(10)");
        $foreignkeys[] = "CONSTRAINT `fk_" . $name . "_" . $foreignkeycount . "` FOREIGN KEY (`$key`) REFERENCES $fkref(`$fkrefid`) ON UPDATE CASCADE ON DELETE CASCADE";
        $foreignkeycount++;
        break;
      case "table" :
        $childtables[$key] = $properties;
        break;
      case "id" :
        array_push($columnqueries, "`$key` INT(10) AUTO_INCREMENT");
        array_push($primarykeys, "`$key`");
        break;
      case "int" :
        $maxlength = ov("maxlength", $properties, false, 10);
        array_push($columnqueries, "`$key` INT($maxlength)");
        break;
      case "money" :
        array_push($columnqueries, "`$key` DOUBLE(14, 2)");
        break;
      case "string" :
        $maxlength = ov("maxlength", $properties, false, 40);
        array_push($columnqueries, "`$key` VARCHAR($maxlength)");
        break;
      case "text" :
        array_push($columnqueries, "`$key` TEXT");
        break;
      case "timestamp" :
        array_push($columnqueries, "`$key` DOUBLE(16, 4)");
        break;
    }
  }
  if(count($primarykeys) > 0)
    array_push($columnqueries, "PRIMARY KEY(" . implode(", ", $primarykeys) . ")");
  if(count($foreignkeys) > 0)
    for($i = 0 ; $i < count($foreignkeys) ; $i++)
      array_push($columnqueries, $foreignkeys[$i]);
  $columnquery = implode(", ", $columnqueries);

  $query = "CREATE DATABASE IF NOT EXISTS $mysqlpdo_database";
  pm($query);

  $query = "CREATE TABLE IF NOT EXISTS $mysqlpdo_database.$name($columnquery) ENGINE=InnoDB DEFAULT CHARSET=utf8";
  pm($query);

  foreach($childtables as $name=>$properties){
    $childfks = mysql_createtable($mysqlpdo_database, $name, $properties["columns"]);
    $foreignkeys = array_merge($foreignkeys, $childfks);
  }

  return $query;
}
function mysql_droptable($tablename){
  global $mysqlpdo_host, $mysqlpdo_username, $mysqlpdo_password, $mysqlpdo_database;
  $mysqli = new mysqli($mysqlpdo_host, $mysqlpdo_username, $mysqlpdo_password, $mysqlpdo_database);
  $mysqli->query('SET foreign_key_checks = 0;');
  $mysqli->query('DROP TABLE IF EXISTS '. $tablename .';');
  $mysqli->query('SET foreign_key_checks = 1;');
  $mysqli->close();
}
function mysql_insert_row($name, $arr, $properties = null){
  global $mysqlpdo_database;
  $database = isset($properties['database']) ? $properties['database'] : $mysqlpdo_database;

  if(is_assoc($arr)){
    $columnquery = array();
    $valuequery = array();
    $params = array();
    foreach($arr as $key=>$value){
      $columnquery[] = "`$key`";
      $valuequery[] = "?";
      $params[] = $value;
    }
    $columnquery = implode(', ', $columnquery);
    $valuequery = implode(', ', $valuequery);
    $query = "INSERT INTO $database.$name ($columnquery) VALUES ($valuequery)";
    $id = pmi($query, $params);
  }
  else if(is_array($arr)){
    $columns = pmrs("SHOW COLUMNS FROM $database.$name;");
    $columnquery = array();
    $valuequery = array();
    $params = array();
    for($i = 0 ; $i < count($columns) ; $i++){
      $columnname = $columns[$i]['Field'];
      $columnquery[] = "`" . $columnname . "`";
      $valuequery[] = "?";
      $params[] = $arr[$i];
    }
    $columnquery = implode(', ', $columnquery);
    $valuequery = implode(', ', $valuequery);
    $query = "INSERT INTO $database.$name ($columnquery) VALUES ($valuequery)";
    $id = pmi($query, $params);
  }

  return $id;
}
function mysql_update_row($name, $obj, $condition, $properties = null){

  global $mysqlpdo_database;
  $database = isset($properties['database']) ? $properties['database'] : $mysqlpdo_database;
  $params = array();
  $columns = array();
  foreach($obj as $key=>$value){
    $columns[] = "`$key` = ?";
    $params[] = $value;
  }
  $columnquery = implode(', ', $columns);

  $wheres = array();
  foreach($condition as $key=>$value){
    $wheres[] = "`$key` = ?";
    $params[] = $value;
  }
  $wherequery = implode(', ', $wheres);

  $query = "UPDATE $database.$name SET $columnquery WHERE $wherequery";
  pm($query, $params);

}
function mysql_delete_row($name, $condition, $properties = null){
  global $mysqlpdo_database;
  $database = isset($properties['database']) ? $properties['database'] : $mysqlpdo_database;

  $params = array();
  $wheres = array();
  foreach($condition as $key=>$value){
    $wheres[] = "`$key` = ?";
    $params[] = $value;
  }
  $wherequery = implode(', ', $wheres);

  $query = "DELETE FROM `$database`.`$name` WHERE $wherequery";
  pm($query, $params);

}
function mysql_insert($name, $arr){
  for($i = 0 ; $i < count($arr) ; $i++){
    $obj = $arr[$i];

    $valuequeries = array();
    $columns = array();
    $params = array();
    foreach($obj as $key=>$value){
      $columns[] = '`' . $key . '`';
      $params[] = $value;
      $valuequeries[] = '?';
    }
    $columnquery = implode(', ', $columns);
    $valuequery = implode(', ', $valuequeries);
    $query = "INSERT INTO $name ($columnquery) VALUES ($valuequery)";
    pm($query, $params);
  }
}

function mysql_insert_batch($table, $params, $keys, $options = null){

  global $mysql_insert_batch_queries, $mysql_insert_batch_params;
  if(!is_array($mysql_insert_batch_queries)) $mysql_insert_batch_queries = array();
  if(!is_array($mysql_insert_batch_params)) $mysql_insert_batch_params = array();

  $max_buffer = ov('max_buffer', $options, array('defaultvalue'=>1));

  $columns_query = $values_query = $update_query = [];

  foreach($params as $key=>$value){
    $columns_query[] = "`$key`";
    $values_query[] = "?";
    array_push($mysql_insert_batch_params, $value);
  }
  foreach($params as $key=>$value){
    if(!in_array($key, $keys)){
      $update_query[] = "`$key` = ?";
      array_push($mysql_insert_batch_params, $value);
    }
  }

  $columns_query = implode(', ', $columns_query);
  $values_query = implode(', ', $values_query);
  $update_query = implode(', ', $update_query);

  $mysql_insert_batch_queries[] = "insert into $table ($columns_query) values ($values_query) on duplicate key update $update_query";

  if(count($mysql_insert_batch_queries) >= $max_buffer){

//    echo implode(";", $mysql_insert_batch_queries) . PHP_EOL;
//    echo json_encode($mysql_insert_batch_params) . PHP_EOL;

    pm(implode(';', $mysql_insert_batch_queries), $mysql_insert_batch_params);
    $mysql_insert_batch_queries = $mysql_insert_batch_params = array();
  }

}
function mysql_insert_batch_end(){

  global $mysql_insert_batch_queries, $mysql_insert_batch_params;
  if(!is_array($mysql_insert_batch_queries)) $mysql_insert_batch_queries = array();
  if(!is_array($mysql_insert_batch_params)) $mysql_insert_batch_params = array();

  if(count($mysql_insert_batch_queries) > 0){
    pm(implode(';', $mysql_insert_batch_queries), $mysql_insert_batch_params);
    $mysql_insert_batch_queries = $mysql_insert_batch_params = array();
  }

}

function mysql_update_batch($table, $params, $keys, $excluded_cols = null, $options = null){

  global $mysql_update_batch_queries, $mysql_update_batch_params;
  if(!is_array($mysql_update_batch_queries)) $mysql_update_batch_queries = array();
  if(!is_array($mysql_update_batch_params)) $mysql_update_batch_params = array();

  if(!$excluded_cols || !is_array($excluded_cols)) $excluded_cols = [];
  $max_buffer = ov('max_buffer', $options, array('defaultvalue'=>1));

  $set_query = $where_query = [];
  foreach($params as $key=>$value){
    if(in_array($key, $excluded_cols)) continue;
    $set_query[] = "`$key` = ?";
    array_push($mysql_update_batch_params, $value);
  }
  foreach($keys as $key=>$value){
    $where_query[] = "`$key` = ?";
    array_push($mysql_update_batch_params, $value);
  }
  $set_query = implode(', ', $set_query);
  $where_query = implode(' AND ', $where_query);

  $mysql_update_batch_queries[] = "update $table set $set_query where $where_query";

  if(count($mysql_update_batch_queries) >= $max_buffer){
    pm(implode(';', $mysql_update_batch_queries), $mysql_update_batch_params);
    $mysql_update_batch_queries = $mysql_update_batch_params = array();
  }

}
function mysql_update_batch_end(){

  global $mysql_update_batch_queries, $mysql_update_batch_params;
  if(!is_array($mysql_update_batch_queries)) $mysql_update_batch_queries = array();
  if(!is_array($mysql_update_batch_params)) $mysql_update_batch_params = array();

  if(count($mysql_update_batch_queries) > 0){
    pm(implode(';', $mysql_update_batch_queries), $mysql_update_batch_params);
    $mysql_update_batch_queries = $mysql_update_batch_params = array();
  }

}

function mysql_insert_or_update_batch($table, $params, $keys, $excluded_cols, $options = null){

  $wherequery = $whereparams = $updatekeys = [];
  foreach($keys as $key){
    if(isset($params[$key])){
      $wherequery[] = "$key = ?";
      $whereparams[] = $params[$key];
      $updatekeys[$key] = $params[$key];
    }
  }
  if(count($wherequery) > 0) $wherequery = ' where ' . implode(' and ' , $wherequery);
  $exists = pmc("select count(*) from $table $wherequery", $whereparams);

  if($exists){
    mysql_update_batch($table, $params, $updatekeys, $excluded_cols, $options);
  }
  else{
    mysql_insert_batch($table, $params, $keys, $options);
  }

}
function mysql_insert_or_update_batch_end(){

  mysql_insert_batch_end();
  mysql_update_batch_end();

}

function mysql_get_row($name, $filters, $columns = null, $properties = null){
  try{
    global $mysqlpdo_database;
    $database = isset($properties['database']) ? $properties['database'] : $mysqlpdo_database;
    $columnqueries = array();
    if($columns == null){
      $columnqueries[] = '*';
    }
    else{
      for($i = 0 ; $i < count($columns) ; $i++){
        if($columns[$i] == '*'){ $columnqueries[] = '*'; break; }
        else
          $columnqueries[] = "`" . $columns[$i] . "`";
      }
    }
    $where = array();
    $params = array();
    foreach($filters as $key=>$value){
      $where[] = "`$key` = ?";
      $params[] = $value;
    }
    $query = "SELECT " . implode(', ', $columnqueries) . " FROM $name";
    if(count($where) > 0) $query .= " WHERE " . implode(' AND ', $where);
    return pmr($query, $params);
  }
  catch(Exception $ex){
    $c = $ex->getMessage() . "\n";
    $c .= "name: $name \n";
    $c .= "filters: " . json_encode($filters) . " \n";
    $c .= "columns: " . json_encode($columns);
    throw new Exception($c);
  }
}
function mysql_get_rows($name, $columns = null, $filters = null, $properties = null){

  try{

    global $mysqlpdo_database;
    $database = isset($properties['database']) ? $properties['database'] : $mysqlpdo_database;

    $params = array();

    // Column queries
    $columnqueries = array();
    if($columns == null){
      $columnqueries[] = '*';
    }
    else{
      for($i = 0 ; $i < count($columns) ; $i++){
        if($columns[$i] == '*'){ $columnqueries[] = '*'; break; }
        else
          $columnqueries[] = "`" . $columns[$i] . "`";
      }
    }

    // Where queries
    $where = array();
    if(is_assoc($filters))
      foreach($filters as $key=>$value){
        $where[] = "`$key` = ?";
        $params[] = $value;
      }

    // Sorts
    $orders = array();
    $sorts = ov('sorts', $properties, array('defaultvalue'=>array()));
    foreach($sorts as $sort){
      $sortname = ov('name', $sort, array('defaultvalue'=>''));
      $sorttype = ov('type', $sorts, array('defaultvalue'=>'asc'));
      if(!empty($sortname))
        $orders[] = "`$sortname` $sorttype";
    }

    $query = "SELECT " . implode(', ', $columnqueries) . " FROM $database.$name";
    if(count($where) > 0) $query .= " WHERE " . implode(' AND ', $where);
    if(count($orders) > 0) $query .= " ORDER BY " . implode(', ', $orders);

    return pmrs($query, $params);

  }
  catch(Exception $ex){
    $c = $ex->getMessage() . "\n";
    $c .= "name: $name <br />\n";
    $c .= "filters: " . print_r($filters, 1) . " <br />\n";
    $c .= "columns: " . print_r($columns, 1) . " <br />\n";
    $c .= "columns: " . print_r($query, 1) . " <br />\n";
    $c .= "columns: " . print_r($params, 1) . " <br />\n";
    throw new Exception($c);
  }
}
function mysql_dropschema($schema){
  pm("DROP DATABASE IF EXISTS `$schema`");
}
function mysql_createschema($schema){
  pm("CREATE DATABASE IF NOT EXISTS `$schema`");
}

function mysql_backup_tables($backup_url, $host, $user, $pass, $name, $tables = '*'){

  $link = mysqli_connect($host,$user,$pass);
  mysqli_select_db($link, $name);

  //get all of the tables
  if($tables == '*')
  {
    $tables = array();
    $result = mysqli_query($link, 'SHOW TABLES');
    while($row = mysqli_fetch_row($result))
    {
      $tables[] = $row[0];
    }
  }
  else
  {
    $tables = is_array($tables) ? $tables : explode(',',$tables);
  }

  //cycle through
  $return = '';
  foreach($tables as $table)
  {
    $result = mysqli_query($link, 'SELECT * FROM '.$table);
    $num_fields = mysqli_num_fields($result);

    $return.= 'DROP TABLE '.$table.';';
    $row2 = mysqli_fetch_row(mysqli_query($link, 'SHOW CREATE TABLE '.$table));
    $return.= "\n\n".$row2[1].";\n\n";

    for ($i = 0; $i < $num_fields; $i++)
    {
      while($row = mysqli_fetch_row($result))
      {
        $return.= 'INSERT INTO '.$table.' VALUES(';
        for($j=0; $j < $num_fields; $j++)
        {
          $row[$j] = addslashes($row[$j]);
          $row[$j] = str_replace("\n","\\n",$row[$j]);
          if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
          if ($j < ($num_fields-1)) { $return.= ','; }
        }
        $return.= ");\n";
      }
    }
    $return.="\n\n\n";
  }

  // save file
  $handle = fopen('../snapshot/backup.sql','w+');
  fwrite($handle, $return);
  fclose($handle);

}

function mysqli_exec_multiples($queries){

  global $mysqlpdo_database, $mysqlpdo_username, $mysqlpdo_password, $mysqlpdo_host;
  $maxsize = 2000;
  $count = count($queries);
  $results = array();

  $mysqli = new mysqli($mysqlpdo_host, $mysqlpdo_username, $mysqlpdo_password, $mysqlpdo_database);
  if(mysqli_connect_errno()) throw new Exception(mysqli_connect_error());

  for($i = 0 ; $i < ceil($count / $maxsize) ; $i++){

    $current_queries = array_splice($queries, 0, count($queries) > $maxsize ? $maxsize : count($queries));
    $current_queries = implode(';', $current_queries);

    if ($mysqli->multi_query($current_queries)) {

      do {
        if ($result = $mysqli->store_result()) {
          $rows = array();
          while($row = $result->fetch_row())
            $rows[] = $row;
          $results[] = $rows;
          $result->free();
        }
      }
      while ($mysqli->next_result());

    }

  }

  $mysqli->close();

  return $results;

}

?>