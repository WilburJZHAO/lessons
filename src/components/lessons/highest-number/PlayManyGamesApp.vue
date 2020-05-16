<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-3">
        <app-select-strategy
          :strategies="strategies"
          @selectStrategy="handleSelectStrategy"
          :disabled="status!==0"
        ></app-select-strategy>
        <div class="mb-3"></div>
        <app-game-stat
          :trials="trialNumber"
          :trial="trial"
          :mean="mean"
          :low="low"
          :high="high"
          style="max-width: 200px; margin: 0 auto;"
        ></app-game-stat>
      </div>
      <div class="col-md-9">
        <app-strategy-graph
          :strategy="currentStrategy"
          :strategyName="this.strategies[this.selectedStrategyId-1].name"
          class="mx-2"
        ></app-strategy-graph>
      </div>
    </div>
    <div style="height: 480px;">
      <app-game-graph
        :graphData="gameSetTotalArr"
        :prevGraphData="prevGameSetTotalArr"
        :trialNumber="trialNumber"
      ></app-game-graph>
    </div>
    <div class="text-center mt-3" v-if="status===2">
      <div class="text-danger text-center">Finished</div>
      <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
    </div>
    <div class="text-center mt-3" v-else>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption==='0'"
        @click="handleOneGameSet"
      >{{ status===0 ? 'Run first trial' : 'Run next trial'}}</button>
      <button
        class="btn btn-outline-success"
        v-else
        @click="handleToggleTimer"
      >{{ status === 0 ? 'Start' : timer ? 'Pause' : 'Resume'}}</button>
    </div>
    <div class="text-center mt-2">
      <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import SelectStrategy from "./SelectStrategy.vue";
import GameStat from "./GameStat.vue";
import StrategyGraph from "./StrategyGraph.vue";
import GameGraph from "./GameGraph.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { drawCard } from "./utils";
import { pickNumber, calculateTimerInterval } from "../../common/utils";

export default {
  components: {
    appSelectStrategy: SelectStrategy,
    appGameStat: GameStat,
    appStrategyGraph: StrategyGraph,
    appGameGraph: GameGraph,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["strategies", "trialNumber"],
  data: function() {
    return {
      selectedStrategyId: 1,
      currentStrategy: null,
      demoAutoOption: "0",
      timer: null,
      trial: 0,
      mean: null,
      low: null,
      high: null,
      total: 0,
      gameSetToal: 0,
      gameSetTotalArr: new Array(27),
      prevGameSetTotalArr: new Array(27),
      status: 0
      // 0 - ready to start
      // 1 - started
      // 2 - finished
    };
  },
  computed: {
    isRandomStrategy() {
      return this.selectedStrategyId === 1;
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if (value === 2) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleSelectStrategy(e) {
      this.selectedStrategyId = e;
      this.currentStrategy = _.cloneDeep(
        this.strategies[this.selectedStrategyId - 1].strategy
      );
    },
    handleReset() {
      this.trial = 0;
      this.mean = null;
      this.low = null;
      this.high = null;
      this.total = 0;
      this.gameSetTotal = 0;
      this.status = 0;
      this.prevGameSetTotalArr = [...this.gameSetTotalArr];
      this.gameSetTotalArr = new Array(27);
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleOneGameSet, this.timerInterval);
      }
    },
    handleOneGameSet() {
      if (this.status === 0) {
        this.status = 1;
      }
      this.gameSetToal = 0;
      if (this.isRandomStrategy) {
        // console.log(this.playOneRandomGame());
        this.gameSetTotal =
          this.playOneRandomGame() +
          this.playOneRandomGame() +
          this.playOneRandomGame() +
          this.playOneRandomGame() +
          this.playOneRandomGame();
      } else {
        // console.log(this.playOneStrategyGame());
        this.gameSetTotal =
          this.playOneStrategyGame() +
          this.playOneStrategyGame() +
          this.playOneStrategyGame() +
          this.playOneStrategyGame() +
          this.playOneStrategyGame();
      }

      const freq = Math.floor(this.gameSetTotal / 100);
      if (freq >= 6 && freq <= 32) {
        if (this.gameSetTotalArr[freq - 6]) {
          this.gameSetTotalArr[freq - 6] += 1;
        } else {
          this.gameSetTotalArr[freq - 6] = 1;
        }
      }
      this.gameSetTotalArr = [...this.gameSetTotalArr];
      this.trial++;
      this.total += this.gameSetTotal;
      this.mean = this.calculateMean();
      this.low = this.calculateLow();
      this.high = this.calculateHigh();
      if (this.trial >= this.trialNumber) {
        this.status = 2;
      }
    },
    playOneRandomGame() {
      const hundredPart = drawCard().number;
      const tenPart = drawCard([hundredPart]).number;
      const onePart = drawCard([hundredPart, tenPart]).number;
      return hundredPart * 100 + tenPart * 10 + onePart;
    },
    playOneStrategyGame() {
      const numbersPos = [null, null, null];
      const firstNum = drawCard().number;
      const secondNum = drawCard([firstNum]).number;
      const thirdNum = drawCard([firstNum, secondNum]).number;
      numbersPos[this.currentStrategy[firstNum]] = firstNum;
      numbersPos[this.currentStrategy[`${firstNum}${secondNum}`]] = secondNum;
      numbersPos[numbersPos.indexOf(null)] = thirdNum;
      return numbersPos[0] * 100 + numbersPos[1] * 10 + numbersPos[2];
    },
    calculateMean() {
      return Number((this.total / this.trial).toFixed(1));
    },
    calculateLow() {
      if (!this.low) {
        return this.gameSetTotal;
      }
      if (this.gameSetTotal < this.low) {
        return this.gameSetTotal;
      }
      return this.low;
    },
    calculateHigh() {
      if (!this.high) {
        return this.gameSetTotal;
      }
      if (this.gameSetTotal > this.high) {
        return this.gameSetTotal;
      }
      return this.high;
    }
  },
  created() {
    this.currentStrategy = _.cloneDeep(
      this.strategies[this.selectedStrategyId - 1].strategy
    );
  }
};
</script>

<style scoped>
</style>