<template>
  <div class="menu-list">
    <v-tabs class="menu-list__tabs">
      <v-tab
        v-for="(category, index) in menuList"
        :key="category.name"
        :to="'#menu-list__category-'+index"
        :ripple="false"
      >{{ category.name }}</v-tab>
    </v-tabs>
    <v-card
      v-for="(category, index) in menuList"
      :key="category.name"
      :id="'menu-list__category-'+index"
      outlined
      class="mb-6"
    >
      <v-card-text class="px-0">
        <v-card-title>{{ category.name }}</v-card-title>
        <ul>
          <li
            v-for="item in category.items"
            :key="item.itemId"
          >
            <v-divider />
            <MenuListItem
              :id="item.itemId"
              :name="item.name"
              :description="item.description"
              :price="item.price"
              :isActive="item.isActive"
            />
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import MenuListItem from "@/components/MenuListItem.vue";
import { getStoreMenu } from "@/api.js";

export default {
  components: {
    MenuListItem
  },
  props: ["id"],
  data() {
    return {
      loading: true,
      tab: 0,
      menuList: null,
      errored: false
    };
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getStoreMenu(this.id)
        .then(response => {
          this.menuList = response.data.categories;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.menu-list ul {
  list-style-type: none;
  padding: 0;
}
.menu-list li {
  padding: 0 16px;
}
.menu-list .menu-list__tabs {
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
  z-index: 1;
}
</style>
