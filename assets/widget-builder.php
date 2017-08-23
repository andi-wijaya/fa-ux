<?php



?>
<div class="content">

  <div class="widget-cont"></div>

</div>

<script type="text/javascript">

  app = typeof app == 'undefined' ? {} : app;

  function startup(){

    $('.widget-cont').html('');

    // Render widget
    var widgets = $.val('default_widgets', app);
    var html = [];
    if($.type(widgets) == 'array'){
      for(var i = 0 ; i < widgets.length ; i++){

        var widget = widgets[i];
        var viewText = $.val('view', widget);

        var view = $.val(viewText, $.val('views', app));
        var title = $.val('title', view, { default_value:'Untitled' });
        var src = $.val('src', view);
        var type = $.val('type', view);

        var widgetClass = widget['class'];
        html.push($.p('<div class="widget $1" data-idx="$1">', [ widgetClass, i ]));
        html.push($.p('</div>', [ ]));

      }
      $('.widget-cont').html(html.join(''));
    }


    $('.widget').each(function(){

      var instance = this;
      var idx = parseInt($(instance).attr('data-idx'));

      var widget = widgets[idx];
      var viewText = $.val('view', widget);
      var view = $.val(viewText, $.val('views', app));
      $(instance).widget(view);

    });


  }

  $(function(){

    startup();

  });

</script>