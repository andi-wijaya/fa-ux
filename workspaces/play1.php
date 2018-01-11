<div class="content padding20">

  <h1>Hello Andy</h1>
  <p>Below is grid demo, please take a look:</p>

  <span id="grid1head"></span>
  <span id="grid1"></span>

  <script>

    var mod = {

      columns:[
        { name:"code", text:"Code", width:"100px" },
        { name:"customerdescription", text:"Customer", width:"200px" },
        { name:"address", text:"Address", width:"300px" },
        { name:"total", text:"Total", width:"100px" },
        { name:"total", text:"Total", width:"100px" },
      ],

      init:function(){

        $('#grid1head').gridhead({
          class:"style1",
          columns:mod.columns,
          grid:"#grid1"
        });

        $('#grid1').grid({
          class:"style1",
          columns:mod.columns,
          src:"../data/play1_datasource1.php"
        });

      }

    }

    $(mod.init);

  </script>

</div>
