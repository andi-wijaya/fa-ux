$.extend({

  alert:function(message, actions, callback){

    // Create alert container if not exists
    if($('#alert').length == 0){
      var el = document.createElement('div');
      $(el).addClass('alert off');
      el.id = 'alert';
      document.body.appendChild(el);
    }
    // Initialize alert
    var html = [];
    html.push("<div class='alert-content'>");
    html.push("<span>" + message + "</span>");
    html.push("<div class='height20'></div>");
    if($.type(actions) == 'array'){
      for(var idx in actions){
        var action = actions[idx];
        var action_text = $.val('text', action, { d:"No Text" });
        var action_type = $.val('type', action, { d:"dismiss" });
        action_type = 'alert-' + action_type;
        html.push("<button class='" + action_type + "' class='width100'>" + action_text + "</button>");
      }
    }
    else{
      html.push("<button class='alert-dismiss' class='width100'>OK</button>");
    }
    html.push("</div>");
    $('#alert').html(html.join(''));
    $("button", $('#alert')).on('click', function(e){
      $.fire_event(callback, [ e, this.innerText ], $('#alert')[0]);
    });
    $('.alert-dismiss', $('#alert')).click(function(){ $('#alert').removeClass('on'); });
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

    // Show alert
    $('#alert').removeClass('off');
    window.setTimeout(function(){
      $('#alert').addClass('on');
    }, 100);

    // Transition end event handler
    $('#alert').on('transitionend', function(){
      if(this.classList.contains('on')){

      }
      else{
        this.classList.add('off');
      }
    })

  }

});