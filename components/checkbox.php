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