<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Nekretnine </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn v-if="!currentUser" text to="/login">Login</v-btn>
      <v-btn v-if="!currentUser" text to="/register">Register</v-btn>
      <v-btn text to="/profile">Profile</v-btn>
      <v-btn text to="/Nekretnine">Nekretnine</v-btn>
      <v-btn text to="/Test">Test</v-btn>
      <v-menu bottom min-width="200px" rounded offset-y> </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <div v-if="currentUser">
        <p>Logged in as: {{ currentUser.email }}</p>
      </div>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/AboutUs">About Us</v-btn>
        <v-btn text to="/NovaNekretnina">Contact us</v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { auth, onAuthStateChanged } from "@/firebase";
export default {
  data: () => ({
    links: ["Home", "About Us", "Contact Us"],
    currentUser: null,
  }),

  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user; // Set the currently logged-in user
      } else {
        this.currentUser = null; // User is signed out
      }
    });
  },
};
</script>
