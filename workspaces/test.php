<?php


    echo json_encode($_GET, JSON_PRETTY_PRINT);
    echo "\n\n";

    echo json_encode($_POST, JSON_PRETTY_PRINT);
    echo "\n\n";

    $post = json_decode(file_get_contents('php://input'), true);
    echo json_encode($post, JSON_PRETTY_PRINT);

?>

<script>

  $(function(){

    var obj = { id:123, name:{ type:"name1" }, items:[{ name:"item1" }, { name:"item2" } ]};

    $.api_get('', { id:123 });

    //$.api_post('', obj);

    //$.api_form_post('', $.flatten_obj(obj, 0, true));


  })

</script>
