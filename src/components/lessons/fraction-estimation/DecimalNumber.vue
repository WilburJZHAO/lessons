<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Decimal Number</h3>
    <div class="row">
      <div class="col-md-3">
        <app-number-input
          :numberType="NUMBER_TYPE"
          :status="status"
          @numberInput="decimalInput=$event"
        ></app-number-input>

        <div
          class="text-danger"
          v-if="status===1 && checkMessage===''"
        >Enter the percentage to match the coloured diagram</div>
        <div v-if="checkMessage" class="text-danger">{{ checkMessage }}</div>
        <div class="mb-3"></div>
        <app-level-selection :percentageType="NUMBER_TYPE" @changeLevel="handleChangeLevel"></app-level-selection>
        <div class="mb-3"></div>
        <app-action :status="status" @clickNext="handleNextPercentage" @clickOk="handleCheck"></app-action>
        <app-estimate-list :estimateArr="estimateArr" :percentageType="NUMBER_TYPE"></app-estimate-list>
      </div>
      <div class="col-md-9">
        <app-strip :percentageData="percentageData" v-if="graphType===1"></app-strip>
        <app-tower :percentageData="percentageData" v-if="graphType===2"></app-tower>
        <app-pie :percentageData="percentageData" v-if="graphType===3"></app-pie>
        <div class="mb-3"></div>
        <app-estimate-graph :estimateHistory="estimateHistory" :answerArr="answerArr"></app-estimate-graph>
      </div>
    </div>
  </div>
</template>

<script>
import NumberInput from "./components/NumberInput";
import LevelSelection from "./components/LevelSelection";
import Action from "./components/Action";
import Pie from "./components/Pie";
import Strip from "./components/Strip";
import Tower from "./components/Tower";
import EstimateList from "./components/EstimateList";
import EstimateGraph from "./components/EstimateGraph";
import { generatePercentageNumber } from "./utils";
import { pickNumber } from "../../common/utils";
export default {
  components: {
    appNumberInput: NumberInput,
    appLevelSelection: LevelSelection,
    appAction: Action,
    appPie: Pie,
    appStrip: Strip,
    appTower: Tower,
    appEstimateList: EstimateList,
    appEstimateGraph: EstimateGraph
  },
  data: function() {
    return {
      status: 1,
      percentageData: null,
      NUMBER_TYPE: 2, // 0 - fraction, 1 - percentage, 2 - decimal
      level: 1, // 1 - 1% level, 5 - 5% level
      graphType: 1, // 1 - strip, 2 - tower, 3 - pie
      trialNumber: 0,
      gameNumber: 0,
      estimateArr: [],
      // estimateResultArr: [],
      answerArr: [],
      estimateHistory: [[]],
      decimalInput: "",
      checkMessage: "",
      MAX_TRY: 5,
      MAX_GAMES: 10
    };
  },
  computed: {
    decimalData() {
      return this.percentageData / 100;
    }
  },
  watch: {},
  methods: {
    generatePercentageNumber() {
      return generatePercentageNumber(this.level);
    },
    handleChangeLevel($event) {
      this.level = $event;
      this.percentageData = this.generatePercentageNumber();
      this.graphType = pickNumber(1, 3);
      this.checkMessage = "";
      this.estimateArr = [];
      // this.estimateResultArr = [];
      this.trialNumber = 0;
      this.gameNumber++;
      this.status = 1;

      if (this.estimateHistory[this.estimateHistory.length - 1].length > 0) {
        this.estimateHistory.push([]);
      }
    },
    handleNextPercentage() {
      this.percentageData = this.generatePercentageNumber();
      this.status = 1;
      this.graphType = pickNumber(1, 3);
      this.checkMessage = "";
      this.estimateArr = [];
      // this.estimateResultArr = [];
      this.trialNumber = 0;
      if (this.estimateHistory.length >= this.MAX_GAMES) {
        this.estimateHistory = [[]];
        this.gameNumber = 0;
      } else {
        this.estimateHistory.push([]);
      }
      this.decimalInput = "";
    },
    handleCheck() {
      if (typeof this.decimalInput !== "number") {
        return;
      }
      if (this.decimalInput === this.decimalData) {
        // If estimate is correct
        this.checkMessage = "Correct! Try another one.";
        this.trialNumber = 0;
        this.status = 2;
        //this.estimateResultArr.unshift(1);
        this.estimateHistory[this.estimateHistory.length - 1].unshift(1);
        this.estimateHistory = [...this.estimateHistory];
        this.answerArr[this.estimateHistory.length - 1] = this.decimalData;
        this.answerArr = [...this.answerArr];
        // this.estimateResultArr = [];
        this.gameNumber++;
      } else {
        // If estimate is not correct
        this.estimateArr.push(this.decimalInput);
        if (this.decimalInput > this.decimalData) {
          this.checkMessage = `${this.decimalInput} is too big - try again`;
        } else if (this.decimalInput < this.decimalData) {
          this.checkMessage = `${this.decimalInput} is too small - try again`;
        }
        //this.estimateResultArr.unshift(0);
        this.estimateHistory[this.estimateHistory.length - 1].unshift(0);
        this.estimateHistory = [...this.estimateHistory];

        this.trialNumber++;
        if (this.trialNumber >= this.MAX_TRY) {
          this.checkMessage = "Try another one.";
          this.status = 2;
          this.gameNumber++;
          this.answerArr[this.estimateHistory.length - 1] =
            this.percentageData + "%";
          this.answerArr = [...this.answerArr];
          return;
        }
      }
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