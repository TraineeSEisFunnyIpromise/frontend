<template>
  <div v-if="event">
    <h1>Product Detail View</h1>
    <p>Product ID: {{ id }}</p>

    <div>{{ event.title }}</div>
    <div>{{ event.price }}</div>
    <div>{{ event }}</div>

    <div>
      Opinion Chart

      <!-- <chart :chartData="event" /> -->
       <chart />
  
    </div>
 

    

</template>

<script>
import { inject } from 'vue';
import chart from '@/components/chart.vue';

export default {
  props: ['id'],
  setup() {
    const GStore = inject('GStore');
    return { GStore };
  },
  components: {
    chart
  },
  computed: {
    event() {
      return this.GStore.event;
    }
  },
  created() {
    console.log("ProductDetailView created with ID:", this.id);
  }
};
</script>