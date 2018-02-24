<div class="content">

  <div class="padding10">

    <table cellspacing="0" cellpadding="0">
      <tr>
        <td><button class="blue icon width50"><span class="glyphicons glyphicons-plus"></span></button></td>
        <td>&nbsp;</td>
        <td><button class="icon width50"><span class="glyphicons glyphicons-more"></span></button></td>
        <td>&nbsp;</td>
        <td><button class="icon width50"><span class="glyphicons glyphicons-refresh"></span></button></td>
        <td>&nbsp;</td>
        <td><span id="dropdown1"></span></td>
        <td style="width:100%"><span id="autocomplete1"></span></td>
        <td><span id="radio1"></span></td>
      </tr>
    </table>

    <div class="height20"></div>

    <span id="gridhead1"></span>
    <span id="grid1"></span>

  </div>


</div>
<script>

  $(function(){

    var columns = [
      { text:"", name:"options", width:"60px", type:"html", html:"grid1_col0" },
      { text:"", name:"image", width:"40px", type:"html", html:"grid1_col1", align:"center" },
      { text:"Code", name:"code", width:"80px" },
      { text:"Description", name:"description", width:"150px" },
      { text:"Countries", name:"countries", width:"200px" },
      { text:"Categories", name:"categories", width:"200px" },
    ];

    $('#dropdown1').dropdown({
      class:"gray group-left",
      default_value:"search",
      width:"90px",
      items:[
        { text:"Search", value:"search" },
        { text:"Code", value:"code" },
        { text:"Country", value:"country" },
        { text:"Domain", value:"domain" },
      ]
    });

    $('#autocomplete1').autocomplete({
      multiple:1,
      class:"group-center",
      width:"100%",
      src:'', // '../data/autocomplete.php',
      onchange:function(){
        console.log([ this, arguments ]);
      },
      placeholder:"Filter..."
    });

    $('#radio1').radio({
      class:"radio-group group-right",
      default_value:"all",
      items:[
        { text:"Active", value:"active" },
        { text:"Inactive", value:"inactive" },
        { text:"All", value:"all" },
      ],
      onchange:function(){
        console.log([ "radio changed", this, arguments ]);
      }
    });

    $('#gridhead1').gridhead({
      class:"style1",
      columns:columns,
      grid:"#grid1"
    });

    $('#grid1').grid({
      class:"style1",
      columns:columns,
      src:"../data/playground2.php",
      scroll_cont:"window"
    });

  })

  function grid1_col0(obj){

    var html = []
    html.push("<div class='align-center'>");
    html.push("<span class='fa fa-bars padding5 selectable'>");
    html.push("</div>");
    $(this).html(html.join(''));

  }

  function grid1_col1(obj){

    var html = []
    html.push("<div class='align-center'>");
    html.push("<span class='product-image'>");
    html.push("</div>");
    $(this).html(html.join(''));
    $('.product-image', this).image({
      width:"24px",
      height:"24px",
      value:obj['imageurl'],
      readonly:1
    })

  }

</script>