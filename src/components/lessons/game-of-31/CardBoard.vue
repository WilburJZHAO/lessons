<template>
  <div class="app--cards-container">
    <div class="app--cards-row mb-2">
      <div
        v-for="(card, index) in deck.S"
        :key="`S${index}`"
        class="mr-1"
        @click="handleSelectCard({suit: 'S', index, rank: card.rank})"
      >
        <img
          :src="card.selected ? require(`@/assets/game-of-31/back.jpg`) : require(`@/assets/game-of-31/S${card.rank}.jpg`)"
          alt="card"
          class="image-fluid"
        />
      </div>
    </div>
    <div class="app--cards-row mb-2">
      <div
        v-for="(card, index) in deck.H"
        :key="`H${index}`"
        class="mr-1"
        @click="handleSelectCard( {suit: 'H', index, rank: card.rank})"
      >
        <img
          :src="card.selected ? require(`@/assets/game-of-31/back.jpg`) : require(`@/assets/game-of-31/H${card.rank}.jpg`)"
          alt="card"
        />
      </div>
    </div>
    <div class="app--cards-row mb-2">
      <div
        v-for="(card, index) in deck.C"
        :key="`C${index}`"
        class="mr-1"
        @click="handleSelectCard({suit: 'C', index, rank: card.rank})"
      >
        <img
          :src="card.selected ? require(`@/assets/game-of-31/back.jpg`) : require(`@/assets/game-of-31/C${card.rank}.jpg`)"
          alt="card"
        />
      </div>
    </div>
    <div class="app--cards-row mb-2">
      <div
        v-for="(card, index) in deck.D"
        :key="`D${index}`"
        class="mr-1"
        @click="handleSelectCard({suit: 'D', index, rank: card.rank})"
      >
        <img
          :src="card.selected ? require(`@/assets/game-of-31/back.jpg`) : require(`@/assets/game-of-31/D${card.rank}.jpg`)"
          alt="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deck", "target", "total", "computerPlay"],
  methods: {
    handleSelectCard(e) {
      if (this.computerPlay) return; // If it is computer's turn, do not allow user to select card
      if (this.target === this.total) return; // If target is reached, no need to select card
      const { suit, index, rank } = e;
      if (this.deck[suit][index].selected) return; // If this card is selected, no action required.
      this.$emit("selectCard", rank); // Get the rank of card and emit it to parent component
      if (this.total + rank <= this.target) {
        // Select card and turn the card back.
        this.deck[suit][index].selected = true;
      }
    }
  }
};
</script>

<style scoped>
.app--cards-row {
  display: flex;
}
.app--cards-row img {
  max-width: 100%;
  height: auto;
}
</style>