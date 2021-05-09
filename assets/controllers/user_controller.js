import Chart from 'chart.js/auto'

function drawChart(ctx) {

   if (typeof getCharsetUrl != "function") {
       return;
   }

   $.get(getCharsetUrl(), function(data) {
       var myChart = new Chart(ctx, data);
   });

}

var ctx = document.getElementById('myChart');
if (ctx !== null) {
    drawChart(ctx);
}


