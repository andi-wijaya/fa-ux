<table>
  <tr>
    <td><h1>Todo</h1></td>
    <td><span class="todo-addbtn glyphicons glyphicons-plus selectable padding10"></span></td>
  </tr>
</table>
<div class="height20"></div>
<span id="todo_list"></span>

<div class="modal width480">
  <div class="modal-head"></div>
  <div class="modal-body padding10">
    <span id="title"></span>
    <div class="height10"></div>
    <span id="description"></span>
    <div class="height10"></div>
    <span id="start_date"></span>
  </div>
  <div class="modal-foot align-right padding10">
    <button id="todo_savebtn" class="blue"><span class="glyphicons glyphicons-save"></span>Save</button>
    <button data-action="modal.close"><span class="glyphicons glyphicons-remove"></span>Close</button>
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