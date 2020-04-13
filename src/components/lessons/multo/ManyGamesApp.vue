<template>
  <div class="container mt-3 mb-5">
    <div class="row">
      <div class="col-lg-4">
        <app-strategies
          :strategies="strategies"
          :newStrategy="selectedStrategy"
          :duplicateNumber="duplicateNumber"
          @selectStrategy="handleSelectStrategy"
          @showMessage="message = $event"
          v-if="gameStatus===-1 || gameStatus===0"
        ></app-strategies>
      </div>
      <div class="col-lg-8">
        <app-many-games-stat
          v-if="gameStatus >= 0"
          :totalCardNumbers="totalCardNumbers"
          :gameNumber="gameNumber"
          :winStats="winStats"
          :gameStatus="gameStatus"
          :trialNumber="trialNumber"
        ></app-many-games-stat>
        <div class="d-flex flex-column flex-sm-row justify-content-around">
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[0].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[0]"
            :gameStatus="gameStatus"
            :multiplicationList="multiplicationList"
            :noStyle="true"
            :index="1"
            @duplicateNumber="duplicateNumber=$event"
            @showMessage="message=$event"
          ></app-grid>
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[1].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[1]"
            :gameStatus="gameStatus"
            :multiplicationList="multiplicationList"
            :noStyle="true"
            :index="2"
            @duplicateNumber="duplicateNumber=$event"
            @showMessage="message=$event"
          ></app-grid>
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[2].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[2]"
            :gameStatus="gameStatus"
            :multiplicationList="multiplicationList"
            :noStyle="true"
            :index="3"
            @duplicateNumber="duplicateNumber=$event"
            @showMessage="message=$event"
          ></app-grid>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <p
        :style="{
          visibility: message ? 'visible' : 'hidden'
        }"
        class="alert alert-danger"
      >{{message}}</p>
      <button
        class="btn btn-outline-success"
        v-if="selectedStrategy.id !== 0 && (gameStatus===0 || gameStatus===-1)"
        @click="handleStart"
      >Proceed to game</button>
      <div v-if="gameStatus === 1 || gameStatus === 2">
        <button
          class="btn btn-outline-success"
          v-if="demoAutoOption==='0'"
          @click="handlePlayOneGame"
        >{{ gameStatus === 1 ? "Run first game" : "Run next game" }}</button>
        <button
          class="btn btn-outline-success"
          v-if="demoAutoOption==='1'"
          @click="handleToggleTimer"
        >{{ gameStatus === 1 ? "Start" : (timer ? "Pause" : "Resume") }}</button>
        <div class="text-center mt-1">
          <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
        </div>
      </div>
      <button
        class="btn btn-outline-dark"
        v-if="gameStatus===3"
        @click="handleReset"
      >Reset</button>
    </div>
  </div>
</template>

<script>
// import _ from "lodash";
import Grid from "./Grid.vue";
import Strategies from "./Strategies.vue";
import ManyGamesStat from "./ManyGamesStat.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { BLANK_STRATEGY } from "./utils/settings";
import { pickNumber, checkMulto, checkCanMulto } from "./utils/utils";
import { calculateTimerInterval } from "../../common/utils";

export default {
  props: ["strategies", "trialNumber"],
  components: {
    appGrid: Grid,
    appStrategies: Strategies,
    appManyGamesStat: ManyGamesStat,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      selectedStrategy: BLANK_STRATEGY,
      duplicateNumber: null,
      message: "",
      gameStatus: -1,
      // -1 - initial state
      // 0 - ready for select
      // 1 - strategy is selected, ready for start
      // 2 - game is selected
      // 3 - game ends, all trials are finished
      demoAutoOption: "1",
      totalCardNumbers: 0,
      gameNumber: 0,
      winStats: [0, 0, 0],
      multiplicationList: [],
      timer: null
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval();
    }
  },
  watch: {
    gameNumber(value) {
      if (value >= this.trialNumber) {
        this.gameStatus = 3;
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    generateNewMultiplication() {
      return pickNumber(0, 9) * pickNumber(0, 9);
    },

    handleSelectStrategy($event) {
      this.selectedStrategy = $event;
    },

    handleStart() {
      if (
        checkCanMulto(this.selectedStrategy.strategyData[0]) ||
        checkCanMulto(this.selectedStrategy.strategyData[1]) ||
        checkCanMulto(this.selectedStrategy.strategyData[2])
      ) {
        this.gameNumber = 0;
        this.gameStatus = 1;
        this.winStats = [0, 0, 0];
      } else {
        this.message = "Impossible to win multo";
      }
    },

    handlePlayOneGame() {
      let cardNumbers = 0;
      let grid1Multo = false;
      let grid2Multo = false;
      let grid3Multo = false;
      this.multiplicationList = [];
      this.gameStatus = 2;

      while (!grid1Multo && !grid2Multo && !grid3Multo) {
        let multiNumber = this.generateNewMultiplication();
        cardNumbers++;
        if (this.multiplicationList.indexOf(multiNumber) === -1) {
          this.multiplicationList.push(multiNumber);
        }

        grid1Multo =
          this.selectedStrategy.strategyData[0].isChecked &&
          checkMulto(
            this.selectedStrategy.strategyData[0],
            this.multiplicationList
          ).length > 0;

        grid2Multo =
          this.selectedStrategy.strategyData[1].isChecked &&
          checkMulto(
            this.selectedStrategy.strategyData[1],
            this.multiplicationList
          ).length > 0;

        grid3Multo =
          this.selectedStrategy.strategyData[2].isChecked &&
          checkMulto(
            this.selectedStrategy.strategyData[2],
            this.multiplicationList
          ).length > 0;
      }

      if (grid1Multo && !grid2Multo && !grid3Multo) {
        this.winStats[0]++;
        this.winStats = [...this.winStats];
        this.totalCardNumbers += cardNumbers;
        this.gameNumber++;
      } else if (grid2Multo && !grid1Multo && !grid3Multo) {
        this.winStats[1]++;
        this.winStats = [...this.winStats];
        this.totalCardNumbers += cardNumbers;
        this.gameNumber++;
      } else if (grid3Multo && !grid1Multo && !grid2Multo) {
        this.winStats[2]++;
        this.winStats = [...this.winStats];
        this.totalCardNumbers += cardNumbers;
        this.gameNumber++;
      }
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
      this.gameStatus = 0;
      this.message = "";
      this.demoAutoOption = "1";
      this.multiplicationList = [];
    }
  }
};
</script>

<style scoped>
</style>