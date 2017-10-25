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
      html.push("<img class='image-img'/>");
      html.push("<input type='file' accept='image/*'/>");
      html.push("<span class='image-upload glyphicons glyphicons-folder-open'></span>");
      html.push("<span class='popup'><img class='image-popup-img'/></span>");

      $(el).attr('data-type', 'image');
      $(el).attr('data-name', name);
      $(el).addClass('image');
      $(el).addClass(className);
      if(readonly) $(el).addClass('readonly');
      $(el).html(html.join(''));
      $(el).data('options', options);
      $('.image-img', el).css({ width:width, height:height });
      $('.image-popup-img', this).css({ 'max-width':window.innerWidth * .8, 'max-height':window.innerHeight * .8 });

      $('.image-upload', this).on('click', function(e){
        e.preventDefault();
        $(this).prev().click();
      });

      $('.image-img', this).on('click', function(e){

        e.preventDefault();
        e.stopPropagation();

        var popup = $('.popup', $(this).closest('.image'));
        $('.image-popup-img', popup).attr('src', $(this).attr('src'));
        $.popup_open(popup);

      });

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

      });

      $('.image-img', this).error(function(){
        $(this).parent().addClass('no-image');
      });

      $('.image-img', this).droppable({
        accept:"image/jpg,image/jpeg,image/png",
        ondrop:function(e, data){
          var instance = $(this).closest('.image');
          var options = $(instance).data('options');
          var readonly = $.val('readonly', options, { d:false });
          if(readonly || readonly === 1) return;
          this.src = data;
        }
      });

      if(value != '') $(this).image_val(value);

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
        $('.image-img', this).attr('src', value);
      })

    }

  },

  image_reset:function(){

    $(this).image_val('');

  },

  image_validate:function(){

    console.log([ 'image_validate' ]);

    var valid = true;
    $(this).each(function(){

      var options = $(this).data('options');
      var required = $.val('required', options, { d:false });

      var value = $('.image-img', this).attr('src');
      if(required && value == ''){
        valid = false;
        $(this).addClass('invalid');
      }
      else{
        $(this).removeClass('invalid');
      }

    })
    return valid;

  }

});