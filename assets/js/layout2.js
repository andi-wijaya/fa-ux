$.extend({

  layout2_resize:function(){

    $('.layout2').layout2_resize();

  }

})

$.fn.extend({

  layout2:function(options){

    var className = $.val('class', options, { d:'' });
    var size = $.val('size', options, { d:'300px auto 400px' });
    var sizes = size.split(' ');

    $(this).each(function(){

      $(this).addClass('layout2');
      $(this).addClass(className);
      $(this).data('options', options);
      $(this).layout2_resize();

    })

    $(window).on('resize.layout', function(){
      $.layout2_resize();
    });

  },

  layout2_resize:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var onresize = $.val('onresize', options);
      var ext_hidden = $.val('ext_hidden', options);
      var size = $.val('size', options, { d:'300px auto 400px' });
      var sizes = size.split(' ');

      var layout_height = window.innerHeight - $('.header').outerHeight();
      var sidebar_width = $.val(0, sizes, { d:'200px' });
      var main_height = $.val(2, sizes, { d:'300px' });
      var layout_height = window.innerHeight - $('.header').outerHeight();
      main_height = $.calc_size(main_height, layout_height);
      var ext_height = layout_height - main_height;

      $('.layout-sidebar', this).css({ flex:"0 0 " + sidebar_width, height:layout_height });
      $('.layout-content', this).css({ flex:"1 1 auto" });

      if(ext_hidden == 0){

        $(this).removeClass('ext-hidden');
        $('.layout-main', this).css({ height:main_height });
        $('.layout-ext', this).css({ height:ext_height });

      }
      else{

        $(this).addClass('ext-hidden');
        $('.layout-main', this).css({ height:layout_height });
        $('.layout-ext', this).css({ height:0 });

      }

      $.fire_event(onresize, [],  this);

    });

  },

  layout2_toggleext:function(state){

    /*
     * state: true|false, true = open, false = closed
     */

    $(this).each(function(){

      if(!$(this).hasClass('layout2')) return;

      var options = $(this).data('options');
      options['ext_hidden'] = state ? 0 : 1;
      $(this).data('options', options);
      $(this).layout2_resize();

    })

  },

  layout2_ext_state:function(){

    var state = 0;
    $(this).each(function(){

      var options = $(this).data('options');
      state = $.val('ext_hidden', options, { d:-1 }) > 0 ? 0 : 1;

    });
    return state;

  }

});