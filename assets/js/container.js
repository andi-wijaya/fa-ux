$.fn.extend({

  container_val: function (value) {

    // Getter
    if(typeof value == 'undefined'){

      var result = {};
      $("*[data-type]", this).each(function(){

        if($(this).parent().closest('.grid').length > 0) return; // Exclude controls inside grid

        var name = this.getAttribute("data-name");
        if(name != null && name != ''){
          var val = $(this).val();
          result[name] = val;
        }

      });
      return result;

    }

    // Setter
    else{

      $("*[data-type]", this).each(function(){

        var name = this.getAttribute("data-name");
        if(name != null && name != ''){
          var val = $.val(name, value, { d:'' });
          $(this).val(val);
        }

      })

    }

  },

  container_reset:function(){

    $("*[data-type]", this).each(function(){

      var type = $(this).attr('data-type');
      if(type != null && typeof $(this)[type + '_reset'] != 'undefined')
        $(this)[type + '_reset'].apply(this, arguments);

    });

  },

  container_readonly:function(){

    var this_arguments = arguments;
    $("*[data-type]", this).each(function(){

      var type = $(this).attr('data-type');
      if(type != null && typeof $(this)[type + '_readonly'] != 'undefined')
        $(this)[type + '_readonly'].apply(this, this_arguments);

    });

  },

  container_validate:function(){

    var invalid = false;
    $("*[data-type]", this).each(function(){

      var type = $(this).attr('data-type');
      if(type != null && typeof $(this)[type + '_validate'] != 'undefined'){
        var valid = $(this)[type + '_validate'].apply(this, arguments);
        console.warn([ type, valid ]);
        if(!valid){
          invalid = true;
        }
      }

    });
    return !invalid;

  }

});