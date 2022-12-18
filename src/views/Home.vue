<template>
  <v-card>
    <v-card-title>Home</v-card-title>
    <v-card-text>
      This is an example application built using the MEVN tech stack.
      It manages <router-link :to="{ name: 'persons'}">persons</router-link> and <router-link :to="{ name: 'movies'}">movies</router-link>.
    </v-card-text>


  </v-card>
</template>

<script lang="js">
export default {
  name: 'Home',
}
</script>
