$.fn.extend({

  feed:function(options){

    $(this).each(function(){

      var className = $.val('class', options, { d:'' });
      var src = $.val('src', options, { d:'' });
      var autoload = $.val('autoload', options, { d:false });

      var html = [];
      html.push("<div class='feed-content'></div>");
      html.push("<div class='feed-footer'></div>");

      $(this).addClass('feed');
      $(this).addClass(className);
      $(this).html(html.join(''));
      $(this).data('options', options);

      if(autoload) $(this).feed_load();

    })

  },

  feed_val:function(value, append){

    if(typeof value == 'undefined'){



    }

    else{

      $(this).each(function(){

        var options = $(this).data('options');
        var src = $.val('src', options, { d:'' });
        var template = $.val('template', options, { d:'' });

        if($.type(value) == 'array' && value.length > 0){

          var uid = 'feed_group_' + $.uniqid();
          var section = document.createElement("div");
          section.setAttribute("data-feed-group-id", uid);

          var html = [];
          for(var i = 0 ; i < value.length ; i++)
            html.push("<div class='feed-item'></div>");
          section.innerHTML = html.join('');
          $('.feed-content', this).append(section);

          for(var i = 0 ; i < value.length ; i++){
            var obj = value[i];
            var feed_item = section.childNodes[i];
            $.fire_event(template, [ obj ], feed_item);
          }

        }

      })


    }

  },

  feed_load:function(params){

    $(this).each(function(){

      if(!$(this).hasClass('feed')) return;

      var instance = this;
      var options = $(this).data('options');
      var src = $.val('src', options, { d:'' });

      if(src != ''){
        $.api_post(src, [], function(response){

          // Render data
          var data = $.val('data', response, { d:[] });
          var page = $.val('page', response, { d:1 });
          var append = page == 1 ? false : true;
          $(instance).feed_val(data, append);

          // Check if next page exists
          var max_page = $.val('max_page', response, { d:page });
          if(max_page >= page + 1){
            $('.feed-footer', instance).html("<div class='load-more align-center padding10'>Load More...</div>");
            $('.load-more', instance).on('click', function(){
              $(instance).feed_load({ page:page + 1 });
            });
          }
          else{
            $('.feed-footer', instance).html("");
          }

        });
      }

    })

  }

});