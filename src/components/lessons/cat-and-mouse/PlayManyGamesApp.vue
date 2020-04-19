<template>
  <div class="container mt-4 mb-5">
    <h3 class="lesson-subheading">Play many games</h3>
    <hr class="subheading-separator"> <br>
    <div class="mb-2">
      <app-gameboard
        :gameboardIndex="gameboardIndex"
        :gameboardSrc="game.gameboardSrc"
        :mouseSrc="mouseSrc"
        :mousePosition="{left: game.initPosition.left, top: game.initPosition.top}"
      ></app-gameboard>
    </div>
    <div class="text-center mb-4">
      <button
        class="btn btn-sm btn-outline-dark"
        @click="handleNextGameboard"
        :disabled="isStart"
      >Next gameboard</button>
    </div>

    <div class="app--stat">
      <h4 class="text-success text-center">
        <span v-if="game.ruleType==='decimal'">Move left: Prob = {{ game.ruleLeft }}</span>
        <span v-else-if="game.ruleType==='dice'">
          {{ game.ruleLeft.join('') === '135' ?
          "O for Odd, E for Even numbers" :
          `Move left for ${game.ruleLeft.join()}`
          }} - {{ legify(trialNumber) }} trials
        </span>
        <span v-else></span>
      </h4>
      <table class="table" style="table-layout:fixed;">
        <tr>
          <th>Mouse</th>
          <td>
            <span v-if="total > 0">{{ legify(mouseWins) }}</span>
          </td>
          <td>
            <span v-if="total > 0">{{ mouseWinsPercent.toFixed(2) }}%</span>
          </td>
        </tr>
        <tr>
          <th>Cat</th>
          <td>
            <span v-if="total > 0">{{ legify(catWins) }}</span>
          </td>
          <td>
            <span v-if="total > 0">{{ catWinsPercent.toFixed(2) }}%</span>
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>
            <span v-if="total > 0">{{ legify(total) }}</span>
          </td>
          <td>
            <span v-if="isStart && game.ruleType==='decimal'">{{ randomNumber }}</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="text-center mb-1">
      <div>
        <span v-if="isFinish" class="badge badge-danger">Trials complete</span>
      </div>
      <button
        class="btn btn-outline-success mb-2"
        @click="handlePlayOneGame"
        v-if="!isFinish && demoAutoOption == '0'"
      >
        {{ isStart ?
        "Next game" :
        "Start"
        }}
      </button>
      <button
        class="btn btn-outline-success mb-2"
        @click="handleToggleTimer"
        v-if="!isFinish && demoAutoOption == '1'"
      >
        {{ !isStart ? "Start" :
        timer ? "Pause" : "Resume"
        }}
      </button>
      <button class="btn btn-outline-dark mb-2" @click="handleReset" v-if="isFinish">Reset</button>
      <app-demo-auto-option
        @changeOption="demoAutoOption=$event"
        :option="demoAutoOption"
        :disabled="isStart"
      ></app-demo-auto-option>
    </div>
    <div class="text-info text-center mt-4">
      Special thanks to 4S from Milgate Primary School for designing gameboards 2, 3 and 4!
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import Gameboard from "./Gameboard.vue";
import mouse from "@/assets/cat-and-mouse/mouse.jpg";
import Game from "./game/Game";
import { calculateTimerInterval, legify } from "../../common/utils";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption,
    appGameboard: Gameboard
  },
  props: ["rule", "currentGameboardIndex", "trialNumber"],
  data: function() {
    return {
      game: null,
      mouseSrc: mouse,
      demoAutoOption: "1",
      gameboardIndex: null,
      result: null,
      total: 0,
      mouseWins: 0,
      catWins: 0,
      isStart: false,
      isFinish: false,
      randomNumber: null,
      timer: null
    };
  },
  computed: {
    mouseWinsPercent() {
      if (this.total === 0) {
        return 0;
      }
      return Number(((this.mouseWins / this.total) * 100).toFixed(2));
    },
    catWinsPercent() {
      if (this.total === 0) {
        return 0;
      }
      return Number(((this.catWins / this.total) * 100).toFixed(2));
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
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
    initGame() {
      this.isStart = false;
      this.isFinish = false;
      this.result = null;
      this.timer = null;
      this.total = this.catWins = this.mouseWins = 0;
      this.game = new Game(this.gameboardIndex, this.rule);
    },
    handleNextGameboard() {
      if (this.gameboardIndex === 3) this.gameboardIndex = 0;
      else this.gameboardIndex++;
      this.initGame();
      // this.$emit('nextGameboard', this.gameboardIndex);
    },
    handlePlayOneGame() {
      if (!this.isStart) {
        this.isStart = true;
      }
      do {
        let randomNumber = this.game.createRandomNumber();
        this.game.moveToNextPosition(randomNumber);
        this.result = this.game.getResult();
      } while (this.result === null);
      this.total++;
      if (this.result === 0) {
        this.catWins++;
      } else {
        this.mouseWins++;
      }
      this.game = new Game(this.gameboardIndex, this.rule);
      if (this.total >= this.trialNumber) {
        this.isFinish = true;
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
      this.initGame();
    }
  },
  created() {
    this.gameboardIndex = this.currentGameboardIndex;
    this.initGame();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--stat {
  margin: 0 auto;
  max-width: 500px;
  position: relative;
}
</style>
