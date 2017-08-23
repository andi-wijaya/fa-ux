$.fn.extend({

  datepicker: function (options) {

    var type = $.val('type', options);

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='text' readonly/>");
      html.push("<span class='icon fa fa-calendar'></span>");
      html.push("<span class='popup'>datepicker</span>");

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
              $(el).datepicker_attr({ value:value });
            }
          });
        }
      });
      $('.popup', this).click(function(e){
        e.preventDefault();
        e.stopPropagation();
      });

      $(this).datepicker_set($.val('value', options, { d:'2017-01-01' }));

    });

  },

  datepicker_get:function(format){

    var value = [];
    $(this).each(function(){
      var d = $(this).data('value');
      value.push(d);
    });
    return value.length == 1 ? value[0] : (value.length == 0 ? null : value);

  },

  datepicker_set:function(value){

    $(this).each(function(){
      $(this).datepicker_attr({ value:value });
    })

  },

  datepicker_attr:function(obj){

    if($.type(obj) != 'object') return;

    $(this).each(function(){

      var options = $(this).data('options');

      if($.type(obj) == 'object'){
        for(var key in obj){
          var value = obj[key];
          var css = {};
          switch(key){

            case 'readonly':
              if(value){
                $(this).addClass('readonly');
                options['readonly'] = 1;
              }
              else{
                $(this).removeClass('readonly');
                options['readonly'] = 0;
              }
              break;
            case 'value':

              var text = '';
              var value = $.date_parse(value);

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
              break;

          }
          $(this).css(css);

        }
      }

      $(this).data('options', options);

    })

  }

});

$.extend({

  datepicker_toggle:function(el){

    var popup = el.querySelector('.popup');
    $.popup_toggle(popup, el);

  },
  datepicker_popup_set:function(el, value){

    var popup = $('.popup', el);
    $(popup).attr("data-value", value);
    var month = $.date('n', $.strtotime(value));
    var year = $.date('Y', $.strtotime(value));
    var date = $.date('j', $.strtotime(value));
    var start_day = $.start_day_of_month(year, month) % 7;
    var last_date_of_month = $.last_date_of_month(year, month);
    var date_label = $.date('M Y', $.strtotime(value));

    var html = [];
    html.push("<table>");
    html.push("<tr>");
    html.push("<td><span class='fa fa-caret-left padding5' onclick='$.datepicker_popup_change_month(event, this, -1)'></span></td>");
    html.push("<td colspan='5'><span class='date-label'>" + date_label + "</span></td>");
    html.push("<td><span class='fa fa-caret-right padding5' onclick='$.datepicker_popup_change_month(event, this, 1)'></span></td>");
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
          html.push(current_date == date ? "<td class='active' onclick='$.datepicker_popup_select(event, this)'>" + current_date + "</td>" : "<td onclick='$.datepicker_popup_select(event, this)'>" + current_date + "</td>");
          current_date++;
        }
        else
          html.push("<td></td>");

      }
      html.push("</tr>");

    }

    html.push("</table>");

    $(popup).html(html.join(''));

  },
  datepicker_popup_select:function(e, td){

    e.preventDefault();
    e.stopPropagation();

    var popup = $(td).closest('.popup');
    var el = $(popup).closest('.datepicker');
    var month_year = $(popup).attr('data-value');
    var date = td.innerHTML;

    var month = $.date('n', $.strtotime(month_year));
    var year = $.date('Y', $.strtotime(month_year));
    var d = $.date('j M Y', $.mktime(0, 0, 0, month, date, year));
    $('input', el).val(d);

    $.popup_close(popup);

  },
  datepicker_popup_change_month:function(e, span, direction){

    e.preventDefault();
    e.stopPropagation();

    var popup = $.parent(span, '.popup');
    var el = $.parent(popup, '.datepicker');
    var month_year = popup.getAttribute("data-value");
    var month = parseInt($.date('n', $.strtotime(month_year)));
    var year = parseInt($.date('Y', $.strtotime(month_year)));
    var d = parseInt(popup.querySelector("td.active").innerHTML);

    var next_month = $.date('Y-m-d', $.mktime(0, 0, 0, month + direction, d, year));
    $.datepicker_popup_set(el, next_month);

  },

});