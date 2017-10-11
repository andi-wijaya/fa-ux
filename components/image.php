<?php


function get_rearranged_file(){

  $arr = custom_array_flatten($_FILES);
  $temp = [];
  foreach($arr as $key=>$value){
    $keys = explode('.', $key);
    $sliced_keys = array_splice($keys, 1, 1);
    $temp[implode('.', array_merge($keys, $sliced_keys))] = $value;
  }
  $arr = $temp;
  $arr = custom_array_unflatten($arr);

  return $arr;

}

function post_merge_files(){

  $files = get_rearranged_file();
  $_POST = array_replace_recursive($_POST, $files);

}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

  post_merge_files();
  print_r($_POST);

  //retrieve_file_upload('college', __DIR__ . '/../upload');

  //exit();

}

?>

<div class="content padding20 bg-light">

  <span id="image1"></span>
  <div class="height10"></div>
  <button id="button1">Save Image</button>

</div>

<script>

  $(function(){

    $('#image1').image({
      height:"300px",
      width:"300px",
    });

    $('#button1').on('click', function(){

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
          { title:"item-2", code:"code2", image:$('input[type=file]')[0].files[0], image2:true },
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

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
<span id="image1"></span>

<script>
  $('#image1').image({
    height:"300px",
    width:"300px",
  });
</script>
EOT;
echo htmlentities($c);?>
  </pre>
</div>