$.fn.extend({

  hidden: function (options) {

    $(this).each(function () {

      var html = [];
      $(this).html(html.join(''));
      $(this).attr('data-type', 'hidden');
      $(this).addClass('hidden');
      $(this).data('options', options);

    });

  },

  hidden_val:function(val){

    if(typeof val == 'undefined'){



    }

    else{

      $(this).each(function(){



      })

    }


  }

});