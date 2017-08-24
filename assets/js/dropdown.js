$.fn.extend({

  dropdown:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var value = $.val('value', options, { d:'' });
    var items = $.val('items', options, { d:[] });
    var width = $.val('width', options, { d:[] });
    var src = $.val('src', options, { d:'' });
    var placeholder = $.val('placeholder', options, { d:'' });

    var html = [];
    html.push("<span class='text'>" + placeholder + "</span>");
    // html.push("<input type='text' value=\"" + placeholder + "\" readonly/>");
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
      $(el).dropdown_attr(options);
      $(el).dropdown_set(value);

      $('.icon, .text', el).click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var el = $(this).closest('.dropdown');
        var options = $(el).data('options');
        var readonly = $.val('readonly', options);
        if(!readonly){
          $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });
          $('.search-item input', $('.popup', el)).val('');
          $('.search-item input', $('.popup', el)).focus();
          $(".item", $('.popup', el)).show();
        }
      });

      if(src.length > 0)
        $(this).dropdown_load();

    })

  },

  dropdown_get:function(){

    var result = [];
    this.each(function(){

      var el = this;
      var value = $(el).attr('data-value');
      var text = $('input', el).length == 1 ? $('input', el).val() : $('.text', el).html();
      value = value == null ? text : value;
      result.push(value);

    });
    return result.length == 1 ? result[0] : (result.length > 0 ? result : null);

  },

  dropdown_set:function(exp){

    if(!exp) return;

    this.each(function(){

      var options = $(this).data('options');
      var items = $.val('items', options, { d:[] });

      var text = '';
      var value = '';
      if($.type(exp) == 'object'){
        text = $.val('text', exp, { d:'' });
        value = $.val('value', exp);
      }
      else if($.type(exp) == 'string'){
        value = exp;
      }

      if($.type(items) == 'array'){
        for(var i = 0 ; i < items.length ; i++){
          var item = items[i];
          if(item.value == value){
            if(text == '') text = item.text;
            value = item.value;
            break;
          }
        }
      }

      $(this).attr('data-value', value);
      $('input', this).val(text);
      $('.text', this).html(text);

    });

  },

  dropdown_setitems:function(items){

    this.each(function(){

      var el = this;
      var options = $(el).data('options');
      var searchable = $.val('searchable', options, { d:false });
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
          var text = item.text;
          var value = item.value;
          var search = (text + ' ' + value).toLowerCase();
          html.push("<div class='item' data-value=\"" + value + "\" data-search=\"" + search + "\">");
          html.push("<label>" + text + "</label>");
          html.push("</div>");
        }
      html = html.join('');

      $('.popup', el).html(html);
      $(el).data('options', options);

      $('.item', $('.popup', el)).click(function(e){

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

        $.fire_event(onchange, [ e, obj ], el);

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

  },

  dropdown_getitems:function(){

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

  },

  dropdown_attr:function(obj){
    
    this.each(function(){

      var options = $(this).data('options');

      if($.type(obj) == 'object'){
        for(var key in obj){
          var value = obj[key];
          var css = {};
          switch(key){

            case 'items':
              $(this).dropdown_setitems(value);
              break;
            case 'readonly':
              if(value){
                $(this).addClass('readonly');
                options['readonly'] = true;
              }
              else{
                $(this).removeClass('readonly');
                options['readonly'] = false;
              }
              break;
            case 'value':
              $(this).dropdown_set(value);
              break;
            case 'width':
              css['width'] = parseInt(value);
              break;

          }
          $(this).css(css);

        }
      }

      $(this).data('options', options);

    })

  },

  dropdown_load:function(){

    this.each(function(){

      var el = this;
      var options = $(el).data('options');
      var src = $.val('src', options, { d:'' });

      $.api_post(src, {}, function(response){

        var data = $.val('data', response);
        if($.type(data) == 'array')
          $(el).dropdown_setitems(data);

      });

    })

  }

});

$.extend({

  dropdown_open:function(){



  }

});