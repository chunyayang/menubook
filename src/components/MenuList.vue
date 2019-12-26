<template>
  <div class="menu-list">
    <v-tabs
      v-model="tabIndex"
      class="menu-list__tabs"
      color="amber darken-3"
      @change="onTabChange($event)"
    >
      <v-tab
        v-for="category in categories"
        :key="category.name"
      >{{ category.name }}</v-tab>
    </v-tabs>

    <TabItems
      v-model="tabIndex"
      tabItemClass="menu-list__category"
    >
      <v-card
        v-for="category in categories"
        :key="category.name"
        class="menu-list__category my-6 mx-2 py-4"
        outlined
      >
        <v-card-title>{{ category.name }}</v-card-title>
        <v-list three-line>
          <template v-for="item in category.items">
            <v-list-item :key="item.itemId">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                <v-list-item-subtitle class="mt-2">${{ item.price }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </TabItems>
  </div>
</template>

<script>
import TabItems from "@/components/ui/TabItems";
import { getStoreMenu } from "@/api.js";

export default {
  components: {
    TabItems
  },
  props: ["id"],
  data() {
    return {
      tabIndex: 0,
      categories: []
    };
  },
  created() {
    getStoreMenu(this.id)
      .then(response => {
        this.categories = response.data.categories;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onTabChange(index) {
      this.$root.$emit("scrollTabItems", index);
    }
  }
};
</script>

<style lang="scss">
.menu-list ul {
  list-style-type: none;
}
.menu-list__tabs {
  position: sticky;
  position: -webkit-sticky;
  top: 56px;
  z-index: 1;
}
</style>
