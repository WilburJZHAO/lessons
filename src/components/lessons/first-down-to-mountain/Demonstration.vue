<template>
  <div class="container mt-3">
    <h3 class="text-center text-success">Demonstration Game</h3>
    <h6 class="text-center mb-3">Trial: {{ trialNumber }}</h6>
    <div style="position: relative">
      <div class="app--dice-container d-flex" v-if="dice1 && dice2">
        <app-dice :number="dice1" :index="0" class="mr-3"></app-dice>
        <app-dice :number="dice2" :index="0"></app-dice>
      </div>
      <div class="app--gameboard-container d-flex justify-content-center">
        <app-gameboard :game="demoGame"></app-gameboard>
      </div>
      <div class="text-center mt-3">
        <h6
          v-if="winnerIndex >= 0"
          class="text-danger my-2"
        >{{ demoGame[winnerIndex].diceSums }} is the winner</h6>
        <button
          class="btn btn-outline-dark"
          v-if="status === 3"
          @click="handleReset"
        >Tap here to reset</button>
        <button
          class="btn btn-outline-success"
          v-if="status < 3 && demoAutoOption === '0'"
          @click="handlePlay"
        >
          {{
          status === 0 || status === 1
          ? "Tap here to throw dice "
          : "Tap here to move counter"
          }}
        </button>
        <button
          class="btn btn-outline-success"
          v-if="status < 3 && demoAutoOption === '1'"
          @click="handleToggleTimer"
        >
          {{
          status === 0
          ? "Tap here to begin"
          : timer
          ? "Tap here to pause"
          : "Tap here to resume"
          }}
        </button>
        <app-demo-auto-option
          v-if="status<3"
          :option="demoAutoOption"
          @changeOption="demoAutoOption = $event"
          class="mt-1"
        ></app-demo-auto-option>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { demoGame } from "./game";
import Gameboard from "./Gameboard.vue";
import DemoAutoOption from "../../common/DemoAutoOption";
import Dice from "../../common/Dice";
import { throwDiceOnce } from "../../common/utils";

export default {
  components: {
    appGameboard: Gameboard,
    appDemoAutoOption: DemoAutoOption,
    appDice: Dice
  },
  data: function() {
    return {
      demoGame: null,
      status: 0,
      // status = 0: ready to begin
      // status = 1: running and ready for throw dice
      // status = 2: running and ready for move counter
      // status = 3: finish

      trialNumber: 1,
      demoAutoOption: "0",
      timer: null,
      dice1: null,
      dice2: null
    };
  },
  computed: {
    winnerIndex() {
      return this.demoGame.findIndex(el => el.currentSpace >= el.spaces);
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
    generateWinnerArr() {
      let winnerArr = [];
      for (let i = 0; i < this.demoGame.length; i++) {
        winnerArr.push(this.demoGame[i].wins);
      }
      return winnerArr;
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handlePlay() {
      if (this.status === 0 || this.status === 1) {
        // Throw dice
        this.dice1 = throwDiceOnce();
        this.dice2 = throwDiceOnce();
        this.status = 2;
      } else if (this.status === 2) {
        // Move button
        let diceSums = this.dice1 + this.dice2;
        let index = this.demoGame.findIndex(el => el.diceSums === diceSums);
        if (index >= 0) {
          this.demoGame[index].currentSpace++;
        }
        this.dice1 = null;
        this.dice2 = null;
        this.status = 1;
        if (this.winnerIndex >= 0) {
          this.demoGame[this.winnerIndex].wins++;
          this.status = 3;
        }
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        this.clearTimer();
      } else {
        this.timer = setInterval(this.handlePlay, 200);
      }
    },
    handleReset() {
      const winnerArr = this.generateWinnerArr();
      this.initGame();
      for (let i = 0; i < this.demoGame.length; i++) {
        this.demoGame[i].wins = winnerArr[i];
      }
      this.status = 0;
      this.trialNumber++;
      this.demoAutoOption = "0";
    }
  },
  created() {
    this.initGame();
  },
  destroyed() {
    this.clearTimer();
  }
};
</script>

<style scoped>
.app--dice-container {
  position: absolute;
  left: 0;
}
</style>
