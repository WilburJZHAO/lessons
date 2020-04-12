<template>
  <div class="container mt-4 mb-5">
    <h3 class="lesson-subheading">Play a game</h3>
    <hr class="subheading-separator"><br>
    <div class="mb-2">
      <app-gameboard
        :gameboardIndex="gameboardIndex"
        :gameboardSrc="game.gameboardSrc"
        :mouseSrc="mouseSrc"
        :mousePosition="{left: game.position.left, top: game.position.top}"
        :stepArr="stepArr"
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
          }}
        </span>
        <span v-else></span>
      </h4>
      <table class="table" style="table-layout:fixed;">
        <tr>
          <th>Mouse</th>
          <td>
            <span v-if="total > 0">{{ mouseWins }}</span>
          </td>
          <td>
            <span v-if="total > 0">{{ mouseWinsPercent }}%</span>
          </td>
        </tr>
        <tr>
          <th>Cat</th>
          <td>
            <span v-if="total > 0">{{ catWins }}</span>
          </td>
          <td>
            <span v-if="total > 0">{{ catWinsPercent }}%</span>
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>
            <span v-if="total > 0">{{ total }}</span>
          </td>
          <td>
            <span v-if="isStart && game.ruleType==='decimal'">{{ randomNumber }}</span>
          </td>
        </tr>
      </table>
      <app-dice
        v-if="isStart && game.ruleType==='dice'"
        :index="0"
        :number="randomNumber"
        style="position: absolute;"
      ></app-dice>
    </div>
    <div class="text-center mt-5 mb-1">
      <div>
        <span
          :style="{ visibility: result !== null ? 'visible' : 'hidden'}"
          class="badge badge-danger"
        >{{ result === 0 ? "Cat eats mouse" : "Mouse eats cheese" }}</span>
      </div>
      <button
        class="btn btn-outline-success"
        @click="handlePlayOnce"
        v-if="!isFinish && demoAutoOption == '0'"
      >
        {{ rollOrMove === 0 ?
        "Roll dice" :
        "Move the mouse"
        }}
      </button>
      <button
        class="btn btn-outline-success"
        @click="handleToggleTimer"
        v-if="!isFinish && demoAutoOption == '1'"
      >
        {{ !isStart ? "Start" :
        timer ? "Pause" : "Resume"
        }}
      </button>
      <button class="btn btn-outline-dark" @click="handleReset" v-if="isFinish">Reset</button>
      <app-demo-auto-option
        @changeOption="demoAutoOption=$event"
        :option="demoAutoOption"
        :disabled="isStart"
      ></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import Dice from "../../common/Dice.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import Gameboard from "./Gameboard.vue";
import mouse from "@/assets/cat-and-mouse/mouse.jpg";
import Game from "./game/Game";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption,
    appGameboard: Gameboard,
    appDice: Dice
  },
  props: ["rule", "currentGameboardIndex"],
  data: function() {
    return {
      game: null,
      mouseSrc: mouse,
      demoAutoOption: "0", // 0 - demo, 1 - auto
      gameboardIndex: null,
      result: null, // null - unknown, 0 - cat wins, 1 - mouse wins
      total: 0, // total games played
      mouseWins: 0,
      catWins: 0,
      isStart: false,
      isFinish: false,
      randomNumber: null, // A random integer between 1 - 6 if rule is 'dice'
      // A random float between 0 - 1 if rule is 'decimal'
      rollOrMove: 0, // A variable to indicate app to roll the dice or move mouse
      // 0 - roll dice, 1 (or other) - move mouse
      timer: null,
      stepArr: [] // An array to record the route mouse passed
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
    initGame() {
      this.isStart = false;
      this.isFinish = false;
      this.result = null;
      this.timer = null;
      this.stepArr = [];
      this.game = new Game(this.gameboardIndex, this.rule);
    },
    handleNextGameboard() {
      if (this.gameboardIndex === 3) this.gameboardIndex = 0;
      else this.gameboardIndex++;
      this.initGame();
      this.$emit("nextGameboard", this.gameboardIndex);
    },
    rollDice() {
      this.randomNumber = this.game.createRandomNumber();
      this.rollOrMove = 1;
      console.log(this.randomNumber);
    },
    moveMouse() {
      this.stepArr.push({
        step: this.game.step,
        position: this.game.position
      });
      this.game.moveToNextPosition(this.randomNumber);
      this.rollOrMove = 0;
      this.result = this.game.getResult();
    },
    handlePlayOnce() {
      if (!this.isStart) {
        this.isStart = true;
      }
      if (this.rollOrMove === 0) {
        this.rollDice();
      } else {
        this.moveMouse();
      }

      if (this.result !== null) {
        console.log("result", this.result);
        this.total++;
        if (this.result === 0) {
          // Cat wins
          this.catWins++;
        } else {
          // Mouse wins
          this.mouseWins++;
        }
        // console.log(this.result);
        this.isFinish = true;
      }
    },
    handlePlay() {
      if (!this.isStart) {
        this.isStart = true;
      }

      if (this.result !== null) {
        this.total++;
        if (this.result === 0) {
          // Cat wins
          this.catWins++;
        } else {
          // Mouse wins
          this.mouseWins++;
        }
        this.result = null;
        this.stepArr = [];
        this.game = new Game(this.gameboardIndex, this.rule);
        return;
      }

      if (this.rollOrMove === 0) {
        this.rollDice();
      } else {
        this.moveMouse();
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlay, 1000);
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
