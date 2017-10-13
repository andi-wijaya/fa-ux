<div class="content padding20">

  <div class="width300">
    <div id="grid1"></div>
  </div>

  <script>

    $(function(){

      $('#grid1').grid({
        columns:[
          { text:"N.A.M.E", name:"name", width:"100px" },
          { text:"", name:"", width:"50px", type:"html", html:"qwe" },
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

    function qwe(){

      $(this).html("<span class='textbox1'></span>");
      $('.textbox1', this).textbox({ placeholder:"Textbox1", width:"50px" });

    }

  </script>

</div>