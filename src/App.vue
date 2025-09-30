<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-app-bar-title text="Todo List GUI" />
      </v-app-bar>

      <v-navigation-drawer v-model="drawer">
        <v-list v-for="item in nav_items">
          <v-list-item :title="item.title" :to="item.to" />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const drawer = ref(false);
const nav_items = [
  {
    title: "タスク一覧",
    to: "/todos",
  },
];
</script>
