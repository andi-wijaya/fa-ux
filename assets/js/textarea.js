$.fn.extend({

  textarea:function(options){

    var placeholder = $.val('placeholder', options, { d:'' });
    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var height = $.val('height', options, { d:"1em" });
    var width = $.val('width', options);
    var maxlength = $.val('maxlength', options, { d:'' });
    var onblur = $.val('onblur', options);
    var onkeyup = $.val('onkeyup', options);
    var onchange = $.val('onchange', options);

    var css = {
      width:width
    };

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<textarea rows='1' placeholder='" + placeholder + "' style='height:" + height + ";' maxlength='" + maxlength + "'></textarea>");
      html.push("<span class='icon fa hidden'></span>");

      $(el).addClass('textarea');
      $(el).addClass(className);
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'textarea');
      $(el).attr('data-name', name);
      $(el).data('options', options);

      $('textarea', el)
      .blur(function(e){
        $(el).textarea_validate();
        $.fire_event(onblur, [], el);
      })
      .keyup(function(e){

        $.fire_event(onkeyup, [ this.value ], el);
        if($(this).data('last_value') != this.value){
          $.fire_event(onchange, [ this.value ], el);
        }
        $(this).data('last_value', this.value);

      });

      $('textarea', el).each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
      }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });

    });

  },

  textarea_val:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('textarea', this).val());
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('textarea', this).val(value);
      })
    }

  },

  textarea_placeholder:function(value){

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

  textarea_reset:function(){

    $(this).textarea_val('');

  },

  textarea_validate:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var required = $.val('required', options, { d:false });
      var required_text = $.val('required_text', options, { d:'Field required.' });
      var validation = $.val('validation', options, { d:'' });
      var validation_text = $.val('validation_text', options, { d:'Validation error.' });
      var value = $(this).textarea_val();

      var valid = true;
      var invalid_message = '';

      if(required){
        if(value.toString().trim() == ''){
          valid = false;
          invalid_message = required_text;
        }
        else if(validation != ''){
          switch(validation){
            default:
              var regex = new RegExp(validation);
              valid = regex.test(value);
              if(!valid) invalid_message = validation_text;
              break;
          }
        }
      }
      else if(value.toString().length > 0){
        switch(validation){
          default:
            var regex = new RegExp(validation);
            valid = regex.test(value);
            if(!valid) invalid_message = validation_text;
            break;
        }
      }

      if(!valid){
        $(this).addClass('invalid');
        console.warn(invalid_message);
      }
      else{
        $(this).removeClass('invalid');
      }

    })

  }

});

$.extend({

})