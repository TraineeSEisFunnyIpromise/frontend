<template>
	<h1>Events For Good</h1>
	<button v-on:click="redirectToUserinfo">
		person
  </button>
      </template>
      
      <script>
      // @ is an alias to /src
      
      export default {
	name: 'EventListView',
	props: {
	page: {
		type: Number,
		required: true
	},
	methods:{
		redirectToUserinfo(){
			this.$router.push('/userinfo')
			console("clicked")
		}
	}
	},
	data() {
		return {
			events: null,
			totalEvents: 0,
			keyword: null
		}
	},
	// eslint-disable-next-line no-unused-vars
}

</script>
      <style scoped>
      .events {
	display: flex;
	flex-direction: column;
	align-items: center;
      }
      .pagination {
	display: flex;
	width: 290px;
      }
      
      .pagination a {
	flex: 1;
	text-decoration: none;
	color: #2c3e50;
      }
      
      #page-prev {
	text-align: left;
      }
      
      #page-next {
	text-align: right;
      }
      
      .search-box {
	width: 300px;
      }
	.user-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
}

      </style>
      