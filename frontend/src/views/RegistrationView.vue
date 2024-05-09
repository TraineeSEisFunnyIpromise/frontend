<template>
	<!-- register.html -->
<!DOCTYPE html>
<html>
<body>
  <div id="app">
    <h2>Registration</h2>
    <form @submit.prevent="register">
      <h5>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      </h5>

      <h5>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      </h5>

      <h5>
      <div>
        <label for="userinfo">information about anything:</label>
      </div>

      <input type="text" id="userinfo" v-model="userinfo" required>
      </h5>

      <button type="submit" @click="register">Register</button>
    </form>
<!--    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>-->
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
        password: this.password,
        userinfo: this.userinfo
      };
      // Perform registration logic
      // Replace the following code with your own registration logic
      if (this.username !== '' && this.password !=='' && this.userinfo !== '')  {
        axios.post(path, registerData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        // Successful login
      } else {
        // Failed login
        this.errorMessage = 'please add information';
      }
    }
  }
};

</script>

<style>
.top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>