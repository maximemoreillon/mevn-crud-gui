<template>
  <v-app>
    <v-app-bar
      color="primary"
      theme="dark" >

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>


      <v-toolbar-title>MEVN CRUD</v-toolbar-title>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer">

      <v-list
        nav
        dense>

        <v-list-item
          v-for="({to, text, icon}, i) in nav"
          :key="i"
          exact
          :to="to"
          :title="text"
          :prepend-icon="icon" />


      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-4">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script lang="js">

export default {
  name: 'App',

  data(){
    return {
      drawer: false,
      nav: [
        { to: { name: 'home' }, text: 'Home', icon: 'mdi-home' },
        { to: { name: 'movies' }, text: 'Movies', icon: 'mdi-movie' },
        { to: { name: 'persons' }, text: 'Persons', icon: 'mdi-account' },
      ]
    }
    
  },
};
</script>