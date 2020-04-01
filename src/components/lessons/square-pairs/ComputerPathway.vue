<template>
  <div class="container mt-3">
    <h3 class="text-success text-center mb-3">Computer finds a pathway</h3>
    <app-enter-number
      v-if="trialNumber === null"
      @acceptTrialNumber="
        trialNumber = $event;
        initAppGame();
      "
      :max="36"
      :min="8"
    ></app-enter-number>
    <div v-else>
      <h5>Sequence for {{ trialNumber }}</h5>
      <div class="app---data d-flex">
        <div class="app--data-row mx-2" v-for="(data, index) in gameData" :key="index">
          <div class="text-center">{{ data.paired ? "-" : data.pairs.length }}</div>
          <div class="text-danger font-weight-bold text-center">{{ data.number }}</div>
          <div
            v-for="(pair, index) in data.pairs"
            :key="`p${index}`"
            class="text-center font-weight-bold"
            :class="pair.paired ? 'text-warning' : 'text-primary'"
            style="cursor: pointer;"
          >{{ pair.number }}</div>
        </div>
      </div>
      <div class="mt-4">
        <h5 class="text-center">Solution pathways for {{ trialNumber }}</h5>
        <div
          v-if="pathways && pathways.length === 0"
          class="text-center text-danger"
        >No solution found</div>
        <div v-if="pathways && pathways.length > 0">
          <div
            class="text-danger text-center"
          >{{ pathways.length }} solution{{ pathways.length > 1 ? "s" : "" }}</div>
        </div>
      </div>
      <div class="app--pair-list">
        <div class="d-flex" v-for="(pathway, pIndex) in pathways" :key="`p${pIndex}`">
          <div
            v-for="(data, index) in pathway"
            :key="index"
            style="border: 1px solid #ccc; margin: 3px; padding: 3px; min-width: 60px; "
          >{{ data.join(", ") }}</div>
        </div>
      </div>
      <div class="text-center mt-4">
        <button
          class="btn btn-outline-success"
          @click="handleFindPathway"
        >Tap here to search for pathways</button>
      </div>
      <!-- <div class="text-center mt-1">
        <app-demo-auto-option
          @changeOption="demoAutoOption = $event"
          :option="demoAutoOption"
        ></app-demo-auto-option>
      </div>-->
    </div>
  </div>
</template>

<script>
import Combinatorics from "js-combinatorics";
import EnterNumber from "./EnterNumber.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { initGame, getAllPairs, updatePathways, initPairsMatch } from "./utils";
export default {
  components: {
    appEnterNumber: EnterNumber,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      trialNumber: null,
      gameData: null,
      demoAutoOption: "0",
      pathways: null,
      pairsMatch: null,
      newPathways: []
      // index: 1,
      // PRE_FIND_BREAKDOWN: 30
    };
  },
  watch: {
    trialNumber(value) {
      if (value) {
        this.pairsMatch = initPairsMatch(value);
      }
    }
  },
  methods: {
    initAppGame() {
      if (this.trialNumber) {
        this.gameData = initGame(this.trialNumber);
      }
    },

    /**
     * Takes the list of pathways and updates them for the next card
     * All pathways are built simultaneously.
     * Pathways with multiple options are split.
     * Pathways that can't be continued are deleted.
     *
     */
    updatePathways(pathways, currentCard, numCards) {
      let updatedPathways = [];
      pathways.forEach(currentPathway => {
        let newPathways = this.splitPathway(
          currentPathway,
          currentCard,
          numCards
        );
        updatedPathways = updatedPathways.concat(newPathways); // join the new pathways to the array
        // console.log(newPathways, newPathways[0] && newPathways[0].length);
      });
      return updatedPathways;
    },

    /**
     * Takes a pathway in the form [ [a, b], [c, d], [e, f] ] - number of pairs may vary
     *
     * After considering the next number card, returns an ARRAY OF NEW PATHWAYS
     * This could have either 0 (pathway died), 1 (only one way forward), or more
     * (pathway is split into multiple possibilities).
     *
     */
    splitPathway(pathway, cardNum, max) {
      let newPathways = [];
      let numbersAlreadyUsed = pathway.flat(1);
      // console.log(pathway);
      // console.log(numbersAlreadyUsed);
      // Outcome one - cardNum is already paired - no change made
      if (numbersAlreadyUsed.includes(cardNum)) {
        return [pathway];
      }
      // Outcome two - pathway is split into 0, 1 or more new possiblities
      else {
        let possiblePairs = this.getPossiblePairs(
          cardNum,
          cardNum,
          max,
          numbersAlreadyUsed
        );
        for (let i = 0; i < possiblePairs.length; i++) {
          // make a new pathway for each possible pairing
          // let newPathway = pathway.slice(0);
          let newPathway = [...pathway];
          // console.log(newPathway);
          newPathway.push([...possiblePairs[i]]);
          newPathways.push(newPathway);
        }
        return newPathways;
      }
    },

    /**
     ********************
     * Helper functions.*
     ********************
     */
    getPossiblePairs(num, min, max, numbersAlreadyUsed) {
      let possPairs = [];
      this.pairsMatch[num - 1].forEach(possMatch => {
        if (
          possMatch >= min &&
          possMatch <= max &&
          possMatch !== num &&
          !numbersAlreadyUsed.includes(possMatch)
        ) {
          possPairs.push([num, possMatch]);
        }
      });
      return possPairs;
    },

    /**
     * Takes a number and prints to the console an array of
     * all possible pathways.
     *  [  [[pair], [pair], [pair]], [[pair], [pair], [pair]]  ]
     *	Outer array contains pathway arrays
     * Pathway arrays contain pairs arrays
     *
     */
    findPathways() {
      let pathways = [[]]; // start with one empty pathway inside pathways list
      let index = 1;
      while (index < this.trialNumber) {
        // loop over every card except last one
        pathways = this.updatePathways(pathways, index, this.trialNumber);
        index++;
      }
      return pathways;
    },
    handleFindPathway() {
      let then = new Date();
      this.pathways = this.findPathways();
      let now = new Date();
      console.log(now - then);
      console.log(this.pathways);
      // console.log(this.pathways.next().value);
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
  max-height: 300px;
  border: 1px solid #ccc;
  overflow-x: auto;
}
</style>
