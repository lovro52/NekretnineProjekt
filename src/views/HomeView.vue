<!-- src/views/Home.vue -->
<template>
  <v-container fill-height fill-width fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="700px" outlined>
          <v-card-title>Pretraži Nekretnine:</v-card-title>
          <SearchBar @search="performSearch" />
          <div class="NoResults" v-if="searchResults.length === 0">
            No results found.
          </div>
          <div v-else align="left" width="600" height="500">
            <Nekretnina
              v-for="result in searchResults"
              :key="result.id"
              :recept="result"
            />
          </div>
          <v-divider></v-divider>
          <v-card-title>Izaberi:</v-card-title>
          <v-card-actions class="btn">
            <v-btn @click="goToFilteredPageStan">Stanovi</v-btn>
            <v-btn @click="goToFilteredPageKuca">Kuće</v-btn>
          </v-card-actions>
          <p>Logged in as: {{ currentUser.email }}</p>
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
import { auth, onAuthStateChanged } from "@/firebase";
export default {
  components: {
    SearchBar,
    Nekretnina,
  },
  data: () => ({
    currentUser: "",
  }),
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user; // Set the currently logged-in user
      } else {
        this.currentUser = null; // User is signed out
      }
    });
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
          email: doc.data().email,
          price: doc.data().price,
          address: doc.data().address,
          location: doc.data().location,
          text: doc.data().text,
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

<style scoped>
.NoResults {
  padding: 2%;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
