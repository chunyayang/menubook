<template>
  <div>
    <StoreInfo :id="this.id" />
    <v-divider />
    <MenuList :id="this.id" />
  </div>
</template>

<script>
import StoreInfo from "@/components/StoreInfo";
import MenuList from "@/components/MenuList";

export default {
  components: {
    StoreInfo,
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

