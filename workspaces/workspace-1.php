<span id="grid1head"></span>
<span id="grid1"></span>

<div id="modal1" class="modal width480 container">
  <div class="modal-head padding10">

    <ul class="tab" data-type="tab" data-container="#modal1_tab1_cont">
      <li class="active">General</li>
      <li>Availability</li>
    </ul>

  </div>
  <div class="modal-body padding10">
    <div id="modal1_tab1_cont">

      <!-- BEGIN Tab-1 Content -->
      <div>
        <table class="form" cellspacing="4">
          <tr>
            <th><label class="padding8">Code</label></th>
            <td><span id="modal1_code"></span></td>
          </tr>
          <tr>
            <th><label class="padding8">Title</label></th>
            <td><span id="modal1_title"></span></td>
          </tr>
          <tr>
            <th><label class="padding8">Image</label></th>
            <td><span id="modal1_image"></span></td>
          </tr>
        </table>
      </div>
      <!-- END Tab-1 Content -->

    </div>
  </div>
  <div class="modal-head align-right padding10">
    <button class="" data-action="modal.close"><span class="glyphicons glyphicons-remove"></span>Close</button>
  </div>
</div>


<script>

    $(function(){

      var columns = [
        { text:"", name:"options", width:"60px", type:"html", html:"mod_col0" },
        { text:"Code", name:"code", width:"100px" },
        { text:"Description", name:"description", width:"300px" },
        { text:"Image", name:"image", width:"80px", align:"center", type:"html", html:"mod_col1" },
      ];

      $('#grid1head').gridhead({
        columns:columns,
        grid:"#grid1"
      });
      $('#grid1').grid({
        columns:columns,
        src:"<?=base_url()?>/data/sample_grid.php"
      });

      $('#modal1_code').textbox({ width:"120px", name:"code" });
      $('#modal1_title').textbox({ width:"240px", name:"title" });
      $('#modal1_image').image({ width:"80px", height:"80px", name:"imageurl" });

    })

  function mod_col0(obj){

    var id = $.val('id', obj);

    var html = [];
    html.push("<span class='glyphicons glyphicons-menu-hamburger padding5 selectable'></span>");
    html.push("<span class='glyphicons glyphicons-remove padding5 selectable'></span>");
    $(this).html(html.join(''));
    $('.glyphicons-menu-hamburger', this).on('click', function(){ mod_open(id); });
    $('.glyphicons-remove', this).on('click', function(){ if(confirm('Remove this?')); });

  }

  function mod_col1(obj){

    $(this).html("<div class='align-center'><span class='image'></span></div>");
//    $('.image', this).image({
//      value:obj['imageurl']
//    })

  }
  
  function mod_open(id){

    $.api_post("<?=base_url()?>/data/sample_product_detail.php", { id:id }, function(response){

      $('#modal1').modal_open({ value:response.data });

    })

    
  }

</script>