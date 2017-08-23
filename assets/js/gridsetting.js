$.fn.extend({

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
        class: 'transparent',
        columns:[
          { text:'', type:'html', html:'$.gridsetting_preset_option', width:'50px' },
          { text:'Preset Name', name:'text', width:'150px' },
        ]
      });

      $('.column-grid', el).grid({
        class: 'transparent',
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
        class: 'transparent',
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
        $.invoke_callback(onchange, [ params ], el);
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
  
})