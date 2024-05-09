<template>
<form @submit.prevent="searchItems">
      <h2 for="search">Search:</h2>
      <input type="text" id="keyword" v-model="sendData">
      <button type="submit" @click="send_search_input">Search</button>
    </form>
    <!--select type dropdown-->
    <DropdownMenuMK1 menu-title="Vue Dropdown Menu" dark-mode="auto" class="centersomething">
      <section class="option">
      <button >This is button for method</button>
      <span class="desc">This is Vue dropdown menu method that says hello for you.</span>
      </section>

	</DropdownMenuMK1>
  <div>
      <div>
        <h2>Search Results:</h2>
          
            <!--a lot of big table-->
            <div class="container">
            <div class="row">
              <!--First column-->
              <div class="col-12">
                <div id="app">
                            <!--first table-->
                    <div>
                        output of search which are requirement
                        {{ receiveData }}
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
import DropdownMenuMK1 from '@/components/vue-dropdown-menu.vue';
import axios from 'axios'
export default {
  data() {
    return {
      clickcount: 0,
      showInfo: true,
      hasScroll: true,
      sendData:"",
      receiveData:""
    };
  },
  components:{ 
    DropdownMenuMK1
  },
  methods: {
    send_search_input() {
      this.clickcount += 1
      console.log(this.clickcount)
      const path = 'http://localhost:5000/search'
      const loginData = {
        keyword: this.sendData,
      };
      if (this.keyword !== '' ) {
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

</style>