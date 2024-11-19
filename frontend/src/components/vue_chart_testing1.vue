<template>
    <line :chart_data="chartData" :chart-options="chartOptions" />
</template>
  
<script>
  import { Line } from 'vue-chartjs';
  
  export default {
    extends: Line,
    props: {
      jsonData: {
        type: Object,
        required: true
      }
    },
    computed: {
      chartData() {
        const labels = [];
        const dataset = [];
  
        // Extract labels and data from the JSON object
        for (let i = 0; i < this.jsonData.data.length; i++) {
          labels.push(this.jsonData.data[i].label);
          dataset.push(this.jsonData.data[i].value);
        }
  
        return {
          labels,
          datasets: [{
            label: 'My Data',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: dataset
          }]
        };
      },
    }
  };
</script>