$.fn.extend({

  autocomplete:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var src = $.val('src', options, { d:'' });
    var width = $.val('width', options);
    var placeholder = $.val('placeholder', options, { d:"" });

    var css = {};
    if(width != null) css['width'] = width;

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='text' placeholder=\"" + placeholder + "\"/>");
      html.push("<span class='icon fa fa-search hoverable selectable'></span>");
      html.push("<span class='popup'></span>");

      $(el).addClass('autocomplete');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).css(css);
      $(el).attr('data-name', name);
      $(el).attr('data-type', 'autocomplete');
      $(el).data('options', options);

      $("input[type='text']", el).on('keyup', function(e){

        var el = $(this).closest('.autocomplete');
        if($(el).hasClass('readonly')) return;
        var options = $(el).data('options');
        var readonly = $.val('readonly', options);

        if(!readonly && src.length > 0){

          var params = {};
          params['key'] = this.value;

          $.api_get(src, params, function(response){

            var data = $.val('data', response);
            var html = [];
            if($.type(data) == 'array')
              for(var i = 0 ; i < data.length ; i++){
                var item = data[i];
                var value = $.val('value', item, { d:'' });
                var text = $.val('text', item, { d:value });
                html.push("<div class='item' data-value=\"" + value + "\">");
                html.push("<label>" + text + "</label>");
                html.push("</div>");
              }
            $('.popup', el).html(html.join(''));
            $('.item', $('.popup', el)).on('click',function(){

              var value = this.getAttribute('data-value');
              var text = $('label', this).text();
              var obj = { value:value, text:text };

              $(el).autocomplete_val(obj);
            });
            $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });

          });
        }

      });

    });

  },

  autocomplete_val:function(val, arg1){

    if(typeof val == 'undefined'){

      var value = [];
      $(this).each(function(){
        var options = $(this).data('options');
        var multiple = $.val('multiple', options, { d:false });

        if(multiple){

          $('.text', this).each(function(){
            value.push(this.getAttribute("data-value"));
          })

        }
        else{

          var t = $('input', this).val();
          var v = $(this).data('value');
          if(v == null) v = t;
          value.push(v);

        }

      })
      return value.length == 1 ? value[0] : (value.length > 1 ? value : '');

    }

    else{

      $(this).each(function(){

        var options = $(this).data('options');
        var multiple = $.val('multiple', options, { d:false });

        var text = value = '';
        if($.type(val) == 'object'){
          value = $.val('value', val, { d:'' });
          text = $.val('text', val, { d:value });
        }
        else{
          text = value = val;
        }

        if(multiple){

          var clear = typeof arg1 != 'undefined' && arg1 === true ? true : false;
          if(clear) $('.text', this).remove();

          var current_val = $(this).val();
          if(!$.in_array(value, current_val) && value !== ''){
            $("<span class='text' data-value=\"" + value + "\">" + text + "<span class='icon-remove glyphicons glyphicons-remove'></span></span>").insertBefore($('input', this));
            $('.glyphicons-remove', $('input', this).prev()).on('click', function(){
              $(this).parent().remove();
            })
          }

          $('input', this).val('');

        }
        else{
          $('input', this).val(text);
          $(this).data('value', value);
        }

      })

    }

  },

  autocomplete_readonly:function(val){

    if(typeof val == 'undefined'){

      return $(this).hasClass('readonly') ? true : false;

    }
    else{
      if(val){
        $(this).addClass('readonly');
        $('input', this).attr('readonly', true);
        $('input', this).data('placeholder', $('input', this).attr('placeholder'));
        $('input', this).attr('placeholder', '');
      }
      else{
        $(this).removeClass('readonly');
        $('input', this).attr('readonly', false);
        $('input', this).attr('placeholder', $('input', this).data('placeholder'));
      }
    }


  },

  autocomplete_reset:function(){

    $(this).autocomplete_val('', true);

  }

});$.fn.extend({

  calendar: function (options) {

    this.each(function(){

      var el = this;
      var value = $.val('value', options, { d:'2017-01-01' });
      value = $.date('j M Y', $.strtotime(value));

      var html = [];
      html.push("<input type='text' value='" + value + "' readonly/>");
      html.push("<span class='icon fa fa-calendar'></span>");
      html.push("<span class='popup'>Calendar</span>");

      $(el).addClass('calendar');
      $(el).html(html.join(''));
      $(el).attr('data-type', 'calendar');

      $('.icon', this).click(function(e){
        e.preventDefault();
        e.stopPropagation();
      });
      $('.popup', this).click(function(e){
        e.preventDefault();
        e.stopPropagation();
      });

    });

  }

});

$.extend({

  calendar_open:function(params){

    /*
     * refEl : HTMLElement
     * value : String, format:Ymd-Ymd
     */

    var refEl = params.refEl;
    var value = params.value;

    var popup = $('#calendar');
    if(popup.length == 0){
      popup = document.createElement('div');
      popup.id = 'calendar';
      popup.className = 'popup';
      document.body.appendChild(popup);
      popup = $('#calendar');
    }
    popup = popup[0];
    $(popup).data('params', params);
    $.calendar_set(value);
    $.popup_open(popup, refEl);

  },
  calendar_set:function(value){

    var params = $('#calendar').data('params');
    var type = $.val('type', params, { d:'' });

    switch(type){
      case 'range': $.calendar_set_range(value); break;
      default: $.calendar_set_single(value); break;

    }


  },
  calendar_set_single:function(value){

    var popup = $('#calendar');
    $(popup).attr('data-value', value);
    var month = $.date('n', $.strtotime(value));
    var year = $.date('Y', $.strtotime(value));
    var date = $.date('j', $.strtotime(value));
    var start_day = $.start_day_of_month(year, month) % 7;
    var last_date_of_month = $.last_date_of_month(year, month);
    var date_label = $.date('M Y', $.strtotime(value));

    var params = $(popup).data('params');
    var onchange = params.onchange;

    var html = [];
    html.push("<table>");
    html.push("<tr>");
    html.push("<td><span class='calendar-prev fa fa-caret-left padding5'></span></td>");
    html.push("<td colspan='5'><span class='date-label'>" + date_label + "</span></td>");
    html.push("<td><span class='calendar-next fa fa-caret-right padding5'></span></td>");
    html.push("</tr>");
    html.push("<tr>");
    html.push("<td>Sun</td>");
    html.push("<td>Mon</td>");
    html.push("<td>Tue</td>");
    html.push("<td>Wed</td>");
    html.push("<td>Thu</td>");
    html.push("<td>Fri</td>");
    html.push("<td>Sun</td>");
    html.push("</tr>");

    var current_date = 1;
    for(var i = 0 ; i < 6 ; i++){

      html.push("<tr>");
      for(var j = 0 ; j < 7 ; j++){

        if(start_day > 0){
          html.push("<td></td>");
          start_day--;
        }
        else if(current_date <= last_date_of_month){
          html.push(current_date == date ? "<td class='day active'>" + current_date + "</td>" :
            "<td class='day'>" + current_date + "</td>");
          current_date++;
        }
        else
          html.push("<td></td>");

      }
      html.push("</tr>");

    }

    html.push("</table>");

    popup.html(html.join(''));

    $('.day', popup).click(function(e){

      e.preventDefault();
      e.stopPropagation();

      var popup = $(this).closest('#calendar');
      var month_year = $(popup).attr('data-value');
      var date = this.innerHTML;
      var month = parseInt($.date('n', $.strtotime(month_year)));
      var year = $.date('Y', $.strtotime(month_year));
      var d = $.date('j M Y', $.mktime(0, 0, 0, month, date, year));
      $.fire_event(onchange, [ d ], popup);

      $.popup_close(popup);

    });

    $('.calendar-prev', popup).click(function(e){

      e.preventDefault();
      e.stopPropagation();

      var popup = $(this).closest('#calendar');
      var month_year = $(popup).attr('data-value');
      var month = parseInt($.date('n', $.strtotime(month_year)));
      var year = parseInt($.date('Y', $.strtotime(month_year)));
      var d = parseInt($('td.active', popup).html());

      var next_month = $.date('Y-m-d', $.mktime(0, 0, 0, month - 1, d, year));
      $.calendar_set(next_month);

    });

    $('.calendar-next', popup).click(function(e){

      e.preventDefault();
      e.stopPropagation();

      var popup = $(this).closest('#calendar');
      var month_year = $(popup).attr('data-value');
      var month = parseInt($.date('n', $.strtotime(month_year)));
      var year = parseInt($.date('Y', $.strtotime(month_year)));
      var d = parseInt($('td.active', popup).html());

      var next_month = $.date('Y-m-d', $.mktime(0, 0, 0, month + 1, d, year));
      $.calendar_set(next_month);

    });

  },
  calendar_set_range:function(value, calendar0_value, calendar1_value){

    var popup = $('#calendar');
    $(popup).attr('data-value', value);

    var params = $(popup).data('params');
    var onchange = params.onchange;

    value = value.split('-');
    var d0 = value[0];
    var d1 = value[1];

    if($.date('Y', $.strtotime(d0)) == '1970') d0 = $.date('Y-m-d');
    if($.date('Y', $.strtotime(d1)) == '1970') d1 = $.date('Y-m-d');

    var d0_month = [], d0_month2 = [], d0_year = [], d0_date = [], d0_start_day = [], d0_last_date_of_month = [],
      d0_date_label = [];

    var d0_month0 = $.date('Y', $.strtotime(calendar0_value)) != '1970' ? calendar0_value : d0;
    var d0_month1 = $.date('Y', $.strtotime(calendar1_value)) != '1970' ? calendar1_value : d1;
    if($.date('Ym', $.strtotime(d0_month1)) == $.date('Ym', $.strtotime(d0_month0)))
      d0_month1 = $.date('Y-m-d', $.mktime(0, 0, 0, parseInt($.date('n', $.strtotime(d0_month1))) + 1, $.date('j', 1, $.date('Y', $.strtotime(d0_month1)))));

    d0_month[0] = $.date('n', $.strtotime(d0_month0));
    d0_month2[0] = $.date('m', $.strtotime(d0_month0));
    d0_year[0] = $.date('Y', $.strtotime(d0_month0));
    d0_date[0] = $.date('j', $.strtotime(d0_month0));
    d0_start_day[0] = $.start_day_of_month(d0_year[0], d0_month[0]) % 7;
    d0_last_date_of_month[0] = $.last_date_of_month(d0_year[0], d0_month[0]);
    d0_date_label[0] = $.date('M Y', $.strtotime(d0_month0));

    d0_month[1] = $.date('n', $.strtotime(d0_month1));
    d0_month2[1] = $.date('m', $.strtotime(d0_month1));
    d0_year[1] = $.date('Y', $.strtotime(d0_month1));
    d0_date[1] = $.date('j', $.strtotime(d0_month1));
    d0_start_day[1] = $.start_day_of_month(d0_year[1], d0_month[1]) % 7;
    d0_last_date_of_month[1] = $.last_date_of_month(d0_year[1], d0_month[1]);
    d0_date_label[1] = $.date('M Y', $.strtotime(d0_month1));

    var html = [];

    for(var i = 0 ; i < 2 ; i++){

      html.push("<table class='calendar-table range-" + i + "'>");
      html.push("<tr>");
      html.push($.p("<td><span class='calendar-prev fa fa-caret-left padding5' data-calendaridx='$i'></span></td>", [ i ]));
      html.push("<td colspan='5'><span class='date-label'>" + d0_date_label[i] + "</span></td>");
      html.push($.p("<td><span class='calendar-next fa fa-caret-right padding5' data-calendaridx='$i'></span></td>", [ i ]));
      html.push("</tr>");
      html.push("<tr>");
      html.push("<td>Sun</td>");
      html.push("<td>Mon</td>");
      html.push("<td>Tue</td>");
      html.push("<td>Wed</td>");
      html.push("<td>Thu</td>");
      html.push("<td>Fri</td>");
      html.push("<td>Sun</td>");
      html.push("</tr>");
      var current_date = 1;
      for(var j = 0 ; j < 6 ; j++){
        html.push("<tr>");
        for(var k = 0 ; k < 7 ; k++){
          if(d0_start_day[i] > 0){
            html.push("<td></td>");
            d0_start_day[i]--;
          }
          else if(current_date <= d0_last_date_of_month[i]){

            var current_value = $.date('Y-m-d', $.strtotime(d0_year[i] + '-' + d0_month2[i] + '-' + $.str_pad(current_date, 2, '0', 'STR_PAD_LEFT')));
            if($.strtotime(current_value) >= $.strtotime(d0) && $.strtotime(current_value) <= $.strtotime(d1)){
              html.push("<td class='day active' data-date='" + current_value + "'>" + current_date + "</td>");

            }
            else{
              html.push("<td class='day' data-date='" + current_value + "'>" + current_date + "</td>");
            }
            current_date++;

          }
          else
            html.push("<td></td>");
        }
        html.push("</tr>");
      }
      html.push("</table>");

    }

    popup.html(html.join(''));
    popup.data('seq', 0);

    $('.day', popup).click(function(e){

      e.preventDefault();
      e.stopPropagation();
      console.log('value: ' + 1);
      var popup = $(this).closest('#calendar');
      var month_year = $(popup).attr('data-value');
      var date = this.innerHTML;
      var month = parseInt($.date('n', $.strtotime(month_year)));
      var year = $.date('Y', $.strtotime(month_year));
      var d = $.date('j M Y', $.mktime(0, 0, 0, month, date, year));

      var seq = parseInt(popup.data('seq'));

      if(seq == 0){

        $('.day.active-0').removeClass('active active-0');
        $(this).addClass('active active-0');

        var date0 = $(this).attr('data-date');
        var value = $(popup).attr('data-value');
        value = value.split(',');
        var date1 = $.val(1, value, { d:date0 });
        $('.day', popup).each(function(){

          var current_value = $(this).attr('data-date');
          if($.strtotime(current_value) >= $.strtotime(date0) && $.strtotime(current_value) <= $.strtotime(date1))
            $(this).addClass('active');
          else
            $(this).removeClass('active');

        });

      }
      else{

        $('.day.active-1').removeClass('active active-1');
        $(this).addClass('active active-1');

      }

      popup.data('seq', seq + 1);
      if(seq == 1){

        var date0 = $('.day.active-0').attr('data-date');
        var date1 = $('.day.active-1').attr('data-date');

        // Swap if date0 is higher than date1
        if($.strtotime(date0) > $.strtotime(date1)){
          var temp = date0;
          date0 = date1;
          date1 = temp;
        }

        var value = $.date('Ymd', $.strtotime(date0)) + '-' + $.date('Ymd', $.strtotime(date1));

        $.popup_close(popup);
        $.fire_event(onchange, [ value ], popup);
      }

    });

    $('.calendar-prev', popup).click(function(e){

      var idx = parseInt($(this).attr('data-calendaridx'));

      console.log([ 'prev', value, parseInt($(this).attr('data-calendaridx')), d0_month0, d0_month1 ]);

      e.preventDefault();
      e.stopPropagation();

      if(idx == 0){

        d0_month0 = $.date('Y-m-d', $.mktime(0, 0, 0,
          parseInt($.date('n', $.strtotime(d0_month0))) - 1,
          $.date('j', $.strtotime(d0_month0)),
          $.date('Y', $.strtotime(d0_month0))
        ));

      }
      else if(idx == 1){

        d0_month1 = $.date('Y-m-d', $.mktime(0, 0, 0,
          parseInt($.date('n', $.strtotime(d0_month1))) - 1,
          $.date('j', $.strtotime(d0_month1)),
          $.date('Y', $.strtotime(d0_month1))
        ));

        if($.date('Ym', $.strtotime(d0_month0)) >= $.date('Ym', $.strtotime(d0_month1))){
          d0_month0 = $.date('Y-m-d', $.mktime(0, 0, 0,
            parseInt($.date('n', $.strtotime(d0_month0))) - 1,
            $.date('j', $.strtotime(d0_month0)),
            $.date('Y', $.strtotime(d0_month0))
          ));
        }

      }

      // console.log([ 'next', value, idx, d0_month0, d0_month1 ]);

      $.calendar_set_range(value.join(','), d0_month0, d0_month1);

    });

    $('.calendar-next', popup).click(function(e){

      var idx = parseInt($(this).attr('data-calendaridx'));

      // console.log([ 'next', value, idx, d0_month0, d0_month1 ]);

      e.preventDefault();
      e.stopPropagation();

      if(idx == 0){

        d0_month0 = $.date('Y-m-d', $.mktime(0, 0, 0,
          parseInt($.date('n', $.strtotime(d0_month0))) + 1,
          $.date('j', $.strtotime(d0_month0)),
          $.date('Y', $.strtotime(d0_month0))
        ));

        if($.date('Ym', $.strtotime(d0_month1)) <= $.date('Ym', $.strtotime(d0_month0))){
          d0_month1 = $.date('Y-m-d', $.mktime(0, 0, 0,
            parseInt($.date('n', $.strtotime(d0_month1))) + 1,
            $.date('j', $.strtotime(d0_month1)),
            $.date('Y', $.strtotime(d0_month1))
          ));
        }

      }
      else if(idx == 1){

        d0_month1 = $.date('Y-m-d', $.mktime(0, 0, 0,
          parseInt($.date('n', $.strtotime(d0_month1))) + 1,
          $.date('j', $.strtotime(d0_month1)),
          $.date('Y', $.strtotime(d0_month1))
        ));

      }

      // console.log([ 'next', value, idx, d0_month0, d0_month1 ]);

      $.calendar_set_range(value.join(','), d0_month0, d0_month1);

    });

  }

});$.fn.extend({

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

});$.fn.extend({

  checkbox:function(options){

    this.each(function(){

      var className = $.val('class', options, { d:'' });
      var items = $.val('items', options, { d:null });

      var html = [];
      if($.type(items) == 'array')
        $(items).each(function(){
          var text = $.val('text', this, { d:'' });
          var value = $.val('value', this, { d:'' });
          var uid = 'checkbox-' + $.uniqid();
          html.push("<span class='item'><input id='" + uid + "' type='checkbox' value=\"" + value + "\"/><label for='" + uid + "'>" + text + "</label></span>");
        });
      else{
        var text = $.val('text', options, { d:'' });
        var value = '';
        var uid = 'checkbox-' + $.uniqid();
        html.push("<span class='item'><input id='" + uid + "' type='checkbox' value=\"" + value + "\"/><label for='" + uid + "'>" + text + "</label></span>");
      }

      $(this).addClass('checkbox');
      $(this).addClass(className);
      $(this).html(html.join(''));

      $(this).data('options', options);

    })

  }

});$.fn.extend({

  checklist:function(options){

    $(this).each(function(){

      var instance = this;
      var html = [];

      html.push("<div class='checklist-body'>");
      html.push("<div class='checklist-item'>");
      html.push("<input type='checkbox' />");
      html.push("<input type='text' />");
      html.push("<span class='iconbar'>");
      html.push("<span class='checklist-remove fa fa-times padding5 selectable'></span>");
      html.push("</span>");
      html.push("</div>");
      html.push("</div>");

      html.push("<div class='checklist-foot'>");
      html.push("<span class='checklist-add fa fa-plus-circle padding5 selectable hoverable'></span>");
      html.push("</div>");

      $(this).addClass('checklist');
      $(this).html(html.join(''));

      $('.checklist-add', this).click(function(){
        $(instance).checklist_add();
      });

      $('.checklist-remove', this).on('click.checklist', function(){
        $(this).closest('.checklist-item').remove();
      })

    });

  },

  checklist_add:function(){

    $(this).each(function(){

      var html = [];
      html.push("<div class='checklist-item'>");
      html.push("<input type='checkbox' />");
      html.push("<input type='text' />");
      html.push("<span class='iconbar'>");
      html.push("<span class='checklist-remove fa fa-times padding5 selectable hoverable'></span>");
      html.push("</span>");
      html.push("</div>");

      $('.checklist-body', this).append(html.join(''));

      $('.checklist-remove', $('.checklist-body', this)).on('click.checklist', function(){
        $(this).closest('.checklist-item').remove();
      })

    })

  },

  checklist_get:function(){

    var value = [];
    $(this).each(function(){

      $('.checklist-item', this).each(function(){

        var checked = $("input[type='checkbox']", this)[0].checked;
        var text = $("input[type='text']", this).val();

        if(text.length > 0){
          value.push({
            checked:checked,
            text:text
          })
        }

      });

    });
    return value.length == 0 ? null : value;

  },

  checklist_set:function(value){

    $(this).checklist_attr({ value:value });

  },

  checklist_attr:function(obj){

    if($.type(obj) != 'object') return;

    $(this).each(function(){

      for(var key in obj){
        var value = obj[key];

        switch(key){

          case 'readonly':
            if(value){
              $("input[type='checkbox']", this).attr('disabled', true);
              $("input[type='text']", this).attr('readonly', true);
              $('.checklist-remove', this).addClass('hidden');
              $('.checklist-add', this).addClass('hidden');
            }
            else{
              $("input[type='checkbox']", this).attr('disabled', false);
              $("input[type='text']", this).attr('readonly', false);
              $('.checklist-remove', this).removeClass('hidden');
              $('.checklist-add', this).removeClass('hidden');

            }
            break;

          case 'value':
            var html = [];
            if($.type(value) == 'array')
              for(var i = 0 ; i < value.length ; i++){
                var value_obj = value[i];
                var text = $.val('text', value_obj, { d:'' });
                var checked = $.val('checked', value_obj, { d:false });

                if(text == '') continue;

                html.push("<div class='checklist-item'>");
                html.push("<input type='checkbox'" + (checked ? ' checked' : '') + "/>");
                html.push("<input type='text' value=\"" + text + "\" />");
                html.push("<span class='iconbar'>");
                html.push("<span class='checklist-remove fa fa-times padding5 selectable hoverable'></span>");
                html.push("</span>");
                html.push("</div>");
              }
            html.push("<div class='checklist-item'>");
            html.push("<input type='checkbox'/>");
            html.push("<input type='text'/>");
            html.push("<span class='iconbar'>");
            html.push("<span class='checklist-remove fa fa-times padding5 selectable hoverable'></span>");
            html.push("</span>");
            html.push("</div>");
            $('.checklist-body', this).html(html.join(''));
            $('.checklist-remove', $('.checklist-body', this)).on('click.checklist', function(){
              $(this).closest('.checklist-item').remove();
            })
            break;

        }


      }

    })

  }

});$.fn.extend({

  choice:function(options){

    $(this).each(function(){

      var className = $.val('class', options, { d:'' });
      var items = $.val('items', options, { d:[], datatype:'array' });

      var html = [];
      if($.type(items) == 'array'){
        for(var i = 0 ; i < items.length ; i++){
          var item = items[i];
          var value = $.val('value', item, { d:'' });
          var text = $.val('text', item, { d:value });
          if(value.length == 0) continue;
          html.push($.p('<span class="item">'));
          html.push($.p('</span>'));
        }
      }

      $(this).addClass('choice');
      $(this).addClass(className);

    })

  }

});$.fn.extend({

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

});$.fn.extend({

  codefield:function(options){

    var placeholder = $.val('placeholder', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var height = $.val('height', options);
    var width = $.val('width', options);

    var css = {
      width:width,
      height:height
    };

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<pre style='height:" + height + ";'>" + JSON.stringify({ name:"andy" }, null, 2) + "</pre>");
      html.push("<span class='icon fa hidden'></span>");

      $(el).addClass('codefield');
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'codefield');
      $(el).attr('data-name', name);
      $(el).data('options', options);

    });

  },

  codefield_get:function(){

    var value = [];
    this.each(function(){

      var val = $('pre', this).html();
      value.push(val);

    });
    return value.length > 1 ? value : (value.length == 1 ? value[0] : '');

  },

  codefield_set:function(value){

    this.each(function(){

      $('pre', this).html(value);

    });

  },

});$.fn.extend({

  commentlist:function(options){

    var onsubmit = $.val('onsubmit', options);

    $(this).each(function(){

      var instance = this;

      var html = [];
      html.push("<div class='commentlist-write'>");
      html.push("<input type='text' placeholder='Write comment here...' />");
      html.push("</div>");
      html.push("<div class='commentlist-list'></div>");

      $(this).addClass('commentlist');
      $(this).html(html.join(''));

      $(this).data('options', options);

      $("input[type='text']", this).on('keyup', function(e){

        if(e.keyCode == 13){

          if(e.shiftKey){
          }
          else{
            if(this.value != ''){
              $.fire_event(onsubmit, [ this.value ], instance);
              this.value = '';
              $(this).blur();
            }
          }

        }

      })

    });

  },

  commentlist_add:function(obj){

    $(this).each(function(){

      var options = $(this).data('options');
      var onremove = $.val('onremove', options);

      var id = $.val('id', obj);
      var comment = $.val('comment', obj);
      var full_name = $.val('full_name', obj);
      var createdon = $.val('createdon', obj);
      var removable = $.val('removable', obj, { d:0 });

      if(!comment || !full_name) return;

      var html = [];
      html.push("<div class='commentlist-item' data-id='" + id + "'>");
      html.push("<p style='word-wrap: break-word;'><b>" + full_name + "</b> " + comment + "</p>");
      html.push("<div class='commentlist-item-footer'>");
      html.push("<label class=''>" + createdon + "</label>");
      if(removable){
        html.push("<span class='width5 height5'>&nbsp;</span>");
        html.push("<span class='comment-item-remove selectable hoverable'>Remove</span>");
      }
      html.push("</div>");
      html.push("</div>");
      $('.commentlist-list', this).append(html.join(''));

      $('.comment-item-remove', $('.commentlist-list', this)).on('click', function(){
        var id = $(this).closest('.commentlist-item').attr('data-id');
        $.fire_event(onremove, [ id ], this);
      })

    })

  },

  commentlist_set:function(comments){

    $(this).each(function(){

      var options = $(this).data('options');
      var onremove = $.val('onremove', options);

      var html = [];
      if($.type(comments) == 'array'){
        for(var i = 0 ; i < comments.length ; i++){

          var comment_obj = comments[i];
          var id = $.val('id', comment_obj);
          var comment = $.val('comment', comment_obj);
          var full_name = $.val('full_name', comment_obj);
          var createdon = $.val('createdon', comment_obj);
          var removable = $.val('removable', comment_obj, { d:0 });

          if(!comment || !full_name) continue;

          html.push("<div class='commentlist-item' data-id='" + id + "'>");
          html.push("<p style='word-wrap: break-word;'><b>" + full_name + "</b> " + comment + "</p>");
          html.push("<div class='commentlist-item-footer'>");
          html.push("<label class=''>" + createdon + "</label>");
          if(removable){
            html.push("<span class='width5 height5'>&nbsp;</span>");
            html.push("<span class='comment-item-remove selectable hoverable'>Remove</span>");
          }
          html.push("</div>");
          html.push("</div>");

        }
      }
      $('.commentlist-list', this).html(html.join(''));

      $('.comment-item-remove', $('.commentlist-list', this)).on('click', function(){

        var id = $(this).closest('.commentlist-item').attr('data-id');
        $.fire_event(onremove, [ id ], this);

      })

    })

  }

});$.fn.extend({

  container_val: function (value) {

    // Getter
    if(typeof value == 'undefined'){

      result = {};
      $("*[data-type]", this).each(function(){

        var name = this.getAttribute("data-name");
        if(name != null){
          var val = $(this).val();
          result[name] = val;
        }

      });
      return result;

    }

    // Setter
    else{

      $("*[data-type]", this).each(function(){

        var name = this.getAttribute("data-name");
        if(name != null){
          var val = $.val(name, value, { d:'' });
          $(this).val(val);
        }

      })

    }

  },

  container_reset:function(){

    $("*[data-type]", this).each(function(){

      var type = $(this).attr('data-type');
      if(type != null && typeof $(this)[type + '_reset'] != 'undefined')
        $(this)[type + '_reset'].apply(this, arguments);

    });

  }

});$.fn.extend({

  datepicker: function (options) {

    var type = $.val('type', options);

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='text' readonly/>");
      html.push("<span class='icon fa fa-calendar'></span>");

      $(el).addClass('datepicker');
      $(el).html(html.join(''));
      $(el).attr('data-type', 'datepicker');
      $(el).data('options', options);

      $('.icon', this).click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var el = $(this).closest('.datepicker');
        var options = $(el).data('options');
        var readonly = $.val('readonly', options, { d:false });
        if(readonly == '0' || readonly == false){
          $.calendar_open({
            refEl:el,
            value:$(el).data('value'),
            type:type,
            onchange:function(value){
              $(el).datepicker_val(value);
            }
          });
        }
      });
      $('.popup', this).click(function(e){
        e.preventDefault();
        e.stopPropagation();
      });

      $(this).datepicker_val($.val('value', options, { d:'20170101' }));

    });

  },

  datepicker_val:function(value){

    if(typeof value == 'undefined'){

      var value = [];
      $(this).each(function(){
        var d = $(this).data('value');
        value.push(d);
      });
      return value.length == 1 ? value[0] : (value.length == 0 ? null : value);
      
    }
    
    else{

      $(this).each(function(){

        var text = '';
        value = $.date_parse(value);

        if(value.indexOf('-') >= 0){
          var d = value.split('-');
          var d1 = $.date('M j, Y', $.strtotime(d[0]));
          var d2 = $.date('M j, Y', $.strtotime(d[1]));
          text = d1 + ' - ' + d2;
        }
        else{
          var d = $.date('M j, Y', $.strtotime(value));
          text = d;
        }

        $('input', this).val(text);
        $(this).data('value', value);
        
      })
      
    }
    
  },

});$.fn.extend({

  dropdown:function(options){

    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var defaultvalue = $.val('defaultvalue', options, { d:'' });
    var value = $.val('value', options, { d:defaultvalue });
    var items = $.val('items', options, { d:[] });
    var width = $.val('width', options, { d:[] });
    var src = $.val('src', options, { d:'' });
    var placeholder = $.val('placeholder', options, { d:'' });

    var html = [];
    html.push("<input class='text' type='text' placeholder=\"" + placeholder + "\" readonly/>");
    html.push("<span class='icon fa fa-caret-down hoverable'></span>");
    html.push("<span class='popup'></span>");

    this.each(function(){

      var el = this;

      $(el).addClass('dropdown');
      $(el).addClass(className);
      $(el).html(html.join(''));
      $(el).data('options', options);
      $(el).attr('data-type', 'dropdown');
      $(el).attr('data-name', name);
      $(el).dropdown_attr(options);

      $('.icon, .text', el).click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var el = $(this).closest('.dropdown');
        var options = $(el).data('options');
        var readonly = $.val('readonly', options);
        if(!readonly){
          if($('.popup', el).hasClass('on')){
            $.popup_close($('.popup', el));
          }
          else{
            $.popup_open($('.popup', el), el, { min_width:$(el).outerWidth() });
            $('.search-item input', $('.popup', el)).val('');
            $('.search-item input', $('.popup', el)).focus();
            $(".item", $('.popup', el)).show();
          }
        }
      });

      if(value != '') $(el).dropdown_val();
      if(src.length > 0)
        $(this).dropdown_load();

    })

  },

  dropdown_val:function(val, append){

    // Getter
    if(typeof val == 'undefined'){

      var result = [];
      this.each(function(){

        var el = this;
        var value = $(el).attr('data-value');
        var text = $('input', el).length == 1 ? $('input', el).val() : $('.text', el).html();
        value = value == null ? text : value;
        result.push(value);

      });
      return result.length == 1 ? result[0] : (result.length > 1 ? result : null);

    }

    // Setter
    else{

      this.each(function(){

        var options = $(this).data('options');
        var items = $.val('items', options, { d:[] });

        var text = '';
        var value = '';
        if($.type(val) == 'object'){
          value = $.val('value', val);
          text = $.val('text', val, { d:value });
        }
        else if($.type(value) == 'string'){
          text = value = val;
        }

        if($.type(items) == 'array'){
          for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            if(item.value == value){
              text = item.text;
              value = item.value;
              break;
            }
          }
        }

        $(this).attr('data-value', value);
        $('input', this).val(text);
        $('.text', this).html(text);

      });

    }

  },

  dropdown_items:function(items){

    if(typeof items == 'undefined'){

      var results = [];
      this.each(function(){

        var el = this;
        var options = $(el).data('options');
        var items = $.val('items', options, { d:[] });
        $(items).each(function(){
          if($.type(this) == 'object')
            results.push(this);
        });

      });
      return results;

    }

    else{

      this.each(function(){

        var el = this;
        var options = $(el).data('options');
        var searchable = $.val('searchable', options, { d:false });
        var multiple = $.val('multiple', options, { d:false });
        var onchange = $.val('onchange', options);

        // Generate popup content
        var html = [];
        if(searchable == true){
          html.push("<div class='search-item'>");
          html.push("<input type='text' placeholder='Search'/>");
          html.push("</div>");
        }
        if($.type(items) == 'array')
          for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            var text = item.text;
            var value = item.value;
            var search = (text + ' ' + value).toLowerCase();
            var uid = $.uniqid();
            html.push("<div class='item' data-value=\"" + value + "\" data-search=\"" + search + "\">");
            if(multiple) html.push("<input type='checkbox' id='dropdown_item_checkbox_" + uid + "'/>");
            html.push("<label for='dropdown_item_checkbox_" + uid + "'>" + text + "</label>");
            html.push("</div>");
          }
        html = html.join('');

        $('.popup', el).html(html);
        $(el).data('options', options);

        $('.item', $('.popup', el)).click(function(e){

          if(multiple) e.stopPropagation();

          var text = $('label', this).html();
          var value = $(this).attr('data-value');
          var index = -1;
          var obj = null;
          for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            var item_text = $.val('text', item);
            var item_value = $.val('value', item);
            if(item_value == value || item_text == text){
              index = i;
              obj = item;
              break;
            }
          }
          if(obj) obj['_index'] = index;

          $('input', el).val(text);
          $('.text', el).html(text);
          $(el).attr('data-value', value);

          $.fire_event(onchange, [ e, obj ], el);

        });

        $(".item>input[type='checkbox']", $('.popup', el)).on('change', function(){

          var text = this.nextElementSibling.innerHTML; // Text from label
          var value = this.parentNode.getAttribute("data-value"); // Value from item data-value
          $(el).dropdown_val({ text:text, value:value }, true);

        });

        $('.popup .search-item input', el).click(function(e){
          e.preventDefault();
          e.stopPropagation();
        });

        $('.popup .search-item input', el).keyup(function(e){

          var key = this.value;
          var popup = $(this).closest('.popup');
          $(".item", popup).show();
          if(key.length > 0){
            $(".item:not([data-search*='" + key + "'])", popup).hide();
          }

        });

        options['items'] = items;
        $(el).data('options', options);
        $(el).dropdown_val('*');

      })

    }

  },

  dropdown_attr:function(obj){
    
    this.each(function(){

      var options = $(this).data('options');

      if($.type(obj) == 'object'){
        for(var key in obj){
          var value = obj[key];
          var css = {};
          switch(key){
            case 'items':
              $(this).dropdown_items(value);
              break;
            case 'readonly':
              if(value){
                $(this).addClass('readonly');
                options['readonly'] = true;
              }
              else{
                $(this).removeClass('readonly');
                options['readonly'] = false;
              }
              break;
            case 'value':
              $(this).dropdown_val(value);
              break;
            case 'width':
              css['width'] = parseInt(value);
              break;

          }
          $(this).css(css);

        }
      }

      $(this).data('options', options);

    })

  },

  dropdown_load:function(){

    this.each(function(){

      var el = this;
      var options = $(el).data('options');
      var src = $.val('src', options, { d:'' });

      $.api_post(src, {}, function(response){

        var data = $.val('data', response);
        if($.type(data) == 'array')
          $(el).dropdown_items(data);

      });

    })

  },

  dropdown_reset:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var defaultvalue = $.val('defaultvalue', options, { d:'' });
      $(this).dropdown_val(defaultvalue);

    })

  },

  dropdown_readonly:function(readonly){

    $(this).each(function(){

      if($.istrue(readonly)) $(this).addClass('readonly');
      else $(this).removeClass('readonly');

    })

  }

});$.fn.extend({

  feed:function(options){

    $(this).each(function(){

      var className = $.val('class', options, { d:'' });
      var src = $.val('src', options, { d:'' });
      var autoload = $.val('autoload', options, { d:false });

      var html = [];
      html.push("<div class='feed-content'></div>");
      html.push("<div class='feed-footer'></div>");

      $(this).addClass('feed');
      $(this).addClass(className);
      $(this).html(html.join(''));
      $(this).data('options', options);

      if(autoload) $(this).feed_load();

    })

  },

  feed_val:function(value, append){

    if(typeof value == 'undefined'){



    }

    else{

      $(this).each(function(){

        var options = $(this).data('options');
        var src = $.val('src', options, { d:'' });
        var template = $.val('template', options, { d:'' });

        if($.type(value) == 'array' && value.length > 0){

          var uid = 'feed_group_' + $.uniqid();
          var section = document.createElement("div");
          section.setAttribute("data-feed-group-id", uid);

          var html = [];
          for(var i = 0 ; i < value.length ; i++)
            html.push("<div class='feed-item'></div>");
          section.innerHTML = html.join('');
          $('.feed-content', this).append(section);

          for(var i = 0 ; i < value.length ; i++){
            var obj = value[i];
            var feed_item = section.childNodes[i];
            $.fire_event(template, [ obj ], feed_item);
          }

        }

      })


    }

  },

  feed_load:function(params){

    $(this).each(function(){

      if(!$(this).hasClass('feed')) return;

      var instance = this;
      var options = $(this).data('options');
      var src = $.val('src', options, { d:'' });

      if(src != ''){
        $.api_post(src, [], function(response){

          // Render data
          var data = $.val('data', response, { d:[] });
          var page = $.val('page', response, { d:1 });
          var append = page == 1 ? false : true;
          $(instance).feed_val(data, append);

          // Check if next page exists
          var max_page = $.val('max_page', response, { d:page });
          if(max_page >= page + 1){
            $('.feed-footer', instance).html("<div class='load-more align-center padding10'>Load More...</div>");
            $('.load-more', instance).on('click', function(){
              $(instance).feed_load({ page:page + 1 });
            });
          }
          else{
            $('.feed-footer', instance).html("");
          }

        });
      }

    })

  }

});$.extend({

  foldedpane_toggle:function(exp){

    var el = $(exp);
    if(typeof el[0] == 'undefined') return;
    var toggler = $('.toggler', el);

    if(el[0].classList.contains('folded')){
      el[0].classList.remove('folded');
      if(toggler.length == 1) toggler.html("<span class='fa fa-caret-up'></span>");
    }
    else{
      el[0].classList.add('folded');
      if(toggler.length == 1) toggler.html("<span class='fa fa-caret-down'></span>");
    }

  },
  foldedpane_init:function() {

    var els = document.body.querySelectorAll(".folded-pane");
    for (var i = 0; i < els.length; i++) {

      var el = els[i];
      var toggler = el.querySelector('.toggler');
      if (toggler != null) {
        toggler.addEventListener('click', function () {
          $.foldedpane_toggle(el);
        })
      }
    }

  },

});$.fn.extend({

  grid:function(options){

    var autoload = $.val('autoload', options, { d:true });
    var columns = $.val('columns', options, { d:[] });
    var className = $.val('class', options, { d:null });
    var name = $.val('name', options, { d:'' });
    var footer = $.val('footer', options, { d:'' });
    var value = $.val('value', options, { d:null });
    var height = $.val('height', options, { d:"auto" });

    options['page'] = 0;
    options['row_per_page'] = 12;

    this.each(function(){

      var el = this;

      var html = [];

      // content
      html.push("<table class='grid-body'>");
      html.push("<tbody class='grid-size'></tbody>");
      html.push("</table>");
      html.push("<div class='grid-footer'></div>");

      $(el).attr('data-type', 'grid');
      $(el).addClass('grid');
      $(el).addClass(className);
      if(name != '') $(el).attr('data-name', name);
      $(el).data('options', options);
      $(el).attr('data-type', 'grid');

      $(el).html(html.join(''));
      $.fire_event(footer, [], $('.grid-footer', el));

      $(this).grid_set_columns(columns);
      if(value != null) $(el).grid_set(value);
      if(autoload) $(el).grid_load();

    })

  },

  grid_add:function(obj){

    this.each(function(){

      var el = this;
      var table = el.querySelector('.grid-body');
      var options = $(el).data('options');
      var columns = $.val('columns', options, { d:[] });

      var html = [];

      if($('.grid-size', table).length == 0){
        var html_size = [];
        html_size.push("<tr class='grid-size'>");
        for(var i = 0 ; i < columns.length ; i++){
          var column = columns[i];
          var column_width = $.val('width', column, { d:'' });
          html_size.push("<td style='width:" + column_width + ";'></td>");
          html_size.push("<td class='separator'></td>");
        }
        html_size.push("<td style='width:100%'></td>");
        html_size.push("</tr>");
        html.push(html_size.join(''));
      }

      html.push("<tr>");
      for(var j = 0 ; j < columns.length ; j++){
        var column = columns[j];
        var column_type = $.val('type', column, { d:'text' });
        var column_datatype = $.val('datatype', column, { d:'text' });
        var column_name = $.val('name', column, { d:'' });
        var column_width = $.val('width', column, { d:'' });
        var column_align = $.val('align', column, { d:'' });

        var text_align = '';
        var td_class = '';
        var column_value = '';
        switch(column_type){
          case 'index':
            column_value = i + 1;
            text_align = 'right';
            td_class = 'label';
            break;
          case 'html':
            gridtypecoord = 0 + ',' + j;
            break;
          default:

            switch(column_datatype){
              case 'number':
              case 'money':
                text_align = 'right';
                column_value = $.val(column_name, obj, { d:0 });
                break;
              case 'enum':
                var column_enums = $.val('enums', column, { d:{} });
                column_value = $.val(column_name, obj, { d:'-' });
                column_value = $.val(column_value, column_enums, { d:'-' });
                break;
              default:
                column_value = $.val(column_name, obj, { d:'-' });
                break;
            }
            td_class = 'label';
            break;
        }

        if(column_align != '') text_align = column_align;

        html.push("<td data-gridtype='" + column_type + "' data-gridtypecoord='" + gridtypecoord + "' class='" + td_class + "' style='text-align:" + text_align + "'>" + column_value + "</td>");
        html.push("<td class='separator'></td>");
      }
      html.push("<td></td>");
      html.push("</tr>");
      $('tbody', table).append(html.join(''));

      $("td[data-gridtype='html']", $('tr', $('tbody', table)).last()).each(function(){
        var coord = $(this).attr('data-gridtypecoord').split(',');
        var j = parseInt(coord[1]);
        var column = columns[j];
        var column_html = $.val('html', column, { d:'' });
        $.fire_event(column_html, [ obj, column ], this);
      });

    });

  },

  grid_remove:function(tr){

    var instance = this;
    $(tr).each(function(){

      var grid0 = $(this).closest('.grid');
      grid0 = typeof grid0[0] != 'undefined' ? grid0[0] : -2;
      var grid1 = typeof instance[0] != 'undefined' ? instance[0] : -1;

      if(grid0 == grid1){
        $(this).remove();
      }

    })

  },

  grid_set_columns:function(columns){

    $(this).each(function(){

      if(!$(this).hasClass('grid')) return;

      var options = $(this).data('options');
      options['columns'] = columns;
      $(this).data('options', options);

      var html = [];
      html.push("<tr>");
      for(var i = 0 ; i < columns.length ; i++){
        var column = columns[i];
        var name = $.val('name', column);
        var width = $.val('width', column);
        var active = $.val('active', column, { d:1 });
        if(active == 1)
          html.push($.p("<td class='grid-size-label' style='width:$1' data-key='" + name + "'></td>", [ width ]));
        else
          html.push($.p("<td class='grid-size-label inactive' style='width:$1' data-key='" + name + "'></td>", [ width ]));
      }
      html.push("<td style='width:100%'></td>");
      html.push("</tr>");
      $('.grid-size', this).html(html.join(''));

    });

  },

  grid_append:function(obj, ext){

    this.each(function() {

      var el = this;
      var table = el.querySelector('.grid-body');
      var options = $(el).data('options');
      var src = $.val('src', options, { d:'' });
      var onselect = $.val('onselect', options);
      var columns = $.val('columns', options, { d:[] });

      var page = $.val('page', obj, { d:1 });
      var row_per_page = $.val('row_per_page', obj, { d:10 });
      var max_page = $.val('max_page', obj, { d:page });
      var data = $.val('data', obj);

      if(typeof options['data'] == 'undefined') options['data'] = [];

      var tbody = document.createElement('tbody');
      $(tbody).html($.grid_html(data, columns, options['data'].length));
      $(table).append(tbody);

      $("td[data-gridtype='html']", tbody).each(function(){

        var coord = $(this).attr('data-gridtypecoord').split(',');
        var i = parseInt(coord[0]);
        var j = parseInt(coord[1]);
        var obj = data[i];
        var column = columns[j];
        var column_html = $.val('html', column, { d:'' });
        $.fire_event(column_html, [ obj, column ], this);

      });

      $('tr', tbody).click(function(){

        var table = $(this).closest('table');
        $('.active', table).removeClass('active');
        $(this).addClass('active');
        var idx = $(this).attr('data-idx');
        var obj = options.data[idx];
        $.fire_event(onselect, [ obj ], el);

      });

      $('.grid-more', el).remove();
      if(max_page > page){
        $(el).append("<div class='grid-more' data-page='" + page + "'><label class='cl-gray'>Load more...</label></div>");
        $('.grid-more', el).click(function(){
          var page = parseInt($(this).attr('data-page'));
          var onloadmore = $.val('onloadmore', options);
          $(this).html("<i class='fa fa-circle-o-notch fa-spin fa-fw cl-gray'></i>");
          if(src != ''){
            $(el).grid_load();
          }
          $.fire_event(onloadmore, [ { page:page } ], el);
        });
        $('.grid-more', el).appear(function(){
          var page = parseInt($(this).attr('data-page'));
          var onloadmore = $.val('onloadmore', options);
          $(this).html("<i class='fa fa-circle-o-notch fa-spinfa-fw cl-gray'></i>");
          if(src != ''){
            $(el).grid_load();
          }
          $.fire_event(onloadmore, [ { page:page } ], el);
        });
      }

      for(var i = 0 ; i < data.length ; i++)
        options['data'].push(data[i]);
      $(el).data('options', options);

    });


  },

  grid_load:function(params){

    this.each(function(){

      var instance = this;
      var options = $(instance).data('options');
      var src = $.val('src', options, { d:'' });
      var method = $.val('method', options, { d:'post' });

      if(src.length > 0){

        var page = $.val('page', params, { d:1 });
        var row_per_page = $.val('row_per_page', params, { d:10 });
        var columns = $.val('columns', options);

        var el_params = {
          page:page,
          row_per_page:row_per_page,
          columns:columns
        };

        if(method.toString().toLowerCase() == 'get'){
          $.api_get(src, el_params, function(response){

            // Render data
            var data = $.val('data', response, { d:[] });
            var page = $.val('page', response, { d:1 });
            var append = page == 1 ? false : true;
            $(instance).grid_val(data, append);

            // Check if next page exists
            var next_page = $.val('next_page', response, { d:page });
            if(next_page > page){
              $('.grid-footer', instance).html("<div class='load-more align-center padding10'>Load More...</div>");
              $('.load-more', instance).on('click', function(){
                $(instance).grid_load({ page:next_page });
              });
            }
            else{
              $('.grid-footer', instance).html("");
            }

          });
        }
        else{
          $.api_post(src, el_params, function(response){

            // Render data
            var data = $.val('data', response, { d:[] });
            var page = $.val('page', response, { d:1 });
            var append = page == 1 ? false : true;
            $(instance).grid_val(data, append);

            // Check if next page exists
            var next_page = $.val('next_page', response, { d:page });
            if(next_page > page){
              $('.grid-footer', instance).html("<div class='load-more align-center padding10'>Load More...</div>");
              $('.load-more', instance).on('click', function(){
                $(instance).grid_load({ page:next_page });
              });
            }
            else{
              $('.grid-footer', instance).html("");
            }

          });
        }

        $('.grid-footer', this).html("<div class='align-center padding10'>Loading...</div>");

      }
      
    });
    
  },

  grid_val:function(value, append){

    // Getter
    if(typeof value == 'undefined'){

      var value = [];
      this.each(function(){

        var el = this;
        var table = el.querySelector('.grid-body');
        var tbody = $('tbody', table);
        $(tbody).children().each(function(){

          if(this.classList.contains('grid-size'));
          else{
            var idx = $(this).attr('data-idx');
            var obj = $.el_get(this);
            if(JSON.stringify(obj).length > 3)
              value.push(obj);
          }

        })

      });
      return value;

    }

    // Setter
    else{

      this.each(function(){

        var instance = this;
        var options = $(instance).data('options');
        var onselect = $.val('onselect', options);
        var columns = $.val('columns', options, { d:[] });

        var tbody = document.createElement('tbody');
        tbody.className = "grid-content";
        tbody.innerHTML = $.grid_html(value, columns);
        if(typeof append == 'undefined' || append !== true) $('.grid-content', instance).remove();
        $('.grid-body', instance).append(tbody);

        // Handle html-type render
        for(var i = 0 ; i < tbody.childNodes.length ; i++){
          var tr = tbody.childNodes[i];
          var obj = value[i];
          for(var j = 0 ; j < tr.childNodes.length ; j++){
            var td = tr.childNodes[j];
            var column_type = td.getAttribute('data-column-type');
            if(column_type == 'html'){
              var column = columns[j];
              var column_html = $.val('html', column, { d:'' });
              $.fire_event(column_html, [ obj, column ], td);
            }
          }
        }

        // On click event
        $('tr', tbody).on('click.gridrow', function(e){

          var table = $(this).closest('table');
          $('.active', table).removeClass('active');
          $(this).addClass('active');
          $.fire_event(onselect, [ e, this ], instance);

        });

      })

    }

  },

  grid_get_selected_value:function(){

    var obj = null;
    $(this).each(function(){

      var options = $(this).data('options');
      var data = $.val('data', options);
      var idx = $("tr[class='active']").attr('data-idx');
      obj = $.val(idx, data);

    });
    return obj;

  },

});

$.extend({

  grid_html:function(data, columns){

    if(!data) return;

    var html = [];
    for(var i = 0 ; i < data.length ; i++){
      var obj = data[i];

      html.push("<tr>");
      for(var j = 0 ; j < columns.length ; j++){

        var column = columns[j];
        var column_type = $.val('type', column, { d:'text' });
        var column_datatype = $.val('datatype', column, { d:'text' });
        var column_name = $.val('name', column, { d:'' });
        var column_align = $.val('align', column, { d:'' });

        var text_align = '';
        var td_class = '';
        var column_value = '';
        switch(column_type){
          case 'html':
            break;
          default:

            switch(column_datatype){
              case 'number':
              case 'money':
                text_align = 'right';
                column_value = $.val(column_name, obj, { d:0 });
                column_value = $.number_format(column_value);
                break;
              case 'enum':
                var column_enums = $.val('enums', column, { d:{} });
                column_value = $.val(column_name, obj, { d:'-' });
                column_value = $.val(column_value, column_enums, { d:'-' });
                break;
              default:
                column_value = $.val(column_name, obj, { d:'-' });
                break;
            }

            var lettercase = $.val('lettercase', column, { d:'' });
            switch(lettercase){
              case 'capitalize': column_value = column_value.toString().capitalize(); break;
              case 'lowercase': column_value = column_value.toString().toLowerCase(); break;
              case 'uppercase': column_value = column_value.toString().toUpperCase(); break;
            }

            td_class = 'label';
            break;
        }

        if(column_align != '') text_align = column_align;

        html.push("<td data-column-type='" + column_type + "' class='" + td_class + "' style='text-align:" + text_align + "'>" + column_value + "</td>");

      }
      html.push("<td></td>");
      html.push("</tr>");
    }
    return html.join('');

  }

});$.fn.extend({

  gridhead:function(options) {

    var autoload = $.val('autoload', options, { d:true });
    var columns = $.val('columns', options, { d:[] });
    var className = $.val('class', options, { d:null });
    var name = $.val('name', options, { d:'' });
    var grid = $.val('grid', options, { d:null });
    var height = $.val('height', options, { d:null });

    this.each(function(){

      var el = this;

      $(el).addClass('gridhead');
      $(el).addClass(className);
      $(el).attr('data-type', 'gridhead');
      if(name != '') $(el).attr('data-name', name);
      $(el).data('options', options);
      $(el).attr('data-type', 'gridhead');
      $(el).gridhead_attr({ height:height });

      $(this).gridhead_set(columns);

    });

  },

  gridhead_set:function(columns){

    $(this).each(function(){

      var el = this;
      var options = $(this).data('options');
      var grid = $.val('grid', options, { d:null });
      var oncolumnclick = $.val('oncolumnclick', options);

      options['columns'] = columns;

      var html = [];
      html.push("<table class='grid-head'><tr>");
      for(var i = 0 ; i < columns.length ; i++){
        var column = columns[i];
        var column_name = $.val('name', column, { d:'' });
        var column_active = $.val('active', column, { d:1 });
        var column_text = $.val('text', column, { d:'-' });
        var column_width = $.val('width', column, { d:'' });
        var column_datatype = $.val('datatype', column, { d:'text' });
        var column_align = $.val('align', column, { d:'' });

        var text_align = '';
        switch(column_datatype){
          case 'number':
          case 'money':
            text_align = 'right';
            break;
          case 'enum':
            break;
          default:
            break;
        }
        if(column_align != '') text_align = column_align;

        var className = 'label' + (!column_active ? ' inactive' : '');

        html.push("<td class='" + className + "' style='width:" + column_width + ";text-align:" + text_align + "' data-key=\"" + column_name + "\">" + column_text + "<span class='separator'></span></span></td>");

      }
      html.push("<td style='width:100%'></td>");
      html.push("</tr></table>");
      $(el).html(html.join(''));

      $('.separator', el).mousedown(function(e){

        e.preventDefault();
        e.stopPropagation();

        var td_prev = this.parentNode;
        var tr = td_prev.parentNode;
        var last_x = e.clientX;
        $(window).on('mousemove.gridhead', function(e){

          e.preventDefault();
          e.stopPropagation();

          var distance_x = e.clientX - last_x;
          td_prev.style.width = (parseInt(td_prev.style.width) + distance_x) + "px";
          last_x = e.clientX;

        });
        $(window).on('mouseup.gridhead', function(e){

          e.preventDefault();
          e.stopPropagation();

          var grid_el = $(grid);
          var grid_size = $('.grid-size', grid_el);

          if(grid_size.length == 1){

            var index = -1;
            for(var i = 0 ; i < tr.childNodes.length ; i++){
              if(tr.childNodes[i] == td_prev){
                index = i;
                break;
              }
            }
            index = parseInt(index);

            $('.grid-size-label:eq(' + (index) + ')', grid_size).css({ width:$(td_prev).outerWidth() });

            // Modify column data
            var options = $(el).data('options');
            options.columns[index]['width'] = $(td_prev).outerWidth();

            // On column resize
            var oncolumnresize = $.val('oncolumnresize', options);
            $.fire_event(oncolumnresize, [ { index:index, width:$(td_prev).outerWidth() } ], el);

          }

          $(window).off('mousemove.gridhead');
          $(window).off('mouseup.gridhead');

        });

      });
      $('.separator', el).click(function(e){
        e.preventDefault();
        e.stopPropagation();
      })

      $('.label', el).on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        var key = $(this).attr('data-key');
        var sort_type = $(this).attr('data-sorttype');
        if(sort_type == 'asc') sort_type = 'desc';
        else if(sort_type == 'desc') sort_type = 'asc';
        else sort_type = 'asc';
        $(this).attr('data-sorttype', sort_type);
        $.fire_event(oncolumnclick, [ [ { key:key, type:sort_type } ] ], el);

      })

    })

  },

  gridhead_attr:function(obj){

    $(this).each(function(){

      for(var key in obj){
        var value = obj[key];
        switch(key){
          case 'height':
            $(this).css({ height:value });
            break;

        }

      }

    })

  },

  gridhead_modify_column:function(columns){

    $(this).each(function(){

      if(!$(this).hasClass('gridhead')) return;

      var options = $(this).data('options');
      var grid = $.val('grid', options);
      var options_columns = $.val('columns', options);

      for(var i = 0 ; i < options_columns.length ; i++){
        var options_column = options_columns[i];
        var options_column_name = $.val('name', options_column, { d:'' });
        var options_column_width = $.val('width', options_column, { d:'' });

        if(options_column_name == '') continue;

        for(var j = 0 ; j < columns.length ; j++){
          var column = columns[j];
          var column_name = $.val('name', column, { d:'' });
          var column_active = $.val('active', column, { d:1 });

          if(options_column_name == column_name){

            if(column_active){

              $(".label[data-key='" + column_name + "']", this).removeClass('inactive');
              $(".grid-size-label[data-key='" + column_name + "']", $(grid)).removeClass('inactive');

            }
            else{

              $(".label[data-key='" + column_name + "']", this).addClass('inactive');
              $(".grid-size-label[data-key='" + column_name + "']", $(grid)).addClass('inactive');

            }

            options['columns'][i]['active'] = column_active;
            column_exists = true;

          }
        }
      }

      $(this).data('options', options);

    });

  }

});$.fn.extend({

  gridsetting:function(options){

    var onchange = $.val('onchange', options);

    this.each(function(){

      var el = this;

      var html = [];

      html.push("<div class='modal-head'>"); // BEGIN modal head
      html.push("<div class='align-center padding10'>");
      html.push("<ul class='tab'>");
      html.push("<li class='active' data-value='presets'>Presets</li>");
      html.push("<li data-value='columns'>Columns</li>");
      html.push("<li data-value='filters'>Filters</li>");
      html.push("</ul>");
      html.push("</div>");
      html.push("</div>"); // END modal head

      html.push("<div class='modal-body padding20'>"); // BEGIN modal body

      html.push("<div class='cont12 space10 gridsetting-presets'>"); // BEGIN Presets
      html.push("<div class='lg12'><button class='blue preset-add-btn'><span class='fa fa-plus'></span> Add Preset...</button></div>");
      html.push("<div class='lg12'><span class='preset-grid'></span></div>");
      html.push("</div>"); // END Presets

      html.push("<div class='cont12 space10 gridsetting-columns' style='display:none'>"); // BEGIN Columns
      html.push("<div class='lg12'>");
      html.push("<button class='blue column-up-btn'><span class='fa fa-caret-up'></span>Up</button>");
      html.push("&nbsp;");
      html.push("<button class='blue column-down-btn'><span class='fa fa-caret-down'></span>Down</button>");
      html.push("</div>");
      html.push("<div class='lg6'><span class='column-grid'></span></div>");
      html.push("<div class='lg6'>"); // BEGIN of lg6
      html.push("<div class='cont12 space10 gridsetting-column-detail'>");
      html.push("<div class='lg3 align-right'><label class='padding10'>Align</label></div>");
      html.push("<div class='lg9'><span class='gridsetting-column-align'></span></div>");
      html.push("<div class='lg3 align-right'><label class='padding10'>Name</label></div>");
      html.push("<div class='lg9'><label class='gridsetting-column-name padding10'></label></div>");
      html.push("<div class='lg3 align-right'><label class='padding10'>Text</label></div>");
      html.push("<div class='lg9'><span class='gridsetting-column-text'></span></div>");
      html.push("<div class='lg3 align-right'><label class='padding10'>Width</label></div>");
      html.push("<div class='lg9'><span class='gridsetting-column-width'></span></div>");
      html.push("</div>");
      html.push("</div>"); // END of lg6
      html.push("</div>"); // END Columns

      html.push("<div class='cont12 space10 gridsetting-filters' style='display:none'>"); // BEGIN Filters
      html.push("<div class='lg12'><button class='blue filter-add-btn'><span class='fa fa-plus'></span> Add Filter...</button></div>");
      html.push("<div class='lg12'><span class='filter-grid'></span></div>");
      html.push("</div>"); // END Filters

      html.push("</div>"); // END modal body

      html.push("<div class='modal-foot'>"); // BEGIN modal foot
      html.push("<button class='blue apply-btn'><span class='fa fa-save'></span> Apply Filter</button>");
      html.push("&nbsp;");
      html.push("<button class='close-btn'><span class='fa fa-times'></span> Close</button>");
      html.push("</div>"); // END modal foot

      $(el).addClass('modal width800 gridsetting');
      $(el).html(html.join(''));

      $('.tab', el).tab({
        onchange:function(item){

          $('.modal-body', el).children().hide();
          $('.gridsetting-' + item.value, el).show();

        }
      });

      $('.preset-add-btn').click(function(){



      });
      $('.preset-grid', el).grid({
        'class': 'transparent',
        columns:[
          { text:'', type:'html', html:'$.gridsetting_preset_option', width:'50px' },
          { text:'Preset Name', name:'text', width:'150px' },
        ]
      });

      $('.column-grid', el).grid({
        'class': 'transparent',
        columns:[
          { text:'Column Name', name:'text', width:'150px' },
          { text:'Width', name:'width', width:'100px' },
        ],
        onselect:function(obj){

          var gridsetting_columns = $(this).closest('.gridsetting-columns');
          var gridsetting_column_detail = $('.gridsetting-column-detail', gridsetting_columns);

          $.el_set(gridsetting_column_detail, obj);
          $('.gridsetting-column-name', gridsetting_column_detail).html($.val('name', obj, { d:'' }));

        }
      });
      $('.gridsetting-column-align', el).dropdown({
        name:"align",
        items:[
          { text:'Left', value:'left' },
          { text:'Center', value:'center' },
          { text:'Right', value:'right' },
        ]
      });
      $('.gridsetting-column-name', el).html("");
      $('.gridsetting-column-text', el).textbox({
        name:"text",
        onchange:function(value){

          var presets = $(el).data('params');
          var gridsetting_column_detail = $(this).closest('.gridsetting-column-detail');
          var name = $('.gridsetting-column-name', gridsetting_column_detail).html();

          for(var i = 0 ; i < presets.presets[presets.active_idx]['columns'].length ; i++){
            if(presets.presets[presets.active_idx]['columns'][i]['name'] == name)
              presets.presets[presets.active_idx]['columns'][i]['text'] = value;
          }

          $(el).data('presets', presets);

        },
      });
      $('.gridsetting-column-width', el).textbox({
        name:"width",
        onchange:function(value){

          var presets = $(el).data('params');
          var gridsetting_column_detail = $(this).closest('.gridsetting-column-detail');
          var name = $('.gridsetting-column-name', gridsetting_column_detail).html();

          for(var i = 0 ; i < presets.presets[presets.active_idx]['columns'].length ; i++){
            if(presets.presets[presets.active_idx]['columns'][i]['name'] == name)
              presets.presets[presets.active_idx]['columns'][i]['width'] = value;
          }

          $(el).data('presets', presets);

        },
      });

      $('.filter-add-btn', el).click(function(){
        $('.filter-grid', el).grid_add();
      });
      $('.filter-grid', el).grid({
        'class': 'transparent',
        columns:[
          { text:'', type:'html', html:'$.gridsetting_grid_option', width:'50px' },
          // { text:'Type', type:'html', html:'$.gridsetting_grid_type', width:'100px' },
          { text:'Key', type:'html', html:'$.gridsetting_grid_key', width:'150px' },
          { text:'Operator', type:'html', html:'$.gridsetting_grid_opt', width:'150px' },
          { text:'Value', type:'html', html:'$.gridsetting_grid_val', width:'150px' },
        ]
      });

      $('.apply-btn', el).click(function(){

        var filters = $('.filter-grid', el).grid_value();
        var params = $(el).data('params');
        var active_idx = parseInt($.val('active_idx', params, { d:0 }));
        params['presets'][active_idx]['filters'] = filters;
        $.fire_event(onchange, [ params ], el);
        $(el).modal_close();

      });
      $('.close-btn', el).click(function(){
        $(el).modal_close();
      });

    })

  },

  gridsetting_close:function(){

    $(this).modal_close();

  },

  gridsetting_open:function(params, columns){

    this.each(function(){

      var presets = $.val('presets', params);
      var preset = params.presets[params.active_idx];
      var columns = $.val('columns', params);
      var filters = $.val('filters', params);

      $(this).data('params', params);
      $(this).data('columns', columns);

      $('.preset-grid', this).grid_set(presets);
      $('.column-grid', this).grid_set(columns);
      $('.filter-grid', this).grid_set(filters);
      $(this).modal_open({ height:window.innerHeight * .8 });

    })

  },

})

$.extend({

  gridsetting_preset_option:function(obj){

    $(this).html("<button class='preset-grid-options'><span class='fa fa-times'></span></button>");
    $('.preset-grid-options', this).click(function(){

      $(this).closest('tr').remove();

    });

  },

  gridsetting_grid_option:function(obj){

    $(this).html("<button class='filter-grid-options'><span class='fa fa-times'></span></button>");
    $('.filter-grid-options', this).click(function(){

      $(this).closest('tr').remove();

    });

  },

  gridsetting_grid_type:function(obj){

    $(this).html("<span class='filter-grid-type'></span>");
    $('.filter-grid-type', this).textbox({
      name:'type',
      value:$.val('type', obj, { d:null })
    });

  },

  gridsetting_grid_key:function(obj, columns){

    var el = $(this).closest('.gridsetting');
    var params = $(el).data('params');
    var preset = params.presets[params.active_idx];
    var columns = params.columns;

    var items = [];
    if($.type(columns) == 'array')
      for(var i = 0 ; i < columns.length ; i++){
        var column = columns[i];
        var column_name = $.val('name', column, { d:'' });
        var column_text = $.val('text', column, { d:column_name });
        if(column_name.length > 0){
          items.push({
            text:column_text,
            value:column_name,
          })
        }
      }

    $(this).html("<span class='filter-grid-key'></span>");
    $('.filter-grid-key', this).dropdown({
      name:'key',
      items:items,
      value:$.val('key', obj, { d:null })
    });

  },

  gridsetting_grid_opt:function(obj){

    $(this).html("<span class='filter-grid-opt'></span>");
    $('.filter-grid-opt', this).dropdown({
      name:'operator',
      items:[
        { text:'Contains', value:'contains' },
        { text:'Equals', value:'equals' },
      ],
      value:$.val('operator', obj, { d:null })
    });

  },

  gridsetting_grid_val:function(obj){

    $(this).html("<span class='filter-grid-val'></span>");
    $('.filter-grid-val', this).textbox({
      name:'value',
      value:$.val('value', obj, { d:null })
    });

  },
  
});$.fn.extend({

  hidden: function (options) {

    var name = $.val('name', options, { d:'' });

    $(this).each(function () {

      var html = [];
      $(this).html(html.join(''));
      $(this).attr('data-type', 'hidden');
      $(this).attr('data-name', name);
      $(this).addClass('hidden');
      $(this).data('options', options);

    });

  },

  hidden_val:function(val){

    if(typeof val == 'undefined'){

      var results = [];
      $(this).each(function(){
        results.push($(this).data('value'));
      });
      return results.length > 1 ? results : (results.length == 1 ? results[0] : '');

    }

    else{

      $(this).each(function(){

        $(this).data('value', val);

      })

    }


  }

});$.fn.extend({

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

});$.extend({

  layout_resize:function(){

    $('.layout-sidebar, .layout-main, .layout-ext', $('.layout')).css({
      height:window.innerHeight - $('.header').outerHeight()
    })

  }

})

$.fn.extend({

  layout:function(options){

    var className = $.val('class', options, { d:'' });
    var size = $.val('size', options, { d:{} });
    var size_large = $.val('large', size, { d:'300px auto 400px' });
    var sizes_large = size_large.split(' ');

    $(this).each(function(){

      var sidebar_width = $.val(0, sizes_large, { d:'200px' });
      var main_width = '100%';
      var ext_width = $.val(2, sizes_large, { d:'300px' });
      //ext_width = $.calc_size(ext_width);

      $(this).addClass('layout');
      $(this).addClass(className);
      $('.layout-sidebar', this).css({ flex:"0 0 " + sidebar_width });
      $('.layout-main', this).css({ flex:"1 1 " + main_width });
      $('.layout-ext', this).css({ flex:"0 0 " + ext_width });

      $('.layout-sidebar, .layout-main, .layout-ext', this).css({
        height:window.innerHeight - $('.header').outerHeight()
      })

    })

    $(window).on('resize.layout', function(){
      $.layout_resize();
    });

  }

});$.extend({

  layout2_resize:function(){

    $('.layout2').layout2_resize();

  }

})

$.fn.extend({

  layout2:function(options){

    var className = $.val('class', options, { d:'' });
    var size = $.val('size', options, { d:'300px auto 400px' });
    var sizes = size.split(' ');

    $(this).each(function(){

      $(this).addClass('layout2');
      $(this).addClass(className);
      $(this).data('options', options);
      $(this).layout2_resize();

    })

    $(window).on('resize.layout', function(){
      $.layout2_resize();
    });

  },

  layout2_resize:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var onresize = $.val('onresize', options);
      var ext_hidden = $.val('ext_hidden', options);
      var size = $.val('size', options, { d:'300px auto 400px' });
      var sizes = size.split(' ');

      var layout_height = window.innerHeight - $('.header').outerHeight();
      var sidebar_width = $.val(0, sizes, { d:'200px' });
      var main_height = $.val(2, sizes, { d:'300px' });
      var layout_height = window.innerHeight - $('.header').outerHeight();
      main_height = $.calc_size(main_height, layout_height);
      var ext_height = layout_height - main_height;

      $('.layout-sidebar', this).css({ flex:"0 0 " + sidebar_width, height:layout_height });
      $('.layout-content', this).css({ flex:"1 1 auto" });

      if(ext_hidden == 0){

        $(this).removeClass('ext-hidden');
        $('.layout-main', this).css({ height:main_height });
        $('.layout-ext', this).css({ height:ext_height });

      }
      else{

        $(this).addClass('ext-hidden');
        $('.layout-main', this).css({ height:layout_height });
        $('.layout-ext', this).css({ height:0 });

      }

      $.fire_event(onresize, [],  this);

    });

  },

  layout2_toggleext:function(state){

    /*
     * state: true|false, true = open, false = closed
     */

    $(this).each(function(){

      if(!$(this).hasClass('layout2')) return;

      var options = $(this).data('options');
      options['ext_hidden'] = state ? 0 : 1;
      $(this).data('options', options);
      $(this).layout2_resize();

    })

  },

  layout2_ext_state:function(){

    var state = 0;
    $(this).each(function(){

      var options = $(this).data('options');
      state = $.val('ext_hidden', options, { d:-1 }) > 0 ? 0 : 1;

    });
    return state;

  }

});$.fn.extend({

  modal_open:function(options){

    this.each(function(){

      var instance = this;
      $(instance).addClass('on');

      //var width = parseInt($.val('width', options, { d:null }));
      //var height = parseInt($.val('height', options, { d:Math.round(window.innerHeight * .78) }));
      var modal_body_height = $(instance).outerHeight() - 5 - ($('.modal-head', instance).outerHeight() + $('.modal-foot', instance).outerHeight());

      //if(!isNaN(width)) $('.modal-body', instance).css({ 'width':width });
      if(!isNaN(modal_body_height)) $('.modal-body', instance).css({ 'height':modal_body_height });

      //var left = (window.innerWidth - instance.clientWidth) / 2;
      //var top = (window.innerHeight - instance.clientHeight) / 2;
      //$(instance).css({ left:left, top:top });

      //if($('.modal-bg').length == 0)
        //$(document.body).append("<div class='modal-bg'></div>");
      //$('.modal-bg').addClass('on');

      var reset = $.val('reset', options, { d:false });
      if(reset === true) $(instance).reset();

      var value = $.val('value', options, { d:null });
      if(value != null) $(instance).val(options['value']);

    })

  },

  modal_close:function(exp, options){

    this.each(function(){

      var instance = this;
      $(instance).removeClass('on');
      $('.modal-bg').removeClass('on');

    });

  }

});$.extend({

  popup_close:function(el){

    $(el).removeClass('on');

  },
  popup_open:function(el, refEl, options){

    $.popup_close_all();
    $(el).addClass('on');

    var css = {};
    var offset = $(refEl).offset();
    var max_width = offset.left + el.clientWidth;

    var top = offset.top - $(window).scrollTop() + $(refEl).outerHeight() + 1;
    var max_height = window.innerHeight - top - 10;

    css['top'] = top;
    css['max-height'] = max_height;

    if(max_width > window.innerWidth) offset.left = window.innerWidth - el.clientWidth;
    css['left'] = offset.left;

    var min_width = $.val('min_width', options);
    if(!isNaN(parseInt(min_width))) css['min-width'] = min_width;
    $(el).css(css);

  },
  popup_toggle:function(el, refEl, options){

    if(el.classList.contains('on'))
      $.popup_close(el, refEl, options);
    else
      $.popup_open(el, refEl, options);

  },
  popup_close_all:function(){

    var popups = document.body.querySelectorAll('.popup');
    for(var i = 0 ; i < popups.length ; i++)
      $.popup_close(popups[i]);

  },
  
});$.fn.extend({

  radio:function(options){

    $(this).each(function(){

      var items = $.val('items', options, { d:null });
      var className = $.val('class', options, { d:'' });
      var text = $.val('text', options, { d:'' });
      var name = $.val('name', options, { d:'' });
      var value = $.val('value', options, { d:'' });

      var html = [];
      if($.type(items) == 'array'){
        var uname = 'radio-name-' + $.uniqid();
        for(var i = 0 ; i < items.length ; i++){
          var i_item = items[i];
          var i_text = i_item.text;
          var i_value = i_item.value;
          var checked = value != '' && value == i_value ? true : false;

          var uid = 'radio-' + $.uniqid();
          html.push("<input type='radio' id='" + uid + "' value=\"" + i_value + "\" name='" + uname + "'" + (checked ? ' checked' : '') + "/>");
          html.push("<label for='" + uid + "'>" + i_text + "</label>");
        }
      }
      else{
        var checked = parseInt(value) == 1 || value === true ? true : false;
        var uid = 'radio-' + $.uniqid();
        html.push("<input type='radio' id='" + uid + "'" + (checked ? ' checked' : '') + "/>");
        html.push("<label for='" + uid + "'>" + text + "</label>");
      }

      $(this).addClass('radio');
      $(this).addClass(className);
      $(this).attr({
        'data-type':'radio'
      });
      $(this).html(html.join(''));

    })

  },

  radio_val:function(value){

    if(typeof value == 'undefined'){

      var results = [];
      $(this).each(function(){

        var inputs = this.querySelectorAll("input");
        if(inputs.length == 1){
          results.push(inputs[0].checked ? 1 : 0);
        }
        else{
          for(var i = 0 ; i < inputs.length ; i++){
            if(inputs[i].checked){
              results.push(inputs[i].value);
            }
          }
        }

      })
      results = results.join(',');
      return results;

    }

    else{

      $(this).each(function(){

        var inputs = this.querySelectorAll("input");
        if(inputs.length == 1){
          inputs[0].checked = (parseInt(value) == 1 || value === true) ? true : false;
        }
        else{
          var value_exists = false;
          for(var i = 0 ; i < inputs.length ; i++){
            if(inputs[i].value == value){
              inputs[i].checked = true;
              value_exists = true;
              break;
            }
          }
          if(!value_exists) $('input', this).attr('checked', false);
        }

      });

    }

  }

});
$.extend({

  role_init:function(pCont){

    var cont = typeof pCont != 'undefined' && pCont instanceof HTMLElement ? pCont : document.body;

    $('*[data-role]', cont).each(function(){

      var role = this.getAttribute("data-role");
      switch(role){
        case 'modal.close':
          $(this).click(function(){
            $(this).closest('.modal').modal_close();
          })
          break;
        case 'url.open':
          var url = $(this).attr('data-role-value');
          $(this).click(function(){
            window.location = url;
          })
          break


      }

    });


  }

});$.fn.extend({

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

});$.fn.extend({

  tab:function(options){

    var container = $.val('container', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var onchange = $.val('onchange', options);

    this.each(function(){

      var instance = this;

      $(instance).attr('data-type', 'tab');
      $(instance).attr('data-name', name);
      $(instance).data('options', options);

      // Tab item click handler
      $('li', instance).click(function(){
        if(this.classList.contains('active'));
        else{
          $('li', this.parentNode).removeClass('active');
          $(this).addClass('active');
          var text = this.innerHTML;
          var value = this.getAttribute("data-value");
          if(value == null) value = $.slug(text);

          var index = $(this).index();
          if($(container).length > 0){
            $(container + ">*").addClass('off');
            $(container + ">*:eq(" + index + ")").removeClass('off');
          }

          $.fire_event(onchange, [ { text:text, value:value } ], instance);
        }
      });

    });

  },

  tab_set:function(value){

    var el = this;
    var options = $(el).data('options');
    var onchange = $.val('onchange', options);

    $('li', this).removeClass('active');
    $('li', this).each(function(){

      var li_text = this.innerHTML;
      var li_value = this.getAttribute("data-value");
      if(li_value == null) li_value = $.slug(li_text);
      if(li_value == value){
        $(this).addClass('active');
        $.fire_event(onchange, [
          {
            text:li_text,
            value:li_value
          }
        ], el);
      }

    });

  }

});$.fn.extend({

  textarea:function(options){

    var placeholder = $.val('placeholder', options, { d:'' });
    var className = $.val('class', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var height = $.val('height', options, { d:"1em" });
    var width = $.val('width', options);
    var maxlength = $.val('maxlength', options, { d:'' });
    var onblur = $.val('onblur', options);
    var onkeyup = $.val('onkeyup', options);
    var onchange = $.val('onchange', options);

    var css = {
      width:width
    };

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<textarea rows='1' placeholder='" + placeholder + "' style='height:" + height + ";' maxlength='" + maxlength + "'></textarea>");
      html.push("<span class='icon fa hidden'></span>");

      $(el).addClass('textarea');
      $(el).addClass(className);
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'textarea');
      $(el).attr('data-name', name);
      $(el).data('options', options);

      $('textarea', el)
      .blur(function(e){
        $(el).textarea_validate();
        $.fire_event(onblur, [], el);
      })
      .keyup(function(e){

        $.fire_event(onkeyup, [ this.value ], el);
        if($(this).data('last_value') != this.value){
          $.fire_event(onchange, [ this.value ], el);
        }
        $(this).data('last_value', this.value);

      });

      $('textarea', el).each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight <= 0 ? '' : this.scrollHeight) + 'px;overflow-y:hidden;');
      })
      .on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });

    });

  },

  textarea_val:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('textarea', this).val());
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('textarea', this).val(value);
      })
    }

  },

  textarea_placeholder:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('input', this).attr('placeholder'));
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('input', this).attr('placeholder', value);
      })
    }

  },

  textarea_reset:function(){

    $(this).textarea_val('');

  },

  textarea_validate:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var required = $.val('required', options, { d:false });
      var required_text = $.val('required_text', options, { d:'Field required.' });
      var validation = $.val('validation', options, { d:'' });
      var validation_text = $.val('validation_text', options, { d:'Validation error.' });
      var value = $(this).textarea_val();

      var valid = true;
      var invalid_message = '';

      if(required){
        if(value.toString().trim() == ''){
          valid = false;
          invalid_message = required_text;
        }
        else if(validation != ''){
          switch(validation){
            default:
              var regex = new RegExp(validation);
              valid = regex.test(value);
              if(!valid) invalid_message = validation_text;
              break;
          }
        }
      }
      else if(value.toString().length > 0){
        switch(validation){
          default:
            var regex = new RegExp(validation);
            valid = regex.test(value);
            if(!valid) invalid_message = validation_text;
            break;
        }
      }

      if(!valid){
        $(this).addClass('invalid');
        console.warn(invalid_message);
      }
      else{
        $(this).removeClass('invalid');
      }

    })

  }

});$.fn.extend({

  textbox:function(options){

    /* Properties:
     * - onkeyup // raise on key up event
     * - onchange // raise on change event, onchange has delay of 300ms
     *
     *
     *
     */

    var placeholder = $.val('placeholder', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var className = $.val('class', options, { d:'' });
    var value = $.val('value', options, { d:'' });
    var readonly = $.val('readonly', options, { d:false });
    var maxlength = $.val('maxlength', options, { d:'' });
    var mode = $.val('mode', options, { d:"text" });
    var width = $.val('width', options);
    var onblur = $.val('onblur', options);
    var onkeyup = $.val('onkeyup', options);
    var onchange = $.val('onchange', options);

    var css = {
      width:width
    };

    this.each(function(){

      var el = this;

      // Initialize html content
      var html = [];
      html.push($.p('<input type="$1" placeholder="$1" maxlength="$1"/>', [ mode, placeholder, maxlength ]));
      html.push("<span class='icon fa hidden'></span>");

      // Default attributes
      $(el).addClass('textbox');
      $(el).addClass(className);
      $(el).css(css);
      $(el).html(html.join(''));
      $(el).attr('data-type', 'textbox');
      $(el).attr('data-name', name);
      $(el).data('options', options);
      $('input', el).val(value);

      // Event handler
      $('input', el)
      .blur(function(e){
        $(el).textbox_validate();
        $.fire_event(onblur, [], el);
      })
      .keyup(function(e){

        $.fire_event(onkeyup, [ this.value ], el);
        if($(this).data('last_value') != this.value){
          $.fire_event(onchange, [ this.value ], el);
        }
        $(this).data('last_value', this.value);

      });

    });

  },

  textbox_val:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('input', this).val());
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('input', this).val(value);
      })
    }

  },

  textbox_placeholder:function(value){

    // Getter
    if(typeof value == 'undefined'){
      var result = [];
      $(this).each(function(){
        result.push($('input', this).attr('placeholder'));
      })
      return result.length > 1 ? result : (result.length == 1 ? result[0] : '');
    }

    // Setter
    else{
      $(this).each(function(){
        $('input', this).attr('placeholder', value);
      })
    }

  },

  textbox_reset:function(){

    $(this).textbox_val('');

  },

  textbox_validate:function(){

    $(this).each(function(){

      var options = $(this).data('options');
      var required = $.val('required', options, { d:false });
      var required_text = $.val('required_text', options, { d:'Field required.' });
      var validation = $.val('validation', options, { d:'' });
      var validation_text = $.val('validation_text', options, { d:'Validation error.' });
      var value = $(this).textbox_val();

      var valid = true;
      var invalid_message = '';

      if(required){
        if(value.toString().trim() == ''){
          valid = false;
          invalid_message = required_text;
        }
        else if(validation != ''){
          switch(validation){
            default:
              var regex = new RegExp(validation);
              valid = regex.test(value);
              if(!valid) invalid_message = validation_text;
              break;
          }
        }
      }
      else if(value.toString().length > 0){
        switch(validation){
          default:
            var regex = new RegExp(validation);
            valid = regex.test(value);
            if(!valid) invalid_message = validation_text;
            break;
        }
      }

      if(!valid){
        $(this).addClass('invalid');
        console.warn(invalid_message);
      }
      else{
        $(this).removeClass('invalid');
      }

    })

  }

});$.fn.extend({

  toggle:function(options){

    var className = $.val('class', options, { d:'' });
    var value = $.val('value', options, { d:false });

    this.each(function(){

      var el = this;
      var html = [];
      html.push("<span class='main-toggle'></span>");

      el.innerHTML = html.join('');
      $(this).addClass('toggle');
      $(this).addClass(className);
      $(el).attr('data-type', 'toggle');
      $(el).toggle_val(value);

      el.querySelector('.main-toggle').addEventListener('click', function(){

        if(this.parentNode.classList.contains('on'))
          this.parentNode.classList.remove('on');
        else
          this.parentNode.classList.add('on');

      });

      return el;

    })

  },

  toggle_val:function(value){

    if(!$(this).hasClass('toggle')) return undefined;

    if(typeof value == 'undefined'){

      return $(this).hasClass('on') ? 1 : 0;

    }


    else{

      if(value == true || value == 1)
        $(this).addClass('on');
      else
        $(this).removeClass('on');

    }

  },

});$.extend({

  tooltip:function(refEl, html){

    var instance = $('.tooltip');
    if(instance.length == 0) $.warn('No tooltip defined.');
    $(instance).addClass('on');

    var offset = refEl.getBoundingClientRect();

    var css = {};

    var exp = [];
    console.log(refEl);

    css.left = offset.left;

    console.log([ offset.top, offset.top  + offset.height + $(instance).outerHeight() + 10, window.innerHeight ]);

    // Show on up side
    if(offset.top  + offset.height + $(instance).outerHeight() + 10 > window.innerHeight){
      css.top = offset.top - $(instance).outerHeight() - 10;
      exp.push("<div class='arrow-down'></div>");
    }
    // Show on down side
    else{
      css.top = offset.top + offset.height + 10;
      exp.push("<div class='arrow-up'></div>");
    }

    exp.push(html);

    $(instance).html(exp.join(''));
    $(instance).css(css);

  },

  tooltip_remove:function(){

    $('.tooltip').removeClass('on');

  },


});$.extend({
  date:function(format, timestamp){

    var that = this;
    var jsdate, f;
    // Keep this here (works, but for code commented-out below for file size reasons)
    // var tal= [];
    var txt_words = [
      'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // trailing backslash -> (dropped)
    // a backslash followed by any character (including backslash) -> the character
    // empty string -> empty string
    var formatChr = /\\?(.?)/gi;
    var formatChrCb = function(t, s) {
      return f[t] ? f[t]() : s;
    };
    var _pad = function(n, c) {
      n = String(n);
      while (n.length < c) {
        n = '0' + n;
      }
      return n;
    };
    f = {
      // Day
      d: function() { // Day of month w/leading 0; 01..31
        return _pad(f.j(), 2);
      },
      D: function() { // Shorthand day name; Mon...Sun
        return f.l()
          .slice(0, 3);
      },
      j: function() { // Day of month; 1..31
        return jsdate.getDate();
      },
      l: function() { // Full day name; Monday...Sunday
        return txt_words[f.w()] + 'day';
      },
      N: function() { // ISO-8601 day of week; 1[Mon]..7[Sun]
        return f.w() || 7;
      },
      S: function() { // Ordinal suffix for day of month; st, nd, rd, th
        var j = f.j();
        var i = j % 10;
        if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
          i = 0;
        }
        return ['st', 'nd', 'rd'][i - 1] || 'th';
      },
      w: function() { // Day of week; 0[Sun]..6[Sat]
        return jsdate.getDay();
      },
      z: function() { // Day of year; 0..365
        var a = new Date(f.Y(), f.n() - 1, f.j());
        var b = new Date(f.Y(), 0, 1);
        return Math.round((a - b) / 864e5);
      },

      // Week
      W: function() { // ISO-8601 week number
        var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
        var b = new Date(a.getFullYear(), 0, 4);
        return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
      },

      // Month
      F: function() { // Full month name; January...December
        return txt_words[6 + f.n()];
      },
      m: function() { // Month w/leading 0; 01...12
        return _pad(f.n(), 2);
      },
      M: function() { // Shorthand month name; Jan...Dec
        return f.F()
          .slice(0, 3);
      },
      n: function() { // Month; 1...12
        return jsdate.getMonth() + 1;
      },
      t: function() { // Days in month; 28...31
        return (new Date(f.Y(), f.n(), 0))
          .getDate();
      },

      // Year
      L: function() { // Is leap year?; 0 or 1
        var j = f.Y();
        return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
      },
      o: function() { // ISO-8601 year
        var n = f.n();
        var W = f.W();
        var Y = f.Y();
        return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
      },
      Y: function() { // Full year; e.g. 1980...2010
        return jsdate.getFullYear();
      },
      y: function() { // Last two digits of year; 00...99
        return f.Y()
          .toString()
          .slice(-2);
      },

      // Time
      a: function() { // am or pm
        return jsdate.getHours() > 11 ? 'pm' : 'am';
      },
      A: function() { // AM or PM
        return f.a()
          .toUpperCase();
      },
      B: function() { // Swatch Internet time; 000..999
        var H = jsdate.getUTCHours() * 36e2;
        // Hours
        var i = jsdate.getUTCMinutes() * 60;
        // Minutes
        var s = jsdate.getUTCSeconds(); // Seconds
        return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
      },
      g: function() { // 12-Hours; 1..12
        return f.G() % 12 || 12;
      },
      G: function() { // 24-Hours; 0..23
        return jsdate.getHours();
      },
      h: function() { // 12-Hours w/leading 0; 01..12
        return _pad(f.g(), 2);
      },
      H: function() { // 24-Hours w/leading 0; 00..23
        return _pad(f.G(), 2);
      },
      i: function() { // Minutes w/leading 0; 00..59
        return _pad(jsdate.getMinutes(), 2);
      },
      s: function() { // Seconds w/leading 0; 00..59
        return _pad(jsdate.getSeconds(), 2);
      },
      u: function() { // Microseconds; 000000-999000
        return _pad(jsdate.getMilliseconds() * 1000, 6);
      },

      // Timezone
      e: function() { // Timezone identifier; e.g. Atlantic/Azores, ...
        // The following works, but requires inclusion of the very large
        // timezone_abbreviations_list() function.
        /*              return that.date_default_timezone_get();
         */
        throw 'Not supported (see source code of date() for timezone on how to add support)';
      },
      I: function() { // DST observed?; 0 or 1
        // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
        // If they are not equal, then DST is observed.
        var a = new Date(f.Y(), 0);
        // Jan 1
        var c = Date.UTC(f.Y(), 0);
        // Jan 1 UTC
        var b = new Date(f.Y(), 6);
        // Jul 1
        var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
        return ((a - c) !== (b - d)) ? 1 : 0;
      },
      O: function() { // Difference to GMT in hour format; e.g. +0200
        var tzo = jsdate.getTimezoneOffset();
        var a = Math.abs(tzo);
        return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
      },
      P: function() { // Difference to GMT w/colon; e.g. +02:00
        var O = f.O();
        return (O.substr(0, 3) + ':' + O.substr(3, 2));
      },
      T: function() { // Timezone abbreviation; e.g. EST, MDT, ...
        // The following works, but requires inclusion of the very
        // large timezone_abbreviations_list() function.
        /*              var abbr, i, os, _default;
         if (!tal.length) {
         tal = that.timezone_abbreviations_list();
         }
         if (that.php_js && that.php_js.default_timezone) {
         _default = that.php_js.default_timezone;
         for (abbr in tal) {
         for (i = 0; i < tal[abbr].length; i++) {
         if (tal[abbr][i].timezone_id === _default) {
         return abbr.toUpperCase();
         }
         }
         }
         }
         for (abbr in tal) {
         for (i = 0; i < tal[abbr].length; i++) {
         os = -jsdate.getTimezoneOffset() * 60;
         if (tal[abbr][i].offset === os) {
         return abbr.toUpperCase();
         }
         }
         }
         */
        return 'UTC';
      },
      Z: function() { // Timezone offset in seconds (-43200...50400)
        return -jsdate.getTimezoneOffset() * 60;
      },

      // Full Date/Time
      c: function() { // ISO-8601 date.
        return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
      },
      r: function() { // RFC 2822
        return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
      },
      U: function() { // Seconds since UNIX epoch
        return jsdate / 1000 | 0;
      }
    };
    this.date = function(format, timestamp) {
      that = this;
      jsdate = (timestamp === undefined ? new Date() : // Not provided
          (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
            new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
      );
      return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);

  },
  uniqid:function(){

    if(typeof $.__UNIQID == 'undefined') $.__UNIQID = 0;
    return ++$.__UNIQID;

  },

  val:function(key, obj, options){

    if(typeof options == 'undefined' || $.type(options) != 'object') options = {};

    var value = null;
    var default_value = typeof options['default_value'] != 'undefined' ? options['default_value'] : (typeof options['d'] != 'undefined' ? options['d'] : null)
    var datatype = typeof options['t'] != 'undefined' ? options['t'] : (typeof options['datatype'] != 'undefined' ? options['datatype'] : 'string');
    var required = typeof options['required'] != 'undefined' && required == 1 ? true : false;

    if($.type(obj) == 'object'){

      if($.type(key) == 'array'){

        value = null;
        for(var i = 0 ; i < key.length ; i++){

          var k = key[i];
          v = $.val(k, obj, { default_value:null });
          if(v != null){
            value = v;
            break;
          }

        }

      }
      else if($.type(key) == 'string' || $.type(key) == 'number'){

        if(typeof obj[key] != 'undefined')
          value = obj[key];

      }

    }
    else if($.type(obj) == 'array'){

      if(typeof obj[key] != 'undefined')
        value = obj[key];

    }

    if(required){

      if(value == null){

      }

    }
    else{

      value = value == null && default_value != null ? default_value : value;

    }

    switch(datatype){

      case 'number':
      case 'integer':
      case 'float':
      case 'double':
        value = parseFloat(value);
        break;

    }


    return value;

  },

  strtotime:function(text, now) {
    //  discuss at: http://phpjs.org/functions/strtotime/
    //     version: 1109.2016
    // original by: Caio Ariede (http://caioariede.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Caio Ariede (http://caioariede.com)
    // improved by: A. Matías Quezada (http://amatiasq.com)
    // improved by: preuter
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Mirko Faber
    //    input by: David
    // bugfixed by: Wagner B. Soares
    // bugfixed by: Artur Tchernychev
    //        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    //   example 1: strtotime('+1 day', 1129633200);
    //   returns 1: 1129719600
    //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    //   returns 2: 1130425202
    //   example 3: strtotime('last month', 1129633200);
    //   returns 3: 1127041200
    //   example 4: strtotime('2009-05-04 08:30:00 GMT');
    //   returns 4: 1241425800

    var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

    if (!text) {
      return fail;
    }


    // Accept YYYYMMDD format
    if(/^\d{8}$/.test(text)){
      text = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2);
    }

    // Unecessary spaces
    text = text.replace(/^\s+|\s+$/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/[\t\r\n]/g, '')
      .toLowerCase();

    // in contrast to php, js Date.parse function interprets:
    // dates given as yyyy-mm-dd as in timezone: UTC,
    // dates with "." or "-" as MDY instead of DMY
    // dates with two-digit years differently
    // etc...etc...
    // ...therefore we manually parse lots of common date formats
    match = text.match(
      /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

    if (match && match[2] === match[4]) {
      if (match[1] > 1901) {
        switch (match[2]) {
          case '-':
          { // YYYY-M-D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '.':
          { // YYYY.M.D is not parsed by strtotime()
            return fail;
          }
          case '/':
          { // YYYY/M/D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        }
      } else if (match[5] > 1901) {
        switch (match[2]) {
          case '-':
          { // D-M-YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '.':
          { // D.M.YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '/':
          { // M/D/YYYY
            if (match[1] > 12 || match[3] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        }
      } else {
        switch (match[2]) {
          case '-':
          { // YY-M-D
            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
              return fail;
            }

            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
            return new Date(year, parseInt(match[3], 10) - 1, match[5],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '.':
          { // D.M.YY or H.MM.SS
            if (match[5] >= 70) { // D.M.YY
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }

              return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                  match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
            }
            if (match[5] < 60 && !match[6]) { // H.MM.SS
              if (match[1] > 23 || match[3] > 59) {
                return fail;
              }

              today = new Date();
              return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                  match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
            }

            return fail; // invalid format, cannot be parsed
          }
          case '/':
          { // M/D/YY
            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
              return fail;
            }

            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
            return new Date(year, parseInt(match[1], 10) - 1, match[3],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case ':':
          { // HH:MM:SS
            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
              return fail;
            }

            today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
          }
        }
      }
    }

    // other formats and "now" should be parsed by Date.parse()
    if (text === 'now') {
      return now === null || isNaN(now) ? new Date()
          .getTime() / 1000 | 0 : now | 0;
    }
    if (!isNaN(parsed = Date.parse(text))) {
      return parsed / 1000 | 0;
    }

    date = now ? new Date(now * 1000) : new Date();
    days = {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
    };
    ranges = {
      'yea': 'FullYear',
      'mon': 'Month',
      'day': 'Date',
      'hou': 'Hours',
      'min': 'Minutes',
      'sec': 'Seconds'
    };

    function lastNext(type, range, modifier) {
      var diff, day = days[range];

      if (typeof day !== 'undefined') {
        diff = day - date.getDay();

        if (diff === 0) {
          diff = 7 * modifier;
        } else if (diff > 0 && type === 'last') {
          diff -= 7;
        } else if (diff < 0 && type === 'next') {
          diff += 7;
        }

        date.setDate(date.getDate() + diff);
      }
    }

    function process(val) {
      var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
        type = splt[0],
        range = splt[1].substring(0, 3),
        typeIsNumber = /\d+/.test(type),
        ago = splt[2] === 'ago',
        num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

      if (typeIsNumber) {
        num *= parseInt(type, 10);
      }

      if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
        return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
      }

      if (range === 'wee') {
        return date.setDate(date.getDate() + (num * 7));
      }

      if (type === 'next' || type === 'last') {
        lastNext(type, range, num);
      } else if (!typeIsNumber) {
        return false;
      }

      return true;
    }

    times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
      '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
      '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
    regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

    match = text.match(new RegExp(regex, 'gi'));
    if (!match) {
      return fail;
    }

    for (i = 0, len = match.length; i < len; i++) {
      if (!process(match[i])) {
        return fail;
      }
    }

    // ECMAScript 5 only
    // if (!match.every(process))
    //    return false;

    return (date.getTime() / 1000);
  },

  mktime:function() {
    //  discuss at: http://phpjs.org/functions/mktime/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: baris ozdil
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: FGFEmperor
    // improved by: Brett Zamir (http://brett-zamir.me)
    //    input by: gabriel paderni
    //    input by: Yannoo
    //    input by: jakes
    //    input by: 3D-GRAF
    //    input by: Chris
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Marc Palau
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Theriault
    //        note: The return values of the following examples are
    //        note: received only if your system's timezone is UTC.
    //   example 1: mktime(14, 10, 2, 2, 1, 2008);
    //   returns 1: 1201875002
    //   example 2: mktime(0, 0, 0, 0, 1, 2008);
    //   returns 2: 1196467200
    //   example 3: make = mktime();
    //   example 3: td = new Date();
    //   example 3: real = Math.floor(td.getTime() / 1000);
    //   example 3: diff = (real - make);
    //   example 3: diff < 5
    //   returns 3: true
    //   example 4: mktime(0, 0, 0, 13, 1, 1997)
    //   returns 4: 883612800
    //   example 5: mktime(0, 0, 0, 1, 1, 1998)
    //   returns 5: 883612800
    //   example 6: mktime(0, 0, 0, 1, 1, 98)
    //   returns 6: 883612800
    //   example 7: mktime(23, 59, 59, 13, 0, 2010)
    //   returns 7: 1293839999
    //   example 8: mktime(0, 0, -1, 1, 1, 1970)
    //   returns 8: -1

    var d = new Date(),
      r = arguments,
      i = 0,
      e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

    for (i = 0; i < e.length; i++) {
      if (typeof r[i] === 'undefined') {
        r[i] = d['get' + e[i]]();
        r[i] += (i === 3); // +1 to fix JS months.
      } else {
        r[i] = parseInt(r[i], 10);
        if (isNaN(r[i])) {
          return false;
        }
      }
    }

    // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

    // Set year, month (-1 to fix JS months), and date.
    // !This must come before the call to setHours!
    d.setFullYear(r[5], r[3] - 1, r[4]);

    // Set hours, minutes, and seconds.
    d.setHours(r[0], r[1], r[2]);

    // Divide milliseconds by 1000 to return seconds and drop decimal.
    // Add 1 second if negative or it'll be off from PHP by 1 second.
    return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
  },

  date_parse:function(value){

    switch(value){
      case 'this_month':
        value = $.date('Ym') + '01-' + $.date('Ymd', $.mktime(0, 0, 0, parseInt($.date('m')) + 1, 0, $.date('Y')));
        break;
    }

    return value;

  },

  start_day_of_month:function(year, month){

    var N = $.date('N', $.mktime(0, 0, 0, month, 1, year));
    return N;
  },

  last_date_of_month:function(year, month){

    var d = 27;
    do{
      d++;
      var j = parseInt($.date('j', $.mktime(0, 0, 0, month, d, year)));

      if(j != d){
        d--;
        break;
      }
    }
    while(true);
    return d;
  },

  api_get:function(url, data, callback, errcallback){

    var qs = $.http_build_query(data);
    url += qs.length > 0 ? "?" + qs : '';

    // Process
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.addEventListener('load', function(){
      if(this.readyState == 4){

        var obj = $.eval_as_object(this.responseText);
        var error = $.val('error', obj, { d:0, datatype:"integer" });
        var error_message = $.val('error_message', obj, { d:'' });

        if(error > 0){
          if(errcallback != null)
            $.fire_event(errcallback, [ this.responseText ], xmlhttp);
          else
            alert(error_message);
        }
        else{
          $.fire_event(callback, [ obj ], xmlhttp);
        }

      }
    });
    xmlhttp.addEventListener('error', function(){
      if(typeof errcallback != 'undefined' || errcallback != null)
        $.fire_event(errcallback);
      else
        console.log(this.responseText);
    });
    xmlhttp.send();

    return xmlhttp;

  },
  api_post:function(url, data, callback, errcallback){

    // Process
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.addEventListener('load', function(){
      if(this.readyState == 4){
        var obj = $.eval_as_object(this.responseText);
        var error = $.val('error', obj, { d:0, datatype:"integer" });
        var error_message = $.val('error_message', obj, { d:'' });

        if(parseInt(error) == 0)
          $.fire_event(callback, [ obj ], xmlhttp);
        else{
          if(typeof errcallback != 'undefined' || errcallback != null)
            $.fire_event(errcallback, [ { error:error, error_message:error_message } ]);
          else{
            alert(JSON.stringify(obj, null, 2));
          }
        }
      }
    });
    xmlhttp.addEventListener('error', function(){
      if(typeof errcallback != 'undefined' || errcallback != null)
        $.fire_event(errcallback);
      else
        console.log(this.responseText);
    });
    xmlhttp.send(JSON.stringify(data));

    return xmlhttp;

  },

  http_build_query:function(obj, num_prefix, temp_key){

    var output_string = []

    if($.type(obj) == 'object'){
      Object.keys(obj).forEach(function (val) {

        var key = val;

        num_prefix && !isNaN(key) ? key = num_prefix + key : ''

        var key = encodeURIComponent(key.toString().replace(/[!'()*]/g, escape));
        temp_key ? key = temp_key + '[' + key + ']' : ''

        if (typeof obj[val] === 'object') {
          var query = $.http_build_query(obj[val], null, key)
          output_string.push(query)
        }

        else {
          var value = encodeURIComponent(obj[val].toString().replace(/[!'()*]/g, escape));
          output_string.push(key + '=' + value)
        }

      })
    }

    return output_string.join('&')

  },

  fire_event:function(callback, params, thisArg){

    if(typeof thisArg == 'undefined') thisArg = null; // Parameter 3 is optional, default: null
    if($.type(callback) == 'string')
      callback = eval(callback);
    if($.type(callback) == 'function')
      return callback.apply(thisArg, params);

  },

  eval_as_object:function(exp){

    try{
      return eval("(" + exp + ")");
    }
    catch(e){
      return null;
    }

  },

  ux:function(cont){

    cont = typeof cont == 'undefined' || !(cont instanceof HTMLElement) ? document.body : cont;

    var els = cont.querySelectorAll('*[data-type]');
    $(els).each(function(){

      var type = this.getAttribute("data-type");
      if(typeof $(this)[type] == 'function'){

        var options = $.options_from_html(this);
        $(this)[type](options);

      }
      else
        console.warn('Unknown ux ' + type);

    })

  },

  el_get:function(cont){


    if($(cont).attr('data-type') != null){

      var type = $(cont).attr('data-type');
      if(typeof $(cont)[type + "_get"] == 'function')
        return $(cont)[type + "_get"]();
      return null;

    }
    else{

      var obj = {};
      var els = $("*[data-type]", cont);
      $(els).each(function(){

        var el = this;
        var value = $.el_get(el);
        var name  = el.getAttribute("data-name");
        if(name == null) name = 'undefined';
        obj[name] = value;

      });
      return obj;

    }


  },

  el_set:function(cont, obj){

    $("*[data-type]", cont).each(function(){

      var type = this.getAttribute("data-type");
      var name = this.getAttribute("data-name");
      var value = $.val(name, obj);

      if(typeof $(this)[type + "_set"] == 'function')
        $(this)[type + "_set"](value);
      else
        console.warn('unknown method');

    });

  },

  options_from_html:function(el){

    var options = null;
    if(el.getAttribute("data-options") != null){
      try{
        options = eval("(" + el.getAttribute("data-options") + ")");
      }
      catch(e){
        options = null;
      }
    }
    else{

      var options = {};
      for(var i = 0 ; i < el.attributes.length ; i++)
        options[el.attributes[i].nodeName.replace('data-', '')] = el.attributes[i].nodeValue;

    }
    return options;

  },

  cookie_getitem:function(sKey){

    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

  },
  cookie_setitem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  cookie_removeitem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  cookie_hasitem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  cookie_keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  },

  slug:function(str) {
    var $slug = '';
    var trimmed = $.trim(str);
    $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
    replace(/-+/g, '-').
    replace(/^-|-$/g, '');
    return $slug.toLowerCase();
  },

  warn:function(text){

    console.warn(text);

  },

  array_merge:function(){

    var args = Array.prototype.slice.call(arguments)
    var argl = args.length
    var arg
    var retObj = {}
    var k = ''
    var argil = 0
    var j = 0
    var i = 0
    var ct = 0
    var toStr = Object.prototype.toString
    var retArr = true

    for (i = 0; i < argl; i++) {
      if (toStr.call(args[i]) !== '[object Array]') {
        retArr = false
        break
      }
    }

    if (retArr) {
      retArr = []
      for (i = 0; i < argl; i++) {
        retArr = retArr.concat(args[i])
      }
      return retArr
    }

    for (i = 0, ct = 0; i < argl; i++) {
      arg = args[i]
      if (toStr.call(arg) === '[object Array]') {
        for (j = 0, argil = arg.length; j < argil; j++) {
          retObj[ct++] = arg[j]
        }
      } else {
        for (k in arg) {
          if (arg.hasOwnProperty(k)) {
            if (parseInt(k, 10) + '' === k) {
              retObj[ct++] = arg[k]
            } else {
              retObj[k] = arg[k]
            }
          }
        }
      }
    }

    return retObj;

  },

  in_array:function(needle, haystack, argStrict){

    var key = ''
    var strict = !!argStrict
    // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
    // in just one for, in order to improve the performance
    // deciding wich type of comparation will do before walk array
    if (strict) {
      for (key in haystack) {
        if (haystack[key] === needle) {
          return true;
        }
      }
    } else {
      for (key in haystack) {
        if (haystack[key] == needle) { // eslint-disable-line eqeqeq
          return true;
        }
      }
    }
    return false;

  },

  number_format:function(number, decimals, decPoint, thousandsSep){

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec)
      return '' + (Math.round(n * k) / k)
          .toFixed(prec)
    }

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)

  },

  qs:(function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&')),

  p:function(text, obj){

    var matches = text.match(/\$\w+/g);

    if(matches != null){
      if($.type(obj) == 'array'){

        for(var i = 0 ; i < matches.length ; i++){
          var match = matches[i];
          var value  = typeof obj[i] != 'undefined' ? obj[i] : '';
          text = text.replace(match, value);
        }

      }
      else if($.type(obj) == 'object'){

        for(var i = 0 ; i < matches.length ; i++) {
          var match = matches[i];
          var key = match.replace('$', '');
          var value = typeof obj[key] != 'undefined' ? obj[key] : '';
          text = text.replace(match, value);
        }

      }
    }


    return text;

  },

  array_key_count:function(obj){

    var count = 0;
    for(var key in obj)
      count++;
    return count;

  },

  object_value_min:function(obj){

    var min_val = -1;
    if($.type(obj) == 'object'){
      for(var key in obj){
        var val = obj[key];
        if(min_val == -1 || parseFloat(val) < parseFloat(min_val)){
          min_val = val;
        }
      }
    }
    return min_val;

  },

  object_value_max:function(obj){

    var max_val = -1;
    if($.type(obj) == 'object'){
      for(var key in obj){
        var val = obj[key];
        if(max_val == -1 || parseFloat(val) > parseFloat(max_val)){
          max_val = val;
        }
      }
    }
    return max_val;

  },

  ksort:function(obj){
    var keys = Object.keys(obj).sort()
    , sortedObj = {};

    for(var i in keys) {
      sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
  },

  str_pad:function(input, padLength, padString, padType){

    var half = ''
    var padToGo
    var _strPadRepeater = function (s, len) {
      var collect = ''
      while (collect.length < len) {
        collect += s
      }
      collect = collect.substr(0, len)
      return collect
    }
    input += ''
    padString = padString !== undefined ? padString : ' '
    if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
      padType = 'STR_PAD_RIGHT'
    }
    if ((padToGo = padLength - input.length) > 0) {
      if (padType === 'STR_PAD_LEFT') {
        input = _strPadRepeater(padString, padToGo) + input
      } else if (padType === 'STR_PAD_RIGHT') {
        input = input + _strPadRepeater(padString, padToGo)
      } else if (padType === 'STR_PAD_BOTH') {
        half = _strPadRepeater(padString, Math.ceil(padToGo / 2))
        input = half + input + half
        input = input.substr(0, padLength)
      }
    }
    return input;

  },

  template_parse:function(text, obj){

    // Find IF
    var matches = text.match(/<!--IF.+?(?=-->)(.+)?(?=<!--END-->)<!--END-->/gi, 'gi');
    if($.type(matches) == 'array'){
      for(var i = 0 ; i < matches.length ; i++){
        var match = matches[i];
        var matches = match.match(/\(.+?(?=\))\)/gi, 'gi');
        var key = matches[0];
        key = key.substr(1, key.length - 2);

        var f = new Function("obj", "return " + key + ";");
        if(!f(obj)){
          text = text.replace(match, '', 'gi');
        }

      }
    }

    // Find IFX
    var matches = text.match(/<!--IF_NOT_EMPTY.+?(?=-->)(.+)?(?=<!--END-->)<!--END-->/gi, 'gi');
    if($.type(matches) == 'array'){
      for(var i = 0 ; i < matches.length ; i++){
        var match = matches[i];
        var matches = match.match(/\(\w+\)/gi, 'gi');
        var key = matches[0];
        key = key.substr(1, key.length - 2);
        if($.val(key, obj, { d:'' }) == '')
          text = text.replace(match, '', 'gi');
      }
    }

    // Parse matched keys
    var matches = text.match(/{\w+(:\w+)*?(?=})}/gi, 'gi');
    if($.type(matches) == 'array'){
      for(var i = 0 ; i < matches.length ; i++){
        var match = matches[i];
        var key = match.substr(1, match.length - 2);
        var datatype = 'string';
        if(key.indexOf(':') >= 0){
          var keys = key.split(':');
          key = keys[0];
          datatype = keys[1];
        }
        var value = $.val(key, obj, { d:'-' });
        value = $.convert_datatype(value, datatype);
        text = text.replace(match, value, 'gi');
      }
    }

    return text;

  },

  convert_datatype:function(value, datatype){

    switch(datatype){

      case 'date':
        value = $.date('j M Y', $.strtotime(value));
        break;

    }

    return value;

  },

  calc_size:function(exp, val){

    val = typeof val == 'undefined' || !val ? window.innerWidth : val;

    if(exp.indexOf('%') >= 0){
      exp = exp.replace('%', '', 'gi');
      if(!isNaN(parseFloat(exp))) exp = parseFloat(exp) / 100 * val;
    }

    return exp;

  },

  download:function(url){

    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', url);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  },

  ux_init:function(cont){

    cont = typeof cont == 'undefined' || !(cont instanceof HTMLElement) ? document.body : cont;

    // Init
    $('*[data-type]', cont).each(function(){
      var type = this.getAttribute("data-type");
      if(typeof $(this)[type] == 'function'){
        var options = $.options_from_html(this);
        $(this)[type](options);
      }
      else
        console.warn('Unknown ux ' + type);
    })

    // Handle data-action
    $("*[data-action]", cont).each(function(){
      switch(this.getAttribute("data-action")){
        case "modal.close":
          $(this).on('click.data-action', function(){
            $(this).closest('.modal').modal_close();
          })
          break;
      }
    })

    // Handle popup close
    $(window).on('click', $.popup_close_all).on('scroll', $.popup_close_all);

    // Global keyboard handle
    $(window).on('keyup', function(e){
      switch(e.keyCode){
        case 27: $('.modal').modal_close(); break; // Esc button
      }
    })

    // Header, sidebar & content
    // var headerHeight = $('.header').outerHeight();
    // $('.content').css({ 'margin-top':headerHeight });
    //
    //
    // $.tab_init();
    // $.foldedpane_init();
    // $.section_init();
    // $.workspace_init();
    // $.role_init();
    //
    // $.layout_resize();
    // $(window).on('resize.layout', function(){ $.layout_resize(); });
    //
    // $('.header-bar-btn').click(function(){
    //
    //   $('.sidebar').toggleClass('on');
    //   $('.header').toggleClass('sidebar-on');
    //   $('.content').toggleClass('sidebar-on');
    //
    //   $.api_post('api/app/state/save', { 'sidebar-state':$('.sidebar').hasClass('on') ? 1: 0 });
    //
    // });
    //
    // $.ux();

  },

  istrue:function(val){

    if(typeof val != 'undefined' && (parseInt(val) == 1 || val === true)) return true;
    return false;

  }

});

var oldVal = $.fn.val;
$.fn.val = function(value) {

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_val'] != 'undefined')
    return $(this)[type + '_val'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_val.apply(this, arguments);
  else
    return oldVal.apply(this, arguments);

};

$.fn.placeholder = function(){

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_placeholder'] != 'undefined')
    return $(this)[type + '_placeholder'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_placeholder.apply(this, arguments);

};

$.fn.readonly = function(){

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_readonly'] != 'undefined')
    return $(this)[type + '_readonly'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_readonly.apply(this, arguments);

};

$.fn.reset = function(){

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_reset'] != 'undefined')
    return $(this)[type + '_reset'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_reset.apply(this, arguments);

};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

$($.ux_init);$.fn.extend({

  vfields:function(options){

    var value = $.val('value', options);

    $(this).each(function(){

      var instance = this;

      $(instance).addClass('vfields');
      $(instance).data('options', options);

      if($.type(value) == 'array') $(instance).form_set(value);

    });

  },

  form_set:function(value){

    if(typeof value == 'undefined' || $.type(value) != 'array') return;

    $(this).each(function(){

      var instance = this;
      var options = $(this).data('options');
      var html_callback = $.val('html_callback', options);

      $(value).each(function(){

        var obj = this;

        var html = [];
        html.push("<table><tr><td class='vfields-col1' align='center' style='width:24px'>");
        html.push("<span class='fa fa-times-circle selectable vfields-remove hoverable'></span>");
        html.push("</td><td class='vfields-col2'></td></tr></table>");

        var row_el = document.createElement("div");
        row_el.className = 'vfields-item';
        row_el.innerHTML = html.join('');

        $(instance).append(row_el);

        $.fire_event(html_callback, [ obj ], $('.vfields-col2', row_el));

      });

      $('.vfields-remove', instance).click(function(){
        $(this).closest('.vfields-item').remove();
      });


    });

  },

  vfields_get:function(){

    var value = [];

    $(this).each(function(){

      var instance = this;
      $('.vfields-col2', instance).each(function(){
        var obj = $.el_get(this);
        value.push(obj);
      })

    });

    return value;

  }

});$.fn.extend({

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

});$.fn.extend({

  widget:function(options){

    this.each(function(){

      var instance = this;

      var type = $.val('type', options);
      var src = $.val('src', options);
      var title = $.val('title', options, { default_value:"Untitled" });
      var columns = $.val('columns', options);
      var uid = $.uniqid();
      var presets = $.val('default_presets', options);
      var preset_idx = parseInt($.val('preset_idx', options, { d:0 }));

      if(isNaN(preset_idx)) preset_idx = 0;

      var html = [];
      html.push($.p('<div class="widget-head padding10">', [ title ]));
      html.push($.p('<table><tr>', [  ]));
      html.push($.p('<td style="width:100%">', [  ]));
      html.push($.p('<h5 class="padding10">$1</h5>', [ title ]));
      html.push($.p('</td>', [ title ]));
      html.push($.p('<td>', [  ]));
      html.push($.p('<span id="$1"></span>', [ 'preset-selector' + uid ]));
      html.push($.p('<span class="icon icon-reload fa fa-refresh padding10 selectable"></span>', [  ]));
      html.push($.p('<span class="icon icon-customize fa fa-ellipsis-h padding10 selectable"></span>', [  ]));
      html.push($.p('</td>', [  ]));
      html.push($.p('</tr></table>', [  ]));
      html.push($.p('</div>', [ ]));

      html.push($.p('<div class="modal" id="$1"></div>', [ 'customize' + uid ]));

      var preset = null;
      var selector_items = [];
      var selector_value = '';
      if($.type(presets) == 'array')
        for(var i = 0 ; i < presets.length ; i++){
          if(i == preset_idx){
            selector_value = presets[i]['text'];
            preset = presets[i];
          }
          selector_items.push({ text:presets[i]['text'], value:presets[i]['text'] });
        }

      switch(type) {

        case 'grid':

          html.push($.p('<div class="widget-body align-center margin10 ">', [ ]));
          html.push($.p('<span id="$1"></span>', [ 'gridhead' + uid ]));
          html.push($.p('<div></div>', [ ]));
          html.push($.p('<span id="$1"></span>', [ 'grid' + uid ]));
          html.push($.p('</div>', [ ]));
          $(instance).html(html.join(''));

          var columns = $.val('columns', options);

          $('#gridhead' + uid, instance).gridhead({
            columns:columns,
            grid:'#grid' + uid,
          });

          var bodyHeight = $(instance).outerHeight() - $('.widget-head', instance).outerHeight() - $('#gridhead' + uid, instance).outerHeight() - 15;

          $('#grid' + uid, instance).grid({
            columns:columns,
            height:bodyHeight
          });
          break;

        case 'chart':

          html.push($.p('<div class="widget-body align-center margin10 ">', [ ]));
          html.push($.p('<span id="$1"></span>', [ 'chart' + uid ]));
          html.push($.p('</div>', [ ]));
          $(instance).html(html.join(''));

          var chart_type = $.val('chart_type', options);
          var bodyHeight = $(instance).outerHeight() - $('.widget-head', instance).outerHeight() - $('#gridhead' + uid, instance).outerHeight() - 15;

          $('#chart' + uid).chart({
            width:"100%",
            height:bodyHeight,
            padding:0,
            type:chart_type
          });
          break;

        case 'metric':

          html.push($.p('<div class="widget-body align-left margin10 ">', [ ]));
          html.push($.p('<span id="$1"></span>', [ 'metric' + uid ]));
          html.push($.p('</div>', [ ]));
          $(instance).html(html.join(''));
          break;

      }

      $('#preset-selector' + uid).dropdown({
        items:selector_items,
        value:selector_value,
        onchange:function(){
          $(instance).widget_load();
        }
      });

      $('#customize' + uid).gridsetting({
        onchange:function(params){

          var widget = $(this).closest('.widget');
          var options = $(widget).data('options');

          options = $.array_merge(options, params);
          $(widget).data('options', options);

          $(instance).widget_load();

        }
      });

      $('.icon-reload', instance).click(function(){

        $(instance).widget_load();

      });

      $('.icon-customize', instance).click(function(){

        var widget = $(this).closest('.widget');
        var options = $(widget).data('options');
        var columns = $.val('columns', options);
        var presets = $.val('default_presets', options);
        $('#customize' + uid).gridsetting_open({
          columns:columns,
          presets:presets,
          active_idx:0
        });

      });
      
      $(instance).data('options', options);
      $(instance).data('uid', uid);

      $(instance).widget_load();

    })

  },

  widget_load:function(){

    this.each(function(){

      var instance = this;
      var options = $(instance).data('options');
      var src = $.val('src', options);
      var type = $.val('type', options);
      var presets = $.val('default_presets', options);
      var preset_idx = parseInt($.val('preset_idx', options, { d:0 }));
      var uid = $(instance).data('uid');

      var preset_selector_value = $('#preset-selector' + uid).dropdown_get();

      var preset = null;
      var selector_items = [];
      var selector_value = '';
      if($.type(presets) == 'array')
        for(var i = 0 ; i < presets.length ; i++){
          if(presets[i]['text'] == preset_selector_value){
            selector_value = presets[i]['text'];
            preset = presets[i];
          }
          selector_items.push({ text:presets[i]['text'], value:presets[i]['text'] });
        }

      switch(type){

        case 'metric':

          $.api_post(src, preset, function(response){

            $('#metric' + uid).html("<h2>" + response.data + "</h2>");

          });
          break;

        case 'grid':

          $.api_post(src, preset, function (response) {

            var data = $.val('data', response);
            $('#grid' + uid, instance).grid_set(data);

          });
          break;

        case 'chart':

          $.api_post(src, preset, function(response){

            $('#chart' + uid).chart_set(response.data);

          });
          break;

      }


    });

  }


});$.extend({

  workspace_init:function(){

    $('.workspace').each(function(){

      var height = window.innerHeight - $('.header').outerHeight() - 20;
      $(this).workspace_set({
        state:$(this).attr('data-state'),
        size:$(this).attr('data-size'),
        height:height
      });

      $.workspace_rtime;
      $.workspace_timeout = false;
      $.workspace_delta = 200;
      $(window).resize(function() {
        $.workspace_rtime = new Date();
        if ($.workspace_timeout === false) {
          $.workspace_timeout = true;
          setTimeout($.workspace_resizeend, $.workspace_delta);
        }
      });

    });

  },

  workspace_resizeend:function(){

    if (new Date() - $.workspace_rtime < $.workspace_delta) {
      setTimeout($.workspace_resizeend, $.workspace_delta);
    } else {
      $.workspace_timeout = false;

      $('.workspace').each(function(){

        var height = window.innerHeight - $('.header').outerHeight() - 20;
        $($(this).children()[0]).css({ height:height });
        $($(this).children()[1]).css({ height:height });
        $($(this).children()[2]).css({ height:height });

      });
    }

  }

});

$.fn.extend({

  workspace_set:function(params){

    if(typeof params == 'undefined' || $.type(params) != 'object') return;

    $(this).each(function(){

      params = $.ksort(params);

      var css1 = {};
      var css2 = { flex:'1 1 auto' };
      var css3 = {};
      for(var key in params){

        switch(key){

          case 'size':
            var size = params[key];
            size = size.split(' ');
            var left_size = $.val(0, size, { d:300, t:'number' });
            var right_size = $.val(1, size, { d:400, t:'number' });
            css1['flex'] = '0 0 ' + (left_size + 'px');
            css3['flex'] = '0 0 ' + (right_size + 'px');
            $(this).data('left_size', left_size);
            $(this).data('right_size', right_size);
            break;

          case 'height':
            css1['height'] = params[key];
            css2['height'] = params[key];
            css3['height'] = params[key];
            break;

          case 'state':
            var state = $.val('state', params, { d:'' });
            state = state.split(' ');
            var state_left = $.val(0, state, { d:1, t:'number' });
            var state_right = $.val(2, state, { d:0, t:'number' });
            var left_size = state_left < 1 ? '0' : $(this).data('left_size');
            var right_size = state_right < 1 ? '0' : $(this).data('right_size');
            css1['flex'] = '0 0 ' + (left_size + 'px');
            css3['flex'] = '0 0 ' + (right_size + 'px');
            break;

        }

      }

      if($(this).children().length == 3){

        $($(this).children()[0]).css(css1);
        $($(this).children()[1]).css(css2);
        $($(this).children()[2]).css(css3);

      }

    });

  }

});