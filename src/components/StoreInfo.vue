<template>
  <div>
    <section v-if="errored">
      <v-alert
        type="error"
        outlined
      >Sorry, we're not able to retrieve the restaurant information at the moment. Please try back later.</v-alert>
    </section>

    <section v-else>
      <v-card
        v-if="!loading"
        flat
        class="store-info"
      >
        <v-img
          :src="require('../assets/' + store.imageUrl)"
          aspect-ratio="2"
        ></v-img>

        <v-card-title class="pb-0">{{ store.name }}</v-card-title>

        <v-card-text>
          <div class="mb-1">
            <v-rating
              :value="store.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="18"
              class="d-inline-block"
            ></v-rating>
            <span class="ml-2 pr-1 font-weight-medium">{{ store.rating }}</span>
            <span>({{ store.ratingCount }})</span>
          </div>

          <div>
            <span class="middle-dot">{{ store.priceLevel | formatPriceLevel }}</span>
            <span
              v-for="tag in store.tags"
              :key="tag"
              class="middle-dot"
            >{{ tag }}</span>
          </div>
          <div>{{ store.address }}</div>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
import { getStoreDetails } from "@/api.js";
import storeFilters from "@/filters/storeFilters.js";
import { mdiStar } from "@mdi/js";

export default {
  filters: storeFilters,
  props: ["id"],
  data() {
    return {
      store: null,
      loading: true,
      errored: false,
      svgStar: mdiStar
    };
  },
  created() {
    getStoreDetails(this.id)
      .then(response => {
        this.store = response.data;
        this.loading = false;
      })
      .catch(() => {
        this.errored = true;
      });
  }
};
</script>

<style lang="scss">
.store-info .middle-dot::after {
  content: "・";
}
.store-info .middle-dot:last-child::after {
  content: "";
}
</style>>
