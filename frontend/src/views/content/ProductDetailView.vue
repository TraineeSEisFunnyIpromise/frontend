<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>