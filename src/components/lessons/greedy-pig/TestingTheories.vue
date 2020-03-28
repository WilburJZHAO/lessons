<template>
  <div class="mt-3">
    <h3 class="text-success text-center mb-4">Testing theories</h3>

    <div v-if="status === 0" class="container">
      <div class="row">
        <div class="col-12 text-center">
          <app-strategy-input :strategy="strategy1"></app-strategy-input>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button class="btn btn-outline-success" @click="status = 1" :disabled="!validInput">OK</button>
      </div>
    </div>
    <div v-else>
      <app-strategy-stem-leaf
        :points1="sortedPoints"
        :killerDice="killerDice"
        :strategy1="strategy1"
        :status="status"
        @overflow="handleOverflow"
      ></app-strategy-stem-leaf>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <app-strategy-chart :points1="sortedPoints" :status="status"></app-strategy-chart>
          </div>
          <div class="col-md-4">
            <app-strategy-table :points1="sortedPoints"></app-strategy-table>
          </div>
        </div>
        <div class="text-center mt-3" v-if="status!==4">
          <button
            class="btn btn-outline-success"
            @click="handlePlayOneGame"
            v-if="demoAutoOption === '0' && numberOverflow === false"
          >
            {{
            status === 1
            ? "Tap here for first game"
            : "Tap here for next game"
            }}
          </button>
          <button
            class="btn btn-outline-success"
            @click="handleToggleTimer"
            v-if="demoAutoOption === '1' && numberOverflow === false"
          >
            {{
            timer
            ? "Tap here to pause"
            : status === 1
            ? "Tap here to begin"
            : "Tap here to resume"
            }}
          </button>
          <button
            class="btn btn-outline-success"
            @click="handleMoreTrials"
            v-if=" numberOverflow === true"
          >Tap here for more trials</button>
          <div class="text-center mt-2">
            <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
          </div>
        </div>
        <div v-if="status === 4" class="text-center">
          <button class="btn btn-outline-dark" @click="handleReset">Tap here to reset</button>
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
      // 2 - Started(in form of number)
      // 3 - started(in form of bar)
      // 4 - finished
      strategy1: {
        index: 1,
        type: "rolls",
        value: null
      },

      points: [],
      demoAutoOption: "0",
      timer: null,
      numberOverflow: false
    };
  },
  computed: {
    sortedPoints() {
      return this.points.sort((a, b) => a - b);
    },

    validInput() {
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
      this.points.push(playOneGame(this.strategy1, this.killerDice));
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
      // this.demoAutoOption = $event;
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
      this.points = [];
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
