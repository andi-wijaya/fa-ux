$.fn.extend({

  spinner:function(options){

    var size = $.val('size', options, { defaultvalue:'20px' });

    this.each(function(){

      var html = [];
      html.push('<div class="sk-fading-circle" style="width:' + size + ';height:' + size + ';">');
      html.push('<div class="sk-circle1 sk-circle"></div>');
      html.push('<div class="sk-circle2 sk-circle"></div>');
      html.push('<div class="sk-circle3 sk-circle"></div>');
      html.push('<div class="sk-circle4 sk-circle"></div>');
      html.push('<div class="sk-circle5 sk-circle"></div>');
      html.push('<div class="sk-circle6 sk-circle"></div>');
      html.push('<div class="sk-circle7 sk-circle"></div>');
      html.push('<div class="sk-circle8 sk-circle"></div>');
      html.push('<div class="sk-circle9 sk-circle"></div>');
      html.push('<div class="sk-circle10 sk-circle"></div>');
      html.push('<div class="sk-circle11 sk-circle"></div>');
      html.push('<div class="sk-circle12 sk-circle"></div>');
      html.push('</div>');

      $(this).html(html.join(''));

    })

  }

})