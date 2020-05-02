<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Demonstration</h3>
    <hr class="subheading-speartor" />
    <div class="row">
      <div class="col-lg-2 col-md-3">
        <app-select-strategy
          :strategies="strategies"
          @selectStrategy="handleSelectStrategy"
          :disabled="status!==0"
        ></app-select-strategy>
        <div class="mb-3"></div>
        <app-game-stat
          class="app--game-box"
          :trials="trials"
          :trial="trial"
          :mean="mean"
          :low="low"
          :high="high"
        ></app-game-stat>
        <div class="mb-3"></div>
        <app-game-detail class="app--game-box" :gamesTally="gamesTally"></app-game-detail>
      </div>
      <div class="col-lg-10 col-md-9">
        <div class="row">
          <div class="col-lg-2 col-sm-6">
            <div class="d-flex justify-content-center my-4 py-4" style="min-height: 195px; ">
              <div v-if="card" style="border: 1px solid #888;">
                <img
                  v-if="card"
                  :src="
                  card &&
                    require(`@/assets/highest-number/${card.suit}${card.number}.jpg`)
                "
                  alt="card"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-sm-6">
            <app-card-draw :usedNumbers="usedNumbers" :numbersInPos="numbersInPos"></app-card-draw>
          </div>
          <div class="col-lg-8">
            <app-strategy-graph
              :strategy="currentStrategy"
              :strategyName="this.strategies[this.selectedStrategyId - 1].name"
            ></app-strategy-graph>
          </div>
        </div>
        <div style="height: 300px;">
          <app-game-graph
            :trialNumber="trials"
            :graphData="gameSetTotalArr"
            :prevGraphData="new Array(27)"
          ></app-game-graph>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <div v-if="demoAutoOption==='0' && status !==5">
        <button
          class="btn btn-outline-success"
          v-if="status===0"
          @click="status=1"
        >Tap here to begin testing</button>
        <button
          class="btn btn-outline-success"
          v-if="status===1"
          @click="handleDrawCard"
        >Tap here for {{ wordUsedNumbers }} draw</button>
        <button
          class="btn btn-outline-success"
          v-if="status===2"
          @click="handlePlaceCard"
        >Tap here to place {{ wordUsedNumbers }} draw</button>
        <button
          class="btn btn-outline-success"
          v-if="status ===3"
          @click="handleTally"
        >Tap here to tally</button>
        <button
          class="btn btn-outline-success"
          v-if="status ===4"
          @click="handleNextSet"
        >Tap here for next set</button>
      </div>
      <div v-if="demoAutoOption==='1' && status !== 5">
        <button
          class="btn btn-outline-success"
          @click="handleToggleTimer"
        >{{ timer ? 'Tap here to pause' : status === 0 ? 'Tap here to begin' : 'Tap here to resume' }}</button>
      </div>
      <div v-if="status === 5">
        <div class="text-center text-danger">Finished</div>
        <button class="btn btn-outline-dark" @click="handleReset">Tap here to reset</button>
      </div>
      <div class="mt-2">
        <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import SelectStrategy from "./SelectStrategy.vue";
import GameStat from "./GameStat.vue";
import GameDetail from "./GameDetail.vue";
import CardDraw from "./CardDraw.vue";
import StrategyGraph from "./StrategyGraph.vue";
import GameGraph from "./GameGraph.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { drawCard } from "./utils";
import { pickNumber } from "../../common/utils";

export default {
  components: {
    appSelectStrategy: SelectStrategy,
    appGameStat: GameStat,
    appGameDetail: GameDetail,
    appCardDraw: CardDraw,
    appStrategyGraph: StrategyGraph,
    appGameGraph: GameGraph,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["strategies"],
  data: function() {
    return {
      selectedStrategyId: 1,
      currentStrategy: null,
      card: null,
      usedNumbers: [],
      demoAutoOption: "0",
      timer: null,
      status: 0,
      // 0 - ready to start
      // 1 - to draw card
      // 2 - to place card
      // 3 - to tally
      // 4 - ready for next set
      // 5 - all finish, reset
      trials: 200,
      trial: 1,
      mean: null,
      low: null,
      high: null,
      total: 0,
      gamesTally: [],
      numbersInPos: [null, null, null],
      gameSetTotalArr: new Array(27)
    };
  },
  computed: {
    countUsedNumbers() {
      return this.usedNumbers.length;
    },
    wordUsedNumbers() {
      let word = "";
      switch (this.countUsedNumbers) {
        case 0:
          word = "first";
          break;
        case 1:
          word = "second";
          break;
        case 2:
          word = "third";
          break;
        default:
          word = "";
      }
      return word;
    },
    isRandomStrategy() {
      return this.selectedStrategyId === 1 ? true : false;
    },
    availablePos() {
      // An array to indicate which position the number can be placed
      // e.g. [0] means number can only be placed at 0 position(hundred part)
      // [0, 1] means number can be placed at 0(hundred) position or 1(ten) position
      const pos = [];
      for (let i = 0; i < this.numbersInPos.length; i++) {
        if (this.numbersInPos[i] === null) {
          pos.push(i);
        }
      }
      return pos;
    },
    tallyTotal() {
      let totalNum = 0;
      if (this.gamesTally.length === 0) {
        return 0;
      }
      this.gamesTally.forEach(tally => {
        totalNum += tally;
      });
      return totalNum;
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = 0;
      }
    }
  },
  methods: {
    handleSelectStrategy(e) {
      this.selectedStrategyId = e;
      this.currentStrategy = _.cloneDeep(
        this.strategies[this.selectedStrategyId - 1].strategy
      );
    },
    handleDrawCard() {
      this.card = drawCard(this.usedNumbers);
      this.status = 2;
    },
    handlePlaceCard() {
      if (this.isRandomStrategy) {
        // Random strategy
        this.randomlyPlaceNum();
      } else {
        // Customized strategy
        this.strategyPlaceNum();
      }

      this.usedNumbers.push(this.card.number);
      if (this.countUsedNumbers >= 3) {
        this.status = 3;
      } else {
        this.status = 1;
      }
      this.card = null;
    },
    handleTally() {
      const numberResult =
        this.numbersInPos[0] * 100 +
        this.numbersInPos[1] * 10 +
        this.numbersInPos[2];
      this.gamesTally.push(numberResult);
      this.usedNumbers = [];
      this.numbersInPos = [null, null, null];
      if (this.gamesTally.length >= 5) {
        this.total += this.tallyTotal;
        this.mean = this.calculateMean();
        this.low = this.calculateLow();
        this.high = this.calculateHigh();

        const freq = Math.floor(this.tallyTotal / 100);
        if (freq >= 6 && freq <= 32) {
          if (this.gameSetTotalArr[freq - 6]) {
            this.gameSetTotalArr[freq - 6] += 1;
          } else {
            this.gameSetTotalArr[freq - 6] = 1;
          }
        }

        if (this.trial >= this.trials) {
          this.status = 5;
        } else {
          this.status = 4;
        }
      } else {
        this.status = 1;
      }
    },
    handleNextSet() {
      this.trial++;
      this.gamesTally = [];
      this.status = 1;
    },
    handleReset() {
      this.status = 0;
      this.trial = 1;
      this.mean = null;
      this.low = null;
      this.high = null;
      this.total = 0;
      this.gamesTally = [];
      clearInterval(this.timer);
      this.timer = null;
      this.demoAutoOption = "0";
    },
    runDemonstration() {
      if (this.status === 0) {
        this.status = 1;
      } else if (this.status === 1) {
        this.handleDrawCard();
      } else if (this.status === 2) {
        this.handlePlaceCard();
      } else if (this.status === 3) {
        this.handleTally();
      } else if (this.status === 4) {
        this.handleNextSet();
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.runDemonstration, 500);
      }
    },
    randomlyPlaceNum() {
      let posIndex;
      if (this.availablePos.length === 3) {
        posIndex = pickNumber(0, 2);
      } else if (this.availablePos.length === 2) {
        posIndex = pickNumber(0, 1);
      } else if (this.availablePos.length === 1) {
        posIndex = 0;
      }
      this.numbersInPos[this.availablePos[posIndex]] = this.card.number;
      this.numbersInPos = [...this.numbersInPos];
    },
    strategyPlaceNum() {
      if (this.countUsedNumbers === 0) {
        this.numbersInPos[
          this.currentStrategy[this.card.number]
        ] = this.card.number;
      } else if (this.countUsedNumbers === 1) {
        this.numbersInPos[
          this.currentStrategy[`${this.usedNumbers[0]}` + `${this.card.number}`]
        ] = this.card.number;
      } else if (this.countUsedNumbers === 2) {
        console.log(this.availablePos[0]);
        this.numbersInPos[this.availablePos[0]] = this.card.number;
      }
      this.numbersInPos = [...this.numbersInPos];
    },
    calculateMean() {
      return Number((this.total / this.trial).toFixed(1));
    },
    calculateLow() {
      if (!this.low) {
        return this.tallyTotal;
      }
      if (this.tallyTotal < this.low) {
        return this.tallyTotal;
      }
      return this.low;
    },
    calculateHigh() {
      if (!this.high) {
        return this.tallyTotal;
      }
      if (this.tallyTotal > this.high) {
        return this.tallyTotal;
      }
      return this.high;
    }
  },
  created() {
    this.currentStrategy = _.cloneDeep(
      this.strategies[this.selectedStrategyId - 1].strategy
    );
  },
  unmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
.app--game-box {
  max-width: 280px;
  margin: 0 auto;
}
button.btn {
  width: 250px;
}
</style>
