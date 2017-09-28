<?php

?>

<div class="content padding10 bg-white">

  <div>
    <label class="padding8">Simple Dropdown</label>
    <div></div>
    <span id="dropdown1"></span>
    <script id="script1">
      $(function(){
        $('#dropdown1').dropdown({
          width:"200px",
          items:[
            { text:"Dropdown-1", value:"1" },
            { text:"Dropdown-2", value:"2" },
            { text:"Dropdown-3", value:"3" },
            { text:"Dropdown-4", value:"4" },
            { text:"Dropdown-5", value:"5" },
          ],
          placeholder:"Select Value"
        });
      })
    </script>
  </div>

  <div>
    <label class="padding8">Simple Dropdown with Default Value</label>
    <div></div>
    <span id="dropdown5"></span>
    <script id="script1">
      $(function(){
        $('#dropdown5').dropdown({
          width:"200px",
          items:[
            { text:"Dropdown-1", value:"1" },
            { text:"Dropdown-2", value:"2" },
            { text:"Dropdown-3", value:"3" },
            { text:"Dropdown-4", value:"4" },
            { text:"Dropdown-5", value:"5" },
          ],
          value:"5"
        });
      })
    </script>
  </div>

  <div class="height20"></div>

  <div>
    <label class="padding8">Searchable Dropdown</label>
    <div></div>
    <span id="dropdown2"></span>
    <script id="script2">
      $(function(){
        $('#dropdown2').dropdown({
          width:"75px",
          items:[
            { text:"Dropdown-1", value:"1" },
            { text:"Dropdown-2", value:"2" },
            { text:"Dropdown-3", value:"3" },
            { text:"Dropdown-4", value:"4" },
            { text:"Dropdown-5", value:"5" },
          ],
          placeholder:"Select Value",
          searchable:true
        });
      })
    </script>
  </div>

  <div class="height20"></div>

  <div>
    <label class="padding8">Searchable Dropdown with Remote Source</label>
    <div></div>
    <span id="dropdown3"></span>
    <script id="script3">
      $(function(){
        $('#dropdown3').dropdown({
          width:"300px",
          placeholder:"Select Value",
          searchable:true,
          src:"/fa-ux/data/sample_dropdown.php"
        });
      })
    </script>
  </div>

  <div class="height20"></div>

  <div>
    <label class="padding8">Multiple Dropdown</label>
    <div></div>
    <span id="dropdown4"></span>
    <script id="script4">
      $(function(){
        $('#dropdown4').dropdown({
          width:"600px",
          placeholder:"Multiple Dropdown",
          multiple:true,
          items:[
            { text:"Dropdown-1", value:"1" },
            { text:"Dropdown-2", value:"2" },
            { text:"Dropdown-3", value:"3" },
            { text:"Dropdown-4", value:"4" },
            { text:"Dropdown-5", value:"5" },
          ],
        });
      })
    </script>
  </div>

</div>

