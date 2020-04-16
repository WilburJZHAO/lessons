<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">What is the chance of landing on any square?</h3>
    <hr class="subheading-separator">
    <app-enter-trials-number v-if="trialNumber===null" @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
    <div v-else>
      <div class="row">
        <div class="col-md-8 mb-3">
          <app-chance-board
            :boardSettings="boardSettings"
            :gamesChanceData="gamesChanceData"
            :playedGames="playedGames"
          ></app-chance-board>
        </div>
        <div class="col-md-4">
          <div style="position: sticky; top: 0;">
            <h5 class="text-center">Play {{ legify(trialNumber) }} games</h5>
            <table class="table table-bordered" style="table-layout: fixed">
              <tr>
                <th>Game</th>
                <td>{{ legify(playedGames) }}</td>
              </tr>
              <tr>
                <th>Average</th>
                <td>{{ averageMoves }}</td>
              </tr>
              <tr>
                <th>Total moves</th>
                <td>{{ legify(totalMoves) }}</td>
              </tr>
            </table>
            <div class="text-center mb-2">
              <button
                v-if="demoAutoOption==='0' && !finished"
                class="btn btn-outline-success"
                @click="handlePlayOneGame"
              >Play one game</button>
              <button
                v-if="demoAutoOption==='1' && !finished"
                class="btn btn-outline-success"
                @click="handleToggleTimer"
              >{{ timer ? 'Pause' : playedGames ===0 ? 'Start' : 'Resume'}}</button>
              <button v-if="finished" class="btn btn-outline-dark" @click="handleReset">Reset</button>
            </div>
            <div v-if="finished" class="text-danger text-center">Finished</div>
            <div class="text-center mt-1">
              <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import ChanceBoard from "./ChanceBoard.vue";

import {
  legify,
  calculateTimerInterval,
  pickNumber
} from "../../common/utils.js";
export default {
  props: ["boardSettings"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appDemoAutoOption: DemoAutoOption,
    appChanceBoard: ChanceBoard
  },
  data: function() {
    return {
      trialNumber: null,
      demoAutoOption: "0",
      playedGames: 0,
      totalMoves: 0,
      timer: null,
      gamesChanceData: {}
    };
  },
  computed: {
    averageMoves() {
      if (this.playedGames === 0) {
        return null;
      }
      return (this.totalMoves / this.playedGames).toFixed(2);
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    finished() {
      return this.playedGames >= this.trialNumber;
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    finished(value) {
      if (value && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    legify,
    throwDice() {
      return pickNumber(1, 6);
    },
    initGamesData() {
      this.gamesChanceData = [];
      for (
        let num = 1;
        num <= this.boardSettings.columns * this.boardSettings.rows;
        num++
      ) {
        this.gamesChanceData.push(0);
      }
    },
    handlePlayOneGame() {
      this.playedGames++;
      let movesCount = 0;
      let playerNumber = 0;
      while (
        playerNumber <
        this.boardSettings.columns * this.boardSettings.rows
      ) {
        movesCount++;
        playerNumber += this.throwDice();

        if (
          playerNumber <=
          this.boardSettings.columns * this.boardSettings.rows
        ) {
          this.gamesChanceData[playerNumber - 1]++;
        }
      }
      this.gamesChanceData = [...this.gamesChanceData];

      this.totalMoves += movesCount;
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
      this.playedGames = 0;
      this.totalMoves = 0;
      this.demoAutoOption = "0";
      this.initGamesData();
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  created() {
    this.initGamesData();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
