<template>
  <div v-if="event">
    <h1>Product Detail View</h1>
    <p>Product ID: {{ id }}</p>

    <div>{{ event.title }}</div>
    <div>{{ event.price }}</div>

    <div>
      Opinion Chart

      <chart  />
       <chart />
  
    </div>
  </div>

    

</template>

<script>
import { inject } from 'vue';
import chart from '@/components/chartfromvuechart.vue';

export default {
  props: ['id'],
  data() {
    return {
      parsedChartData: null
    };
  },
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
    this.fetchEventData();
  },
  methods: {
    fetchEventData() {
      // Fetch event data and set this.event
      // Example:
      // this.event = { title: 'Sample Product', price: '$123.45' };

      // Parse the price data for the chart
      if (this.event && this.event.price) {
        this.parsedChartData = this.parsePriceData(this.event.price);
      }
    },
    parsePriceData(price) {
      // Assuming price is a string like "$123.45"
      // Remove the $ symbol and convert to a number
      return parseFloat(price.replace('$', ''));
    }
  }
};
</script>