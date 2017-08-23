$.fn.extend({

  vfields:function(options){

    var value = $.val('value', options);

    $(this).each(function(){

      var instance = this;

      $(instance).addClass('vfields');
      $(instance).data('options', options);

      if($.type(value) == 'array') $(instance).form_set(value);

    });

  },

  form_set:function(value){

    if(typeof value == 'undefined' || $.type(value) != 'array') return;

    $(this).each(function(){

      var instance = this;
      var options = $(this).data('options');
      var html_callback = $.val('html_callback', options);

      $(value).each(function(){

        var obj = this;

        var html = [];
        html.push("<table><tr><td class='vfields-col1' align='center' style='width:24px'>");
        html.push("<span class='fa fa-times-circle selectable vfields-remove hoverable'></span>");
        html.push("</td><td class='vfields-col2'></td></tr></table>");

        var row_el = document.createElement("div");
        row_el.className = 'vfields-item';
        row_el.innerHTML = html.join('');

        $(instance).append(row_el);

        $.invoke_callback(html_callback, [ obj ], $('.vfields-col2', row_el));

      });

      $('.vfields-remove', instance).click(function(){
        $(this).closest('.vfields-item').remove();
      });


    });

  },

  vfields_get:function(){

    var value = [];

    $(this).each(function(){

      var instance = this;
      $('.vfields-col2', instance).each(function(){
        var obj = $.el_get(this);
        value.push(obj);
      })

    });

    return value;

  }

})