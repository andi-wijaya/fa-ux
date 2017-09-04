$.fn.extend({

  autocomplete:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var src = $.val('src', options, { d:'' });
    var width = $.val('width', options);
    var placeholder = $.val('placeholder', options, { d:"" });

    var css = {};
    if(width != null) css['width'] = width;

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='text' placeholder=\"" + placeholder + "\"/>");
      html.push("<span class='icon fa fa-search hoverable selectable'></span>");
      html.push("<span class='popup'></span>");

      $(el).addClass('autocomplete');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).css(css);
      $(el).attr('data-name', name);
      $(el).attr('data-type', 'autocomplete');
      $(el).data('options', options);

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
                var value = $.val('value', item, { d:'' });
                var text = $.val('text', item, { d:value });
                html.push("<div class='item' data-value=\"" + value + "\">");
                html.push("<label>" + text + "</label>");
                html.push("</div>");
              }
            $('.popup', el).html(html.join(''));
            $('.item', $('.popup', el)).on('click',function(){
              $(el).autocomplete_val($('label', this).html());
            });
            $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });

          });
        }

      });

    });

  },

  autocomplete_val:function(val){

    if(typeof val == 'undefined'){

      var value = [];
      $(this).each(function(){
        var options = $(this).data('options');
        var multiple = $.val('multiple', options, { d:false });

        if(multiple){

        }
        else{
          value.push($('input', this).val());
        }

      })
      return value.length == 1 ? value[0] : (value.length > 1 ? value : '');

    }

    else{

      $(this).each(function(){

        var options = $(this).data('options');
        var multiple = $.val('multiple', options, { d:false });

        if(multiple){

          $("<span class='text'>" + val + "<span class='icon-remove glyphicons glyphicons-remove'></span></span>").insertBefore($('input', this));
          $('input', this).val('');

        }
        else{
          $('input', this).val(val);
        }

      })

    }

  },

  autocomplete_readonly:function(val){

    if(typeof val == 'undefined'){

      return $(this).hasClass('readonly') ? true : false;

    }
    else{
      if(val)
        $(this).addClass('readonly');
      else
        $(this).removeClass('readonly');
    }


  },

});