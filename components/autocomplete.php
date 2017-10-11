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

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<span id="autocomplete1"></span>

<script>
  $('#autocomplete1').autocomplete({
    src:"/fa-ux/data/seo_country_filter.php",
    width:"300px",
  })
</script>
EOT;
echo htmlentities($c);?>
  </pre>
<div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="autocomplete2"></span>

<script>
  $('#autocomplete2').autocomplete({
    multiple: true,
    placeholder:"Country...",
    src:"/fa-ux/data/seo_country_filter.php",
    width:"600px",
    value:""
  })
</script>
EOT;
echo htmlentities($c);?>
  </pre>
<div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="autocomplete3"></span>

<script>
  $('#autocomplete3').autocomplete({
    multiple: true,
    placeholder:"Country...",
    src:"/fa-ux/data/seo_country_filter.php",
    mapping:{
      text:"code",
      value:"code"
    },
    width:"600px",
    value:""
  })
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>

<script>

  $(function(){

    $('#autocomplete1').autocomplete({
      src:"/fa-ux/data/seo_country_filter.php",
      width:"300px",
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
      mapping:{
        text:"code",
        value:"code"
      },
      width:"600px",
      value:""
    })

  })

</script>
