$.fn.extend({

  codeeditor:function(options){

    var height = $.val('height', options, { d:"200px" });
    var width = $.val('width', options, { d:"300px" });
    var name = $.val('name', options, { d:"" });
    var value = $.val('value', options, { d:"300px" });

    this.each(function(){

      var uid = $.uniqid();

      var html = [];
      html.push($.p('<textarea id="$1""></textarea>', [ 'codeeditor-text-' + uid ]));

      $(this).addClass('codeeditor');
      $(this).html(html.join(''));
      $(this).css({
        width:width,
        height:height
      });
      // $('textarea', this).css({
      //   width:width,
      //   height:height
      // });
      $(this).codeeditor_attr({
        name:name
      })

      var editor = CodeMirror.fromTextArea(document.getElementById('codeeditor-text-' + uid), {
        lineNumbers: true,
        mode: 'text/x-mariadb',
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets : true,
        autofocus: true,
      });

    });

  },

  codeeditor_get:function(){

    var value = [];
    $(this).each(function(){

      value.push($('textarea', this).val());

    });
    return value.length == 1 ? value[0] : (value.length > 1 ? value : '');

  },

  codeeditor_set:function(value){

    $(this).each(function(){

      $('textarea', this).val(value);

    });

  },

  codeeditor_attr:function(attr){

    this.each(function(){

      var css = {};
      var textareaCss = {};
      var attr = {};

      for(var key in attr){

        var value = attr[key];
        switch(key){
          case 'name': attr['name'] = value;
        }

      }

      $(this).attr(attr);
      $(this).css(css);
      $('textarea', this).css(textareaCss);


    });

  },

});