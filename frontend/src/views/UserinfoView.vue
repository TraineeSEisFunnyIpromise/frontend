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
      <button class="updateUser" v-if="showUpdate" @click="UpdateUser">Save</button>
          
      <div><input type="Delete" v-if="deleteUser" ref="deleteInput" v-model="deletepass" /></div>
      <button class="deleteUserForm" v-if="!deleteUser" @click="showDeleteForm">Delete</button>
      <button class="deleteUser" v-if="deleteUser" @click="DeleteUser">Delete user</button>
      
      <div><input type="UpdatePassword" v-if="showUpdatePassForm" ref="ResetPassInput" v-model="deletepass" /></div>
      <button class="UpdatePasswordform" v-if="!showUpdatePassForm" @click="showUpdatePassForm">UpdatePassword</button>
      <button class="UpdatePassword" v-if="UpdatePassword" @click="UpdatePassword">Delete user</button>
      

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
      showUpdateForm:false,
      showUpdatePassForm: false,
      deleteUser: false,
      updatedAbout: '',
      send:'',
      updatePassword:'',

    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const path = 'http://localhost:5000/userinfo/Information';
      const user = {
        username: sessionStorage.getItem('username'),
      };
      axios.post(path,user)
        .then(response => {
          // Handle successful login (store token?)
          console.log("getting user info")
          console.log(response.data);
          this.name = response.data;
          this.AboutMe = response.data;
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
          console.log("user not found")
        });
    },
    UpdateUser() {
      const path = 'http://localhost:5000/userinfo/updateuserinfo';
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
    UpdatePassword() {
      const path = 'http://localhost:5000/userinfo/updatepassword';
      const send_about = this.updatedAbout;
      // const senddata: 
      axios.get(path,send_about)
        .then(response => {
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
      const path = 'http://localhost:5000/userinfo/deleteuserinfo';
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
      showUpdatePassForm() {
          this.UpdatePassword = true;

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