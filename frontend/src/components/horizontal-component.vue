<template>
  <div class="horizontal-container">
    <div v-for="item in events" :key="item.id">
      <div>{{ item.title }}</div>
      <div v-if="item.description">
        <a @click.prevent="navigateToDetail(item)" class="event-link">
          click here for more detail
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import EventService from '@/services/EventService.js';

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
  setup() {
    const GStore = inject('GStore');
    return { GStore };
  },
  methods: {
    navigateToDetail(item) {
      console.log("Navigating to detail for event ID:", item.id);
      // Set event data in GStore before navigating
      this.GStore.event = item;
      console.log("Navigating to ProductDetailView with ID:", item.id);
      this.$router.push({ name: 'ProductDetailView', params: { id: item.id } });
    },
    navigateTomain() {
     
      // Fetch event data and set it in GStore before navigating
      EventService.getMain()
        .then(response => {
          console.log("Event data fetched successfully:", response.data);
          this.GStore.event = response.data;
         
          this.$router.push({ name: 'Mainpage'});
        })
        .catch(error => {
          console.error("Error fetching event data:", error);
          if (error.response && error.response.status == 404) {
            this.$router.push({
              name: '404Resource',
              params: { resource: 'event' }
            });
          } else {
            this.$router.push({ name: 'NetworkError' });
          }
        });

        
    }
  }
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