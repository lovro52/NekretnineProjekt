<template>
  <div class="insert-page">
    <h1>Insert Component into Firebase</h1>
    <form @submit.prevent="insertComponent">
      <label for="naslov">Naslov:</label>
      <input
        type="text"
        v-model="naslov"
        id="naslov"
        placeholder="Enter the value for Naslov"
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
        <button v-if="slika" @click="removeImage">Remove Image</button>
      </div>

      <button type="submit">Insert</button>
    </form>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      naslov: "",
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
  max-width: 800px;
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
