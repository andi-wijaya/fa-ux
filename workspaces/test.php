<div class="content padding20">

  <div class="width300">
    <div id="grid1"></div>
  </div>

  <script>

    $(function(){

      $('#grid1').grid({
        columns:[
          { text:"N.A.M.E", name:"name", width:"100px" },
        ],
        moveable:true,
        value:[
          { name:"Hello" },
          { name:"World" },
          { name:"Andy" },
          { name:"Are" },
          { name:"You" },
          { name:"OK" },
          { name:"?" },
        ]
      })

    })

  </script>

</div>