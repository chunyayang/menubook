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

        <v-card-title class="subtitle-1 pb-0">{{ store.name }}</v-card-title>

        <v-card-text>
          <div>
            <span class="pr-1">
              <v-icon
                color="orange"
                small
              >{{ svgStar }}</v-icon>
            </span>
            <span class="pr-1 font-weight-medium">{{ store.rating }}</span>
            <span>({{ store.ratingCount }})&nbsp;</span>
            <span
              v-for="tag in store.tags"
              :key="tag"
              class="store-tag"
            >{{ tag }}</span>
          </div>

          <div>
            <span>{{ store.distance }}</span>
            <span>&nbsp;·&nbsp;</span>
            <span>{{ store.priceLevel | formatPriceLevel }}</span>
          </div>
          <div>{{ store.phone }}</div>
          <div>{{ store.address }}</div>
          <div>{{ store.openingHours }}</div>
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
.store-info .store-tag::after {
  content: "・";
}
.store-info .store-tag:last-child::after {
  content: "";
}
</style>>
