	<template>
		<!-- index.html -->
		<!DOCTYPE html>
		<html>
		
		<head>
		<title>Forget Password Page</title>
		</head>
		
		<body>
		<div id="app" div class="login">
			<h2>Username target</h2>
			<form @submit.prevent="forgetpassword">
			<div class="input-group">
			<label for="username">Username target:</label>
			<input type="text" id="username" v-model="username" required>
			</div>
			<button type="submit">Press here to find</button>
			</form>
		</div>
		</body>
		<div v-if="tabappear != false">
			<div id="app" div class="login">
			<h2>Reset Password</h2>
			<form @submit.prevent="Resetpassword">
			<div class="input-group">
			<label for="username">New Password</label>
			<input type="text" id="username" v-model="username" required>
			</div>
			<button type="submit">Press here to find</button>
			</form>
			</div>
		</div>
		
		</html>
		</template>
		
		<script>
		import axios from 'axios';
		
		export default {
		name: 'HelloWorld',
		props: {
		msg: String,
		},
		data() {
		return {
			username: '',
			password: '',
			tabappear:false,
			findingtarget:null,
		};
		},
		methods: {
			forgetpassword() {
					const path = 'http://localhost:5000/forgetpassword';
					const userdata = {
					username: this.username,
					};
					axios.post(path, userdata)
					.then(response => {
					// Handle successful login (store token?)
					console.log(response.data);
					// You can store the JWT token in localStorage or Vuex for future requests
					})
					.catch(error => {
					console.error(error);
					});
				},
			Resetpassword() {
					const path = 'http://localhost:5000/resetpassword';
					const userdata = {
					username: this.username,
					password: this.password
					};
					axios.post(path, userdata)
					.then(response => {
					// Handle successful login (store token?)
					console.log(response.data);
					// You can store the JWT token in localStorage or Vuex for future requests
					})
					.catch(error => {
					console.error(error);
					});
				},
		// app.js
			}
		};
		</script>
		
		<style scoped>
		.login {
		max-width: 400px;
		margin: 50px auto;
		padding: 20px;
		border: 1px solid #ddd;
		border-radius: 10px;
		background-color: #f9f9f9;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		text-align: left;
		}
		
		.login-box h2 {
		text-align: center;
		margin-bottom: 20px;
		}
		
		.input-group {
		margin-bottom: 15px;
		}
		
		.input-group label {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
		}
		
		.input-group input {
		width: calc(100% - 20px);
		padding: 8px 10px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 5px;
		}
		
		button {
		display: block;
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: #41eeba;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		color: #fff;
		}
		
		button:hover {
		background-color: #60e23f;
		}
		
		</style>
		