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

      var sample_presets = [
       { name:"Default" },
       { name:"Preset-1" },
       { name:"Preset-2" },
       { name:"Preset-3" },
       ];

       $('.gridoptionpreset', this).grid({
         class:"style1",
         columns:[
           { name:"name", text:"Preset Name", width:"300px" },
         ],
         moveable:true,
         onselect:function(){
           console.log(arguments);
         },
         value:sample_presets,
         width:"300px",
         height:"270px"
       });

       $('.grid1optioncolumn', this).grid({
         class:"style1",
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

         },
         value:mod.columns,
         width:"240px"
       });

       $('.goc_name',  this).textbox({
         onchange:function(){



           console.log([ this, arguments ]);
         }
       });

       $('.goc_text',  this).textbox({
         onchange:function(){
           console.log([ this, arguments ]);
         }
       });

       $('.goc_width',  this).textbox({
         onchange:function(){
           console.log([ this, arguments ]);
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

    c += '<div class="height10"></div>'; // SPACER

    c += '<div class="align-right padding5">'; // BEGIN ROW 3
    c += '<button>Save</button>';
    c += '<button>Close</button>';
    c += '</div>';  // END ROW 3

    return c;

  },

  gridoption_set:function(obj){

    $(this).each(function(){

      var columns = obj['columns'];

      $('.grid1optioncolumn', this).grid_val(columns);

    });

  }

})