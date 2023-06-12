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
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Disconnect </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
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
        <v-btn text to="/Test">Contact us</v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { auth, onAuthStateChanged } from "@/firebase";
export default {
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
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
