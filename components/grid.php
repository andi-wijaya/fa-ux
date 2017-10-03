<div class="content bg-white padding10">

  <h1>Grid</h1>
  <br /><br /><br />
  <button id="button1">ADD ITEM</button>
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
//      { text:"Image", name:"image", width:"80px", align:"center", type:"html", html:"col1" },
    ];

    $('#sample1').gridhead({
      columns:columns,
      grid:"#sample2"
    });

    $('#sample2').grid({
      columns:columns,
      src:"/fa-ux/data/sample_grid.php",
      method:"post",
      key:"code"
    });

    $('#button1').on('click', function(){

      $('#sample2').grid_add({
        id:99,
        code:'Code99',
        description:'Description99'
      }, 1);

    })

  })

  function col0(obj){

    var html = [];
    html.push("<span class='glyphicons glyphicons-menu-hamburger padding5 selectable'></span>");
    html.push("<span class='glyphicons glyphicons-remove padding5 selectable'></span>");
    html.push("<span class='glyphicons glyphicons-play padding5 selectable'></span>");
    $(this).html(html.join(''));

    $('.glyphicons-remove', this).on('click', function(){
      if(confirm('Remove this?')){
        $('#sample2').grid_remove(obj);
      }
    });

    $('.glyphicons-play', this).on('click', function(){

      $('#sample2').grid_modify(obj, {
        description:'Modified on ' + new Date().getTime()
      });

    })

  }

  function col1(obj){

    $(this).html("<div class='align-center padding5'><span class='image'></span></div>");
    $('.image', this).image({
      value:obj['imageurl']
    })

  }


</script>