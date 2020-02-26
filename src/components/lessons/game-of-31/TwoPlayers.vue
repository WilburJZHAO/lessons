<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Two Players</h3>
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
          <span
            v-if="status === 0"
          >{{ game.whoseFirst === 1 ? game.partyAName : game.partyBName }}. Click on a card</span>
          <span
            v-if="status === 1"
          >{{ whoseTurn === 1 ? game.partyAName : game.partyBName }}. Click on a card</span>
          <span v-if="status===2">Pick a lower card</span>
          <span v-if="status===3">
            {{ wins }} is the winner
            <br />
            <button class="btn btn-outline-dark" @click="handleReset">Tap here to reset</button>
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
import { initDeck, initGame } from "./utils";
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
      wins: "",
      computerPlay: false
    };
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
    }
  },
  created() {
    this.deck = initDeck(this.settings.cards);
    this.game = initGame();
  }
};
</script>

<style scoped></style>
