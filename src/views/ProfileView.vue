<template>
  <v-container fill-height fluid class="background">
    <v-avatar color="primary" size="56">
      <v-icon dark> mdi-account-circle </v-icon>
    </v-avatar>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="card-border" width="600px" outlined>
          <v-card-title align="left">PROFILE</v-card-title>
          <v-card-subtitle align="left">
            Here you can change your password or update your info:
          </v-card-subtitle>
          <v-card-text class="card-text-border">
            <v-form v-model="valid">
              <v-text-field
                v-model="firstName"
                dense
                label="Name"
                clearble
                type="text"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                dense
                label="Last Name"
                clearble
                type="text"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="email"
                dense
                label="Email"
                clearble
                type="text"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="newPassword"
                dense
                label="Password"
                clearble
                :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showIcon ? 'text' : 'password'"
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn
              :disabled="
                isChangePassButtonDisabled || newPassword == null || !valid
              "
              outlined
              @click="changePassword"
            >
              CHANGE PASSWORD
            </v-btn>
            <v-btn
              :disabled="isOkButtonDisabled || isUserDataSame"
              :loading="!hasDataArrived"
              outlined
            >
              OK
            </v-btn>
            <v-btn @click="logout" outlined> SignOut </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions class="card-actions">
            <v-btn color="secondary" elevation="3" @click="goToNovaNekretnina"
              >dodajte nekretninu</v-btn
            >
            <v-btn color="secondary" elevation="3" @click="performSearchOnClick"
              >Pogledajte svoje nekretnine</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  doc,
  db,
  getDoc,
  auth,
  onAuthStateChanged,
  updatePassword,
  signOut,
} from "../firebase.js";
import { ref } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
export default {
  name: "ProfileView",
  components: {},
  watch: {
    newPassword: function (hasValue) {
      if (hasValue) {
        this.isChangePassButtonDisabled = false;
      } else {
        this.isChangePassButtonDisabled = true;
      }
    },
    firstName: {
      handler: function (newValue) {
        this.compareFormData(newValue);
      },
      deep: true,
    },
    lastName: {
      handler: function (newValue) {
        this.compareFormData(newValue);
      },
      deep: true,
    },
    email: {
      handler: function (newValue) {
        this.compareFormData(newValue);
      },
      deep: true,
    },
  },
  data() {
    return {
      valid: null,
      user: null,
      firstName: null,
      lastName: null,
      email: null,
      newPassword: null,
      compareData: null,
      userData: null,
      hasDataArrived: false,
      isOkButtonDisabled: false,
      isUserDataSame: true,
      isChangePassButtonDisabled: true,
      showIcon: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v?.length >= 6 || "Min 6 characters",
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      },
    };
  },
  methods: {
    goToNovaNekretnina() {
      this.$router.push("/NovaNekretnina"); // Navigate to the specified path
    },
    goToMojeNekretnine() {
      this.$router.push({
        name: "about",
        query: { email: "user.email" },
      }); // Navigate to the specified path
    },
    logout() {
      signOut(auth)
        .then(() => {
          // User signed out successfully
          // Perform any additional logic or navigation here
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          // Handle logout error if necessary
          console.log("Logout error", error);
        });
    },
    compareFormData() {
      if (
        this.userData.FirstName == this.firstName &&
        this.userData.LastName == this.lastName &&
        this.userData.Email == this.email
      ) {
        this.isUserDataSame = true;
      } else {
        this.isUserDataSame = false;
      }
    },
    async getUserData(email) {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        this.userData = data;
        this.firstName = this.userData.FirstName;
        this.lastName = this.userData.LastName;
        this.email = this.userData.Email;

        this.hasDataArrived = true;
      } else {
        this.hasDataArrived = false;
      }
    },
    changePassword() {
      if (this.newPassword == null || this.valid != true) {
        return;
      }
      this.isChangePassButtonDisabled = true;
      updatePassword(this.user, this.userData.newPassword)
        .then(() => {
          this.isChangePassButtonDisabled = false;
          console.log("Password updated successfully");
        })
        .catch((error) => {
          this.isChangePassButtonDisabled = false;
          //TODO: handle auth/requires-recent-login
          console.log("Password update error ", error);
        });
    },
  },
  setup() {
    const searchResults = ref([]);

    const performSearch = async (searchTerm) => {
      const q = query(
        collection(db, "recepti"),
        where("email", "==", searchTerm) // Adjust field name if needed
      );
      try {
        const querySnapshot = await getDocs(q);
        searchResults.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          naslov: doc.data().naslov,
          slika: doc.data().slika,
          type: doc.data().type,
          // Add other fields you want to display
        }));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const performSearchOnClick = () => {
      performSearch("luka.@gmail.com"); // Replace with the desired email address
    };

    return {
      searchResults,
      performSearchOnClick,
    };
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        this.getUserData(user.email);
      } else {
        // User is signed out
        // ...
      }
    });
  },
  created() {
    console.log(this.userDataArrived);
  },
  mounted() {
    console.log(this.userDataArrived);
  },
  destroyed() {},
};
</script>
