<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play 2 digit game</h3>
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
              </div>
            </div>
            <div class="d-flex align-items-center">
              <h6 class="app--digit-title">Computer</h6>
              <div class="d-flex">
                <div class="app--digit">{{ computerDigits[0] > 0 ? computerDigits[0] : '' }}</div>
                <div class="app--digit">{{ computerDigits[1] > 0 ? computerDigits[1] : '' }}</div>
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
import DigitsTable from "./DigitsTable.vue";
import { drawCard, computerStrategyForTwoDigits } from "./utils";

export default {
  components: {
    appCardDrawn: CardDrawn,
    appDigitsTable: DigitsTable,
    appScoreBoard: ScoreBoard
  },
  data: function() {
    return {
      card: null,
      meWins: 0,
      computerWins: 0,
      meDigits: [0, 0],
      computerDigits: [0, 0],
      // Use array to represent the digits,
      // The first element is number's ten part; the second element is number's one part
      // e.g. [1, 2] represents number 12, if element in the array is 0, it means no number put on this position.
      meUsedNumbers: [],
      computerUsedNumbers: [],
      whoseTurn: 0, // 0 - User's turn, 1 - computer's turn
      status: 0,
      // 0 - to draw card(user's turn)
      // 1 - to place card, if it is user's turn
      // 2 - change to computer's turn
      // 3 - to find winner
      // 4 - Winner found, to reset
      computerStrategy: null,
      winningMessage: "",
      disableButton: false
    };
  },
  computed: {
    userCanChoose() {
      // Check if there are multiple 0 in meDigits
      // If yes, it means user can choose to place the number in either position
      // Otherwise, user has no choice
      return this.meDigits.indexOf(0) !== this.meDigits.lastIndexOf(0);
    },
    computerCanChoose() {
      // The same as above, but check for computer
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
        // If there is multiple positions availble letting user put the number
        this.status = 1;
      } else {
        // If there is only one position left, just place the number on this position.
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
      // console.log(this.meDigits[meDigitsIndex]);
      this.meDigits[meDigitsIndex] = this.card.number;
      this.meDigits = [...this.meDigits];
      this.status = 2;
    },
    handleComputerTurn() {
      this.card = drawCard(this.computerUsedNumbers);
      this.computerUsedNumbers.push(this.card.number);
      // console.log(this.computerStrategy[this.card.number]);

      this.disableButton = true;
      setTimeout(() => {
        if (this.computerCanChoose) {
          this.computerDigits[
            this.computerStrategy[this.card.number]
          ] = this.card.number;
        } else {
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
      const meNumber = this.meDigits[0] * 10 + this.meDigits[1];
      const computerNumber =
        this.computerDigits[0] * 10 + this.computerDigits[1];
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
      this.meDigits = [0, 0];
      this.computerDigits = [0, 0];
      this.meUsedNumbers = [];
      this.computerUsedNumbers = [];
      this.status = 0;
      this.winningMessage = "";
    }
  },
  created() {
    this.computerStrategy = computerStrategyForTwoDigits;
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
