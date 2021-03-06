<div class="content">

  <span id="chart1"></span>
  <div class="height20"></div>
  <span id="chart2"></span>

</div>

<script>

  $(function(){

    $('#chart1').chart({
      width:"300px",
      height:"200px",
      type:"line",
      title:"Title",
      value:{
        labels: [1501,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [
          {
            data: [86,114,106,106,107,111,133,221,783,2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: "#3e95cd"
          }, {
            data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: "#8e5ea2"
          }, {
            data: [168,170,178,190,203,276,408,547,675,734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: "#3cba9f"
          }, {
            data: [40,20,10,16,24,38,74,167,508,784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: "#e8c3b9"
          }, {
            data: [6,3,2,2,7,26,82,172,312,433],
            label: "North America",
            borderColor: "#c45850",
            fill: "#c45850"
          }
        ]
      },
    });

    $('#chart2').chart({
      width:"300px",
      height:"200px",
      type:"bar",
      title:"Title",
      src:"/fa-ux/data/sample_chart.php",
      autoload:false,
      options:{
        scales: {
          xAxes: [{
            ticks: {
              callback: function(value) {
                return value.toString().substr(0, 3);//truncate
              },
            }
          }],
          yAxes: [{}]
        },
        tooltips: {
          enabled: true,
          mode: 'label',
          callbacks: {
            title: function(tooltipItems, data) {
              var idx = tooltipItems[0].index;
//              console.log(arguments);
              return 'Title:' + data.labels[idx];//do something with title
            },
            label: function(tooltipItems, data) {
              //var idx = tooltipItems.index;
              //return data.labels[idx] + ' €';
              console.log(arguments);
              return tooltipItems.xLabel;
            }
          }
        },
        legend: {
          display: false
        }
      }
    });
    $('#chart2').chart_load({ data:null });

  })

</script>