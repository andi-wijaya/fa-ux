$.fn.extend({

  webeditor:function(options){

    var height = $.val('height', options);

    this.each(function(){

      var uid = $.uniqid();

      var html = [];
      html.push($.p('<textarea id="$1"></textarea>', [ 'webeditor' + uid ]));

      $(this).addClass('webeditor');
      $(this).html(html.join(''));
      $(this).data('options', options);

      CKEDITOR.replace('webeditor' + uid, {
        height:height
      });

    });

  },

  webeditor_get:function(value){

    var results = [];
    this.each(function(){

      var tid = $('textarea', this).attr('id');
      if(typeof CKEDITOR.instances[tid] != 'undefined'){
        var data = CKEDITOR.instances[tid].getData();
        results.push(data);
      }

    });
    return results.length == 1 ? results[0] : (results.length > 1 ? results : null);

  },

  webeditor_set:function(value){

    this.each(function(){

      var tid = $('textarea', this).attr('id');
      if(typeof CKEDITOR.instances[tid] != 'undefined') {
        CKEDITOR.instances[tid].setData(value);
      }

    });

  }

});