<?php

?>

<div class="content padding10 bg-white">

  <div>
    <label class="padding8">Simple Dropdown</label>
    <div></div>
    <span id="dropdown1"></span>
  </div>

  <div>
    <label class="padding8">Simple Dropdown with Default Value</label>
    <div></div>
    <span id="dropdown5"></span>
  </div>

  <div class="height20"></div>

  <div>
    <label class="padding8">Searchable Dropdown</label>
    <div></div>
    <span id="dropdown2"></span>
  </div>

  <div class="height20"></div>

  <div>
    <label class="padding8">Searchable Dropdown with Remote Source</label>
    <div></div>
    <span id="dropdown3"></span>
  </div>

  <div class="height20"></div>

  <div>
    <label class="padding8">Multiple Dropdown</label>
    <div></div>
    <span id="dropdown4"></span>
  </div>

</div>


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
    $('#dropdown3').dropdown({
      width:"300px",
      placeholder:"Select Value",
      searchable:true,
      src:"/fa-ux/data/sample_dropdown.php"
    });
    $('#dropdown4').dropdown({
      width:"300px",
      placeholder:"Multiple Dropdown",
      multiple:true,
      items:[
        { text:"Dropdown-1", value:"1" },
        { text:"Dropdown-2", value:"2" },
        { text:"Dropdown-3", value:"3" },
        { text:"Dropdown-4", value:"4" },
        { text:"Dropdown-5", value:"5" },
      ],
      src:"/fa-ux/data/sample_dropdown.php",
      map:{ text:"text", value:"value" }
    });
  })
</script>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<span id="dropdown1"></span>

<script>  
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
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="dropdown5"></span>

<script>
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
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="dropdown2"></span>

<script>
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
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="dropdown3"></span>

<script>
  $('#dropdown3').dropdown({
    width:"300px",
    placeholder:"Select Value",
    searchable:true,
    src:"/fa-ux/data/sample_dropdown.php"
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="dropdown4"></span>

<script>
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
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>

