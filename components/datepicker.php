<div class="content bg-white padding20">

  <span id="datepicker1"></span>

  <div class="height20"></div>

  <span id="datepicker2"></span>

</div>

<script type="text/javascript">

  $(function(){

    $('#datepicker1').datepicker({
      onchange:function(value){
        console.log([ 'changed', value ]);
      }
    });

    $('#datepicker2').datepicker({
      mode:'range',
      onchange:function(value){
        console.log([ 'changed', value ]);
      }
    });

  })

</script>