<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play 3 digit game</h3>
    <hr class="subheading-speartor" />
    <div class="row mb-3">
      <div class="col-sm-4">
        <app-card-drawn :card="card"></app-card-drawn>
      </div>
      <div class="col-sm-8">
        <div class="mb-3">
          <h4 class="text-center mb-3">Digits</h4>
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex align-items-center mb-2">
              <h6 class="app--digit-title">Me</h6>
              <div class="d-flex">
                <div
                  class="app--digit"
                  @click="handlePlaceCard(0)"
                  :style="{cursor: status===1 ? 'pointer' : ''}"
                >{{ meDigits[0] > 0 ? meDigits[0] : ''}}</div>
                <div
                  class="app--digit"
                  @click="handlePlaceCard(1)"
                  :style="{cursor: status===1 ? 'pointer' : ''}"
                >{{ meDigits[1] > 0 ? meDigits[1] : ''}}</div>
                <div
                  class="app--digit"
                  @click="handlePlaceCard(2)"
                  :style="{cursor: status===1 ? 'pointer' : ''}"
                >{{ meDigits[2] > 0 ? meDigits[2] : ''}}</div>
              </div>
            </div>

            <div class="d-flex align-items-center">
              <h6 class="app--digit-title">Computer</h6>
              <div class="d-flex">
                <div class="app--digit">{{ computerDigits[0] > 0 ? computerDigits[0] : ''}}</div>
                <div class="app--digit">{{ computerDigits[1] > 0 ? computerDigits[1] : ''}}</div>
                <div class="app--digit">{{ computerDigits[2] > 0 ? computerDigits[2] : ''}}</div>
              </div>
            </div>
          </div>
        </div>
        <app-score-board :meWins="meWins" :computerWins="computerWins"></app-score-board>
      </div>
    </div>
    <div class="text-center">
      <button
        class="btn btn-outline-success"
        v-if="status===0"
        @click="handleDrawCard"
        :disabled="disableButton"
      >Tap here to draw card</button>
      <p class="text-danger" v-if="status===1">Place your card into your digit box</p>
      <button
        class="btn btn-outline-success"
        v-if="status===2"
        @click="handleComputerTurn"
        :disabled="disableButton"
      >Tap here for computer's turn</button>
      <div
        class="text-danger"
        :style="{visibility: status===4 ? 'visible' :'hidden'}"
      >{{winningMessage}}</div>
      <button
        class="btn btn-outline-success"
        v-if="status===3"
        @click="handleFindWinner"
      >Tap here to find winner</button>
      <button class="btn btn-outline-dark" v-if="status===4" @click="handleReset">Tap here to reset</button>
    </div>
  </div>
</template>

<script>
import CardDrawn from "./CardDrawn.vue";
import ScoreBoard from "./ScoreBoard.vue";
import { drawCard, computerStrategyForThreeDigits } from "./utils";

export default {
  components: {
    appCardDrawn: CardDrawn,
    appScoreBoard: ScoreBoard
  },
  data: function() {
    return {
      card: null,
      meWins: 0,
      computerWins: 0,
      meDigits: [0, 0, 0],
      computerDigits: [0, 0, 0],
      meUsedNumbers: [],
      computerUsedNumbers: [],
      status: 0,
      computerStrategy: null,
      winningMessage: "",
      disableButton: false
    };
  },
  computed: {
    userCanChoose() {
      return this.meDigits.indexOf(0) !== this.meDigits.lastIndexOf(0);
    },
    computerCanChoose() {
      return (
        this.computerDigits.indexOf(0) !== this.computerDigits.lastIndexOf(0)
      );
    },
    meDigitsFinished() {
      return this.meDigits.indexOf(0) === -1;
    },
    computerDigitsFinished() {
      return this.computerDigits.indexOf(0) === -1;
    }
  },
  methods: {
    handleDrawCard() {
      this.card = drawCard(this.meUsedNumbers);
      this.meUsedNumbers.push(this.card.number);
      if (this.userCanChoose) {
        this.status = 1;
      } else {
        this.disableButton = true;
        setTimeout(() => {
          const indexToPlace = this.meDigits.indexOf(0);
          this.meDigits[indexToPlace] = this.card.number;
          this.status = 2;
          this.disableButton = false;
        }, 500);
      }
    },
    handlePlaceCard(e) {
      if (this.status !== 1 || !this.userCanChoose) return;
      const meDigitsIndex = e;
      if (this.meDigits[meDigitsIndex]) return;
      this.meDigits[meDigitsIndex] = this.card.number;
      this.meDigits = [...this.meDigits];
      this.status = 2;
    },
    handleComputerTurn() {
      let firstCard = this.computerUsedNumbers[0];
      this.card = drawCard(this.computerUsedNumbers);
      this.computerUsedNumbers.push(this.card.number);
      this.disableButton = true;

      setTimeout(() => {
        if (this.computerCanChoose) {
          // If the current card drawn is not the last one
          if (firstCard) {
            // If the value of firstCard exits, it means now computer draws its second card
            this.computerDigits[
              this.computerStrategy[`${firstCard}` + `${this.card.number}`]
            ] = this.card.number;
          } else {
            // Otherwise(the value of firstCard doesn't exist), it means now computer draws its first card

            this.computerDigits[
              this.computerStrategy[this.card.number]
            ] = this.card.number;
          }
        } else {
          // If the current card drawn is the last card
          const indexToPlace = this.computerDigits.indexOf(0);
          this.computerDigits[indexToPlace] = this.card.number;
        }
        this.computerDigits = [...this.computerDigits];
        if (this.computerDigitsFinished && this.meDigitsFinished) {
          this.status = 3;
        } else {
          this.status = 0;
        }
        this.disableButton = false;
      }, 500);
    },
    handleFindWinner() {
      const meNumber =
        this.meDigits[0] * 100 + this.meDigits[1] * 10 + this.meDigits[2];
      const computerNumber =
        this.computerDigits[0] * 100 +
        this.computerDigits[1] * 10 +
        this.computerDigits[2];
      if (meNumber > computerNumber) {
        this.winningMessage = "You are the winner!";
        this.meWins++;
      } else if (computerNumber > meNumber) {
        this.winningMessage = "The computer wins!";
        this.computerWins++;
      } else {
        this.winningMessage = "Draw";
        this.meWins++;
        this.computerWins++;
      }
      this.status = 4;
    },
    handleReset() {
      this.card = null;
      this.meDigits = [0, 0, 0];
      this.computerDigits = [0, 0, 0];
      this.meUsedNumbers = [];
      this.computerUsedNumbers = [];
      this.status = 0;
      this.winningMessage = "";
    }
  },
  created() {
    this.computerStrategy = computerStrategyForThreeDigits;
  }
};
</script>

<style scoped>
.app--digit-title {
  width: 80px;
  text-align: right;
  padding-right: 8px;
}
.app--digit {
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
