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
  <div id="grid1option" class="padding10">

    <div class="align-center" style="background:#aaa">
      <ul data-type="tab" data-container="#tabcont1" data-default_index="0">
        <li>Presets</li>
        <li>Columns</li>
        <li>Filters</li>
      </ul>
    </div>

    <div class="height10" style="background:#bbb"></div>

    <div id="tabcont1" style="background:#aaa;height:270px;overflow-x:hidden;overflow-y:auto">
      <div>
        <span class="gridoptionpreset" style="background:red"></span>
      </div>

      <div>
        <table cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <span id="grid1optioncolumn"></span>
            </td>
            <td>
              <div class="padding10">
                <table class="form" cellspacing="5">
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
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div><h1>Filters</h1></div>
    </div>

    <div class="height10" style="background:#bbb"></div>

    <div class="align-right padding5" style="background:#aaa">
      <button>Save</button>
      <button>Close</button>
    </div>

  </div>
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

      var sample_presets = [
        { name:"Default" },
        { name:"Preset-1" },
        { name:"Preset-2" },
        { name:"Preset-3" },
      ];

      $('.gridoptionpreset').grid({
        class:"style1",
        columns:[
          { name:"name", text:"Preset Name", width:"300px" },
        ],
        moveable:true,
        onselect:function(){
          console.log(arguments);
        },
        value:sample_presets,
        width:"300px",
        height:"270px"
      });

      $('#grid1optioncolumn').grid({
        class:"style1",
        columns:[
          { name:"text", text:"Title", width:"300px" },
        ],
        moveable:true,
        onselect:function(){
          console.log(arguments);
        },
        value:mod.columns,
        width:"240px"
      });

      $('#loadme').click(function(){ $('#grid1').grid_load(); }); // Load me button click handler
      $('#getvalue').click(function(){ console.log($('#grid1').val()); }); // Get value button click handler

      $('#test1').click(function(){
        $('#modal1').modal_open({ width:"800px", height:"80%" });
      });

    }

  }

  $(mod.init);

</script>