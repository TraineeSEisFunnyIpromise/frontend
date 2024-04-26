<template>
<form @submit.prevent="searchItems">
      <h2 for="search">Search:</h2>
      <input type="text" id="keyword" v-model="sendData">
      <button type="submit" @click="search">Search</button>
    </form>
    <!--select type dropdown-->
    <DropdownMenuMK2 menu-title="Option for seaching" dark-mode="auto" class="centersomething" style="left: 30%; top: 12%;">
      <section class="column">
      <button> choice 1</button>
      <h3>this choice did something</h3>
      </section>
      <section class="column">
      <button> choice 2</button>
      <h3>this choice is did something but more detail</h3>
      </section>
      <section class="column">
      <button> choice 3</button>
      <h3>this choice have no idea what are they doing</h3>
      </section>
      <section class="column">
      <button> choice 4</button>
      <h3>magic</h3>
      </section>



	</DropdownMenuMK2>
  <div v-if="clickcount > 0">
      <div>
        <h2>Search Results:</h2>
          
            <!--a lot of big table-->
            <div class="container">
            <div class="row">
              <!--First column-->
              <div class="col-12">
                <div id="app">
                            <!--first table-->
                    <table class="table" id="first-app" v-for="item in searchResults_Sample" :key="item" >
                      <thead style="background-color: beige;">
                        <tr>
                          <th scope="col">#Item Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" class="Pictureset"></th>
                          <td>name</td>
                        </tr>
                        <tr>
                          <th scope="row" class="Pictureset"></th>
                          <td>details</td>
                        </tr>
                        <tr>
                          <th scope="row" class="Pictureset"></th>
                          <td>brand</td>
                        </tr>
                        <tr>
                          <th scope="row" class="Pictureset"></th>
                          <td>Price</td>
                        </tr>
                        <tr>
                          <th scope="row" class="Pictureset"></th>
                          <td>Object type</td>
                        </tr>
                        <tr>
                          <th scope="row" id="targetHighlighted"></th>
                          <td>search keyword</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>	
            </div>
      </div>
  </div>
<!-- oh boy implement time-->

</template>
<script>
import DropdownMenuMK2 from '@/components/vue-dropdown-menu-choice.vue';
import axios from 'axios'
export default {
  sendData(){
    return{
      sendData:"",
    }
  },
  data() {
    return {
      searchDataSample: "Car",
      searchResults_Sample: {
        something:["Kirine","Kirin"],
        gayis:["Is","Are"],
        idkman:["A Giraffe","Giraffe queen"],
      },
      searchResults:{
        something1:["Kirine","Kirin"],
        gayis1:["Is","Are"],
        idkman1:["A Giraffe","Giraffe queen"]},
      clickcount: 0,
      showInfo: true,
      hasScroll: true
    };
  },
  components:{ 
    DropdownMenuMK2
  },
  methods: {
    search() {
      this.clickcount += 1
      console.log(this.clickcount)
      const path = 'http://localhost:5000/search'
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

.column{
  .column {
  float: left;
  width: 33.33%;
  padding: 50px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
  color: white;
}
}
</style>