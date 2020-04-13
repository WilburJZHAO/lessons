<template>
  <div class="mt-3">
    <h3 class="lesson-subheading">Comparing strategies</h3>
    <hr class="subheading-separator">
    <div v-if="status === 0" class="container">
      <div class="row">
        <div class="col-sm-6">
          <app-strategy-input :strategy="strategy2"></app-strategy-input>
        </div>
        <div class="col-sm-6">
          <app-strategy-input :strategy="strategy1"></app-strategy-input>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button class="btn btn-outline-success" @click="status = 1" :disabled="!validInput">OK</button>
      </div>
    </div>
    <div v-else>
      <app-strategy-stem-leaf
        :points1="sortedPoints1"
        :points2="sortedPoints2"
        :killerDice="killerDice"
        :strategy1="strategy1"
        :strategy2="strategy2"
        :status="status"
        @overflow="handleOverflow"
      ></app-strategy-stem-leaf>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <app-strategy-chart :points1="sortedPoints1" :points2="sortedPoints2" :status="status"></app-strategy-chart>
          </div>
          <div class="col-md-4">
            <app-strategy-table :points1="points1" :points2="points2"></app-strategy-table>
          </div>
        </div>
        <div class="text-center mt-3" v-if="status!==4">
          <button
            class="btn btn-outline-success"
            @click="handlePlayOneGame"
            v-if="demoAutoOption === '0'&& numberOverflow === false"
          >
            {{
            status === 1
            ? "Run first game"
            : "Run next game"
            }}
          </button>
          <button
            class="btn btn-outline-success"
            @click="handleToggleTimer"
            v-if="demoAutoOption === '1'&& numberOverflow === false"
          >
            {{
            timer
            ? "Pause"
            : status === 1
            ? "Start"
            : "Resume"
            }}
          </button>
          <button
            class="btn btn-outline-success"
            @click="handleMoreTrials"
            v-if=" numberOverflow === true"
          >Run more trials</button>
          <div class="text-center mt-2">
            <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
          </div>
        </div>
        <div v-if="status===4" class="text-center">
          <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
          <div class="text-danger text-center">Finished</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StrategyInput from "./StrategyInput.vue";
import StrategyTable from "./StrategyTable.vue";
import StrategyChart from "./StrategyChart.vue";
import StrategyStemLeaf from "./StrategyStemLeaf.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { playOneGame } from "./utils";
export default {
  components: {
    appStrategyInput: StrategyInput,
    appStrategyTable: StrategyTable,
    appStrategyChart: StrategyChart,
    appStrategyStemLeaf: StrategyStemLeaf,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["killerDice"],
  data: function() {
    return {
      status: 0,
      // 0 - to input strategy
      // 1 - finish inputing strategy, ready to start
      // 2 -started
      strategy1: {
        index: 1,
        type: "rolls",
        value: null
      },
      strategy2: {
        index: 2,
        type: "rolls",
        value: null
      },
      points1: [],
      points2: [],
      demoAutoOption: "0",
      timer: null,
      numberOverflow: false
    };
  },
  computed: {
    sortedPoints1() {
      return this.points1.sort((a, b) => a - b);
    },
    sortedPoints2() {
      return this.points2.sort((a, b) => a - b);
    },
    validInput() {
      return this.validInput1 && this.validInput2;
    },
    validInput1() {
      if (
        this.strategy1.type === "rolls" &&
        this.strategy1.value > 0 &&
        this.strategy1.value <= 15
      ) {
        return true;
      }
      if (
        this.strategy1.type === "points" &&
        this.strategy1.value > 0 &&
        this.strategy1.value <= 99
      ) {
        return true;
      }
      return false;
    },
    validInput2() {
      if (
        this.strategy2.type === "rolls" &&
        this.strategy2.value > 0 &&
        this.strategy2.value <= 15
      ) {
        return true;
      }
      if (
        this.strategy2.type === "points" &&
        this.strategy2.value > 0 &&
        this.strategy2.value <= 99
      ) {
        return true;
      }
      return false;
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handlePlayOneGame() {
      if (this.status === 1) {
        this.status = 2;
      }
      this.points1.push(playOneGame(this.strategy1, this.killerDice));
      this.points2.push(playOneGame(this.strategy2, this.killerDice));
    },
    handleToggleTimer() {
      if (this.status === 1) {
        this.status = 2;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlayOneGame, 200);
      }
    },
    handleOverflow($event) {
      if (this.status === 2) {
        // this.status = 3;
        this.numberOverflow = true;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      } else if (this.status === 3) {
        this.status = 4;
        this.demoAutoOption = $event;
      }
    },
    handleMoreTrials() {
      this.status = 3;
      this.numberOverflow = false;
      if (this.demoAutoOption === "1") {
        this.timer = setInterval(this.handlePlayOneGame, 200);
      }
    },
    handleReset() {
      this.points1 = [];
      this.points2 = [];
      this.status = 1;
      this.demoAutoOption = "0";
      if (this.timer) {
        this.clearInterval(this.timer);
        this.timer = null;
      }
    }
  }
};
</script>

<style scoped></style>
