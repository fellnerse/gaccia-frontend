<template>
  <LineGraph
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>


<script>
import { Line as LineGraph } from "vue-chartjs";
import "chart.js/auto";


export default {
  name: "LineChart",
  components: { LineGraph },
  props: {
    chartId: {
      type: String,
      default: "line-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    plugins: {
      type: Object,
      default: () => {
      }
    },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {
        return {
          labels: [],
          datasets: []
        };
      }
    }
  },
  computed: {
    chartData() {
      return this.data;
    }
  }
};
</script>
