<template>
  <nav>
    <router-link :to="{ name: 'EventList' }">Home</router-link> |
    <router-link :to="{ name: 'about' }">About</router-link> |
    <router-link :to="{ name: 'AddEvent' }"> New Event</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  inject: ['GStore']
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
