<div class="content padding20">
  <div>
    <button>Customize Views...</button>
    <button id="test1">Open Modal</button>
  </div>
  <div class="height10"></div>
  <span id="grid1head"></span>
  <span id="grid1"></span>
</div>

<div class="modal" id="modal1">
  <span id="grid1option" class="padding10">

    <ul data-type="tab" data-container="#tabcont1" data-default_index="1">
      <li>Properties</li>
      <li>Columns</li>
      <li>Filters</li>
    </ul>

    <div class="height10"></div>

    <div id="tabcont1">
      <div><h1>Tab 1</h1></div>

      <div>
        <table>
          <tr>
            <td width="30%" valign="top"><span id="grid1optioncolumn"></span></td>
            <td width="10px"></td>
            <td width="70%" valign="top">
              <table class="form">
                <tr>
                  <th><label class="padding5 width100">Name</label></th>
                  <td><span data-type="textbox"></span></td>
                </tr>
                <tr>
                  <th><label class="padding5">Text</label></th>
                  <td><span data-type="textbox"></span></td>
                </tr>
                <tr>
                  <th><label class="padding5">Width</label></th>
                  <td><span data-type="textbox"></span></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <div><h1>Tab 3</h1></div>
    </div>

    <div class="height10"></div>

    <div class="align-right">
      <button>Save</button>
      <button>Close</button>
    </div>

  </span>
</div>

<script>

  var mod = {

    columns:[
      { name:"code", text:"Code", width:"100px" },
      { name:"title", text:"Title", width:"200px" },
      { name:"description", text:"Description", width:"300px" },
      { name:"createdon", text:"Created ON", width:"140px" },
    ],

    init:function(){

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
        moveable:true,
        onselect:function(){
          console.log(arguments);
        },
      });

      $('#grid1option').gridoption({

      });

      $('#grid1optioncolumn').grid({
        columns:[
          { name:"text", text:"Title", width:"300px" },
        ],
        moveable:true,
        onselect:function(){
          console.log(arguments);
        },
        value:mod.columns
      })

      $('#loadme').click(function(){ $('#grid1').grid_load(); }); // Load me button click handler
      $('#getvalue').click(function(){ console.log($('#grid1').val()); }); // Get value button click handler

      $('#test1').click(function(){
        $('#modal1').modal_open({ width:"800px", height:"80%" });
      });

    }

  }

  $(mod.init);

</script>