<template>
	<h1>Events For Good</h1>

      </template>
      
      <script>
      // @ is an alias to /src
      
      export default {
	name: 'EventListView',
	props: {
	page: {
		type: Number,
		required: true
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
      </style>
      