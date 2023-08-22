<template>
  <div class="about">
    <h1>Nekretnine</h1>

    <!-- User input for filtering -->
    <label>Type:</label>
    <select v-model="selectedType">
      <option value="">All</option>
      <option value="Kuca">Kuca</option>
      <option value="Stan">Stan</option>
      <!-- Add more options as needed -->
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
      selectedType: "", // Initialize the selected type filter
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
  },
  computed: {
    filteredNekretnine() {
      if (this.selectedType === "") {
        return this.nekretnine;
      } else {
        return this.nekretnine.filter(
          (nekretnina) => nekretnina.type === this.selectedType
        );
      }
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
