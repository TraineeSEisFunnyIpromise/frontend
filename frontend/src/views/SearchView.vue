<template>
<button @click="$router.push('/')" class="top-left-button">Go to Main Page</button>
<form @submit.prevent="searchItems">
      <label for="keyword">Keyword:</label>
      <input type="text" id="keyword" v-model="searchData.keyword">

      <label for="description">Description:</label>
      <input type="text" id="description" v-model="searchData.description">

      <label for="specification">Specification:</label>
      <input type="text" id="specification" v-model="searchData.specification">

      <button type="submit">Search</button>
    </form>
    <div v-if="searchResults.length > 0">
      <h2>Search Results:</h2>
      <ul>
        <li v-for="item in searchResults.slice(0,9)" :key="item.id">
          <!-- Display item details here -->
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>{{ item.specification }}</p>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>No search results found.</p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: {
        keyword: '',
        description: '',
        specification: '',
      },
      searchResults: [],
    };
  },
  methods: {
    searchItems() {
      this.searchResults = [
        {
          id: 1,
          name: 'Item 1',
          description: 'Description for Item 1',
          specification: 'Specification for Item 1',
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'Description for Item 2',
          specification: 'Specification for Item 2',
        },
      ];
    },
  },
};
</script>
<style>
.top-left-button {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>