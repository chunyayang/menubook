<template>
  <v-app>
    <v-toolbar
      app
      dense
      flat
      color="white"
    >
      <v-btn
        icon
        value="settings"
      >
        <v-icon medium>person_outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <h1>
        <v-btn
          flat
          href="/"
          class="headline text-none font-weight-medium"
        >
        Ordergo
        </v-btn>
      </h1>
      <v-spacer></v-spacer>
      <v-btn
        icon
        value="search" 
      >
        <v-icon medium>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      class="elevation-0"
      app
    >
      <v-btn
        color="amber darken-4"
        flat
        value="home"
      >
        <span>Home</span>
        <v-icon medium>home</v-icon>
      </v-btn>

      <v-btn
        color="amber darken-4"
        flat
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon medium>favorite_border</v-icon>
      </v-btn>

      <v-btn
        color="amber darken-4"
        flat
        value="nearby"
      >
        <span>Orders</span>
        <v-icon medium>shopping_cart</v-icon>
      </v-btn>
    </v-bottom-nav>
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
