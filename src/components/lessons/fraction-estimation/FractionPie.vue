<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-success text-center mb-4">Fraction Pie</h3>
    <div class="row">
      <div class="col-md-3">
        <app-fraction-display v-if="fractionData" :fractionData="fractionData"></app-fraction-display>
        <app-action :status="status" @clickNext="handleNextFraction" @clickOk="handleCheck"></app-action>
        <app-selection-panel
          :fractionSelection="fractionSelection"
          @fractionReadyToChange="handleFractionReadyToChange"
          @fractionChange="handleFractionChange"
        ></app-selection-panel>
      </div>
      <div class="col-md-9">
        <!-- <app-strip
          :status="status"
          :fractionData="fractionData"
          @updateStatus="status = $event"
          @estimateAccuracy="handleEstimateAccuracy"
        ></app-strip>-->
        <app-pie
          :status="status"
          :fractionData="fractionData"
          @updateStatus="status = $event"
          @estimateAccuracy="handleEstimateAccuracy"
        ></app-pie>
        <div class="text-danger mb-3">
          <span
            v-if="status === 0 || status === 1 || status === 3"
          >Click in the yellow rectangle to estimate the given fraction.</span>
          <span v-if="status === 2">{{ estimateMessage }}</span>
        </div>
        <app-accuracy-stat
          :trialNumber="trialNumber"
          :estAccuracy="estimateAccuracy"
          :estArray="estimateArray"
        ></app-accuracy-stat>
      </div>
    </div>
  </div>
</template>

<script>
import SelectionPanel from "./components/SelectionPanel";
import FractionDisplay from "./components/FractionDisplay";
import Action from "./components/Action";
import Pie from "./components/Pie";
import AccuracyStat from "./components/AccuracyStat";
import { fractionSelection, generateFractionNumber } from "./utils";
export default {
  components: {
    appSelectionPanel: SelectionPanel,
    appFractionDisplay: FractionDisplay,
    appPie: Pie,
    appAction: Action,
    appAccuracyStat: AccuracyStat
  },
  data: function() {
    return {
      status: 0,
      // 0 - not started
      // 1 - started
      // 2 - checked
      // 3- fraction just changed
      fractionData: null,
      fractionSelection: null,
      estimateAccuracy: 0,
      estimateArray: [],
      trialNumber: 0,
      estimateMessage: ""
    };
  },
  computed: {
    fractionNum() {
      if (this.fractionData) {
        return Number(
          (this.fractionData.numerator / this.fractionData.denominator).toFixed(
            2
          )
        );
      } else {
        return 0;
      }
    }
  },
  methods: {
    generateFractionNumber() {
      return generateFractionNumber(this.fractionSelection);
    },
    handleFractionReadyToChange() {
      this.status = 0;
    },
    handleFractionChange() {
      this.fractionData = this.generateFractionNumber();
      this.status = 3;
    },
    handleNextFraction() {
      this.fractionData = this.generateFractionNumber();
      this.status = 0;
    },
    handleCheck() {
      this.trialNumber++;
      this.status = 2;
    },
    handleEstimateAccuracy($event) {
      this.estimateAccuracy = $event;
      this.estimateArray.push(this.estimateAccuracy);
      if (Math.abs(this.estimateAccuracy) <= 2) {
        this.estimateMessage =
          "Near enough to perfect! Next button for new challenge";
      } else {
        this.estimateMessage = "Next button for new challenge";
      }
    }
  },
  created() {
    this.fractionSelection = fractionSelection;
    this.fractionData = this.generateFractionNumber();
  }
};
</script>

<style scoped></style>
