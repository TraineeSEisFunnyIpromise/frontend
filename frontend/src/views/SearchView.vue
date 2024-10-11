<template>
  <form @submit.prevent="executeSearchAndScrape">
    <div class="inputtext" for="search">Search Product</div>
    <input type="text" id="searchData" v-model="searchData" required>

    <div class="inputtext" for="groupsearch">Group target</div>
    <input type="text" id="usertargetData" v-model="usertargetData">
  </form>

  <div style="padding-top: 10px;">
    <button type="submit" @click="executeSearchAndScrape">Click here to create your electric's criteria</button>
  </div>
    <!-- <div class="loader"></div> -->
<!-- result section -->
  <div class="colored-box-display" style=" text-align: center;">
    <div v-if="receiveData == ''">result will display here</div>
    <div v-if="receiveData != ''">
      <div> 
        <div>Selected criteria: {{ selectedItems }}</div>
        <div v-for="item in receiveData" :key="item">
          <input type="checkbox" :id="item" :value="item" v-model="checkedItems" />
          <a :for="item">{{ item }}</a>
        </div>
      </div>

      <!-- a fancy select box -->
      <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
      <a>{{ datastore }}</a>

      <!-- this part check if receive data or not if not data not show -->
       <div v-if="badscrape != ''"></div>

        <div class="container" v-if="searchResults != '' && searchResults != null" >
          <div class="row">
            <div class="col-12">
              <div id="app">
                  <thead>
                    <horizontalcomponent :searchResults="searchResults" />
                  </thead>
                  <thead>
                    <EventCard :searchResults="searchResults" />
                  </thead>
              </div>
            </div>
          </div>
        </div>

        <!-- highlightText -->
        <div class="horizontal-container" v-if=" selectedItems != null" >
                    <div class="text-container" scope="col" 
                   v-for="item in searchResults" :key="item.title" >
                   <span>
                   {{ highlightText(item.title.length > 50 ? item.title.slice(0, 10) + '...' : item.title, selectedItems) }}
                  </span>
                   <span v-html="highlightText(item.price.toString(), selectedItems)"></span>
                  </div>
        </div>
        

        <!--the end of show scraped -->

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

        <!-- end of data graph -->
    </div>

  </div>



</template>


<script>
import axios from 'axios'
//--------------------graph visualization with vueslize yike---------------
import MyBarChart from '@/components/chartfromvuechart.vue';
import horizontalcomponent from '@/components/horizontal-component.vue';
import EventService from '@/services/EventService.js'

// import express from 'express' <- this create 28 error which im not gonna fix that again 
//---------------------funny part---------------------------
//-----------yup CORS is nice--------------

//----------another funny and long part---------------
export default {
  props: {
    choices: {
      type: Array,
      required: true,
    },
  },
  components: {
    MyBarChart,
    horizontalcomponent,
  },
  data() {
    return {
      selectedChoice: null, // Store the selected choice value
      isLoading: false,
      isLoading1: false,
      oldsearchData:"",
      old_user_target:"",
      hasScroll: true,// scroallable thingy
      searchData:'',//search input
      usertargetData:'',//group target input
      receiveData: '',// receive criteria
      selected:'',//selected criteria
      datastore:'',//selected criteria that store before send
      searchResults: [],//receive data scrape result
      items: [],//idk?
      checkedItems: [],//????
      selectedItems:[],//what?
      badscrape:'',
      userInput:'',// before send to backend input   
      chartdata_criteria : null  //chart data for criteria score
        ,
      chartdata_pricerange : null //chart price range
        ,
   chartOptions1: { // literally option for setup chart yeah 
        responsive: true,
        plugins: {
          legend: {
            position: 'top', 
          },
          title: {
            display: true,
            text: 'Chart Criteria Score'
          }
        }
      },
      chartOptions2: { // literally option for setup chart 2 yeah 2
        responsive: true,
        plugins: {
          legend: {
            position: 'top', 
          },
          title: {
            display: true,
            text: 'Chart Price Range'
          }
        }
      }
    };
    
  },
  watch: {
    checkedItems(newValue) {
      this.selectedItems = newValue;
    }
  },
  methods: {
    send_search_input() {
      console.log("searchtringerred")
      const path = 'http://localhost:5000/search/search_criteria_test'

      //an entire stuff happen below here also this is might be the worst refactor i have ever done
      if (this.searchData !== '' ) {
        console.log(this.userInput)
        //funni stuff CORS and CONTENT thingy
        console.log("search sent")
        const sending = [this.searchData,this.usertargetData]
        axios.post(path, sending,{headers: {
      'Content-Type': 'application/json'  // Set the correct Content-Type header
      }
    })
          .then(response => {
            this.receiveData =  response.data
            console.log("receive data");
            console.log(response);
          })
          .catch(error => {
          this.userInput= this.selected + this.sendData
          console.log(this.userInput)
          console.log(error);
          });
        // Successful 
      } else {
        // Failed
        alert('please add an input');
        console.log("please add information");
        
      }
    },

    scrape() {
      console.log("scrape tringerred")
      
      const sending = [this.searchData,this.usertargetData];
      // const path = 'http://localhost:5000/search/scrape'
      const path = 'http://localhost:5000/search/scrape'
      if (this.searchData !== ''){
        axios.post(path,sending,
      {headers: {
      'Content-Type': 'application/json',  // Set the correct Content-Type header
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
        .then(response => {
          console.log("sending to scrape");
          this.searchResults = response.data;
          console.log(this.searchResults)
          console.log("replaced search result, doing price chart")
          this.setupPriceData(this.searchResults)
          this.fetchChartData()
        })
        .catch(error => {
          console.log("scraped error occurred!")
          console.log(error);
          this.badscrape = "scrape got problem "+ error
          alert(this.badscrape)
        });
      }
      else{
        alert("scrape is not work try again")
      }
    },

    fetchChartData() {
      this.isLoading = true;
      const path = 'http://localhost:5000/search/critandprod_test';
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
        // Control Method
    executeSearchAndScrape() {
      // First, send the search input check input before send 
      if(this.searchData!=''){
        if(this.searchData == this.oldsearchData ){
        console.log("use old data")
        if(this.old_user_target != this.usertargetData){
          this.send_search_input()
          EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data
            })
          }
        }
        else{
        this.oldsearchData = this.searchData
        console.log(this.oldsearchData)
        this.send_search_input();
        this.scrape();}
      }
      else{
        alert("the input must not be empty")
      }


    },
    formatChartData(data_receive) {
      console.log("doing chart data")
      if (Array.isArray(data_receive)) {
      const filteredResults = data_receive.filter(item => item !== null);
      this.isLoading = true
      this.chartdata_criteria = {
          labels: filteredResults.map(item => item.Label),
          datasets: [
                {
                  labels: this.Label,
                    backgroundColor: '#42A5F5',
                    data: filteredResults.map(item => item.Score),
                },
            ],
        };
        console.log(this.chartdata_criteria.datasets)
        console.log(data_receive)
        this.isLoading = false
      }else{
        console.log("bad stuff in data")
      }
},
    setupPriceData(result_target) {
      this.isLoading1 = true;
    if (Array.isArray(result_target)) {
        const filteredResults = result_target.filter(item => item !== null);
        // console.log(filteredResults); // Log the filtered results

        this.chartdata_pricerange = {
          labels: filteredResults.map(() => "$"), // Replace all labels with "$"
          datasets: [
                {
                  labels: filteredResults.map(item => item.title || "Default Value"),
                    backgroundColor: '#42A5F5',
                    data: filteredResults.map(item => item.price)
                },
            ],
        };
      // Safety check for price data
      if (
          this.chartdata_pricerange.datasets &&
          this.chartdata_pricerange.datasets[0] && // Check if the first dataset exists
          this.chartdata_pricerange.datasets[0].data != null // Check if price data exists
      ) {
          console.log("price ok");
      } else {
          console.error("price bad");
          console.log(this.chartdata_pricerange.datasets)
      }

      // Safety check for labels
      if (this.chartdata_pricerange.labels != null) {
          console.log("label ok");
      } else {
          console.log("label bad");
      }
      this.isLoading1 = false;
        console.log(this.chartdata_pricerange); // Log the final data structure
    } else {
      this.isLoading1 = false;
      console.error('Error fetching price data');
    }
    },
    highlightText(text, criteria) {
      const regex = new RegExp(criteria.join('|'), 'gi'); // Join criteria for multiple matches
      return text.replace(regex, `<mark>$&</mark>`);
    },
  },
};
</script>
<style>
.top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
}

.centersomething {
        font-size: small;
		max-width: 20000px;
        position: absolute;
        left: 30%;
}

/* container and text container */
.container {
  max-width: 768px;
}

.text-container {
  max-width: 200px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-holder, .table-responsive {
  position: relative;
}

.table-responsive::-webkit-scrollbar {
  height: 10px;
}

.table-responsive::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #333333;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #333333;
  outline: 1px solid #333333;
}

.info {
  position: absolute;
  width: 200px;
  height: 100%;
  background: linear-gradient(to right, transparent, #ffffff);
  top: 50%;
  left: 35%;
  padding: 20px;
  text-align: right;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  pointer-events: none;
}

.show {
  opacity: 1;
  visibility: visible;
}

tr th:first-child, tr td:first-child {
  position: sticky;
  min-width: 50px;
  left: 0;
  background: white;
}

.button4 {
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
}

.button4:hover {
  background-color: #cf7272;
}
.button4:active {
  background-color: #e7e7;
}
  
.button5 {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}

.inputtext{
  font-size: larger;

}
.text-banner{
  font-size: small;
}
.chart-container{
  width: 40%;
  height: 40%;
}


.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  clip-path: inset(0 3ch 0 0);
  animation: l4 1s steps(4) infinite;
}
.loader:before {
  content:"Loading..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}

.colored-box-display {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #3a423a;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.horizontal-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #3a423a;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: 200px; 
  overflow: auto;
}
.horizontal-container div {
  display: inline-block; 
  padding: 5px;
  margin-right: 10px; 
}
</style>