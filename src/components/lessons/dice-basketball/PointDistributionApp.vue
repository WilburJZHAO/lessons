<template>
  <div>
    <div class="container mt-3 mb-5">
      <div class="app--title mb-3">
        <h4 class="text-success">Total games: {{ legify(trialNumber) }}</h4>
        <h4 class="text-success">{{ legify(numberTried) }} games played</h4>
      </div>
      <div class="row mb-5">
        <div class="col-12 col-md-3 col-sm-4 app--tally-table">
          <div class="app--tally-table-item app--tally-table-title mb-2">
            <span class="badge badge-dark" style="transform: translateX(50%)">Pts</span>
            <span class="badge badge-dark">Tally</span>
          </div>
          <ul class="list-group" v-if="isStart===true">
            <li
              v-for="(item, index) in tallyTable"
              :key="index"
              class="list-group-item app--tally-table-item"
              :class="index%2===0 ? 'list-group-item-dark' : ''"
            >
              <span>{{ item.points }}</span>
              <span>{{ item.tally }}</span>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-9 col-sm-8 pt-3 app--tally-graph-container">
          <div class="app--tally-graph-stat p-2">
            <span class="badge badge-danger" v-if="minPoint > 0">Min: {{ minPoint}}</span>
            <span class="badge badge-success" v-if="maxPoint > 0">Max: {{ maxPoint }}</span>
          </div>
          <div class="app--tally-graph">
            <div
              v-for="(item, index) in tallyTable"
              :key="index"
              class="app--tally-graph-bar"
              :style="{height: item.tally*unit + 'px'}"
            >
              <div class="app--tally-graph-index" v-if="index===0 || index===60 || index === 120">
                <div class="app--tally-graph-index-mark">|</div>
                <div class="app--tally-graph-index-num">{{ item.points }}</div>
              </div>
            </div>
          </div>
          <!-- <div class="app--tally-graph-mark">
						<div>24</div>
						<div>84</div>
						<div>144</div>
          </div>-->
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
import { calculateTimerInterval, legify } from "../../common/utils";
export default {
  props: ["trialNumber"],
  components: {
    appChangeRule: ChangeRule,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      isStart: false,
      isEnd: false,
      isChangeRule: false,
      demoAutoOption: "1",
      timer: null,
      isAutoStart: false,
      numberTried: 0,
      tallyTable: []
      // reversedTallyTable: []
    };
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
  computed: {
    unit() {
      if (this.trialNumber <= 100) {
        return 15;
      } else if (this.trialNumber <= 1000) {
        return 10;
      } else if (this.trialNumber <= 5000) {
        return 3;
      } else if (this.trialNumber <= 10000) {
        return 1;
      } else if (this.trialNumber <= 50000) {
        return 0.4;
      } else {
        return 0.2;
      }
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    reversedTallyTable() {
      const tallyTableCopy = [...this.tallyTable];
      return tallyTableCopy.reverse();
    },
    maxPoint() {
      // const reversedTallyTable = this.tallyTable.reverse();
      const index = this.reversedTallyTable.findIndex(el => {
        return el.tally > 0;
      });
      if (index === -1) return null;
      return this.reversedTallyTable[index].points;
    },
    minPoint() {
      const index = this.tallyTable.findIndex(el => {
        return el.tally > 0;
      });
      if (index === -1) return null;
      return this.tallyTable[index].points;
    }
  },
  methods: {
    legify,
    calculatePointsInOneGame() {
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
        return numberFor3Point * 3 + numberFor2Point * 2 + numberFor1Point * 1;
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
        return numberFor3Point * 3 + numberFor2Point * 2 + numberFor1Point * 1;
      }
    },
    handleReset() {
      this.isEnd = false;
      this.numberTried = 0;
      this.tallyTable = [];
      this.initTallyTable();
    },
    handleSetNextGame() {
      if (!this.isStart) this.isStart = true;
      let points = this.calculatePointsInOneGame(); // Get total points in a game
      let index = this.tallyTable.findIndex(el => {
        return el.points === points;
      });
      this.tallyTable[index].tally++; // Increment tally by 1.
      // console.log(points, '-', index);
      // console.log(this.tallyTable);

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
      for (let i = 24; i <= 144; i++) {
        // Initialize tally table
        // 24 - the possible minmum scores in a game,  (1*3+1*2+1*1)*4 = 24
        // 144 - the possible maximum scores in a game  (6*3+6*2+6*1)*4 = 144
        this.tallyTable.push({
          points: i,
          tally: 0
        });
      }
    }
  },
  created() {
    this.initTallyTable();
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.app--title {
  display: flex;
  justify-content: space-between;
}
.app--tally-table {
  height: 650px;
  overflow-y: scroll;
  /* position: relative; */
}
/* .app--tally-table-title {
	position: absolute;
	top: 0;
} */
.app--tally-table-item {
  display: flex;
  justify-content: space-around;
}
.app--tally-graph-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 650px;
  position: relative;
}
.app--tally-graph-stat {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.app--tally-graph {
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
  width: 100%;
  border: 1px solid #555;
  border-bottom: none;
  height: 100%;
}
.app--tally-graph-bar {
  width: 0.83%;
  background-color: blue;
  border: 1px solid #000;
  border-bottom: none;
  position: relative;
}
.app--tally-graph-index {
  width: 100%;
  position: absolute;
  bottom: -28px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app--tally-graph-index-mark {
  height: 10px;
  overflow: hidden;
}
.app--tally-graph-mark {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 576px) {
  .app--title {
    flex-direction: column;
  }
}
</style>
