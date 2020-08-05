<!--
 VerticalTabPanels is used to vertically display 
 the v-tabs component's content panels.
 
 Jump to a tab panel:
 When the user clicks a tab, VerticalTabPanels will scroll 
 the page to its corresponding panel.

 Switch tabs on scroll:
 When the user scrolls through the tab panels, the active tab
 of the v-tabs component will be changed accordingly.
 
Setup:
 1. Declare the VerticalTabPanels component as a sibling of
 the v-tabs component.

 2. Set a series of content blocks (e.g. div or v-card)
 inside <VerticalTabPanels></VerticalTabPanels> as tab panels.
 The number of panels should be the same as the number of tabs.

 3. Inside the v-tabs component's "change" event handler, 
 emit an event named "scrollToPanel" (here we use an event bus), 
 with a tab index value, for example:
   this.$bus.$emit("scrollToPanel", index);

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
    barOffsetTop: {
      type: Number,
      default: 0
    },
    barHeight: {
      type: Number,
      default: 52
    },
    panelClass: {
      type: String,
      default: "tab-panel"
    },
    vScrollDuration: {
      type: Number,
      default: 400
    },
    // The distance from the top of the scroll target
    // Please refer to $vuetify goTo function.
    vScrollOffset: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      inTransition: false,
      panelOffsetTops: []
    };
  },
  computed: {
    /**
     * A virtual horizontal line within the viewport for telling when to
     * change the active tab while scrolling the panels through.
     * Here it is the position of the tab bar bottom.
     */
    windowScrollOffset() {
      let offset = this.barOffsetTop + this.barHeight;

      // To prevent the active tab being mistakely altered to the previous one
      if(offset <= this.vScrollOffset) {
        offset = this.vScrollOffset + 1;
      }

      return offset;
    }
  },
  mounted() {
    this.$bus.$on("scrollToPanel", index => {
      this.scrollToPanelAt(index);
    });
  },
  updated() {
    this.panelOffsetTops = getPanelOffsetTops(this.panelClass);
  },
  beforeDestroy() {
    this.$bus.$off("scrollToPanel");
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

      const panelIndex = getCurrentPanelIndex(
        this.panelOffsetTops,
        this.windowScrollOffset
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

      const target = `.${this.panelClass}:nth-child(${index + 1})`;
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
 * Get the index of the tab panel inside the viewport.
 *
 * NOTE: The calculation assumes the tab panels are visually 
 * connectd to each other, without overlaps or gaps.
 *
 * @param {Array} offsetTops - an array of each tab panel's offsetTop
 * @param {Number} scrollOffset - a positive/negative number to 
 * adjust the value of window.scrollY
 */
function getCurrentPanelIndex(offsetTops, scrollOffset = 0) {
  let index = 0;

  index = offsetTops.findIndex(function(offsetTop, i) {
    let scrollY = window.scrollY + scrollOffset;

    if (i === offsetTops.length - 1) {
      return scrollY >= offsetTop;
    }

    return scrollY >= offsetTop && scrollY < offsetTops[i + 1];
  });

  // The first tab stays active when the window.scrollY
  // is above the first scroll panel.
  return index < 0 ? 0 : index;
}
</script>

