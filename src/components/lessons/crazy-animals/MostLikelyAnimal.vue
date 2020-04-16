<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Which animal is most likely?</h3>
    <hr class="subheading-separator">
    <app-most-likely-animal-app v-if="trialNumber" :trialNumber="trialNumber"></app-most-likely-animal-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import MostLikelyAnimalApp from "./MostLikelyAnimalApp.vue";
export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appMostLikelyAnimalApp: MostLikelyAnimalApp
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
