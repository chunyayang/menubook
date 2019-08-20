<template>
  <v-app>
    <v-app-bar dense flat>
      <v-btn value="settings" icon text>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title>
        <v-btn
          depressed
          text
          href="/"
          class="headline text-none font-weight-medium"
        >
        Ordergo
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn value="search" icon text>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>

    <v-bottom-navigation
      v-model="bottomNav"
      app
      grow
      color="amber darken-4"
      class="elevation-0"
    >
      <v-btn value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span>Favorites</span>
        <v-icon>favorite_border</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>Orders</span>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      bottomNav: 'home'
    }
  }
}
</script>
