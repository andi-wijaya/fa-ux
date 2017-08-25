$.fn.extend({

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

      if(src.length > 0){

        var page = $.val('page', params, { d:1 });
        var row_per_page = $.val('row_per_page', params, { d:10 });
        var columns = $.val('columns', options);

        var el_params = {
          page:page,
          row_per_page:row_per_page,
          columns:columns
        };

        $.api_post(src, el_params, function(response){

          // Render data
          var data = response['data'];
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

})