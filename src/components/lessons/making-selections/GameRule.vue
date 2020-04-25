<template>
  <div>
    <h6 class="text-center">
      Draw {{ rule.clinicPlayers }} card{{
      rule.clinicPlayers > 1 ? "s" : ""
      }}
      from {{ rule.teamPlayers }} cards
    </h6>
    <h6 class="text-center" v-if="rule.winningCards">Draw {{ drawWords }} to win</h6>
    <h6
      class="text-center"
      v-if="rule.winningCardsNum"
    >{{ rule.winningCardsNum }} winning number{{ rule.winningCardsNum > 1 ? 's' :'' }}</h6>
  </div>
</template>

<script>
import { convertNumberToCard } from "./utils";
export default {
  props: ["rule"],
  computed: {
    drawWords() {
      let words = "";
      const { winningCards, allToWin } = this.rule;
      const sortedWinningCards = winningCards.sort((a, b) => {
        return a - b < 0 ? -1 : 1;
      });
      const article = sortedWinningCards[0] === 1 ? "an" : "a";
      const andOr = allToWin ? "and" : "or";
      if (sortedWinningCards.length === 1) {
        return article + " " + convertNumberToCard(sortedWinningCards[0]);
      }
      const last = convertNumberToCard(
        sortedWinningCards[sortedWinningCards.length - 1]
      );
      const rest = sortedWinningCards
        .slice(0, sortedWinningCards.length - 1)
        .map(card => convertNumberToCard(card));
      return article + " " + rest.join(", ") + " " + andOr + " " + last;
    }
  }
};
</script>

<style scoped>
</style>