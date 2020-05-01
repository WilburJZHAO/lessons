<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Explore strategies</h3>
    <hr class="subheading-separator" />
    <app-explore-strategies-app
      v-if="selectedStrategy"
      :selectedStrategy="selectedStrategy"
    ></app-explore-strategies-app>
    <app-selecting-strategy
      v-else
      :enterTrialNumber="false"
      @selectStrategy="selectedStrategy = $event"
    ></app-selecting-strategy>
  </div>
</template>

<script>
import SelectingStrategy from "./SelectingStrategy.vue";
import ExploreStrategiesApp from "./ExploreStrategiesApp.vue";
export default {
  components: {
    appSelectingStrategy: SelectingStrategy,
    appExploreStrategiesApp: ExploreStrategiesApp,
  },
  data: function() {
    return {
      selectedStrategy: null,
    };
  },
};
</script>

<style scoped></style>
