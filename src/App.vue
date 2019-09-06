<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
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
      <StoreList/>
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
import StoreList from './components/StoreList'
import { mdiBasket } from '@mdi/js'

export default {
  name: 'App',
  components: {
    StoreList
  },
  data () {
    return {
      drawer: null,
      svgBasket: mdiBasket
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