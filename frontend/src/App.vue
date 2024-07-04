<template>
  <nav>
    <ul class="nav-left">
      <li class="box-for">
        <router-link :to="{ name: 'EventList' }" class="nav-link">
          Home
        </router-link>
      </li>
    </ul>
    <ul class="nav-right">
      <li><router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link></li>
      <li><router-link :to="{ name: 'Register' }" class="nav-link">Register</router-link></li>
      <li><router-link :to="{ name: 'Searchview' }" class="nav-link">Search</router-link></li>
      <li><router-link :to="{ name: 'Userinfo' }" class="nav-link">User Information</router-link></li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
import axios from 'axios';
export default {
  inject: ['GStore'],
  methods: {
    fetchUserInfo() {
      const path = 'http://localhost:5000/Userinfo';
      axios.get(path)
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
          this.name = response.data
          this.AboutMe = response.data
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  margin-right: auto;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
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


.box-for {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


</style>
