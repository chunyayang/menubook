<template>
  <div
    role="grid"
    aria-label="search_results"
  >
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
                class="tag"
              >{{ tag }}</span>
            </div>

            <div>
              <span>{{ store.distance }}</span>
              <span>・</span>
              <span>{{ formatPriceLevel(store.priceLevel) }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getStores } from "@/api";
import { mdiStar } from "@mdi/js";
import storeMixin from "@/mixins/storeMixin";

export default {
  mixins: [storeMixin],
  data() {
    return {
      loading: true,
      stores: [],
      svgStar: mdiStar
    };
  },
  created() {
    getStores()
      .then(response => {
        this.stores = response.data;
        this.$root.$emit("scrollAfterUpdate");
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
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
