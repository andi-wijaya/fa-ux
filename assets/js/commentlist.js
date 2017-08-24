$.fn.extend({

  commentlist:function(options){

    var onsubmit = $.val('onsubmit', options);

    $(this).each(function(){

      var instance = this;

      var html = [];
      html.push("<div class='commentlist-write'>");
      html.push("<input type='text' placeholder='Write comment here...' />");
      html.push("</div>");
      html.push("<div class='commentlist-list'></div>");

      $(this).addClass('commentlist');
      $(this).html(html.join(''));

      $(this).data('options', options);

      $("input[type='text']", this).on('keyup', function(e){

        if(e.keyCode == 13){

          if(e.shiftKey){
          }
          else{
            if(this.value != ''){
              $.fire_event(onsubmit, [ this.value ], instance);
              this.value = '';
              $(this).blur();
            }
          }

        }

      })

    });

  },

  commentlist_add:function(obj){

    $(this).each(function(){

      var options = $(this).data('options');
      var onremove = $.val('onremove', options);

      var id = $.val('id', obj);
      var comment = $.val('comment', obj);
      var full_name = $.val('full_name', obj);
      var createdon = $.val('createdon', obj);
      var removable = $.val('removable', obj, { d:0 });

      if(!comment || !full_name) return;

      var html = [];
      html.push("<div class='commentlist-item' data-id='" + id + "'>");
      html.push("<p style='word-wrap: break-word;'><b>" + full_name + "</b> " + comment + "</p>");
      html.push("<div class='commentlist-item-footer'>");
      html.push("<label class=''>" + createdon + "</label>");
      if(removable){
        html.push("<span class='width5 height5'>&nbsp;</span>");
        html.push("<span class='comment-item-remove selectable hoverable'>Remove</span>");
      }
      html.push("</div>");
      html.push("</div>");
      $('.commentlist-list', this).append(html.join(''));

      $('.comment-item-remove', $('.commentlist-list', this)).on('click', function(){
        var id = $(this).closest('.commentlist-item').attr('data-id');
        $.fire_event(onremove, [ id ], this);
      })

    })

  },

  commentlist_set:function(comments){

    $(this).each(function(){

      var options = $(this).data('options');
      var onremove = $.val('onremove', options);

      var html = [];
      if($.type(comments) == 'array'){
        for(var i = 0 ; i < comments.length ; i++){

          var comment_obj = comments[i];
          var id = $.val('id', comment_obj);
          var comment = $.val('comment', comment_obj);
          var full_name = $.val('full_name', comment_obj);
          var createdon = $.val('createdon', comment_obj);
          var removable = $.val('removable', comment_obj, { d:0 });

          if(!comment || !full_name) continue;

          html.push("<div class='commentlist-item' data-id='" + id + "'>");
          html.push("<p style='word-wrap: break-word;'><b>" + full_name + "</b> " + comment + "</p>");
          html.push("<div class='commentlist-item-footer'>");
          html.push("<label class=''>" + createdon + "</label>");
          if(removable){
            html.push("<span class='width5 height5'>&nbsp;</span>");
            html.push("<span class='comment-item-remove selectable hoverable'>Remove</span>");
          }
          html.push("</div>");
          html.push("</div>");

        }
      }
      $('.commentlist-list', this).html(html.join(''));

      $('.comment-item-remove', $('.commentlist-list', this)).on('click', function(){

        var id = $(this).closest('.commentlist-item').attr('data-id');
        $.fire_event(onremove, [ id ], this);

      })

    })

  }

})