<div class="content padding20">

  <button id="button1" class="blue width100">Alert</button>

</div>

<script>

  $(function(){

    $('#button1').click(function(){

      $.alert('An error occured while trying to save invoice. Please try again.');

    })

  })

</script>