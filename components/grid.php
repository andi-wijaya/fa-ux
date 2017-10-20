<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){

  print_r($_POST);

}

?>
<div class="content bg-white padding10">

  <h1>Grid</h1>
  <br />
  <button id="button1">ADD ITEM</button>
  <br />
  <div class="padding10" id="sticky1">
    <span id="gridhead1"></span>
  </div>
  <div class="padding10">
    <span id="grid1"></span>
  </div>

</div>

<script>

  var mod = {

    enums:[
      { text:"FA-105303", value:"FA105303" },
      { text:"FA-105310", value:"FA105310" },
      { text:"FA-105304", value:"FA105304" },
    ],

    init:function(){

      var columns = [
        { text:"", name:"options", width:"130px", type:"html", html:"mod.col0" },
        { text:"Code", name:"code", width:"100px" },
        { text:"Description", name:"description", width:"300px" },
        { text:"Image", name:"image", width:"80px", align:"center", type:"html", html:"mod.col1" },
        { text:"Editable", width:"150px", align:"center", type:"html", html:"mod.col2" },
        { text:"Enum", width:"100px", name:"code", align:"center", type:"enum", enum:mod.enums },
      ];

      $('#gridhead1').gridhead({
        class:"grid-style1",
        columns:columns,
        oncolumnresize:function(obj){
          console.log($(this).gridhead_columns());
        },
        grid:"#grid1"
      });

      $('#grid1').grid({
        class:"grid-style1",
        columns:columns,
        src:"/fa-ux/data/sample_grid.php",
        method:"post",
        key:"id",
        row_per_page:5,
        scroll_cont:'window',
        moveable:true,
        onmove:function(){
          console.log([ arguments, this ]);
        }
      });

      $('#button1').on('click', function(){

        $('#grid1').grid_add({
          id:99,
          code:'Code99',
          description:'Description99'
        }, 1);

      });

      $.sticky_add('#sticky1');

      $('.stickybar').css({ left:$('.content').css('margin-left') });

    },

    col0:function(obj){

      var html = [];
      html.push("<div class='align-center'>");
      html.push("<span class='glyphicons glyphicons-menu-hamburger padding5 selectable'></span>");
      html.push("<span class='glyphicons glyphicons-remove padding5 selectable'></span>");
      html.push("<span class='glyphicons glyphicons-play padding5 selectable'></span>");
      html.push("</div>");
      $(this).html(html.join(''));

      $('.glyphicons-remove', this).on('click', function(){
        if(confirm('Remove this?')){
          $('#grid1').grid_remove(obj);
        }
      });

      $('.glyphicons-play', this).on('click', function(){

        $('#grid1').grid_modify(obj, {
          description:'Modified on ' + new Date().getTime()
        });

      })

    },

    col1:function(obj){

      $(this).html("<div class='align-center padding5'><span class='image'></span></div>");
      $('.image', this).image({
        value:obj['imageurl'],
        height: "40px",
        readonly: true,
      })

    },

    col2:function(obj){

      var html = [];
      html.push("<span class='col2-text'></span>");
      $(this).html(html.join(''));

      $('.col2-text', this).textbox({ name:"code", value:$.val('code', obj) });

    }

  };

  $(mod.init);

</script>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<div id="gridhead1"></div>
<div id="grid1"></div>

<script>
  var columns = [
    { text:"", name:"options", width:"130px", type:"html", html:"mod.col0" },
    { text:"Code", name:"code", width:"100px" },
    { text:"Description", name:"description", width:"300px" },
    { text:"Image", name:"image", width:"80px", align:"center", type:"html", html:"mod.col1" },
    { text:"Editable", width:"150px", align:"center", type:"html", html:"mod.col2" },
    { text:"Enum", width:"100px", name:"code", align:"center", type:"enum", enum:mod.enums },
  ];

  $('#gridhead1').gridhead({
    columns:columns,
    grid:"#grid1"
  });

  $('#grid1').grid({
    columns:columns,
    src:"/sample_grid.php",
    method:"post",
    key:"id",
    row_per_page:5
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>