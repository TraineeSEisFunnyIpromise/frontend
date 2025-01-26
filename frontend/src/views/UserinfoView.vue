<template>
	<!-- userinfo.html -->
<!DOCTYPE html>
<html>
<head>
  <title>User Information</title>
</head>
<body>
  <h2>User Information</h2>
  <div id="app" class="userinfo">
    <div v-if="session != false" >
      <div v-if="user != null">
        <p v-if="name != null">Username: {{ name }}</p>
        <p v-if="userinfo != null">About me: {{ userinfo }}</p>
        <p v-if="userinfo != null">Email: {{ email }}</p>
        <p v-if="userinfo != null">Date of Birth: {{ dateofBirth }}</p>
        <div>
          <table class="table">
            <tr>
              <th>
                <div>
                  <span v-if="errorabout != null">{{ errorabout }}</span>
                  <input type="Update" 
                  v-if="showUpdate == true" 
                  ref="aboutInput" 
                  v-model="updateAbout" 
                  placeholder="Update about yourself here!" />
                </div>
                <div>
                  <span v-if="erroremail != null">{{ erroremail }}</span>
                  <input 
                  type="Update" 
                  v-if="showUpdate == true" 
                  ref="ageInput" 
                  v-model="updateAboutEmail" 
                  placeholder="Update Email Here! " />
                </div>
                <div>
                  <span v-if="errordateofbirth != null">{{ errordateofbirth }}</span>
                  <input 
                  type="month"
                  id="selectedDate" 
                  v-if="showUpdate == true" 
                  ref="emailInput" 
                  v-model="updateAboutBirthdate" 
                  placeholder="Update Date of birth Here! " 
                  />
                </div>
                <button class="updateUserForm" v-if="showUpdate != true" @click="showUpdateForm">Update</button>
                <button class="updateUser" v-if="(showUpdate==true)&&(showConfirmUpdate != true)" @click="confirmUpdate">Save</button>
                <button class="confirm" v-if="showConfirmUpdate==true" @click="UpdateUser">Confirm update about me?</button>
                <button class="confirm" v-if="(showUpdate==true)||(showConfirmUpdate == true)" @click="cancelupdate">Cancel</button>
              </th>
              <div>
                <input type="Delete" 
                v-if="deleteUser == true" 
                ref="deleteInput" 
                v-model="password" 
                placeholder="Please fill Your password here"/>
              </div>
              <button class="deleteUserForm" v-if="deleteUser != true" @click="showDeleteForm">Delete</button>
              <button class="deleteUser" v-if="(deleteUser==true)&&(showConfirmDelete != true)" @click="confirmDelete">Delete user</button>
              <button class="confirm" v-if="showConfirmDelete==true" @click="DeleteUser">Confirm Delete your account?</button>
              <button class="confirm" v-if="(deleteUser==true)||(showConfirmDelete == true)" @click="canceldelete">Cancel</button>

              <th>
                <div>
                  <input type="UpdatePassword" 
                  v-if="showUpdatePass == true" 
                  ref="ResetPassInput" 
                  v-model="updatePassword" 
                  placeholder="Update your password here!"/>
                </div>
                <button class="UpdatePasswordform" v-if="showUpdatePass != true" @click="showUpdatePassForm">UpdatePassword</button>
                <button class="UpdatePassword" v-if="(showUpdatePass==true)&&(showConfirmPass!=true)" @click="confirmUpdatePass">Update Password</button>
                <button class="confirm" v-if="showConfirmPass==true" @click="UpdatePassword">Confirm update password?</button>
                <button class="confirm" v-if="(showUpdatePass==true)||(showConfirmPass==true)" @click="cancelpass">Cancel</button>
              </th>

              <th>
                <button @click="Logout"> log out</button>
              </th>

            </tr>
          </table>
          
        </div>
      </div>

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
      aboutme:null,
      email:null,
      dateofBirth:null,
      showUpdate: false,
      showUpdatePass: false,
      deleteUser: false,
      updateAbout: '',
      updateAboutEmail:null,
      updateAboutBirthdate:null,
      send:'',
      updatePassword:'',
      errorMessage:'',
      result:"",
      name:'',
      userinfo:'',
      showConfirmDelete: false,
      showConfirmPass: false,
      showConfirmUpdate: false,
      password:'',
      errorabout:null,
      erroremail:null,
      errordateofbirth:null,
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
          console.log(response.data[1]);
          console.log(user)
          this.name = response.data[0];
          this.userinfo = response.data[1];
          this.email = response.data[2];
          this.dateofBirth = response.data[3];
          this.user = true
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          console.error(error);
          console.log("user not found")
          console.log(user)
          this.user = null
          //need to update
          this.errorMessage = "user not found"
        });
    },
    UpdateUser() {
      if(this.AboutCheck()&&this.EmailCheck()&&this.BirthCheck){
        const path = 'http://localhost:5000/userinfo/Update';
      const send_about = {
        username: this.name,
        aboutme: this.updatedAbout,
        email: this.updatedAboutEmail,
        adateOfbirth: this.updatedAboutAge
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
            this.result = "account information update is successful"
            this.fetchUserInfo();
            setTimeout(() => {
              this.result = ""
            }, 3000);
          }
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          if(error.data)          {
            this.result = "account information update is unsuccessful"
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
            this.result = "password changed	successfully"
            this.fetchUserInfo();
            setTimeout(() => {
              this.result = ""
            }, 3000);
          }
          // You can store the JWT token in localStorage or Vuex for future requests
        })
        .catch(error => {
          
          if(error.data)          {
            this.result = "password changed	unsuccessfully"
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
      if((this.password != '' && this.password!=null) && this.deleteUser != localStorage.getItem('session_username')){
      const path = 'http://localhost:5000/userinfo/Delete';
      const senduser = {
        username: this.name,
        password: this.password,
      };
      axios.post(path,senduser)
        .then(response => {
          // Handle successful login (store token?)

          console.log(response)
          if(response.data.msg == "remove successful"){
            this.result = "account has been successfully deleted"
            localStorage.clear()
            setTimeout(() => {
              console.log("redirecting");
              this.$router.push('/').then(() => {
                location.reload();
              });
            }, 5000);
          }
          else{
            this.result = "account has not been successfully deleted"
            setTimeout(() => {
              this.result = ""
            }, 3000);
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
        alert("please fill your password")
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
            this.result = "logout successfully"
            setTimeout(() => {
              console.log("redirecting");
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

      canceldelete() {
        this.deleteUser = false;
        this.showConfirmDelete = false;
        this.showDelete = false;
      },
      cancelupdate() {
        this.showConfirmUpdate = false;
        this.showUpdate = false;
      },
      cancelpass() {
        this.showConfirmPass = false;
        this.showUpdatePass = false;
      },
      confirmDelete() {
        this.showConfirmDelete = true;
      },
      confirmUpdate() {
        this.showConfirmUpdate = true;
      },
      confirmUpdatePass() {
        this.showConfirmPass = true;
      },
      
    EmailCheck(){
      if (this.updateAboutEmail.trim() === '' || this.updateAboutEmail === null ) {
          this.erroremail = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        }
        else if(this.updateAboutEmail.length > 255) { 
          this.erroremail = 'please fill in the correct password recovery answer format.'; 
          this.clearAllErrorMessage();
          return false
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        if (!emailRegex.test(this.updateAboutEmail)) { 
          this.erroremail = 'Please enter a valid email address.';
          this.clearAllErrorMessage(); 
          return false;
        }

        else {
          this.erroremail = null; 
          return true
        }
    },
    AboutCheck(){
      if (this.updateAbout.trim() === '' || this.updateAbout === null ) {
          this.errorabout = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        }
        else if(this.updateAbout.length > 255) { 
          this.errorabout = 'please fill in the correct password recovery answer format.'; 
          this.clearAllErrorMessage();
          return false
        }
        if (!/^[a-zA-Z0-9_.-]+$/.test(this.updateAbout)) { 
          this.errorabout = 'Please enter a valid email address.';
          this.clearAllErrorMessage(); 
          return false;
        }

        else {
          this.errorabout = null; 
          return true
        }
    },
    BirthCheck(){
      if (this.updateAboutBirthdate.trim() === '' || this.updateAboutBirthdate === null ) {
          this.errorbirth = 'please fill in all the blanks.';
          this.clearAllErrorMessage();
          return false
        }
        else {
          this.errorbirth = null; 
          return true
        }
        
    },
    clearAllErrorMessage() {
    setTimeout(() => {
    this.erroremail = null; 
    this.erroremail = null;
    this.errordateofbirth = null;
      }, 3000); 
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
.confirm {
  top: 10px;
  left: 40%;
}
.table{
  position: absolute;
  align-content: center;
  
}
.userinfo{

  display: flex;
  justify-content: center; 
  align-items: center; 
  min-height: 100px;

  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #22644b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>