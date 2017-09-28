<?php


?>

<div class="content padding20">

  <small>Default Toggle</small>
  <br />
  <span id="toggle1"></span>

  <div class="height20"></div>

  <small>Default Toggle with Default Value</small>
  <br />
  <span id="toggle2"></span>
  
</div>

<script type="text/javascript">
  
  $(function(){
    
    $('#toggle1').toggle({
      name:"enabled"
    });

    $('#toggle2').toggle({
      name:"enabled",
      value: 1
    });
    
  })
  
</script>
