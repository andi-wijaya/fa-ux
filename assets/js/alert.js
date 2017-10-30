$.extend({

  alert:function(message, type, callback){

    if($('#alert').length == 0){
      var el = document.createElement('div');
      el.classList.add('alert');
      el.id = 'alert';
      document.body.appendChild(el);
    }

    var html = [];
    html.push("<div class='alert-content width600'>");
    html.push("<h3>" + message + "</h3>");
    html.push("<div class='height20'></div>");
    html.push("<button id='alert-dismiss' class='width100'>OK</button>");
    html.push("</div>");

    $('#alert').html(html.join(''));
    $('#alert').addClass('on');

    $('#alert-dismiss').click(function(){ $('#alert').removeClass('on'); });
    $(document.body).css({ overflow:'hidden' });

    var contentHeight = $('.alert-content').outerHeight();
    if(contentHeight < window.innerHeight){
      $('.alert-content').css({
        'top': '50%',
        'left': '50%',
        'transform': 'translateX(-50%) translateY(-50%)'
      });
    }
    else{
      $('.alert-content').css({
        'left': '50%',
        'transform': 'translateX(-50%) translateY(30px)'
      });
    }

  }

});