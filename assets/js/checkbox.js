$.fn.extend({

  checkbox:function(options){

    this.each(function(){

      var className = $.val('class', options, { d:'' });
      var items = $.val('items', options, { d:null });
      var name = $.val('name', options, { d:'' });

      var html = [];
      if($.type(items) == 'array')
        $(items).each(function(){
          var text = $.val('text', this, { d:'' });
          var value = $.val('value', this, { d:'' });
          var uid = 'checkbox-' + $.uniqid();
          html.push("<span class='item'><input id='" + uid + "' type='checkbox' value=\"" + value + "\"/><label for='" + uid + "'>" + text + "</label></span>");
        });
      else{
        var text = $.val('text', options, { d:'' });
        var value = '';
        var uid = 'checkbox-' + $.uniqid();
        html.push("<span class='item'><input id='" + uid + "' type='checkbox' value=\"" + value + "\"/><label for='" + uid + "'>" + text + "</label></span>");
      }

      $(this).addClass('checkbox');
      $(this).addClass(className);
      $(this).attr('data-type', 'checkbox');
      $(this).attr('data-name', name);
      $(this).html(html.join(''));
      $(this).data('options', options);
      $(this).checkbox_val($.val('value', options, { d:false }));

    })

  },

  checkbox_val:function(value){

    if(typeof value == 'undefined') {

      var results = [];
      $(this).each(function(){

        if(!$(this).hasClass('checkbox')) return;

        var options = $(this).data('options');
        var items = $.val('items', options, { d:null });
        var is_multiple = $.type(items) == 'array' ? true : false;

        if(is_multiple){

          $('.item', this).each(function(){
            if($('input[type=checkbox]', this).is(':checked')){
              results.push($('input[type=checkbox]', this).val());
            }
          });

        }
        else{
          results.push($('input[type=checkbox]', this).is(':checked') ? 1 : 0);
        }

      });
      return results.length > 1 ? results.join(',') : (results.length == 1 ? results[0] : 0);

    }

    else{

      $(this).each(function(){

        var options = $(this).data('options');
        var items = $.val('items', options, { d:null });
        var is_multiple = $.type(items) == 'array' ? true : false;

        if(is_multiple){

          value = value.split(',');
          $('.item', this).each(function(){
            if($.in_array($('input[type=checkbox]', this).val(), value)){
              $('input[type=checkbox]', this).prop('checked', true).attr('checked', true);
            }
            else{
              $('input[type=checkbox]', this).prop('checked', false).attr('checked', false);
            }
          });

        }
        else{
          value = value == true || value == 1 ? true : false;
          $('input[type=checkbox]', this).prop('checked', value).attr('checked', value);
        }

      })

    }

  },

  checkbox_validate:function(){

    var valid = true;
    $(this).each(function(){

      var options = $(this).data('options');
      var required = $.val('required', options, { d:false });
      var items = $.val('items', options, { d:null });

      var item_count = 0;
      var el_valid = 0;
      $('.item', this).each(function(){
        var checked = $('input[type=checkbox]', this).is(':checked');
        if(checked) el_valid++;
        item_count++;
      });

      if((required == 1 || required == true) && el_valid < 1){
        valid = false;
        $(this).addClass('invalid');
      }
      else{
        $(this).removeClass('invalid');
      }

    })

    return valid;

  }

});