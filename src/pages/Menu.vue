<template>
  <div>
    <StoreInfoDetails :id="this.id" />
    <MenuList :id="this.id" />
  </div>
</template>

<script>
import StoreInfoDetails from "@/components/StoreInfoDetails.vue";
import MenuList from "@/components/MenuList.vue";

export default {
  components: {
    StoreInfoDetails,
    MenuList
  },
  props: ["id"],
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>>

