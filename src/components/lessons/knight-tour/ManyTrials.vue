<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Many trials</h3>
    <hr class="subheading-separator" />
    <app-many-trials-app
      v-if="selectedStrategy"
      :selectedStrategy="selectedStrategy"
    ></app-many-trials-app>
    <app-selecting-strategy
      v-else
      :enterTrialNumber="true"
      @selectStrategy="selectedStrategy = $event"
    ></app-selecting-strategy>
  </div>
</template>

<script>
import SelectingStrategy from "./SelectingStrategy.vue";
import ManyTrialsApp from "./ManyTrialsApp.vue";
export default {
  components: {
    appSelectingStrategy: SelectingStrategy,
    appManyTrialsApp: ManyTrialsApp,
  },
  data: function() {
    return {
      selectedStrategy: null,
    };
  },
};
</script>

<style scoped></style>
