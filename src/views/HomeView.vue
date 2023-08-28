<!-- src/views/Home.vue -->
<template>
  <v-container fill-height fill-width fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="600px" outlined>
          <v-card-title>Search Bar</v-card-title>
          <v-btn @click="goToFilteredPageStan">Show Only Stan</v-btn>
          <v-btn @click="goToFilteredPageKuca">Show Only Kuca</v-btn>
          <SearchBar @search="performSearch" />
          <div class="NoResults" v-if="searchResults.length === 0">
            No results found.
          </div>
          <div v-else>
            <Nekretnina
              v-for="result in searchResults"
              :key="result.id"
              :recept="result"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Nekretnina from "@/components/Nekretnina";
import { ref } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

export default {
  components: {
    SearchBar,
    Nekretnina,
  },
  methods: {
    goToFilteredPageStan() {
      // Use Vue Router to navigate to the other page with a query parameter
      this.$router.push({
        name: "nekretnine-view",
        query: { type: "Stan" },
      });
    },
    goToFilteredPageKuca() {
      // Use Vue Router to navigate to the other page with a query parameter
      this.$router.push({
        name: "nekretnine-view",
        query: { type: "Kuca" },
      });
    },
  },
  setup() {
    const searchResults = ref([]);

    const performSearch = async (searchTerm) => {
      const q = query(
        collection(db, "recepti"),
        where("naslov", ">=", searchTerm),
        where("naslov", "<=", searchTerm + "\uf8ff")
      );
      try {
        const querySnapshot = await getDocs(q);
        searchResults.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          naslov: doc.data().naslov,
          slika: doc.data().slika,
          type: doc.data().type,
          // Add other fields you want to display
        }));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    return {
      searchResults,
      performSearch,
    };
  },
};
</script>

<style>
.NoResults {
  padding: 2%;
}
</style>
