<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Find a solution</h3>
    <hr class="subheading-separator">
    <app-enter-number
      v-if="trialNumber===null"
      @acceptTrialNumber="trialNumber=$event; initAppGame() "
      :max="98"
      :min="4"
    ></app-enter-number>
    <div v-else>
      <h5>Sequence for {{ trialNumber }}</h5>
      <div class="app---data d-flex">
        <div class="app--data-row mx-2" v-for="(data, index) in gameData" :key="index">
          <div
            class="text-center"
          >{{ data.paired ? '-' : data.pairs.filter(el => el.paired===false).length }}</div>
          <div class="text-danger font-weight-bold text-center">{{ data.number }}</div>
          <div
            v-for="(pair, index) in data.pairs"
            :key="`p${index}`"
            class="text-center font-weight-bold"
            :class="pair.paired ? 'text-warning' : 'text-primary'"
            style="cursor: pointer;"
            @click="handleChoosePair([data.number, pair.number, pair.paired])"
          >{{ pair.number }}</div>
        </div>
      </div>
      <h5 class="text-center mt-4">Attempted pathway for {{ trialNumber }}</h5>
      <h6
        class="text-center"
        v-if="currentPairs.length > 0"
      >Current pair count: {{ currentPairs.length}}</h6>
      <div class="app--pair-list">
        <div class="d-flex" v-for="(currentPairs, pIndex) in pairsList" :key="`p${pIndex}`">
          <div
            v-for="(data, index) in currentPairs"
            :key="index"
            style="border: 1px solid #ccc; margin: 3px; padding: 3px; min-width: 60px; cursor: pointer;"
            @click="handleRemovePair({data, pairIndex: pIndex})"
          >{{data}}</div>
        </div>
      </div>
      <div class="mb-3"></div>
      <div
        class="text-center text-danger"
        v-if="status===0"
      >Click on a blue number to make a pair with the red number above</div>
      <div v-if="status===1" class="text-center">
        <p class="text-success text-center">Congratulations you have found a successful pathway</p>
        <button class="btn btn-outline-dark" @click="handleReset">Try again</button>
      </div>
      <div v-if="status===2" class="text-center">
        <p class="text-danger text-center">Not possible</p>
        <button class="btn btn-outline-dark" @click="handleReset">Try again</button>
      </div>
    </div>
  </div>
</template>

<script>
import EnterNumber from "./EnterNumber.vue";
import { initGame } from "./utils";
export default {
  components: {
    appEnterNumber: EnterNumber
  },
  data: function() {
    return {
      trialNumber: null,
      gameData: null,
      pairsList: [[]],
      status: 0
      // 0 - is searching for pairs,
      // 1 - Found a pair
      // 2 - Not possible to find a pair
    };
  },
  computed: {
    currentPairs() {
      return this.pairsList[this.pairsList.length - 1];
    },
    allPaired() {
      for (let i = 0; i < this.gameData.length; i++) {
        const oneData = this.gameData[i];
        const { pairs } = oneData;
        for (let j = 0; j < pairs.length; j++) {
          if (!pairs[j].paired) {
            return false;
          }
        }
      }
      return true;
    },
    noPaired() {
      for (let i = 0; i < this.gameData.length; i++) {
        const oneData = this.gameData[i];
        const { pairs } = oneData;
        let possMatchPaired = true;
        for (let j = 0; j < pairs.length; j++) {
          if (!pairs[j].paired) {
            possMatchPaired = false;
            break;
          }
        }
        if (possMatchPaired && !oneData.paired) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    currentPairs(value) {
      if (value.length === this.trialNumber / 2 && this.allPaired) {
        this.status = 1;
      }
      if (
        (value.length > 0 &&
          value.length < this.trialNumber / 2 &&
          this.allPaired) ||
        (value.length > 0 &&
          value.length < this.trialNumber / 2 &&
          this.noPaired)
      ) {
        this.status = 2;
      }
    }
  },
  methods: {
    initAppGame() {
      if (this.trialNumber) {
        this.gameData = initGame(this.trialNumber);
      }
    },
    handleChoosePair(e) {
      const selectedPair = e;
      const [num1, num2, paired] = selectedPair;
      // console.log(selectedPair);
      if (paired) {
        return;
      }
      this.gameData[num1 - 1].paired = true;
      this.gameData[num1 - 1].pairs.forEach(el => (el.paired = true));
      this.gameData[num2 - 1].paired = true;
      this.gameData[num2 - 1].pairs.forEach(el => (el.paired = true));
      for (let i = 0; i < this.gameData.length; i++) {
        const oneData = this.gameData[i];
        const { pairs } = oneData;
        pairs.forEach(el => {
          if (el.number === num2 || el.number === num1) {
            el.paired = true;
          }
        });
      }
      this.pairsList[this.pairsList.length - 1].push(`${num1}, ${num2}`);
    },
    handleReset() {
      this.status = 0;
      this.pairsList.push([]);
      this.initAppGame();
    },
    handleRemovePair(e) {
      const removedPair = e.data;
      const pairIndex = e.pairIndex;
      if (pairIndex + 1 < this.pairsList.length) {
        return;
      }
      if (this.status === 1) {
        return;
      }
      // console.log(removedPair, pairIndex);
      const num1 = +removedPair.split(",")[0];
      const num2 = +removedPair.split(",")[1];
      // console.log(num1, num2);

      this.gameData[num1 - 1].paired = false;
      this.gameData[num1 - 1].pairs.forEach(el => (el.paired = false));
      this.gameData[num2 - 1].paired = false;
      this.gameData[num2 - 1].pairs.forEach(el => (el.paired = false));
      for (let i = 0; i < this.gameData.length; i++) {
        const oneData = this.gameData[i];
        const { pairs } = oneData;
        pairs.forEach(el => {
          if (el.number === num2 || el.number === num1) {
            el.paired = false;
          }
        });
      }

      this.pairsList[this.pairsList.length - 1] = this.pairsList[
        this.pairsList.length - 1
      ].filter(el => el !== removedPair);
      this.pairsList = [...this.pairsList];
      this.status = 0;
    }
  }
};
</script>

<style scoped>
.app---data {
  overflow: auto;
  border: 1px solid #ccc;
  padding: 5px;
}
.app--pair-list {
  min-height: 116px;
  border: 1px solid #ccc;
  overflow-x: auto;
}
</style>
