<div class="content">
  <button id="modal1_btn">full size modal</button>
</div>
<div class="modal" id="modal1">
  <div class="modal-head padding10"><h1>Full Size Modal</h1></div>
  <div class="modal-body"></div>
  <div class="modal-foot padding10">
    <button data-action="modal.close"><span class="glyphicons glyphicons-remove"></span>Close</button>
  </div>
</div>


<script>

  $(function(){

    $('#modal1_btn').on('click', function(){ $('#modal1').modal_open(); });

  })

</script>