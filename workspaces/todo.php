<h1>Todo</h1>
<div class="height50"></div>
<span id="todo_list"></span>

<script type="text/javascript">

  todo = {

    init:function(){

      $('#todo_list').feed({
        src:'/fa-ux/data/todo.php',
        template:'todo.feed_template'
      });

      todo.load();

    },

    load:function(){

      $('#todo_list').feed_load();

    },

    feed_template:function(obj){

      var html = [];
      html.push("<h2>" + obj.title + "</h2>");
      $(this).html(html.join(''));

    }

  }

  $(todo.init);

</script>