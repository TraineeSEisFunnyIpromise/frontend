<template>

<div>Selected: {{ selected }}</div>
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<form @submit.prevent="searchItems">
      <h2 for="search">Search:</h2>
      <input type="text" id="userInput" v-model="sendData">


</form>
      
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
      userInput: '',
      sendData:"",
      receiveData:"no response",
      searchResults_Sample: [
    {id:1, title:"Test1",description:"do you like",price:"1234",asin:"5125"},
    {id:2, title:"Test2",description:"watch vtuber",price:"1234",asin:"4214"},
    {id:3, title:"Test3",description:"while doing",price:"1231",asin:"1242"},
    {id:4, title:"Test4",description:"a final project?",price:"1234",asin:"6126"},
        ],
        selected:'',
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
  methods: {
    send_search_input() {
      const path = 'http://localhost:5000/search'
      this.userInput= this.selected + this.sendData
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