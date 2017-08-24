$.fn.extend({

  appear:function(callback){

    this.each(function(){

      $(this).addClass('appear');
      $(this).data('onappear', callback);

    })

    $(window).on('scroll.appear', function(){

      $('.appear').each(function(){

        var appeared = $(this).data('appeared') == 1 ? true : false;
        var top = $(this).position().top;
        var height = $(this).outerHeight();
        var viewport_bottom = $(window).scrollTop() + window.innerHeight;
        if(!appeared && viewport_bottom > top + height){

          $(this).data('appeared', 1);
          $.fire_event($(this).data('onappear'), [], this);

        }
        else if(appeared && viewport_bottom < top){

          $(this).data('appeared', 0);
          $.fire_event($(this).data('ondisappear'), [], this);

        }


      });


    })

  }


})