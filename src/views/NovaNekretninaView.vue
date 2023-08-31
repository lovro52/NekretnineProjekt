<template>
  <v-container fill-height fill-width fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="600px" outlined>
          <v-card-text align="left" class="card-text-border">
            <div class="insert-page">
              <h1>Unesite informacije o nekretnini</h1>
              <form @submit.prevent="insertComponent">
                <label for="naslov">Naslov:</label>
                <input
                  type="text"
                  v-model="naslov"
                  id="naslov"
                  placeholder="Enter the value for Naslov"
                />
                <label for="email">email:</label>
                <input
                  type="text"
                  v-model="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <div>
                  <label for="type">Type:</label>
                  <select v-model="type" id="type">
                    <option value="Stan">Stan</option>
                    <option value="Kuca">Kuća</option>
                  </select>
                </div>

                <label for="address">Address:</label>
                <input
                  type="text"
                  v-model="address"
                  id="address"
                  placeholder="Enter the value for Address"
                />
                <label for="text">text:</label>
                <input
                  type="textbox"
                  v-model="text"
                  id="text"
                  placeholder="Enter the value for text"
                />

                <label for="price">price:</label>
                <input
                  type="number"
                  v-model="price"
                  id="price"
                  placeholder="Enter the value for price"
                />
                <div>
                  <label for="location">Location:</label>
                  <select v-model="location" id="location">
                    <option disabled value="">Select a location</option>
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
                    <option value="Karlovačka županija">
                      Karlovačka županija
                    </option>
                    <option value="Koprivničko-križevačka županija">
                      Koprivničko-križevačka županija
                    </option>
                    <option value="Krapinsko-zagorska županija">
                      Krapinsko-zagorska županija
                    </option>
                    <option value="Ličko-senjska županija">
                      Ličko-senjska županija
                    </option>
                    <option value="Međimurska županija">
                      Međimurska županija
                    </option>
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
                    <option value="Zagrebačka županija">
                      Zagrebačka županija
                    </option>
                  </select>
                </div>

                <div>
                  <label for="slika">Upload Image:</label>
                  <input type="file" id="slika" @change="handleImageChange" />
                  <img
                    v-if="slika"
                    :src="slika"
                    alt="Uploaded Image"
                    class="uploaded-image"
                  />
                  <button v-if="slika" @click="removeImage">
                    Remove Image
                  </button>
                </div>

                <button type="submit">Insert</button>
              </form>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      naslov: "",
      email: "",
      type: "",
      address: "",
      text: "",
      slika: null,
      location: null,
      price: null,
      user: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    handleImageChange(event) {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        this.slika = URL.createObjectURL(selectedImage);
      }
    },
    removeImage() {
      this.slika = null;
    },
    async insertComponent() {
      if (!this.user) {
        alert("Please log in to insert a component.");
        return;
      }
      // Create the component data using the input values
      const componentData = {
        naslov: this.naslov,
        email: this.email,
        type: this.type,
        address: this.address,
        text: this.text,
        slika: this.slika,
        location: this.location,
        price: this.price,
        userId: this.user.uid,
      };

      try {
        // Add the component data to Firestore
        const docRef = await addDoc(collection(db, "recepti"), componentData);
        console.log("Component inserted successfully with ID: ", docRef.id);
        alert("Component inserted successfully!");
        this.naslov = "";
        this.email = "";
        this.type = "";
        this.address = "";
        this.text = "";
        this.slika = null;
        this.location = null;
        this.price = null;
      } catch (error) {
        console.error("Error inserting component:", error);
        alert("An error occurred while inserting the component.");
      }
    },
  },
};
</script>

<style scoped>
.insert-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

label {
  display: block;
  margin-top: 10px;
}
.uploaded-image {
  max-width: 300px; /* Adjust the value as needed */
  max-height: 300px; /* Adjust the value as needed */
}
</style>
