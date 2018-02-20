<?php

$autocomplete_properties = [
  'name'=>[ 'datatype'=>'string', 'desc'=>'Specify name of autocomplete.' ],
  'id'=>[ 'datatype'=>'string', 'desc'=>'Specify id of autocomplete.' ],
  'class'=>[ 'datatype'=>'string', 'desc'=>'Add custom class to autocomplete.' ],
  'onchange'=>[ 'datatype'=>'closure', 'desc'=>'On change event handler. ' ],
  'width'=>[ 'datatype'=>'string', 'desc'=>'Specify width of autocomplete, in css notation: px, pt, mm, etc...)' ],
  'multiple'=>[ 'datatype'=>'bool', 'desc'=>'Multiple value mode. value will be comma-separated' ],
  'value'=>[ 'datatype'=>'string', 'desc'=>'Set the value of autocomplete. Single value string or comma separated string' ],
  'placeholder'=>[ 'datatype'=>'string', 'desc'=>'Set the placeholder of autocomplete' ],
  'map'=>[ 'datatype'=>'object', 'desc'=>'Define mapping of datasource. Autocomplete require text-value object' ],
  'src'=>[ 'datatype'=>'string', 'desc'=>'Specify datasource of autocomplete.' ],
];

ksort($autocomplete_properties);

?>
<div class="content padding20 bg-white">
  <h1>Autocomplete</h1>
  <div class="height20"></div>
  <span class="ctl_prop"></span>
  <div class="height30"></div>
  <span class="ctl_samples"></span>
</div>

<script>

  $(function(){

    $('.ctl_prop').doc_properties({ name:"autocomplete", value:<?=json_encode($autocomplete_properties)?> });
    $('.ctl_samples').doc_samples({ name:"autocomplete", value:<?=json_encode($autocomplete_properties)?> });

  })

</script>
