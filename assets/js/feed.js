$.fn.extend({

  feed:function(options){

    $(this).each(function(){

      var className = $.val('class', options, { d:'' });
      var src = $.val('src', options, { d:'' });

      var html = [];

      $(this).addClass('feed');
      $(this).addClass(className);
      $(this).html(html.join(''));
      $(this).data('options', options);

      if(src != '') $(this).feed_load();

    })

  },

  feed_val:function(value){

    if(typeof value == 'undefined'){



    }

    else{



    }

  },

  feed_load:function(){

    $(this).each(function(){

      if(!$(this).hasClass('feed')) return;

      var instance = this;
      var options = $(this).data('options');
      var src = $.val('src', options, { d:'' });

      $.api_post(src, [], function(response){

        // Render data
        var data = $.val('data', response, { d:[] });
        var page = $.val('page', response, { d:1 });
        var append = page == 1 ? false : true;
        $(instance).feed_val(data, append);

        // Check if next page exists
        // var next_page = $.val('next_page', response, { d:page });
        // if(next_page > page){
        //   $('.grid-footer', instance).html("<div class='load-more align-center padding10'>Load More...</div>");
        //   $('.load-more', instance).on('click', function(){
        //     $(instance).grid_load({ page:next_page });
        //   });
        // }
        // else{
        //   $('.grid-footer', instance).html("");
        // }

      });

    })

  }

})