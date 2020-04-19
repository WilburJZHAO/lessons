<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Subtraction 100 to 0</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-6 pb-4">
        <app-plugboard
          @setDigit="totalDigit=$event"
          @setPlugboardNumber="currentPlugboardNumber=$event"
          :isRadioDisable="step>0"
          :isDisable="step!= 2"
          :plugboardNumber="currentPlugboardNumber"
          :inputDigit="inputDigit"
          :numberToCheck="numberToCheck"
        ></app-plugboard>
        <app-plugboard-input
          :totalDigit="totalDigit"
          :isDisable="true"
          :inputNumber="currentPlugboardNumber"
        ></app-plugboard-input>
      </div>
      <div class="col-md-6">
        <div style="display: flex; align-items: flex-start;">
          <app-calculator
            :isDisable="step!==3"
            :calNumber="currentCalNumber"
            @setCalNumber="handleCheckCalculator"
            :numberToCheck="numberToCheck"
          ></app-calculator>
          <div class="pl-3">
            <div v-if="numberSet===null">
              <app-add-sub-form
                :direction="-1"
                :totalDigit="totalDigit"
                @setNumber="handleSetNumber"
              ></app-add-sub-form>
            </div>
            <div v-else>
              <h6>
                Starting number is {{ numberSet.startingNumber }}
                <br />
                Target number is {{ numberSet.targetNumber }}
              </h6>
              <div class="app--dice text-center mt-4" v-if="diceNumber1 || diceNumber2">
                <app-dice :index="1" :number="diceNumber1" class="m-1"></app-dice>
                <br />
                <app-dice :index="2" v-if="diceNumber2" :number="diceNumber2" class="m-1"></app-dice>
              </div>
            </div>
          </div>
        </div>
        <br />
        <app-spelling-board :isDisable="true" :spellingNumber="currentSpellingNumber"></app-spelling-board>
        <div v-if="numberSet" class="text-center mt-3">
          <button
            v-if="step===1 && !isFinish"
            class="btn btn-outline-success"
            @click="handleRollDice"
          >Roll dice</button>
          <div
            class="alert alert-info"
            v-if="step===2 && isPlugboardNumberCheckedRight === null"
          >Add the dice total to the plugboard</div>
          <div
            class="alert alert-danger"
            v-if="step===2 && isPlugboardNumberCheckedRight === false"
          >Not correct. Move the plug to count.</div>
          <button
            v-if="step===2 && !isFinish"
            class="btn btn-outline-success"
            @click="handleCheckPlugboard"
          >Check</button>

          <div
            class="alert alert-info"
            v-if="step===3 && isCalNumberCheckedRight !== false && !isFinish "
          >Add the dice total on the calculator</div>
          <div
            class="alert alert-danger"
            v-if="step===3 && isCalNumberCheckedRight === false"
          >Try again!</div>

          <div class="alert alert-danger" v-if="isFinish">Congratulations! Target reached.</div>
          <button v-if="isFinish" class="btn btn-outline-dark" @click="handleReset">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plugboard from "./Plugboard.vue";
import PlugboardInput from "./PlugboardInput.vue";
import Calculator from "./Calculator.vue";
import SpellingBoard from "./SpellingBoard.vue";
import AddSubForm from "./AddSubForm.vue";
import Dice from "../../common/Dice.vue";
import { throwDiceOnce } from "./utils";

export default {
  components: {
    appPlugboard: Plugboard,
    appCalculator: Calculator,
    appSpellingBoard: SpellingBoard,
    appPlugboardInput: PlugboardInput,
    appAddSubForm: AddSubForm,
    appDice: Dice
  },
  data: function() {
    return {
      totalDigit: null,
      inputDigit: null,
      numberSet: null,
      step: 0, // The number to show the status of a game
      // 0 - original state, 1 - starting number and target number is set, ready to roll dice
      // 2 - dice is throwed Move plugboard number
      // 3 - plugboard number is checked, do calculator number
      plugBoardNumberSet: null,

      currentPlugboardNumber: null,
      currentCalNumber: null,
      currentSpellingNumber: null,
      diceNumber1: null,
      diceNumber2: null,
      isPlugboardNumberCheckedRight: null,
      isCalNumberCheckedRight: null,
      numberToCheck: null,
      isFinish: false
    };
  },
  computed: {
    diceNumber() {
      if (this.diceNumber1 && this.diceNumber2) {
        return this.diceNumber1 + this.diceNumber2;
      }
      if (this.diceNumber1 && !this.diceNumber2) {
        return this.diceNumber1;
      }
      return null;
    }
  },
  methods: {
    setGame() {
      this.numberSet = { startingNumber: 100, targetNumber: 0 };
      this.step += 1; // step -> 1
      this.currentPlugboardNumber = this.numberSet.startingNumber;
      this.currentCalNumber = this.numberSet.startingNumber;
      this.currentSpellingNumber = this.numberSet.startingNumber;
      this.inputDigit = this.numberSet.startingNumber.toString().length;
    },
    handleSetNumber($event) {
      // In the beginning of a game, set starting number and target number
      // console.log($event);
      this.numberSet = $event;
      this.step += 1; // step -> 1
      this.currentPlugboardNumber = $event.startingNumber;
      this.currentCalNumber = $event.startingNumber;
      this.currentSpellingNumber = $event.startingNumber;
      this.inputDigit = $event.startingNumber.toString().length;
    },
    handleRollDice() {
      // Roll dice
      let diffToTarget =
        this.currentPlugboardNumber - this.numberSet.targetNumber;
      if (diffToTarget <= 6) {
        // console.log(diffToTarget);
        this.diceNumber1 = diffToTarget;
        this.diceNumber2 = null;
      } else if (diffToTarget <= 12) {
        // console.log(diffToTarget);
        let tempDiceNumber1, tempDiceNumber2;
        do {
          tempDiceNumber1 = throwDiceOnce();
          tempDiceNumber2 = throwDiceOnce();
        } while (tempDiceNumber1 + tempDiceNumber2 > diffToTarget);
        this.diceNumber1 = tempDiceNumber1;
        this.diceNumber2 = tempDiceNumber2;
      } else {
        // console.log(diffToTarget);
        this.diceNumber1 = throwDiceOnce();
        this.diceNumber2 = throwDiceOnce();
      }
      this.step += 1; // step -> 2
      this.numberToCheck = null;
    },
    handleCheckPlugboard() {
      // Check number in plugboard
      // console.log(this.currentPlugboardNumber);
      this.numberToCheck = this.currentSpellingNumber - this.diceNumber;
      if (this.numberToCheck === this.currentPlugboardNumber) {
        this.isPlugboardNumberCheckedRight = true;
        this.step += 1; // step-> 3
      } else {
        this.isPlugboardNumberCheckedRight = false;
      }
    },
    handleCheckCalculator($event) {
      // console.log($event);
      if ($event.inputCorrect) {
        this.isCalNumberCheckedRight = true;
        this.currentSpellingNumber = $event.value;
        if (this.currentSpellingNumber <= this.numberSet.targetNumber) {
          this.isFinish = true;
        } else {
          this.step = 1;
        }
        return;
      }
      this.numberToCheck = this.currentSpellingNumber - this.diceNumber;
      if (this.numberToCheck === $event) {
        this.isCalNumberCheckedRight = true;
        this.currentSpellingNumber = $event;

        if (this.currentSpellingNumber <= this.numberSet.targetNumber) {
          this.isFinish = true;
        } else {
          this.step = 1;
        }
      } else {
        this.isCalNumberCheckedRight = false;
        // this.currentCalNumber = this.currentSpellingNumber;
      }
    },
    handleReset() {
      this.numberSet = null;
      this.step = 0;
      this.plugBoardNumberSet = null;
      this.currentPlugboardNumber = null;
      this.currentCalNumber = null;
      this.currentSpellingNumber = null;
      this.diceNumber1 = null;
      this.diceNumber2 = null;
      this.isPlugboardNumberCheckedRight = null;
      this.isCalNumberCheckedRight = null;
      this.numberToCheck = null;
      this.isFinish = false;
      this.setGame();
    }
  },
  mounted() {
    this.setGame();
  }
};
</script>

<style scoped>
.app--dice {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
