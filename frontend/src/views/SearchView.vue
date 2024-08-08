<template>

<form @submit.prevent="searchItems">
      <h2 for="search">Search:</h2>
      <input type="text" id="userInput" v-model="sendData">


</form>
      
    <button type="submit" @click="send_search_test">Search your electric's criteria</button>
      
    <!--select type dropdown-->
    <!-- <DropdownMenuMK1 menu-title="Vue Dropdown Menu" dark-mode="auto" class="centersomething">
      <section class="option">
      <button >This is button for method</button>
      <span class="desc">This is Vue dropdown menu method that says hello for you.</span>
      </section>
	</DropdownMenuMK1> -->


  <div>
      <div v-if="clickcount>0" >
        <h2>Search Results :</h2>
          
              <!--First column-->
              <div class="col-12">
                    <div>
                        output of search which are requirement : 
                        {{ receiveData }}      
                    </div>
                    <div>
                      input of Search : 
                        {{ userInput }} 
                    </div>
                  </div>
                  
              <!--row 1-->
                <div>
                  <!--a lot of big table-->
                  <div>
                                          <div>Selected names: {{ selectedItems }}</div>
                                              <div v-for="item in items" :key="item">
                                                <input type="checkbox" :id="item" :value="item" v-model="checkedItems" />
                                              <label :for="item">{{ item }}</label>
                                            </div>
                                           </div>
                  <div class="container">
                          <div class="row">
                            <!--First column-->
                              <div class="col-12">
                                <div id="app">
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
                      <div>something</div>
                      <input
                        type="checkbox"
                        v-model="toggle"
                        true-value="yes"
                        false-value="no" />
                      <div>{{ datastore }}</div>
                    </div>
                  </div>
              </div>
            <!-- oh boy implement time-->
                </div>
      
      </div>
  </div>
<!-- oh boy implement time-->

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
      clickcount: 0,
      showInfo: true,
      hasScroll: true,
      sendData:'',
      receiveData:"no response",
      searchResults_Sample: [
    {id:1, title:"Test1",description:["front end criterialist1","criterialist2","criterialist3"],price:"1234",asin:"5125"},
    {id:2, title:"Test2",description:["front end criterialist1","criterialist2","criterialist3"],price:"1234",asin:"4214"},
    {id:3, title:"Test3",description:["front end criterialist1","criterialist2","criterialist3"],price:"1231",asin:"1242"},
    {id:4, title:"Test4",description:["front end criterialist1","criterialist2","criterialist3"],price:"1234",asin:"6126"},
        ],
        selected:'',
        items: ['test1','test2'],
        checkedItems: [],
        selectedItems:[],
        userInput:''
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
  },
  watch: {
    checkedItems(newValue) {
      this.selectedItems = newValue;
    }
  },
  methods: {
    send_search_input() {
      const path = 'http://localhost:5000/search/search'
      this.userInput= this.selectedItems + this.sendData
      if (this.userInput !== '' ) {
        this.clickcount += 1
        //
        console.log(this.userInput)
        axios.post(path, this.userInput)
          .then(response => {
            this.receiveData =  this.selected + response.data
            console.log(response.data);
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
    send_search_test() {
      const path = 'http://localhost:5000/search/search_criteria_test'
      if (this.yeet !== '' ) {
        this.clickcount += 1
        axios.post(path)
          .then(response => {
            this.receiveData = response.data
            console.log(response.data);
          })
          .catch(error => {
          this.userInput= this.sendData
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
    compare_test() {
	const path = 'http://localhost:5000/compare'
			axios.post(path)
				.then(response => {
						console.log(response.data);
						this.datastore = response
				})
				.catch(error => {
						console.log(error);
				});
		// Successful login

		},
		compare() {
	const path = 'http://localhost:5000/compare_test'
	const loginData = {
		keyword: this.sendData,
	};
		if (this.keyword !== '' ) {
				axios.post(path, loginData)
					.then(response => {
						console.log(response.data);
					})
					.catch(error => {
						console.log(error);
					});
			// Successful login
			} else {
			// Failed login
			this.errorMessage = 'please add information';
			}
		},
    // getHighlightedText(text) {
    //   const regex = new RegExp(this.userInput, "gi"); // Case-insensitive global match
    //   return text.replace(regex, match => `<mark>${match}</mark>`);
    // },
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