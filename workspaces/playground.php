<div class="content bg-white padding20 container">

  <h1>Playground</h1>
  <div class="height50"></div>

  <span id="autocomplete1"></span>
  <span id="textbox1"></span>
  <span id="textarea1"></span>
  <span id="dropdown1"></span>
  <span id="datepicker1"></span>
  <button class="button1">Execute</button>
  <button><span class="glyphicons glyphicons-activity"></span>Activity</button>
  <button class="button1 blue">Execute</button>
  <button class="blue"><span class="glyphicons glyphicons-activity"></span>Activity</button>

  <div class="height20"></div>

  <span id="autocomplete2"></span>

</div>

<script>

  $(function(){

    $('#autocomplete1').autocomplete({ name:"autocomplete1", placeholder:"Autocomplete", src:"/fa-ux/data/seo_country_filter.php" });
    $('#textbox1').textbox({ name:"textbox1", placeholder:"Textbox" });
    $('#textarea1').textarea({ name:"textarea1", placeholder:"Textarea" });
    $('#dropdown1').dropdown({ name:"dropdown1", items:[{text:"Option-1",value:"option1"},{text:"Option-2",value:"option2"}] });
    $('#datepicker1').datepicker({ name:"datepicker1" });

    $('.button1').on('click', function(){
      console.log($('.container').val());
    })

    $('#autocomplete2').autocomplete({ name:"autocomplete1", multiple:true, placeholder:"Autocomplete", src:"/fa-ux/data/seo_country_filter.php" });

  })

</script>