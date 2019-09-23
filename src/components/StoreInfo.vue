<template>
  <v-card
    :to="'/menu/' + id"
    flat
    class="store-info"
  >
    <v-img
      :src="require('../assets/' + imageUrl)"
      aspect-ratio="2"
    ></v-img>

    <v-card-title class="subtitle-1 pb-0">{{ name }}</v-card-title>

    <v-card-text>
      <div>
        <span class="pr-1">
          <v-icon
            color="orange"
            small
          >{{ svgStar }}</v-icon>
        </span>
        <span class="pr-1 font-weight-medium">{{ rating }}</span>
        <span>({{ ratingCount }})&nbsp;</span>
        <span
          v-for="tag in tags"
          :key="tag"
          class="tag"
        >{{ tag }}</span>
      </div>

      <div>
        <span>{{ distance }}</span>
        <span>・</span>
        <span>{{ formatPriceLevel(priceLevel) }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import storeMixin from "../mixins/storeMixin";
import { mdiStar } from "@mdi/js";

export default {
  mixins: [storeMixin],
  props: {
    id: Number,
    imageUrl: String,
    name: String,
    rating: String,
    ratingCount: Number,
    tags: Array,
    distance: String,
    priceLevel: Number
  },
  data() {
    return {
      svgStar: mdiStar
    };
  }
};
</script>

<style lang="scss">
.store-info .tag::after {
  content: "・";
}
.store-info .tag:last-child::after {
  content: "";
}
</style>
