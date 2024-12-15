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

    <div class="errormessage" v-if="errorMessage">
      <p> {{ errorMessage }}</p>
    </div>

    <div>{{ session }}</div>
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
      errorMessage:'',
      result:"",

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
          //need to update
          this.errorMessage = "sorry seem we can't fetch current user's information"
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
          if(response.data == "user updated"){
            this.result = "aboutme has been successfully Updated"
            this.fetchUserInfo();
            setTimeout(() => {
              this.result = ""
            }, 3000);
          }
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          if(error.data)          {
            this.result = "aboutme has not been successfully Updated"
            setTimeout(() => {
              this.result = ""
            }, 3000);

          }
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
          if(response.data == "user updated"){
            this.result = "account password has been successfully Updated"
            this.fetchUserInfo();
            setTimeout(() => {
              this.result = ""
            }, 3000);
          }
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          
          if(error.data)          {
            this.result = "account password has not been successfully Updated"
            setTimeout(() => {
              this.result = ""
            }, 3000);

          }
        });
    },
    DeleteUser() {
      const path = 'http://localhost:5000/userinfo/deleteuserinfo';
      const user = this.deletepass
      axios.get(path,user)
        .then(response => {
          // Handle successful login (store token?)
          
          if(response.data == "user deleted"){
            this.result = "account has been successfully deleted"
            setTimeout(() => {
              this.console.log("redirecting");
              this.$router.push("/");
            }, 5000);
          }

          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
          if(error.data)          {
            this.result = "account has not been successfully deleted"
            setTimeout(() => {
              this.result = ""
            }, 3000);
          }
        });
    },
      showDeleteForm() {
        this.deleteUser = true;
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