<div class="content padding20">
  <div>
    <table cellspacing="5">
      <tr>
        <td><span id="filter_country" data-type="dropdown" data-width="120px"></span></td>
        <td><span id="filter_category" data-type="dropdown" data-width="120px"></span></td>
        <td style="width:100%"><span id="filter_search" data-type="textbox" data-width="100%"></span></td>
        <td><button>Search</button></td>
      </tr>
    </table>
  </div>
  <div class="padding5">
    <span id="grid1head"></span>
    <span id="grid1"></span>
  </div>
</div>

<div class="modal" id="modal1">
  <div id="grid1option"></div>
  <div class="height10"></div>
  <div class="align-right padding5">
    <button class="gridoption-save">Save</button>
    <button class="gridoption-close">Close</button>
  </div>
</div>

<div class="modal" id="modal2">
  <div class="row0 padding5 modal-head">
    <div class="align-center">
      <ul data-type="tab" data-default_index="0" data-container="#modal2_tabcont">
        <li>General</li>
        <li>Category</li>
        <li>Country</li>
      </ul>
    </div>
  </div>
  <div class="row1 padding10 modal-body">
    <div id="modal2_tabcont">
      <div>
        <table cellspacing="4" class="form">
          <tr>
            <td><label class="padding5 width100">Active</label></td>
            <td><span data-type="checkbox" data-name="isactive"></span></td>
          </tr>
          <tr>
            <td><label class="padding5 width100">Addon</label></td>
            <td><span data-type="checkbox" data-name="isaddon"></span></td>
          </tr>
          <tr>
            <td><label class="padding5 width100">Code</label></td>
            <td><span data-type="textbox" data-name="code" data-placeholder="Code" data-width="120px"></span></td>
          </tr>
          <tr>
            <td><label class="padding5">Title</label></td>
            <td><span data-type="textbox" data-name="title" data-placeholder="Title" data-width="300px"></span></td>
          </tr>
          <tr>
            <td><label class="padding5">Description</label></td>
            <td><span data-type="textbox" data-name="description" data-placeholder="Description" data-width="400px"></span></td>
          </tr>
          <tr>
            <td><label class="padding5">Full Description</label></td>
            <td><span data-type="textarea" data-name="full_description" data-placeholder="Full Description" data-width="400px"></span></td>
          </tr>
          <tr>
            <td><label class="padding5">Important Note</label></td>
            <td><span data-type="textarea" data-name="important_note" data-placeholder="Important Note" data-width="400px"></span></td>
          </tr>
          <tr>
            <td><label class="padding5">Image</label></td>
            <td>
              <span data-type="image" data-name="imageurl" data-width="100" data-height="100"></span>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <div class="padding5">
          <button id="modal2_category_add">Add</button>
        </div>
        <span id="modal2_category_grid"></span>
      </div>
      <div>
        <div class="padding5">
          <button id="modal2_country_add">Add</button>
        </div>
        <span id="modal2_country_grid"></span>
      </div>
    </div>
  </div>
  <div class="row2 padding5 modal-foot">
    <button id="modal2_save">Save</button>
    <button id="modal2_close" data-action="modal.close">Close</button>
  </div>
</div>

<script>

  var mod = {

    columns:[
      { name:"options", text:"", width:"60px", type:"html", html:"mod.grid_col0" },
      { name:"code", text:"Code", width:"100px" },
      { name:"title", text:"Title", width:"200px" },
      { name:"description", text:"Description", width:"300px" },
      { name:"createdon", text:"Created ON", width:"140px" },
    ],

    init:function(){

      $('#filter_country').dropdown({
        items:[
          { text:"All Countries", value:"*" },
          { text:"Singapore", value:"singapore" },
          { text:"Malaysia", value:"malaysia" },
          { text:"Indonesia", value:"indonesia" },
        ],
        default_value:'*'
      });

      $('#filter_category').dropdown({
        items:[
          { text:"All Categories", value:"*" },
          { text:"Valentine's Day", value:"valentines day" },
          { text:"Chinese New Year", value:"chinese new year" },
        ],
        default_value:'*'
      });

      $('#grid1head').gridhead({
        class:"style1",
        columns:mod.columns,
        grid:"#grid1",
      });

      // Initialize grid1 with given attributes
      $('#grid1').grid({
        autoload:true,
        class:"style1",
        columns:mod.columns,
        method:"get",
        src:"../data/play1_datasource1.php",
        row_per_page:20,
        scroll_cont:'window',
        onselect:function(){

        },
      });

      $('#grid1option').gridoption({});

      $('#loadme').click(function(){ $('#grid1').grid_load(); }); // Load me button click handler
      $('#getvalue').click(function(){ console.log($('#grid1').val()); }); // Get value button click handler

      $('#test1').click(function(){
        $('#modal1').modal_open({ width:"800px", height:"80%" });
        $('#grid1option').gridoption_val({

          presets:[
            {
              text:"Sample Preset 1",
              name:"sample_preset_1",
              columns:[
                { name:"code", text:"Code", width:"100px", datatype:"text" },
                { name:"title", text:"Title", width:"200px", datatype:"text" },
                { name:"description", text:"Description", width:"300px", datatype:"text" },
                { name:"createdon", text:"Created ON", width:"140px", datatype:"date" },
              ],
            }
          ]

        })
      });

      $('.gridoption-save').click(function(){
        var presets = $('#grid1option').gridoption_val();
        console.log(presets);
      })

      $('.gridoption-close').click(function(){
        $('#modal1').modal_close();
      })

      $('#modal2_category_add').click(function(){
        $('#modal2_category_grid').grid_add();
      });
      $('#modal2_category_grid').grid({
        columns:[
          { text:"", name:"", width:"50px", type:"html", html:"mod.modal2_category_gridcol0" },
          { text:"", name:"", width:"250px", type:"html", html:"mod.modal2_category_gridcol1" },
        ],
        name:"categories"
      });

      $('#modal2_country_add').click(function(){
        $('#modal2_country_grid').grid_add();
      });
      $('#modal2_country_grid').grid({
        columns:[
          { text:"", name:"", width:"50px", type:"html", html:"mod.modal2_country_gridcol0" },
          { text:"", name:"", width:"250px", type:"html", html:"mod.modal2_country_gridcol1" },
          { text:"", name:"", width:"100px", type:"html", html:"mod.modal2_country_gridcol2" },
        ],
        name:"countries"
      });

      $('#modal2_save').click(function(){

        console.log($('#modal2').val());

      })

    },

    modal2_category_gridcol0:function(obj){

      var html = [];
      html.push("<span class='fa fa-times selectable padding5'></span>");
      $(this).html(html.join(''));
      $('.fa-times', this).click(function(){
        $('#modal2_category_grid').grid_remove($(this).closest('tr')[0]);
      })

    },

    modal2_category_gridcol1:function(obj){

      var category_name = $.val('category_name', obj);

      var html = [];
      html.push("<span class='modal2-category-name'></span>");
      $(this).html(html.join(''));
      $('.modal2-category-name', this).textbox({
        class:"borderless",
        name:"category_name",
        src:"",
        value:category_name,
        width:"100%"
      })

    },

    modal2_country_gridcol0:function(obj){

      var html = [];
      html.push("<span class='fa fa-times selectable padding5'></span>");
      $(this).html(html.join(''));
      $('.fa-times', this).click(function(){
        $('#modal2_country_grid').grid_remove($(this).closest('tr')[0]);
      })

    },

    modal2_country_gridcol1:function(obj){

      var country_name = $.val('country_name', obj);

      var html = [];
      html.push("<span class='modal2-country-name'></span>");
      $(this).html(html.join(''));
      $('.modal2-country-name', this).textbox({
        class:"borderless",
        name:"country_name",
        src:"",
        value:country_name,
        width:"100%"
      })

    },

    modal2_country_gridcol2:function(obj){

      var price = $.val('price', obj);

      var html = [];
      html.push("<span class='modal2-country-price'></span>");
      $(this).html(html.join(''));
      $('.modal2-country-price', this).textbox({
        class:"borderless",
        src:"",
        value:price,
        width:"100%"
      })

    },

    grid_col0:function(obj){

      var html = [];
      html.push("<span class='fa fa-bars padding5 selectable'></span>");
      $(this).html(html.join(''));
      $('.fa-bars', this).click(function(){
        $('#modal2').modal_open({ width:"600px", height:"70%", value:{
            code:"BF123",
            title:"Sample Product",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia vehicula augue eu porttitor. Phasellus at hendrerit augue. Vivamus consectetur accumsan imperdiet.",
            imageurl:"https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z_400x400.jpg",
            categories:[
              { category_name:"Red Roses" },
              { category_name:"Best Seller" },
            ],
            countries:[
              { country_name:"Indonesia", price:"120" },
              { country_name:"Singapore", price:"12" },
            ]
          }
        });
      })

    }

  }

  $(mod.init);

</script>