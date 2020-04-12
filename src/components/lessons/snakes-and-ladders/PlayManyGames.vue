<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play many games</h3>
    <hr class="subheading-separator">
    <app-play-many-games-app
      v-if="trialNumber"
      :trialNumber="trialNumber"
      :boardSettings="boardSettings"
    ></app-play-many-games-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import PlayManyGamesApp from "./PlayManyGamesApp.vue";
export default {
  props: ["boardSettings"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appPlayManyGamesApp: PlayManyGamesApp
  },
  data: function() {
    return {
      trialNumber: null
    };
  }
};
</script>

<style scoped></style>
