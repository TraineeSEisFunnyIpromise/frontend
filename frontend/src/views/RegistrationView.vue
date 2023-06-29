<template>
	<!-- register.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Registration Page</title>
</head>
<body>
  <div id="app">
    <h2>Registration</h2>
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
  </div>
</body>
</html>

</template>

<script>
import axios from 'axios';


export default {

// app.js
  methods: {
    register() {
      const path = 'http://localhost:5000/register'
      const registerData = {
        username: this.username,
        password: this.password
      };
      // Perform registration logic
      // Replace the following code with your own registration logic
      axios.post(path)
      if (this.username && this.password)  {
        axios.post(path, { data: registerData })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        // Successful login
        alert('Register successful');
      } else {
        // Failed login
        this.errorMessage = 'please add information';
      }
    }
  }
};

</script>
