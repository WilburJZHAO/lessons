<template>
  <div>
    <div class="d-flex">
      <div style="visibility: hidden;" class="app--graph-static">Dice sums</div>
      <div class="app--game-graph flex-grow-1 d-flex flex-column">
        <div class="flex-grow-1 d-flex align-items-end">
          <div
            v-for="(item, index) in game"
            :key="index"
            class="app--graph-col app--graph-demo-col"
            :style="{height: gameType===1 ? item.wins*unit+'%' : item.wins*unit+'px'}"
          >
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="app--graph-static text-danger font-weight-bold text-right d-lg-block">
        <div>Wins</div>
        <div>%Wins</div>
        <div>Dice sums</div>
        <div>Spaces</div>
      </div>
      <div class="app--graph-statistic d-flex flex-grow-1">
        <div v-for="(item, index) in game" :key="index" class="app--graph-col app--graph-stat-col">
          <div class="text-primary app--graph-block">{{ legify(item.wins) }}</div>
          <div
            class="app--graph-block"
            :style="{visibility: tried >0?'visible': 'hidden' }"
          >{{ tried > 0 ? (item.wins / tried*100).toFixed(2) + '%' : '0' }}</div>
          <div class="text-danger app--graph-block">{{ item.diceSums }}</div>
          <div class="app--graph-block">{{ item.spaces }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- item.wins*unit+'%' -->
</template>

<script>
import { legify } from "../../common/utils.js";
export default {
  methods: {
    legify
  },
  props: ["game", "tried", "trialNumber", "gameType"],
  data: function() {
    return {};
  },
  computed: {
    unit() {
      if (!this.trialNumber) {
        return 0;
      }
      if (this.gameType === 2) {
        if (this.trialNumber <= 50) {
          return 30;
        } else if (this.trialNumber <= 100) {
          return 20;
        } else if (this.trialNumber <= 500) {
          return 6;
        } else if (this.trialNumber <= 1000) {
          return 3;
        } else if (this.trialNumber <= 5000) {
          return 0.6;
        } else {
          return 0.3;
        }
      } else if (this.gameType === 1) {
        if (this.trialNumber <= 100) {
          return (1 / (this.trialNumber * 0.12)) * 10;
        } else if (this.trialNumber <= 1000) {
          return (1 / (this.trialNumber * 0.12)) * 50;
        } else {
          return (1 / (this.trialNumber * 0.12)) * 100;
        }
      } else {
        return 0;
      }
    }
  }
};
</script>

<style scoped>
.app--game-graph {
  height: 50vh;
  overflow: auto;
  border: 1px solid #ccc;
  padding-top: 10px;
}
.app--graph-col {
  width: 12%;
  margin-right: 2px;
  margin-left: 2px;
}
.app--graph-block {
  display: flex;
  justify-content: center;
}
.app--graph-demo-col {
  background-color: blue;
}
.app--graph-stat-col {
  overflow: hidden;
}
@media only screen and (max-width: 767px) {
  .app--graph-static {
    font-size: 10px;
  }
  .app--graph-stat-col {
    font-size: 10px;
  }
}
@media only screen and (max-width: 531px) {
  .app--graph-static {
    display: none;
  }
}
@media only screen and (max-width: 476px) {
  .app--graph-stat-col {
    font-size: 5px;
  }
}
</style>