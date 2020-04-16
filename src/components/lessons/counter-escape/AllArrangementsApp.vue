<template>
  <div class="mt-3 mb-5">
    <h5 class="text-success text-center">{{ numberOfGames }} trials for each arrangement</h5>
    <div class="app--arrangement-table">
      <table class="table table-bordered" style="table-layout: fixed">
        <thead>
          <tr>
            <th class="text-center">Arrangement</th>
            <th class="text-center">Average</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(arrangement, index) in arrangementList" :key="index">
            <td class="text-center">{{ arrangement.join('') }}</td>
            <td
              class="text-center"
              :class="{ 'smallest-count': smallestAverageCounts === arrangementAverageCounts[index] }"
            >{{ arrangementAverageCounts[index] ? arrangementAverageCounts[index].toFixed(2) : '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5 class="text-success text-center">Remove a counter above if the roll is:</h5>
    <div class="app--rules-boxes">
      <div v-for="(rule, index) in ruleArray" :key="index">
        <app-rule-box :ruleNumber="rule.join(', ')"></app-rule-box>
      </div>
    </div>
    <div class="app--action">
      <button
        class="btn btn-outline-success"
        v-if="!isStart && !isEnd"
        @click="handleToggleTimer"
      >Start</button>
      <button
        class="btn btn-outline-success"
        v-if="isStart && !isEnd"
        @click="handleToggleTimer"
      >{{ timer ? "Pause" : "Resume" }}</button>
      <h5 v-if="isEnd" class="text-danger">Finished</h5>
      <button class="btn btn-outline-dark" v-if="isEnd" @click="handleReset">Reset</button>
    </div>
  </div>
</template>

<script>
import RuleBox from "./RuleBox.vue";
import { throwDice } from "./utils";
import { calculateTimerInterval } from "../../common/utils";
export default {
  components: {
    appRuleBox: RuleBox
  },
  props: ["gameRule", "numberOfGames"],
  data: function() {
    return {
      rule: this.gameRule.rule,
      arrangementList: [
        // List of all arrangements
        ["A", "A", "A"],
        ["B", "B", "B"],
        ["C", "C", "C"],
        ["A", "A", "B"],
        ["A", "A", "C"],
        ["A", "B", "B"],
        ["B", "B", "C"],
        ["A", "C", "C"],
        ["B", "C", "C"],
        ["A", "B", "C"]
      ],
      // arrangementListWatch: [],	// A copy of arrangementList for manipulation
      arrangementAverageCounts: Array(10), // Average counts of the arrangement
      isStart: false, // If the lesson is started
      isEnd: false, // If the lesson ends
      timer: null,
      rollCounts: 0, // How many rolls are counted to play one game
      gameCounts: 0, // How many games are played, up to the number of games
      totalRollCounts: 0, // How many rolls are counted in many games for an arrangement
      averageRollCounts: 0, // Average roll counts in many games for one arrangement
      currentArrangementIndex: 0, // The index of current arrangement in arrangementList array
      boxNames: ["A", "B", "C", "D", "E"],
      currentArrangement: [], // The current arrangment to test
      currentArrangementWatch: [] // // A copy of currentArrangement for manipulation
    };
  },
  computed: {
    ruleArray() {
      const ruleArray = [];
      for (let key in this.gameRule.rule) {
        ruleArray.push(this.gameRule.rule[key]);
      }
      return ruleArray;
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    smallestAverageCounts() {
      let smallest = this.arrangementAverageCounts[0];
      if (!smallest) return 0;
      for (let i = 0; i < this.arrangementAverageCounts.length; i++) {
        if (
          this.arrangementAverageCounts[i] &&
          this.arrangementAverageCounts[i] < smallest
        ) {
          smallest = this.arrangementAverageCounts[i];
        }
      }
      return smallest;
    }
    // currentArrangement() {	// The current arrangment to test
    // 	return this.arrangementList[this.currentArrangementIndex];
    // },
    // currentArrangementWatch() {	// A copy of currentArrangement for manipulation
    // 	if(!this.currentArrangement) {
    // 		return null;
    // 	}
    // 	return [...this.currentArrangement];
    // }
  },
  watch: {
    currentArrangementIndex(value) {
      if (value >= this.arrangementList.length) {
        this.isEnd = true;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }
  },
  methods: {
    playOnce() {
      let diceNumber, indexToRemove;
      while (true) {
        if (this.gameCounts >= this.numberOfGames) {
          this.currentArrangementIndex++;
          this.currentArrangement = this.arrangementList[
            this.currentArrangementIndex
          ];
          this.currentArrangementWatch = [...this.currentArrangement];
          this.averageRollCounts = this.rollCounts = this.totalRollCounts = 0;
          this.gameCounts = 0;
          break;
        }
        if (this.checkOneGameEnd()) {
          // If all counters are removed
          this.gameCounts++;
          this.totalRollCounts += this.rollCounts;
          this.averageRollCounts = this.totalRollCounts / this.gameCounts;
          this.arrangementAverageCounts[
            this.currentArrangementIndex
          ] = this.averageRollCounts;
          this.arrangementAverageCounts = [...this.arrangementAverageCounts];
          this.currentArrangementWatch = [...this.currentArrangement];
          this.rollCounts = 0;
          break;
        }
        diceNumber = throwDice(Number(this.gameRule.diceFaces));
        this.rollCounts++;
        indexToRemove = this.checkRemoveCounter(diceNumber);
        if (indexToRemove > -1) {
          // Remove the counter
          // Set the index of item in currentArrangementWatch array as null
          this.currentArrangementWatch[indexToRemove] = null;
        }
      }
    },
    checkRemoveCounter(diceNumber) {
      // Give a diceNumber, return the index of the box should be removed
      let removedBox;
      for (let key in this.rule) {
        if (this.gameRule.rule[key].indexOf(diceNumber) !== -1) {
          removedBox = this.boxNames[key - 1];
          break;
        }
      }
      return this.currentArrangementWatch.indexOf(removedBox);
    },
    checkOneGameEnd() {
      const filteredArrangement = this.currentArrangementWatch.filter(item => {
        return item !== null;
      });
      if (filteredArrangement.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    handleToggleTimer() {
      if (!this.isStart) {
        this.isStart = true;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.playOnce, this.timerInterval);
      }
      // this.currentArrangementIndex++;
      this.playOnce();
    },
    handleReset() {
      this.arrangementAverageCounts = Array(10);
      this.isStart = false;
      this.isEnd = false;
      this.timer = null;
      this.gameCounts = this.rollCounts = this.totalRollCounts = this.averageRollCounts = 0;
      this.currentArrangementIndex = 0;
      this.currentArrangement = this.arrangementList[
        this.currentArrangementIndex
      ];
      this.currentArrangementWatch = [...this.currentArrangement];
    }
  },
  created() {
    this.currentArrangement = this.arrangementList[0];
    // this.arrangementListWatch = [...this.arrangementList];
    this.currentArrangementWatch = [...this.currentArrangement];
  }
};
</script>

<style scoped>
.app--rules-boxes,
.app--action {
  display: flex;
  justify-content: center;
}
.app--action {
  flex-direction: column;
  align-items: center;
}
.app--arrangement-table {
  max-width: 500px;
  margin: 0 auto;
}
.smallest-count {
  color: red;
}
</style>
