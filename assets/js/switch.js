$.fn.extend({

  switch:function(options){

    var className = $.val('class', options, { d:'' });
    var value = $.val('value', options, { d:false });

    this.each(function(){

      var el = this;
      var html = [];
      html.push("<span class='main-switch'></span>");

      el.innerHTML = html.join('');
      $(this).addClass('switch');
      $(this).addClass(className);
      $(el).attr('data-type', 'switch');
      $(el).switch_val(value);

      el.querySelector('.main-switch').addEventListener('click', function(){

        if(this.parentNode.classList.contains('on'))
          this.parentNode.classList.remove('on');
        else
          this.parentNode.classList.add('on');

      });

      return el;

    })

  },

  switch_val:function(value){

    if(!$(this).hasClass('switch')) return undefined;

    if(typeof value == 'undefined'){

      return $(this).hasClass('on') ? 1 : 0;

    }


    else{

      if(value == true || value == 1)
        $(this).addClass('on');
      else
        $(this).removeClass('on');

    }

  },

})