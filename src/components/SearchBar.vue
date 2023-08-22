<!-- src/components/SearchBar.vue -->
<template>
  <div>
    <input
      class="search"
      type="text"
      v-model="searchTerm"
      @input="handleInput"
      placeholder="Search..."
    />
    <v-spacer></v-spacer>
    <v-btn elevation="2" outlined rounded @click="search">Search</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    handleInput() {
      // Handle input changes
    },
    search() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.search {
  align-content: center;
  margin: 2%;
  padding: 2%;
  border-style: solid;
}
</style>
