<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Level two</h3>
    <hr class="subheading-separator">
    <app-goods-bads :level="2"></app-goods-bads>
  </div>
</template>

<script>
import GoodsBads from "./GoodsBads.vue";
export default {
  components: {
    appGoodsBads: GoodsBads
  }
};
</script>

<style scoped></style>
