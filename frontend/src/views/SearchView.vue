<template>
<form @submit.prevent="searchItems">
      <h2 for="search">Search:</h2>
      <input type="text" id="keyword" v-model="sendData">
      <button type="submit">Search</button>
    </form>
    <div v-if="searchResults.length > 0">
      <h2>Search Results:</h2>
    </div>
    <div v-else>
      <p>No search results found.</p>
    </div>

<!-- oh boy implement time-->

<div class="container">
  <div class="row">
    <div class="col-12">
      <div id="app">
        <div class="mt-4" v-if="hasScroll">Scroll on the table</div>
        <div class="mt-4" v-else>Resize your window until a scrollbar appears</div>
        <div class="table-holder  mt-4" @wheel.prevent="wheelHorizontal($event)">
          <div class="info" v-if="hasScroll" @touchmove.prevent="scrollHorizontal($event)" :class="{'show' : showInfo}">Scroll for more &rarr;</div>
          <div class="table-responsive" ref="table" @scroll.prevent="scrollHorizontal($event)">

            <table class="table" v-for="item in searchDataSample" :key="item" >
              <thead>
                <tr>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" class="Pictureset"></th>
                  <td>Cell</td>

                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>Cell</td>

                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td>Cell</td>

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
import axios from 'axios'
export default {
  data() {
    return {
      sendData:"",
      searchDataSample: "Car",
      searchResults_Sample: {
        something:[],
        gayis:[],
        idkman:[]
      },
      searchResults:{},
      showInfo: true,
      hasScroll: true
    };
  },
  methods: {
    search() {
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
    wheelHorizontal: function(e) {
      if (e.deltaY < 0) {
        this.$refs.table.scrollLeft = this.$refs.table.scrollLeft - 50
      } else {
        this.$refs.table.scrollLeft = this.$refs.table.scrollLeft + 50
      }
    },
    scrollHorizontal: function() {
      if (this.$refs.table.scrollLeft > 0) {
        this.showInfo = false;
      }
      if (this.$refs.table.scrollLeft == 0) {
        this.showInfo = true;
      }
    },
  },
  mounted: function() {
    let app = this;
    let table = this.$refs.table;
    function verifyScroll() {
      if (table.scrollWidth-60 > table.clientWidth) {
        app.hasScroll = true;
      } else {
        app.hasScroll = false;
      }
    }
    verifyScroll();
    window.addEventListener('resize', verifyScroll);
  }
};
</script>
<style>
.top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
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