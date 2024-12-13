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
			<form @submit.prevent="finduser">
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
			<label for="password">QUESTION</label>
			<label for="password">{{ question }}</label>
			<input type="text" id="newpassword" v-model="answer" required>
			<label for="password">New Password</label>
			<input type="text" id="newpassword" v-model="password" required>
			</div>
			<button type="submit">Press here to find</button>
			</form>
			</div>
			<div v-if="result != ''">result of the reset password {{  result }} </div>
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
			answer:'',
			tabappear:false,
			findingtarget:null,
			result:"",
			question:""
		};
		},
		methods: {
			finduser() {
					const path = 'http://localhost:5000/checkuser';
					const userdata = {
					username: this.username,
					};
					axios.post(path, userdata)
					.then(response => {

						if(response.status == 200){
						this.question = response.data
						this.tabappear = true
					}
					
					})
					.catch(error => {
					console.log(error)
					if(error == "not found")
					alert("user not found")
					if(error.message == "Network Error"){
					alert("server is Not available")
					}
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

					if(response == "success"){
						this.result = "reset password successful"
					}

					console.log(response.data);

					})
					.catch(error => {
					console.error(error);
					if(error.response == "Incorrect answer"){
						this.result = "Please provide correct username and answer"
					}
					else{
						this.result = "reset password unsuccessful"
					}

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
		