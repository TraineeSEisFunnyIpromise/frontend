<template>
	<!-- userinfo.html -->
<!DOCTYPE html>
<html>
<head>
  <title>User Information</title>
</head>
<body>
  <div id="app">
    <h2>User Information</h2>
    <div v-if="session != false">
      <div v-if="user != null">
        <p v-if="user != null">Username: {{ user.username }}</p>
        <p v-if="user != null">Email: {{ user.email }}</p>
        <div>
          <a><button  type="submit" @click="UpdateUserInfo" > Delete Account </button></a>
          
          <a><button  type="submit" @click="DeleteUserInfo" > Update Account </button></a>
        </div>
      </div>
    </div>
    <p v-else>No user information available</p>
  </div>

</body>
</html>

</template>

<script>
import axios from 'axios'
export default ({
  data() {
    return {
      user:null
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const sessionId = localStorage.getItem('session_id');
      const path = 'http://localhost:5000/userinfo/Information';
      axios.get(path,{ params: { session_id: sessionId } })
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
          this.user = response.data
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
        });
    },
    UpdateUserInfo() {
      const path = 'http://localhost:5000/updateuserinfo';
      axios.get(path)
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
         
          this.name = response.data
          this.AboutMe = response.data
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
        });
    },
    DeleteUserInfo() {
      const path = 'http://localhost:5000/deleteuserinfo';
      axios.get(path)
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
          this.name = response.data
          this.AboutMe = response.data
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});

</script>

<style>
.top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>