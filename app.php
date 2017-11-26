  <?php

include __DIR__ . '/data/whitelist.php';
include __DIR__ . '/assets/php/util.php';

session_start();

?>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>fontawesome.css" />
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>glyphicons.css" />
<!--  <link rel="stylesheet" href="--><?//=base_url() . '/assets/css/'?><!--style.min.css" />-->
  <?php $files = glob('assets/css/*.css'); foreach($files as $file){ if(strpos($file, 'style.') === false){ ?>
    <link rel="stylesheet" href="<?=base_url() . '/' . $file?>" />
  <?php } } ?>
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>app.css" />
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>playground.css" />
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>jquery.gridster.min.css" />
  <script type="text/javascript" src="<?=base_url() . '/'?>assets/jquery-2.2.3.min.js"></script>
  <script type="text/javascript" src="<?=base_url() . '/'?>assets/jquery.csv.min.js"></script>
  <script type="text/javascript" src="<?=base_url() . '/'?>assets/jquery.gridster.min.js"></script>
  <script type="text/javascript" src="<?=base_url() . '/'?>assets/Chart.min.js"></script>
<!--  <script type="text/javascript" src="--><?//=base_url() . '/'?><!--assets/js/script.min.js"></script>-->
  <?php $files = glob('assets/js/*.js'); foreach($files as $file){  if(strpos($file, 'script.') === false){ ?>
    <script type="text/javascript" src="<?=base_url() . '/' . $file?>"></script>
  <?php } } ?>
</head>
<body>

<div class="sidebar padding10">
  <ul class="nav" style="width:150px;">
    <?php $files = glob(__DIR__ . '/components/*.php'); foreach($files as $file){ ?>
    <li><a href="<?=base_url() . '/components/' . str_replace('.php', '', basename($file))?>"><?=ucwords(str_replace('_', ' ', basename(str_replace('.php', '', $file))))?></a></li>
    <?php } ?>
  </ul>
  <div class="height20"></div>
  <ul class="nav width200">
    <?php $files = glob(__DIR__ . '/workspaces/*.php'); foreach($files as $file){ ?>
    <li><a href="<?=base_url() . '/workspaces/' . str_replace('.php', '', basename($file))?>"><?=ucwords(str_replace('_', ' ', basename(str_replace('.php', '', $file))))?></a></li>
    <?php } ?>
  </ul>
</div>

<?php
  // Load views
  if(file_exists($_GET['url'] . '.php'))
    include $_GET['url'] . '.php';
?>

</body>
</html>
