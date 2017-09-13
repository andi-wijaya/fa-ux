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

});