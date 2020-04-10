<template>
  <div>
    <div class="mt-3 mb-5">
      <div class="app--title mb-3">
        <h4 class="text-success">Play Many Games - {{ trialNumber }} games</h4>
        <h4 class="text-success">Game {{ numberTried }}</h4>
      </div>
      <div class="app--score-table">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th class="text-danger">3P</th>
              <th class="text-danger">2P</th>
              <th class="text-danger">1P</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-danger">Average number</th>
              <td>{{ averageNumberFor3Point ? averageNumberFor3Point : '' }}</td>
              <td>{{ averageNumberFor2Point ? averageNumberFor2Point : '' }}</td>
              <td>{{ averageNumberFor1Point ? averageNumberFor1Point : '' }}</td>
              <td></td>
            </tr>
            <tr>
              <th class="text-danger">Total</th>
              <td>{{ totalNumberFor3Point ? separateNumber(totalNumberFor3Point * 3) : '' }}</td>
              <td>{{ totalNumberFor2Point ? separateNumber(totalNumberFor2Point * 2) : '' }}</td>
              <td>{{ totalNumberFor1Point ? separateNumber(totalNumberFor1Point * 1) : '' }}</td>
              <td
                class="text-primary"
              >{{ totalNumberForAll ? separateNumber(totalNumberForAll) : '' }}</td>
            </tr>
            <tr>
              <th class="text-danger">Average Points</th>
              <td>{{ averagePointsFor3Point ? averagePointsFor3Point : '' }}</td>
              <td>{{ averagePointsFor2Point ? averagePointsFor2Point : '' }}</td>
              <td>{{ averagePointsFor1Point ? averagePointsFor1Point : '' }}</td>
              <td class="text-primary">{{ averagePointsForAll ? averagePointsForAll : '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="app--action text-center">
        <h5
          class="text-danger text-center"
          :style="{visibility: isEnd ? 'visible' : 'hidden' }"
        >Finished</h5>
        <button
          class="btn btn-outline-success"
          v-if="!isEnd && demoAutoOption==='0'"
          @click="handleSetNextGame"
        >{{ isStart ? "Play next game" : "Play first game"}}</button>
        <button
          class="btn btn-outline-success"
          v-if="!isEnd && demoAutoOption==='1'"
          @click="handleToggleTimer"
        >{{ !isAutoStart ? "Start" : (timer ? "Pause" : "Resume") }}</button>
        <button class="btn btn-outline-dark" v-if="isEnd" @click="handleReset">Reset</button>
        <app-demo-auto-option
          class="mt-1"
          @changeOption="demoAutoOption=$event"
          :option="demoAutoOption"
        ></app-demo-auto-option>
      </div>
      <div>
        <app-change-rule @changeRule="isChangeRule=$event" :isStart="isStart"></app-change-rule>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeRule from "./ChangeRule.vue";
import DemoAutoOption from "./DemoAutoOption.vue";
import { throwDiceOnce, throwDiceThree } from "./utils.js";
import { calculateTimerInterval, separateNumber } from "../../common/utils";
export default {
  props: ["trialNumber"],
  components: {
    appChangeRule: ChangeRule,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      isStart: false, // If game gets started
      isEnd: false, // If game ends
      isChangeRule: false, // If "Change dice rule" is selected, false - not selected, true - selected
      demoAutoOption: "1", // "0" - demo, "1" - auto
      timer: null,
      isAutoStart: false, // If auto calculation gets started
      numberTried: 0, // How many games are tested
      // oneGame: [0, 0, 0],	// A game, each element is the number of balls for 3 pointer, 2 pointer and 1 pointer
      // averageNumber: [0, 0, 0],	// Store the average number of balls for 3 pointer, 2 pointer and 1 pointer,
      totalNumberFor3Point: 0,
      totalNumberFor2Point: 0,
      totalNumberFor1Point: 0,
      averageNumberFor3Point: 0,
      averageNumberFor2Point: 0,
      averageNumberFor1Point: 0,
      separateNumber
    };
  },
  computed: {
    averagePointsFor3Point() {
      return this.totalNumberFor3Point === 0
        ? 0
        : Number(
            ((this.totalNumberFor3Point * 3) / this.numberTried).toFixed(2)
          );
    },
    averagePointsFor2Point() {
      return this.totalNumberFor2Point === 0
        ? 0
        : Number(
            ((this.totalNumberFor2Point * 2) / this.numberTried).toFixed(2)
          );
    },
    averagePointsFor1Point() {
      return this.totalNumberFor1Point === 0
        ? 0
        : Number(
            ((this.totalNumberFor1Point * 1) / this.numberTried).toFixed(2)
          );
    },
    averagePointsForAll() {
      return Number(
        (
          this.averagePointsFor3Point +
          this.averagePointsFor2Point +
          this.averagePointsFor1Point
        ).toFixed(2)
      );
    },
    totalNumberForAll() {
      return (
        this.totalNumberFor3Point * 3 +
        this.totalNumberFor2Point * 2 +
        this.totalNumberFor1Point * 1
      );
    },
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
    isEnd(value) {
      if (value === true && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    playOneGame() {
      if (this.isChangeRule) {
        // If rule is changed
        // Get number of balls for each point in each quarter
        let numberForQ1 = throwDiceThree();
        let numberForQ2 = throwDiceThree();
        let numberForQ3 = throwDiceThree();
        let numberForQ4 = throwDiceThree();

        // Calculate total numbers of balls for 3 point, 2 point and 1 point
        let numberFor3Point =
          numberForQ1[0] + numberForQ2[0] + numberForQ3[0] + numberForQ4[0];
        let numberFor2Point =
          numberForQ1[1] + numberForQ2[1] + numberForQ3[1] + numberForQ4[1];
        let numberFor1Point =
          numberForQ1[2] + numberForQ2[2] + numberForQ3[2] + numberForQ4[2];
        // this.oneGame = [numberFor3Point, numberFor2Point, numberFor1Point];
        this.totalNumberFor3Point += numberFor3Point;
        this.totalNumberFor2Point += numberFor2Point;
        this.totalNumberFor1Point += numberFor1Point;
      } else {
        // If rule is not changed
        // Throw dice four times to get total numbers of balls for 3 point, 2 point and 1 point
        let numberFor3Point =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        let numberFor2Point =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        let numberFor1Point =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        // this.oneGame = [numberFor3Point, numberFor2Point, numberFor1Point];
        this.totalNumberFor3Point += numberFor3Point;
        this.totalNumberFor2Point += numberFor2Point;
        this.totalNumberFor1Point += numberFor1Point;
      }
    },
    calculateAverage() {
      // Calculate the average number of balls for 3 point, 2 point and 1 point
      if (this.numberTried > 0) {
        this.averageNumberFor3Point = Number(
          (this.totalNumberFor3Point / this.numberTried).toFixed(2)
        );
        this.averageNumberFor2Point = Number(
          (this.totalNumberFor2Point / this.numberTried).toFixed(2)
        );
        this.averageNumberFor1Point = Number(
          (this.totalNumberFor1Point / this.numberTried).toFixed(2)
        );
      }
    },
    handleReset() {
      this.totalNumberFor3Point = 0;
      this.totalNumberFor2Point = 0;
      this.totalNumberFor1Point = 0;
      this.averageNumberFor3Point = 0;
      this.averageNumberFor2Point = 0;
      this.averageNumberFor1Point = 0;
      this.isEnd = false;
      this.numberTried = 0;
    },
    handleSetNextGame() {
      if (!this.isStart) this.isStart = true;
      this.playOneGame();
      this.numberTried++;
      this.calculateAverage();
      if (this.numberTried >= this.trialNumber) {
        this.isEnd = true;
      }
    },
    handleToggleTimer() {
      if (!this.isAutoStart) this.isAutoStart = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleSetNextGame, this.timerInterval);
      }
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
.app--title {
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 576px) {
  .app--title {
    flex-direction: column;
  }
  .app--team-name {
    display: none;
  }
}
@media only screen and (max-width: 425px) {
  .app--score-table td,
  .app--score-table th {
    font-size: 11px;
  }
}
</style>
