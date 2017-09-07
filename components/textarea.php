<h5>Samples:</h5>
<br /><br />
<span class="padding10">
  <span id="textarea1"></span>
  <div class="height10"></div>
  <span id="textarea2"></span>
  <div class="height10"></div>
  <span id="textarea3"></span>
  <div class="height10"></div>
  <span id="textarea4"></span>
  <div class="height10"></div>
  <span id="textarea5"></span>
</span>
<script id="script1" type="text/javascript">
  $(function(){

    $('#textarea1').textarea({
      placeholder:"Simple textarea",
      width:"80px"
    });

    $('#textarea2').textarea({
      placeholder:"textarea (required)",
      required:true
    });

    $('#textarea3').textarea({
      placeholder:"textarea with Regex Validation",
      validation:/^\d+$/,
      validation_text:"Invalid value, number required."
    });

    $('#textarea4').textarea({
      placeholder:"textarea with Onchange Handler",
      onchange:function(value){
        console.warn(value);
      },
      width:"360px"
    });

    $('#textarea5').textarea({
      placeholder:"textarea with Maximum 3 Letters",
      maxlength:3,
      width:"360px"
    });

  })
</script>