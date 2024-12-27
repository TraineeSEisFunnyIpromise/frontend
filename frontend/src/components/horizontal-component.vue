<template>
  <div class="horizontal-container">
    <eventcard v-for="event in events" :key="event.id" >
    
    </eventcard>

  </div>

</template>

<script>
import eventcard  from "@/components/EventCard.vue"
// import EventService from '@/services/EventService.js'

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
  components: {
    eventcard
  },
  methods: {
    redirectToPage(item) {
      window.location.href = item.url;
    },
  },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
  //     .then((response) => {
  //       next((comp) => {
  //         comp.events = response.data

  //       })
  //     })
  //     .catch(() => {
  //       next({ name: 'NetworkError' })
  //     })
  // },
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
</style>