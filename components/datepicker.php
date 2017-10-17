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
      },
      value:''
    });

    $('#datepicker2').datepicker({
      mode:'range',
      onchange:function(value){
        console.log([ 'changed', value ]);
      },
      value:""
    });

  })

</script>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<span id="datepicker1"></span>
<script>
  $('#datepicker1').datepicker({
    onchange:function(value){
      console.log([ 'changed', value ]);
    }
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div style="border-bottom: solid 1px rgba(255, 255, 255, .2);height:1px;margin:30px 0"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="datepicker2"></span>
<script>
  $('#datepicker2').datepicker({
    mode:'range',
    onchange:function(value){
      console.log([ 'changed', value ]);
    }
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>