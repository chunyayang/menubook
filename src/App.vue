<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item href="/">
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="/about">
          <v-list-item-icon>
            <v-icon>{{ svgHelpBox }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="white"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn
        href="/"
        aria-label="JustMeals"
        text
        color="primary"
        class="title font-weight-regular text-none"
      >JustMeals</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer
      color="blue-grey darken-3"
      dark
    >
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiBasket, mdiHelpBox } from "@mdi/js";

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      svgBasket: mdiBasket,
      svgHelpBox: mdiHelpBox
    };
  }
};
</script>

<style lang="scss">
</style>
