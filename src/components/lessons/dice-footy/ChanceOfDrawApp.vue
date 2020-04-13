<template>
  <div class="mt-3 mb-5">
    <app-lesson-title
      :title="'Chance of Draw'"
      :trialNumber="trialNumber"
      :numberTried="numberTried"
    ></app-lesson-title>
    <div class="row mb-5">
      <div class="col-12 col-md-3 col-sm-4 app--tally-table-container">
        <app-tally-table :tallyTable="tallyTable" :title="{col1: 'Diff', col2: 'Freq'}"></app-tally-table>
      </div>
      <div class="col-12 col-md-9 col-sm-8 pt-2">
        <div class="app--tally-graph-stat p-2">
          <span class="float-left font-weight-bold" v-if="occurrenceOfDraw>0">
            Draws: {{ occurrenceOfDraw }} &nbsp;&nbsp;&nbsp;
            {{ occurrenceOfDraw }} draw{{ occurrenceOfDraw > 1 ? 's' : ''}}({{ occurrencePercent }}%)
            1 in every {{ occurrenceInHowmanyGames }}
          </span>
          <span class="badge badge-success float-right">Max: {{ maxDiff }}</span>
        </div>
        <app-tally-graph
          :tallyTable="isFullGraph ? tallyTable : tallyTable.slice(0,21)"
          :trialNumber="trialNumber"
          :heightUnit="heightUnit"
        ></app-tally-graph>
      </div>
    </div>
    <div class="app--tally-game-container mt-5">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>
              <span class="app--table-long-name">Goals</span>
              <span class="app--table-short-name">G</span>
            </th>
            <th>
              <span class="app--table-long-name">Behinds</span>
              <span class="app--table-short-name">B</span>
            </th>
            <th>
              <span class="app--table-long-name">Points</span>
              <span class="app--table-short-name">Pts</span>
            </th>
            <th>
              <span class="app--table-long-name">Difference</span>
              <span class="app--table-short-name">Diff</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <span class="app--team-name">Team</span> A
            </th>
            <td>
              <span v-if="demoAutoOption==='0'">{{ teamAScoreArr[0]}}</span>
            </td>
            <td>
              <span v-if="demoAutoOption==='0'">{{ teamAScoreArr[1]}}</span>
            </td>
            <td>
              <span v-if="teamATotalScore > 0 && demoAutoOption==='0'">{{ teamATotalScore }}</span>
            </td>
            <td class="text-danger">
              <span v-if="diff >= 0 && demoAutoOption === '0'">{{ diff }}</span>
            </td>
          </tr>
          <tr>
            <th>
              <span class="app--team-name">Team</span> B
            </th>
            <td>
              <span v-if="demoAutoOption==='0'">{{ teamBScoreArr[0]}}</span>
            </td>
            <td>
              <span v-if="demoAutoOption==='0'">{{ teamBScoreArr[1]}}</span>
            </td>
            <td>
              <span v-if="teamBTotalScore > 0 && demoAutoOption==='0'">{{ teamBTotalScore }}</span>
            </td>
            <td>
              <input type="checkbox" id="full-graph" class="form-check-input" v-model="isFullGraph" />
              <label for="full-graph" class="form-check-label" style="font-size: 13px;">Full graph</label>
            </td>
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
      isFullGraph: false,
      teamAScoreArr: [],
      teamBScoreArr: []
    };
  },
  computed: {
    heightUnit() {
      if (this.trialNumber <= 100) {
        return 15;
      } else if (this.trialNumber <= 1000) {
        return 10;
      } else if (this.trialNumber <= 5000) {
        return 5;
      } else if (this.trialNumber <= 10000) {
        return 1;
      } else if (this.trialNumber <= 50000) {
        return 0.6;
      } else {
        return 0.2;
      }
    },

    teamATotalScore() {
      if (this.teamAScoreArr.length === 0) {
        return 0;
      }
      return this.teamAScoreArr[0] * 6 + this.teamAScoreArr[1];
    },
    teamBTotalScore() {
      if (this.teamBScoreArr.length === 0) {
        return 0;
      }
      return this.teamBScoreArr[0] * 6 + this.teamBScoreArr[1];
    },
    diff() {
      if (this.teamATotalScore > 0 && this.teamBTotalScore > 0) {
        return Math.abs(this.teamATotalScore - this.teamBTotalScore);
      } else {
        return -1;
      }
    },
    occurrenceOfDraw() {
      if (this.tallyTable.length === 0) {
        return 0;
      }
      return this.tallyTable[0].tally;
    },
    occurrencePercent() {
      return ((this.occurrenceOfDraw / this.numberTried) * 100).toFixed(3);
    },
    occurrenceInHowmanyGames() {
      return (this.numberTried / this.occurrenceOfDraw).toFixed(1);
    },
    maxDiff() {
      let maxDiff = 0;
      for (let i = 0; i < this.tallyTable.length; i++) {
        if (this.tallyTable[i].tally > 0 && this.tallyTable[i].unit > maxDiff) {
          maxDiff = this.tallyTable[i].unit;
        }
      }
      return maxDiff;
    },
    slicedTallyTable() {
      const temp = [...this.tallyTable];
      const slicedTallyTable = temp;
      return slicedTallyTable;
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
    },
    isFullGraph(value) {
      if (value === true) {
        this.tallyTable[5].mark = false;
        this.tallyTable[10].mark = false;
        this.tallyTable[15].mark = false;
      } else {
        this.tallyTable[5].mark = true;
        this.tallyTable[10].mark = true;
        this.tallyTable[15].mark = true;
      }
    }
  },
  methods: {
    calculateScoresOneGame() {
      if (this.isChangeRule) {
        let numberForQ1 = throwDiceTwo();
        let numberForQ2 = throwDiceTwo();
        let numberForQ3 = throwDiceTwo();
        let numberForQ4 = throwDiceTwo();

        let numberForGoals =
          numberForQ1[0] + numberForQ2[0] + numberForQ3[0] + numberForQ4[0];
        let numberForBehinds =
          numberForQ1[1] + numberForQ2[1] + numberForQ3[1] + numberForQ4[1];
        return [numberForGoals, numberForBehinds];
      } else {
        let numberForGoals =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        let numberForBehinds =
          throwDiceOnce() + throwDiceOnce() + throwDiceOnce() + throwDiceOnce();
        return [numberForGoals, numberForBehinds];
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
      this.teamAScoreArr = this.calculateScoresOneGame();
      this.teamBScoreArr = this.calculateScoresOneGame();
      let index = this.tallyTable.findIndex(el => {
        return el.unit === this.diff;
      });
      this.tallyTable[index].tally++;
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
      for (let i = 0; i <= 140; i++) {
        // 0 - the possible minimum score difference in a game (Draw)
        // 140 - the possible maximum score difference in a game, 168(Max score) - 28(Min score)
        if (i % 20 === 0) {
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
    }
  },
  created() {
    this.initTallyTable();
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
.table .app--table-short-name {
  display: none;
}
.app--tally-game-container {
  transform: translateY(25%);
}
@media only screen and (max-width: 768px) {
  .app--tally-game-container {
    transform: translateY(35%);
  }
}
@media only screen and (max-width: 425px) {
  .app--title {
    flex-direction: column;
  }
  .app--team-name {
    display: none;
  }
  .table .app--table-short-name {
    display: inline-block;
  }
  .table .app--table-long-name {
    display: none;
  }
  .app--tally-game-container {
    transform: translateY(35%);
  }
  .app--action {
    transform: translateY(15%);
  }
}
</style>
