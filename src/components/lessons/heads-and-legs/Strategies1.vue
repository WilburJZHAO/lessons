<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Focus on strategies: 20 to 100 heads</h3>
    <hr class="subheading-separator">
    <app-strategies-app :min="20" :max="100"></app-strategies-app>
  </div>
</template>

<script>
import StrategiesApp from "./StrategiesApp.vue";
export default {
  components: {
    appStrategiesApp: StrategiesApp
  }
};
</script>

<style scoped>
</style>