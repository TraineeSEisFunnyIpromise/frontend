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
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Address: {{ user.address }}</p>
      <div>
        <button> Delete Account </button>
        <button> Update Account </button>
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
      user: [{username:"something"},{email:"notgood"},{address:"right?"}],
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const path = 'http://localhost:5000/Userinfo';
      axios.get(path)
        .then(response => {
          // Handle successful login (store token?)
          console.log(response.data);
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