$.fn.extend({

  grid:function(options){

    var autoload = $.val('autoload', options, { d:true });
    var columns = $.val('columns', options, { d:[] });
    var className = $.val('class', options, { d:'' });
    var id = $.val('id', options, { d:'' });
    var name = $.val('name', options, { d:'' });
    var footer = $.val('footer', options, { d:'' });
    var value = $.val('value', options, { d:null });
    var width = $.val('width', options, { d:'' });
    var height = $.val('height', options, { d:"auto" });
    var key = $.val('key', options, { d:"" });
    var scroll_cont = $.val('scroll_cont', options, { d:null });

    options['page'] = 0;

    this.each(function(){

      var el = this;

      // content
      var html = [];
      if($(el).html().length == 0){
        html.push("<table class='grid-body'>");
        html.push("<tbody class='grid-size'></tbody>");
        html.push("</table>");
        html.push("<div class='grid-footer'></div>");
        $(el).html(html.join(''));
      }

      var ctlid = 'grid' + $.uniqid();

      var css = {};
      if(width != '') css['width'] = width;
      if(height != '') css['height'] = height;

      var attr = {};
      attr['data-type'] = 'grid';
      attr['data-cid'] = ctlid;
      if(name != '') attr['data-name'] = name;
      if(id != '') attr['id'] = id;

      $(el).addClass('grid');
      $(el).addClass(className);
      $(el).data('options', options);

      $(el).attr(attr);
      $(el).css(css);

      $.fire_event(footer, [], $('.grid-footer', el));

      $(this).grid_columns(columns);
      if(value != null) $(el).grid_val(value);
      if(autoload) $(el).grid_load();

      if(scroll_cont != null){
        if(scroll_cont == 'window'){
          $(window).on('scroll', function(){
            $('.load-more', $("*[data-cid='" + ctlid + "']")).each(function(){
              if($.is_in_viewport(this)) this.click();
            })
          });
        }
        else{
          $(scroll_cont).on('scroll', function(){
            $('.load-more', $("*[data-cid='" + ctlid + "']")).each(function(){
              if($.is_in_viewport(this)) this.click();
            })
          });
        }
      }

    })

  },

  grid_remove:function(obj){

    if(typeof obj == 'undefined') return;

    $(this).each(function(){

      if(obj instanceof HTMLElement){
        if($(obj).closest('.grid').length == 1)
          $(obj).remove();
      }
      else if($.type(obj) == 'object'){
        var options = $(this).data('options');
        var key = $.val('key', options, { d:'' });
        key = key.split(',');

        var obj_key = [];
        for(var j = 0 ; j < key.length ; j++)
          if(key[j].length > 0 && typeof obj[key[j]] != 'undefined')
            obj_key.push(obj[key[j]]);
        obj_key = obj_key.join('');
        $("tr[data-key=\"" + obj_key + "\"]", this).remove();
      }

    })

  },

  grid_modify:function(oldObj, newObj){

    if(typeof oldObj == 'undefined') return;
    if(typeof newObj == 'undefined' && !$.type(newObj) == 'object') return;

    $(this).each(function(){

      if($.type(oldObj) == 'object'){

        var options = $(this).data('options');
        var columns = $.val('columns', options, { d:[] });
        var key = $.val('key', options, { d:'' });
        key = key.split(',');

        var obj_key = [];
        for(var j = 0 ; j < key.length ; j++)
          if(key[j].length > 0 && typeof oldObj[key[j]] != 'undefined')
            obj_key.push(oldObj[key[j]]);
        obj_key = obj_key.join('');

        $("tr[data-key=\"" + obj_key + "\"]", this).each(function(){

          var currentObj = $(this).data('value');
          for(var key in newObj)
            currentObj[key] = newObj[key];

          $(this).html($.grid_row(columns, currentObj, options));

          var column_idx = 0;
          $('td', this).each(function(){
            var td = this;
            var column_type = td.getAttribute('data-column-type');
            if(column_type == 'html'){
              var column = columns[column_idx];
              var column_html = $.val('html', column, { d:'' });
              $.fire_event(column_html, [ currentObj, column ], td);
            }
            column_idx++;
          })

          $(this).data('value', currentObj);
          $(this).addClass('highlight');

        });

      }

    })

  },

  grid_add:function(obj, index){

    $(this).each(function(){

      var instance = this;
      var options = $(instance).data('options');
      var columns = $.val('columns', options, { d:[] });
      var onselect = $.val('onselect', options);
      var key = $.val('key', options, { d:'' });
      key = key.split(',');

      var obj_key = [];
      for(var j = 0 ; j < key.length ; j++)
        if(key[j].length > 0 && typeof obj[key[j]] != 'undefined')
          obj_key.push(obj[key[j]]);
      obj_key = obj_key.join('');

      var tr = document.createElement('tr');
      $(tr).html($.grid_row(columns, obj, options)).attr('data-key', obj_key);

      var trs = $('tr:not(.grid-size-tr)', this);
      var pivot_tr = null;
      if($.type(index) == 'number')
        pivot_tr = typeof trs[index] != 'undefined' ? trs[index] : pivot_tr;

      if(pivot_tr != null) {
        $(tr).insertBefore(pivot_tr);
      }
      else{
        var last_grid_content = $('.grid-content', this).last();
        if(last_grid_content.length > 0){
          $(last_grid_content).append(tr);
        }
        else{
          var tbody = document.createElement('tbody');
          tbody.className = "grid-content";
          $('.grid-body', instance).append(tbody);
          $(tbody).append(tr);
        }
      }

      $(tr).on('click.gridrow', function(e){

        $(this).removeClass('highlight');

        var s_obj = $(this).data('value');
        var d_obj = $.el_val(this);
        var obj = $.array_merge(s_obj, d_obj);

        var table = $(this).closest('table');
        $('.active', table).removeClass('active');
        $(this).addClass('active');
        $.fire_event(onselect, [ e, this, obj ], instance);

      })
      .addClass('highlight')
      .each(function(){

        var column_idx = 0;
        $('td', this).each(function(){
          var td = this;
          var column_type = td.getAttribute('data-column-type');
          if(column_type == 'html'){
            var column = columns[column_idx];
            var column_html = $.val('html', column, { d:'' });
            $.fire_event(column_html, [ obj, column ], td);
          }
          column_idx++;
        })

      })
      .data('value', obj);

    })

  },

  grid_columns:function(columns){

    $(this).each(function(){

      if(!$(this).hasClass('grid')) return;

      var options = $(this).data('options');
      options['columns'] = columns;
      $(this).data('options', options);

      var html = [];
      html.push("<tr class='grid-size-tr'>");
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

  grid_load:function(params){

    this.each(function(){

      var instance = this;
      var options = $(instance).data('options');
      var src = $.val('src', options, { d:'' });
      var method = $.val('method', options, { d:'post' }).toLowerCase();
      if(!params) params = {};

      if(src.length > 0){

        var page = $.val('page', params, { d:1 });
        var row_per_page = $.val('row_per_page', options, { d:10 });
        var columns = $.val('columns', options);
        var search = $.val('search', params, { d:'' });

        var el_params = {
          page:page,
          row_per_page:row_per_page,
          columns:columns,
          filters:$.val('filters', params),
          sorts:$.val('sorts', params),
        };
        if(search != '') el_params['search'] = search;

        // Load data
        $['api_' + method](src, el_params, function(response){

          // Render data
          var data = $.val('data', response, { d:[] });
          var page = $.val('page', response, { d:1 });
          var append = page == 1 ? false : true;
          $(instance).grid_val(data, append);

          // Check if next page exists
          var next_page = $.val('next_page', response, { d:page });
          if(next_page > page){
            $('.grid-footer', instance).html("<div class='load-more align-center padding5'>Load More...</div>");
            $('.load-more', instance).on('click', function(){
              params['page'] = next_page;
              $(instance).grid_load(params);
            });
          }
          else{
            $('.grid-footer', instance).html("");
          }

          // Save last load data
          $(instance).data('last_load_data', el_params);

        });

        if(page == 1) $('.grid-content', this).remove();
        $('.grid-footer', this).html("<div class='align-center padding10'><span class='loading width16 height16'></span></div>");

      }
      
    });
    
  },

  grid_last_load_data:function(){

    var last_load_data = $(this).data('last_load_data');
    return typeof last_load_data == 'undefined' ? null : last_load_data;

  },

  grid_val:function(value, append){

    append = typeof append == 'undefined' ? false : append;

    // Getter
    if(typeof value == 'undefined'){

      var value = [];
      this.each(function(){

        var el = this;
        var table = el.querySelector('.grid-body');
        var tbody = $('tbody', table);
        $(tbody).children().each(function(){

          if(this.classList.contains('grid-size-tr'));
          else{
            var sobj = $(this).data('value');
            var dobj = $.el_val(this);
            var obj = $.array_merge(sobj, dobj);
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

        if(typeof append == 'undefined' || append != true)
          $('.grid-content', instance).remove();

        var tbody = document.createElement('tbody');
        tbody.className = "grid-content";
        tbody.innerHTML = $.grid_html(value, options);
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
          $(tr).data('value', obj);
        }

        // On click event
        $('tr', tbody).on('click.gridrow', function(e){

          $(this).removeClass('highlight');

          var table = $(this).closest('table');
          $('.active', table).removeClass('active');
          $(this).addClass('active');

          var s_obj = $(this).data('value');
          var d_obj = $.el_val(this);
          var obj = $.array_merge(s_obj, d_obj);

          $.fire_event(onselect, [ e, this, obj ], instance);

        });

        if(append == 1 || append == true){
          if(!options['data']) options['data'] = [];
          options['data'] = $.array_merge(options['data'], value);
        }
        else
          options['data'] = value;

        $(instance).data('options', options);

      })

    }

  },

  grid_reset:function(){

    $(this).grid_val([]);

  },

  grid_selected:function(){

    var obj = null;
    $(this).each(function(){

      var options = $(this).data('options');
      var data = $.val('data', options);

      var counter = -1;
      var index = -1;
      $('tr', this).each(function(){
        if(this.classList.contains('grid-size-tr')) return;
        counter++;
        if(this.classList.contains('active')) index = counter;
      });
      if(typeof data[index] != 'undefined'){
        obj = data[index];
        obj['_index'] = index;
      }

    });
    return obj;

  },

});

$.extend({

  grid_html:function(data, options){

    if(!data) return;

    var columns = $.val('columns', options, { d:[] });
    var key = $.val('key', options, { d:'' });
    key = key.split(',');

    var moveable = $.val('moveable', options, { d:false });
    var moveable_html = moveable ? " draggable='true' ondragstart='$.grid_ondragstart.apply(this, arguments)'" : '';

    var html = [];
    for(var i = 0 ; i < data.length ; i++){
      var obj = data[i];

      var obj_key = [];
      for(var j = 0 ; j < key.length ; j++)
        if(key[j].length > 0 && typeof obj[key[j]] != 'undefined')
          obj_key.push(obj[key[j]]);
      obj_key = obj_key.join('');

      var cid = 'g' + $.uniqid();

      html.push("<tr data-key=\"" + obj_key + "\" data-cid='" + cid + "'" + moveable_html + ">");
      html.push($.grid_row(columns, obj, options));
      html.push("</tr>");
    }
    return html.join('');

  },

  grid_row:function(columns, obj, options){

    var html = [];

    var moveable = $.val('moveable', options, { d:false });
    var moveable_html = moveable ? " ondrop='$.grid_ondrop.apply(this, arguments)' ondragover='$.grid_ondragover.apply(this, arguments)' ondragleave='$.grid_ondragleave.apply(this, arguments)'" : '';

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
        case 'enum':
          var enum_var = $.val('enum', column, { d:[] });
          column_value = $.val(column_name, obj, { d:'' });
          if($.type(enum_var) == 'array'){
            for(var k = 0 ; k < enum_var.length ; k++){
              if($.val('value', enum_var[k]) == column_value){
                column_value = $.val('text', enum_var[k]);
                break;
              }
            }
          }
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

      html.push("<td data-column-type='" + column_type + "' class='" + td_class + "' style='text-align:" + text_align + "'" + moveable_html + ">" + column_value + "</td>");

    }

    html.push("<td" + moveable_html + "></td>");
    return html.join('');

  },

  grid_ondrop:function(){

    $(this).closest('tr').removeClass('drag-over');

    var cid = $(this).closest('.grid').data('drag_cid');
    if($("tr[data-cid=" + cid + "]").index() > $(this).closest('tr').index())
      $("tr[data-cid=" + cid + "]").insertBefore($(this).closest('tr'));
    else
      $("tr[data-cid=" + cid + "]").insertAfter($(this).closest('tr'));

    var options = $(this).closest('.grid').data('options');
    var onmove = $.val('onmove', options, { d:null });
    var tr1 = $("tr[data-cid=" + cid + "]")[0];
    var tr2 = $(this).closest('tr')[0];
    $.fire_event(onmove, [ tr1, tr2 ], $(this).closest('.grid')[0]);

  },

  grid_ondragstart:function(e){

    // console.log([ 'dragstart', this, arguments ]);
    var cid = $(this).closest('tr').attr('data-cid');
    $(this).closest('tr').addClass('dragging');
    $(this).closest('.grid').data('drag_cid', cid);
    e.dataTransfer.setData('cid', cid);

  },

  grid_ondragleave:function(e){

    $(this).closest('tr').removeClass('drag-over');
    var cid = $(this).closest('.grid').data('drag_cid');
    $("tr[data-cid=" + cid + "]").removeClass('dragging');

  },

  grid_ondragover:function(e){

    // console.log([ 'dragover', arguments, this ]);

    $(this).closest('tr').addClass('drag-over');

    e.preventDefault();

  }

});