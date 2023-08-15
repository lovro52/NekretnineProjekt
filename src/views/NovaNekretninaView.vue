<template>
  <div class="insert-page">
    <h1>Insert Component into Firebase</h1>
    <form @submit.prevent="insertComponent">
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
      type: "",
      address: "",
      number: null,
    };
  },
  methods: {
    async insertComponent() {
      // Create the component data using the input values
      const componentData = {
        type: this.type,
        address: this.address,
        number: this.number,
      };

      try {
        // Add the component data to Firestore
        const docRef = await addDoc(
          collection(db, "components"),
          componentData
        );
        console.log("Component inserted successfully with ID: ", docRef.id);

        alert("Component inserted successfully!");
        this.type = "";
        this.address = "";
        this.number = null;
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
</style>
