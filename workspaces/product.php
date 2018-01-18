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
  <div id="grid1option"></div>
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

      $('#grid1option').gridoption({});

      $('#loadme').click(function(){ $('#grid1').grid_load(); }); // Load me button click handler
      $('#getvalue').click(function(){ console.log($('#grid1').val()); }); // Get value button click handler

      $('#test1').click(function(){
        $('#modal1').modal_open({ width:"800px", height:"80%" });
        $('#grid1option').gridoption_set({
          columns:[
            { name:"code", text:"Code", width:"100px" },
            { name:"title", text:"Title", width:"300px" },
          ]
        })
      });

    }

  }

  $(mod.init);

</script>