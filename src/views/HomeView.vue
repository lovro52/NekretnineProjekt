<!-- src/views/Home.vue -->
<template>
  <v-container fill-height fill-width fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="600px" outlined>
          <v-card-title>Search Bar</v-card-title>
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
