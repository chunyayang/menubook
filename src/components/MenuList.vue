<template>
  <div class="menu-list">
    <v-tabs
      v-model="tabIndex"
      class="menu-list__tabs"
      color="amber darken-3"
      @change="onTabChange($event)"
    >
      <v-tab
        v-for="menu in menuList"
        :key="menu.name"
      >{{ menu.name }}</v-tab>
    </v-tabs>

    <VerticalTabPanels
      v-model="tabIndex"
      tabPanelClass="menu-list__menu"
    >
      <v-card
        v-for="menu in menuList"
        :key="menu.name"
        class="menu-list__menu my-6 mx-2 py-4"
        outlined
      >
        <v-card-title>{{ menu.name }}</v-card-title>
        <v-list three-line>
          <template v-for="item in menu.items">
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
    </VerticalTabPanels>
  </div>
</template>

<script>
import VerticalTabPanels from "@/components/ui/VerticalTabPanels";
import { getStoreMenuList } from "@/api.js";

export default {
  components: {
    VerticalTabPanels
  },
  props: ["id"],
  data() {
    return {
      tabIndex: 0,
      menuList: []
    };
  },
  created() {
    getStoreMenuList(this.id)
      .then(response => {
        this.menuList = response.data.categories;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onTabChange(index) {
      this.$root.$emit("scrollToTabPanel", index);
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
@media (hover: none) {
  .menu-list__tabs .v-tab:hover::before {
    opacity: 0 !important;
  }
}
</style>
