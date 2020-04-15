<template>
  <div class="app--container mt-3 mb-5">
    <div class="app--graph mb-3">
      <div class="app--dice-graph">
        <app-dice-graph :dice1="dice1" :dice2="dice2" v-if="gameType==1"></app-dice-graph>
      </div>
      <div class="app--diff-graph">
        <app-diff-graph :diceDiffArr="diceDiffArr" :trialNumber="trialNumber"></app-diff-graph>
      </div>
    </div>
    <div class="app--dice-diff mt-5 mb-3">
      <div class="app--dice-diff-label font-weight-bold text-primary">
        Dice diff<span class="app--hide-wording">erence</span>:
      </div>
      <div class="app--dice-diff-data">
        <div
          class="app--dice-diff-data-single font-weight-bold text-center"
          v-for="num in [0, 1, 2, 3, 4, 5]"
          :key="num"
        >{{ num }}</div>
      </div>
    </div>
    <div class="app--player mb-3">
      <div class="app--player-label font-weight-bold text-primary">Player:</div>
      <div class="app--player-data">
        <div
          class="app--player-data-single font-weight-bold"
          :class="{'app--player-set': !isSet}"
          v-for="(player, index) in playerSet"
          :key="index"
          @click="() => { handleTogglePlayer(index) }"
        >{{ player===0 ? "A" : "B" }}</div>
      </div>
    </div>
    <div class="app--game mb-3">
      <div class="app--game-label font-weight-bold text-primary">
        <table class="table table-sm table-borderless" style="border: none; !important">
          <tr>
            <th class="text-primary">Player A:</th>
          </tr>
          <tr>
            <th class="text-primary">Player B:</th>
          </tr>
        </table>
      </div>
      <div class="app--game-data">
        <div class="app--game-data-winning">
          <table
            class="table table-sm table-borderless table-responsive-sm"
            style="table-layout:fixed;"
          >
            <tr>
              <th>{{ legify(playAWinsNumber) }}</th>
              <th>{{ playAWinsPercent.toFixed(2) + '%' }}</th>
              <th>
                <span
                  v-if="trialNumber > 0"
                  class="app--game-data-tried font-weight-bold"
                >{{ legify(trialNumber) }} trials</span>
              </th>
            </tr>
            <tr>
              <th>{{ legify(playBWinsNumber) }}</th>
              <th>{{ playBWinsPercent.toFixed(2) + '%' }}</th>
              <th>
                <span
                  v-if="triedNumber > 0"
                  class="app--game-data-tried font-weight-bold"
                >Trial {{ legify(triedNumber) }}</span>
              </th>
            </tr>
          </table>
          <!-- {{ playAWinsNumber }}&nbsp;&nbsp;{{ playAWinsPercent + '%' }}<br>
          {{ playBWinsNumber }}&nbsp;&nbsp;{{ playBWinsPercent + '%' }}-->
        </div>
      </div>
    </div>
    <div class="app--action">
      <div>
        <span class="badge badge-danger" v-if="!isSet">Click on player to toggle</span>
      </div>
      <button
        class="btn btn-outline-success"
        v-if="!isSet"
        @click="handleSetPlayer"
      >Set players</button>
      <button
        class="btn btn-outline-success"
        v-if="isSet && demoAutoOption=='0' && gameType==2 && autoEnd==false"
        @click="handleNextMove"
      >Next move</button>
      <button
        class="btn btn-outline-dark"
        v-if="isSet && gameType==2 && autoEnd==true"
        @click="handleReset"
      >Reset</button>
      <button
        class="btn btn-outline-success"
        v-if="isSet && demoAutoOption=='0' && gameType==1"
        @click="handlePlayGame"
      >{{ shouldRecord ? "Record and graph" : "Roll dice" }}</button>
      <button
        class="btn btn-outline-success"
        v-if="isSet && demoAutoOption=='1' && autoEnd == false"
        @click="toggleTimer"
      >{{ timer ? "Pause" : "Resume" }}</button>
      <app-demo-auto-option
        v-if="isSet"
        class="mt-1"
        @changeOption="demoAutoOption=$event"
        :option="demoAutoOption"
      ></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import DiffGraph from "./DiffGraph.vue";
import DiceGraph from "./DiceGraph.vue";
import DemoAutoOption from "./DemoAutoOption.vue";
import { throwDice } from "./utils";
import {legify} from '../../common/utils.js';

export default {
  props: ["gameType", "trialNumber"], // gameType: 1 - Demonstration game, 2- Play many games
  components: {
    appDiceGraph: DiceGraph,
    appDiffGraph: DiffGraph,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      demoAutoOption: "0", // 0 - demo, 1 - auto
      diceDiffArr: [0, 0, 0, 0, 0, 0], // The array to recrod the occurrence of dice difference
      playerSet: [0, 0, 0, 1, 1, 1], // 0 - player A, 1 - player B
      // gameRecord: [0, 0],		// The array to record game result history
      triedNumber: 0, // How many games are played
      isSet: false, // If player is set
      shouldRecord: false, // If the dice is throwed and data is to be recorded
      playAWinsNumber: 0, // How many times player A wins
      playBWinsNumber: 0, // How many times player B wins
      playAWinsPercent: 0, // The percentage of player A wins
      playBWinsPercent: 0, // The percentage of player B wins
      dice1: null, // Number for dice 1
      dice2: null, // Number for dice 2
      timer: null,
      autoEnd: false // If auto playing is end
    };
  },
  computed: {
    playerAWinsPercent() {
      if (!this.triedNumber) return 0;
      return (this.playAWinsNumber / this.triedNumber) * 100;
    },
    playerBWinsPercent() {
      if (!this.triedNumber) return 0;
      return (this.playAWinsNumber / this.triedNumber) * 100;
    },
    timerInterval() {
      if (!this.trialNumber) return 50;
      if (this.trialNumber <= 100) {
        return 300;
      } else if (this.trialNumber <= 1000) {
        return 100;
      } else if (this.trialNumber <= 5000) {
        return 80;
      } else {
        return 50;
      }
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    triedNumber(value) {
      if (this.trialNumber && this.triedNumber >= this.trialNumber) {
        this.autoEnd = true;
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    diceDiffArr(value) {
      if (this.gameType === 1) {
        if (value[1] >= 100) {
          // this.autoEnd = true;
          clearInterval(this.timer);
          this.timer = null;
          this.isSet = false;
          this.demoAutoOption = "0";
        }
      }
    }
  },
  methods: {
    legify,
    handleTogglePlayer(index) {
      if (!this.isSet) {
        let toggledPlayer = this.playerSet[index] === 0 ? 1 : 0;
        this.playerSet.splice(index, 1, toggledPlayer);
      }
    },

    handleSetPlayer() {
      this.isSet = true;
      this.playAWinsNumber = 0;
      this.playBWinsNumber = 0;
      this.playAWinsPercent = 0;
      this.playBWinsPercent = 0;
      this.diceDiffArr = [0, 0, 0, 0, 0, 0];
      // this.playerSet = [0, 0, 0, 1, 1, 1];
      this.triedNumber = 0;
      this.autoEnd = false;
      this.dice1 = this.dice2 = null;
    },

    handleNextMove() {
      this.handleThrowDice();
      this.handleRecord();
    },

    handleThrowDice() {
      this.dice1 = throwDice();
      this.dice2 = throwDice();
      this.triedNumber++;
      this.shouldRecord = true;
    },

    handleRecord() {
      const diffIndex = Math.abs(this.dice1 - this.dice2);
      const newDiff = this.diceDiffArr[diffIndex] + 1;
      this.diceDiffArr.splice(diffIndex, 1, newDiff);

      if (this.playerSet[diffIndex] === 0) {
        this.playAWinsNumber++;
      }
      if (this.playerSet[diffIndex] === 1) {
        this.playBWinsNumber++;
      }
      this.playAWinsPercent = Number(
        ((this.playAWinsNumber / this.triedNumber) * 100).toFixed(2)
      );
      this.playBWinsPercent = Number(
        ((this.playBWinsNumber / this.triedNumber) * 100).toFixed(2)
      );
      this.shouldRecord = false;
    },

    handlePlayGame() {
      if (this.shouldRecord) {
        this.handleRecord();
      } else {
        this.handleThrowDice();
      }
    },

    toggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleNextMove, this.timerInterval);
      }
    },

    handleReset() {
      this.isSet = false;
      this.playAWinsNumber = 0;
      this.playBWinsNumber = 0;
      this.playAWinsPercent = 0;
      this.playBWinsPercent = 0;
      this.diceDiffArr = [0, 0, 0, 0, 0, 0];
      this.playerSet = [0, 0, 0, 1, 1, 1];
      this.triedNumber = 0;
      this.autoEnd = false;
      this.dice1 = this.dice2 = null;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--container {
  max-width: 750px;
  margin: 0 auto;
}
.app--graph,
.app--dice-diff,
.app--player,
.app--game {
  display: flex;
}
.app--dice-graph {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app--dice-diff-label,
.app--player-label,
.app--game-label {
  flex: 1;
  text-align: right;
  transform: translateX(-15%);
}
.app--diff-graph,
.app--dice-diff-data,
.app--player-data,
.app--game-data {
  flex: 3;
  display: flex;
  justify-content: space-between;
}
.app--game-data-winning {
  flex: 1;
  padding: 0 15px;
}
.app--game-data-tried {
  flex: 1;
}
.app--dice-diff-data-single,
.app--player-data-single {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 5px;
}
.app--player-data,
.app--dice-diff-data {
  padding-right: 10px;
}
.app--player-data-single {
  border: 1px solid #333;
}
.app--player-set {
  cursor: pointer;
}

.app--action {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 425px) {
  .app--hide-wording {
    display: none;
  }
}
</style>
