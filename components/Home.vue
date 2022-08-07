<template>
  <div style="width:100%">
    <div v-show="errorMessage">{{errorMessage}}</div>
    <HostnameSelection v-show="!hostname" class="mx-md-16" />
    <div v-show="hostname">
      <v-row>
        <v-col cols="md-4">
          <LineChart :data="tempGraphData" :chart-options="options"></LineChart>
        </v-col>
        <v-col cols="md-4">
          <LineChart :data="pressureGraphData" :chart-options="options"></LineChart>
        </v-col>
        <v-col cols="md-4">
          <LineChart :data="powerGraphData" :chart-options="options"></LineChart>
        </v-col>
      </v-row>
      <v-btn :disabled="requestStatus === null" @click="setPIDStatus(1)">enable PID</v-btn>
      <v-btn :disabled="requestStatus === null" @click="setPIDStatus(0)">disable PID</v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: "NuxtTutorial",
  data() {
    return {
      data: {
        dates: [],
        tempData: {
          label: "Temperatur",
          data: [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1
        },
        pressureData: {
          label: "Pressure",
          data: [],
          fill: false,
          borderColor: "red",
          tension: 0.1
        },
        powerData: {
          label: "Amps",
          data: [],
          fill: false,
          borderColor: "yellow",
          tension: 0.1
        }
      },
      options: {
        pointHitRadius: 2,
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            gridLines: {
              display: false,
              color: "#FFFFFF"
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: "bottom"
          }
        },
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      },
      eventSource: null,
      requestStatus: true,
      errorMessage: null,
    };
  },
  computed: {
    hostname() {
      return this.$store.state.hostname.value;
    },
    tempGraphData() {
      return { labels: this.data.dates, datasets: [this.data.tempData] };
    },
    pressureGraphData() {
      return { labels: this.data.dates, datasets: [this.data.pressureData] };
    },
    powerGraphData() {
      return { labels: this.data.dates, datasets: [this.data.powerData] };
    }
  },
  watch: {
    hostname(value) {
      if (value) {
        this.setup(value);
      }
    }
  },
  mounted() {
    this.$store.commit("hostname/initStorage");
  },
  methods: {
    getTemperatures(hostname) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `http://${hostname}/temperatures`, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const myObj = JSON.parse(xhr.responseText);
          this.addData(myObj);
        }
      };
      xhr.send();
    },
    addData(data) {
      console.log("got update", data);
      this.data.dates.push(new Date().toLocaleTimeString());
      this.data.tempData.data.push(data.currentTemp);
      this.data.pressureData.data.push(data.pressure);
      this.data.powerData.data.push(data.heaterPower);
    },
    setup(hostname) {
      this.getTemperatures(hostname);
      // this.lineChart = new Chart(this.ctx, this.config);
      this.eventSource = new EventSource(`http://${hostname}/events`);

      this.eventSource.addEventListener(
        "open",
        function(e) {
          console.log("Event source connected");
        },
        false
      );

      this.eventSource.addEventListener(
        "error",
        function(e) {
          if (e.target.readyState != EventSource.OPEN) {
            console.log("Events source disconnected");
          }
        },
        false
      );

      this.eventSource.addEventListener(
        "message",
        function(e) {
          console.log("message", e.data);
        },
        false);

      this.eventSource.addEventListener(
        "new_temps",
        (event) => this.addData(JSON.parse(event.data)),
        false
      );

    },
    async setPIDStatus(status) {
      this.requestStatus = null
      const response = await fetch("http://" + this.hostname + "/post?varPID_ON="+status, {
        method: "POST"
      })

      if (response.status === 200){
        this.requestStatus = true // todo => could request new settings
      }
      else {
        this.errorMessage = (await response.text())
        this.requestStatus = false
      }
    }
  }
};
</script>
