<template> 
  <div>
    <v-alert
      v-if="errored"
      type="error"      
    >
      We're sorry, we're not able to retrieve this information at the moment, please try back later
    </v-alert>

    <ul
      v-else
      class="d-flex flex-column flex-sm-row list"
    >
      <li
        v-for="store in stores"
        :key="store.id"
        class="flex sm6 px-sm-2"
      >
        <v-card flat>
          <v-img
            :src="require('../assets/' + store.imageUrl)"
            aspect-ratio="2"
          ></v-img>

          <v-card-title class="subtitle-1 pb-0">
            {{ store.name }}
          </v-card-title>

          <v-card-text>
            <div>
              <span class="pr-1">
                <v-icon
                  color="orange"
                  small
                >
                  {{ svgStar }}
                </v-icon>
              </span>
              <span class="pr-1 font-weight-medium">{{ store.rating }}</span>
              <span>({{ store.ratingCount }})</span>
              <span>&nbsp;&middot;&nbsp;</span>
              <span v-html="formatTags(store.tags)"></span>
            </div>

            <div>
              <span>{{ store.distance }}</span>
              <span>&nbsp;&middot;&nbsp;</span>
              <span>{{ formatPriceLevel(store.priceLevel) }}</span>
            </div>            
          </v-card-text>

        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { getStores } from '@/api.js'
import { mdiStar } from '@mdi/js'
import storeMixin from "../mixins/storeMixin"

export default {
  data () {
    return {
      stores: [],
      svgStar: mdiStar,
      errored: false      
    }
  },
  mounted () {
    getStores()
    .then(response => {
      this.stores = response.data
    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
  },
  mixins: [storeMixin]
}
</script>

<style lang="scss">
.list {
  list-style-type: none;
  padding: 0 !important;
}
</style>>
