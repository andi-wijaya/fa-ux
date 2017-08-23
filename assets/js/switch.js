$.fn.extend({

  switch:function(options){

    var className = $.val('class', options, { d:'' });
    var value = $.val('value', options, { d:false });

    this.each(function(){

      var el = this;
      var html = [];
      html.push("<span class='main-switch'></span>");

      el.classList.add('switch');
      if(className != '') el.classList.add(className);
      el.innerHTML = html.join('');
      $(el).attr('data-type', 'switch');
      $(el).switch_set(value);

      el.querySelector('.main-switch').addEventListener('click', function(){

        if(this.parentNode.classList.contains('on'))
          this.parentNode.classList.remove('on');
        else
          this.parentNode.classList.add('on');

      });

      return el;

    })

  },

  switch_set:function(value){

    if(value == 'undefined') return;
    if(!$(this).hasClass('switch')) return;

    if(value == true || value == 1)
      $(this).addClass('on');
    else
      $(this).removeClass('on');

  },

})