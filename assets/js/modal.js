$.fn.extend({

  modal_open:function(options){

    this.each(function(){

      var instance = this;
      $(instance).removeClass('off');

      $(document.body).css({ overflow:'hidden' });

      $(instance).css({
        height:$.val('height', options, { d:window.innerHeight }) ,
        width:$.val('width', options, { d:'100%' }) ,
      });

      var modal_body_height = $(instance).outerHeight() - 5 - ($('.modal-head', instance).outerHeight() + $('.modal-foot', instance).outerHeight());
      if(!isNaN(modal_body_height)) $('.modal-body', instance).css({ 'height':modal_body_height });

      var left = (window.innerWidth - instance.clientWidth) / 2;
      var top = (window.innerHeight - instance.clientHeight) / 2;
      $(instance).css({ left:left, top:top });

      $('.modal-bg').addClass('on');

      var reset = $.val('reset', options, { d:false });
      if(reset === true || reset === 1)
        $(instance).reset();

      var value = $.val('value', options, { d:null });
      if(value != null){
        $(instance).val(value);
      }

      window.setTimeout(function(){
        $(instance).addClass('on');
      }, 100);
      $(instance).on('transitionend', function(){
        if($(this).hasClass('on')){}
        else{
          $(this).removeClass('on');
          $(this).addClass('off');
        }
      })

    })

  },

  modal_close:function(){

    $(this).each(function(){
      $(this).removeClass('on');
    });

    if($('.modal.on').length == 0){
      $('.modal-bg').removeClass('on');
      $(document.body).css({ overflow:'' });
    }

  }

});

$(function(){ $('.modall').addClass('off'); });