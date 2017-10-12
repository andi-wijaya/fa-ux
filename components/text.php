<div class="content padding20">

  <h1>Home A/B Testing</h1>
  <div></div>
  <h2>Experiment</h2>
  <div class="height20"></div>

  <label class="cl-gray">Last Publish</label>
  <br />
  <label>Sep 20, 2017</label>

  <div class="height20"></div>

  <small>Experiment &sdot; </small>
  <small class="cl-green">Running</small>

  <div class="height20"></div>

  <label class="selectable cl-blue"><span class="glyphicons glyphicons-chevron-left"></span>Back to Experiment</label>

  <div class="height20"></div>

  <label>This is sample text with icons</label>
  <span class="glyphicons glyphicons-chevron-left"></span>
  <span class="glyphicons glyphicons-chevron-right"></span>
  <span class="glyphicons glyphicons-chevron-up"></span>
  <span class="icon1 glyphicons glyphicons-chevron-down"></span>

</div>

<script>

  $(function(){

    $('.icon1').on('click', function(){

      if($(this).hasClass('loading'))
        $('.icon1').removeClass('loading').addClass('glyphicons glyphicons-chevron-down');
      else
        $('.icon1').removeClass('glyphicons glyphicons-chevron-down').addClass('loading');

    })

  })

</script>

<div class="codebar">
  <pre>
<?php $c =
  <<< EOT
  <h1>Home A/B Testing</h1>
  <div></div>
  <h2>Experiment</h2>
  <div class="height20"></div>

  <label class="cl-gray">Last Publish</label>
  <br />
  <label>Sep 20, 2017</label>

  <div class="height20"></div>

  <small>Experiment &sdot; </small>
  <small class="cl-green">Running</small>

  <div class="height20"></div>

  <label class="selectable cl-blue"><span class="glyphicons glyphicons-chevron-left"></span>Back to Experiment</label>

  <div class="height20"></div>

  <label>This is sample text with icons</label>
  <span class="glyphicons glyphicons-chevron-left"></span>
  <span class="glyphicons glyphicons-chevron-right"></span>
  <span class="glyphicons glyphicons-chevron-up"></span>
  <span class="glyphicons glyphicons-chevron-down"></span>
EOT;
echo htmlentities($c);?>
  </pre>
</div>