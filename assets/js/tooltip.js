$.extend({

  tooltip:function(refEl, html){

    var instance = $('.tooltip');
    if(instance.length == 0) $.warn('No tooltip defined.');
    $(instance).addClass('on');

    var offset = refEl.getBoundingClientRect();

    var css = {};

    var exp = [];
    console.log(refEl);

    css.left = offset.left;

    console.log([ offset.top, offset.top  + offset.height + $(instance).outerHeight() + 10, window.innerHeight ]);

    // Show on up side
    if(offset.top  + offset.height + $(instance).outerHeight() + 10 > window.innerHeight){
      css.top = offset.top - $(instance).outerHeight() - 10;
      exp.push("<div class='arrow-down'></div>");
    }
    // Show on down side
    else{
      css.top = offset.top + offset.height + 10;
      exp.push("<div class='arrow-up'></div>");
    }

    exp.push(html);

    $(instance).html(exp.join(''));
    $(instance).css(css);

  },

  tooltip_remove:function(){

    $('.tooltip').removeClass('on');

  },


})