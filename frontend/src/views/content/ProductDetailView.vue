<template>
  <div v-if="event">
    <h1>{{ event }}</h1>

  </div>
  <div v-else>
    <h1>Product Detail View</h1>
    <p>Product ID: {{ id }}</p>
    
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  props: ['id'],
  setup() {
    const GStore = inject('GStore');
    return { GStore };
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