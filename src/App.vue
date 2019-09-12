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

    <v-app-bar app dense flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title>
        <v-btn
          depressed
          text
          href="/"
          aria-label="Ordergo"
          class="headline text-none font-weight-medium logo"
        >
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn value="cart" icon text>
        <v-icon>{{ svgBasket }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
      color="blue-grey darken-3"
      dark
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiBasket, mdiHelpBox } from '@mdi/js'

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      svgBasket: mdiBasket,
      svgHelpBox: mdiHelpBox
    }
  }
}
</script>

<style lang="scss">
.logo {
  background-image: url('./assets/logo.png');
  width: 131px;
}
</style>
