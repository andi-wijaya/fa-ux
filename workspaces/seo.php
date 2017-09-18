<div>
  <button id="seo_new" class=""><span class="glyphicons glyphicons-plus"></span>New...</button>
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
  <div class="modal-head">
    <span id="seo_detail_id"></span>
  </div>
  <div class="modal-body padding5">
    <table class="form" cellspacing="10">
      <tr>
        <th><label class="padding8">Domain</label></th>
        <td colspan="2"><span id="seo_detail_domain"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Type</label></th>
        <td colspan="2"><span id="seo_detail_page_type"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Country</label></th>
        <td><span id="seo_detail_country_modifier"></span></td>
        <td><span id="seo_detail_country" style="width:100%" ></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Parent Category</label></th>
        <td><span id="seo_detail_parent_category_modifier"></span></td>
        <td><span id="seo_detail_parent_category"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Category</label></th>
        <td><span id="seo_detail_category_modifier"></span></td>
        <td><span id="seo_detail_category"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Product Code</label></th>
        <td><span id="seo_detail_product_code_modifier"></span></td>
        <td><span id="seo_detail_product_code"></span></td>
      </tr>
      <tr><td class="height20"></td></tr>
      <tr>
        <th><label class="padding8">Title</label></th>
        <td colspan="2"><span id="seo_detail_title"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Description</label></th>
        <td colspan="2"><span id="seo_detail_description"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Keyword</label></th>
        <td colspan="2"><span id="seo_detail_keyword"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">H1</label></th>
        <td colspan="2"><span id="seo_detail_h1"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">H2</label></th>
        <td colspan="2"><span id="seo_detail_h2"></span></td>
      </tr>
      <tr>
        <th><label class="padding8">Footer</label></th>
        <td colspan="2"><span id="seo_detail_footer"></span></td>
      </tr>
    </table>
  </div>
  <div class="modal-foot align-right padding5">
    <button id="seo_detail_save"><span class="glyphicons glyphicons-disk-save"></span> Save</button>
    <button data-action="modal.close"><span class="glyphicons glyphicons-remove"></span> Close</button>
  </div>
</div>

<script>

  $(function(){

    $('#domain_filter').dropdown({ width:"200px", searchable:true, value:"*", src:"/fa-ux/data/seo_domain_filter.php" });
    $('#page_type_filter').dropdown({ width:"200px", searchable:true, value:"*", src:"/fa-ux/data/seo_page_type_filter.php" });
    $('#seo_new').on('click', function(){ mod.entry(); });

    var columns = [
      { name:"options", text:"", width:"80px", type:"html", html:"mod.seo_grid_options" },
      { name:"domain", text:"Domain", width:"150px" },
      { name:"type", text:"Type", width:"150px" },
      { name:"country", text:"Country", width:"150px" },
    ];
    $('#seo_gridhead').gridhead({ columns:columns, grid:"#seo_grid" });
    $('#seo_grid').grid({ columns:columns, src:"/fa-ux/data/seo_data.php" });

    $('#seo_detail_id').hidden({ name:"id" });
    $('#seo_detail_page_type').dropdown({ name:"type", width:"200px", src:"/fa-ux/data/seo_page_type_filter.php" });
    $('#seo_detail_domain').dropdown({ name:"domain", width:"200px", src:"/fa-ux/data/seo_domain_filter.php" });
    $('#seo_detail_country').autocomplete({ name:"country_ctl1", multiple:true, src:"/fa-ux/data/seo_country_filter.php", placeholder:"Fill Country..." });
    $('#seo_detail_country_modifier').dropdown({ name:"country_ctl2", placeholder:"Select", width:"120px", defaultvalue:"*", items:[{ text:"All", value:"*" }, { text:"All Except...", value:"*!" }, { text:"Only This", value:"" }], onchange:"mod.modifier_changed('country')" });
    $('#seo_detail_parent_category').autocomplete({ name:"parent_category_ctl1", multiple:true, src:"/fa-ux/data/seo_country_filter.php", placeholder:"Fill Parent Category..." });
    $('#seo_detail_parent_category_modifier').dropdown({ name:"parent_category_ctl2", placeholder:"Select", width:"120px", defaultvalue:"*", items:[{ text:"All", value:"*" }, { text:"All Except...", value:"*!" }, { text:"Only This", value:"" }], onchange:"mod.modifier_changed('parent_category')" });
    $('#seo_detail_category').autocomplete({ name:"category_ctl1", multiple:true, src:"/fa-ux/data/seo_country_filter.php", placeholder:"Fill Category..." });
    $('#seo_detail_category_modifier').dropdown({ name:"category_ctl2", placeholder:"Select", width:"120px", defaultvalue:"*", items:[{ text:"All", value:"*" }, { text:"All Except...", value:"*!" }, { text:"Only This", value:"" }], onchange:"mod.modifier_changed('category')" });
    $('#seo_detail_product_code').autocomplete({ name:"product_code_ctl1", multiple:true, src:"/fa-ux/data/seo_country_filter.php", placeholder:"Fill Product Code..." });
    $('#seo_detail_product_code_modifier').dropdown({ name:"product_code_ctl2", placeholder:"Select", width:"120px", defaultvalue:"*", items:[{ text:"All", value:"*" }, { text:"All Except...", value:"*!" }, { text:"Only This", value:"" }], onchange:"mod.modifier_changed('product_code')" });

    $('#seo_detail_title').textbox({ name:"title", placeholder:"Title...", width:"100%", required:true, maxlength:70 });
    $('#seo_detail_description').textbox({ name:"description", placeholder:"Description...", width:"100%" });
    $('#seo_detail_keyword').textbox({ name:"keyword", placeholder:"Keyword...", width:"100%" });
    $('#seo_detail_h1').textbox({ name:"h1", placeholder:"H1...", width:"100%" });
    $('#seo_detail_h2').textbox({ name:"h2", placeholder:"H2...", width:"100%" });
    $('#seo_detail_footer').textbox({ name:"footer", placeholder:"Footer...", width:"100%" });
    $('#seo_detail_save').on('click', mod.save);

  })

  mod = {

    seo_grid_options:function(obj){

      var html = [];
      html.push("<span class='glyphicons glyphicons-menu-hamburger padding5 selectable'></span>");
      html.push("<span class='glyphicons glyphicons-copy padding5 selectable'></span>");
      html.push("<span class='glyphicons glyphicons-remove padding5 selectable'></span>");
      $(this).html(html.join(''));
      $('.glyphicons-menu-hamburger', this).on('click', function(){ mod.open(obj['id']); });

    },

    save:function(){

      var obj = $('#seo_detail_modal').val();

      obj['country'] = obj['country_ctl2'] + obj['country_ctl1'];
      obj['parent_category'] = obj['parent_category_ctl2'] + obj['parent_category_ctl1'];
      obj['category'] = obj['category_ctl2'] + obj['category_ctl1'];
      obj['product_code'] = obj['product_code_ctl2'] + obj['product_code_ctl1'];

      delete obj['country_ctl1'];
      delete obj['country_ctl2'];
      delete obj['parent_category_ctl1'];
      delete obj['parent_category_ctl2'];
      delete obj['category_ctl1'];
      delete obj['category_ctl2'];
      delete obj['product_code_ctl1'];
      delete obj['product_code_ctl2'];

      console.log(obj);

    },

    open:function(id){

      $.api_post('/fa-ux/data/seo_data.php?id=' + id, { }, function(response){

        var obj = response.data;
        obj['country_ctl1'] = mod.get_type0_value(obj['country'])[1];
        obj['country_ctl2'] = mod.get_type0_value(obj['country'])[0];
        obj['parent_category_ctl1'] = mod.get_type0_value(obj['parent_category'])[1];
        obj['parent_category_ctl2'] = mod.get_type0_value(obj['parent_category'])[0];
        obj['category_ctl1'] = mod.get_type0_value(obj['category'])[1];
        obj['category_ctl2'] = mod.get_type0_value(obj['category'])[0];
        obj['product_code_ctl1'] = mod.get_type0_value(obj['product_code'])[1];
        obj['product_code_ctl2'] = mod.get_type0_value(obj['product_code'])[0];

        $('#seo_detail_country').readonly(obj['country_ctl2'] == '*' ? true : false);
        $('#seo_detail_parent_category').readonly(obj['parent_category_ctl2'] == '*' ? true : false);
        $('#seo_detail_category').readonly(obj['category_ctl2'] == '*' ? true : false);
        $('#seo_detail_product_code').readonly(obj['product_code_ctl2'] == '*' ? true : false);

        $('#seo_detail_modal').modal_open({
          value:response.data
        });
      })

    },

    entry:function(){

      $('#seo_detail_modal').modal_open({ reset:true });
      $('#seo_detail_country, #seo_detail_parent_category, #seo_detail_category, #seo_detail_product_code').readonly(true);

    },

    get_type0_value:function(exp){

      exp = typeof exp == 'undefined' ? '' : exp;

      var result = [ '*', '' ];
      if(exp == '*') result = [ '*', '' ];
      else if(exp.indexOf('*!') >= 0) result = [ '*!', exp.substr(2) ];
      else if(exp.split(',').length > 0 && exp.split(',')[0] != '') result = [ '', exp ];
      //console.log([ exp, result ]);
      return result;

    },

    modifier_changed:function(section){

      console.log([ section, $('#seo_detail_parent_category_modifier').val() ]);
      switch(section){
        case 'country':
          $('#seo_detail_country').readonly($('#seo_detail_country_modifier').val() == '*' ? true : false);
          if($('#seo_detail_country_modifier').val() == '*') $('#seo_detail_country').val('', true);
          break;
        case 'parent_category':
          $('#seo_detail_parent_category').readonly($('#seo_detail_parent_category_modifier').val() == '*' ? true : false);
          if($('#seo_detail_parent_category_modifier').val() == '*') $('#seo_detail_parent_category').val('', true);
          break;
        case 'category':
          $('#seo_detail_category').readonly($('#seo_detail_category_modifier').val() == '*' ? true : false);
          if($('#seo_detail_category_modifier').val() == '*') $('#seo_detail_category').val('', true);
          break;
        case 'product_code':
          $('#seo_detail_product_code').readonly($('#seo_detail_product_code_modifier').val() == '*' ? true : false);
          if($('#seo_detail_product_code_modifier').val() == '*') $('#seo_detail_product_code').val('', true);
          break;

      }

    }

  }

</script>