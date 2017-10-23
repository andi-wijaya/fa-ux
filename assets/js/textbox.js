$.fn.extend({

  textbox:function(options){

    /* Properties:
     * - onkeyup // raise on key up event
     * - onchange // raise on change event, onchange has delay of 300ms
     *
     *
     *
     */

    var placeholder = $.val('placeholder', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var className = $.val('class', options, { d:'' });
    var default_value = $.val('default_value', options, { d:'' });
    var value = $.val('value', options, { d:default_value });
    var readonly = $.val('readonly', options, { d:false });
    var maxlength = $.val('maxlength', options, { d:'' });
    var mode = $.val('mode', options, { d:"text" });
    var width = $.val('width', options);
    var onblur = $.val('onblur', options);
    var onkeyup = $.val('onkeyup', options);
    var onchange = $.val('onchange', options);

    var css = {
      width:width
    };

    this.each(function(){

      var el = this;

      // Initialize html content
      var html = [];
      html.push($.p('<input type="$1" placeholder="$1" maxlength="$1"/>', [ mode, placeholder, maxlength ]));
      html.push("<span class='icon fa hidden'></span>");

      // Default attributes
      $(el).addClass('textbox');
      $(el).addClass(className);
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'textbox');
      $(el).attr('data-name', name);
      $(el).data('options', options);

      // Event handler
      $('input', el)
      .blur(function(e){
        $(el).textbox_validate();
        $.fire_event(onblur, [ e, this.value ], el);
      })
      .keyup(function(e){

        $.fire_event(onkeyup, [ e, this.value ], el);
        if($(this).data('last_value') != this.value){
          $.fire_event(onchange, [ e, this.value ], el);
        }
        $(this).data('last_value', this.value);

      });

      if(value != '') $(this).val(value);

    });

  },

  textbox_val:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('input', this).val());
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('input', this).val(value);
      })
    }

  },

  textbox_placeholder:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('input', this).attr('placeholder'));
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('input', this).attr('placeholder', value);
      })
    }

  },

  textbox_reset:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var default_value = $.val('default_value', options, { d:'' });
      $(this).textbox_val(default_value);

    });

  },

  textbox_validate:function(){

    return $(this).element_validate();

  }

});