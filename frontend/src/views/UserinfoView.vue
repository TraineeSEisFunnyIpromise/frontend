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
    </div>
    <p v-else>No user information available</p>
  </div>
</body>
</html>

</template>

<script>

export default ({
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
