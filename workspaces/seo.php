<?php


?>
<div>
  <button class=""><span class="glyphicons glyphicons-plus"></span>New...</button>
  <span id="domain_filter"></span>
  <span id="page_type_filter"></span>
  <button class="gray"><span class="glyphicons glyphicons-check"></span>Apply</button>
  <div class="height5"></div>
  <span id="seo_gridhead"></span>
</div>
<div>
  <span id="seo_grid"></span>
</div>

<div id="seo_detail_modal" class="modal width600 container">
  <div class="modal-head"></div>
  <div class="modal-body padding5">
    <table class="form">
      <tr>
        <th><label class="padding8">Domain</label></th>
        <td><span id="seo_detail_domain"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Type</label></th>
        <td><span id="seo_detail_page_type"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Country</label></th>
        <td><span id="seo_detail_country"></span></td>
      </tr>
    </table>
  </div>
  <div class="modal-foot align-right padding5">
    <button data-action="modal.close"><span class="glyphicons glyphicons-remove"></span> Close</button>
  </div>
</div>

<script>

  $(function(){

    $('#domain_filter').dropdown({ width:"200px", searchable:true, value:"*", src:"http://localhost:81/fa-ux/data/seo_domain_filter.php" });
    $('#page_type_filter').dropdown({ width:"200px", searchable:true, value:"*", src:"http://localhost:81/fa-ux/data/seo_page_type_filter.php" });

    var columns = [
      { name:"options", text:"", width:"60px", type:"html", html:"mod.seo_grid_options" },
      { name:"domain", text:"Domain", width:"150px" },
      { name:"type", text:"Type", width:"150px" },
      { name:"country", text:"Country", width:"150px" },
    ];
    $('#seo_gridhead').gridhead({ columns:columns, grid:"#seo_grid" });
    $('#seo_grid').grid({ columns:columns, src:"http://localhost:81/fa-ux/data/seo_data.php" });

    $('#seo_detail_page_type').dropdown({ name:"type", width:"200px", src:"http://localhost:81/fa-ux/data/seo_page_type_filter.php" });
    $('#seo_detail_domain').dropdown({ name:"domain", width:"200px", src:"http://localhost:81/fa-ux/data/seo_domain_filter.php" });
    $('#seo_detail_country').dropdown({ name:"country", width:"200px", src:"http://localhost:81/fa-ux/data/seo_country_filter.php" });

  })

  mod = {

    seo_grid_options:function(obj){

      var html = [];
      html.push("<span class='glyphicons glyphicons-menu-hamburger padding5 selectable'></span>");
      $(this).html(html.join(''));
      $('.glyphicons-menu-hamburger', this).on('click', function(){

        $.api_post('http://localhost:81/fa-ux/data/seo_data.php?id=' + obj['id'], { }, function(response){
          $('#seo_detail_modal').modal_open({
            value:response.data
          });
        })

      });

    }

  }

</script>