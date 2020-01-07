<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-success text-center mb-3">Focus on strategies: 20-100 heads</h3>
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