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

<style>
  .prop table{
    border-collapse: collapse;
  }
  .prop tr td:nth-child(1){
    width: 150px;
  }
  .prop tr td:nth-child(2){
    width: 80px;
  }
  .prop tr td:nth-child(3){
    min-width: 300px;
  }
  .prop td{
    padding:10px;
    border: solid 1px #eee;
  }

  .doc-samples table{
    border-collapse: collapse;
  }
  .doc-samples td{
    padding:0px;
    border: solid 1px #eee;
  }
  .doc-samples td:nth-child(2)>*{
    border: none;
  }
  .doc-samples .doc-samples-sect1{
    display: inline-block;
    vertical-align: top;
  }
  .doc-samples .doc-samples-sect2{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }
  .doc-samples .doc-samples-control-space{
    background: #eee;
    padding: 20px;
    min-width: 600px;
  }

</style>

<script>

  $.fn.extend({

    doc_properties:function(options){

      var value = options.value;

      var html = [];
      html.push("<div class='prop'>");
      html.push("<b class='padding5 inline-block'>Properties:</b>");
      html.push("<br />");
      html.push("<table class='prop'>");
      for(var key in value){
        var obj = value[key];
        var datatype = obj['datatype'];
        var desc = obj['desc'];

        html.push("<tr>");
        html.push("<td>" + key + "</td>");
        html.push("<td>" + datatype + "</td>");
        html.push("<td>" + desc +  "</td>");
        html.push("</tr>");
      }
      html.push("</table>");
      html.push("</div>");

      $(this).html(html.join(''));

    },

    doc_samples:function(options){

      var control_name = options.name;
      var value = options.value;

      var html = [];
      html.push("<div class='doc-samples'>");
      html.push("<b class='padding5 inline-block'>Samples:</b>");
      html.push("<br />");
      html.push("<span class='doc-samples-sect1'>");
      html.push("<table>");
      for(var key in value){
        var obj = value[key];
        var datatype = obj['datatype'];
        var desc = obj['desc'];

        html.push("<tr>");
        html.push("<td><label class='padding5'>" + key + "</label></td>");
        html.push("<td><span class='samples_key " + datatype + "'></span></td>");
        html.push("</tr>");
      }
      html.push("</table>");
      html.push("</span>");
      html.push("<span class='doc-samples-sect2'>");
      html.push("<span class='doc-samples-control-space'>");
      html.push("<span class='doc-samples-control'>");
      html.push("</span>");
      html.push("</span>");
      html.push("</div>");

      $(this).html(html.join(''));

      $('.samples_key', this).textbox();
      $('.doc-samples-control', this)[control_name]();

    },

  })


</script>

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
