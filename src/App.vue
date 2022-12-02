<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>MEVN CRUD</v-toolbar-title>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app>

      <v-list
        nav
        dense>

        <v-list-item
          v-for="({to, text, icon}, i) in nav"
          :key="i"
          exact
          :to="to">

          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-4">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    nav: [
      {to: {name: 'home'}, text: 'Home', icon: 'mdi-home'},
      {to: {name: 'movies'}, text: 'Movies', icon: 'mdi-movie'},
      {to: {name: 'persons'}, text: 'Persons', icon: 'mdi-account'},
    ]
  }),
};
</script>
