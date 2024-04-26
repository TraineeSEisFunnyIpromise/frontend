<template>
	<h1>
		Ptrends Analyzers
	</h1>
	<h5>
	<div>
		<DropdownMenuMK1 menu-title="What is our product?" dark-mode="auto" class="buttonArrage" style="left: 15%;">
            <section class="option">
            <button @mouseover="sayHello">This is button for method</button>
            <span class="desc">This is Vue dropdown menu method that says hello for you.</span>
            </section>
            <section class="option">
            <span class="desc">Clicking this takes you somewhere else.</span>
            </section>
		</DropdownMenuMK1>

		<DropdownMenuMK1 menu-title="What can it do?" dark-mode="auto" class="buttonArrage" style="left: 40%;">
            <section class="option">
            <button @mouseover="sayHello">This is button for method</button>
            <span class="desc">This is Vue dropdown menu method that says hello for you.</span>
            </section>
            <section class="option">
            <span class="desc">Clicking this takes you somewhere else.</span>
            </section>
		</DropdownMenuMK1>

		<DropdownMenuMK1 menu-title="What how it work" dark-mode="auto" class="buttonArrage" style="left: 65%;" >
            <section class="option">
            <button @mouseover="sayHello">This is button for method</button>
            <span class="desc">This is Vue dropdown menu method that says hello for you.</span>
            </section>
            <section class="option">
            <span class="desc">Clicking this takes you somewhere else.</span>
            </section>
		</DropdownMenuMK1>
		
	</div>
	</h5>
</template>
      
<script>
import DropdownMenuMK1 from '@/components/vue-dropdown-menu.vue'
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
		DropdownMenuMK1
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
      .buttonArrage{
        position: absolute;
        top: 30%;
      }
      .column{
        float: left;
  width: 33.33%;
      }
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

.centered {
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
}
      </style>
      