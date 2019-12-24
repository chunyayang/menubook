<template>
  <v-card
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
        <span>{{ formatPriceLevel(store.priceLevel) }}</span>
      </div>
      <div>{{ store.phone }}</div>
      <div>{{ store.address }}</div>
      <div>{{ store.openingHours }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { getStoreDetails } from "@/api.js";
import storeMixin from "@/mixins/storeMixin.js";
import { mdiStar } from "@mdi/js";

export default {
  mixins: [storeMixin],
  props: ["id"],
  data() {
    return {
      store: null,
      svgStar: mdiStar
    };
  },
  created() {
    getStoreDetails(this.id)
      .then(response => {
        this.store = response.data;
      })
      .catch(error => {
        console.log(error);
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
