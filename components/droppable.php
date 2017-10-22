<div class="content padding20">

  <span id="textarea1"></span>

  <div class="height10"></div>

  <span id="gridhead1"></span>
  <span id="grid1"></span>

  <script>

    $(function(){

      $('#textarea1').textarea({
        width:"600px",
        height:"100px",
        placeholder:"Textarea",
        droppable:true,
        accept:"text/plain,application/csv",
        'max-height':"100px"
      });

      var columns = [
        { name:"code", text:"Code", width:"100px" },
        { name:"name", text:"Product Name", width:"200px" },
        { name:"qty", text:"Quantity", width:"200px" },
      ];

      $('#gridhead1').gridhead({
        columns:columns,
        droppable:true,
        grid:"#grid1"
      });

      $('#grid1').grid({
        columns:columns,
        droppable:true
      });

    })

  </script>

</div>