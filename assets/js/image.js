$.fn.extend({

  image:function(options){

    var className = $.val('class', options, { d:'' });
    var height = $.val('height', options, { d:'50px' });
    var name = $.val('name', options, { d:'' });
    var value = $.val('value', options, { d:'' });
    var width = $.val('width', options, { d:'50px' });
    var readonly = $.val('readonly', options, { d:false });

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<img src=\"" + value + "\"/>");
      html.push("<input type='file' accept='image/*'/>");
      html.push("<span class='image-upload glyphicons glyphicons-folder-open'></span>");

      $(el).attr('data-type', 'image');
      $(el).attr('data-name', name);
      $(el).addClass('image');
      $(el).addClass(className);
      if(readonly) $(el).addClass('readonly');
      $(el).html(html.join(''));
      $(el).data('options', options);
      $('img', el).css({ width:width, height:height });

      $('.image-upload').on('click', function(){
        $(this).prev().click();
      })

      $('input[type=file]', this).on('change', function(e){

        var input = this;

        // FileReader support
        if (FileReader && this.files && this.files.length) {
          var fr = new FileReader();
          fr.onload = function () {
            input.previousElementSibling.src = fr.result;



          }
          fr.readAsDataURL(this.files[0]);
        }

      })

      $('img', this).error(function(){
        $(this).parent().addClass('no-image');
      })

    });

  },

  image_val:function(value){

    if(typeof value == 'undefined'){

      var result = [];
      this.each(function(){
        result.push($('input[type=file]', this)[0].files[0]);
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');

    }

    else{

      this.each(function(){
        $('img', this).attr('src', value);
      })

    }

  },

});