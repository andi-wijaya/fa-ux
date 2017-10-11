<div class="content padding20 bg-white">

  <label class="padding8">Simple Checkbox</label><br />
  <span id="checkbox1"></span>

  <div class="height10"></div>

  <label class="padding8">Simple Checkbox with Text</label><br />
  <span id="checkbox2"></span>

  <div class="height10"></div>

  <label class="padding8">Multiple Checkbox with Text</label><br />
  <span id="checkbox3"></span>

</div>

<script>

  $(function(){

    $('#checkbox1').checkbox({
      value:1
    });

    $('#checkbox2').checkbox({
      text:"Is Awesome",
      value:1
    });

    $('#checkbox3').checkbox({
      items:[
        { text:"Hello", value:"hello" },
        { text:"World", value:"world" },
      ],
      value:"hello"
    });

  });

</script>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<span id="checkbox1"></span>

<script>
  $('#checkbox1').checkbox({
      value:1
    });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="checkbox2"></span>

<script>
  $('#checkbox2').checkbox({
    text:"Is Awesome",
    value:1
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="checkbox3"></span>

<script>
  $('#checkbox3').checkbox({
    items:[
      { text:"Hello", value:"hello" },
      { text:"World", value:"world" },
    ],
    value:"hello"
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>