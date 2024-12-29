<template>
  <!-- search input section --> 
    <form @submit.prevent="executeSearchAndScrape">
      <div class="inputtext" for="search">Search Product</div>
      <input type="text" id="searchData" v-model="searchData" required>
  
      <div class="inputtext" for="groupsearch">Group target</div>
      <input type="text" id="usertargetData" v-model="usertargetData">
    </form>
  
    <div style="padding-top: 10px;">
      <button type="submit" @click="executeSearchAndScrape" @click.stop="isLoading_scrape != true">Click here to make magic</button>
    </div> 
  
  <!-- result section --> 
        <!--         criteria section                       -->
    <div class="colored-box-display" style=" text-align: center;">
      <div v-if="receiveData == ''">result will display here</div>
      <div id="loader_criteria" v-if="isLoading_scrape_criteria == true">
              creating criteria...
      </div>
  
  
  
      <div v-if="badcriteria == true " style="text-emphasis-color: red;"> 
        sorry seem we got an error at creating criteria and search please try again
      </div>
  
        <div v-if="receiveData != '' && receiveData != null ">        
          <div> 
            <div>Selected criteria: {{ selectedItems }}</div>
            <div v-for="item in receiveData" :key="item">
              <input type="checkbox" :id="item" :value="item" v-model="checkedItems" />
              <a :for="item">{{ item }}</a>
            </div>
          </div>
  
          <!--      a fancy select box            -->
          <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
          <a>{{ datastore }}</a>
  
  
    <!--criteria display section     -->
  
      <!-- this part check if receive data or not if not data not show -->
  
  
      <!--         search section                       -->
  
          <div v-if="isLoading_scrape == true">
              Scraping Data...
            </div>
            <div class="container" v-if="searchResults == '' && searchResults == null" >
              error occured in the scrape section
            </div>
  
            <div class="container" v-if="searchResults != '' && searchResults != null" >
              <div class="row">
                <div class="col-12">
                  <div id="app">
                      <thead>
                        <!-- <horizontalcomponent :searchResults="searchResults" /> -->
                        <horizontalcomponent :events="searchResults" />
                      </thead>
                  </div>
                </div>
              </div>
            </div>
  
            <div>
              <!-- highlightText -->
               <div>Text Matching</div>
              <div class="horizontal-container" v-if=" selectedItems != null && selectedItems != ''" >
                          <div class="text-container" scope="col" 
                        v-for="item in searchResults" :key="item.title" >
                        <span>
                        {{ highlightText(item.title.length > 50 ? item.title.slice(0, 10) + '...' : item.title, selectedItems) }}
                        </span>
                        <span v-html="highlightText(item.price.toString(), selectedItems)"></span>
                        </div>
              </div>
            </div>
            
  
            <!--the end of show scraped -->
  
            <!-- data graph price -->
            <div v-if="isLoadingprice == true">
              Loading Chart Price...
            </div>
            <div v-if="isLoadingprice == false">
              <div class="chart-container" v-if="chartdata_pricerange != null && chartdata_pricerange != ''">
              <MyBarChart :chartData="chartdata_pricerange"  />
              </div>
            </div>
  
  
          <!-- data graph criteria -->
          <div v-if="isLoading">
              Loading Chart criteria...
            </div>
            <div class="chart-container" >
              <div v-if="chartdata_criteria != null">
                <MyBarChart :chartData="chartdata_criteria" />
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

  import { inject } from 'vue';
  // import express from 'express' <- this create 28 error which im not gonna fix that again 
  //---------------------funny part---------------------------
  //-----------yup CORS is nice--------------
  
  //----------another funny and long part---------------
  export default {
    setup() {
    const GStore = inject('GStore');
    return { GStore };
  },
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
        isLoadingprice: false,
        isLoading_scrape: false,
        isLoading_scrape_criteria: false,
        oldsearchData:"",
        old_user_target:"",
        badcriteria:false,
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
        if (this.searchData !== '' || this.usertargetData !== '' ) {
  
          //funni stuff CORS and CONTENT thingy
          console.log("search sent")
          const sending = [this.searchData,this.usertargetData]
          axios.post(path, sending,{headers: {
        'Content-Type': 'application/json'  // Set the correct Content-Type header
        }
      })
            .then(response => {
              this.isLoading_scrape_criteria = false
              console.log("criteria list")
              if(this.receiveData != 'invalid' || this.receiveData == null || this.receiveData == ['Invalid']){
                this.receiveData =  response.data
              }
              else{
                this.badcriteria = true
              }
              console.log("receive data");
  
            })
            .catch(error => {
            this.isLoading_scrape_criteria = false
            this.userInput= this.selected + this.sendData
  
            console.log(error);
            });
          // Successful 
        } else {
          // Failed
          this.isLoading_scrape_criteria = false
          this.badscrape = ''
          console.log("please add information");
          
        }
      },
  
      scrape() {
        console.log("scrape tringerred")
        
        const sending = [this.searchData,this.usertargetData];
        // const path = 'http://localhost:5000/search/scrape'
        const path = 'http://localhost:5000/search/scrape_test'
        if (this.searchData !== ''){
          axios.post(path,sending,
        {
        //   headers: {
        // 'Content-Type': 'application/json',  // Set the correct Content-Type header
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'POST',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // } 
      })
          .then(response => {
            console.log("sending to scrape");
            this.searchResults = JSON.parse(JSON.stringify(response.data));
            this.isLoading_scrape = false
            console.log("replaced search result, doing price chart")
            this.setupPriceData(this.searchResults)
            console.log("fetch chartdata")
            this.fetchChartData()
          })
          .catch(error => {
            console.log("scraped error occurred!")
            console.log(error);
            this.badscrape = "scrape got problem "+ error
            if (error == "AxiosError: Network Error") {
              this.badscrape = "backend server is not working"
            }
            alert(this.badscrape)
            this.oldsearchData = ''
            this.old_user_target = ''
          });
        }
        else{
          alert("scrape is not work try again")
          this.oldsearchData = ''
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
        this.isLoading_scrape_criteria = true // literally make loader appear
        if(this.searchData!=''){// if no search or first time search
          if(this.searchData == this.oldsearchData ){ // if the search keyword is matched
            console.log("use old data")
              this.send_search_input()
  
            }
          else{//if the old search keyword is not
          this.oldsearchData = this.searchData

          this.isLoading_scrape = false
          this.send_search_input();
          this.scrape();
        }
        }
        else{
          alert("the input must not be empty")
        }
  
  
      },
      formatChartData(data_receive) {
        console.log("doing chart criteria data")
        if (data_receive != '') {
        const filteredResults = JSON.parse(data_receive);
        this.isLoading = true
      // Extract labels and scores using map
        const labels = filteredResults.map(item => item.Label);
        const scores = filteredResults.map(item => item.Score);
  
  
        this.chartdata_criteria = {
          labels: labels,
          datasets: [
            {
              // label: labels,
              backgroundColor: '#42A5F5',
              data: scores,
            },
          ],
        };
  
          this.isLoading = false
        }else{
          console.log("bad stuff in data")
          this.isLoading = false
        }
  },
      setupPriceData(result_target) {
        this.isLoading1 = true;
        //const jsonifieddata = JSON.stringify(JSON.parse(result_target),null,2)
        console.log("result target display")
  
        const jsonifieddata = JSON.parse(JSON.stringify(result_target))
        console.log("jsonified display")
  
  
      if (jsonifieddata!= '') {
          const filteredResults = jsonifieddata.map(item => item.price);
          
          // console.log(filteredResults); // Log the filtered results
  
          this.chartdata_pricerange = {
            labels: jsonifieddata.map(item => item.title || "Default Value"),
            datasets: [
                  {
                    backgroundColor: '#42A5F5',
                    data: filteredResults
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
         
      } else {
        this.isLoading1 = false;
        console.error('Error fetching price data');
      }
      },
      highlightText(text, criteria) {
        const regex = new RegExp(criteria.join('|'), 'gi'); // Join criteria for multiple matches
  
        return text.replace(regex, `<mark> </mark>`);
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