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