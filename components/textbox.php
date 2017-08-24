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
  'width'=>[
    'type'=>'string',
    'description'=>'Set the width of textbox. (use css width; px, %, em)',
    'istodo'=>1
  ],
  'class'=>[
    'type'=>'string',
    'description'=>'Add custom class of textbox.'
  ],
  'onchange'=>[
    'type'=>'callable',
    'description'=>'Attach textbox onchange event'
  ],
  'required'=>[
    'type'=>'bool',
    'description'=>'Set whether textbox require a value or not, default: 0',
    'istodo'=>1
  ],
  'validation'=>[
    'type'=>'string',
    'description'=>'Set textbox validation rule. supported value: "number", "(regex)"',
    'istodo'=>1
  ],
];
ksort($properties);

?>
<h5>Properties:</h5>
<br /><br />
<table class="proptable">
  <?php foreach($properties as $key=>$property){ ?>
  <tr>
    <td class="<?=isset($property['istodo']) && $property['istodo'] ? 'cl-red' : ''?>"><?=$key?></td>
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
  'textbox_placeholder'=>[
    'return'=>'string',
    'description'=>'Get/Set textbox placeholder'
  ],
  'textbox_width'=>[
    'return'=>'string',
    'description'=>'Get/Set textbox width. (use css width; px, %, em)',
    'istodo'=>1
  ],
];
ksort($methods);

?>
<h5>Methods:</h5>
<br /><br />
<table class="proptable">
  <?php foreach($methods as $key=>$method){ ?>
    <tr>
      <td class="<?=isset($method['istodo']) && $method['istodo'] ? 'cl-red' : ''?>"><?=$key?></td>
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