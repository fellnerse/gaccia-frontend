<!-- Please remove this file from your project -->
<template>
  <div>
    <div class=""> Stuff </div>
    <canvas id="myChart" width="400" height="400"></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.2/chart.min.js" integrity="sha512-zjlf0U0eJmSo1Le4/zcZI51ks5SjuQXkU0yOdsOBubjSmio9iCUp8XPLkEAADZNBdR9crRy3cniZ65LF2w8sRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  </div>
</template>

<script crossorigin="anonymous" referrerpolicy="no-referrer">
export default {
  name: "NuxtTutorial",
  data() {
    return {
      ctx : 'myChart',
      config:{
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Temperatur',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },{
            label: 'Pressure',
            data: [],
            fill: false,
            borderColor: 'red',
            tension: 0.1
          },
            {
              label: 'Amps',
              data: [],
              fill: false,
              borderColor: 'yellow',
              tension: 0.1
            },]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      },
      lineChart: null,
      eventSource: null,
    };
  },
  mounted() {
    this.getTemperatures();
    this.lineChart= new Chart(this.ctx, this.config)
    this.eventSource = new EventSource('http://coffee.local/events')

    this.eventSource.addEventListener(
      'open',
      function (e) {
        console.log("Event source connected");
      },
      false
    );

    this.eventSource.addEventListener(
      'error',
      function (e) {
        if (e.target.readyState != EventSource.OPEN) {
          console.log("Events source disconnected");
        }
      },
      false
    );

    this.eventSource.addEventListener(
      'message',
      function (e) {
        console.log("message", e.data);
      },
      false);

    this.eventSource.addEventListener(
      'new_temps',
      (event) => this.plotData(JSON.parse(event.data)),
      false
    );

  },
  methods: {
    getTemperatures() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "http://coffee.local/temperatures", true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const myObj = JSON.parse(xhr.responseText);
          console.log("got update", myObj);
          this.plotData(myObj);
        }
      };
      xhr.send();
    },
    plotData(data) {
      console.log("plot data", data);
      this.addData(new Date().toLocaleTimeString(), data)
    },
    addData(label, data) {
      this.lineChart.data.labels.push(label);
      console.log(this.lineChart.data.datasets);
      this.lineChart.data.datasets[0].data.push(data.currentTemp)
      this.lineChart.data.datasets[1].data.push(data.pressure)
      this.lineChart.data.datasets[2].data.push(data.heaterPower)



      console.log(this.lineChart.data);
      this.lineChart.update();
    }
  }
};
</script>
