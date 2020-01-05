<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Play many games</h3>
    <app-many-games-app
      v-if="trialNumber"
      :trialNumber="Number(trialNumber)"
      :game="demoGame"
      :gameType="2"
      @initGame="initGame"
    ></app-many-games-app>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import _ from "lodash";
import { demoGame } from "./game";
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import ManyGamesApp from "./ManyGamesApp.vue";
export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appManyGamesApp: ManyGamesApp
  },
  data: function() {
    return {
      trialNumber: null,
      demoGame: null
    };
  },
  methods: {
    initGame() {
      this.demoGame = _.cloneDeep(demoGame);
    }
  },
  created() {
    this.initGame();
  }
};
</script>

<style scoped>
</style>
