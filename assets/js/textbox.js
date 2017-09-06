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
    var value = $.val('value', options, { d:'' });
    var readonly = $.val('readonly', options, { d:false });
    var mode = $.val('mode', options, { d:"text" });
    var width = $.val('width', options);

    var css = {
      width:width
    };

    this.each(function(){

      var el = this;

      // Initialize html content
      var html = [];
      html.push($.p('<input type="$1" placeholder="$1"/>', [ mode, placeholder ]));
      html.push("<span class='icon fa hidden'></span>");

      // Default attributes
      $(el).addClass('textbox');
      $(el).addClass(className);
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'textbox');
      $(el).attr('data-name', name);
      $(el).data('options', options);
      $('input', el).val(value);

      // Event handler
      $('input', el)
      .focus(function(e){
        $(el).data('temp', this.value);
      })
      .blur(function(e){
        $.textbox_onblur.call(this, e);
      })
      .keyup(function(e){

        $.fire_event($.val('onkeyup', options), [ this.value ]);
        if($(this).data('last_value') != this.value){
          $.fire_event($.val('onchange', options), [ this.value ]);
        }
        $(this).data('last_value', this.value);

      });

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

    $(this).textbox_val('');

  }

});

$.extend({

  textbox_onblur:function(e){

    var el = $(this).closest('.textbox');
    var options = $(el).data('options');
    var validation_url = $.val('validation_url', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var value = $('input', el).val();

    // Online validation
    if(validation_url != ''){

      $(".icon", el)[0].className = "icon fa fa-spin fa-circle-o-notch cl-blue";
      $('.icon', el).unbind('mouseover');
      $('.icon', el).unbind('mouseout');
      $.api_post(validation_url, { name:name, value:value }, function(response){
        $(".icon", el)[0].className = "icon fa fa-check cl-green";
      }, function(response){
        $(".icon", el)[0].className = "icon fa fa-warning cl-red";
        $('.icon', el).mouseover(function(){
          $.tooltip($('.icon', el)[0], response.error_message);
        });
        $('.icon', el).mouseout(function(){
          $.tooltip_remove();
        })
      });

    }

    // Offline validation
    else{

      var valid = false;
      var error_message = $.val('validation_message', options, { d:'' });
      var required = $.val('required', options, { d:0 });
      var validation_regex = $.val('validation_regex', options, { d:'' });
      if(required){

        if(validation_regex != ''){
          var regexp = new RegExp(validation_regex);
          valid = regexp.test(value);
        }
        else{
          if(value.length <= 0){
            valid = false;
          }
          else{
            valid = true;
          }
        }

      }
      else{

        valid = true;

      }

      if(required || validation_regex != ''){

        $('.icon', el).unbind('mouseover');
        $('.icon', el).unbind('mouseout');
        if(!valid){
          $(".icon", el)[0].className = "icon fa fa-warning cl-red";
          if(error_message.length > 0){
            $('.icon', el).mouseover(function(){
              $.tooltip($('.icon', el)[0], error_message);
            });
            $('.icon', el).mouseout(function(){
              $.tooltip_remove();
            })
          }
        }
        else{
          $(".icon", el)[0].className = "icon fa fa-check cl-green";

          var onchange = $.val('onchange', options);
          $.fire_event(onchange, [ value ], el);
        }

      }

    }



  }

})