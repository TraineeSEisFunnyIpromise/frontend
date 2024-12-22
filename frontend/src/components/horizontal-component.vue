<template>
  <div class="horizontal-container">
    <div v-for="item in searchResults" :key="item.id" @click="redirectToPage(item)">
      <div class="title">{{ item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title }}</div>
      <div class="price">{{ item.price }}</div>
      <!-- <eventcard  :key="item.id" @click="redirectToPage(item)" >
      click here for more detail
    </eventcard> -->
    </div>

  </div>

</template>

<script>
// import eventcard  from "@/components/EventCard.vue"
export default {
  props: {
    searchResults: {
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
    // eventcard
  },
  methods: {
    redirectToPage(item) {
      window.location.href = item.url;
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
</style>