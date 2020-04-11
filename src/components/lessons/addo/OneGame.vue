<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Play a game of Addo</h3>
    <div class="row">
      <div class="col-md-4">
        <app-strategies
          :strategies="strategies"
          :newStrategy="selectedStrategy"
          :duplicateNumber="duplicateNumber"
          @selectStrategy="handleSelectStrategy"
          @showMessage="message = $event"
          v-if="gameStatus===-1 || gameStatus===0"
        ></app-strategies>
      </div>
      <div class="col-md-8">
        <app-game-stat
          v-if="gameStatus!==-1"
          :cardNumber="cardNumber"
          :gameNumber="gameNumber"
          :winStats="winStats"
          :gameStatus="gameStatus"
        ></app-game-stat>
        <div class="d-flex flex-column flex-sm-row justify-content-around">
          <!-- The left grid -->
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[0].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[0]"
            :gameStatus="gameStatus"
            :additionList="additionList"
            :index="1"
            @duplicateNumber="duplicateNumber = $event"
            @showMessage="message = $event"
          ></app-grid>

          <!-- The centre grid -->
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[1].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[1]"
            :gameStatus="gameStatus"
            :additionList="additionList"
            :index="2"
            @duplicateNumber="duplicateNumber = $event"
            @showMessage="message = $event"
          ></app-grid>

          <!-- The right grid -->
          <app-grid
            :style="{
              visibility: selectedStrategy.strategyData[2].isChecked
                ? 'visible'
                : 'hidden'
            }"
            :gridData="selectedStrategy.strategyData[2]"
            @duplicateNumber="duplicateNumber = $event"
            :gameStatus="gameStatus"
            :additionList="additionList"
            :index="3"
            @showMessage="message = $event"
          ></app-grid>
        </div>
        <div
          :style="{
          visibility: gameStatus===1 ? 'visible' : 'hidden'
        }"
          class="mt-3 row"
        >
          <div class="mr-2" style="font-size: 2rem;">{{ add1 }} + {{ add2 }} =</div>
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
        :class="[add1+add2===answer && message!=='Try again' ? 'alert-success' : 'alert-danger']"
      >{{ message }}</p>
      <button
        class="btn btn-outline-success"
        v-if="selectedStrategy.id !== 0 && (gameStatus===0 || gameStatus===-1)"
        @click="handleStart"
      >Proceed to game</button>
      <button
        v-if="gameStatus===1"
        class="btn btn-outline-success"
        @click="handleEnterAnswer"
      >Check answer</button>
      <button
        v-if="gameStatus===2"
        class="btn btn-outline-success"
        @click="handleDrawTwoNumbers"
      >Draw two numbers</button>
      <button
        v-if="gameStatus===3"
        class="btn btn-outline-dark"
        @click="handleReset"
      >Reset</button>
    </div>
  </div>
</template>

<script>
// import _ from "lodash";
// import GridList from "./GridList.vue";
import Grid from "./Grid.vue";
import Strategies from "./Strategies.vue";
import GameStat from "./GameStat.vue";
import { BLANK_STRATEGY } from "./utils/settings";
import { pickNumber, checkAddo } from "./utils/utils";

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
      gameStatus: -1,
      // -1 - initial state
      // 0 - game ready for start,
      // 1 - started and wait for answer,
      // 2 - Ready to draw two numbers,
      // 3 - Addo! Game ends
      cardNumber: 1,
      gameNumber: 0,
      winStats: [0, 0, 0],
      add1: null,
      add2: null,
      addition: null,
      answer: null,
      additionList: []
    };
  },
  computed: {},
  methods: {
    generateNewAddition() {
      this.add1 = pickNumber(0, 10);
      this.add2 = pickNumber(0, 10);
      this.addition = this.add1 + this.add2;
    },

    handleSelectStrategy($event) {
      this.selectedStrategy = $event;
    },

    handleStart() {
      this.gameStatus = 1;
      this.cardNumber = 1;
      this.gameNumber++;
      this.generateNewAddition();
      setTimeout(() => {
        this.$refs.inputAnswer.focus();
      }, 50);
    },

    handleEnterAnswer() {
      if (this.answer === this.addition) {
        this.gameStatus = 2;
        this.message = `Correct ${this.add1} + ${this.add2} = ${this.addition}`;
        if (this.additionList.indexOf(this.addition) === -1) {
          this.additionList.push(this.addition);
          if (
            this.selectedStrategy.strategyData[0].isChecked &&
            checkAddo(this.selectedStrategy.strategyData[0], this.additionList)
              .length > 0
          ) {
            this.winStats[0] += 1;
          }
          if (
            this.selectedStrategy.strategyData[1].isChecked &&
            checkAddo(this.selectedStrategy.strategyData[1], this.additionList)
              .length > 0
          ) {
            this.winStats[1] += 1;
          }
          if (
            this.selectedStrategy.strategyData[2].isChecked &&
            checkAddo(this.selectedStrategy.strategyData[2], this.additionList)
              .length > 0
          ) {
            this.winStats[2] += 1;
          }
          if (
            (this.selectedStrategy.strategyData[0].isChecked &&
              checkAddo(
                this.selectedStrategy.strategyData[0],
                this.additionList
              ).length > 0) ||
            (this.selectedStrategy.strategyData[0].isChecked &&
              checkAddo(
                this.selectedStrategy.strategyData[1],
                this.additionList
              ).length > 0) ||
            (this.selectedStrategy.strategyData[2].isChecked &&
              checkAddo(
                this.selectedStrategy.strategyData[2],
                this.additionList
              ).length > 0)
          ) {
            // this.gameNumber++;
            this.gameStatus = 3;
            this.message = "Addo!";
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
      this.generateNewAddition();
      setTimeout(() => {
        this.$refs.inputAnswer.focus();
      }, 50);
    },
    handleReset() {
      this.gameStatus = 0;
      this.message = "";
      this.add1 = null;
      this.add2 = null;
      this.answer = null;
      this.additionList = [];
    }
  },
};
</script>

<style scoped></style>
