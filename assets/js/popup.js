$.extend({

  popup_close:function(el){

    $(el).removeClass('on');

  },
  popup_open:function(el, refEl, options){

    $.popup_close_all();

    $(el).addClass('off');

    var css = {};
    if(typeof refEl == 'undefined'){
      var width = $(el).outerWidth();
      var height = $(el).outerHeight();
      css['left'] = Math.round((window.innerWidth - width) / 2);
      css['top'] = Math.round((window.innerHeight - height) / 2);
    }
    else{

      var offset = $(refEl).offset();
      var max_width = offset.left + el.clientWidth;

      var top = offset.top - $(window).scrollTop() + $(refEl).outerHeight() + 1;
      var max_height = window.innerHeight - top - 10;

      css['top'] = top;
      css['max-height'] = max_height;

      if(max_width > window.innerWidth) offset.left = window.innerWidth - el.clientWidth;
      css['left'] = offset.left;

      var min_width = $.val('min_width', options);
      if(!isNaN(parseInt(min_width))) css['min-width'] = min_width;

    }
    $(el).css(css);

    $(el).removeClass('off');
    window.setTimeout(function(){
      $(el).addClass('on');
    }, 100);

    $(el).on('transitionend', function(){

      if($(this).hasClass('on')){

      }
      else{
        $(this).removeClass('on');
        $(this).addClass('off');
      }

    })

  },
  popup_toggle:function(el, refEl, options){

    if(el.classList.contains('on'))
      $.popup_close(el, refEl, options);
    else
      $.popup_open(el, refEl, options);

  },
  popup_close_all:function(){

    var popups = document.body.querySelectorAll('.popup');
    for(var i = 0 ; i < popups.length ; i++)
      $.popup_close(popups[i]);

  },
  
});