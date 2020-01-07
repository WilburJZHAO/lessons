<template>
  <div class="app--gameboard">
    <div class="d-flex" style="width: 100%;">
      <div
        class="app--block app--wins-hidden-block app--wins-block"
        style="visibility: hidden;"
      >Wins</div>
      <div
        v-for="(item, i) in game"
        :key="'i' + i"
        class="app--col d-flex flex-column justify-content-end"
      >
        <div v-for="(space, j) in item.spaces" :key="'j' + j" class="app--block-container">
          <div class="app--block">
            <app-button :number="item.diceSums" v-if="j === item.currentSpace"></app-button>
          </div>
        </div>
        <div class="app--landing-row">
          <div
            class="app--landing-block"
            :class="{
              'app--landing-block-start': i === 0,
              'app--landing-block-end': i === 10
            }"
          >
            <app-button :number="item.diceSums" v-if="item.currentSpace >= item.spaces"></app-button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div style="visibility: hidden;" class="app--wins-block app--wins-hidden-block">Wins</div>
      <div
        class="text-center app--landing-text flex-grow-1 text-success pb-2"
      >Landing in this row to win</div>
    </div>
    <div class="d-flex" style="position: relative;">
      <div class="app--block app--wins-block">Wins</div>
      <div
        v-for="(item, i) in game"
        :key="'i' + i"
        class="app--mark app--col app--block"
      >{{ item.wins }}</div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: {
    appButton: Button
  },
  props: ["game"]
};
</script>

<style scoped>
.app--gameboard {
  width: 100%;
}
.app--col {
  width: 12%;
}
.app--block {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}
.app--landing-block {
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--landing-block-start {
  border-left: 1px solid #ccc;
}
.app--landing-block-end {
  border-right: 1px solid #ccc;
}
.app--landing-text {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.app--wins-block {
  border: none !important;
  padding-right: 2px;
}
@media only screen and (max-width: 576px) {
  .app--wins-block {
    font-size: 10px;
  }
}
</style>
