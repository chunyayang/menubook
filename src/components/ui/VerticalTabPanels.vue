<template>
  <v-container
    class="vertical-tab-panels pa-0"
    v-scroll="onScroll"
  >
    <slot></slot>
  </v-container>
</template>

<script>
/**
 * TabPanels is a custom UI component designed to use as
 * a pair with a tab bar. Elements inside <slot></slot>
 * should be a series of content blocks. TabPanels helps 
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
    tabPanelClass: {
      type: String,
      default: "tab-panel"
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
      panelOffsetTops: []
    };
  },
  mounted() {
    this.$root.$on("scrollToTabPanel", index => {
      this.scrollToPanelAt(index);
    });
  },
  updated() {
    this.panelOffsetTops = getPanelOffsetTops(this.tabPanelClass);
  },
  beforeDestroy() {
    this.$root.$off("scrollToTabPanel");
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

      const panelIndex = getScrollPanelIndex(
        this.panelOffsetTops,
        this.tabBarHeight
      );

      if (panelIndex !== this.tabIndex) {
        // Update the v-model value shared with the tab bar.
        this.$emit("change", panelIndex);
      }
    },
    /**
     * Scroll the page to the (index + 1)-th tab panel.
     */
    scrollToPanelAt(index) {
      if (typeof index != "number" || index >= this.panelOffsetTops.length) {
        return;
      }
      const target = `.${this.tabPanelClass}:nth-child(${index + 1})`;
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
 * Get each tab panel's offsetTop.
 * @param {String} className - the class name shared by all the tab panels
 * @returns {Array} an array of offsetTop numbers
 */
function getPanelOffsetTops(className) {
  if (!className) {
    return [];
  }
  const panels = document.querySelectorAll(`.${className}`);
  let offsetTops = [];

  panels.forEach(function(panel, i) {
    offsetTops[i] = panel.offsetTop;
  });

  return offsetTops;
}

/**
 * Get the index of the tab panel which the user scrolls to.
 *
 * NOTE: It assumes the tab panels are visually connectd to each other,
 * without overlaps or gaps.
 *
 * @param {Array} offsetTops - an array of each tab panel's offsetTop
 * @param {Number} offset - a positive/negative number to artificially adjust
 * the position of window.scrollY.
 */
function getScrollPanelIndex(offsetTops, offset = 0) {
  let index = 0;

  index = offsetTops.findIndex(function(top, i) {
    let scrollY = window.scrollY + offset;

    if (i === offsetTops.length - 1) {
      return scrollY >= top;
    }

    return scrollY >= top && scrollY < offsetTops[i + 1];
  });

  // The first tab stays active when the window.scrollY
  // is above the first scroll panel.
  return index < 0 ? 0 : index;
}
</script>

