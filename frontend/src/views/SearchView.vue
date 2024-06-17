<template>
<form @submit.prevent="searchItems">
      <h2 for="search">Search:</h2>
      <input type="text" id="keyword" v-model="sendData">
      </form>
      <select>
        <option value="0" key="0" selected='true'>Do nothing~</option>
        <option value="1" key="1">Indoor Appliance</option>
        <option value="2" key="2">Outdoor Appliance</option>
        <option value="3" key="3">Electric Device</option>
      </select>
      <button type="submit" @click="send_search_input">Search</button>
      
    <!--select type dropdown-->
    <!-- <DropdownMenuMK1 menu-title="Vue Dropdown Menu" dark-mode="auto" class="centersomething">
      <section class="option">
      <button >This is button for method</button>
      <span class="desc">This is Vue dropdown menu method that says hello for you.</span>
      </section>
	</DropdownMenuMK1> -->

  <div>
      <div v-if="clickcount>0" >
        <h2>Search Results:</h2>
          
            <!--a lot of big table-->
            <div class="container">
            <div class="row">
              <!--First column-->
              <div class="col-12">
                <div id="app">
                            
                    <div>
                        output of search which are requirement
                        {{ receiveData }}
                        <!--first table-->
                        <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th v-for="item in searchResults_Sample" :key="item.id">
                                        {{ item.title }}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="property in Object.keys(searchResults_Sample[0])" :key="property">
                                        <th scope="row">{{ property }}</th>
                                        <td v-for="item in searchResults_Sample" :key="item.id">
                                        {{ item[property] }}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                    </div>
                  </div>
                </div>
              </div>	
            </div>
      </div>
  </div>
<!-- oh boy implement time-->

</template>
<script>
// import DropdownMenuMK1 from '@/components/vue-dropdown-menu.vue';
import axios from 'axios'
export default {
  data() {
    return {
      options:[ 
      {value: null, text: 'Please select an option'},
      {value: 1, text: 'Let Algorithm figure out'},
      {value: 2, text: 'Indoor Appliance'},
      {value: 3, text: 'Outdoor Appliance'},
      {value: 4, text: 'Electric Device'}
      ],
      clickcount: 0,
      showInfo: true,
      hasScroll: true,
      userInput: "",
      sendData:"",
      receiveData:"",
      searchResults_Sample: [
    {id:1, title:"Test1",description:"do you like",price:"1234",asin:"5125"},
    {id:2, title:"Test2",description:"watch vtuber",price:"1234",asin:"4214"},
    {id:3, title:"Test3",description:"while doing",price:"1231",asin:"1242"},
    {id:4, title:"Test4",description:"a final project?",price:"1234",asin:"6126"},
        ],
    };
  },
  // components:{ 
  //   DropdownMenuMK1
  // },
  computed: {
    filteredResults() {
      if (!this.userInput) return Object.keys(this.searchResults_Sample[0]);

      return Object.keys(this.searchResults_Sample[0]).filter(key =>
        key.toLowerCase().includes(this.userInput.toLowerCase())
      );
    },
      prependedText() {
      if (this.selectedOption === 0) {
        return ""; // No prepend text for default option
      } else if (this.selectedOption === 1) {
        return "Search for ";//send thing to method to send to backend and return result
      } else if (this.selectedOption === 2) {
        return "Indoor";
      } else if (this.selectedOption === 3) {
        return "Outdoor";
      } else if (this.selectedOption === 4) {
        return "HomeAppliance";
      } else {
        return ""; // Default for unexpected options
      }
    }
  },
  methods: {
    handleOptionChange() {
    console.log("Selected option:", this.selectedOption);
    // Perform actions based on the selected option here
  },
    send_search_input() {
      this.clickcount += 1
      console.log(this.clickcount)
      const path = 'http://localhost:5000/search'
      const loginData = {
        keyword: this.sendData,
      };
      if (this.keyword !== '' ) {
        //
        axios.post(path, loginData)
          .then(response => {
            this.receiveData = response.data
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        // Successful 
      } else {
        // Failed 
        this.errorMessage = 'please add information';
      }
    },
    getHighlightedText(text) {
      const regex = new RegExp(this.userInput, "gi"); // Case-insensitive global match
      return text.replace(regex, match => `<mark>${match}</mark>`);
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


</style>