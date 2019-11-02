<template>
  <v-container
    class="menu-list__categories"
  >
    <v-card
      v-for="category in categories"
      :key="category.name"
      outlined
    >
      <h2 class="headline pa-4">{{ category.name }}</h2>
      <ul class="pa-0">
        <li
          v-for="item in category.items"
          :key="item.itemId"
          class="px-4"
        >
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1 mt-2">${{ item.price }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </li>
      </ul>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    categories: Array
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
.menu-list__categories ul {
  list-style-type: none;
}
</style>
