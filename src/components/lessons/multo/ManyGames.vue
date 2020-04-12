<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Comparing grids: Many games</h3>
    <hr class="subheading-separator">
    <app-many-games-app v-if="trialNumber" :strategies="strategies" :trialNumber="trialNumber"></app-many-games-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber = $event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import ManyGamesApp from "./ManyGamesApp.vue";
export default {
  props: ["strategies"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appManyGamesApp: ManyGamesApp
  },
  data: function() {
    return {
      trialNumber: null
    };
  }
};
</script>

<style scoped>
</style>