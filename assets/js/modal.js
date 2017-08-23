$.fn.extend({

  modal_open:function(options){

    this.each(function(){

      var el = this;
      $(el).addClass('on');

      var width = parseInt($.val('width', options, { d:null }));
      var height = parseInt($.val('height', options, { d:null }));
      var modal_body_height = height - ($('.modal-head', el).outerHeight() + $('.modal-foot', el).outerHeight());

      var modal_height = $(el).outerHeight();
      if(modal_height > window.innerHeight)
        $('.modal-body', el).css({ 'max-height':window.innerHeight * .85, width:width });

      if(!isNaN(width)) $('.modal-body', el).css({ 'width':width });
      if(!isNaN(modal_body_height)) $('.modal-body', el).css({ 'height':modal_body_height });

      var left = (window.innerWidth - el.clientWidth) / 2;
      var top = (window.innerHeight - el.clientHeight) / 2;
      $(el).css({ left:left, top:top });

      if($('.modal-bg').length == 0)
        $(document.body).append("<div class='modal-bg'></div>");
      $('.modal-bg').addClass('on');

    })

  },

  modal_close:function(exp, options){

    this.each(function(){

      var el = this;
      $(el).removeClass('on');
      $('.modal-bg').removeClass('on');

    });

  }

})