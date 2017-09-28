$.fn.extend({

  radio:function(options){

    $(this).each(function(){

      var items = $.val('items', options, { d:null });
      var className = $.val('class', options, { d:'' });
      var text = $.val('text', options, { d:'' });
      var name = $.val('name', options, { d:'' });
      var value = $.val('value', options, { d:'' });

      var html = [];
      if($.type(items) == 'array'){
        var uname = 'radio-name-' + $.uniqid();
        for(var i = 0 ; i < items.length ; i++){
          var i_item = items[i];
          var i_text = i_item.text;
          var i_value = i_item.value;
          var checked = value != '' && value == i_value ? true : false;

          var uid = 'radio-' + $.uniqid();
          html.push("<input type='radio' id='" + uid + "' value=\"" + i_value + "\" name='" + uname + "'" + (checked ? ' checked' : '') + "/>");
          html.push("<label for='" + uid + "'>" + i_text + "</label>");
        }
      }
      else{
        var checked = parseInt(value) == 1 || value === true ? true : false;
        var uid = 'radio-' + $.uniqid();
        html.push("<input type='radio' id='" + uid + "'" + (checked ? ' checked' : '') + "/>");
        html.push("<label for='" + uid + "'>" + text + "</label>");
      }

      $(this).addClass('radio');
      $(this).addClass(className);
      $(this).attr({
        'data-type':'radio',
        'data-name':name
      });
      $(this).html(html.join(''));

    })

  },

  radio_val:function(value){

    if(typeof value == 'undefined'){

      var results = [];
      $(this).each(function(){

        var inputs = this.querySelectorAll("input");
        if(inputs.length == 1){
          results.push(inputs[0].checked ? 1 : 0);
        }
        else{
          for(var i = 0 ; i < inputs.length ; i++){
            if(inputs[i].checked){
              results.push(inputs[i].value);
            }
          }
        }

      })
      results = results.join(',');
      return results;

    }

    else{

      $(this).each(function(){

        var inputs = this.querySelectorAll("input");
        if(inputs.length == 1){
          inputs[0].checked = (parseInt(value) == 1 || value === true) ? true : false;
        }
        else{
          var value_exists = false;
          for(var i = 0 ; i < inputs.length ; i++){
            if(inputs[i].value == value){
              inputs[i].checked = true;
              value_exists = true;
              break;
            }
          }
          if(!value_exists) $('input', this).attr('checked', false);
        }

      });

    }

  }

});
