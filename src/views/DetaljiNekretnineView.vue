<template>
  <div>
    <h1>Ja sam stranica za detalje o: {{ podaci.naslov }}</h1>

    <img :src="podaci.slika" />
    <h2>{{ podaci.naslov }}</h2>
    <p>{{ podaci.naslov }}</p>
    <div>{{ podaci.text }}</div>
  </div>
</template>
<script>
import { db } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore/lite";

export default {
  name: "recept_detail",
  data() {
    return {
      recept_id: "",
      podaci: {},
    };
  },
  async mounted() {
    this.recept_id = this.$route.params.recept_id;
    const receptRef = doc(db, "recepti", this.recept_id);
    let rezultat = await getDoc(receptRef);
    this.podaci = rezultat.data();
  },
};
</script>
