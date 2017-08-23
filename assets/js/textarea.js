$.fn.extend({

  textarea:function(options){

    var placeholder = $.val('placeholder', options, { d:'' });
    var className = $.val('class', options, { d:'' });
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
      html.push("<textarea placeholder='" + placeholder + "' style='height:" + height + ";'></textarea>");
      html.push("<span class='icon fa hidden'></span>");

      $(el).addClass('textarea');
      $(el).addClass(className);
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'textarea');
      $(el).attr('data-name', name);
      $(el).data('options', options);

      $('textarea', el).blur(function(e){
        $.textarea_onblur.call(this, e);
      })

    });

  },

  textarea_get:function(){

    var value = [];
    this.each(function(){

      var val = $('textarea', this).val();
      value.push(val);

    });
    return value.length > 1 ? value : (value.length == 1 ? value[0] : '');

  },

  textarea_set:function(value){

    this.each(function(){

      $('textarea', this).val(value);

    });

  },

  textarea_attr:function(obj){

    $(this).each(function(){

      if($.type(obj) == 'object'){
        for(var key in obj){
          var value = obj[key];
          switch(key){
            case 'readonly':
              if(value){
                $(this).addClass('readonly');
                $('textarea', this).attr('readonly', true);
              }
              else{
                $(this).removeClass('readonly');
                $('textarea', this).attr('readonly', false);
              }
              break;
            case 'value':
              $('textarea', this).val(value);
              break;
          }
        }
      }

    })

  }

});

$.extend({

  textarea_onblur:function(e){

    var el = $(this).closest('.textarea');
    var options = $(el).data('options');
    var value = $('input', el).val();

    var required = $.val('required', options, { d:0 });

    if(required){

      // Invalid
      if(value.length <= 0){
        $(".icon", el).addClass('fa-warning').removeClass('hidden');
        el.addClass('error');
      }

      // Valid
      else{
        $(".icon", el).removeClass('fa-warning').addClass('hidden');
        el.removeClass('error');
      }

    }

  }

})