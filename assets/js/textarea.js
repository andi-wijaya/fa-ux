$.fn.extend({

  textarea:function(options){

    var className = $.val('class', options, { d:'' });
    var default_value = $.val('default_value', options, { d:'' });
    var maxlength = $.val('maxlength', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var onblur = $.val('onblur', options);
    var onchange = $.val('onchange', options);
    var onkeyup = $.val('onkeyup', options);
    var placeholder = $.val('placeholder', options, { d:'' });
    var readonly = $.val('readonly', options, { d:false });
    var height = $.val('height', options, { d:"1em" });
    var width = $.val('width', options, { d:'' });
    var value = $.val('value', options, { d:default_value });
    var droppable = $.val('droppable', options, { d:true });

    var css = {};
    if(width != '') css['width'] = width;

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<textarea rows='1' placeholder='" + placeholder + "' style='height:" + height + ";' maxlength='" + maxlength + "'></textarea>");
      html.push("<span class='icon fa hidden'></span>");
      $(el).html(html.join(''));

      $(el).addClass('textarea');
      $(el).addClass(className);
      $(el).css(css);
      $(el).attr('data-type', 'textarea');
      $(el).attr('data-name', name);
      $(el).data('options', options);

      $('textarea', el)
      .blur(function(e){
        $(el).textarea_validate();
        $.fire_event(onblur, [], el);
      })
      .keyup(function(e){

        $.fire_event(onkeyup, [ e, this.value ], el);
        if($(this).data('last_value') != this.value){
          $.fire_event(onchange, [ e, this.value ], el);
        }
        $(this).data('last_value', e, this.value);

      });

      $('textarea', el).each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight <= 0 ? '' : this.scrollHeight) + 'px;overflow-y:hidden;');
      })
      .on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });

      if(value != '') $(this).textarea_val(value);

      if(droppable){
        $(this).droppable({
          ondrop:function(e, value){
            $(this).val(value);
          }
        });
      }

    });

    return this;

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
        $('textarea', this).val(value).each(function(){
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        });
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

    $(this).each(function(){

      var options = $(this).data('options');
      var default_value = $.val('default_value', options, { d:'' });
      $(this).textarea_val(default_value);

    });

  },

  textarea_validate:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var name = $.val('name', options, { d:'Field' });
      var required = $.val('required', options, { d:false });
      var required_text = $.val('required_text', options, { d:name + ' required.' });
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