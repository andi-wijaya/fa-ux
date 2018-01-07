<?php


?>
<div class="content padding20 bg-white">

  <label class="padding8">Simple Autocomplete</label><br />
  <span id="autocomplete1"></span>

  <div class="height10"></div>

  <label class="padding8">Multiple Autocomplete</label><br />
  <span id="autocomplete2"></span>

  <div class="height10"></div>

  <label class="padding8">Multiple Autocomplete with Mapping</label><br />
  <span id="autocomplete3"></span>

</div>

<script>

  $(function(){

    $('#autocomplete1').autocomplete({
      onchange:function(obj){
        console.log([ this, obj ]);
      },
      src:"/fa-ux/data/seo_country_filter.php",
      width:"200px",
    })

    $('#autocomplete2').autocomplete({
      multiple: true,
      placeholder:"Country...",
      src:"/fa-ux/data/seo_country_filter.php",
      width:"600px",
      value:""
    })

    $('#autocomplete3').autocomplete({
      multiple: true,
      placeholder:"Country...",
      src:"/fa-ux/data/seo_country_filter.php",
      map:{
        text:"code",
        value:"code"
      },
      width:"600px",
      value:""
    })

  })

</script>
