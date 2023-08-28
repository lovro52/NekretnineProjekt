<template>
  <div class="about">
    <h1>Nekretnine</h1>

    <!-- Type filter -->
    <label>Type:</label>
    <select v-model="selectedType">
      <option value="">All</option>
      <option value="Kuca">Kuca</option>
      <option value="Stan">Stan</option>
      <!-- Add more options as needed -->
    </select>

    <!-- Price range filter -->
    <label>Price Range:</label>
    <input type="number" v-model="minPrice" placeholder="Min Price" />
    <input type="number" v-model="maxPrice" placeholder="Max Price" />

    <!-- Location filter -->
    <label>Location:</label>
    <select v-model="selectedLocation">
      <option value="">All</option>
      <option value="Bjelovarsko-bilogorska županija">
        Bjelovarsko-bilogorska županija
      </option>
      <option value="Brodsko-posavska županija">
        Brodsko-posavska županija
      </option>
      <!-- Add more options for other locations -->
    </select>

    <div v-for="nekretnina in filteredNekretnine" :key="nekretnina.id">
      <Nekretnina :recept="nekretnina" />
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import Nekretnina from "../components/Nekretnina.vue";

export default {
  name: "List",
  components: { Nekretnina },
  data() {
    return {
      nekretnine: [],
      selectedType: "",
      minPrice: null,
      maxPrice: null,
      selectedLocation: "",
    };
  },
  async mounted() {
    const nekretnineRef = collection(db, "recepti");
    const querySnapshot = await getDocs(nekretnineRef);

    querySnapshot.forEach((doc) => {
      this.nekretnine.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    if (this.$route.query.type === "Stan") {
      this.selectedType = "Stan";
    }
    if (this.$route.query.type === "Kuca") {
      this.selectedType = "Kuca";
    }
  },
  computed: {
    filteredNekretnine() {
      return this.nekretnine.filter((nekretnina) => {
        const typeFilter =
          this.selectedType === "" || nekretnina.type === this.selectedType;
        const priceFilter =
          (!this.minPrice || nekretnina.price >= this.minPrice) &&
          (!this.maxPrice || nekretnina.price <= this.maxPrice);
        const locationFilter =
          this.selectedLocation === "" ||
          nekretnina.location === this.selectedLocation;

        return typeFilter && priceFilter && locationFilter;
      });
    },
  },
};
</script>

<style>
.recept_card {
  margin: 20px;
}

.recept_naslov {
  color: white;
}
</style>
