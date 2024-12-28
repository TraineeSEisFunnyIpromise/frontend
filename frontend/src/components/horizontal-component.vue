<template>
  <div class="horizontal-container">
    <div v-for="item in events" :key="item.id">
      <div>{{ item.id }}</div>
      <div>
        <router-link 
          class="event-link"
          :to="{ name: 'ProductDetailView', params: { id: item.id } }"
        >
        click here for more detail
        </router-link>
         
      </div>
    </div>
  </div>
</template>

<script>

import EventService from '@/services/EventService.js'

export default {
  props: {
    events: {
      type: Array,
      required: true
    },
    displayType: {
      type: String,
      default: 'flex',
      validator: (val) => ['flex', 'inline-flex'].includes(val)
    }
  },

  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: "404Resource",
            params: { resource: "event" },
          });
        } else {
          this.$router.push({ name: "NetworkError" });
        }
      });
  },

};
</script>
<style scoped>
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

.title {
  font-weight: bold;
  width: 80%; 
}

.price {
  color: #ffffff;
}
.event-link {
  color: #fff2c9;
  text-decoration: none;
}
</style>