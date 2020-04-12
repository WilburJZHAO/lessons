<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Decimal area</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-3">
        <app-number-display
          v-if="percentageData"
          :percentageData="percentageData"
          :percentageType="PERCENTAGE_TYPE"
        ></app-number-display>
        <app-level-selection :percentageType="PERCENTAGE_TYPE" @changeLevel="handleChangeLevel"></app-level-selection>
        <div class="mb-3"></div>
        <app-action :status="status" @clickNext="handleNextPercentage" @clickOk="handleCheck"></app-action>
      </div>
      <div class="col-md-9">
        <app-strip
          :status="status"
          :percentageData="percentageData"
          @updateStatus="status = $event"
          @estimateAccuracy="handleEstimateAccuracy"
          v-if="graphType===1"
        ></app-strip>
        <app-tower
          :status="status"
          :percentageData="percentageData"
          @updateStatus="status = $event"
          @estimateAccuracy="handleEstimateAccuracy"
          v-if="graphType===2"
        ></app-tower>
        <app-pie
          :status="status"
          :percentageData="percentageData"
          @updateStatus="status=$event"
          @estimateAccuracy="handleEstimateAccuracy"
          v-if="graphType===3"
        ></app-pie>
        <div class="text-danger mb-3">
          <span
            v-if="status === 0 || status === 1 || status === 3"
          >Click in the yellow rectangle to estimate the given decimal number.</span>
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
import NumberDisplay from "./components/NumberDisplay.vue";
import LevelSelection from "./components/LevelSelection.vue";
import Action from "./components/Action";
import Pie from "./components/Pie";
import Strip from "./components/Strip";
import Tower from "./components/Tower";
import AccuracyStat from "./components/AccuracyStat";
import { generatePercentageNumber } from "./utils";
import { pickNumber } from "../../common/utils";
export default {
  components: {
    appNumberDisplay: NumberDisplay,
    appLevelSelection: LevelSelection,
    appAction: Action,
    appPie: Pie,
    appStrip: Strip,
    appTower: Tower,
    appAccuracyStat: AccuracyStat
  },
  data: function() {
    return {
      status: 0,
      percentageData: null,
      PERCENTAGE_TYPE: 0,
      level: 1, // 1 - 1% level, 5 - 5% level
      estimateAccuracy: 0,
      estimateArray: [],
      trialNumber: 0,
      estimateMessage: "",
      graphType: 1 // 1 - strip, 2 - tower, 3 - pie
    };
  },
  methods: {
    generatePercentageNumber() {
      return generatePercentageNumber(this.level);
    },
    handleChangeLevel($event) {
      this.level = $event;
      this.percentageData = this.generatePercentageNumber();
      this.graphType = pickNumber(1, 3);
      this.status = 3;
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
    },
    handleNextPercentage() {
      this.percentageData = this.generatePercentageNumber();
      this.status = 0;
      this.graphType = pickNumber(1, 3);
    },
    handleCheck() {
      this.status = 2;
      setTimeout(() => {
        this.trialNumber++;
      }, 10);
    }
  },
  created() {
    this.percentageData = this.generatePercentageNumber();
    this.graphType = pickNumber(1, 3);
  }
};
</script>

<style scoped>
</style>