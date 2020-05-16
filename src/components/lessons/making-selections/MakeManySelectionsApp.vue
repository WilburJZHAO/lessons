<template>
  <div class="container mt-3">
    <app-game-rule :rule="rule"></app-game-rule>
    <div class="mb-4"></div>
    <div class="app--container">
      <app-game-stat :trialNumber="trialNumber" :game="game" :win="win" :lose="lose"></app-game-stat>
    </div>
    <div class="mb-4"></div>
    <div class="text-center">
      <div
        class="text-danger"
        :style="{visibility: game>=trialNumber ? 'visible' :'hidden'}"
      >Finished</div>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption==='0' && game < trialNumber "
        @click="handleOneGame"
      >{{ game===0 ? 'Run first game' : 'Run next game' }}</button>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption==='1' && game < trialNumber"
        @click="handleToggleTimer"
      >{{ game=== 0 ? 'Start' : timer ? 'Pause' : 'Resume' }}</button>
      <button
        class="btn btn-outline-dark"
        v-if="game >= trialNumber"
        @click="handleReset"
      >Reset</button>
    </div>
    <div class="text-center">
      <div class="text-center mt-2">
        <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
      </div>
    </div>
  </div>
</template>

<script>
import GameRule from "./GameRule.vue";
import GameStat from "./GameStat.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { calculateTimerInterval } from "../../common/utils";
import { drawCards, checkResult } from "./utils";

export default {
  components: {
    appGameRule: GameRule,
    appGameStat: GameStat,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["rule", "trialNumber"],
  data: function() {
    return {
      win: 0,
      lose: 0,
      game: 0,
      demoAutoOption: "0",
      timer: null
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    game(value) {
      if (value >= this.trialNumber && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleOneGame() {
      const drawnCards = drawCards(
        this.rule.clinicPlayers,
        this.rule.teamPlayers
      );
      // console.log(drawnCards);
      const result = checkResult(
        drawnCards,
        this.rule.winningCards,
        this.rule.allToWin
      );
      if (result) {
        this.win++;
      } else {
        this.lose++;
      }
      this.game++;
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleOneGame, this.timerInterval);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleReset() {
      this.game = 0;
      this.win = 0;
      this.lose = 0;
      this.timer = null;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--container {
  max-width: 500px;
  margin: 0 auto;
}
</style>