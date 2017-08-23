$.fn.extend({

  autocomplete:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var src = $.val('src', options, { d:'' });
    var width = $.val('width', options);

    var css = {};
    if(width != null) css['width'] = width;

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='text' />");
      html.push("<span class='icon fa fa-search hoverable selectable'></span>");
      html.push("<span class='popup'></span>");

      $(el).addClass('autocomplete');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).css(css);
      $(el).attr('data-name', name);
      $(el).attr('data-type', 'autocomplete');

      $(el).autocomplete_attr(options);

      $("input[type='text']", el).on('keyup', function(e){

        var el = $(this).closest('.autocomplete');
        var options = $(el).data('options');
        var readonly = $.val('readonly', options);

        if(!readonly && src.length > 0){

          var params = {};
          params['key'] = this.value;

          $.api_get(src, params, function(response){

            var data = $.val('data', response);
            var html = [];
            if($.type(data) == 'array')
              for(var i = 0 ; i < data.length ; i++){
                var item = data[i];
                var text = item['full_name'];
                html.push("<div class='item'>");
                html.push("<label>" + text + "</label>");
                html.push("</div>");
              }
            $('.popup', el).html(html.join(''));
            $('.item', $('.popup', el)).on('click',function(){
              $(el).autocomplete_set($('label', this).html());
            });
            $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });

          });
        }

      });

    });

  },

  autocomplete_attr:function(attr){

    $(this).each(function(){

      if($.type(attr) == 'object')
        for(var key in attr){
          var value = attr[key];
          switch(key){
            case 'readonly':
              if(value){
                $(this).addClass('readonly');
              }
              else{
                $(this).removeClass('readonly');
              }
              break;
            case 'value':
              $('input', this).val(value);
              break;
          }
        }

    })

  },

  autocomplete_set:function(value){

    $(this).autocomplete_attr({ value:value });

  },

  autocomplete_get:function(){

    var value = [];
    $(this).each(function(){
      value.push($('input', this).val());
    })
    return value.length == 1 ? value[0] : (value.length > 1 ? value : '');

  }

});