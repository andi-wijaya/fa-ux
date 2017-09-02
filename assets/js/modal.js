$.fn.extend({

  modal_open:function(options){

    this.each(function(){

      var instance = this;
      $(instance).addClass('on');

      var width = parseInt($.val('width', options, { d:null }));
      var height = parseInt($.val('height', options, { d:Math.round(window.innerHeight * .78) }));
      var modal_body_height = height - ($('.modal-head', instance).outerHeight() + $('.modal-foot', instance).outerHeight());

      if(!isNaN(width)) $('.modal-body', instance).css({ 'width':width });
      if(!isNaN(modal_body_height)) $('.modal-body', instance).css({ 'height':modal_body_height });

      var left = (window.innerWidth - instance.clientWidth) / 2;
      var top = (window.innerHeight - instance.clientHeight) / 2;
      $(instance).css({ left:left, top:top });

      if($('.modal-bg').length == 0)
        $(document.body).append("<div class='modal-bg'></div>");
      $('.modal-bg').addClass('on');

      var value = $.val('value', options, { d:null });
      if(value != null) $(instance).val(options['value']);

    })

  },

  modal_close:function(exp, options){

    this.each(function(){

      var instance = this;
      $(instance).removeClass('on');
      $('.modal-bg').removeClass('on');

    });

  }

})