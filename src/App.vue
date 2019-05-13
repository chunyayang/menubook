<template>
  <v-app>
    <v-toolbar app>
      <v-btn icon value="settings">
        <v-icon large>person_outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        <span>Ordergo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon value="search" >
        <v-icon large>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      app
    >
      <v-btn
        color="amber darken-4"
        flat
        value="home"
      >
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        color="amber darken-4"
        flat
        value="favorites"
      >
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="amber darken-4"
        flat
        value="nearby"
      >
        <v-icon>shopping_cart</v-icon>
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
