<template>
    <v-card class="recept_card mx-auto" max-width="400">

        <v-img class="align-end text-white" height="200" :src="recept.slika" cover>
            <v-card-title class="recept_naslov"> {{ recept.naslov }}</v-card-title>
        </v-img>

        <v-card-text>
            <div>{{recept.naslov}}</div>

            <div>{{ recept.naslov }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange" :to="'/recepti/' + recept.id">
                Explore
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>

export default {
    name: "Nekretnina",
    props: ["recept"],
}

</script>