<?php


function fix_file_upload(){

  $_FILES = array_flatten($_FILES);
  $temp = [];
  foreach($_FILES as $key=>$value){
    $keys = explode('.', $key);
    $sliced_keys = array_splice($keys, 1, 1);
    $temp[implode('.', array_merge($keys, $sliced_keys))] = $value;
  }
  $_FILES = $temp;
  print_r($_FILES);

  $_FILES = array_unflatten($_FILES);
  print_r($_FILES);

}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

  fix_file_upload();

  //ob_end_clean();
  //print_r($_FILES);
  //print_r(array_merge($_POST, $_FILES));

  //retrieve_file_upload('college', __DIR__ . '/../upload');

  //exit();

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

      console.log($('input[type=file]')[0].files[0] instanceof File);

      var obj = {
        name:"andy",
        college:{
          name:"binus",
          address:"kemanggisan",
          image:{
            path:$('input[type=file]')[0].files[0]
          }
        },
        items:[
          { title:"item-1", code:"code1", image:$('input[type=file]')[0].files[0] },
          { title:"item-2", code:"code2", image:$('input[type=file]')[0].files[0] },
          { title:"item-3", code:"code3", image:$('input[type=file]')[0].files[0] }
        ]
      };

      var fd = $.flatten_obj(obj, 0, true);

//      fd.append("name", "andy");
//      fd.append("college[name]", "binus");
//      fd.append("items[][title]", "item-1");
//      fd.append("items[][code]", "code1");

      $.api_form_post('', fd, function(response){
        console.log(response);
      });

    })


  })

</script>