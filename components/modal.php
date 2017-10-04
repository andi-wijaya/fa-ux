<div class="content padding10 bg-white">
  <button id="button1">Full-Size Modal</button>
  <button id="button2">Sized Modal</button>
  <button id="button3">Sized Modal 2</button>
</div>
<div class="modal" id="modal1">
  <div class="modal-head padding10"><h1>Full Size Modal</h1></div>
  <div class="modal-body padding10">
    <h1>Lorem Ipsum</h1>
    <br /><br />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare efficitur neque in suscipit. Maecenas imperdiet, nulla at congue elementum, turpis ligula sodales augue, eget efficitur lectus ex vel orci. Vestibulum lacinia ultrices nibh nec facilisis. Fusce vel arcu a justo auctor fringilla. Quisque cursus tristique erat nec dapibus. Nunc lacinia ipsum dictum, feugiat odio eget, pharetra libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ut eros erat.</p>
    <br />
    <p>Aenean vel nunc in erat fermentum dictum. Mauris cursus orci velit, sit amet viverra risus ultrices vitae. Fusce sed felis eget ex pulvinar aliquet. Donec fringilla orci lacus, eu congue eros elementum quis. Nunc in volutpat nisi. Fusce dignissim ante lobortis, finibus libero ac, faucibus odio. Aliquam et mollis nibh. Donec in neque velit. Donec sed tellus faucibus, hendrerit sapien nec, lobortis odio. In viverra scelerisque odio, et sodales enim blandit id. Proin gravida augue vel porta consectetur. Quisque sodales dictum viverra. Nam sagittis sollicitudin justo vel consectetur.</p>
    <br />
    <p>Praesent efficitur tellus nec aliquam suscipit. Pellentesque ut quam risus. Morbi hendrerit convallis nunc id lacinia. Curabitur sed vestibulum mauris. Donec lacinia, ipsum at facilisis auctor, odio nisi consequat nibh, in sollicitudin velit justo non mi. Suspendisse laoreet, eros vel molestie blandit, lorem nulla aliquam magna, at dignissim purus mauris vel diam. Cras sed nunc sem. Integer tincidunt dolor vel metus mollis, eget sagittis orci egestas. Proin vel eros at sem ornare tristique vel et turpis. Duis sit amet blandit felis, ut pellentesque augue. Aliquam condimentum suscipit justo id egestas. Curabitur vel dignissim arcu. Vestibulum suscipit magna ante, sit amet lobortis lacus elementum eu. Suspendisse ligula leo, ultricies in tellus a, feugiat eleifend neque. Donec vel ante massa.</p>
    <br />
    <p>Proin placerat sit amet risus a interdum. Quisque porta magna semper, iaculis ipsum vel, ultricies mauris. Sed eget ante arcu. Etiam vulputate, dui in convallis pharetra, lorem neque molestie metus, eget mattis lacus velit vitae tortor. Nam eleifend orci mauris, sit amet euismod ligula vulputate vitae. Vivamus at lectus in eros egestas tristique. Praesent eget varius quam. Suspendisse maximus vulputate sapien, eget imperdiet libero auctor imperdiet. Pellentesque at porta arcu, sit amet aliquam sem.</p>
    <br />
    <p>Sed blandit gravida massa, sit amet tincidunt sem mattis id. Cras fermentum ut odio id lobortis. Maecenas pellentesque, arcu vitae congue euismod, neque ligula fermentum ipsum, ut eleifend arcu enim in metus. Aliquam dictum eros ornare laoreet efficitur. Suspendisse a purus ullamcorper, commodo eros id, scelerisque dolor. Curabitur efficitur id elit sed lobortis. Integer non fermentum orci. Integer auctor dolor turpis. Nulla at condimentum purus. Phasellus at commodo leo, et placerat odio. Sed viverra cursus nulla, eu mattis ligula auctor in. Etiam elit quam, pretium eget dolor ac, sagittis vestibulum nunc. Nunc ac ligula sed est pellentesque semper ut quis velit. Etiam eleifend vulputate scelerisque. Morbi vitae purus ut justo faucibus tristique sed ac ante.</p>
    <br />
    <p>Mauris bibendum condimentum purus, eget auctor nisi malesuada ut. Donec imperdiet ut est eget condimentum. Curabitur ac neque mi. Cras pretium, ante sit amet volutpat feugiat, lectus nisi pretium sapien, sit amet consequat lectus mi ac leo. Phasellus vitae elit eu leo facilisis placerat in eu urna. Aliquam nibh nulla, consectetur interdum odio a, finibus interdum purus. Mauris auctor velit non ante finibus, non accumsan neque porttitor. Sed aliquam blandit risus ut eleifend. Vivamus elementum convallis mi, eu rhoncus velit porta eu. Morbi eleifend nunc egestas mi ultrices, non dignissim lectus pulvinar. Donec scelerisque ultricies tellus vel lacinia. Sed sit amet fringilla tortor. In accumsan finibus fermentum. Nam elementum dolor in ex suscipit malesuada.</p>
    <br />
    <p>Ut aliquam velit orci, vitae mattis magna eleifend id. Morbi a gravida tellus. In hac habitasse platea dictumst. Aliquam ac augue ipsum. Nam dignissim quam arcu, et pulvinar felis efficitur et. Maecenas non turpis sit amet turpis scelerisque consectetur. Curabitur dictum porta eros quis tempus. Etiam sagittis fringilla scelerisque. Sed non rutrum nulla, a eleifend mauris. In sollicitudin ornare sodales. Maecenas augue purus, ullamcorper vel magna rhoncus, vulputate pulvinar tortor. Integer interdum lectus in tempor molestie. Vivamus sodales justo non tincidunt ornare.</p>
    <br />
    <p>Vestibulum cursus massa eget urna accumsan interdum. Vivamus volutpat nulla risus, faucibus lacinia mi pharetra sed. Curabitur in ligula justo. Phasellus metus mi, placerat sit amet suscipit nec, hendrerit id felis. Nunc viverra egestas elit quis varius. Proin id lectus nibh. Morbi efficitur dui lacus, viverra fermentum nibh tristique ut. Fusce at auctor sapien. Cras accumsan feugiat est, quis aliquam odio.</p>
  </div>
  <div class="modal-foot padding10">
    <button data-action="modal.close"><span class="glyphicons glyphicons-remove"></span>Close</button>
  </div>
</div>
<div class="modal-bg"></div>

<script>

  $(function(){

    $('#button1').on('click', function(){ $('#modal1').modal_open(); });
    $('#button2').on('click', function(){ $('#modal1').modal_open({ width:"600px" }); });
    $('#button3').on('click', function(){ $('#modal1').modal_open({ width:"600px", height:window.innerHeight * .8 }); });

  })

</script>