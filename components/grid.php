<div class="content bg-white padding10">

  <h1>Grid</h1>
  <br />
  <button id="button1">ADD ITEM</button>
  <br />
  <span class="padding10" id="sticky1">
    <span id="sample1"></span>
  </span>
  <span class="padding10">
    <span id="sample2"></span>
  </span>

</div>

<script>

  var mod = {

    init:function(){

      var columns = [
        { text:"", name:"options", width:"130px", type:"html", html:"mod.col0" },
        { text:"Code", name:"code", width:"100px" },
        { text:"Description", name:"description", width:"300px" },
//      { text:"Image", name:"image", width:"80px", align:"center", type:"html", html:"mod.col1" },
        { text:"Editable", width:"150px", align:"center", type:"html", html:"mod.col2" },
      ];

      $('#sample1').gridhead({
        columns:columns,
        grid:"#sample2"
      });

      $('#sample2').grid({
        columns:columns,
        src:"/fa-ux/data/sample_grid.php",
        method:"post",
        key:"id",
        row_per_page:5,
        scroll_cont:'window'
      });

      $('#button1').on('click', function(){

        $('#sample2').grid_add({
          id:99,
          code:'Code99',
          description:'Description99'
        }, 1);

      })

      $.sticky_add('#sticky1');

      $('.stickybar').css({ left:$('.content').css('margin-left') });

    },

    col0:function(obj){

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

    },

    col1:function(obj){

      $(this).html("<div class='align-center padding5'><span class='image'></span></div>");
      $('.image', this).image({
        value:obj['imageurl']
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