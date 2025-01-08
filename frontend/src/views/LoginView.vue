<template>
  <form @submit.prevent="login">
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
    <button type="submit" :disabled="!username || !password">Login</button> 
    </form>

  </template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      username: '',
      password: '',
      sessionId: null,
      errorMessage: '',
      errorMessage2:'',
      errorlogin:'',
      errorlogin2:'',
      errorUsername:null,
      errorPassword:null,
      display_Resetpassword: false,
    };
  },

  methods: {
    login() {
      const path = 'http://localhost:5000/auth/login';
      const logindata = {
        username: this.username,
        password: this.password
      };


        axios.post(path, logindata)
              .then(response => {
                // Handle successful login (store token?)
                if(response.status == 202){
                  console.log("redirecting"); 
                  console.log(response)

                  this.session = response.data.username;
                  localStorage.setItem('session_username', this.session);  // Store session ID in local storage
                  console.log(this.session)
                  alert("login success")
                  this.$router.push('userinfo').then(() => {
                    location.reload();
                  });
                  
                }
                if(response.data.message == 'Incorrect passwords'){
                  console.log("error1")
                    this.errorMessage = "please enter the correct password";
                  }
                if(response.data.message == 'user not found'){
                  console.log("error2")
                    this.errorMessage = "please enter the correct username";
                  }
                
                // You can store the JWT token in localStorage or Vuex for future requests
              })
              .catch(error => {
                if(error != '' ){
                  console.log("error log")
                  console.log(error.message)
                  if(error.message == 'Network Error'||error.message == 'The server is down'){
                    this.errorMessage = "Sorry for inconvenience seem Server is not response";
                  }
                  if(error.message == "can not connect to database"){
                    this.errorMessage = "Sorry for inconvenience seem database is not response";
                  }
                }
                else{
                this.errorMessage = error;
                console.log("error log")
                console.log(error);
                console.log(this.errorMessage)
              }
              }
            );  
    },

    redirect_to_resetpage() {
      this.$router.push('resetpassword')
    },
    UsernameCheck() {
        if (this.username.trim() === '') {
          this.errorUsername = 'Username is required.';
        } else if (this.username.length > 20) { 
          this.errorUsername = 'Username exceeds maximum length.'; 
        } else if (!/^[a-zA-Z0-9_.-]+$/.test(this.username)) { 
          this.errorUsername = 'Invalid characters in username.'; 
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
    }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.login-box h2 {
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
  background-color: #41eeba;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
}

button:hover {
  background-color: #60e23f;
}

</style>
