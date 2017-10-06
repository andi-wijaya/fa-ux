<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){

  print_r(array_keys($_FILES));

  retrieve_file_upload('uploadfile', __DIR__ . '/../upload');

  exit();

}

?>

<div class="content padding20 bg-light">

  <span id="image1"></span>
  <button id="button1">BUtton</button>

</div>

<script>

  $(function(){

    $('#image1').image({
      height:"300px",
      width:"300px",
    });

    $('#button1').on('click', function(){

      var formData = new FormData();
      console.log(formData);
      var token = '-token-';
      formData.append('uploadfile', $('#image1').val());
      console.log(formData);

      $.ajax({
        url:'',
        type:"POST",
        cache:false,
        contentType:false,
        processData: false,
        data:formData
      })

    })


  })

</script>