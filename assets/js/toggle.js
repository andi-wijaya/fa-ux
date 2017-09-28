$.fn.extend({

  toggle:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var default_value = $.val('default_value', options, { d:false });
    var value = $.val('value', options, { d:default_value });

    this.each(function(){

      var el = this;
      var html = [];
      html.push("<span class='main-toggle'></span>");

      el.innerHTML = html.join('');
      $(this).addClass('toggle');
      $(this).addClass(className);
      $(el).attr('data-type', 'toggle');
      if(name != '') $(el).attr('data-name', name);

      el.querySelector('.main-toggle').addEventListener('click', function(){

        if(this.parentNode.classList.contains('on'))
          this.parentNode.classList.remove('on');
        else
          this.parentNode.classList.add('on');

      });

      $(el).toggle_val(value);

      return el;

    })

  },

  toggle_val:function(value){

    if(!$(this).hasClass('toggle')) return undefined;

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

});