<template>
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Login Page</title>
</head>
<body>
  <div id="app">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit" >Login</button>
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
    login() {
      const path = 'http://localhost:5000/login'
      const loginData = {
        username: this.username,
        password: this.password
      };
      if (this.username !== '' && this.password !== '') {
        axios.post(path, loginData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        // Successful login
      } else {
        // Failed login
        this.errorMessage = 'please add information';
      }
    },
    
    
  }
      }
      // app.js

      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      h2 {
	margin: 40px 0 0;
  margin-left: 800px;
  margin-right: 800px;
  background-color: rgb(122, 88, 42);
  color: aliceblue;
      }
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
      form {
        margin-left: 800px;
        margin-right: 800px;
        background-color: blanchedalmond;
      }
      </style>
      