<template>
  <div class="container">
    <h3 class="text-success text-center mb-4">
      <small>{{ legify(matchNumber * 2) }} innings</small>
    </h3>
    <div class="row">
      <div class="col-md-6">
        <app-many-matches-table
          :matchPlayedNumber="matchPlayedNumber"
          :matchData="matchData"
          :ballCount="ballCount"
          :runCount="runCount"
          :ties="ties"
        ></app-many-matches-table>
      </div>
      <div class="col-md-6">
        <app-many-matches-graph
          :matchData="matchData"
          :graphData="graphData"
          :matchPlayedNumber="matchPlayedNumber"
          :heightUnit="heightUnit"
          :runCount="runCount"
        ></app-many-matches-graph>
      </div>
    </div>

    <div v-if="!isStart" class="text-center mb-2">
      <h6 class="text-center">Set the wicket taker</h6>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="wicket-taker-1"
          class="form-check-input"
          v-model="wicketTaker"
          :value="1"
        />
        <label for="wicket-taker-1" class="form-check-label">1</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="wicket-taker-2"
          class="form-check-input"
          v-model="wicketTaker"
          :value="2"
        />
        <label for="wicket-taker-2" class="form-check-label">2</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="wicket-taker-3"
          class="form-check-input"
          v-model="wicketTaker"
          :value="3"
        />
        <label for="wicket-taker-3" class="form-check-label">3</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="wicket-taker-4"
          class="form-check-input"
          v-model="wicketTaker"
          :value="4"
        />
        <label for="wicket-taker-4" class="form-check-label">4</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="wicket-taker-5"
          class="form-check-input"
          v-model="wicketTaker"
          :value="5"
        />
        <label for="wicket-taker-5" class="form-check-label">5</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="wicket-taker-6"
          class="form-check-input"
          v-model="wicketTaker"
          :value="6"
        />
        <label for="wicket-taker-6" class="form-check-label">6</label>
      </div>
    </div>

    <div class="text-center mt-3">
      <button
        v-if="!isFinish && demoAutoOption=='0'"
        class="btn btn-outline-success"
        @click="handleNextMatch"
      >Play next match</button>
      <button
        v-if="!isFinish && demoAutoOption=='1'"
        class="btn btn-outline-success"
        @click="handleToggleTimer"
      >
        {{ !isStart ? "Start" :
        ( timer ? 'Pause' : 'Resume' )
        }}
      </button>
      <button v-if="isFinish" class="btn btn-outline-dark" @click="handleReset">Reset</button>
    </div>
    <div class="text-center mt-1">
      <app-demo-auto-option :option="demoAutoOption" @changeOption="demoAutoOption=$event"></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import ManyMatchesTable from "./ManyMatchesTable.vue";
import ManyMatchesGraph from "./ManyMatchesGraph.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { throwDiceOnce } from "./utils";
import { calculateTimerInterval, legify } from "../../common/utils";

export default {
  props: ["trialNumber"],
  components: {
    appManyMatchesTable: ManyMatchesTable,
    appManyMatchesGraph: ManyMatchesGraph,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      matchNumber: null,
      matchPlayedNumber: 0,
      matchData: [],
      wicketTaker: 5,
      isStart: false,
      isFinish: false,
      demoAutoOption: "1",
      timer: null,
      // wicket: 0,
      maxWicket: 10,
      ties: 0,
      graphData: [],
      ballCount: 0, // ballCount / 6 should be over
      runCount: 0
      // score: 0
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    heightUnit() {
      if (this.trialNumber <= 100) {
        return 5;
      } else if (this.trialNumber <= 500) {
        return 2;
      } else if (this.trialNumber <= 1000) {
        return 1.5;
      } else if (this.trialNumber <= 5000) {
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
    isFinish(value) {
      if (value) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    legify,
    playOneInnings() {
      let score = 0;
      let wicket = 0;
      // console.log(diceNumber);
      while (wicket < this.maxWicket) {
        let diceNumber = throwDiceOnce();
        this.ballCount += 1;
        if (diceNumber == this.wicketTaker) {
          wicket++;
        } else {
          score += diceNumber;
          this.runCount += diceNumber;
        }
      }
      // this.matchData.push(score);
      return score;
    },
    setGraphArray(score) {
      if (score > 0 && score <= 500) {
        let index = Math.ceil(score / 10); // 将数字除以10再往上进到最近的一个能被10整除的整数
        // e.g. 131 -> 13.1 -> 14, 139 -> 13.9 -> 14, 130 -> 13 -> 13
        // this.graphData[scoreInt10-1]++;
        // this.graphData = [...this.graphData];
        this.graphData = [
          ...this.graphData.slice(0, index - 1),
          ++this.graphData[index - 1],
          ...this.graphData.slice(index)
        ];
      }
    },
    playOneMatch() {
      let score1 = this.playOneInnings();
      let score2 = this.playOneInnings();
      this.matchData.push(score1);
      this.matchData.push(score2);
      this.setGraphArray(score1);
      this.setGraphArray(score2);
      if (score1 === score2) {
        this.ties++;
      }
      this.matchData.sort((e1, e2) => {
        if (e1 < e2) {
          return -1;
        } else {
          return 1;
        }
      });
    },
    handleNextMatch() {
      if (!this.isStart) {
        this.isStart = true;
      }
      this.playOneMatch();
      this.matchPlayedNumber++;
      if (this.matchPlayedNumber >= this.matchNumber) {
        this.isFinish = true;
      }
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleNextMatch, this.timerInterval);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleReset() {
      this.isStart = false;
      this.isFinish = false;
      this.matchData = [];
      this.matchPlayedNumber = 0;
      this.ties = 0;
      this.ballCount = 0;
      this.runCount = 0;
      for (let i = 0; i < 50; i++) {
        // Initiazlie graphData with an array of 50 items and each item has value 0
        this.graphData[i] = 0;
      }
      this.graphData = [...this.graphData];
    }
  },
  created() {
    this.matchNumber = Number(this.trialNumber);
    for (let i = 0; i < 50; i++) {
      // Initiazlie graphData with an array of 50 items and each item has value 0
      this.graphData[i] = 0;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
</style>
