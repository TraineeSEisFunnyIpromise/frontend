<template>
	<h1>
		Events For Good
	</h1>
	<h1>
	<button v-on:click="redirectToUserinfo">
		person
	</button>
	</h1>
	<h5>
	<div>
	<VueDropdownMenu menu-title="Vue Dropdown Menu" dark-mode="auto">

	<section class="option">
	<button @click="sayHello">This is button for method</button>
	<span class="desc">This is Vue dropdown menu method that says hello for you.</span>
	</section>

	<section class="option">
	<span class="desc">Clicking this takes you somewhere else.</span>
	</section>

	<section class="option">
	<router-link to="/about">This is Vue router link</router-link>
	<span class="desc">Clicking this takes you somewhere else.</span>
	</section>
</VueDropdownMenu>
	</div>
	</h5>
</template>
      
<script>
import VueDropdownMenu from '@/components/vue-dropdown-menu.vue'
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
	components: {
		VueDropdownMenu
	},
	data() {
		return {
			events: null,
			totalEvents: 0,
			keyword: null,
			showDropdown: false // Flag to control dropdown visibility
		}
	},
	// eslint-disable-next-line no-unused-vars
	methods: {
	showDropdown1() {
      // Toggle the visibility of the dropdown on hover
      this.showDropdown = !this.showDropdown;
    }
  }
}

</script>
      <style scoped>
      .b-button {
	margin-bottom: 10px;
	}
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
.top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
}
.information-button {
position: fixed;
top: 10px;
left: 10px;
}
      </style>
      