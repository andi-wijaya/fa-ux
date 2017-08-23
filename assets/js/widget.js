$.fn.extend({

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


})