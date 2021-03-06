$.fn.extend({

  droppable:function(options){

    $(this).each(function(){

      var accept = $.val('accept', options, { d:undefined });
      if(accept == undefined) accept = 'text/plain';
      var accepts = accept.split_and_trim(',');

      $(this).addClass('droppable');
      $(this).on('dragover', function(e){
        e.preventDefault();
        $(this).addClass('drag-over');
      });
      $(this).on('dragleave', function(e){
        e.preventDefault();
        $(this).removeClass('drag-over');
      });
      $(this).on('drop', function(e){
        e.preventDefault();

        var instance = this;

        var files = e.originalEvent.dataTransfer.files || e.originalEvent.target.files;
        var values = [];

        if(files.length > 0){

          for(var i = 0 ; i < files.length ; i++){

            var file = files[i];
            var file_type = file.type;

            if($.in_array(file_type, accepts)){

              var reader = new FileReader();
              reader.onload = function(event) {
                var text = event.target.result;
                $.fire_event($.val('ondrop', options), [ e, text ], instance);
              };
              if(file_type.indexOf('image/') >= 0)
                reader.readAsDataURL(file);
              else
                reader.readAsText(file);
              values.push(file);

            }

          }

        }

        $(instance).data('value', values);
        $(this).removeClass('drag-over');

      });

    })

  },

  droppable_val:function(value){

    if(typeof value == 'undefined'){

      if($(this).hasClass('.droppable')) return $(this).data('value');
      else return false;

    }

    else{

    }

  }

});