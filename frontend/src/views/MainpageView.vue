<template>
      <div>
            <h1>Ptrends Analyzers</h1>
            <h5>
                  <div style="position: relative; width: 100%;">
                        <DropdownMenuMK1 menu-title="What is this product?" dark-mode="auto" class="buttonArrange" style="position: absolute; left: 15%;">
                              <section class="option">
                                    <span class="desc">
                                          This is a web application that scrapes product information, including reviews, from eCommerce websites. It then presents this information in an infographic format, highlighting major opinions on the product.
                                    </span>
                              </section>
                        </DropdownMenuMK1>

                        <DropdownMenuMK1 menu-title="How does it work?" dark-mode="auto" class="buttonArrange" style="position: absolute; left: 40%;">
                              <section class="option">
                                    <span class="desc">
                                          It provides information and reviews from eCommerce websites to help you make informed decisions about electronic devices based on your requirements.
                                    </span>
                              </section>
                        </DropdownMenuMK1>

                        <DropdownMenuMK1 menu-title="How do I use it?" dark-mode="auto" class="buttonArrange" style="position: absolute; left: 65%;">
                              <section class="option">
                                    <span class="desc">Just log in and you are good to go!</span>
                              </section>
                        </DropdownMenuMK1>
                  </div>

                  <!-- fancy picture below here -->
                   <div></div>

            </h5>
      </div>
</template>




<script>
import DropdownMenuMK1 from '@/components/vue-dropdown-menu.vue'
// @ is an alias to /src
export default {
      // name: 'MainPage',
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
.buttonArrage {
      position: absolute;
      top: 30%;
}

.column {
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
      position: fixed;
      /* or absolute */
      top: 50%;
      left: 50%;
}

.desc {
      font-size: medium;
}
</style>
