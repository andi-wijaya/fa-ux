$(function(){

  // Header, sidebar & content
  var headerHeight = $('.header').outerHeight();
  $('.content').css({ 'margin-top':headerHeight });

  window.addEventListener('click', function(){
    $.popup_close_all();
  });

  window.addEventListener('scroll', function(){
    $.popup_close_all();
  });

  $.tab_init();
  $.foldedpane_init();
  $.section_init();
  $.workspace_init();
  $.role_init();

  $.layout_resize();
  $(window).on('resize.layout', function(){ $.layout_resize(); });

  $('.header-bar-btn').click(function(){

    $('.sidebar').toggleClass('on');
    $('.header').toggleClass('sidebar-on');
    $('.content').toggleClass('sidebar-on');

    $.api_post('api/app/state/save', { 'sidebar-state':$('.sidebar').hasClass('on') ? 1: 0 });

  });

  $.ux();

});