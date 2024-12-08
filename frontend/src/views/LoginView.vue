<template>
  <!-- index.html -->
  <!DOCTYPE html>
  <html>

  <head>
    <title>Login Page</title>
  </head>

  <body>
    <div id="app" div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <div style=" padding-top:10px ;">
      <button class="Resetpassword" @click="redirect_to_resetpage">forget password?</button>
        </div>
    </div>
    <div class="errormessage" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>

  </body>

  </html>
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
          console.log(response.data);
          if(response.status === 202){
            console.log("redirecting"); 
            this.sessionId = response.data.session_id;
            localStorage.setItem('session_id', this.sessionId);  // Store session ID in local storage
            this.$router.push('userinfo')
          }
          else{
            console.log("test1")
          }
          
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          if(error.status == 500 || error.message == "Network Error"){
            console.log("server is not response")
            if(error == "AxiosError: Network Error"){
              this.errorMessage = "Sorry for inconvenience seem Server is not response";
            }
          }
          else{
          this.errorMessage = error;
          console.error(error);
         }
        }
      );
    },
    redirect_to_resetpage() {
      this.$router.push('resetpassword')
    },

    // app.js
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
