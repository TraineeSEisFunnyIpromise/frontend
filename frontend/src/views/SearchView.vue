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
          <label :for="item">{{ item }}</label>
        </div>
      </div>

      <!-- a fancy select box -->
      <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
      <div>{{ datastore }}</div>

      <!-- A funni table of content -->
      <!-- this part check if receive data or not if not data not show -->

        <div class="container" v-if="searchResults != ''" >
          <div class="row">
            <div class="col-12">
              <div id="app">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">prod title</th>
                      <th v-for="item in searchResults" :key="item.title">{{ item.title }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="property in Object.keys(searchResults[0])" :key="property">
                      <th scope="row">{{ property }}</th>
                      <td v-for="item in searchResults" :key="item.id">{{ item[property] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


    </div>
  </div>
</template>


<script>
// import DropdownMenuMK1 from '@/components/vue-dropdown-menu.vue';
import axios from 'axios'
export default {
  props: {
    choices: {
      type: Array,
      required: true,
    },
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
      searchResultstest: [],//receive data scrape result
      items: [],//idk?
      checkedItems: [],//????
      selectedItems:[],//what?
      userInput:''// before send to backend input
      
    };
  },
  // components:{ 
  //   DropdownMenuMK1
  // },
  // computed: {
  //   filteredResults() {
  //     if (!this.userInput) return Object.keys(this.searchResults);

  //     return Object.keys(this.searchResults).filter(key =>
  //       key.toLowerCase().includes(this.userInput.toLowerCase())
  //     );
  //   },
  // },
  watch: {
    checkedItems(newValue) {
      this.selectedItems = newValue;
    }
  },
  methods: {
    send_search_input() {
      console.log("searchtringerred")
      const path = 'http://localhost:5000/search/search_criteria'
      // this.userInput=  this.searchData + this.usertargetData

      //an entire stuff happen below here also this is might be the worst refactor i have ever done
      if (this.searchData !== '' ) {
        console.log(this.userInput)
        //funni stuff CORS and CONTENT thingy
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
      const path = 'http://localhost:5000/search/search_prod';
      const sending = [this.searchData,this.usertargetData]
      axios.post(path,sending,
      {headers: {
      'Content-Type': 'application/json'  // Set the correct Content-Type header
      }
    })
        .then(response => {
          console.log("sending to scrape");
          console.log(response.data);
          this.searchResults = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
        // Control Method
    executeSearchAndScrape() {
      // First, send the search input
      this.send_search_input();
      // you can trigger the scrape method.
      this.scrape();
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


.container {
  max-width: 768px;
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

</style>