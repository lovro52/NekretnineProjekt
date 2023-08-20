<template>
  <div class="about">
    <h1>Nekretnine</h1>

    <div v-for="rec in recepti" :key="rec.id">
      <Nekretnina :recept="rec" />
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import Nekretnina from "../components/Nekretnina.vue";

export default {
  name: "List",
  components: { Nekretnina },
  data() {
    return {
      recepti: [],
    };
  },
  async mounted() {
    let rezultatiRef = collection(db, "recepti");
    let recepti = await getDocs(rezultatiRef);

    recepti.docs.map((doc) => {
      this.recepti.push({
        ...doc.data(),
        id: doc.id,
      });
    });
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
