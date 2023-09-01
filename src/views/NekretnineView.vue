<template>
  <v-container fill-height fill-width fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="900px" outlined>
          <v-card-text align="left" class="card-text-border">
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
              <v-divider></v-divider>

              <!-- Price range filter -->
              <label>Price Range:</label><v-spacer></v-spacer>
              <input type="number" v-model="minPrice" placeholder="Min Price" />
              <input type="number" v-model="maxPrice" placeholder="Max Price" />
              <v-divider></v-divider>
              <!-- Location filter -->
              <label>Location:</label>
              <select v-model="selectedLocation">
                <option value="">All</option>
                <!-- Add more options for other locations -->
                <option value="Bjelovarsko-bilogorska županija">
                  Bjelovarsko-bilogorska županija
                </option>
                <option value="Brodsko-posavska županija">
                  Brodsko-posavska županija
                </option>
                <option value="Dubrovačko-neretvanska županija">
                  Dubrovačko-neretvanska županija
                </option>
                <option value="Istarska županija">Istarska županija</option>
                <option value="Karlovačka županija">Karlovačka županija</option>
                <option value="Koprivničko-križevačka županija">
                  Koprivničko-križevačka županija
                </option>
                <option value="Krapinsko-zagorska županija">
                  Krapinsko-zagorska županija
                </option>
                <option value="Ličko-senjska županija">
                  Ličko-senjska županija
                </option>
                <option value="Međimurska županija">Međimurska županija</option>
                <option value="Osječko-baranjska županija">
                  Osječko-baranjska županija
                </option>
                <option value="Požeško-slavonska županija">
                  Požeško-slavonska županija
                </option>
                <option value="Primorsko-goranska županija">
                  Primorsko-goranska županija
                </option>
                <option value="Šibensko-kninska županija">
                  Šibensko-kninska županija
                </option>
                <option value="Sisačko-moslavačka županija">
                  Sisačko-moslavačka županija
                </option>
                <option value="Splitsko-dalmatinska županija">
                  Splitsko-dalmatinska županija
                </option>
                <option value="Varaždinska županija">
                  Varaždinska županija
                </option>
                <option value="Virovitičko-podravska županija">
                  Virovitičko-podravska županija
                </option>
                <option value="Vukovarsko-srijemska županija">
                  Vukovarsko-srijemska županija
                </option>
                <option value="Zadarska županija">Zadarska županija</option>
                <option value="Zagrebačka županija">Zagrebačka županija</option>
              </select>
              <v-divider></v-divider>

              <div
                v-for="nekretnina in filteredNekretnine"
                :key="nekretnina.id"
              >
                <Nekretnina :recept="nekretnina" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
