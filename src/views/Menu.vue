<template>
  <StoreInfoDetails :id="this.id" />
</template>

<script>
import StoreInfoDetails from "@/components/StoreInfoDetails.vue";

export default {
  components: {
    StoreInfoDetails
  },
  props: ["id"],
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>>

