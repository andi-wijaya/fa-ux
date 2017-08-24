$.fn.extend({

  feed:function(options){

    $(this).each(function(){

      var autoload = $.val('autoload', options, { d:true });

      var html = [];
      $(this).html(html.join(''));
      $(this).attr('data-type', 'feed');
      $(this).addClass('feed');
      $(this).data('options', options);

      if(autoload) $(this).feed_load();

    });

  },

  feed_load:function(){

    $(this).each(function(){

      var instance = this;
      var options = $(this).data('options');
      var src = $.val('src', options, { d:'' });
      if(src.length > 0){
        $.api_post(src, [], function(response){

          var data = $.val('data', response);
          $(instance).feed_set(data);

        })
      }

    });

  },

  feed_set:function(data){

    $(this).each(function(){

      var instance = this;
      var options = $(this).data('options');
      var html_callback = $.val('html_callback', options);
      var html = [];
      $(instance).html('');
      $(data).each(function(){
        var item_el = document.createElement('div');
        html.push($.fire_event(html_callback, [ this, instance ], item_el));
        $(instance).append(item_el);
      })

    });

  }

});