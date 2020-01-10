<!--
 VerticalTabPanels is used for displaying the v-tabs
 component's correspoding content panels vertically.
 
 When the user clicks a tab, the document will be
 scrolled to the position of its tab panel.
 When the user scrolls the tab panels, the active tab
 of the v-tabs component will change accordingly.
 
Setup:
 1. Declare the VerticalTabPanels component as a sibling of
 the v-tabs component.

 2. Set a series of content blocks (e.g. div or v-card)
 inside <VerticalTabPanels></VerticalTabPanels> as tab panels.
 The number of panels should be the same as the number of tabs.

 3. Use an event bus to emit an event named "scrollToTabPanel"
 with the index of the user clicked tab from the "change" event
 handler of the v-tabs component, for example:
   this.$bus.$emit("scrollToTabPanel", index);

Required Parameter:
 v-model: the v-tabs component and the VerticalTabPanels
 component share the same integer variable as their v-model
 value. The variable represents the index of the active tab.
-->
<template>
  <v-container
    class="vertical-tab-panels pa-0"
    v-scroll="onScroll"
  >
    <slot></slot>
  </v-container>
</template>

<script>
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
    this.$bus.$on("scrollToTabPanel", index => {
      this.scrollToPanelAt(index);
    });
  },
  updated() {
    this.panelOffsetTops = getPanelOffsetTops(this.tabPanelClass);
  },
  beforeDestroy() {
    this.$bus.$off("scrollToTabPanel");
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
        // Update the v-model value shared with the v-tabs component.
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
 * NOTE: The calculation assumes the tab panels are visually 
 * connectd to each other, without overlaps or gaps.
 *
 * @param {Array} offsetTops - an array of each tab panel's offsetTop
 * @param {Number} offset - a positive/negative number to artificially
 * adjust the position of window.scrollY.
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

