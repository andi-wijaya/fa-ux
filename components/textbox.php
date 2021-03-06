<div class="content padding20 bg-white">

  <!-- BEGIN Samples -->
  <h5>Samples:</h5>
  <br /><br />
  <span class="padding10">
    <span id="textbox1"></span>
    <div class="height10"></div>
    <span id="textbox2"></span>
    <div class="height10"></div>
    <span id="textbox3"></span>
    <div class="height10"></div>
    <span id="textbox4"></span>
    <div class="height10"></div>
    <span id="textbox5"></span>
  </span>
  <script id="script1" type="text/javascript">
    $(function(){

      $('#textbox1').textbox({
        placeholder:"Simple Textbox",
      });

      $('#textbox2').textbox({
        class:"underlined",
        placeholder:"Textbox (required)",
        required:true
      });

      $('#textbox3').textbox({
        placeholder:"Textbox with Regex Validation",
        validation:/^\d+$/,
        validation_text:"Invalid value, number required."
      });

      $('#textbox4').textbox({
        placeholder:"Textbox with Onchange Handler",
        onchange:function(value){
          console.warn(value);
        },
        width:"360px"
      });

      $('#textbox5').textbox({
        placeholder:"Textbox with Maximum 3 Letters",
        maxlength:3,
        width:"360px"
      });

    })
  </script>
  <!-- END Samples -->

</div>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<span id="textbox1"></span>

<script>  
  $('#textbox1').textbox({
    placeholder:"Simple Textbox",
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div class="height10"></div><hr /><div class="height10"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="textbox2"></span>

<script>  
  $('#textbox2').textbox({
    placeholder:"Textbox (required)",
    required:true
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div class="height10"></div><hr /><div class="height10"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="textbox3"></span>

<script>  
  $('#textbox3').textbox({
    placeholder:"Textbox with Regex Validation",
    validation:/^\d+$/,
    validation_text:"Invalid value, number required."
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div class="height10"></div><hr /><div class="height10"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="textbox4"></span>

<script>  
  $('#textbox4').textbox({
    placeholder:"Textbox with Onchange Handler",
    onchange:function(value){
      console.warn(value);
    },
    width:"360px"
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
  <div class="height10"></div><hr /><div class="height10"></div>
  <pre>
<?php $c =
  <<< EOT
<span id="textbox5"></span>

<script>  
  $('#textbox5').textbox({
    placeholder:"Textbox with Maximum 3 Letters",
    maxlength:3,
    width:"360px"
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>