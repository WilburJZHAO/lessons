<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Try to beat the computer</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-3 mb-3">
        <app-game-title :settings="settings"></app-game-title>
        <app-game-stat :game="game" :status="status"></app-game-stat>
      </div>
      <div class="col-md-9">
        <app-card-board
          :deck="deck"
          :target="settings.target"
          :total="game.total"
          :computerPlay="computerPlay"
          @selectCard="handleSelectCard"
        ></app-card-board>
        <div class="text-center text-danger">
          <span v-if="status === 0 && game.whoseFirst === 1">
            <button
              class="btn btn-outline-success"
              @click="handleComputerPlay"
            >Play computer's turn</button>
          </span>
          <span v-if="status === 0 && game.whoseFirst === 2">{{ game.partyBName }}. Click on a card</span>
          <span v-if="status === 1 && whoseTurn === 1">
            <button
              class="btn btn-outline-success"
              @click="handleComputerPlay"
            >Play computer's turn</button>
          </span>
          <span v-if="status===1 && whoseTurn ===2">{{ game.partyBName }}. Click on a card</span>
          <span v-if="status===2">Pick a lower card</span>
          <span v-if="status===3">
            Player {{ wins }} is the winner
            <br />
            <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameTitle from "./GameTitle.vue";
import GameStat from "./GameStat.vue";
import CardBoard from "./CardBoard.vue";
import { initDeck, initGame, filterSelectedDeck } from "./utils";
import { pickNumber } from "../../common/utils";
export default {
  components: {
    appGameTitle: GameTitle,
    appGameStat: GameStat,
    appCardBoard: CardBoard
  },
  props: ["settings"],
  data: function() {
    return {
      deck: null,
      game: null,
      status: 0, // 0 - not started, 1 - start a game, 2 - total is bigger than target, 3 - game finished
      whoseTurn: 1,
      wins: ""
    };
  },
  computed: {
    computerPlay() {
      if (this.status === 0 && this.game.whoseFirst === 1) {
        return true;
      }
      if (this.status === 0 && this.game.whoseFirst === 2) {
        return false;
      }
      if (this.whoseTurn === 1) {
        return true;
      } else {
        return false;
      }
    },
    filteredDeck() {
      if (!this.deck) return null;
      return filterSelectedDeck(this.deck);
    }
  },
  methods: {
    handleSelectCard(e) {
      if (this.status === 3) {
        return;
      }
      if (this.status === 0) {
        this.status = 1;
        this.whoseTurn = this.game.whoseFirst;
      }
      if (this.status === 2) {
        this.status = 1;
      }
      if (this.game.total + e > this.settings.target) {
        // If the rank selected plus current total exceeds the target
        // Warns pick a lower number
        this.status = 2;
        return;
      }
      if (this.game.total + e === this.settings.target) {
        this.status = 3;
        this.wins =
          this.whoseTurn === 1 ? this.game.partyAName : this.game.partyBName;
        if (this.whoseTurn === 1) {
          this.game.winsForPartyA++;
        } else {
          this.game.winsForPartyB++;
        }
      }
      this.game.total += e;
      if (this.whoseTurn === 1) {
        this.game.partyACards.push(e);
        this.whoseTurn = 2;
      } else {
        this.game.partyBCards.push(e);
        this.whoseTurn = 1;
      }
    },
    handleReset() {
      this.status = 0;
      this.deck = initDeck(this.settings.cards);
      this.whoseTurn = 1;
      this.game = {
        ...this.game,
        total: 0,
        whoseFirst: 1,
        partyACards: [],
        partyBCards: []
      };
    },
    handleComputerPlay() {
      if (this.status === 0) {
        this.status = 1;
      }
      let computersRank;
      if (this.settings.target - this.game.total <= this.settings.cards) {
        // Computer's final step. - Computer wins
        computersRank = this.settings.target - this.game.total;
        this.game.total += computersRank;
        this.game.partyACards.push(computersRank);
        if (!this.deck.S[computersRank - 1].selected) {
          this.deck.S[computersRank - 1].selected = true;
        } else if (!this.deck.H[computersRank - 1].selected) {
          this.deck.H[computersRank - 1].selected = true;
        } else if (!this.deck.C[computersRank - 1].selected) {
          this.deck.C[computersRank - 1].selected = true;
        } else if (!this.deck.D[computersRank - 1].selected) {
          this.deck.D[computersRank - 1].selected = true;
        }
        this.game.winsForPartyA++;
        this.status = 3;
        this.wins = this.game.partyAName;
      } else {
        const selectedCard = this.filteredDeck[
          pickNumber(1, this.filteredDeck.length) - 1
        ];
        this.game.total += selectedCard.rank;
        // console.log(selectedCard);
        this.deck[selectedCard.suit][selectedCard.rank - 1].selected = true;
        this.game.partyACards.push(selectedCard.rank);
      }
      if (this.whoseTurn === 1) {
        // Switch turns
        // this.game.partyACards.push(e);
        this.whoseTurn = 2;
      } else {
        // this.game.partyBCards.push(e);
        this.whoseTurn = 1;
      }
    }
  },
  created() {
    this.deck = initDeck(this.settings.cards);
    this.game = initGame("Computer", "Me");
  }
};
</script>

<style scoped></style>
