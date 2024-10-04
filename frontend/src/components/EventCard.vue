<template>
  <router-link
    class="event-link"
    :to="{ name: 'ProductDetailView', params: { id: event.id } }"
  >
    <div class="event-card">
      <span class="title">{{ item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title }}</span>
      <span class="price">{{ item.price }}</span>
      <span class="rating"> {{ item.rating }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.event-card 
 {
  display: flex; /* Make the card flexbox container */
  align-items: center; /* Align content vertically in the center */
  padding: 20px;
  width: 100%; /* Remove fixed width, adjust based on desired width */
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-time {
  flex: 1; /* Allow remaining space for title and details */
  margin-right: 20px; /* Add margin for spacing */
}

.event-details {
  display: flex; /* Make details a flexbox container */
  align-items: center; /* Align content vertically in the center */
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>