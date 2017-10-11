$.fn.extend({

  button_state:function(state, use_spinner){

    var use_spinner = typeof use_spinner == 'undefined' && (use_spinner != true || parseInt(use_spinner) != 1) ? false : true;

    if(typeof state == 'undefined'){

      return $(this).attr('disabled') ? 2 : 1;

    }

    else{

      $(this).each(function(){

        switch(parseInt(state)){

          case 1:
            var html = $(this).data('html');
            if(html != null) $(this).html(html);
            $(this).attr('disabled', false);
            break;

          case 2:
            $(this).css({ width:$(this).outerWidth(), height:$(this).outerHeight() });
            if(use_spinner) $(this).data('html', $(this).html()).html("<span class=\"spinner loading width16 height16\"></span>");
            $(this).attr('disabled', true);
            break;

        }

      })

    }


  }

});