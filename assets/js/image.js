$.fn.extend({

  image:function(options){

    var className = $.val('class', options, { d:'' });
    var height = $.val('height', options, { d:'50px' });
    var name = $.val('name', options, { d:'' });
    var width = $.val('width', options, { d:'50px' });

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<img />");

      $(el).attr('data-type', 'image');
      $(el).addClass('image');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).data('options', options);
      $(el).css({ width:width, height:height });

    });

  },

  image_set:function(value){

    this.each(function(){

      var el = this;
      $('img', el).attr('src', value);

    })

  },

  image_get:function(){

    var value = [];
    this.each(function(){

      var el = this;
      var img = $('img', el)[0];
      if(img.src != ''){
        var canvas = $('canvas', el)[0];
        var ctx = canvas.getContext('2d');
        canvas.height = $('img', el).outerHeight();
        canvas.width = $('img', el).outerWidth();
        ctx.drawImage(img, 0, 0);
        try{
          var dataURL = canvas.toDataURL();
          value.push(dataURL);
        }
        catch(e){
          $.warn("[Image Exception] " + e.message);
        }
      }

    })
    return value.length == 1 ? value[0] : (value.length == 0 ? '' : value);

  }

})