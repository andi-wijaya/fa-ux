$.extend({

  layout_resize:function(){

    $('.layout-sidebar, .layout-main, .layout-ext', $('.layout')).css({
      height:window.innerHeight - $('.header').outerHeight()
    })

  }

})

$.fn.extend({

  layout:function(options){

    var className = $.val('class', options, { d:'' });
    var size = $.val('size', options, { d:{} });
    var size_large = $.val('large', size, { d:'300px auto 400px' });
    var sizes_large = size_large.split(' ');

    $(this).each(function(){

      var sidebar_width = $.val(0, sizes_large, { d:'200px' });
      var main_width = '100%';
      var ext_width = $.val(2, sizes_large, { d:'300px' });
      //ext_width = $.calc_size(ext_width);

      $(this).addClass('layout');
      $(this).addClass(className);
      $('.layout-sidebar', this).css({ flex:"0 0 " + sidebar_width });
      $('.layout-main', this).css({ flex:"1 1 " + main_width });
      $('.layout-ext', this).css({ flex:"0 0 " + ext_width });

      $('.layout-sidebar, .layout-main, .layout-ext', this).css({
        height:window.innerHeight - $('.header').outerHeight()
      })

    })

    $(window).on('resize.layout', function(){
      $.layout_resize();
    });

  }

});