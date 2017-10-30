$.fn.extend({

  chart:function(options){

    var name = $.val('name', options);
    var height = $.val('height', options);
    var value = $.val('value', options, { d:null });
    var width = $.val('width', options);

    this.each(function(){

      var el = this;

      var css = {};
      css['height'] = height;
      css['width'] = width;

      var html = [];
      html.push("<canvas></canvas>");

      $(el).addClass('chart');
      $(this).html(html.join(''));
      $(this).css(css);
      $('canvas', this).css(css);
      $(el).attr('data-type', 'chart');
      $(el).attr('data-name', name);
      $(el).data('options', options);

      if($.type(value) == 'object') $(this).chart_val(value);

    });

  },

  chart_val:function(value){

    if(typeof value == 'undefined'){

    }

    else{

      this.each(function(){

        var el = this;
        var options = $(el).data('options');
        var type = $.val('type', options, { default_value:"line" });
        var title = $.val('title', options, { default_value:"" });
        var height = $.val('height', options);
        var width = $.val('width', options);
        var chart_options = $.val('options', options, { default_value:{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:false
              }
            }]
          },
          legend: {
            display: false
          }
        }});

        var css = {};
        css['height'] = height;
        css['width'] = width;

        if(title != '') chart_options['title'] = { display:true, text:title };
        else chart_options['title'] = { display:false };

        $('canvas', this).remove();
        $(this).append("<canvas></canvas>");
        $('canvas', this).css(css);

        if($.type(value) != null){
          var ctx = $('canvas', this)[0].getContext('2d');
          new Chart(ctx, {
            type: type,
            data: value,
            options: chart_options
          });
        }

      })

    }

  },

  chart_reset:function(){

    $(this).chart_val(null);

  }

});

$.extend({

  chart_border_colors:[
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ],

  chart_bg_colors:[
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ]

});