<h1>Grid</h1>
<br /><br /><br />


<!-- BEGIN Samples -->
<h5>Samples:</h5>
<br /><br />
<span class="bg-light1 padding10">
  <span id="sample1"></span>
  <span id="sample2"></span>
  <script id="script1" type="text/javascript">
    $(function(){
      $('#sample1').gridhead({
        columns:[
          { text:"Code", name:"code", width:"100px" },
          { text:"Description", name:"description", width:"300px" },
        ],
        grid:"#sample2"
      });
      $('#sample2').grid({
        columns:[
          { text:"Code", name:"code", width:"100px" },
          { text:"Description", name:"description", width:"300px" },
        ],
        src:"<?=base_url()?>/data/sample_grid.php"
      });
    })
  </script>
</span>
<br /><br />
<pre id="script1code" class="code"></pre>
<script type="text/javascript"> $(function(){ $('#script1code').html($('#script1').html()); }); </script>
<!-- END Samples -->