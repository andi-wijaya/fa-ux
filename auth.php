<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <?php $files = glob('assets/css/*.css'); foreach($files as $file){ ?>
  <link rel="stylesheet" href="<?=$file?>" />
  <?php } ?>
  <script type="text/javascript" src="assets/jquery-2.2.3.min.js"></script>
  <?php $files = glob('assets/js/*.js'); foreach($files as $file){ ?>
  <script type="text/javascript" src="<?=$file?>"></script>
  <?php } ?>
  <link rel="stylesheet" href="assets/auth.css" />
</head>
<body>

  <div class="align-center flex flex-valign-center flex-align-center" style="height:100%;">
    <div class="flex-col flex-col-stretch">
      <span class="padding20 bg-white width400">
      <h1>Key Required</h1>
      <div class="height20"></div>
      <span class="email-textbox"></span>
      <div class="height20"></div>
      <span class="glyphicons glyphicons-ok-circle h1 cl-lightgray"></span>
    </span>
    </div>
  </div>
  <script type="text/javascript">

    $(function(){
      $('.email-textbox').textbox({
        class:"style-underline align-center h3",
        placeholder:"Enter the key here...",
        onchange:"try_to_auth"
      });
    })

    function try_to_auth(email){

      $.api_get("data/auth.php", { email:email }, function(){
        $('.glyphicons-ok-circle').removeClass('cl-lightgray');
        $('.glyphicons-ok-circle').addClass('cl-green');
        window.setTimeout(function(){
          location.reload();
        }, 1000);
      }, function(){
        $('.glyphicons-ok-circle').removeClass('cl-green');
        $('.glyphicons-ok-circle').addClass('cl-lightgray');
      });

    }

  </script>

</body>
</html>