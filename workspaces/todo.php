<div class="content">

  <table>
    <tr>
      <td><h1>Todo</h1></td>
      <td><span class="todo-addbtn glyphicons glyphicons-plus selectable padding10"></span></td>
    </tr>
  </table>
  <div class="height20"></div>
  <span id="todo_list"></span>

  <div class="modal width-full">
    <div class="wrapper width600">
      <h1>New Todo</h1>
      <div class="height30"></div>
      <span id="title"></span>
      <div class="height10"></div>
      <span id="description"></span>
      <div class="height10"></div>
      <span id="start_date"></span>
    </div>
  </div>

  <script type="text/javascript">

    todo = {

      init:function(){

        $('#todo_list').feed({
          src:'/fa-ux/data/todo.php',
          template:'todo.feed_template'
        });

        $('#title').textbox({ placeholder:"Title", width:"100%" });
        $('#description').textarea({ placeholder:"Description", width:"100%" });
        $('#start_date').datepicker({ name:"" });

        $('.todo-addbtn').on('click', function(){ todo.new(); });
        $('#todo_savebtn').on('click', function(){ });

        todo.load();

      },

      load:function(){

        $('#todo_list').feed_load();

      },

      new:function(){

        $('.modal').modal_open();

      },

      feed_template:function(obj){

        var html = [];
        html.push("<h2>" + obj.title + "</h2>");
        $(this).html(html.join(''));

      }

    }

    $(todo.init);

  </script>

</div>