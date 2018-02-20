<div class="content padding20">

  <button id="button1" class="blue width100">Alert</button>

  <div class="height10"></div>

  <div class="docs-method">
    <table>
      <tr>
        <td>$.alert</td>
        <td>Show alert</td>
        <td>text</td>
        <td>string</td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td>actions</td>
        <td>array</td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td>callback</td>
        <td>closure</td>
      </tr>
    </table>
  </div>

</div>

<script>

  $(function(){

    $('#button1').click(function(){

      $.alert('An error occured while trying to save invoice. Please try again.', [
        { text:"OK" },
        { text:"Cancel" },
        { text:"Dont Know" },
      ], function(){
        console.log([ this, arguments ]);
      });

    })

  })

</script>