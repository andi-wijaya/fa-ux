<div class="content padding20 bg-white">

  <ul class="tab">
    <li>General</li>
    <li>Countries</li>
    <li>Logs</li>
  </ul>

  <div class="tab-cont padding10">
    <div class="off"><h1>General</h1></div>
    <div><h1>Countries</h1></div>
    <div class="off"><h1>Logs</h1></div>
  </div>

  <div style="border-bottom: solid 1px #eee"></div>

  <table class="properties">

  </table>

</div>

<div class="codebar width300 padding20">
  <pre>
<?php $c =
<<< EOT
<ul class="tab">
  <li>General</li>
  <li>Countries</li>
  <li>Logs</li>
</ul>

<script>
  $('.tab').tab({
    container:'.tab-cont',
    default_index: 1
  });
</script>
EOT;
echo htmlentities($c);?>

  </pre>
</div>

<script>

  $(function(){

    $('.tab').tab({
      container:'.tab-cont',
      default_index: 1
    });

  })

</script>