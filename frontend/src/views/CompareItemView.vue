<template>
	<body>
	<div v-if="CompareResults !== false">
		<h2>Search Results:</h2>
	</div>
	<div v-else>
		<p>No search results found.</p>
	</div>
	<h8>
		<DropdownMenuMK1 menu-title="Vue Dropdown Menu" dark-mode="auto" class="centersomething">
			<section class="option">
			<span class="desc">This is Vue dropdown menu method that says hello for you.</span>
			</section>

			<section class="option">
			<span class="desc">Clicking this takes you somewhere else.</span>
			</section>

		</DropdownMenuMK1>
	</h8>
		<!-- Content display for comparing-->
		<!--row 1-->
	
	</body>
</template>
<script>
import DropdownMenuMK1 from '@/components/vue-dropdown-menu.vue';
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
	},
	components:{
		DropdownMenuMK1
	},
	mounted: function() {
		}
	};
</script>
<style>
.body{
	position:absolute;
	top: 10px;
	left: 40%;

}
	.top-left-button {
		position: fixed;
		top: 10px;
		left: 10px;
}
		
		
	.container {
		max-width: 20000px;
        position: absolute;
        left: 27%;
        top: 250px;
}
    .centersomething {
        font-size: small;
		max-width: 20000px;
        position: absolute;
        left: 27%;
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
	float:inline-start;
	height: 300px;
	}
	#targetHighlighted{
		background-color:rgb(144, 201, 52) ;
	}
	#itemnumbercolor{
		background-color: rgb(182, 73, 155);
	}
		
</style>