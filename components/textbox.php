<h1>Textbox</h1>
<br /><br /><br />

<!-- BEGIN Properties -->
<?php

$properties = [
  'placeholder'=>[
    'type'=>'string',
    'description'=>'Set textbox placeholder'
  ],
  'value'=>[
    'type'=>'string',
    'description'=>'Set the value of textbox'
  ],
];
ksort($properties);

?>
<h5>Properties:</h5>
<br /><br />
<table class="proptable">
  <?php foreach($properties as $key=>$property){ ?>
  <tr>
    <td><?=$key?></td>
    <td><?=$property['type']?></td>
    <td><?=$property['description']?></td>
  </tr>
  <?php } ?>
</table>
<!-- END Properties -->

<br /><br /><br />

<!-- BEGIN Methods -->
<?php

$methods = [
  'textbox_val'=>[
    'return'=>'string',
    'description'=>'Get/Set textbox value'
  ],
];
ksort($methods);

?>
<h5>Methods:</h5>
<br /><br />
<table class="proptable">
  <?php foreach($methods as $key=>$method){ ?>
    <tr>
      <td><?=$key?></td>
      <td><?=$method['return']?></td>
      <td><?=$method['description']?></td>
    </tr>
  <?php } ?>
</table>
<!-- END Methods -->

<br /><br /><br />

<!-- BEGIN Samples -->
<h5>Samples:</h5>
<br /><br />
<span class="bg-light1 padding10">
  <span id="textbox1"></span>
  <script id="script1" type="text/javascript">
    $(function(){
      $('#textbox1').textbox({
        placeholder:"Sample textbox",
        value:"",
      });
    })
  </script>
</span>
<br /><br />
<pre id="script1code" class="code"></pre>
<script type="text/javascript"> $(function(){ $('#script1code').html($('#script1').html()); }); </script>
<!-- END Samples -->