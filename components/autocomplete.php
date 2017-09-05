<?php


?>
<div class="padding20">

  <label class="padding8">Simple Autocomplete</label><br />
  <span id="autocomplete1"></span>

  <div class="height10"></div>

  <label class="padding8">Multiple Autocomplete</label><br />
  <span id="autocomplete2"></span>

</div>

<script>

  $(function(){

    $('#autocomplete1').autocomplete({
      src:"http://localhost:81/fa-ux/data/seo_country_filter.php",
      width:"300px",
    })

    $('#autocomplete2').autocomplete({
      multiple: true,
      placeholder:"Country...",
      src:"http://localhost:81/fa-ux/data/seo_country_filter.php",
      width:"300px"
    })

  })

</script>