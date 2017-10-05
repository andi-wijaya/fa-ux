$.fn.extend({

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
    $.calendar_set(value, params);
    $.popup_open(popup, refEl);

  },
  calendar_set:function(value, params){

    var mode = $.val('mode', params, { d:'' });

    switch(mode){
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
      var d = $.date('Ymd', $.mktime(0, 0, 0, month, date, year));
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

});