<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Nekretnine
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
      <v-btn text to="/profile">Profile</v-btn>
      <v-btn text to="/Nekretnine">Nekretnine</v-btn>
      <v-btn text to="/Test">Test</v-btn>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
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
export default {
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Contact Us',
    ],
  }),
}
</script>