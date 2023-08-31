<template>
  <v-container fill-height fill-width fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="600px" outlined>
          <h1>Detalji o {{ podaci.naslov }}</h1>
          <img :src="podaci.slika" />
          <v-card-text align="left" class="card-text-border">
            <div>Opis: {{ podaci.text }}</div>
            <div>Tip Nekretnine: {{ podaci.type }}</div>
            <div>Adresa: {{ podaci.address }}</div>
            <div>Lokacija: {{ podaci.location }}</div>
            <div>Cijena: {{ podaci.price }} €</div>
            <div>Kontakt: {{ podaci.email }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
<style scoped>
div {
  padding: 2%;
}
</style>
