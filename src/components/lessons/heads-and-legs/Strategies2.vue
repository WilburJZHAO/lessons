<template>
  <div class="container mt-3 mb-5">
      <h3 class="lesson-subheading">Focus on strategies: 100 to 1000 heads</h3>
      <hr class="subheading-separator">
      <app-strategies-app :min="100" :max="1000"></app-strategies-app>
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