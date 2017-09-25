$.fn.extend({

  checklist:function(options){

    $(this).each(function(){

      var instance = this;
      var html = [];

      html.push("<div class='checklist-body'>");
      html.push("<div class='checklist-item'>");
      html.push("<input type='checkbox' />");
      html.push("<input type='text' />");
      html.push("<span class='iconbar'>");
      html.push("<span class='checklist-remove fa fa-times padding5 selectable'></span>");
      html.push("</span>");
      html.push("</div>");
      html.push("</div>");

      html.push("<div class='checklist-foot'>");
      html.push("<span class='checklist-add fa fa-plus-circle padding5 selectable hoverable'></span>");
      html.push("</div>");

      $(this).addClass('checklist');
      $(this).html(html.join(''));

      $('.checklist-add', this).click(function(){
        $(instance).checklist_add();
      });

      $('.checklist-remove', this).on('click.checklist', function(){
        $(this).closest('.checklist-item').remove();
      })

    });

  },

  checklist_add:function(){

    $(this).each(function(){

      var html = [];
      html.push("<div class='checklist-item'>");
      html.push("<input type='checkbox' />");
      html.push("<input type='text' />");
      html.push("<span class='iconbar'>");
      html.push("<span class='checklist-remove fa fa-times padding5 selectable hoverable'></span>");
      html.push("</span>");
      html.push("</div>");

      $('.checklist-body', this).append(html.join(''));

      $('.checklist-remove', $('.checklist-body', this)).on('click.checklist', function(){
        $(this).closest('.checklist-item').remove();
      })

    })

  },

  checklist_get:function(){

    var value = [];
    $(this).each(function(){

      $('.checklist-item', this).each(function(){

        var checked = $("input[type='checkbox']", this)[0].checked;
        var text = $("input[type='text']", this).val();

        if(text.length > 0){
          value.push({
            checked:checked,
            text:text
          })
        }

      });

    });
    return value.length == 0 ? null : value;

  },

  checklist_set:function(value){

    $(this).checklist_attr({ value:value });

  },

  checklist_attr:function(obj){

    if($.type(obj) != 'object') return;

    $(this).each(function(){

      for(var key in obj){
        var value = obj[key];

        switch(key){

          case 'readonly':
            if(value){
              $("input[type='checkbox']", this).attr('disabled', true);
              $("input[type='text']", this).attr('readonly', true);
              $('.checklist-remove', this).addClass('hidden');
              $('.checklist-add', this).addClass('hidden');
            }
            else{
              $("input[type='checkbox']", this).attr('disabled', false);
              $("input[type='text']", this).attr('readonly', false);
              $('.checklist-remove', this).removeClass('hidden');
              $('.checklist-add', this).removeClass('hidden');

            }
            break;

          case 'value':
            var html = [];
            if($.type(value) == 'array')
              for(var i = 0 ; i < value.length ; i++){
                var value_obj = value[i];
                var text = $.val('text', value_obj, { d:'' });
                var checked = $.val('checked', value_obj, { d:false });

                if(text == '') continue;

                html.push("<div class='checklist-item'>");
                html.push("<input type='checkbox'" + (checked ? ' checked' : '') + "/>");
                html.push("<input type='text' value=\"" + text + "\" />");
                html.push("<span class='iconbar'>");
                html.push("<span class='checklist-remove fa fa-times padding5 selectable hoverable'></span>");
                html.push("</span>");
                html.push("</div>");
              }
            html.push("<div class='checklist-item'>");
            html.push("<input type='checkbox'/>");
            html.push("<input type='text'/>");
            html.push("<span class='iconbar'>");
            html.push("<span class='checklist-remove fa fa-times padding5 selectable hoverable'></span>");
            html.push("</span>");
            html.push("</div>");
            $('.checklist-body', this).html(html.join(''));
            $('.checklist-remove', $('.checklist-body', this)).on('click.checklist', function(){
              $(this).closest('.checklist-item').remove();
            })
            break;

        }


      }

    })

  }

});