<template>
  <html>
  <button @click="$router.push("/")" class="top-left-button">Go to Main Page</button>
<head>
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

.user-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  color: #2c3e50;
}

</style>
