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

  <div v-if="receiveData != ''">
    <h2>Search Results :</h2>
    <div class="col-12">
      <div>
        Output of search which are requirements:
        {{ receiveData }}
      </div>
      <div>
        Input of Search:
        {{ userInput }}
      </div>
    </div>

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

      <!-- A funni table of content -->

      <!-- this part check if receive data or not if not data not show -->

        <div class="container" v-if="searchResults != '' && searchResults != null" >
          <div class="row">
            <div class="col-12">
              <div id="app">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" class="text-container">prod title</th>
                      <th class="text-banner" v-for="item in searchResults" :key="item.title">{{ item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title }}</th>
                      <!-- {{ item[property].length > 50 ? item[property].slice(0, 50) + '...' : item[property] }} -->
                    </tr>
                  </thead>
                  <tbody>
                      <!-- Filter and display only the row where property is 'price' -->
                    <tr v-if="Object.keys(searchResults[0]).includes('price')" key="price">
                        <th scope="row">Price</th>
                      <td v-for="item in searchResults" :key="item.id">{{ item.price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!--the end of show scraped -->
        <!-- data graph thingy -->
        <!-- <div class="chart-container">
        <MyBarChart :chartData="chartData" :chartOptions="chartOptions1" />
       </div> -->
       <!-- <div class="chart-container">
        <MyBarChart :chartData="chartdata_pricerange" :chartOptions="chartOptions2" />
       </div> -->
        <!-- end of data graph -->
    </div>
  </div>

</template>


<script>
import axios from 'axios'
//--------------------graph visualization with vueslize yike---------------
// import MyBarChart from '@/components/chartfromvuechart.vue';

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
    // MyBarChart
  },
  data() {
    return {
      selectedChoice: null, // Store the selected choice value
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
      const path = 'http://localhost:5000/search/search_criteria'

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
          this.setupPriceData()
          this.fetchChartData()
        })
        .catch(error => {
          console.log("scraped error occurred!")
          console.log(error);
        });
    },

    fetchChartData() {
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
          this.chartData = response.data;
          console.log(this.chartData)
          this.formatChartData(this.chartdata)
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
        });
    },
        // Control Method
    executeSearchAndScrape() {
      // First, send the search input
      this.send_search_input();
      this.scrape();
    },
    formatChartData(data) {
      // Format the data to be compatible with chart.js
      this.chartData = {
        labels: data.labels, 
        datasets: [
          {
            label: 'Dataset Label',
            backgroundColor: '#42A5F5',
            data: data.values // Replace with your data values
          }
        ]
      }
    },
    setupPriceData() {
        if (Array.isArray(this.searchResults) == true) {
          const filteredResults = this.searchResults.filter(item => item !== null);
          this.chartdata_pricerange = {
            labels: filteredResults.map(item => String(item.title)),
            //labels: this.searchResults.map(item => item.title.length > 10 ? item.title.slice(0, 10) : item.title ), // Adding titles as labels for better visualization
            datasets: [
              {
                label: 'Price ($)',
                backgroundColor: '#42A5F5',
               // data: this.searchResults.map(item => item.price), 
                data: filteredResults.map(item => parseFloat(item.price.replace('$', ''))),
              },
            ],
          };
        } else {
          console.error('Error fetching price data');
        }
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
</style>