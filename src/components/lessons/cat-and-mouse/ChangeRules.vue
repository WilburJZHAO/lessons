<template>
  <div class="container mt-4 mb-5">
  <h3 class="lesson-subheading">Change the rules</h3>
  <hr class="subheading-separator"><br>
    <div class="mb-2">
      <app-gameboard
        :gameboardIndex="gameboardIndex"
        :gameboardSrc="game.gameboardSrc"
        :mouseSrc="mouseSrc"
        :mousePosition="{left: game.position.left, top: game.position.top}"
      ></app-gameboard>
    </div>
    <div class="text-center mb-4">
      <button class="btn btn-sm btn-outline-dark" @click="handleNextGameboard">Next gameboard</button>
    </div>
    <div class="app--rule">
      <div v-if="rule.type==='dice' || rule.type==='default'">
        <h5 class="text-center">Click on square to change selection</h5>
        <table class="table table-bordered" style="max-width: 600px;margin: 0 auto;">
          <tr>
            <th class="text-danger">Left</th>
            <td
              class="text-center"
              v-for="(item, index) in moveLeftArr"
              :key="index"
              style="cursor: pointer;"
              @click="changeMoveLeftArr"
              :data-number="item.num"
            >
              <span v-if="item.isShow">{{ item.num }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-primary">Right</th>
            <td
              class="text-center"
              v-for="(item, index) in moveRightArr"
              :key="index"
              style="cursor: pointer;"
              @click="changeMoveRightArr"
              :data-number="item.num"
            >
              <span v-if="item.isShow">{{ item.num }}</span>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="rule.type==='decimal'" style="max-width: 330px; margin: 0 auto;">
        <h5 class="text-center">Enter the probability of moving left</h5>
        <input
          type="number"
          class="form-control"
          v-model="probMovingLeft"
          @input="changeProbMovingLeft"
        />
        <div class="app--prompt">
          <h5 v-if="probMovingRight">
            Moving right
            <span class="badge badge-primary">{{ probMovingRight }}</span>
          </h5>
          <p
            v-if="!isValidProb && probMovingLeft "
            class="badge badge-danger mt-1"
          >Enter a number between 0 and 1</p>
        </div>
      </div>
      <div class="text-center mt-1">
        <div class="form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            name="ruleType"
            id="type-dice"
            value="dice"
            v-model="rule.type"
            @change="changeRuleType"
          />
          <label for="type-dice" class="form-check-label">Dice</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            name="ruleType"
            id="type-decimal"
            value="decimal"
            v-model="rule.type"
            @change="changeRuleType"
          />
          <label for="type-decimal" class="form-check-label">Decimal</label>
        </div>
      </div>
      <div class="text-center mt-3">
        <button class="btn btn-outline-success" @click="handleBack">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import Gameboard from "./Gameboard.vue";
import mouse from "@/assets/cat-and-mouse/mouse.jpg";
import Game from "./game/Game";

export default {
  components: {
    appGameboard: Gameboard
  },
  props: ["currentGameboardIndex", "currentRule"],
  data: function() {
    return {
      game: null,
      gameboardIndex: null,
      mouseSrc: mouse,
      rule: null,
      probMovingLeft: null,
      tempMoveLeft: null // Used to temporarily save rule.moveLeft
    };
  },
  computed: {
    moveLeftArr() {
      // if(typeof this.rule.moveLeft !== 'object') return [];
      const moveLeftArr = [];
      for (let i = 1; i <= 6; i++) {
        if (this.rule.moveLeft.indexOf(i) === -1) {
          moveLeftArr.push({ num: i, isShow: false });
        } else {
          moveLeftArr.push({ num: i, isShow: true });
        }
      }
      return moveLeftArr;
    },
    moveRightArr() {
      // if(typeof this.rule.moveLeft !== 'object') return [];
      const moveRightArr = [];
      for (let i = 1; i <= 6; i++) {
        if (this.rule.moveLeft.indexOf(i) === -1) {
          moveRightArr.push({ num: i, isShow: true });
        } else {
          moveRightArr.push({ num: i, isShow: false });
        }
      }
      return moveRightArr;
    },
    isValidProb() {
      // Is input a valid probability
      if (Number(this.probMovingLeft) > 0 && Number(this.probMovingLeft < 1))
        return true;
      else return false;
    },
    probMovingRight() {
      if (this.isValidProb) {
        return (1 - Number(this.probMovingLeft)).toFixed(2);
      }
      return null;
    }
  },
  methods: {
    initGame() {
      this.game = new Game(this.gameboardIndex, this.rule);
    },
    handleNextGameboard() {
      if (this.gameboardIndex === 3) this.gameboardIndex = 0;
      else this.gameboardIndex++;
      // console.log(this.gameboardIndex);
      this.initGame();
      this.$emit("nextGameboard", this.gameboardIndex);
    },
    changeMoveLeftArr(e) {
      const dataNumber = Number(e.target.getAttribute("data-number"));
      const clickedNumber = Number(e.target.textContent.trim());
      if (clickedNumber === 0) {
        // Add dataNumber to moveLeft array
        this.rule.moveLeft.push(dataNumber);
      }
      this.rule.moveLeft.sort((a, b) => a - b);
      this.initGame();
      this.handleChangeRule();
    },
    changeMoveRightArr(e) {
      // console.log(e.target.getAttribute('data-number'));
      const dataNumber = Number(e.target.getAttribute("data-number"));
      const clickedNumber = Number(e.target.textContent.trim());
      if (clickedNumber === 0) {
        // Remove the dataNumber from moveLeft array
        let index = this.rule.moveLeft.indexOf(dataNumber);
        this.rule.moveLeft.splice(index, 1);
      }
      this.rule.moveLeft.sort((a, b) => a - b);
      this.initGame();
      this.handleChangeRule();
    },

    changeProbMovingLeft() {
      this.tempMoveLeft = this.rule.moveLeft;
      if (this.isValidProb) {
        // console.log(this.probMovingLeft);
        this.rule.moveLeft = Number(this.probMovingLeft);
        // console.log(this.rule);
      } else {
        this.rule.moveLeft = null;
      }
      this.handleChangeRule();
    },

    changeRuleType() {
      if (this.rule.type === "decimal") {
        this.tempMoveLeft = this.rule.moveLeft;
        this.rule.moveLeft = this.probMovingLeft ? this.probMovingLeft : null;
      }
      if (this.rule.type === "dice") {
        this.rule.moveLeft = this.tempMoveLeft ? this.tempMoveLeft : [1, 3, 5];
      }
      this.initGame();
      this.handleChangeRule();
      // console.log(this.rule.type);
    },
    handleChangeRule() {
      this.$emit("changeRule", this.rule);
    },
    handleBack() {
      // console.log('ok');
      this.$emit("backToMenu", -1);
    }
  },
  created() {
    this.gameboardIndex = this.currentGameboardIndex;
    this.rule = this.currentRule;
    if (this.rule.type === "decimal") {
      this.probMovingLeft = this.rule.moveLeft;
    }
    this.initGame();
  }
};
</script>

<style scoped>
.app--prompt {
  height: 25px;
}
</style>
