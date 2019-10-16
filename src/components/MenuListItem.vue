<template>
  <v-list-item class="menu-list-item">
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    description: String,
    price: Number, //TODO: change to String, use bignumber.js to compute.
    isActive: Boolean
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
