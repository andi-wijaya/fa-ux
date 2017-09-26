$.fn.extend({

  container_val: function (value) {

    // Getter
    if(typeof value == 'undefined'){

      result = {};
      $("*[data-type]", this).each(function(){

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

  }

});