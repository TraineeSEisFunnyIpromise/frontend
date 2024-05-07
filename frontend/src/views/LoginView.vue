<template>
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Login Page</title>
</head>
<body>
  <div id="app" class="login">
    <h2>Login</h2>
    <form @submit.prevent="login" class="">
      <!--Login neat-->
      <h5>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <br>
      </h5>
      <!--Password neat-->
      <h5>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      </h5>
      <button type="submit" onclick="login">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</body>
</html>

</template>
      
<script>
import axios from 'axios'
export default {
	name: 'HelloWorld',
	props: {
	msg: String,
	},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    methods: {
  login() {
    const path = 'http://localhost:5000/login';
    const loginData = {
      email: this.username,
      password: this.password,
    };

    axios.post(path, loginData)
      .then(response => {
                // Handle successful login (store token?)
                console.log(response.data);
                // You can store the JWT token in localStorage or Vuex for future requests
              })
              .catch(error => {
                console.error(error);
                this.errorMessage = 'Login failed!'; // Update error message
              });
          },
        },
      }
    }
      // app.js

      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      ul {
	list-style-type: none;
	padding: 0;
      }
      li {
	display: inline-block;
	margin: 0 10px;
      }
      a {
	color: #42b983;
      }
      .top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
}
body{
  background-color: rgba(255, 255, 255, 0) ;
}
      </style>
      