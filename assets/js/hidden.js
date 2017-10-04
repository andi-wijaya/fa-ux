$.fn.extend({

  hidden: function (options) {

    var name = $.val('name', options, { d:'' });

    $(this).each(function () {

      var html = [];
      $(this).html(html.join(''));
      $(this).attr('data-type', 'hidden');
      $(this).attr('data-name', name);
      $(this).addClass('hidden');
      $(this).data('options', options);

    });

  },

  hidden_val:function(val){

    if(typeof val == 'undefined'){

      var results = [];
      $(this).each(function(){
        results.push($(this).data('value'));
      });
      return results.length > 1 ? results : (results.length == 1 ? results[0] : '');

    }

    else{

      $(this).each(function(){

        $(this).data('value', val);

      })

    }

  },

  hidden_reset:function(){

    $(this).hidden_val('');

  },

});