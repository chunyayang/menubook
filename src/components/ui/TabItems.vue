<template>
  <v-container
    class="tab-items pa-0"
    v-scroll="onScroll"
  >
    <slot></slot>
  </v-container>
</template>

<script>
/**
 * TabItems is a custom UI component designed to use as
 * a pair with a tab bar. Elements inside <slot></slot>
 * should be a series of content blocks. TabItems helps 
 * the user-- 
 * 1. scroll the document to the corresponding content 
 * block, after clicking any tab of the tab bar.
 * 2. change the active tab while scrolling through the 
 * content blocks.
 */
export default {
  model: {
    prop: "tabIndex",
    event: "change"
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    },
    tabBarHeight: {
      type: Number,
      default: 56
    },
    tabItemClass: {
      type: String,
      default: "tab-item"
    },
    vScrollDuration: {
      type: Number,
      default: 400
    },
    vScrollOffset: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      inTransition: false,
      itemOffsetTops: []
    };
  },
  mounted() {
    this.$root.$on("scrollTabItems", index => {
      this.scrollToItemAt(index);
    });
  },
  updated() {
    this.itemOffsetTops = getItemOffsetTops(this.tabItemClass);
  },
  beforeDestroy() {
    this.$root.$off("scrollTabItems");
  },
  methods: {
    /**
     * Change the active tab on page scrolling.
     */
    onScroll() {
      // Do nothing when the scrolling is not performed by the user.
      if (this.inTransition) {
        return;
      }

      const itemIndex = getScrollItemIndex(
        this.itemOffsetTops,
        this.tabBarHeight
      );

      if (itemIndex !== this.tabIndex) {
        // Update the v-model value shared with the tab bar.
        this.$emit("change", itemIndex);
      }
    },
    /**
     * Scroll the page to the (index + 1)-th tab item.
     */
    scrollToItemAt(index) {
      if (typeof index != "number" || index >= this.itemOffsetTops.length) {
        return;
      }
      const target = `.${this.tabItemClass}:nth-child(${index + 1})`;
      const options = {
        duration: this.vScrollDuration,
        offset: this.vScrollOffset
      };

      // To distinguish the tab-click triggered scroll effect
      // from the regular user scrolling.
      this.inTransition = true;

      // Scroll to the target with a transition effect.
      this.$vuetify.goTo(target, options);

      setTimeout(() => {
        this.inTransition = false;
      }, options.duration);
    }
  }
};

/**
 * Get each tab item's offsetTop.
 * @param {String} className - the class name shared by all the tab items
 * @returns {Array} an array of offsetTop numbers
 */
function getItemOffsetTops(className) {
  if (!className) {
    return [];
  }
  const items = document.querySelectorAll(`.${className}`);
  let offsetTops = [];

  items.forEach(function(item, i) {
    offsetTops[i] = item.offsetTop;
  });

  return offsetTops;
}

/**
 * Get the index of the tab item which the user scrolls to.
 *
 * NOTE: It assumes the tab items are visually connectd to each other,
 * without overlaps or gaps.
 *
 * @param {Array} offsetTops - an array of each tab item's offsetTop
 * @param {Number} offset - a positive/negative number to artificially adjust
 * the position of window.scrollY.
 */
function getScrollItemIndex(offsetTops, offset = 0) {
  let index = 0;

  index = offsetTops.findIndex(function(top, i) {
    let scrollY = window.scrollY + offset;

    if (i === offsetTops.length - 1) {
      return scrollY >= top;
    }

    return scrollY >= top && scrollY < offsetTops[i + 1];
  });

  // The first tab stays active when the window.scrollY
  // is above the first scroll item.
  return index < 0 ? 0 : index;
}
</script>

