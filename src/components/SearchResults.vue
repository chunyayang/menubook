<template>
  <div
    class="search-results"
    role="grid"
    aria-label="search_results"
  >
    <section v-if="errored">
      <v-alert
        type="error"
        outlined
      >Sorry, we're not able to retrieve the restaurant list at the moment. Please try back later.</v-alert>
    </section>

    <section v-else>
      <v-row role="row">
        <v-col
          v-for="store in stores"
          :key="store.id"
          cols="12"
          sm="6"
          md="4"
          role="gridcell"
          :aria-label="store.name"
        >
          <v-card
            :to="{name: 'menu', params: {id: store.id}}"
            flat
          >
            <v-img
              :src="require('../assets/' + store.imageUrl)"
              aspect-ratio="2"
            ></v-img>

            <v-card-title class="subtitle-1">{{ store.name }}</v-card-title>

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
                <span>・</span>
                <span>{{ store.priceLevel | formatPriceLevel }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import { getStores } from "@/api";
import storeFilters from "@/filters/storeFilters.js";
import { mdiStar } from "@mdi/js";

export default {
  filters: storeFilters,
  data() {
    return {
      stores: [],
      errored: false,
      svgStar: mdiStar
    };
  },
  created() {
    getStores()
      .then(response => {
        this.stores = response.data;
        this.$bus.$emit("scrollAfterUpdate");
      })
      .catch(() => {
        this.errored = true;
      });
  }
};
</script>

<style lang="scss">
.search-results .store-tag::after {
  content: "・";
}
.search-results .store-tag:last-child::after {
  content: "";
}
</style>
