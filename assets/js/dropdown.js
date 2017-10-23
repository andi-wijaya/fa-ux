$.fn.extend({

  dropdown:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var default_value = $.val('default_value', options, { d:'' });
    var value = $.val('value', options, { d:default_value });
    var items = $.val('items', options, { d:[] });
    var width = $.val('width', options, { d:[] });
    var src = $.val('src', options, { d:'' });
    var placeholder = $.val('placeholder', options, { d:'' });
    options['static_items'] = items;

    var html = [];
    html.push("<input class='text' placeholder=\"" + placeholder + "\" readonly/>");
    html.push("<span class='icon fa fa-caret-down hoverable'></span>");
    html.push("<span class='popup'></span>");

    this.each(function(){

      var el = this;

      $(el).addClass('dropdown');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).data('options', options);
      $(el).attr('data-type', 'dropdown');
      $(el).attr('data-name', name);

      $('.icon, .text', el).click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var el = $(this).closest('.dropdown');
        var options = $(el).data('options');
        var readonly = $.val('readonly', options);
        if(!readonly){
          if($('.popup', el).hasClass('on')){
            $.popup_close($('.popup', el));
          }
          else{
            $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });
            $('.search-item input', $('.popup', el)).val('');
            $('.search-item input', $('.popup', el)).focus();
            $(".item", $('.popup', el)).show();
          }
        }
      });

      if($.type(items) == 'array' && items.length > 0) $(this).dropdown_items(items);
      if(value != '') $(el).dropdown_val(value);
      if(src.length > 0)
        $(this).dropdown_load();

    })

  },

  dropdown_val:function(val, append){

    // Getter
    if(typeof val == 'undefined'){

      var result = [];
      this.each(function(){

        var el = this;
        var value = $(el).attr('data-value');
        var text = $('input', el).length == 1 ? $('input', el).val() : $('.text', el).html();
        value = value == null ? text : value;
        result.push(value);

      });
      return result.length == 1 ? result[0] : (result.length > 1 ? result : null);

    }

    // Setter
    else{

      this.each(function(){

        var options = $(this).data('options');
        var items = $.val('items', options, { d:[] });

        var text = '';
        var value = '';
        if($.type(val) == 'object'){
          value = $.val('value', val);
          text = $.val('text', val, { d:value });
        }
        else if($.type(value) == 'string'){
          text = value = val;
        }

        if($.type(items) == 'array'){
          for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            if(item.value == value){
              text = item.text;
              value = item.value;
              $(this).attr('data-value', value);
              $('input', this).val(text);
              $('.text', this).html(text);
              break;
            }
          }
        }


      });

    }

  },

  dropdown_items:function(items){

    if(typeof items == 'undefined'){

      var results = [];
      this.each(function(){

        var el = this;
        var options = $(el).data('options');
        var items = $.val('items', options, { d:[] });
        $(items).each(function(){
          if($.type(this) == 'object')
            results.push(this);
        });

      });
      return results;

    }

    else{

      this.each(function(){

        var el = this;
        var options = $(el).data('options');
        var searchable = $.val('searchable', options, { d:false });
        var multiple = $.val('multiple', options, { d:false });
        var onchange = $.val('onchange', options);

        // Generate popup content
        var html = [];
        if(searchable == true){
          html.push("<div class='search-item'>");
          html.push("<input type='text' placeholder='Search'/>");
          html.push("</div>");
        }
        if($.type(items) == 'array')
          for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            var value = $.val('value', item, { d:'' });
            var text = $.val('text', item, { d:value });
            var search = (text + ' ' + value).toLowerCase();
            var uid = $.uniqid();
            html.push("<div class='item' data-value=\"" + value + "\" data-search=\"" + search + "\">");
            if(multiple) html.push("<input type='checkbox' id='dropdown_item_checkbox_" + uid + "'/>");
            html.push("<label for='dropdown_item_checkbox_" + uid + "'>" + text + "</label>");
            html.push("</div>");
          }
        html = html.join('');

        $('.popup', el).html(html);
        $('.item', $('.popup', el)).click(function(e){

          if(multiple) e.stopPropagation();

          var text = $('label', this).html();
          var value = $(this).attr('data-value');
          var index = -1;
          var obj = null;
          for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            var item_text = $.val('text', item);
            var item_value = $.val('value', item);
            if(item_value == value || item_text == text){
              index = i;
              obj = item;
              break;
            }
          }
          if(obj) obj['_index'] = index;

          $('input', el).val(text);
          $('.text', el).html(text);
          $(el).attr('data-value', value);

          $(el).textbox_validate();
          $.fire_event(onchange, [ e, obj ], el);

        });
        $(".item>input[type='checkbox']", $('.popup', el)).on('change', function(){

          var text = this.nextElementSibling.innerHTML; // Text from label
          var value = this.parentNode.getAttribute("data-value"); // Value from item data-value
          $(el).dropdown_val({ text:text, value:value }, true);

        });
        $('.popup .search-item input', el).click(function(e){
          e.preventDefault();
          e.stopPropagation();
        });
        $('.popup .search-item input', el).keyup(function(e){

          var key = this.value;
          var popup = $(this).closest('.popup');
          $(".item", popup).show();
          if(key.length > 0){
            $(".item:not([data-search*='" + key + "'])", popup).hide();
          }

        });

        options['items'] = items;
        $(el).data('options', options);

      })

    }

  },

  dropdown_load:function(){

    this.each(function(){

      var el = this;
      var options = $(el).data('options');
      var src = $.val('src', options, { d:'' });
      var method = $.val('method', options, { d:'get' });

      if(method == 'post'){
        $.api_post(src, {}, function(response){

          var items = $.val('data', response);
          if($.type(items) == 'array'){

            var map = $.val('map', options, { d:null });
            var key_text = $.val('text', map, { d:'text' });
            var value_text = $.val('value', map, { d:'value' });
            var static_items = $.val('static_items', options, { d:[] });

            // Generate items
            var temp = [];
            if($.type(static_items) == 'array') {
              for (var i = 0; i < static_items.length; i++) {
                var item = static_items[i];
                var value = $.val(value_text, item, { d:'' });
                var text = $.val(key_text, item, { d:value });
                temp.push({ text:text, value:value });
              }
            }
            if($.type(items) == 'array') {
              for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var value = $.val(value_text, item, { d:'' });
                var text = $.val(key_text, item, { d:value });
                temp.push({ text:text, value:value });
              }
            }
            items = temp;
            $(el).dropdown_items(items);

          }

        });
      }
      else{
        $.api_get(src, {}, function(response){

          var items = $.val('data', response);
          if($.type(items) == 'array'){

            var map = $.val('map', options, { d:null });
            var key_text = $.val('text', map, { d:'text' });
            var value_text = $.val('value', map, { d:'value' });
            var static_items = $.val('static_items', options, { d:[] });

            // Generate items
            var temp = [];
            if($.type(static_items) == 'array') {
              for (var i = 0; i < static_items.length; i++) {
                var item = static_items[i];
                var value = $.val(value_text, item, { d:'' });
                var text = $.val(key_text, item, { d:value });
                temp.push({ text:text, value:value });
              }
            }
            if($.type(items) == 'array') {
              for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var value = $.val(value_text, item, { d:'' });
                var text = $.val(key_text, item, { d:value });
                temp.push({ text:text, value:value });
              }
            }
            items = temp;
            $(el).dropdown_items(items);

          }

        });
      }

    })

  },

  dropdown_reset:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var default_value = $.val('default_value', options, { d:'' });
      $(this).dropdown_val(default_value);

    })

  },

  dropdown_readonly:function(readonly){

    $(this).each(function(){

      if($.istrue(readonly)) $(this).addClass('readonly');
      else $(this).removeClass('readonly');

    })

  },

  dropdown_validate:function(){

    return $(this).element_validate();

  }

});