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
          <label for="info">Information about Yourself:</label>
          <input type="text" id="info" v-model="userinfo" required>
        </div>

        <div class="input-group">
          <label for="question">Question when forget password:</label>
          <input type="text" id="question" v-model="question_for_reset" required>
        </div>

        <div class="input-group">
          <label for="answer_for_password">Answer of the Question:</label>
          <input type="text" id="answer_for_password" v-model="answer_for_password" required>
        </div>

        <button type="submit">Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
         <p v-if="errorMessage != ''" style="color: red;">{{ errorMessage }}</p>
      <p v-if="successMessage != ''" style="color: green;">{{ successMessage }}</p>
      
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
      answer_for_reset: '',
      userinfo: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    register() {
      const path = 'http://localhost:5000/auth/register';
      const registerData = {
        username: this.username,
        password: this.password,
        answer_for_reset: this.answer_for_reset,
        question_for_reset: this.question_for_reset,
        userinfo: this.userinfo,
      };
      // Perform registration logic
      // Replace the following code with your own registration logic
      axios.post(path, registerData)
        .then(response => {
          console.log(response.data);
          this.errorMessage = ''; // Clear error message on successful registration
          if( response.message == "Username already exists"){
            console.log("server is got error in input")
            this.successMessage = 'username has already taken'
          }
          else{this.successMessage = 'Registration successful!';}
          // Redirect to login page or perform any other actions


        })
        .catch(error => {
          if(error.status == 500 || error.message == "Network Error"){
            console.log("server is not response")
          }
          else{
          this.errorMessage = "sorry some problem occured please try it again"+error.response.data.message;
          console.error(error);
         }
        }
      );
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
