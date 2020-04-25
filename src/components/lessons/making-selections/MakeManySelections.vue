<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Make many selections</h3>
    <hr class="subheading-speartor" />
    <app-make-many-selections-app v-if="trialNumber" :trialNumber="trialNumber" :rule="rule"></app-make-many-selections-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import MakeManySelectionsApp from "./MakeManySelectionsApp.vue";

export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appMakeManySelectionsApp: MakeManySelectionsApp
  },
  props: ["rule"],
  data: function() {
    return {
      trialNumber: ""
    };
  }
};
</script>

<style scoped>
</style>