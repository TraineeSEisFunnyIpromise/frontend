<template>
	<!-- userinfo.html -->
<!DOCTYPE html>
<html>
<head>
  <title>User Information</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <h2>User Information</h2>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Address: {{ user.address }}</p>
    </div>
    <p v-else>No user information available</p>
  </div>

  <script src="app.js"></script>
</body>
</html>

</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      // Fetch user information from the backend
      // Replace the following code with your own API request logic
      // You can use libraries like Axios to make HTTP requests
      // Here, we simulate a response with hardcoded data
      const response = {
        username: 'john_doe',
        email: 'john@example.com',
        address: '123 Main St'
      };

      this.user = response;
    }
  }
});

</script>
