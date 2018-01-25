$.fn.extend({

  gridoption:function(options){

    var html = $(this).gridoption_innerhtml();
    $(this).each(function(){

      $(this).addClass('gridoption');
      $(this).html(html);

      $('.tab', this).tab({
        container:'#' + $('.tabcont', this).attr('id'),
        default_index:0
      });

       $('.gridoptionpreset', this).grid({
         "class":"style1",
         columns:[
           { name:"text", text:"Name", width:"200px" },
           { name:"name", text:"ID", width:"100px" },
         ],
         moveable:true,
         onselect:function(e, tr, obj){
           $($(this).closest('.gridoption')).gridoption_onpresetclick(obj);
         },
         width:"300px",
         height:"270px"
       });

       $('.grid1optioncolumn', this).grid({
         "class":"style1",
         columns:[
           { name:"text", text:"Title", width:"300px" },
         ],
         key:"name",
         moveable:true,
         onselect:function(e, tr, obj){

           var gridoption = $(this).closest('.gridoption');
           $('.goc_name', gridoption).textbox_val($.val('name', obj));
           $('.goc_text', gridoption).textbox_val($.val('text', obj));
           $('.goc_width', gridoption).textbox_val($.val('width', obj));
           $('.goc_datatype', gridoption).dropdown_val($.val('datatype', obj));

         },
         width:"240px"
       });

       $('.goc_name',  this).textbox({
         readonly:1
       });

       $('.goc_text',  this).textbox({
         onchange:function(){
           var selected_column = $('.grid1optioncolumn', $(this).closest('.gridoption')).grid_selected();
           selected_column['text'] = $(this).val();
           $('.grid1optioncolumn', $(this).closest('.gridoption')).grid_modify(selected_column, selected_column);
         }
       });

      $('.goc_width',  this).textbox({
        onchange:function(){
          var selected_column = $('.grid1optioncolumn', $(this).closest('.gridoption')).grid_selected();
          selected_column['width'] = $(this).val();
          $('.grid1optioncolumn', $(this).closest('.gridoption')).grid_modify(selected_column, selected_column);
        }
      });

       $('.goc_datatype',  this).dropdown({
         items:[
           { text:"Text", value:"text" },
           { text:"Number", value:"number" },
           { text:"Date", value:"date" },
         ],
         onchange:function(){
           var selected_column = $('.grid1optioncolumn', $(this).closest('.gridoption')).grid_selected();
           selected_column['datatype'] = $(this).val();
           $('.grid1optioncolumn', $(this).closest('.gridoption')).grid_modify(selected_column, selected_column);
         }
       });

    })

  },

  gridoption_innerhtml:function(){

    var c = '';

    c += '<div class="align-center padding5">'; // BEGIN ROW 1
    c += '<ul class="tab">';
    c += '<li>Presets</li>';
    c += '<li>Columns</li>';
    c += '<li>Filters</li>';
    c += '</ul>';
    c += '</div>'; // END ROW 1

    c += '<div class="height10"></div>';  // SPACER

    c += '<div id="tabcont-' + $.uniqid() + '" class="tabcont padding5" style="height:270px;overflow-x:hidden;overflow-y:auto">'; // BEGIN TAB CONT, ROW 2

    c += '<div>'; // BEGIN TAB 1
    c += '<span class="gridoptionpreset"></span>';
    c += '</div>'; // END TAB 1

    c += '<div>'; // BEGIN TAB 2
    c += '<table cellspacing="0" cellpadding="0">';
    c += '<tr>';
    c += '<td>';
    c += '<span class="grid1optioncolumn"></span>';
    c += '</td>';
    c += '<td>';
    c += '<div class="padding10">'; // BEGIN TAB 2 RIGHT SECTION
    c += '<table class="form" cellspacing="5">';
    c += '<tr>';
    c += '<th><label class="padding5 width100">Name</label></th>';
    c += '<td><span class="goc_name"></span></td>';
    c += '</tr>';
    c += '<tr>';
    c += '<th><label class="padding5 width100">Type</label></th>';
    c += '<td><span class="goc_datatype"></span></td>';
    c += '</tr>';
    c += '<tr>';
    c += '<th><label class="padding5">Text</label></th>';
    c += '<td><span class="goc_text"></span></td>';
    c += '</tr>';
    c += '<tr>';
    c += '<th><label class="padding5">Width</label></th>';
    c += '<td><span class="goc_width"></span></td>';
    c += '</tr>';
    c += '</table>';
    c += '</div>';  // END TAB 2 RIGHT SECTION
    c += '</td>';
    c += '</tr>';
    c += '</table>';
    c +=  '</div>';  // END TAB 2

    c += '<div>'; // BEGIN TAB 3
    c += '</div>';  // END TAB 3

    c += '</div>'; // END TAB CONT, ROW 2

    return c;

  },

  gridoption_val:function(obj){

    if(typeof obj == 'undefined'){

      var presets = null;
      $(this).each(function(){

        var columns = $('.grid1optioncolumn', this).grid_val();
        var selected_preset = $('.gridoptionpreset', this).grid_selected();
        selected_preset['columns'] = columns;

        presets = $(this).data('presets');
        for(var i = 0 ; i < presets.length ; i++){
          if(presets[i]['name'] == selected_preset['name'])
            presets[i] = selected_preset;
        }

      })
      return presets;

    }

    else{

      $(this).each(function(){

        $(this).data('value', obj);

        var presets = obj['presets'];
        $('.gridoptionpreset', this).grid_val(presets);
        $(this).data('presets', obj);

      });

    }

  },


  gridoption_onpresetclick:function(preset){

    var obj = $(this).data('value');
    var presets = obj['presets'];
    for(var i = 0 ; i < presets.length ; i++){
      if(presets[i]['name'] == preset['name']){
        preset = presets[i];
        var columns = preset['columns'];
        $('.grid1optioncolumn', this).grid_val(columns);
      }
    }

  }

});