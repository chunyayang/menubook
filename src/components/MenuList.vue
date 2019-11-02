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

    <MenuListCategories
      v-model="tabIndex"
      :categories="categories"
    />
  </div>
</template>

<script>
import MenuListCategories from "@/components/MenuListCategories";
import { getStoreMenu } from "@/api.js";

export default {
  components: {
    MenuListCategories
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
      this.$root.$emit("tabClick", index);
    }
  }
};
</script>

<style lang="scss">
.menu-list__tabs {
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
  z-index: 1;
}
</style>
