<div class="modal align-center">
  <h1>Login</h1>
  <div class="height20"></div>
  <span id="textbox1"></span>
  <div class="height10"></div>
  <span id="textbox2"></span>
  <div class="height20"></div>
  <button class="blue width100">Login</button>
</div>

<div class="modal-bg"></div>

<script>

  $(function(){

    $('#textbox1').textbox({ });
    $('#textbox2').textbox({ mode:"password" });
    $('.modal').modal_open({
      width:"300px",
      height:"230px"
    });

  })

</script>