<div class="content">

  <h1>Grid</h1>
  <br /><br /><br />

  <h5>Samples:</h5>
  <br /><br />
  <span class="padding10">
    <span id="sample1"></span>
    <span id="sample2"></span>
  </span>

</div>


<script id="script1" type="text/javascript">
  $(function(){

    var columns = [
      { text:"", name:"options", width:"130px", type:"html", html:"col0" },
      { text:"Code", name:"code", width:"100px" },
      { text:"Description", name:"description", width:"300px" },
      { text:"Image", name:"image", width:"80px", align:"center", type:"html", html:"col1" },
    ];

    $('#sample1').gridhead({
      columns:columns,
      grid:"#sample2"
    });

    $('#sample2').grid({
      columns:columns,
      src:"/fa-ux/data/sample_grid.php",
      method:"get",
    });

  })

  function col0(obj){

    var html = [];
    html.push("<span class='glyphicons glyphicons-barcode padding5 selectable'></span>");
    html.push("<span class='glyphicons glyphicons-alarm padding5 selectable'></span>");
    html.push("<span class='glyphicons glyphicons-activity padding5 selectable'></span>");
    $(this).html(html.join(''));

  }

  function col1(obj){

    $(this).html("<div class='align-center'><span class='image'></span></div>");
    $('.image', this).image({
      value:obj['imageurl']
    })

  }


</script>