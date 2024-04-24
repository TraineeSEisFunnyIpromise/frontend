<template>
		<!-- Content display for comparing-->
		<!--row 1-->
	<div class="container">
		<!-- First Row-->
		<div class="row">
			<!--First column-->
			<div class="col-12">
				<table>
					<thead>
						<tr>
							<th>
								<td>idk man</td>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>
								<td>details</td>
							</th>
						</tr>
					</tbody>
				</table>
			</div>	
		</div>
		<!--Second Row-->
		<div class="row">
			<!--First column-->
			<div class="col-12">
				<table>
					<thead>
						<tr>
							<th>
								
							</th>
						</tr>
					</thead>
				</table>
			</div>	
		</div>
	</div>
	<button on-click="RedirectToSearch">
		button test1
	</button>
</template>
<script>
	import axios from 'axios'
	export default {
	sendData(){
	return{
	sendData:"",
	}
	},
	data() {
	return {
	searchDataSample: "Car",
	searchResults_Sample: {
		something:["Kirine","Kirin"],
		gayis:["Is","Are"],
		idkman:["A Giraffe","Giraffe queen"]
	},
	CompareResults: false,
	showInfo: true,
	};
	},
	methods: {
	search() {
	const path = 'http://localhost:5000/search'
	const loginData = {
		keyword: this.sendData,
	};
	if (this.keyword !== '' ) {
			axios.post(path, loginData)
			.then(response => {
			console.log(response.data);
			})
			.catch(error => {
			console.log(error);
			});
			// Successful login
			} else {
			// Failed login
			this.errorMessage = 'please add information';
			}
		},
	RedirectToSearch(){
		this.$router.push("/")
	}
	}
}
</script>
<style>
	.top-left-button {
		position: fixed;
		top: 10px;
		left: 10px;
}
		
		
	.container {
		max-width: 20000px;
}
	.table{
		align-self:center;
	}
		
	.table-holder, .table-responsive {
		position: relative;
}
	.info {
		position: absolute;
		width: 200px;
		height: 100%;
		background: linear-gradient(to right, transparent, #ffffff);
		top: 50%;
		left: 35%;
		padding: 20px;
		text-align: right;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
		opacity: 0;
		visibility: hidden;
		z-index: 1;
		pointer-events: none;
}
		
	.show {
		opacity: 1;
		visibility: visible;
}
		
	tr th:first-child, tr td:first-child {
		position: sticky;
		min-width: 50px;
		left: 0;
		background: white;
}

	#first-app{
	width: 200px;
    float: left;
    height: 300px;
    background-color: blue;
	}
	#second-app{
	width: 200px;
    float: right;
    height: 300px;
    background-color: green;
	}
		
</style>