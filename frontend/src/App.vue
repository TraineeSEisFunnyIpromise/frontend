<template>
  <nav>
    <ul class="nav-left">
      <li class="box-for">
        <router-link :to="{ name: 'Mainpage' }" class="nav-link">
          Home
        </router-link>
      </li>
    </ul>
    <ul class="nav-right">
      <li><router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link></li>
      <li><router-link :to="{ name: 'Register' }" class="nav-link">Register</router-link></li>
      <li><router-link :to="{ name: 'Searchview' }" class="nav-link">Search</router-link></li>
      <li class="user-dropdown">
        <img src="/frontend/src/assets/Login_Icon.jpg" alt="User Portrait" class="user-icon" @click="toggleDropdown" />
        <ul v-if="dropdownOpen" class="dropdown-menu">
          <li><router-link :to="{ name: 'Userinfo' }" class="nav-link">User Information</router-link></li>
        </ul>
      </li>
    </ul>
  </nav>
  <router-view />

  
</template>

<script>
import axios from 'axios';
export default {
  inject: ['GStore'],
  data() {
    return {
      dropdownOpen: false,
      role:'',
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    fetchUserInfo() {
      const path = 'http://localhost:5000/Userinfo';
      axios.get(path)
        .then(response => {
          // Handle successful login (store token?)
          console.log("getting user info")
          console.log(response.data);
          this.name = response.data;
          this.AboutMe = response.data;
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
          console.log("user not found")
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
  color: #9ea8b3;
  margin-top: 60px;
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

nav {
  background-color: #4d685f;
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
  align-items: center;
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

.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;
}

.dropdown-menu li {
  margin: 0;
  padding: 0.5rem 1rem;
}

.dropdown-menu li .nav-link {
  color: #2c3e50;
}

.dropdown-menu li .nav-link:hover {
  color: #7fc46e;
}
body{
  background-color: #394138;
}
</style>
