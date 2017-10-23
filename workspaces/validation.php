<div class="content padding20">

  <h1>Validation</h1>
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
      <td class="width100"><label class="padding6">Autocomplete</label></td>
      <td><div id="autocomplete1"></div></td>
    </tr>
    <tr>
      <td class="width100"><label class="padding6">Checkbox</label></td>
      <td>
        <div id="checkbox1"></div>
        <div id="checkbox2"></div>
        <div id="checkbox3"></div>
      </td>
    </tr>
    <tr>
      <td class="width100"><label class="padding6">Datepicker</label></td>
      <td>
        <div id="datepicker1"></div>
        <div id="datepicker2"></div>
      </td>
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
      default_value: "world2",
      name:"Textarea1",
      required:1,
      items:[
        { text:"World", value:"world" }
      ]
    });

    $('#autocomplete1').autocomplete({
      src:"/fa-ux/data/seo_country_filter.php",
      width:"300px",
      required:1
    });

    $('#datepicker1').datepicker({
      required:1,
      onchange:function(value){
        console.log([ 'changed', value ]);
      },
      value:""
    });

    $('#datepicker2').datepicker({
      mode:'range',
      required:1,
      onchange:function(value){
        console.log([ 'changed', value ]);
      },
      value:""
    });

    $('#checkbox1').checkbox({
      required:1,
      value:1
    });

    $('#checkbox2').checkbox({
      text:"Is Awesome",
      required:1,
      value:1
    });

    $('#checkbox3').checkbox({
      items:[
        { text:"Hello", value:"hello" },
        { text:"World", value:"world" },
      ],
      required:1,
      value:"hello"
    });

    $('#button1').click(function(){

      $('.container').reset();

    })

    $('#button2').click(function(){

      var valid = $('.container').container_validate();
      console.log([ 'valid', valid ]);

    })

  })

</script>