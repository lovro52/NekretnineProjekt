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

      <label for="type">Type:</label>
      <input
        type="text"
        v-model="type"
        id="type"
        placeholder="Enter the value for Type"
      />

      <label for="address">Address:</label>
      <input
        type="text"
        v-model="address"
        id="address"
        placeholder="Enter the value for Address"
      />

      <label for="number">Number:</label>
      <input
        type="number"
        v-model="number"
        id="number"
        placeholder="Enter the value for Number"
      />
      <label for="text">text:</label>
      <input
        type="text"
        v-model="text"
        id="text"
        placeholder="Enter the value for text"
      />
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

export default {
  data() {
    return {
      naslov: "",
      type: "",
      address: "",
      number: null,
      text: "",
      slika: null,
    };
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
      // Create the component data using the input values
      const componentData = {
        naslov: this.naslov,
        type: this.type,
        address: this.address,
        number: this.number,
        text: this.text,
        slika: this.slika,
      };

      try {
        // Add the component data to Firestore
        const docRef = await addDoc(collection(db, "recepti"), componentData);
        console.log("Component inserted successfully with ID: ", docRef.id);

        alert("Component inserted successfully!");
        this.naslov = "";
        this.type = "";
        this.address = "";
        this.number = null;
        this.text = "";
        this.slika = null;
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
