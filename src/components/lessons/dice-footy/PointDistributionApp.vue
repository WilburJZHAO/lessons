<template>
  <div class="mt-3 mb-5">
    <app-lesson-title
      :title="'Point Distrubution'"
      :trialNumber="trialNumber"
      :numberTried="numberTried"
    ></app-lesson-title>
    <div class="row mb-5">
      <div class="col-12 col-md-3 col-sm-4 app--tally-table-container">
        <app-tally-table :tallyTable="tallyTable" :title="{col1: 'Pts', col2: 'Freq'}"></app-tally-table>
      </div>
      <div class="col-12 col-md-9 col-sm-8 app--tally-graph-container">
        <div class="app--tally-graph-stat p-2">
          <span class="badge badge-danger" v-if="minPoints > 0">Min: {{ minPoints}}</span>
          <span class="badge badge-success" v-if="maxPoints > 0">Max: {{ maxPoints }}</span>
        </div>
        <app-tally-graph
          :tallyTable="distributionTable"
          :trialNumber="trialNumber"
          :heightUnit="heightUnit"
        ></app-tally-graph>
      </div>
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
      <div>
        <app-change-rule @changeRule="isChangeRule=$event" :isDisable="isStart"></app-change-rule>
      </div>
    </div>
  </div>
</template>

<script>
import LessonTitle from "./LessonTitle.vue";
import TallyTable from "./TallyTable.vue";
import TallyGraph from "./TallyGraph.vue";
import ChangeRule from "./ChangeRule.vue";
import DemoAutoOption from "./DemoAutoOption";
import { throwDiceOnce, throwDiceTwo, getTimerInterval } from "./utils";
import { calculateTimerInterval } from "../../common/utils";

export default {
  props: ["trialNumber"],
  components: {
    appLessonTitle: LessonTitle,
    appChangeRule: ChangeRule,
    appDemoAutoOption: DemoAutoOption,
    appTallyTable: TallyTable,
    appTallyGraph: TallyGraph
  },
  data: function() {
    return {
      isStart: false,
      isEnd: false,
      isChangeRule: false,
      demoAutoOption: "1",
      timer: null,
      timerInterval: null,
      isAutoStart: false,
      numberTried: 0,
      tallyTable: [],
      distributionTable: []
    };
  },
  computed: {
    reversedTallyTable() {
      const tallyTableCopy = [...this.tallyTable];
      return tallyTableCopy.reverse();
    },
    maxPoints() {
      const index = this.reversedTallyTable.findIndex(el => {
        return el.tally > 0;
      });
      if (index === -1) return 0;
      return this.reversedTallyTable[index].unit;
    },
    minPoints() {
      const index = this.tallyTable.findIndex(el => {
        return el.tally > 0;
      });
      if (index === -1) return 0;
      return this.tallyTable[index].unit;
    },
    heightUnit() {
      if (this.trialNumber <= 100) {
        return 10;
      } else if (this.trialNumber <= 1000) {
        return 5;
      } else if (this.trialNumber <= 5000) {
        return 1;
      } else if (this.trialNumber <= 10000) {
        return 0.3;
      } else if (this.trialNumber <= 50000) {
        return 0.1;
      } else {
        return 0.05;
      }
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
    calculatePointsOneGame() {
      if (this.isChangeRule) {
        let numberForQ1 = throwDiceTwo();
        let numberForQ2 = throwDiceTwo();
        let numberForQ3 = throwDiceTwo();
        let numberForQ4 = throwDiceTwo();

        let numberForGoals =
          numberForQ1[0] + numberForQ2[0] + numberForQ3[0] + numberForQ4[0];
        let numberForBehinds =
          numberForQ1[1] + numberForQ2[1] + numberForQ3[1] + numberForQ4[1];
        return numberForGoals * 6 + numberForBehinds;
      } else {
        let numberForGoals =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        let numberForBehinds =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        return numberForGoals * 6 + numberForBehinds;
      }
    },
    handleReset() {
      this.isStart = false;
      this.isEnd = false;
      this.numberTried = 0;
      this.tallyTable = [];
      this.initTallyTable();
    },
    handleSetNextGame() {
      if (!this.isStart) this.isStart = true;
      let points = this.calculatePointsOneGame();
      let pointsIn10 = Math.floor(points / 10) * 10; // 将分数points向下转换成逢10的数 e.g. 56->50, 112->110
      let index = this.tallyTable.findIndex(el => {
        return el.unit === points;
      });
      let indexInDis = this.distributionTable.findIndex(el => {
        return el.unit === pointsIn10;
      });
      this.tallyTable[index].tally++;
      this.distributionTable[indexInDis].tally++;

      this.numberTried++;
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
    },
    initTallyTable() {
      for (let i = 28; i <= 168; i++) {
        // 28 - the possible minimum scores in a game, (6*1 + 1*1)*4 = 28
        // 168 - the possible maximum scores in a game, (6*6 + 1*6)*4 = 168
        if (i === 28 || i === 168 || i % 20 === 0) {
          this.tallyTable.push({
            unit: i,
            tally: 0,
            mark: true
          });
        } else {
          this.tallyTable.push({
            unit: i,
            tally: 0,
            mark: false
          });
        }
      }
    },
    initDistributionTable() {
      for (let i = 0; i <= 20; i++) {
        this.distributionTable.push({
          unit: i * 10,
          tally: 0,
          mark: true
        });
      }
    }
  },
  created() {
    this.initTallyTable();
    this.initDistributionTable();
    this.timerInterval = calculateTimerInterval(this.trialNumber);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.app--tally-table-container {
  height: 650px;
  overflow-y: scroll;
}
.app--tally-graph-container {
  min-height: 500px;
}
.app--tally-graph-stat {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.app--action {
  transform: translateY(15%);
}
</style>
