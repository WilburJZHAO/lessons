<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Play a game of Multo</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-lg-4">
        <app-strategies
          :strategies="strategies"
          :newStrategy="selectedStrategy"
          :duplicateNumber="duplicateNumber"
          @selectStrategy="handleSelectStrategy"
          @showMessage="message = $event"
          v-if="gameStatus === -1 || gameStatus === 0"
        ></app-strategies>
      </div>
      <div class="col-lg-8">
        <app-game-stat
          v-if="gameStatus!==-1"
          :cardNumber="cardNumber"
          :gameNumber="gameNumber"
          :winStats="winStats"
          :gameStatus="gameStatus"
        ></app-game-stat>
        <div class="d-flex flex-column flex-sm-row justify-content-around">
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[0].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[0]"
            :gameStatus="gameStatus"
            :multiplicationList="multiplicationList"
            :index="1"
            @duplicateNumber="duplicateNumber = $event"
            @showMessage="message = $event"
          ></app-grid>
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[1].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[1]"
            :gameStatus="gameStatus"
            :multiplicationList="multiplicationList"
            :index="2"
            @duplicateNumber="duplicateNumber = $event"
            @showMessage="message = $event"
          ></app-grid>
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[2].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[2]"
            :gameStatus="gameStatus"
            :multiplicationList="multiplicationList"
            :index="3"
            @duplicateNumber="duplicateNumber = $event"
            @showMessage="message = $event"
          ></app-grid>
        </div>
        <div
          :style="{
            visibility: gameStatus === 1 ? 'visible' : 'hidden'
          }"
          class="mt-3 row"
        >
          <div class="mr-2" style="font-size: 2rem;">{{ number1 }} X {{ number2 }} =</div>
          <div>
            <form @submit="(e) => { e.preventDefault(); this.handleEnterAnswer()}">
            <input
              ref="inputAnswer"
              class="form-control-lg"
              type="number"
              v-model.number="answer"
              style="width: 60%"
              autofocus
            />
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <p
        :style="{
          visibility: message ? 'visible' : 'hidden'
        }"
        class="alert"
        :class="[number1 * number2===answer && message!=='Try again' ? 'alert-success' : 'alert-danger']"
      >{{ message }}</p>
      <button
        class="btn btn-outline-success"
        v-if="
          selectedStrategy.id !== 0 && (gameStatus === 0 || gameStatus === -1)
        "
        @click="handleStart"
      >Proceed to game</button>
      <button
        v-if="gameStatus === 1"
        class="btn btn-outline-success"
        @click="handleEnterAnswer"
      >Check answer</button>
      <button
        v-if="gameStatus === 2"
        class="btn btn-outline-success"
        @click="handleDrawTwoNumbers"
      >Draw a card</button>
      <button
        v-if="gameStatus === 3"
        class="btn btn-outline-dark"
        @click="handleReset"
      >Reset</button>
    </div>
  </div>
</template>

<script>
// import _ from "lodash";
import Grid from "./Grid.vue";
import Strategies from "./Strategies.vue";
import GameStat from "./GameStat.vue";
import { BLANK_STRATEGY } from "./utils/settings";
import { checkMulto, newShuffledDeck } from "./utils/utils";

export default {
  props: ["strategies"],
  components: {
    appGrid: Grid,
    appStrategies: Strategies,
    appGameStat: GameStat
  },
  data: function() {
    return {
      selectedStrategy: BLANK_STRATEGY,
      duplicateNumber: null,
      message: "",
      cards: newShuffledDeck(),
      gameStatus: -1,
      cardNumber: 1,
      gameNumber: 0,
      winStats: [0, 0, 0],
      number1: null,
      number2: null,
      mulResult: null,
      answer: null,
      multiplicationList: []
    };
  },
  methods: {
    drawNextMultiplicationCard() {
      if (this.cards.length > 0) {
        let card = this.cards.pop();
        this.number1 = card[0];
        this.number2 = card[1];
        this.mulResult = this.number1 * this.number2;
        return true;
      }
      else {
        return false;
      }
    },

    handleSelectStrategy($event) {
      this.selectedStrategy = $event;
    },

    handleStart() {
      this.gameStatus = 1;
      this.cardNumber = 1;
      this.gameNumber++;
      this.drawNextMultiplicationCard();
      setTimeout(() => {
        this.$refs.inputAnswer.focus();
      }, 50);
    },

    handleEnterAnswer() {
      if (this.answer === this.mulResult) {
        // If the answer is right
        this.gameStatus = 2;
        this.message = `Correct ${this.number1} X ${this.number2} = ${this.answer}`;

        if (this.multiplicationList.indexOf(this.mulResult) === -1) {
          this.multiplicationList.push(this.mulResult);
          if (
            this.selectedStrategy.strategyData[0].isChecked &&
            checkMulto(
              this.selectedStrategy.strategyData[0],
              this.multiplicationList
            ).length > 0
          ) {
            this.winStats[0] += 1;
          }

          if (
            this.selectedStrategy.strategyData[1].isChecked &&
            checkMulto(
              this.selectedStrategy.strategyData[1],
              this.multiplicationList
            ).length > 0
          ) {
            this.winStats[1] += 1;
          }

          if (
            this.selectedStrategy.strategyData[2].isChecked &&
            checkMulto(
              this.selectedStrategy.strategyData[2],
              this.multiplicationList
            ).length > 0
          ) {
            this.winStats[2] += 1;
          }

          if (
            (this.selectedStrategy.strategyData[0].isChecked &&
              checkMulto(
                this.selectedStrategy.strategyData[0],
                this.multiplicationList
              ).length > 0) ||
            (this.selectedStrategy.strategyData[0].isChecked &&
              checkMulto(
                this.selectedStrategy.strategyData[1],
                this.multiplicationList
              ).length > 0) ||
            (this.selectedStrategy.strategyData[2].isChecked &&
              checkMulto(
                this.selectedStrategy.strategyData[2],
                this.multiplicationList
              ).length > 0)
          ) {
            this.gameStatus = 3;
            this.message = "Multo";
          }
        }
      } else {
        this.message = "Try again";
        this.$refs.inputAnswer.focus();
      }
    },

    handleDrawTwoNumbers() {
      this.gameStatus = 1;
      this.message = "";
      this.answer = null;
      this.cardNumber++;
      let cardsLeft = this.drawNextMultiplicationCard();
      if (cardsLeft) {
        setTimeout(() => {
          this.$refs.inputAnswer.focus();
        }, 50);
      } else {
        this.gameStatus = 3;
        this.message = "Run out of cards. The game is a draw!";
      }
    },

    handleReset() {
      this.cards = newShuffledDeck();
      this.gameStatus = 0;
      this.message = "";
      this.number1 = null;
      this.number2 = null;
      this.answer = null;
      this.multiplicationList = [];
    }
  },
};
</script>

<style scoped>
</style>
