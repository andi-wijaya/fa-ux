$.fn.extend({

  datepicker: function (options) {

    var mode = $.val('mode', options, { d:'' }); // <empty>, range
    var name = $.val('name', options, { d:'' });
    var width = $.val('width', options, { d:'' });

    var defaultvalue = $.val('defaultvalue', options, { d:'' });
    if(defaultvalue == ''){
      if(mode == 'range')
        defaultvalue = $.date('Ymd') + '-' + $.date('Ymd', $.mktime(0, 0, 0, parseInt($.date('m')) + 1, 0, parseInt($.date('Y'))));
      else
        defaultvalue = $.date('Ymd');
    }

    var value = $.val('value', options, { d:defaultvalue });

    if(mode == 'range' && width == '') width = '240px'; // Default width for range mode

    this.each(function(){

      var el = this;

      var html = [];
      html.push("<input type='text' readonly/>");
      html.push("<span class='icon fa fa-calendar'></span>");

      $(el).addClass('datepicker');
      $(el).html(html.join(''));
      $(el).attr('data-type', 'datepicker');
      if(name != '') $(el).attr('data-name', name);
      $(el).data('options', options);

      var css = {};
      if(!isNaN(parseInt(width))) css['width'] = width;
      $(el).css(css);

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
            mode:mode,
            onchange:function(value){
              $(el).datepicker_val(value);
              $.fire_event($.val('onchange', options), [ value ], el);
            }
          });
        }
      });
      $('.popup', this).click(function(e){
        e.preventDefault();
        e.stopPropagation();
      });

      $(this).datepicker_val(value);

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

        var options = $(this).data('options');
        var mode = $.val('mode', options, { d:'' });

        var text = '';
        value = $.date_parse(value);

        if(value.indexOf('-') >= 0){
          var d = value.split('-');
          var d1 = $.date('M j, Y', $.strtotime(d[0]));
          var d2 = $.date('M j, Y', $.strtotime(d[1]));
          text = mode == 'range' ? d1 + ' - ' + d2 : d1;
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

});