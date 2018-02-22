  <?php

include __DIR__ . '/data/whitelist.php';
include __DIR__ . '/assets/php/util.php';

$components = [
  'autocomplete'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'map'=>[ 'datatype'=>'object', 'desc'=>'Define mapping of datasource. component require text-value object' ],
      'multiple'=>[ 'datatype'=>'bool', 'desc'=>'Multiple value mode. value will be comma-separated' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'onchange'=>[ 'datatype'=>'closure', 'desc'=>'On change event handler. ' ],
      'placeholder'=>[ 'datatype'=>'string', 'desc'=>'Set the placeholder of component' ],
      'src'=>[ 'datatype'=>'string', 'desc'=>'Specify datasource of component.' ],
      'value'=>[ 'datatype'=>'string', 'desc'=>'Set the value of component. Single value string or comma separated string' ],
      'width'=>[ 'datatype'=>'string', 'desc'=>'Specify width of component, in css notation: px, pt, mm)' ],
    ]
  ],
  'checkbox'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'items'=>[ 'datatype'=>'array', 'desc'=>'Component items. ex: [ { text:text, value:value }, ... ]' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'required'=>[ 'datatype'=>'bool', 'desc'=>'' ],
      'text'=>[ 'datatype'=>'string', 'desc'=>'' ],
      'value'=>[ 'datatype'=>'string', 'desc'=>'Set the value of component. Single value string or comma separated string' ],
    ]
  ],
  'datepicker'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'default_value'=>[ 'datatype'=>'string', 'desc'=>'Default value of component' ],
      'readonly'=>[ 'datatype'=>'bool', 'desc'=>'' ],
      'onchange'=>[ 'datatype'=>'closure', 'desc'=>'On change event handler. param1=value' ],
      'width'=>[ 'datatype'=>'string', 'desc'=>'Specify width of component, in css notation: px, pt, mm)' ],
      'mode'=>[ 'datatype'=>'string', 'desc'=>'Datepicker mode, can be "normal" or "range"' ],
      'value'=>[ 'datatype'=>'string', 'desc'=>'Set the value of component. Single value string or comma separated string' ],
    ]
  ],
  'dropdown'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'default_value'=>[ 'datatype'=>'string', 'desc'=>'Default value of component' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'items'=>[ 'datatype'=>'array', 'desc'=>'Component items. ex: [ { text:text, value:value }, ... ]' ],
      'map'=>[ 'datatype'=>'object', 'desc'=>'Define mapping of datasource. component require text-value object' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'placeholder'=>[ 'datatype'=>'string', 'desc'=>'Set the placeholder of component' ],
      'readonly'=>[ 'datatype'=>'bool', 'desc'=>'' ],
      'src'=>[ 'datatype'=>'string', 'desc'=>'Specify datasource of component.' ],
      'value'=>[ 'datatype'=>'string', 'desc'=>'Set the value of component. Single value string or comma separated string' ],
      'width'=>[ 'datatype'=>'string', 'desc'=>'Specify width of component, in css notation: px, pt, mm)' ],
    ]
  ],
  'grid'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'autoload'=>[ 'datatype'=>'bool', 'desc'=>'default:true' ],
      'columns'=>[ 'datatype'=>'array', 'desc'=>'{ active:0|1, name:string, text:string, datatype:enum, width:string }' ],
      'readonly'=>[ 'datatype'=>'bool', 'desc'=>'TODO' ],
      'height'=>[ 'datatype'=>'string', 'desc'=>'height of component, in css notation: px, pt, mm)' ],
      'method'=>[ 'datatype'=>'string', 'desc'=>'get|post, default:get' ],
      'src'=>[ 'datatype'=>'string', 'desc'=>'Specify datasource of component.' ],
      'width'=>[ 'datatype'=>'string', 'desc'=>'width of component, in css notation: px, pt, mm)' ],
      'scroll_cont'=>[ 'datatype'=>'string', 'desc'=>'scroll container' ],
      'value'=>[ 'datatype'=>'array', 'desc'=>'' ],
      'footer'=>[ 'datatype'=>'closure', 'desc'=>'' ],
    ]
  ],
  'image'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'readonly'=>[ 'datatype'=>'bool', 'desc'=>'' ],
      'height'=>[ 'datatype'=>'string', 'desc'=>'height of component, in css notation: px, pt, mm)' ],
      'width'=>[ 'datatype'=>'string', 'desc'=>'width of component, in css notation: px, pt, mm)' ],
      'value'=>[ 'datatype'=>'string', 'desc'=>'' ],
    ]
  ],
  'radio'=>[
    'properties'=>[
      'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to component.' ],
      'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of component.' ],
      'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of component.' ],
      'items'=>[ 'datatype'=>'array', 'desc'=>'Component items. ex: [ { text:text, value:value }, ... ]' ],
      'readonly'=>[ 'datatype'=>'bool', 'desc'=>'TODO' ],
      'text'=>[ 'datatype'=>'string', 'desc'=>'' ],
    ]
  ],
];


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
    width: 600px;
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

      var cookie = eval("(" + $.cookie_getitem(control_name) + ")");
      var sample_prop = cookie;
      if($.type(sample_prop) != 'object') sample_prop = {};

      var html = [];
      html.push("<div class='doc-samples' data-name=\"" + control_name + "\">");
      html.push("<b class='padding5 inline-block'>Samples:</b>");
      html.push("<br />");
      html.push("<span class='doc-samples-sect1'>");
      html.push("<table>");
      for(var key in value){
        var obj = value[key];
        var datatype = obj['datatype'];
        var desc = obj['desc'];
        var val = $.val(key, cookie, { d:'' });

        switch(datatype){
          case 'array': try{ val = eval('(' + val + ')'); }catch(e){ val = val; } break;
        }
        sample_prop[key] = val;

        html.push("<tr>");
        html.push("<td><label class='padding5'>" + key + "</label></td>");
        html.push("<td><span class='samples_key " + datatype + "' data-key=\"" + key + "\" data-datatype=\"" + datatype + "\"></span></td>");
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

      $('.samples_key', this).each(function(){

        var key = $(this).attr('data-key');
        var val = $.val(key, sample_prop, { d:'' });

        if(val instanceof Object) val = JSON.stringify(val);

        $(this).textbox({
          onblur:function(e, value){

            var el = $(this).closest('.doc-samples');
            var control_name = $(el).attr('data-name');

            var prop = {};
            $('.samples_key', el).each(function(){
              var key = $(this).attr('data-key');
              var datatype = $(this).attr('data-datatype');
              var value = $(this).val();

              switch(datatype){
                case 'array': try{ value = eval('(' + value + ')'); }catch(e){ value = value; } break;
              }

              if(value != '' && value != null)
                prop[key] = value;
            });
            $('.doc-samples-control', el)[control_name](prop);
            $.cookie_setitem(control_name, JSON.stringify(prop));

          },
          value:val
        });
      });
      $('.doc-samples-control', this)[control_name](sample_prop);

    },

  })


</script>

<div class="sidebar padding10">
  <ul class="nav" style="width:150px;">
    <?php if(is_array($components)) foreach($components as $property_key=>$property){ ?>
      <li><a href="<?=base_url() . '/components/' . str_replace('.php', '', $property_key)?>"><?=ucwords($property_key)?></a></li>
    <?php } ?>
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

  $key = $_GET['url'];
  $key_exists = false;

  if(strpos($key, 'component') !== false){
    $component = str_replace('components/', '', $key);

    if(isset($components[$component])){
      $component_properties = $components[$component]['properties'];
      ksort($component_properties);
    ?>
      <div class="content padding20 bg-white">
        <h1><?=ucwords($component)?></h1>
        <div class="height20"></div>
        <span class="ctl_prop"></span>
        <div class="height30"></div>
        <span class="ctl_samples"></span>
      </div>

      <script>

        $(function(){

          $('.ctl_prop').doc_properties({ name:"<?=$component?>", value:<?=json_encode($component_properties)?> });
          $('.ctl_samples').doc_samples({ name:"<?=$component?>", value:<?=json_encode($component_properties)?> });

        })

      </script>
    <?php

      $key_exists = true;
    }
  }

  if(!$key_exists && file_exists($_GET['url'] . '.php'))
    include $_GET['url'] . '.php';
  else
    echo "Unable to load view.";

?>

</body>
</html>
