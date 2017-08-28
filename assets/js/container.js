$.fn.extend({

  container_val: function (value) {

    // Getter
    if(typeof value == 'undefined'){

      result = {};
      $("*[data-type]", this).each(function(){

        var name = this.getAttribute("data-name");
        if(name != null){
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
        if(name != null){
          var val = $.val(name, value, { d:'' });
          $(this).val(val);
        }

      })

    }

  }

})