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
        if($(el).hasClass('readonly')) return;
        var options = $(el).data('options');
        var mapping = $.val('mapping', options, { d:null });
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

                var value_key = $.val('value', mapping, { d:'value' });
                var text_key = $.val('text', mapping, { d:'text' });
                var value = $.val(value_key, item, { d:'' });
                var text = $.val(text_key, item, { d:value });
                
                html.push("<div class='item' data-value=\"" + value + "\">");
                html.push("<label>" + text + "</label>");
                html.push("</div>");
              }
            $('.popup', el).html(html.join(''));
            $('.item', $('.popup', el)).on('click',function(){

              var value = this.getAttribute('data-value');
              var text = $('label', this).text();
              var obj = { value:value, text:text };

              $(el).autocomplete_val(obj, true);
            });
            $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });

          });
        }

      });

    });

  },

  autocomplete_val:function(val, arg1){

    if(typeof val == 'undefined'){

      var value = [];
      $(this).each(function(){
        var options = $(this).data('options');
        var multiple = $.val('multiple', options, { d:false });

        if(multiple){

          $('.text', this).each(function(){
            value.push(this.getAttribute("data-value"));
          })

        }
        else{

          var t = $('input', this).val();
          var v = $(this).data('value');
          if(v == null) v = t;
          value.push(v);

        }

      })
      return value.join(',');

    }

    else{

      $(this).each(function(){

        var options = $(this).data('options');
        var multiple = $.val('multiple', options, { d:false });

        var text = value = '';
        if($.type(val) == 'object'){
          value = $.val('value', val, { d:'' });
          text = $.val('text', val, { d:value });
        }
        else{
          text = value = val;
        }

        if(multiple){

          var append = typeof arg1 != 'undefined' && arg1 === true ? true : false;
          if(!append == true)
            $('.text', this).remove();

          var current_val = $(this).val();
          current_val = current_val.split(',');

          value = value.split(",");
          text = text.split(",");

          for(var i = 0 ; i < value.length ; i++){
            var ivalue = value[i];
            var itext = typeof text[i] != 'undefined' ? text[i] : ivalue;

            if(!$.in_array(ivalue.toLowerCase(), current_val) && ivalue !== ''){
              $("<span class='text' data-value=\"" + ivalue + "\">" + itext + "<span class='icon-remove glyphicons glyphicons-remove'></span></span>").insertBefore($('input', this));
              $('.glyphicons-remove', $('input', this).prev()).on('click', function(){
                $(this).parent().remove();
              })
            }

          }

          $('input', this).val('');

        }
        else{
          $('input', this).val(text);
          $(this).data('value', value);
        }

      })

    }

  },

  autocomplete_readonly:function(val){

    if(typeof val == 'undefined'){

      return $(this).hasClass('readonly') ? true : false;

    }
    else{
      if(val){
        $(this).addClass('readonly');
        $('input', this).attr('readonly', true);
        $('input', this).data('placeholder', $('input', this).attr('placeholder'));
        $('input', this).attr('placeholder', '');
      }
      else{
        $(this).removeClass('readonly');
        $('input', this).attr('readonly', false);
        $('input', this).attr('placeholder', $('input', this).data('placeholder'));
      }
    }


  },

  autocomplete_reset:function(){

    $(this).autocomplete_val('', true);

  }

});