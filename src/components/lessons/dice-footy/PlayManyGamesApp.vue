<template>
  <div class="mt-3 mb-5">
    <app-lesson-title
      :title="'Play Many Games'"
      :trialNumber="trialNumber"
      :numberTried="numberTried"
    ></app-lesson-title>
    <div class="app--score-table">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Goals</th>
            <th>Behinds</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>This game</th>
            <td>{{ goals > 0 && demoAutoOption==='0' ? goals : '' }}</td>
            <td>{{ behinds > 0 && demoAutoOption==='0' ? behinds : '' }}</td>
            <td>{{ points > 0 && demoAutoOption==='0' ? points : '' }}</td>
          </tr>
          <tr>
            <th>Average</th>
            <td>{{ averageGoals > 0 ? averageGoals.toFixed(2) : '' }}</td>
            <td>{{ averageBehinds > 0 ? averageBehinds.toFixed(2) : '' }}</td>
            <td>{{ averagePoints > 0 ? averagePoints.toFixed(2) : ''}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="app--action text-center">
      <h5
        class="text-danger text-center"
        :style="{visibility: isEnd ? 'visible' : 'hidden'}"
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
      <app-change-rule @changeRule="isChangeRule=$event" :isDisable="isStart"></app-change-rule>
    </div>
  </div>
</template>

<script>
import LessonTitle from "./LessonTitle.vue";
import ChangeRule from "./ChangeRule.vue";
import DemoAutoOption from "./DemoAutoOption.vue";
import { throwDiceOnce, throwDiceTwo } from "./utils.js";
import { calculateTimerInterval, legify } from "../../common/utils";

export default {
  props: ["trialNumber"],
  components: {
    appLessonTitle: LessonTitle,
    appChangeRule: ChangeRule,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      isStart: false, // If a game gets started
      isEnd: false, // If a game ends
      isChangeRule: false,
      demoAutoOption: "1", // 1- auto, 0 - demo
      timer: null,
      isAutoStart: false,
      numberTried: 0, // How many games are played
      goals: 0,
      behinds: 0,
      totalGoals: 0,
      totalBehinds: 0
    };
  },
  computed: {
    points() {
      return this.goals * 6 + this.behinds;
    },
    totalPoints() {
      return this.totalGoals * 6 + this.totalBehinds;
    },
    averageGoals() {
      if (this.numberTried && this.totalGoals) {
        return Number((this.totalGoals / this.numberTried).toFixed(2));
      } else {
        return 0;
      }
    },
    averageBehinds() {
      if (this.numberTried && this.totalBehinds) {
        return Number((this.totalBehinds / this.numberTried).toFixed(2));
      } else {
        return 0;
      }
    },
    averagePoints() {
      if (this.numberTried && this.totalPoints) {
        return Number((this.totalPoints / this.numberTried).toFixed(2));
      } else {
        return 0;
      }
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
    legify,
    playOneGame() {
      if (this.isChangeRule) {
        // If rule is changed
        // Play in each quarter.
        let numberForQ1 = throwDiceTwo();
        let numberForQ2 = throwDiceTwo();
        let numberForQ3 = throwDiceTwo();
        let numberForQ4 = throwDiceTwo();

        // Calculate total numbers of goals and behinds in one game
        this.goals =
          numberForQ1[0] + numberForQ2[0] + numberForQ3[0] + numberForQ4[0];
        this.behinds =
          numberForQ1[1] + numberForQ2[1] + numberForQ3[1] + numberForQ4[1];
        this.totalGoals += this.goals;
        this.totalBehinds += this.behinds;
      } else {
        this.goals =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        this.behinds =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        this.totalGoals += this.goals;
        this.totalBehinds += this.behinds;
      }
    },
    handleSetNextGame() {
      if (!this.isStart) this.isStart = true;
      this.playOneGame();
      this.numberTried++;
      if (this.numberTried >= this.trialNumber) {
        this.isEnd = true;
      }
    },
    handleReset() {
      this.goals = 0;
      this.behinds = 0;
      this.totalGoals = 0;
      this.totalBehinds = 0;
      this.isEnd = false;
      this.isStart = false;
      this.numberTried = 0;
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
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
@media only screen and (max-width: 425px) {
  .app--score-table td,
  .app--score-table th {
    font-size: 11px;
  }
}
</style>
