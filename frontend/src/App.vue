<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'EventList' }" class="nav-link">Home</router-link></li>
      <li><router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link></li>
      <li><router-link :to="{ name: 'Register' }" class="nav-link">Register</router-link></li>
      <li><router-link :to="{ name: 'Searchview' }" class="nav-link">Search</router-link></li>
      <li><router-link :to="{ name: 'CompareItemview' }" class="nav-link">Compare</router-link></li>
      <li><router-link :to="{ name: 'Userinfo' }" class="nav-link">User information</router-link></li>
    </ul>
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

.user-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  color: #2c3e50;
}

nav {
  background-color: #618076;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

li {
  margin: 0 1rem;
}

.nav-link {
  text-decoration: none;
  color: #99b6d4;
  font-weight: bold;
}

.nav-link:hover {
  color: #7fc46e;
}
</style>
