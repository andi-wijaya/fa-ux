$.fn.extend({

  tab:function(options){

    var onchange = $.val('onchange', options);

    this.each(function(){

      var el = this;

      // Tab item click handler
      $('li', this).click(function(){

        if(this.classList.contains('active'));
        else{

          $('li', this.parentNode).removeClass('active');
          $(this).addClass('active');

          var text = this.innerHTML;
          var value = this.getAttribute("data-value");
          if(value == null) value = $.slug(text);

          $.invoke_callback(onchange, [
            {
              text:text,
              value:value
            }
          ], el);

        }


      });

      $(el).data('options', options);

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
        $.invoke_callback(onchange, [
          {
            text:li_text,
            value:li_value
          }
        ], el);
      }

    });

  }

});

$.extend({

  tab_init:function(cont){

    cont = typeof cont == 'undefined' || !(cont instanceof HTMLElement) ? document.body : cont;
    $('.tab', cont).each(function(){

      var options = $.options_from_html(this);
      $(this).tab(options);

    });

  }

})