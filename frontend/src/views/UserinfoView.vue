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
    <div v-if="session != false" >
      <div v-if="user != null">
        <p v-if="name != null">Username: {{ name }}</p>
        <p v-if="userinfo != null">About me: {{ userinfo }}</p>
        <div>
      <div>
        <input type="Update" v-if="showUpdate == true" ref="aboutInput" v-model="updatedAbout" required/>
      </div>
      <button class="updateUserForm" v-if="!showUpdate == true" @click="showUpdateForm">Update</button>
      <button class="updateUser" v-if="showUpdate==true" @click="UpdateUser">Save</button>
          
      <div><input type="Delete" v-if="deleteUser == true" ref="deleteInput" v-model="deletepass" required /></div>
      <button class="deleteUserForm" v-if="!deleteUser == true" @click="showDeleteForm">Delete</button>
      <button class="deleteUser" v-if="deleteUser==true" @click="DeleteUser">Delete user</button>
      
      <div><input type="UpdatePassword" v-if="showUpdatePass == true" ref="ResetPassInput" v-model="updatePassword"  required /></div>
      <button class="UpdatePasswordform" v-if="!showUpdatePass == true" @click="showUpdatePassForm">UpdatePassword</button>
      <button class="UpdatePassword" v-if="showUpdatePass==true" @click="UpdatePassword">Update Password</button>

      
      

        </div>
      </div>
      <button @click="Logout"> log out</button>
    </div>
    <p v-else>No user information available</p>

    <div class="errormessage" v-if="errorMessage">
      <p> {{ errorMessage }}</p>
    </div>

    <div>{{ result }}</div>
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
      showUpdatePass: false,
      deleteUser: false,
      updatedAbout: '',
      send:'',
      updatePassword:'',
      errorMessage:'',
      result:"",
      name:'',
      userinfo:'',

    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const path = 'http://localhost:5000/auth/Information';
      const user = {
        username: localStorage.getItem('session_username'),
      };
      axios.post(path,user)
        .then(response => {
          // Handle successful login (store token?)
          console.log("getting user info")
          console.log(response.data);
          console.log(user)
          this.name = response.data[0];
          this.userinfo = response.data[1];
          this.user = true
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
          console.log("user not found")
          console.log(user)
          this.user = null
          //need to update
          this.errorMessage = "sorry seem we can't fetch current user's information"
        });
    },
    UpdateUser() {
      if(this.updatedAbout != ''){
        const path = 'http://localhost:5000/userinfo/Update';
      const send_about = {
        username: this.name,
        aboutme: this.updatedAbout
      };
      // const senddata: 
      axios.post(path,send_about,
      {headers: {
      'Content-Type': 'application/json',  // Set the correct Content-Type header
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
          this.result = response.data
          this.showUpdate = false;
          if(response.data.message == "update success"){
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
      }
      else{
        alert("About me shound not empty")
      }
      
    },
    UpdatePassword() {

      if(this.updatePassword != ''){
        const path = 'http://localhost:5000/userinfo/PasswordUpdate';
      const send_about = {
        username: this.name,
        password: this.updatePassword
      };
      // const senddata: 
      axios.post(path,send_about)
        .then(response => {
          console.log(response.data);
          this.showUpdatePass = false;
          if(response.data == "Reset password successful"){
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
      }
      else{
        alert("update password must not empty")
      }
    },
    DeleteUser() {
      if(this.deleteUser != '' && this.deleteUser != localStorage.getItem('session_username')){
      const path = 'http://localhost:5000/userinfo/Delete';
      const senduser = {
        username: this.name
      };
      axios.post(path,senduser)
        .then(response => {
          // Handle successful login (store token?)
          
          if(response.data == "remove successful"){
            this.result = "account has been successfully deleted"
            localStorage.clear()
            setTimeout(() => {
              this.console.log("redirecting");
              this.$router.push('/').then(() => {
                location.reload();
              });
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
      }
      else{
        alert("Delete user must not empty or other")
      }
    },
Logout(){
  const path = 'http://localhost:5000/auth/logout';
      const senduser = this.name
      axios.post(path,senduser)
        .then(response => {
          // Handle successful login (store token?)
          
          if(response.data == "log out success"){
            localStorage.clear()
            this.result = "account has been successfully logout"
            setTimeout(() => {
              this.console.log("redirecting");
              this.$router.push('/').then(() => {
                location.reload();
              });
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
      showUpdateForm() {
        this.showUpdate = true;
      },
      showUpdatePassForm() {
        this.showUpdatePass = true;
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