$.fn.extend({

  chart:function(options){

    var name = $.val('name', options);
    var height = $.val('height', options);
    var width = $.val('width', options);

    this.each(function(){

      var el = this;

      var css = {};
      css['height'] = height;
      css['width'] = width;

      var html = [];
      $(el).addClass('chart');
      $(this).html(html.join(''));
      $(this).css(css);
      $(el).attr('data-type', 'chart');
      $(el).attr('data-name', name);
      $(el).data('options', options);

    });


  },

  chart_set:function(value){

    this.each(function(){

      var el = this;
      var options = $(el).data('options');
      var type = $.val('type', options, { default_value:"line" });

      switch(type){

        case 'bar':
          $(this).chart_bar_set(value);
          break;

        default:
          $(this).chart_line_set(value);
          break;

      }

    })

  },

  chart_bar_set:function(value){


    this.each(function() {

      var el = this;
      var options = $(el).data('options');
      var height = $(el).outerHeight();
      var width = $(el).outerWidth();
      var padding = $.val('padding', options, { default_value:10 });

      var x_count = $.array_key_count(value);
      var min_val = $.object_value_min(value);
      var max_val = $.object_value_max(value);
      var x_start = padding;
      var x_end = width - padding;
      var x_size = x_end - x_start;
      var bar_width = (width * .8) / x_count;
      var x_space = (x_size - (bar_width * x_count)) / (x_count + 1);
      var y_start = height - padding;
      var y_end = 10;
      var y_size = y_start - y_end;
      var y_distance = y_size / (max_val - min_val);

      var html = [];

      html.push($.p('<svg width="$1" height="$2">', [ width, height ]));

      // Bottom line
      var x1 = x_start;
      var x2 = x_end;
      var y1 = y_start, y2 = y_start;
      html.push($.p('<line x1="$x1" y1="$y1" x2="$x2" y2="$y2" style="stroke:rgb(0,0,0);stroke-width:1" />', [ x1, y1, x2, y2 ]));

      // Bar
      var counter = 0;
      for(var key in value){

        var val = value[key];
        var w = bar_width;
        var h = y_distance * val;
        if(h < 5) h = 5;
        var x = counter * (x_space + bar_width) + x_space;
        var y = y_start - h;

        html.push($.p('<rect x="$1" y="$1" width="$1" height="$1" stroke="#4A89DC" stroke-width="2" fill="rgba(74, 137, 220, .2)" data-key="$1" data-value="$1" onmouseover="$1" onmouseout="$1"/>',
          [ x, y, w, h, key, val, "$.chart_line_mouseover.call(this)", "$.chart_line_mouseout.call(this)" ]));

        counter++;
      }

      html.push("</svg>");

      $(el).html(html.join(''));


    });

  },

  chart_line_set:function(value){

    this.each(function(){

      var el = this;
      var options = $(el).data('options');
      var height = $(el).outerHeight();
      var width = $(el).outerWidth();
      var x_count = $.array_key_count(value);
      var min_val = $.object_value_min(value);
      var max_val = $.object_value_max(value);

      var padding = $.val('padding', options, { default_value:10 });
      var x_start = padding;
      var x_end = width - padding;
      var x_size = x_end - x_start;
      var x_distance = x_size / (x_count - 1);

      var y_start = height - padding;
      var y_end = 10;
      var y_size = y_start - y_end;
      var y_distance = y_size / (max_val - min_val);

      //console.log([ width, height, x_count, x_size, y_size, min_val, max_val, y_distance ]);

      var html = [];

      html.push($.p('<svg width="$1" height="$2">', [ width, height ]));

      // Bottom line
      var x1 = x_start;
      var x2 = x_end;
      var y1 = y_start, y2 = y_start;
      html.push($.p('<line x1="$x1" y1="$y1" x2="$x2" y2="$y2" style="stroke:rgb(0,0,0);stroke-width:1" />', [ x1, y1, x2, y2 ]));

      // H line
      var counter = 1;
      for(var key in value){
        var cx = Math.round(x_start + (counter * x_distance));

        html.push($.p('<line x1="$1" y1="$1" x2="$1" y2="$1" style="stroke:rgba(0, 0, 0, .05);stroke-width:1" />', [ cx, y_start, cx, y_end ]));

        counter++;
      }


      // Background
      var counter = 0;
      var d = [];
      d.push($.p("M$1 $2", [ Math.round(x_start + (counter * x_distance)), y_start ]));
      for(var key in value){

        var val = value[key];
        var cx = Math.round(x_start + (counter * x_distance));
        var cy = Math.round(y_start - (val * y_distance));

        d.push($.p("L$1 $2", [ cx, cy ]));

        counter++;

      }
      d.push($.p("M$1 $2 Z", [ cx, y_start ]));
      html.push($.p('<path d="$1" stroke-width="0" stroke="transparent" fill="rgba(74, 137, 220, .2)"/>', [ d.join(' ') ]));

      // Path
      var counter = 0;
      var d = [];
      for(var key in value){

        var val = value[key];
        var cx = Math.round(x_start + (counter * x_distance));
        var cy = Math.round(y_start - (val * y_distance));

        if(counter == 0)
          d.push($.p("M$1 $2", [ cx, cy ]));
        else
          d.push($.p("L$1 $2", [ cx, cy ]));

        counter++;

      }
      html.push($.p('<path d="$1" stroke-width="2" stroke="#4A89DC" fill="transparent"/>', [ d.join(' ') ]));

      // Circle
      var counter = 0;
      for(var key in value){

        var val = value[key];
        var cx = x_start + (counter * x_distance);
        var cy = y_start - (val * y_distance);

        //console.log([ val, cx, cy ]);

        html.push($.p('<circle cx="$1" cy="$1" r="1" stroke="#4A89DC" stroke-width="2" fill="#4A89DC" onmouseover="$1" onmouseout="$1" data-key="$1" data-value="$1"/>',
          [ cx, cy, "$.chart_line_mouseover.call(this)", "$.chart_line_mouseout.call(this)", key, val ]));

        counter++;
      }

      html.push("</svg>");

      $(el).html(html.join(''));

    });

  }

});

$.extend({

  chart_line_mouseover:function(){

    $(this).attr({ r:2 });

    // var cx = parseFloat($(this).attr('cx')) + 20;
    // var cy = $(this).attr('cy');
    // var el = $(this).closest('.chart');
    // var tooltip = $('.tooltip', el);
    // if(tooltip.length < 1){
    //   $(el).append('<span class="tooltip"></span>');
    //   var tooltip = $('.tooltip', el);
    // }
    // $(tooltip).css({ left:cx, top:cy });
    // $(tooltip).html(key + "<br />" + val);

    var key = $(this).attr('data-key');
    var val = $(this).attr('data-value');
    $.tooltip(this, key + "<br />" + val);

  },

  chart_line_mouseout:function(){

    $(this).attr({ r:1 });

    //var el = $(this).closest('.chart');
    //$('.tooltip', el).remove();
    $.tooltip_remove();

  },

})