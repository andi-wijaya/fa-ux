<div class="content padding20">

  <h1>Demonstrate Control Command within Container</h1>
  <div class="height50"></div>

  <table class="table1 container" cellspacing="2">
    <tr>
      <td class="width100"><label class="padding6">Textbox</label></td>
      <td><div id="textbox1"></div></td>
    </tr>
    <tr>
      <td class="width100"><label class="padding6">Textarea</label></td>
      <td><div id="textarea1"></div></td>
    </tr>
    <tr>
      <td class="width100"><label class="padding6">Dropdown</label></td>
      <td><div id="dropdown1"></div></td>
    </tr>
    <tr>
      <td></td>
      <td>
        <button id="button1" class="blue">Reset</button>
        <button id="button2" class="red">Validate</button>
      </td>
    </tr>
  </table>

</div>

<script>

  $(function(){

    $('#textbox1').textbox({
      class: "bold",
      default_value: "Hello",
      name:"Textbox1",
      placeholder: "Textbox",
      required:1
    });

    $('#textarea1').textarea({
      class: "bold",
      default_value: "World",
      placeholder: "Textarea",
      name:"Textarea1",
      required:1
    });

    $('#dropdown1').dropdown({
      class: "bold",
      default_value: "world",
      name:"Textarea1",
      required:1,
      items:[
        { text:"worlD", value:"world" }
      ]
    });

    $('#button1').click(function(){

      $('.container').reset();

    })

  })

</script>