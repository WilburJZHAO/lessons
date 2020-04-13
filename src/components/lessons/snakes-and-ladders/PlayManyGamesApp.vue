<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-8 mb-3">
        <app-board :boardSettings="boardSettings"></app-board>
      </div>
      <div class="col-md-4">
        <div style="position: sticky; top:0;">
          <h5 class="text-center">Play {{ trialNumber}} games</h5>
          <table class="table table-bordered" style="table-layout: fixed">
            <tr>
              <th>Game</th>
              <td>{{ playedGames }}</td>
            </tr>
            <tr>
              <th>Average</th>
              <td>{{ average }}</td>
            </tr>
            <tr>
              <th>Minimum</th>
              <td>{{ minimum }}</td>
            </tr>
            <tr>
              <th>Maximum</th>
              <td>{{ maximum }}</td>
            </tr>
            <tr>
              <th>Frequency of minimum</th>
              <td>{{ freqMin }}</td>
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
</template>

<script>
import Board from "./Board.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { pickNumber, calculateTimerInterval } from "../../common/utils";
export default {
  props: ["boardSettings", "trialNumber"],
  components: {
    appBoard: Board,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      demoAutoOption: "0",
      timer: null,
      minimum: 0,
      maximum: 0,
      freqMin: 0,
      sum: 0,
      playedGames: 0
    };
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
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    finished() {
      return this.playedGames >= this.trialNumber;
    },
    average() {
      if (this.playedGames === 0) {
        return 0;
      }
      return Number((this.sum / this.playedGames).toFixed(2));
    }
  },
  methods: {
    throwDice() {
      return pickNumber(1, 6);
    },
    handlePlayOneGame() {
      let movesCount = 0;
      let playerNumber = 0;
      this.playedGames++;
      while (
        playerNumber <
        this.boardSettings.columns * this.boardSettings.rows
      ) {
        movesCount++;
        playerNumber += this.throwDice();
        this.boardSettings.snakes.forEach(snake => {
          if (playerNumber === snake.from) {
            playerNumber = snake.to;
          }
        });
        this.boardSettings.ladders.forEach(ladder => {
          if (playerNumber === ladder.from) {
            playerNumber = ladder.to;
          }
        });
      }
      this.sum += movesCount;
      if (this.playedGames === 1) {
        this.minimum = movesCount;
        this.maximum = movesCount;
        this.freqMin = 1;
      } else {
        if (movesCount < this.minimum) {
          this.minimum = movesCount;
          this.freqMin = 1;
        } else if (movesCount === this.minimum) {
          this.freqMin++;
        } else if (movesCount > this.maximum) {
          this.maximum = movesCount;
        }
      }
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
      this.demoAutoOption = "0";
      this.minimum = 0;
      this.maximum = 0;
      this.freqMin = 0;
      this.sum = 0;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
