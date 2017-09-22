<div class="content padding20">

  <strong>Simple Radio with 1 Item</strong>
  <div class="height10"></div>
  <span id="radio1"></span>

  <div class="height20"></div>

  <strong>Radio with Multiple Items</strong>
  <div class="height10"></div>
  <span id="radio2"></span>

</div>

<script>

  $(function(){

    $('#radio1').radio({
      name:'gender_is_male',
      text:"Male",
      value:1
    })

    $('#radio2').radio({
      name:'gender',
      items:[
        { text:"Male", value:"m" },
        { text:"Female", value:"f" }
      ],
      value:"f"
    })

  })

</script>