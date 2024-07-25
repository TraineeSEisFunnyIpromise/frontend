<template>
	<body>
	<div v-if="CompareResults !== false">
		<h2>Search Results:</h2>
	</div>
	<div v-else>
		<p>No search results found.</p>
	</div>
		<!-- Content display for comparing-->
		<!--row 1-->

		<div>
			<!--a lot of big table-->
			<div class="container">
                <div class="row">
                <!--First column-->
                <div class="col-12">
                    <div id="app">
                                <!--first table-->
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th v-for="item in searchResults_Sample" :key="item.id">
                                        {{ item.title }}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="property in Object.keys(searchResults_Sample[0])" :key="property">
                                        <th scope="row">{{ property }}</th>
                                        <td v-for="item in searchResults_Sample" :key="item.id">
                                        {{ item[property] }}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                  </div>
                </div>
      </div>
  </div>
<!-- oh boy implement time-->
		</div>
	
	</body>
</template>
<script>
import axios from 'axios'
	export default {
	data() {
	return {
	searchResults_Sample: [
    {id:1, title:"Test1",description:["criterialist1","criterialist2","criterialist3"],price:"1234",asin:"5125"},
    {id:2, title:"Test2",description:["criterialist1","criterialist2","criterialist3"],price:"1234",asin:"4214"},
    {id:3, title:"Test3",description:["criterialist1","criterialist2","criterialist3"],price:"1231",asin:"1242"},
    {id:4, title:"Test4",description:["criterialist1","criterialist2","criterialist3"],price:"1234",asin:"6126"},
        ],
	searchResults:[],
	CompareResults: false,
	showInfo: true,
	datastore:'',
	};
	},
	methods: {
	compare_test() {
	const path = 'http://localhost:5000/compare_test'
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
		compare() {
	const path = 'http://localhost:5000/compare_test'
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
		result() {
	const path = 'http://localhost:5000/result'
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