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
        <p v-if="user.username != null">Username: {{ user.username }}</p>
        <p v-if="user.about != null">About me: {{ user.about }}</p>
        <div>
      <div><input type="Update" v-if="showUpdate" ref="aboutInput" v-model="updatedAbout" /></div>
      <button class="updateUserForm" v-if="!showUpdate" @click="showUpdateForm">Update</button>
      <button class="updateUser" v-if="showUpdate" @click="updateUserInfo">Save</button>
          
      <div><input type="Delete" v-if="deleteUser" ref="deleteInput" v-model="deletepass" /></div>
      <button class="deleteUserForm" v-if="!deleteUser" @click="showDeleteForm">Delete</button>
      <button class="deleteUser" v-if="deleteUser" @click="DeleteUser">Delete user</button>
      
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
      user:null,
      showUpdate: false,
      deleteUser: false,
      admindeleteUser: false,
      updatedAbout: '',
      send:'',
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      // const sessionId = localStorage.getItem('session_id');
      // { params: { session_id: sessionId } }
      const path = 'http://localhost:5000/userinfo/Information_test';
      axios.post(path)
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
    UpdateUser() {
      const path = 'http://localhost:5000/updateuserinfo';
      const send_about = this.updatedAbout;
      // const senddata: 
      axios.get(path,send_about)
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
          this.name = response.data
          this.AboutMe = response.data
          this.showUpdate = false;
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
        });
    },
    DeleteUser() {
      const path = 'http://localhost:5000/deleteuserinfo';
      const user = this.deletepass
      axios.get(path,user)
        .then(response => {
          // Handle successful login (store token?)
          this.$router.push("/")
          console.log(response.data);
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
        });
    },
      showUpdateForm() {
        this.showUpdate = true;
        this.updatedAbout = this.user.about;
      },
      
      showDeleteForm() {
        this.deleteUser = true;
      },
      showAdminDeleteForm() {
        if(this.user['role'] == 'admin'){
          this.admindeleteUser = true;
        }
        

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