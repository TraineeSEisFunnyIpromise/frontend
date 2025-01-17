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
              @focus="showTableUsername = true" 
            @blur="showTableUsername = false" 
            />
            <span v-if="errorusername != null">{{ errorusername }}</span>
          </div>

          <table v-if="showTableUsername" class="table">
            <thead>
              <tr>
                <th>something something relate to the requirement for username</th>
                </tr>
            </thead>
            <tbody>
              </tbody>
          </table>

        <div class="input-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              @focus="showTablePassword = true" 
              @blur="showTablePassword = false" 
            />
            <span v-if="errorpassword != null">{{ errorpassword }}</span>
          </div>

          <table v-if="showTablePassword" class="table">
            <thead>
              <tr>
                <th>something something relate to the requirement for password</th>
                </tr>
            </thead>
            <tbody>
              </tbody>
          </table>


        <div class="input-group">
          <label for="info">Information about Yourself:</label>
          <input type="text" id="info" v-model="userinfo" >
        </div>

        <table v-if="showTableQA" class="table">
            <thead>
              <tr>
                <th>something something relate to the requirement for question and answer</th>
                </tr>
            </thead>
            <tbody>
              </tbody>
          </table>

        <div class="input-group">
          <label for="question_for_password">Question when forget password:</label>
          <input 
              type="text" 
              id="question" 
              v-model="question_for_reset" 
              @focus="showTableQA = true" 
              @blur="showTableQA = false" 
            />
            <span v-if="errorquestion != null">{{ errorquestion }}</span>
        </div>

        <div class="input-group">
          <label for="answer_for_password">Answer of the Question:</label>
          <input 
              type="text" 
              id="answer" 
              v-model="answer_for_reset" 
              @focus="showTableQA = true" 
              @blur="showTableQA = false" 
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
      question_for_reset: '',
      userinfo: '',
      errorMessage: '',
      successMessage: '',
      isloading:false,
      errorusername:'',
      errorpassword:'',
      errorquestion:'',
      erroranswer:'',
      showTable:false,
      showTablePassword:false,
      showTableQA:false,
      showTableUsername:false,
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
      console.log(this.UsernameCheck() )
      console.log(this.PasswordCheck() )
      console.log(this.AnswerCheck() )
      console.log(this.QuestionCheck() )

      if((this.UsernameCheck() && this.PasswordCheck() && this.AnswerCheck() && this.QuestionCheck())===true)
      {
        this.isloading = true
        axios.post(path, registerData)
        .then(response => {
          console.log(response.data);
          console.log(response.data.message);
          this.errorMessage = ''; // Clear error message on successful registration
          if( response.data.message == "Username already exists"){
            this.errorMessage = 'username has been already taken'
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
            this.errorMessage = "Registration unsuccessful";
            this.isloading = false
          }
          else{
          this.errorMessage = "Registration unsuccessful"+error.response.data.message;
          console.error(error);
          this.isloading = false
         }
        }
      );
      }

    },
    UsernameCheck() {
        if (this.username.trim() === '' || this.username === null) {
          this.errorusername = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        } else if (this.username.length > 255) { 
          this.errorusername = 'please fill in the correct username format.';
          this.clearAllErrorMessage();
          return false
        } else if (!/^[a-zA-Z0-9_.-]+$/.test(this.username)) { 
          this.errorusername = 'please fill in the correct username format.'; 
          this.clearAllErrorMessage();
          return false
        } else {
          this.errorusername = null; 
          return true
        }
      },

      PasswordCheck() {
        if (this.password.trim() === '' || this.password === null) {
          this.errorpassword = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        } else if (this.password.length < 4) { 
          this.errorpassword = 'please fill in the correct password format.'; 
          this.clearAllErrorMessage();
          return false
        }
        else if (!/^[a-zA-Z0-9_.-]+$/.test(this.password)) { 
          this.errorpassword = 'please fill in the correct password format.'; 
          this.clearAllErrorMessage();
          return false
        } else if(this.password.length > 255) { 
          this.errorpassword = 'please fill in the correct password format.'; 
          this.clearAllErrorMessage();
          return false
        }
        else{
          this.errorpassword = null; 
          return true
        }
      },
      AnswerCheck(){
        if (this.answer_for_reset.trim() === '' || this.answer_for_reset === null) {
          this.erroranswer = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        }
        else if (!/^[a-zA-Z0-9_.-]+$/.test(this.answer_for_reset)) { 
          this.erroranswer = 'please fill in the correct password recovery question format.'; 
          this.clearAllErrorMessage();
          return false
        } 
        else if(this.answer_for_reset.length > 255) { 
          this.errorPassword = 'please fill in the correct password recovery question format.'; 
          this.clearAllErrorMessage();
          return false
        }
        else {
          this.erroranswer = null; 
          return true
        }
    },
    QuestionCheck(){
      if (this.question_for_reset.trim() === '' || this.question_for_reset === null ) {
          this.errorquestion = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        }
        else if (!/^[a-zA-Z0-9_.-]+$/.test(this.username)) { 
          this.erroranswer = 'please fill in the correct password recovery answer format.'; 
          this.clearAllErrorMessage();
          return false
        } 
        else if(this.question_for_reset.length > 255) { 
          this.errorPassword = 'please fill in the correct password recovery answer format.'; 
          this.clearAllErrorMessage();
          return false
        }
        else {
          this.errorquestion = null; 
          return true
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
.table {
  position: absolute; 
  top: 0; 
}

.table.left {
  left: 100%; 
  margin-left: 10px; 
}

.table.right {
  right: 100%; 
  margin-right: 10px; 
}

</style>
