  <?php

include __DIR__ . '/data/whitelist.php';
include __DIR__ . '/assets/php/util.php';

session_start();

if($_GET['url'] == 'test'){
  include 'components/test.php';
  exit();
}

if(!isset($_SESSION['auth_email']) || !in_array($_SESSION['auth_email'], $allowed_emails)){
  include 'auth.php';
  exit();
}
else{
  // Unauthorize
  if(isset($_GET['unauth'])){
    unset($_SESSION['auth_email']);
    header('Location: .');
  }
}

?>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>fontawesome.css" />
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>glyphicons.css" />
  <?php $files = glob('assets/css/*.css'); foreach($files as $file){ ?>
    <link rel="stylesheet" href="<?=base_url() . '/' . $file?>" />
  <?php } ?>
  <link rel="stylesheet" href="<?=base_url() . '/assets/'?>app.css" />
  <script type="text/javascript" src="<?=base_url() . '/'?>assets/jquery-2.2.3.min.js"></script>
  <?php $files = glob('assets/js/*.js'); foreach($files as $file){ ?>
    <script type="text/javascript" src="<?=base_url() . '/' . $file?>"></script>
  <?php } ?>
</head>
<body>

<div class="sidebar padding10">
  <ul class="nav width200">
    <?php $files = glob(__DIR__ . '/components/*.php'); foreach($files as $file){ ?>
    <li><a href="<?=base_url() . '/components/' . str_replace('.php', '', basename($file))?>"><?=ucwords(basename(str_replace('.php', '', $file)))?></a></li>
    <?php } ?>
  </ul>
  <div class="height20"></div>
  <ul class="nav width200">
    <?php $files = glob(__DIR__ . '/workspaces/*.php'); foreach($files as $file){ ?>
    <li><a href="<?=base_url() . '/workspaces/' . str_replace('.php', '', basename($file))?>"><?=ucwords(basename(str_replace('.php', '', $file)))?></a></li>
    <?php } ?>
  </ul>
</div>

<div class="content">
  <?php
    // Load views
    if(file_exists($_GET['url'] . '.php'))
      include $_GET['url'] . '.php';
  ?>
</div>

<script type="text/javascript">

  $(function(){

    $('.content').css({ 'margin-left':$('.sidebar').outerWidth() + "px" });

  })

</script>

</body>
</html>
