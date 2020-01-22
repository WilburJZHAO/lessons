<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Fraction Number</h3>
    <div class="row">
      <div class="col-md-3">
        <app-fraction-input
          :inputType="inputType"
          :fractionData="fractionData"
          :status="status"
          @numberInput="inputNumber=$event"
        ></app-fraction-input>
        <div
          class="text-danger"
          v-if="status===1 && checkMessage===''"
        >Complete the fraction number to match the coloured diagram</div>
        <div v-if="checkMessage" class="text-danger">{{ checkMessage }}</div>
        <div class="mb-3"></div>
        <app-action :status="status" @clickNext="handleNextFraction" @clickOk="handleCheck"></app-action>

        <app-selection-panel
          :fractionSelection="fractionSelection"
          @fractionReadyToChange="handleFractionReadyToChange"
          @fractionChange="handleFractionChange"
        ></app-selection-panel>
        <div class="mb-3"></div>
        <app-estimate-list :estimateArr="estimateArr" :percentageType="2"></app-estimate-list>
      </div>
      <div class="col-md-9">
        <app-strip :percentageData="fractionNum*100" v-if="graphType===1"></app-strip>
        <app-tower :percentageData="fractionNum*100" v-if="graphType===2"></app-tower>
        <app-pie :percentageData="fractionNum*100" v-if="graphType===3"></app-pie>
        <div class="mb-3"></div>
        <app-estimate-graph :estimateHistory="estimateHistory" :answerArr="answerArr"></app-estimate-graph>
      </div>
    </div>
  </div>
</template>

<script>
import FractionInput from "./components/FractionInput";
import SelectionPanel from "./components/SelectionPanel";
import Action from "./components/Action";
import Pie from "./components/Pie";
import Strip from "./components/Strip";
import Tower from "./components/Tower";
import EstimateList from "./components/EstimateList";
import EstimateGraph from "./components/EstimateGraph";
import { fractionSelection, generateFractionNumber } from "./utils";
import { pickNumber } from "../../common/utils";
export default {
  components: {
    appFractionInput: FractionInput,
    appSelectionPanel: SelectionPanel,
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
      fractionData: null,
      fractionSelection: null,
      trialNumber: 0,
      gameNumber: 0,
      inputNumber: "",
      checkMessage: "",
      inputType: 1, // 1 - input numerator, 2 - input denominator
      graphType: 1, // 1 - strip, 2 - tower, 3 - pie
      MAX_TRY: 5,
      MAX_GAMES: 10,
      estimateHistory: [[]],
      estimateArr: [],
      answerArr: []
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
    handleNextFraction() {
      this.fractionData = this.generateFractionNumber();
      this.status = 1;
      this.graphType = pickNumber(1, 3);
      this.inputType = pickNumber(1, 2);
      this.checkMessage = "";
      this.estimateArr = [];
      this.trialNumber = 0;
      if (this.estimateHistory.length >= this.MAX_GAMES) {
        this.estimateHistory = [[]];
        this.gameNumber = 0;
      } else {
        this.estimateHistory.push([]);
      }
      this.inputNumber = "";
    },
    handleCheck() {
      if (typeof this.inputNumber !== "number") {
        return;
      }
      if (
        (this.inputType === 1 &&
          this.inputNumber === this.fractionData.numerator) ||
        (this.inputType === 2 &&
          this.inputNumber === this.fractionData.denominator)
      ) {
        // estimate is correct
        this.checkMessage = "Correct! Try another one.";
        this.trialNumber = 0;
        this.status = 2;
        this.estimateHistory[this.estimateHistory.length - 1].unshift(1);
        this.estimateHistory = [...this.estimateHistory];
        // this.answerArr[this.estimateHistory.length - 1] =
        //   this.percentageData + "%";
        // this.answerArr = [...this.answerArr];
        // this.estimateResultArr = [];
        this.gameNumber++;
      } else {
        // estimate is wrong
        if (
          (this.inputType === 1 &&
            this.inputNumber > this.fractionData.numerator) ||
          (this.inputType === 2 &&
            this.inputNumber > this.fractionData.denominator)
        ) {
          this.checkMessage = `${this.inputNumber} is too big - try again`;
        }

        if (
          (this.inputType === 1 &&
            this.inputNumber < this.fractionData.numerator) ||
          (this.inputType === 2 &&
            this.inputNumber < this.fractionData.denominator)
        ) {
          this.checkMessage = `${this.inputNumber} is too small - try again`;
        }

        this.estimateArr.push(this.inputNumber);
        this.estimateHistory[this.estimateHistory.length - 1].unshift(0);
        this.estimateHistory = [...this.estimateHistory];

        this.trialNumber++;
        if (this.trialNumber >= this.MAX_TRY) {
          // Check if trial number exceeds the maximum allowed trial number
          this.checkMessage = "Try another one.";
          this.status = 2;
          this.gameNumber++;
          // this.answerArr[this.estimateHistory.length - 1] =
          //   this.percentageData + "%";
          // this.answerArr = [...this.answerArr];
          return;
        }
      }
    },
    handleFractionReadyToChange() {},
    handleFractionChange() {
      this.fractionData = this.generateFractionNumber();
      this.estimateArr = [];
      this.graphType = pickNumber(1, 3);
      this.inputType = pickNumber(1, 2);
      this.checkMessage = "";
      this.trialNumber = 0;
      this.gameNumber++;
      this.status = 1;
      if (this.estimateHistory[this.estimateHistory.length - 1].length > 0) {
        this.estimateHistory.push([]);
      }
    }
  },
  created() {
    this.fractionSelection = fractionSelection;
    this.fractionData = this.generateFractionNumber();
    this.graphType = pickNumber(1, 3);
    this.inputType = pickNumber(1, 2);
  }
};
</script>

<style scoped>
</style>