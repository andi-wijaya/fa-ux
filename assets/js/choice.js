$.fn.extend({

  choice:function(options){

    $(this).each(function(){

      var className = $.val('class', options, { d:'' });
      var items = $.val('items', options, { d:[], datatype:'array' });

      var html = [];
      if($.type(items) == 'array'){
        for(var i = 0 ; i < items.length ; i++){
          var item = items[i];
          var value = $.val('value', item, { d:'' });
          var text = $.val('text', item, { d:value });
          if(value.length == 0) continue;
          html.push($.p('<span class="item">'));
          html.push($.p('</span>'));
        }
      }

      $(this).addClass('choice');
      $(this).addClass(className);

    })

  }

});