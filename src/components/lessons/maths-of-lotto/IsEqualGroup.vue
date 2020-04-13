<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Is each group equally likely?</h3>
    <hr class="subheading-separator">
    <app-is-equal-group-app v-if="trialNumber" :settings="settings" :trialNumber="trialNumber"></app-is-equal-group-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import IsEqualGroupApp from "./IsEqualGroupApp.vue";

export default {
  props: ["settings"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appIsEqualGroupApp: IsEqualGroupApp
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