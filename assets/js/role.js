$.extend({

  role_init:function(pCont){

    var cont = typeof pCont != 'undefined' && pCont instanceof HTMLElement ? pCont : document.body;

    $('*[data-role]', cont).each(function(){

      var role = this.getAttribute("data-role");
      switch(role){
        case 'modal.close':
          $(this).click(function(){
            $(this).closest('.modal').modal_close();
          })
          break;
        case 'url.open':
          var url = $(this).attr('data-role-value');
          $(this).click(function(){
            window.location = url;
          })
          break


      }

    });


  }

});