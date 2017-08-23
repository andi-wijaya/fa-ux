$.fn.extend({

  codefield:function(options){

    var placeholder = $.val('placeholder', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var height = $.val('height', options);
    var width = $.val('width', options);

    var css = {
      width:width,
      height:height
    };

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<pre style='height:" + height + ";'>" + JSON.stringify({ name:"andy" }, null, 2) + "</pre>");
      html.push("<span class='icon fa hidden'></span>");

      $(el).addClass('codefield');
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'codefield');
      $(el).attr('data-name', name);
      $(el).data('options', options);

    });

  },

  codefield_get:function(){

    var value = [];
    this.each(function(){

      var val = $('pre', this).html();
      value.push(val);

    });
    return value.length > 1 ? value : (value.length == 1 ? value[0] : '');

  },

  codefield_set:function(value){

    this.each(function(){

      $('pre', this).html(value);

    });

  },

});

$.extend({


})