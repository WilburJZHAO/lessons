<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play multiple games</h3>
    <hr class="subheading-separator">
    <app-play-multiple-games-app v-if="trialNumber" :settings="settings" :trialNumber="trialNumber"></app-play-multiple-games-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import PlayMultipleGamesApp from "./PlayMultipleGamesApp.vue";

export default {
  props: ["settings"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appPlayMultipleGamesApp: PlayMultipleGamesApp
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