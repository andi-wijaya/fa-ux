$.fn.extend({

  tab:function(options){

    var container = $.val('container', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var onchange = $.val('onchange', options);
    var default_index = $.val('default_index', options, { d:0 });

    this.each(function(){

      var instance = this;

      $(instance).attr('data-type', 'tab');
      $(instance).attr('data-name', name);
      $(instance).data('options', options);

      // Assign default index
      var index = 0;
      $('li', instance).each(function(){

        if(index == default_index){
          this.classList.add('active');
        }
        else
          this.classList.remove('active');

        index++;
      });

      // Tab item click handler
      $('li', instance).click(function(){
        if(this.classList.contains('active'));
        else{
          $('li', this.parentNode).removeClass('active');
          $(this).addClass('active');
          var text = this.innerHTML;
          var value = this.getAttribute("data-value");
          if(value == null) value = $.slug(text);

          var index = $(this).index();
          if($(container).length > 0){
            $(container + ">*").addClass('off');
            $(container + ">*:eq(" + index + ")").removeClass('off');
          }

          $.fire_event(onchange, [ { text:text, value:value } ], instance);
        }
      });

    });

  },

  tab_set:function(value){

    var el = this;
    var options = $(el).data('options');
    var onchange = $.val('onchange', options);

    $('li', this).removeClass('active');
    $('li', this).each(function(){

      var li_text = this.innerHTML;
      var li_value = this.getAttribute("data-value");
      if(li_value == null) li_value = $.slug(li_text);
      if(li_value == value){
        $(this).addClass('active');
        $.fire_event(onchange, [
          {
            text:li_text,
            value:li_value
          }
        ], el);
      }

    });

  }

});