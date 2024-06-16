<template>
  <!-- register.html -->
  <!DOCTYPE html>
  <html>

  <head>
    <title>Register Page</title>
  </head>

  <body>
    <div class="register">
      <h2>Registration</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>

        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <div class="input-group">
          <label for="userinfo">Information about Yourself:</label>
          <input type="text" id="userinfo" v-model="userinfo" required>
        </div>

        <div class="input-group">
          <label for="userinfo">Question when forget password:</label>
          <input type="text" id="userinfo" v-model="userinfo" required>
        </div>

        <div class="input-group">
          <label for="userinfo">Answer of the Question:</label>
          <input type="text" id="userinfo" v-model="userinfo" required>
        </div>

        <button type="submit">Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <!--    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>-->
    </div>
  </body>

  </html>
</template>

<script>
import axios from 'axios';
// app.js
export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      userinfo: '',
      errorMessage: ''
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      const path = 'http://localhost:5000/register';
      const registerData = {
        username: this.username,
        password: this.password,
        dateOfBirth: this.dateOfBirth,
        userinfo: this.userinfo
      };
      // Perform registration logic
      // Replace the following code with your own registration logic
      axios.post(path, registerData)
        .then(response => {
          console.log(response.data);
          this.errorMessage = ''; // Clear error message on successful registration
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'Registration failed. Please try again.';
        });
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.register h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: calc(100% - 20px);
  padding: 8px 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #57b498;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
}

button:hover {
  background-color: #36532e;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
