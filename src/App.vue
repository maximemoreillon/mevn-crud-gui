<template>
  <v-app>
    <v-app-bar
      app
      dark >

      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-app-bar-title>CRUD example</v-app-bar-title>



    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app >
      <!-- What is this nav ting? -->
      <v-list
        nav >
        <v-list-item
          v-for="item in nav"
          :key="item.title"
          :to="item.to"
          exact>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>



    <v-main class="grey lighten-4">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: null,
    nav: [
      { title: 'Home', icon: 'mdi-home', to: {name: 'home'}},
      { title: 'Items', icon: 'mdi-format-list-bulleted', to: {name: 'items'}},
      { title: 'About', icon: 'mdi-help-box', to: {name: 'about'} },
    ],
  }),
};
</script>
