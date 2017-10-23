$.fn.extend({

  element_validate:function(value){

    var valid = true;
    $(this).each(function(){

      var options = $(this).data('options');
      var name = $.val('name', options, { d:'Field' });
      var required = $.val('required', options, { d:false });
      var required_text = $.val('required_text', options, { d:name + ' required.' });
      var validation = $.val('validation', options, { d:'' });
      var validation_text = $.val('validation_text', options, { d:'Validation error.' });
      var value = $(this).val();

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
      }
      else{
        $(this).removeClass('invalid');
      }

    });
    return valid;

  }

});