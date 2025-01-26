<template>
  <div v-if="event">
    <h1>Product Detail View</h1>
    <p>Product ID: {{ id }}</p>

    <div>{{ event.title }}</div>
    <div>{{ event.price }}</div>
    <div>{{ event.details }}</div>

    <div class="chart-containera" v-if="check_reviewscore != false">
      Opinion Chart
      <chart :chartData="chartData" :chartOptions="chartOptions" />
    </div>
    <div v-else>Chart of Review score is not available</div>


  </div>
  <div v-else>
    <p>inner data not found</p>
  </div>



</template>

<script>
import { inject } from 'vue';
import chart from '@/components/chartfromvuechart.vue';

export default {


  prop:['id'],

  data() {
  
    return {
      chartData: null,
      check_reviewscore:false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      }
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
  },
},
  created() {
    console.log("ProductDetailView created with ID:", this.id);
    this.fetchEventData();
  },
  methods: {
    fetchEventData() {
      // Fetch event data from GStore or an API
      const event = this.GStore.event
      if (event.review_rating) {
        this.event = event;
        if(event.review_rating){
          this.check_reviewscore = true
          this.chartData = this.parseOpinionData(event.review_rating);
        }
        else{
          this.check_reviewscore = false
        }
        
      } else {
        // Handle the case where the event is not found
        console.error("Event not found");
      }
    },
    parseOpinionData(opinion) {
      // Assuming price is a string like "$123.45"
      // Remove the $ symbol and convert to a number
      const parsedOpinion = parseFloat(opinion);
      return {
        labels: ['Opinion'], // You can customize the labels as needed
        datasets: [
          {
            label: '',
            data: [parsedOpinion],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  }
};
</script>

<style>
  .chart-containera{
    width: 200px;
    height: 400px;
    
  }
</style>