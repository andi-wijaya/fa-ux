<div class="content bg-white padding20">

  <h1>Playground</h1>
  <div class="height50"></div>

  <span id="autocomplete1"></span>
  <span id="textbox1"></span>
  <span id="textarea1"></span>
  <span id="dropdown1"></span>
  <button>Execute</button>
  <button><span class="glyphicons glyphicons-activity"></span>Activity</button>

</div>

<script>

  $(function(){

    $('#autocomplete1').autocomplete({ placeholder:"Autocomplete", src:"/fa-ux/data/seo_country_filter.php" });
    $('#textbox1').textbox({ placeholder:"Textbox" });
    $('#textarea1').textarea({ placeholder:"Textarea" });
    $('#dropdown1').dropdown({ items:[{text:"Option-1",value:"option1"},{text:"Option-2",value:"option2"}] });

  })

</script>