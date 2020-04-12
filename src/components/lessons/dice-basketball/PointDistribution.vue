<template>
  <div class="container mt-4 mb-5">
    <h3 class="lesson-subheading">Point distribution</h3>
    <hr class="subheading-separator">
    <app-point-distribution-app v-if="trialNumber" :trialNumber="trialNumber"></app-point-distribution-app>
    <app-enter-trials-number @acceptTrialNumber="trialNumber=$event" v-else></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import PointDistributionApp from "./PointDistributionApp.vue";
export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appPointDistributionApp: PointDistributionApp
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
