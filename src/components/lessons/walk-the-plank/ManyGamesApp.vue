<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Many games fast: change the plank length - {{ legify(gameSetting.trialNumber)}} games</h3>
    <hr class="subheading-separator">
    <app-game-table-max
      :plankLength="plankLength"
      :maximum="maximumTurns"
      :numberOfGames="numberOfGames"
      :average="average"
    ></app-game-table-max>
    <div class="text-center mt-3">
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption=='0' && !isEnd"
        @click="handlePlayOneGame"
      >Play next game</button>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption=='1' && !isEnd"
        @click="handleToggleTimer"
      >
        {{ !isStart ? "Start" :
        ( timer ? "Pause" : "Resume")
        }}
      </button>
      <button class="btn btn-outline-dark" v-if="isEnd" @click="handleReset">Reset</button>
      <app-demo-auto-option
        :option="demoAutoOption"
        @changeOption="demoAutoOption=$event"
        class="mt-1 mb-3"
      ></app-demo-auto-option>
      <app-game-frequency-graph
        :frequency="frequency"
        :moves="moves"
        :unit="heightUnit"
        :minHeight="450"
      ></app-game-frequency-graph>
    </div>
  </div>
</template>

<script>
import GameTableMax from "./GameTableMax.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import GameFrequencyGraph from "./GameFrequencyGraph.vue";
import Plank from "./Plank";
import { calculateTimerInterval, legify } from "../../common/utils.js";

export default {
  components: {
    appGameTableMax: GameTableMax,
    appDemoAutoOption: DemoAutoOption,
    appGameFrequencyGraph: GameFrequencyGraph
  },
  props: ["gameSetting"],
  data: function() {
    return {
      plankLength: null,
      turns: 0,
      totalTurns: 0,
      maximumTurns: 0,
      numberOfGames: 1,
      isStart: false,
      isEnd: false,
      timer: null,
      demoAutoOption: "1",
      frequency: Array(20),
      moves: Array(20),
      factor: 0
    };
  },
  computed: {
    result() {
      if (this.position < -1 * this.plankLength) {
        return -1; // 'Shark has gobbbled you up'
      }
      if (this.position > this.plankLength) {
        return 1; // 'Safe on the boat'
      }
      return null;
    },
    average() {
      if (this.numberOfGames <= 1) {
        return 0;
      }
      return (this.totalTurns / (this.numberOfGames - 1)).toFixed(2);
    },
    timerInterval() {
      let { trialNumber } = this.gameSetting;
      return calculateTimerInterval(trialNumber);
    },
    heightUnit() {
      let { trialNumber } = this.gameSetting;
      if (trialNumber <= 100) {
        return 5;
      } else if (trialNumber <= 500) {
        return 2;
      } else if (trialNumber <= 1000) {
        return 1.5;
      } else if (trialNumber <= 5000) {
        return 0.5;
      } else {
        return 0.25;
      }
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    isEnd(value) {
      if (value) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    legify,
    handlePlayOneGame() {
      if (!this.isStart) this.isStart = true;
      this.turns = this.plank.playOneGameAndGetTurns();
      this.numberOfGames++;
      this.totalTurns += this.turns;
      if (this.turns > this.maximumTurns) this.maximumTurns = this.turns;
      this.plank = new Plank(this.plankLength);
      if (this.numberOfGames >= this.gameSetting.trialNumber) {
        this.isEnd = true;
      }
      let indexOfFrequency = Math.floor(this.turns / this.factor);
      if (indexOfFrequency > 19) {
        this.frequency[19] += 1;
      } else {
        this.frequency[indexOfFrequency] += 1;
      }
      this.frequency = [...this.frequency];
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlayOneGame, this.timerInterval);
      }
    },
    handleReset() {
      this.turns = 0;
      this.totalTurns = 0;
      this.maximumTurns = 0;
      this.numberOfGames = 1;
      this.isStart = false;
      this.isEnd = false;
      this.frequency = Array(20);
      for (let i = 0; i < this.frequency.length; i++) {
        this.frequency[i] = 0;
      }
    }
  },
  created() {
    this.plankLength = this.gameSetting.plankLength;
    this.plank = new Plank(this.plankLength);
    for (let i = 0; i < this.frequency.length; i++) {
      this.frequency[i] = 0;
    }

    const { plankLength } = this.gameSetting;
    if (plankLength <= 6) {
      this.factor = 1;
    } else if (plankLength <= 15) {
      this.factor = 5;
    } else if (plankLength <= 20) {
      this.factor = 10;
    } else if (plankLength <= 25) {
      this.factor = 20;
    } else if (plankLength <= 35) {
      this.factor = 50;
    } else if (plankLength <= 50) {
      this.factor = 100;
    } else {
      this.factor = 0;
    }
    for (let j = 0; j < this.moves.length; j++) {
      this.moves[j] = (j + 1) * this.factor;
    }
    this.moves[this.moves.length - 1] = ">";
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--game-board {
  display: flex;
  justify-content: center;
}
.app--game-board-square {
  border: 1px solid #000;
  height: 60px;
  width: 60px;
  position: relative;
}
.app--game-board-square {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--dice {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--dice-direction,
.app--dice-walk {
  height: 50px;
  width: 50px;
  border: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.5rem;
}
</style>
