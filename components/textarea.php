<div class="content padding20">
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
    <div class="height10"></div>
    <span id="textarea6"></span>
  </span>
</div>
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

    $('#textarea6').textarea({
      placeholder:"textarea with Very Long Text Preset",
      width:"360px",
      value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum ultricies quam, vitae dapibus ipsum mollis et. Vestibulum fringilla non enim ullamcorper tempor. Vivamus at nisl metus. Nulla facilisi. Donec ipsum neque, dignissim in libero et, venenatis rhoncus felis. Suspendisse non augue dictum, consequat massa nec, laoreet lacus. Mauris interdum nunc leo, sed vulputate magna finibus vel. Ut lectus elit, euismod sit amet mollis quis, ultricies tristique diam. Morbi vehicula augue vitae neque luctus semper. Vivamus quis porta ante. Vestibulum eleifend hendrerit massa, vitae congue orci. Curabitur dictum turpis purus, eget tempor enim sollicitudin at."
    });

  })
</script>