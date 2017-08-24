$.fn.extend({

  filterbar:function(options){

    this.each(function(){

      var html = [];
      html.push("<button class='add-btn'><span class='fa fa-filter'></span> Filters...</button>");

      // html.push("<div contenteditable='true'>");
      // html.push("<span class='flt-bracket-start'>(</span>");
      // html.push("<span class='flt-key'>country_code</span>");
      // html.push("<span class='flt-opr'>LIKE</span>");
      // html.push("<span class='flt-val'>SG</span>");
      // html.push("<span class='flt-bracket-end'>)</span>");
      // html.push("</div>");

      // html.push("<span class='flt-item'>");
      // html.push("<span class='flt-key'>Name</span>");
      // html.push("<span class='flt-opt'>=</span>");
      // html.push("<span class='flt-val'>Andy</span>");
      // html.push("</span>");
      //
      // html.push("<span class='flt-item'>");
      // html.push("<span class='flt-key'>Gender</span>");
      // html.push("<span class='flt-opt'>=</span>");
      // html.push("<span class='flt-val'>Male</span>");
      // html.push("</span>");

      var el = this;
      $(el).addClass('filterbar');
      $(el).html(html.join(''));
      $(el).data('options', options);
      $(el).attr('data-type', 'filterbar');

      $('.add-btn', el).click(function(){
        $.filterbar_open.call(el);
      })

    });

  }

});

$.extend({

  filterbar_open:function(){

    // this = filterbar

    var el = this;

    var modal = $('#filter_modal');
    var options = $(this).data("options");
    var onchange = $.val('onchange', options);

    if(modal.length <= 0){

      var html = [];
      html.push("<div class='modal-body' style='min-height:200px'>");
      html.push("<div class='cont12 space10'>");
      html.push("<div class='lg12'><button class='blue filter-add-btn'><span class='fa fa-plus'></span> Add Filter...</button></div>");
      html.push("<div class='lg12'><span class='filter-grid'></span></div>");
      html.push("</div>");
      html.push("</div>");
      html.push("<div class='modal-foot'>");
      html.push("<button class='blue apply-btn'><span class='fa fa-save'></span> Apply Filter</button>");
      html.push("&nbsp;");
      html.push("<button class='close-btn'><span class='fa fa-times'></span> Close</button>");
      html.push("</div>");

      modal = document.createElement("div");
      document.body.appendChild(modal);

      $(modal).addClass('modal width800');
      $(modal).attr('id', 'filter_modal');
      $(modal).html(html.join(''));

      $('.close-btn', modal).click(function(){
        $('#filter_modal').modal_close();
      });

      $('.filter-grid', modal).grid({
        class: 'transparent',
        columns:[
          { text:'', type:'html', html:'$.filterbar_grid_option', width:'50px' },
          { text:'Type', type:'html', html:'$.filterbar_grid_type', width:'100px' },
          { text:'Key', type:'html', html:'$.filterbar_grid_key', width:'150px' },
          { text:'Operator', type:'html', html:'$.filterbar_grid_opt', width:'150px' },
          { text:'Value', type:'html', html:'$.filterbar_grid_val', width:'150px' },
        ]
      });

      $('.filter-add-btn', modal).click(function(){
        $('.filter-grid', modal).grid_add();
      });

      $('.apply-btn', modal).click(function(){

        var value = $('.filter-grid', modal).grid_value();
        $.fire_event(onchange, [ value ], el);
        $('#filter_modal').modal_close();

      });

    }

    $('#filter_modal').modal_open();

  }

});