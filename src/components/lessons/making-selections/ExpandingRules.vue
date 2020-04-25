<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Expanding the selection rules</h3>
    <hr class="subheading-speartor" />
    <app-expanding-rules-app v-if="trialNumber" :trialNumber="trialNumber"></app-expanding-rules-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import ExpandingRulesApp from "./ExpandingRulesApp.vue";

export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appExpandingRulesApp: ExpandingRulesApp
  },
  data: function() {
    return {
      trialNumber: ""
    };
  }
};
</script>

<style scoped>
</style>