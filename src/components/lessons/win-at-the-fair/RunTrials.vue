<template>
  <div class="container mt-3">
    <h3 class="text-success text-center mb-4">Run some trials</h3>
    <app-run-trials-app
      v-if="trialNumber"
      :trialNumber="trialNumber"
      :rules="rules"
      :values="values"
    ></app-run-trials-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import RunTrialsApp from "./RunTrialsApp.vue";
export default {
  props: ["rules", "values"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appRunTrialsApp: RunTrialsApp
  },
  data: function() {
    return {
      trialNumber: null
    };
  }
};
</script>

<style scoped></style>
