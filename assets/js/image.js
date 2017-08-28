$.fn.extend({

  image:function(options){

    var className = $.val('class', options, { d:'' });
    var height = $.val('height', options, { d:'50px' });
    var name = $.val('name', options, { d:'' });
    var value = $.val('value', options, { d:'' });
    var width = $.val('width', options, { d:'50px' });

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<img src=\"" + value + "\"/>");

      $(el).attr('data-type', 'image');
      $(el).attr('data-name', name);
      $(el).addClass('image');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).data('options', options);
      $('img', el).css({ width:width, height:height });

    });

  },

  image_val:function(value){

    if(typeof value == 'undefined'){

      var result = [];
      this.each(function(){
        result.push($('img', this).attr('src'));
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');

    }

    else{

      this.each(function(){
        $('img', this).attr('src', value);
      })

    }

  },

})