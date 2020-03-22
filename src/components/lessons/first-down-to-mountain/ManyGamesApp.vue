<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-around">
      <h5>{{ trialNumber}} trials</h5>
      <h5>Trial {{ tried }}</h5>
    </div>

    <div class="app--game-graph-container">
      <app-game-graph :game="game" :tried="tried" :trialNumber="trialNumber" :gameType="gameType"></app-game-graph>
    </div>

    <div class="text-center my-2">
      <button
        class="btn btn-outline-success"
        v-if="status<2 && demoAutoOption==='0'"
        @click="handlePlayOneGame"
      >{{ status === 0 ? 'Tap here for first game ' : 'Tap here for next game'}}</button>
      <button
        class="btn btn-outline-success"
        v-if="status<2 && demoAutoOption==='1'"
        @click="handleToggleTimer"
      >{{ status===0 ? 'Tap here to begin' : (timer ? "Tap here to pause" :"Tap here to resume") }}</button>
      <button class="btn btn-outline-dark" v-if="status===2" @click="handleReset">Reset</button>
      <app-demo-auto-option
        v-if="status<2"
        :option="demoAutoOption"
        @changeOption="demoAutoOption = $event"
        class="mt-1"
      ></app-demo-auto-option>
      <div v-if="status===2" class="text-danger">Finished</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { demoGame } from "./game";
import GameGraph from "./GameGraph.vue";
import DemoAutoOption from "../../common/DemoAutoOption";
import { throwDiceOnce, calculateTimerInterval } from "../../common/utils";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption,
    appGameGraph: GameGraph
  },
  props: ["trialNumber", "game", "gameType"],
  data: function() {
    return {
      tried: 0,
      status: 0,
      demoAutoOption: "1",
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
      if (value === "0") {
        this.clearTimer();
      }
    }
  },
  methods: {
    initGame() {
      this.demoGame = _.cloneDeep(demoGame);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    checkWinnerIndex() {
      return this.game.findIndex(el => el.currentSpace >= el.spaces);
    },
    handlePlayOneGame() {
      if (this.status === 0) {
        this.status = 1;
      }
      let winnerIndex = -1;
      while (winnerIndex < 0) {
        let diceSums = throwDiceOnce() + throwDiceOnce();
        let moveIndex = this.game.findIndex(el => el.diceSums === diceSums);
        if (moveIndex >= 0) {
          this.game[moveIndex].currentSpace++;
        }
        winnerIndex = this.checkWinnerIndex();
      }
      this.game[winnerIndex].wins++;
      // reset all players to the start line
      for (let i = 0; i < this.game.length; i++) {
        this.game[i].currentSpace = 0;
      }
      this.tried++;
      if (this.tried >= this.trialNumber) {
        this.status = 2;
        this.clearTimer();
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        this.clearTimer();
      } else {
        this.timer = setInterval(this.handlePlayOneGame, this.timerInterval);
      }
    },
    handleReset() {
      this.$emit("initGame", demoGame);
      this.tried = 0;
      this.status = 0;
    }
  },

  destroyed() {
    this.clearTimer();
  }
};
</script>

<style scoped>
</style>
