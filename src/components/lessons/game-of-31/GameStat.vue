<template>
  <div>
    <h5 class="text-danger">Game 1</h5>
    <p class="text-primary">Total: {{ game.total }}</p>
    <p class="text-primary">
      Wins for {{ game.whoseFirst === 1 ? game.partyAName : game.partyBName }}:
      {{ game.whoseFirst === 1 ? game.winsForPartyA : game.winsForPartyB }}
    </p>
    <p class="text-primary">
      Wins for {{ game.whoseFirst === 1 ? game.partyBName : game.partyAName }}:
      {{ game.whoseFirst === 1 ? game.winsForPartyB : game.winsForPartyA }}
    </p>
    <div>
      First:
      <span class="mr-2"></span>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          class="form-check-input"
          id="a-first"
          value="1"
          v-model.number="game.whoseFirst"
          :disabled="status != 0"
        />
        <label for="a-first" class="form-check-label">{{ game.partyAName}}</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          class="form-check-input"
          id="b-first"
          value="2"
          v-model.number="game.whoseFirst"
          :disabled="status != 0"
        />
        <label for="b-first" class="form-check-label">{{ game.partyBName}}</label>
      </div>
    </div>
    <div class="d-flex mt-2">
      <ul class="list-group flex-fill mr-2 app--cards-list">
        <div class="text-center">{{game.whoseFirst === 1 ? game.partyAName : game.partyBName }}</div>
        <li
          class="list-group-item text-center"
          v-for="(card, index) in (game.whoseFirst === 1 ? game.partyACards : game.partyBCards)"
          :key="index"
        >{{ card }}</li>
      </ul>
      <ul class="list-group flex-fill app--cards-list">
        <div class="text-center">{{game.whoseFirst === 1 ? game.partyBName : game.partyAName }}</div>
        <li
          class="list-group-item text-center"
          v-for="(card, index) in (game.whoseFirst === 1 ? game.partyBCards : game.partyACards)"
          :key="index"
        >{{ card }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["game", "status"]
};
</script>

<style scoped>
.app--cards-list {
  /* max-height: 140px;
  overflow-y: auto; */
}
</style>