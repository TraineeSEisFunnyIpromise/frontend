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
  <div v-if="receiveData != ''">

    <div>
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
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" class="text-container">prod title</th>
                      <th class="text-banner" v-for="item in searchResults" :key="item.title">{{ item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title }}</th>
                    </tr>
                  </thead>
                  <tbody>
                      <!-- Filter and display only the row where property is 'price' -->
                    <tr v-if="Object.keys(searchResults[0]).includes('price')" key="price">
                        <th scope="row">Price</th>
                      <td v-for="item in searchResults" :key="item.id">{{ item.price }}</td>
                    </tr>
                    <!-- <tr v-if="Object.keys(searchResults[0]).includes('description')" key="description">
                        <th scope="row">description</th>
                      <td v-for="item in searchResults" :key="item.id">{{ item.description }}</td>
                    </tr> -->
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- highlightText -->
        <div v-if=" selectedItems != null" >
                    <th class="text-container" scope="col" 
                   v-for="item in searchResults" :key="item.title" >
                   {{ highlightText(item.title, selectedItems) }}
                  </th>
                  <td v-for="item in searchResults" :key="item.id">
                    <span v-html="highlightText(item.price.toString(), selectedItems)"></span>
                  </td>
        </div>

        
                  <!-- test about highlightText -->
 
                  <!-- <th class="text-container" scope="col">{{ highlightText(item.title, selectedItems) }}</th>
                  <td v-for="item in searchResults" :key="item.id">
                    <span v-html="highlightText(item.price.toString(), selectedItems)"></span>
                  </td> -->

        <!--the end of show scraped -->

        <!-- data graph thingy -->

        <div v-if="isLoading1">
          Loading Chart Price...
        </div>
       <a>chart happen here</a>
       <div class="chart-container" v-if="chartdata_pricerange != null && chartdata_pricerange != ''">
        <MyBarChart :chartData="chartdata_pricerange" :chartOptions="chartOptions2" />
       </div>
       <div v-if="isLoading">
          Loading Chart criteria...
        </div>
        <div class="chart-container" >
          <div v-if="chartdata != null">
            <MyBarChart :chartData="chartData" :chartOptions="chartOptions1" />
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
    MyBarChart
  },
  data() {
    return {
      selectedChoice: null, // Store the selected choice value
      isLoading: false,
      isLoading1: false,
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
      chartdata : null  //chart data for criteria score
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
      const path = 'http://localhost:5000/search/scrape_test'
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
        });
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
          console.log(this.chartData)
          this.formatChartData(response)
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
          this.isLoading = false;
        });
    },
        // Control Method
    executeSearchAndScrape() {
      // First, send the search input
      this.send_search_input();
      this.scrape();
    },
    formatChartData(data) {
  if (Array.isArray(data)) {
    // Filter out null values
    const filteredData = data.filter(item => item !== null);

    // Prepare chart data
    this.chartData = {
      labels: filteredData.map(item => item.Label || "Default Value"), // Extract Label property or use default
      datasets: [
        {
          labels: filteredData.map(item => item.Score || "Default Value"), // Extract Score property or use default
          backgroundColor: '#42A5F5',
          data: filteredData.map(item => item.Score), // Extract Score property
        }
      ]
    };
  
    console.log("dataset");
    console.log(this.chartData);
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
                    data: filteredResults.map(item => item.price ? parseFloat(item.price.replace('$','')):0),
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

</style>