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
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              @input="UsernameCheck" 
            />
            <span v-if="errorUsername != null">{{ errorUsername }}</span>
          </div>

        <div class="input-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              @input="PasswordCheck" 
            />
            <span v-if="errorPassword != null">{{ errorPassword }}</span>
          </div>

        <div class="input-group">
          <label for="info">Information about Yourself:</label>
          <input type="text" id="info" v-model="userinfo" >
        </div>

        <div class="input-group">
          <label for="question">Question when forget password:</label>
          <input 
              type="text" 
              id="question" 
              v-model="question_for_reset" 
              @input="QuestionCheck" 
            />
            <span v-if="errorquestion != null">{{ errorquestion }}</span>
        </div>

        <div class="input-group">
          <label for="answer_for_password">Answer of the Question:</label>
          <input 
              type="text" 
              id="question" 
              v-model="answer_for_reset" 
              @input="AnswerCheck" 
            />
            <span v-if="erroranswer != null">{{ erroranswer }}</span>
        </div>
        <div v-if="isloading == true">sending information...</div>

        <button type="submit">Register</button>
        <p v-if="errorMessage!= null" class="error-message">{{ errorMessage }}</p>
      </form>

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
      isloading:false,
      errorusername:'',
      errorpassword:'',
      errorquestion:'',
      erroranswer:'',
    };
  },

  methods: {
    register() {
      this.isloading = true
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
          console.log(response.data.message);
          this.errorMessage = ''; // Clear error message on successful registration
          if( response.data.message == "Username already exists"){
            this.errorMessage = 'username has already taken'
            this.isloading = false
          }
          else{
          this.successMessage = 'Registration successful!';
          this.isloading = false
          setTimeout(() => {
          this.$router.push('login')
            }, 3000);
          }
        })
        .catch(error => {
          if(error.message == "server is not response" || error.message == "Network Error"){
            this.errorMessage = "sorry some problem occured in server";
            this.isloading = false
          }
          else{
          this.errorMessage = "sorry some problem occured please try it again"+error.response.data.message;
          console.error(error);
          this.isloading = false
         }
        }
      );
    },
    UsernameCheck() {
        if (this.username.trim() === '') {
          this.errorUsername = 'Username is required.';
          this.clearAllErrorMessage();
        } else if (this.username.length > 255) { 
          this.errorUsername = 'Username exceeds maximum length.';
          this.clearAllErrorMessage();
        } else if (!/^[a-zA-Z0-9_.-]+$/.test(this.username)) { 
          this.errorUsername = 'Invalid characters in username.'; 
          this.clearAllErrorMessage();
        } else {
          this.errorUsername = null; 
        }
      },

      PasswordCheck() {
        if (this.password.trim() === '') {
          this.errorPassword = 'Password is required.';
          this.clearAllErrorMessage();
        } else if (this.password.length < 8) { 
          this.errorPassword = 'Password must be at least 8 characters long.'; 
          this.clearAllErrorMessage();
        }
        else if (!/^[a-zA-Z0-9_.-]+$/.test(this.password)) { 
          this.errorPassword = 'Invalid characters in password.'; 
          this.clearAllErrorMessage();
        } else if(this.password.length > 255) { 
          this.errorPassword = 'Exceed character limit.'; 
          this.clearAllErrorMessage();
        }
        else{
          this.errorPassword = null; 
        }
      },
      AnswerCheck(){
        if (this.answer_for_reset.trim() === '') {
          this.erroranswer = 'Answer for reset password is required.';
          this.clearAllErrorMessage();
        }
        else if (!/^[a-zA-Z0-9_.-]+$/.test(this.answer_for_reset)) { 
          this.erroranswer = 'Invalid characters in answer.'; 
          this.clearAllErrorMessage();
        } 
        else if(this.answer_for_reset.length > 255) { 
          this.errorPassword = 'Exceed character limit.'; 
          this.clearAllErrorMessage();
        }
        else {
          this.erroranswer = null; 
        }
    },
    QuestionCheck(){
      if (this.question_for_reset.trim() === '') {
          this.errorquestion = 'Question for reset password is required.';
          this.clearAllErrorMessage();
        }
        else if (!/^[a-zA-Z0-9_.-]+$/.test(this.username)) { 
          this.erroranswer = 'Invalid characters in question.'; 
          this.clearAllErrorMessage();
        } 
        else if(this.question_for_reset.length > 255) { 
          this.errorPassword = 'Exceed character limit.'; 
          this.clearAllErrorMessage();
        }
        else {
          this.errorquestion = null; 
        }
        
    },
    clearAllErrorMessage() {
    setTimeout(() => {
    this.errorusername = null;
    this.errorpassword = null; 
    this.erroranswer = null;
    this.errorquestion = null; 
      }, 3000); 
},
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
