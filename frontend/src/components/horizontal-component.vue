<template>
    <div class="horizontal-container" :style="{ display: displayType }">
      <div v-for="item in searchResults" :key="item.title" @click="redirectToPage(item)">
        {{ item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title }}
      </div>
    </div>
  </template>

<script>
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
  methods: {
    redirectToPage(item) {
      window.location.href = item.url;
    }
  }
};
</script>