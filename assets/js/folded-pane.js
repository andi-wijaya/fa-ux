$.extend({

  foldedpane_toggle:function(exp){

    var el = $(exp);
    if(typeof el[0] == 'undefined') return;
    var toggler = $('.toggler', el);

    if(el[0].classList.contains('folded')){
      el[0].classList.remove('folded');
      if(toggler.length == 1) toggler.html("<span class='fa fa-caret-up'></span>");
    }
    else{
      el[0].classList.add('folded');
      if(toggler.length == 1) toggler.html("<span class='fa fa-caret-down'></span>");
    }

  },
  foldedpane_init:function() {

    var els = document.body.querySelectorAll(".folded-pane");
    for (var i = 0; i < els.length; i++) {

      var el = els[i];
      var toggler = el.querySelector('.toggler');
      if (toggler != null) {
        toggler.addEventListener('click', function () {
          $.foldedpane_toggle(el);
        })
      }
    }

  },

});