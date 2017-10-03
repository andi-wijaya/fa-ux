$.extend({


  __sticky_store:{},

  sticky_add:function(el){

    var stickyid = 'sticky' + $.uniqid();
    $(el).css({ height:$(el).outerHeight() });
    $(el).attr('data-stickyid', stickyid);

    $.__sticky_store[stickyid] = $(el)[0].offsetTop;

    $(window).on('scroll.sticky',function(){

      for(var stickyid in $.__sticky_store){
        var top = $.__sticky_store[stickyid];
        if(document.body.scrollTop > top){
          $('.stickybar').append($("*[data-stickyid=" + stickyid + "]").children());
        }
        else{
          $("*[data-stickyid=" + stickyid + "]").append($('.stickybar').children());
        }
      }

    });

  }

})