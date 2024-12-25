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
                                        <th v-for="item in searchResults" :key="item.id">
                                        {{ item.title }}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="property in Object.keys(searchResults[0])" :key="property">
                                        <th scope="row">{{ property }}</th>
                                        <td v-for="item in searchResults" :key="item.id">
                                        {{ item[property] }}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                  </div>
				<div>something</div>
				<div>{{ datastore }}</div>
                </div>
      </div>
			<div>
				<chart></chart>
			</div>
  </div>
<!-- oh boy implement time-->
		</div>
	
	</body>
</template>
<script>
import axios from 'axios'
import chart from '@/components/chartfromvuechart.vue';
import EventService from '@/services/EventService.js'
	export default {
	props: ['id'],
	data() {
	return {

	searchResults:null,
	CompareResults: false,
	showInfo: true,
	datastore:'',
	};
	},
	components: {
    chart,

  },
	methods: {
	compare_math_test() {
		//top-down(mean) calculation
		//average without cull value


		//cull the exceed of maximum 20 percentage of average by max and min + average * 20%

		//average representative value

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
  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data
      })
      .catch((error) => {
        console.log(error)
      })
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