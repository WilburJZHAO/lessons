<template>
  <div class="app--container">
    <h5 class="text-dark text-center">{{ matchSetting.wicketTaker }} takes a wicket</h5>
    <div class="row app--score-table mt-3">
      <div class="col-lg-6">
        <h5
          class="text-center"
          :title="matchSetting.teamAName"
          style="overflow: hidden;"
        >{{ matchSetting.teamAName }}</h5>
        <app-score-table  id="table1" :data="teamAScoreData" :shouldTally="tallyTeam==='A' ? true : false"></app-score-table>
      </div>
      <div class="col-lg-6">
        <h5
          class="text-center"
          :title="matchSetting.teamBName"
          style="overflow: hidden;"
        >{{ matchSetting.teamBName }}</h5>
        <app-score-table id="table2" :data="teamBScoreData" :shouldTally="tallyTeam==='B' ? true : false"></app-score-table>
      </div>
    </div>
    <div class="text-center mt-3" style="position: relative;">
      <div
        v-if="showStartMessage"
        class="app--prompt alert alert-primary"
        style="margin-bottom: 80px;"
      >{{ whoseTurn === 0 ? matchSetting.teamAName : matchSetting.teamBName }} has won the toss and elected to bat the first over.</div>
      <div
        v-if="result"
        class="app--prompt alert alert-danger"
      >Match completed. {{ result === 'A' ? matchSetting.teamAName : matchSetting.teamBName }} is the winner!</div>
      <button
        v-if="!result && demoAutoOption=='0'"
        class="btn btn-outline-success"
        @click="handlePlayMatch"
      >
        {{ !isStart ? "Start the game" :
        ( step===0 ? "Play the next ball" : "Tally score") }}
      </button>
      <button
        v-if="!result && demoAutoOption=='1'"
        class="btn btn-outline-success"
        @click="handleToggleTimer"
      >
        {{ !isStart ? "Start" :
        ( timer ? "Pause" : "Resume" ) }}
      </button>
      <button v-if="result" class="btn btn-outline-dark" @click="handleReset">Reset</button>
    </div>
    <div class="text-center mt-1">
      <app-demo-auto-option @changeOption="demoAutoOption=$event"></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import ScoreTable from "./ScoreTable.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { throwDiceOnce } from "./utils";

export default {
  props: ["matchSetting"],
  components: {
    appScoreTable: ScoreTable,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      demoAutoOption: "0",
      isStart: false,
      whoseTurn: null, // 0 - Team A's turn, 1- Team B's turn
      teamAScoreData: [],
      teamBScoreData: [],
      showStartMessage: false,
      step: 0, // 0 - to bowl, 1 - to tally
      tallyTeam: null, // 'A' - Tally team A, 'B' - Tally team B
      timer: null,
      canChangeTurn: false,
      maxWicket: 10,
      timerInterval: 200,
      result: null
    };
  },
  watch: {
    teamAScoreData(value) {
      if (
        this.matchSetting.isChange &&
        value.length > 0 &&
        value.length % 6 === 0 &&
        this.teamBTally[0] < this.maxWicket
      ) {
        // this.changeTurn();
        this.canChangeTurn = true;
      }
      this.$nextTick( function() {
        const t = document.getElementById("table1");
        t.scrollTop = t.scrollHeight;
      });
    },
    teamBScoreData(value) {
      if (
        this.matchSetting.isChange &&
        value.length > 0 &&
        value.length % 6 === 0 &&
        this.teamATally[0] < this.maxWicket
      ) {
        // this.changeTurn();
        this.canChangeTurn = true;
      }
      this.$nextTick( function() {
        const t = document.getElementById("table2");
        t.scrollTop = t.scrollHeight;
      });
    },
    teamATally(value) {
      if (!this.matchSetting.isChange && value[0] >= this.maxWicket) {
        this.canChangeTurn = true; // Decide when to change turn
      }
    },
    teamBTally(value) {
      if (!this.matchSetting.isChange && value[0] >= this.maxWicket) {
        this.canChangeTurn = true; // Decide when to change turn
      }
    },
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    result(value) {
      if (value) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  computed: {
    teamATally() {
      let wicketTally = 0;
      let tally = 0;
      for (let i = 0; i < this.teamAScoreData.length; i++) {
        if (this.teamAScoreData[i] === "W") {
          wicketTally++;
        } else {
          tally += this.teamAScoreData[i];
        }
      }
      return [wicketTally, tally];
    },
    teamBTally() {
      let wicketTally = 0;
      let tally = 0;
      for (let i = 0; i < this.teamBScoreData.length; i++) {
        if (this.teamBScoreData[i] === "W") {
          wicketTally++;
        } else {
          tally += this.teamBScoreData[i];
        }
      }
      return [wicketTally, tally];
    }
    // result() {

    // }
  },
  methods: {
    changeTurn() {
      if (this.whoseTurn === 0 && this.canChangeTurn) {
        this.whoseTurn = 1;
      } else if (this.whoseTurn === 1 && this.canChangeTurn) {
        this.whoseTurn = 0;
      }
      this.canChangeTurn = false;
    },
    /** Throw dice, ie. Generate a random number between 1-6,
     * If the number happens to be the wicketTaker, return W, otherwise return the number
     */
    handleBowl() {
      this.tallyTeam = null;
      let diceNumber = throwDiceOnce();
      if (diceNumber === this.matchSetting.wicketTaker) {
        diceNumber = "W";
      }
      if (this.whoseTurn === 0) {
        this.teamAScoreData.push(diceNumber);
      } else {
        this.teamBScoreData.push(diceNumber);
      }
      this.step = 1;
    },
    /** Append the bowlNumber to the scoreData for team A or team B */
    handleTally() {
      if (this.whoseTurn === 0) {
        this.tallyTeam = "A";
      }
      if (this.whoseTurn === 1) {
        this.tallyTeam = "B";
      }
      this.step = 0;
    },
    /** Handle click button */
    handlePlayMatch() {
      if (!this.isStart) {
        this.isStart = true;
        if (Math.random() < 0.5) {
          this.whoseTurn = 0;
        } else {
          this.whoseTurn = 1;
        }
        this.showStartMessage = true;
        return;
      }
      this.showStartMessage = false;

      if (this.step === 0) {
        if (this.canChangeTurn) {
          this.changeTurn();
        }

        this.handleBowl();
      } else if (this.step === 1) {
        this.handleTally();
        this.checkResult();
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlayMatch, this.timerInterval);
      }
    },
    handleReset() {
      this.isStart = false;
      this.whoseTurn = null; // 0 - Team A's turn, 1- Team B's turn
      this.teamAScoreData = [];
      this.teamBScoreData = [];
      this.step = 0; // 0 - to bowl, 1 - to tally
      this.tallyTeam = null; // 'A' - Tally team A, 'B' - Tally team B
      this.timer = null;
      this.canChangeTurn = false;
      this.result = null;
    },
    checkResult() {
      // Get the result of a game, 'A' - team A wins, 'B' - team B wins
      let [teamAWicket, teamAScore] = this.teamATally;
      let [teamBWicket, teamBScore] = this.teamBTally;
      let resultChecked = null;
      if (
        teamAWicket === this.maxWicket &&
        teamBWicket > 0 &&
        teamBWicket < this.maxWicket
      ) {
        //A 队到this.maxWicket ，B队没到this.maxWicket， 但B队的分数已经超过A队，这时判B胜
        if (teamBScore > teamAScore) {
          resultChecked = "B";
        }
      } else if (
        teamBWicket === this.maxWicket &&
        teamAWicket > 0 &&
        teamAWicket < this.maxWicket
      ) {
        //同上B 队到this.maxWicket ，A队没到this.maxWicket， 但A队的分数已经超过B队，这时判A胜
        if (teamAScore > teamBScore) {
          resultChecked = "A";
        }
      } else if (
        teamAWicket === this.maxWicket &&
        teamBWicket === this.maxWicket
      ) {
        // 如果两队同时到了this.maxWicket，就直接看分数高低
        if (teamAScore > teamBScore) {
          resultChecked = "A";
        }
        if (teamBScore > teamAScore) {
          resultChecked = "B";
        }
      }
      this.result = resultChecked;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--container {
  width: 95vw;
  margin: 0 auto;
}
.app--prompt {
  position: absolute;
  left: 50%;
  top: 200%;
  transform: translateX(-50%);
}
</style>
