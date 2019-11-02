<template>
  <v-container
    class="menu-list__categories"
    v-scroll="onScroll"
  >
    <v-card
      v-for="category in categories"
      :key="category.name"
      :class="[`${categoryClass} mb-6 py-4`]"
      outlined
    >
      <h2 class="headline pa-4">{{ category.name }}</h2>
      <ul class="pa-0">
        <li
          v-for="item in category.items"
          :key="item.itemId"
          class="px-4"
        >
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1 mt-2">${{ item.price }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </li>
      </ul>
    </v-card>
  </v-container>
</template>

<script>
export default {
  model: {
    prop: "tabIndex",
    event: "change"
  },
  props: {
    categories: Array,
    tabIndex: {
      type: Number,
      default: 0
    },
    tabBarHeight: {
      type: Number,
      default: 40
    },
    categoryClass: {
      type: String,
      default: "menu-list__category"
    }
  },
  data() {
    return {
      categoryTops: []
    };
  },
  updated() {
    this.categoryTops = getCategoryTops(this.categoryClass);
  },
  methods: {
    onScroll() {
      // Only change the active tab when the scrolling is performed by the user.
      if (this.inTransition) {
        return;
      }

      const index = getCurrentCategoryIndex(this.categoryTops, this.tabBarHeight);

      if (index !== this.tabIndex) {
        // Update the v-model value shared with tabs
        this.$emit("change", index);
      }
    }
  }
};

/**
 * Get each DOM element's offsetTop
 * @param {String} selector - CSS class selector
 * @returns {Array} an array of offsetTop numbers
 */
function getCategoryTops(selector) {
  if(!selector) {
    return [];
  }
  const elements = document.querySelectorAll(`.${selector}`);
  let offsetTops = [];

  elements.forEach(function(element, i) {
    offsetTops[i] = element.offsetTop;
  });

  return offsetTops;
}

/**
 * Given a series of DOM elements sharing the same CSS class selector,
 * calculate the element which the user currently scrolls to.
 * 
 * NOTE: It assumes the elements are visually connectd to each other,
 * without overlaps and gaps between the borders.
 * 
 * @param {Array} offsetTops - an array of each element's offsetTop position
 * @param {Number} offset - an adjustment to each offsetTop
 */
function getCurrentCategoryIndex(offsetTops, offset = 0) {
  let index = 0;

  // find out which scroll item the document is scrolled to
  index = offsetTops.findIndex(function(top, i) {
    let scrollY = window.scrollY;
    let nextTop = offsetTops[i + 1] - offset;
    top = top - offset;

    if (i === offsetTops.length - 1) {
      return scrollY >= top;
    }

    return scrollY >= top && scrollY < nextTop;
  });

  // The first tab stays active when the window.scrollY
  // is above the first scroll item.
  return index < 0 ? 0 : index;
}
</script>

<style lang="scss">
.menu-list__categories ul {
  list-style-type: none;
}
</style>
