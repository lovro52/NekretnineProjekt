<!-- src/components/SearchBar.vue -->
<template>
  <div>
    <input
      type="text"
      v-model="searchTerm"
      @input="handleInput"
      placeholder="Search..."
    />
    <button @click="search">Search</button>
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
</style>
