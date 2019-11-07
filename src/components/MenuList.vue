<template>
  <div class="menu-list">
    <v-tabs
      v-model="tabIndex"
      class="menu-list__tabs"
      @change="onChangeTab($event)"
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
        class="menu-list__category mb-6 py-4"
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
      loading: true,
      tabIndex: 0,
      categories: null,
      errored: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getStoreMenu(this.id)
        .then(response => {
          this.categories = response.data.categories;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
          this.loading = false;
        });
    },
    onChangeTab(index) {
      this.$root.$emit("tabScroll", index);
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
  top: 40px;
  z-index: 1;
}
</style>
