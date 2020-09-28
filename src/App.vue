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

    <v-main>
      <v-app-bar
        flat
        color="white"
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

      <router-view />
    </v-main>

    <v-bottom-navigation
      :value="navigation"
      app
      color="primary"
    >
      <v-btn href="/">
        <span>Home</span>
        <v-icon>{{ svgHome }}</v-icon>
      </v-btn>

      <v-btn>
        <span>Order</span>
        <v-icon>{{ svgClipboardEditOutline }}</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>{{ svgHeart }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import {
  mdiClipboardEditOutline,
  mdiHelpBox,
  mdiHeart,
  mdiHome,
} from "@mdi/js";

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      navigation: 0,
      svgClipboardEditOutline: mdiClipboardEditOutline,
      svgHelpBox: mdiHelpBox,
      svgHeart: mdiHeart,
      svgHome: mdiHome,
    };
  },
};
</script>

<style lang="scss">
</style>
