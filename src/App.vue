<template>
  <v-app>
    <v-app-bar color="primary lighten-1" app>
      <v-toolbar-title>Nekretnine4U</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" rounded class="my-2" text to="/">Home</v-btn>
      <v-btn
        color="white"
        rounded
        class="my-2"
        v-if="!currentUser"
        text
        to="/login"
        >Login</v-btn
      >
      <v-btn
        color="white"
        rounded
        class="my-2"
        v-if="!currentUser"
        text
        to="/register"
        >Register</v-btn
      >
      <v-btn color="white" rounded class="my-2" text to="/profile"
        >Profile</v-btn
      >
      <v-btn color="white" rounded class="my-2" text to="/Nekretnine"
        >Nekretnine</v-btn
      >
      <v-menu bottom min-width="200px" rounded offset-y> </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <div v-if="currentUser">
        <p>Logged in as: {{ currentUser.email }}</p>
      </div>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-card
        width="100%"
        class="primary lighten-1 py-4 text-center white--text"
      >
        <v-card-text class="white--text pt-0">
          Powered by Lovro Luka Matan, ChatGpt and some dumb luck
        </v-card-text>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Programsko</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { auth, onAuthStateChanged } from "@/firebase";
export default {
  data: () => ({
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
