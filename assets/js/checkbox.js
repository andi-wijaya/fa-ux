$.fn.extend({

  checkbox:function(options){

    this.each(function(){

      var className = $.val('class', options, { d:'' });
      var items = $.val('items', options, { d:null });

      var html = [];
      if($.type(items) == 'array')
        $(items).each(function(){
          var text = $.val('text', this, { d:'' });
          var value = $.val('value', this, { d:'' });
          var uid = 'checkbox-' + $.uniqid();
          html.push("<span class='item'><input id='" + uid + "' type='checkbox' value=\"" + value + "\"/><label for='" + uid + "'>" + text + "</label></span>");
        });
      else{
        var text = $.val('text', options, { d:'' });
        var value = '';
        var uid = 'checkbox-' + $.uniqid();
        html.push("<span class='item'><input id='" + uid + "' type='checkbox' value=\"" + value + "\"/><label for='" + uid + "'>" + text + "</label></span>");
      }

      $(this).addClass('checkbox');
      $(this).addClass(className);
      $(this).html(html.join(''));

      $(this).data('options', options);

    })

  }

});