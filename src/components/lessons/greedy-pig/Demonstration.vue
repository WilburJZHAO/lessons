<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Demonstration game</h3>
    <div class="row mt-3">
      <div class="col-2">
        <p class="text-right font-weight-bold">Game</p>
      </div>
      <div class="col-8">
        <p class="text-primary text-center">
          You can get the first two rolls for free, after that a
          <span class="text-danger font-weight-bold">{{ killerDice }}</span>
          makes your score zero
        </p>
      </div>
      <div class="col-2">
        <p class="text-left font-weight-bold">Score</p>
      </div>
    </div>
    <div
      class="row"
      v-for="(gameData, index) in game"
      :key="index"
      style="height: 50px;"
    >
      <div class="col-2 d-flex align-items-center justify-content-end">
        {{ gameData.id }}
      </div>
      <div
        class="col-8 d-flex align-items-center"
        style="background-color: #FDFFE7; border: 1px solid #aaa;"
      >
        <span v-for="(data, index) in gameData.dices" :key="index">
          <span :class="{ 'text-danger': data === killerDice && index > 1 }">{{
            data
          }}</span>
          <span v-if="index < gameData.dices.length - 1">,</span>
        </span>
      </div>
      <div class="col-2 text-center d-flex align-items-center">
        <h4>{{ gameData.score }}</h4>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-10">
        <h4 class="text-right">Tally</h4>
      </div>
      <div class="col-2">
        <h4 class="d-flex align-items-center">{{ totalScore }}</h4>
      </div>
    </div>
    <div class="text-center mt-4">
      <div class="d-flex mb-3">
        <app-dice :index="0" :number="dice1"></app-dice>
        <div class="mx-3"></div>
        <app-dice :index="0" :number="dice2" v-if="dice2"></app-dice>
      </div>
      <button
        class="btn btn-outline-success"
        v-if="status === 0"
        @click="handleBeginGame"
      >
        Tap here to begin
      </button>
      <button
        class="btn btn-outline-success"
        v-if="status === 1"
        @click="handleNextGame"
      >
        Tap here for next game
      </button>
      <button
        class="btn btn-outline-success"
        v-if="status === 2"
        @click="handleNextRoll"
      >
        Tap here for next roll or q for next game
      </button>
      <button
        class="btn btn-outline-success"
        v-if="status === 3"
        @click="handleEnterScore"
      >
        Tap here to enter score
      </button>
      <button
        class="btn btn-outline-success"
        v-if="status === 4"
        @click="handleReset"
      >
        Tap here to reset
      </button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Dice from "../../common/Dice.vue";
import { initGame } from "./utils";
import { pickNumber } from "../../common/utils";
export default {
  components: {
    appDice: Dice
  },
  props: ["killerDice"],
  computed: {
    totalScore() {
      let total = 0;
      this.game.forEach(data => (total += data.score));
      return total;
    }
  },
  data: function() {
    return {
      game: [],
      initGame,
      totalGames: 5,
      status: 0,
      // 0 - ready to play first game, roll two dices
      // 1 - ready to play next game, roll two dices
      // 2 - ready to roll one dice
      // 3 - Enter score
      // 4 - game finish
      dice1: 0,
      dice2: 0,
      gameIndex: 0
    };
  },
  methods: {
    handleBeginGame() {
      this.dice1 = pickNumber(1, 6);
      this.dice2 = pickNumber(1, 6);
      this.game[this.gameIndex].dices.push(this.dice1);
      this.game[this.gameIndex].dices.push(this.dice2);
      this.game[this.gameIndex].score += this.dice1 + this.dice2;
      this.status = 2;
    },
    handleNextGame() {
      this.gameIndex++;
      this.status = 1;
      this.handleBeginGame();
    },
    handleNextRoll() {
      this.dice1 = pickNumber(1, 6);
      this.dice2 = 0;
      this.game[this.gameIndex].dices.push(this.dice1);
      this.status = 3;
    },
    handleEnterScore() {
      if (this.dice1 === this.killerDice) {
        this.game[this.gameIndex].score = 0;
        this.status = this.gameIndex < this.totalGames - 1 ? 1 : 4;
      } else {
        this.game[this.gameIndex].score += this.dice1;
        this.status = 2;
      }
      this.dice1 = 0;
      this.dice2 = 0;
    },
    handleReset() {
      this.game = _.cloneDeep(this.initGame);
      this.dice1 = 0;
      this.dice2 = 0;
      this.status = 0;
      this.gameIndex = 0;
    }
  },
  created() {
    this.game = _.cloneDeep(this.initGame);
  },
  mounted() {
    document.addEventListener("keypress", e => {
      if (e.key === "q" && this.status === 2) {
        this.status = this.gameIndex < this.totalGames - 1 ? 1 : 4;
        this.dice1 = 0;
        this.dice2 = 0;
      }
    });
  }
};
</script>

<style scoped></style>
