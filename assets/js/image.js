$.fn.extend({

  image:function(options){

    var className = $.val('class', options, { d:'' });
    var height = $.val('height', options, { d:'200px' });
    var name = $.val('name', options, { d:'' });
    var width = $.val('width', options, { d:'200px' });

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='file' accept='image/*'/>");
      html.push("<canvas/>");
      html.push("<img/>");

      $(el).addClass('image');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'image');
      $(el).data('options', options);
      $(el).css({ width:width, height:height });

      if($(el).attr('data-name') == null) $(el).attr('data-name', name);

      $('input', el).change(function(){

        if(this.files.length == 1){

          var file = this.files[0];

          $('img', el).remove();
          $(el).append("<img />");
          $('img', el).css({ 'max-width':width, 'max-height':height });
          var img = $('img', el)[0];

          img.file = file;
          var reader = new FileReader();
          reader.onload = (function(aImg) {
            return function(e) {
              aImg.src = e.target.result;
            };
          })(img);
          reader.readAsDataURL(file);

        }

      });
      $('input', el).on('dragenter', function(){

        $(el).addClass('obj-hover');

      });
      $('input', el).on('dragleave', function(){

        $(el).removeClass('obj-hover');

      });
      $('input', el).on('drop', function(){

        $(el).removeClass('obj-hover');

      });

      $('img', el).css({ 'max-width':width, 'max-height':height });

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