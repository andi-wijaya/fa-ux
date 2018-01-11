<div class="content padding20">

  <h1>Hello Product</h1>
  <p>Below is grid demo, please take a look:</p>
  <button id="loadme">Load Me</button>
  <button id="getvalue">Get Value In Console</button>

  <div class="height10"></div>

  <span id="grid1head"></span>
  <span id="grid1"></span>

  <script>

    var mod = {

      columns:[
        { name:"code", text:"Code", width:"100px" },
        { name:"title", text:"Title", width:"200px" },
        { name:"description", text:"Description", width:"300px" },
        { name:"createdon", text:"Created ON", width:"100px" },
      ],

      init:function(){

        $('#grid1head').gridhead({
          class:"style1",
          columns:mod.columns,
          grid:"#grid1",
          width:600
        });

        // Initialize grid1 with given attributes
        $('#grid1').grid({
          autoload:true,
          class:"style1",
          columns:mod.columns,
          method:"get",
          src:"../data/play1_datasource1.php",
          row_per_page:4,
          scroll_cont:'window',
          moveable:true,
          onselect:function(){
            console.log(arguments);
          },
          width:600
        });

        $('#loadme').click(function(){ $('#grid1').grid_load(); }); // Load me button click handler
        $('#getvalue').click(function(){ console.log($('#grid1').val()); }); // Get value button click handler

      }

    }

    $(mod.init);

  </script>

</div>
