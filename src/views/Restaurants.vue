<template>
  <div class="store-list">
    <v-alert
      v-if="errored"
      type="error"
    >We're sorry, we're not able to retrieve this information at the moment, please try back later</v-alert>

    <ul
      v-else
      class="d-flex flex-column flex-sm-row list"
    >
      <li
        v-for="store in stores"
        :key="store.id"
        class="flex sm6 px-sm-2"
      >
        <StoreInfo
          :id="store.id"
          :imageUrl="store.imageUrl"
          :name="store.name"
          :rating="store.rating"
          :ratingCount="store.ratingCount"
          :tags="store.tags"
          :distance="store.distance"
          :priceLevel="store.priceLevel"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import StoreInfo from "@/components/StoreInfo.vue";
import { getStores } from "@/api.js";

export default {
  components: {
    StoreInfo
  },
  data() {
    return {
      stores: [],
      errored: false
    };
  },
  created() {
    getStores()
      .then(response => {
        this.stores = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  }
};
</script>

<style lang="scss">
.store-list .list {
  list-style-type: none;
  padding: 0 !important;
}
</style>>
