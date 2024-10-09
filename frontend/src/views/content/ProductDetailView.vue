<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
  </div>
  
  <div class="container" v-if="searchResults != '' && searchResults != null" >
          <div class="row">
            <div class="col-12">
              <div id="app">
                <table >
                  <thead>
                    <horizontalcomponent :searchResults="searchResults" />
                  </thead>
                </table>
              </div>
            </div>
          </div>
    </div>

<!-- data graph price -->
    <div v-if="isLoading1">
          Loading Chart Price...
    </div>
    <a>chart happen here</a>
      <div class="chart-container" v-if="chartdata_pricerange != null && chartdata_pricerange != ''">
        <MyBarChart :chartData="chartdata_pricerange" :chartOptions="chartOptions2" />
      </div>
       <!-- data graph criteria -->
      <div v-if="isLoading">
          Loading Chart criteria...
      </div>
      <div class="chart-container" >
        <div v-if="chartdata_criteria != null">
          <MyBarChart :chartData="chartdata_criteria" :chartOptions="chartOptions1" />
        </div>
      </div>
    

    
</template>
<script>
import axios from 'axios'
export default {

  inject: ['GStore']
  ,
  methods: {
    fetchChartData() {
      this.isLoading = true;
      const path = 'http://localhost:5000/search/critandprod';
      const sending = [this.searchData,this.usertargetData]
      axios.post(path,sending,
      {headers: {
      'Content-Type': 'application/json',  // Set the correct Content-Type header
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
        .then(response => {
          console.log("chart data")
          
          this.sample_test_for_chart = response.data
          console.log(this.sample_test_for_chart)
          this.formatChartData(this.sample_test_for_chart)
          console.log("done chart data")
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
          this.isLoading = false;
        });
    },

  }
}

</script>