<div class="content">

  <div class="padding10">
    <button id="button1" class="">Simple Button</button>
    &nbsp;
    <button id="button2" class=""><span class="glyphicons glyphicons-alert"></span>Button with Icon</button>
  </div>
  <div class="padding10">
    <button class="gray">Simple Gray Button</button>
    &nbsp;
    <button class="gray"><span class="glyphicons glyphicons-alert"></span>Gray Button with Icon</button>
  </div>
  <div class="padding10">
    <button class="red">Simple Red Button</button>
    &nbsp;
    <button class="red"><span class="glyphicons glyphicons-alert"></span>Red Button with Icon</button>
  </div>
  <div class="padding10">
    <button class="blue">Simple Blue Button</button>
    &nbsp;
    <button class="blue"><span class="glyphicons glyphicons-alert"></span>Blue Button with Icon</button>
  </div>
  <div class="padding10">
    <button class="green">Simple Green Button</button>
    &nbsp;
    <button class="green"><span class="glyphicons glyphicons-alert"></span>Green Button with Icon</button>
  </div>

</div>

<script>

  $(function(){

    $('#button1').on('click', function(){
      $(this).button_state($(this).button_state() == 1 ? 2 : 1);
    })

    $('#button2').on('click', function(){
      $(this).button_state($(this).button_state() == 1 ? 2 : 1, 1);
    })

  })

</script>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<button id="button1" class="">Simple Button</button>
<button id="button2" class=""><span class="glyphicons glyphicons-alert"></span>Button with Icon</button>

<button class="gray">Simple Gray Button</button>
<button class="gray"><span class="glyphicons glyphicons-alert"></span>Gray Button with Icon</button>

<button class="red">Simple Red Button</button>
<button class="red"><span class="glyphicons glyphicons-alert"></span>Red Button with Icon</button>

<button class="green">Simple Green Button</button>
<button class="green"><span class="glyphicons glyphicons-alert"></span>Green Button with Icon</button>

<script>
  $('#button1').on('click', function(){
    $(this).button_state($(this).button_state() == 1 ? 2 : 1);
  })
  
  $('#button2').on('click', function(){
    $(this).button_state($(this).button_state() == 1 ? 2 : 1, 1);
  })
</script>

EOT;
echo htmlentities($c);?>
  </pre>
</div>
