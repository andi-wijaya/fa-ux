$.fn.extend({

  gridhead:function(options) {

    var columns = $.val('columns', options, { d:[] });
    var className = $.val('class', options, { d:null });
    var name = $.val('name', options, { d:'' });
    var width = $.val('width', options, { d:'' });
    var grid = $.val('grid', options, { d:null });
    var height = $.val('height', options, { d:null });
    var droppable = $.val('droppable', options, { d:false });
    var oncolumnclick = $.val('oncolumnclick', options, { d:'' });

    this.each(function(){

      var el = this;

      $(el).addClass('gridhead');
      $(el).addClass(className);
      $(el).attr('data-type', 'gridhead');
      if(name != '') $(el).attr('data-name', name);
      $(el).data('options', options);
      $(el).attr('data-type', 'gridhead');
      $(el).gridhead_attr({ height:height });

      var css = {};
      if(width != '') css['width'] = width;
      $(el).css(css);

      $(this).gridhead_columns(columns);

      if(droppable){
        $(this).droppable({
          accept:"text/csv, application/csv",
          ondrop:function(e, value){
            try{
              var csv = $.csv.toArrays(value);
              var options = $(this).data('options');
              var columns = $.val('columns', options, { d:[] });
              var grid = $.val('grid', options, { d:null });

              var value = [];
              if($.type(columns) == 'array'){
                for(var i = 0 ; i < csv.length ; i++){
                  var csv1 = csv[i];
                  var obj = {};
                  for(var j = 0 ; j < columns.length && typeof csv[j] != 'undefined' ; j++){
                    var column = columns[j];
                    var column_name = column['name'];
                    obj[column_name] = csv1[j];
                  }
                  value.push(obj);
                }
              }
              $(grid).grid_val(value);

            }
            catch(e){}
          }
        });
      }

    });

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

  gridhead_columns:function(columns){

    if(typeof columns == 'undefined'){

      return $.val('columns', $(this).data('options'), { d:[] });

    }
    else{

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

          html.push("<td class='" + className + "' style='width:" + column_width + ";text-align:" + text_align + "' data-key=\"" + column_name + "\">" + column_text +
            "<span class='sort-icon glyphicons'></span><span class='separator'></span></td>");

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

          var sort = [{ key:key, type:sort_type }];

          // If grid exists, reload grid
          if($(grid).length == 1){
            var last_load_data = $(grid).grid_last_load_data();
            last_load_data['sorts'] = sort;
            $(grid).grid_load(last_load_data);
          }

          $('.sort-icon', el).removeClass('glyphicons-chevron-down').removeClass('glyphicons-chevron-up');
          $('.sort-icon', this).addClass(sort_type == 'asc' ? 'glyphicons-chevron-up' : 'glyphicons-chevron-down');

          $.fire_event(oncolumnclick, [ sort ], el);

        })

      })

    }

  }

});