$.extend({

  workspace_init:function(){

    $('.workspace').each(function(){

      var height = window.innerHeight - $('.header').outerHeight() - 20;
      $(this).workspace_set({
        state:$(this).attr('data-state'),
        size:$(this).attr('data-size'),
        height:height
      });

      $.workspace_rtime;
      $.workspace_timeout = false;
      $.workspace_delta = 200;
      $(window).resize(function() {
        $.workspace_rtime = new Date();
        if ($.workspace_timeout === false) {
          $.workspace_timeout = true;
          setTimeout($.workspace_resizeend, $.workspace_delta);
        }
      });

    });

  },

  workspace_resizeend:function(){

    if (new Date() - $.workspace_rtime < $.workspace_delta) {
      setTimeout($.workspace_resizeend, $.workspace_delta);
    } else {
      $.workspace_timeout = false;

      $('.workspace').each(function(){

        var height = window.innerHeight - $('.header').outerHeight() - 20;
        $($(this).children()[0]).css({ height:height });
        $($(this).children()[1]).css({ height:height });
        $($(this).children()[2]).css({ height:height });

      });
    }

  }

});

$.fn.extend({

  workspace_set:function(params){

    if(typeof params == 'undefined' || $.type(params) != 'object') return;

    $(this).each(function(){

      params = $.ksort(params);

      var css1 = {};
      var css2 = { flex:'1 1 auto' };
      var css3 = {};
      for(var key in params){

        switch(key){

          case 'size':
            var size = params[key];
            size = size.split(' ');
            var left_size = $.val(0, size, { d:300, t:'number' });
            var right_size = $.val(1, size, { d:400, t:'number' });
            css1['flex'] = '0 0 ' + (left_size + 'px');
            css3['flex'] = '0 0 ' + (right_size + 'px');
            $(this).data('left_size', left_size);
            $(this).data('right_size', right_size);
            break;

          case 'height':
            css1['height'] = params[key];
            css2['height'] = params[key];
            css3['height'] = params[key];
            break;

          case 'state':
            var state = $.val('state', params, { d:'' });
            state = state.split(' ');
            var state_left = $.val(0, state, { d:1, t:'number' });
            var state_right = $.val(2, state, { d:0, t:'number' });
            var left_size = state_left < 1 ? '0' : $(this).data('left_size');
            var right_size = state_right < 1 ? '0' : $(this).data('right_size');
            css1['flex'] = '0 0 ' + (left_size + 'px');
            css3['flex'] = '0 0 ' + (right_size + 'px');
            break;

        }

      }

      if($(this).children().length == 3){

        $($(this).children()[0]).css(css1);
        $($(this).children()[1]).css(css2);
        $($(this).children()[2]).css(css3);

      }

    });

  }

});