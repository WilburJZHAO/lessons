<template>
  <div class="container mt-3">
    <h3 class="text-success text-center mb-3">Play many games fast</h3>
    <app-play-many-games-app v-if="trialNumber" :trialNumber="trialNumber" :strategies="strategies"></app-play-many-games-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import PlayManyGamesApp from "./PlayManyGamesApp.vue";

export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appPlayManyGamesApp: PlayManyGamesApp
  },
  props: ["strategies"],
  data: function() {
    return {
      trialNumber: null
    };
  }
};
</script>

<style scoped></style>
