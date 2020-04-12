<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Play many games</h3>
    <hr class="subheading-separator">
    <div class="mt-4 row">
      <app-hexagon
        class="col-md-4"
        :data="hexSetting[0]"
        :selected="selectedNumber"
        :style="{visibility: selectedHex.indexOf('left') >= 0 ? 'visible':'hidden'}"
      ></app-hexagon>
      <app-hexagon
        class="col-md-4"
        :data="hexSetting[1]"
        :selected="selectedNumber"
        :style="{visibility: selectedHex.indexOf('middle') >= 0 ? 'visible':'hidden'}"
      ></app-hexagon>
      <app-hexagon
        class="col-md-4"
        :data="hexSetting[2]"
        :selected="selectedNumber"
        :style="{visibility: selectedHex.indexOf('right') >= 0 ? 'visible':'hidden'}"
      ></app-hexagon>
    </div>
    <div v-if="!isSelected">
      <div class="text-center">
        <h5>Choose your hexagons for testing</h5>
      </div>
      <div class="text-center mt-3">
        <div class="form-check form-check-inline">
          <input
            id="hex-left"
            type="checkbox"
            class="form-check-input"
            v-model="selectedHex"
            value="left"
          />
          <label for="hex-left" class="form-check-label">Left</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="hex-middle"
            type="checkbox"
            class="form-check-input"
            v-model="selectedHex"
            value="middle"
          />
          <label for="hex-middle" class="form-check-label">Middle</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="hex-right"
            type="checkbox"
            class="form-check-input"
            v-model="selectedHex"
            value="right"
          />
          <label for="hex-right" class="form-check-label">Right</label>
        </div>
      </div>
      <div class="text-center">
        <div v-if="selectedHex.length === 0" class="badge badge-danger">Select at least one hexagon</div>
      </div>
      <div class="app--enter-number form-group row mt-3">
        <label
          for="trial-numbers"
          class="col-form-label col-sm-6"
        >Enter the number of trials (1 to 10000):</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" v-model="trialNumber" required />
        </div>
      </div>
      <div class="text-center">
        <button
          class="btn btn-outline-success mt-4"
          @click="() => { isSelected = true;}"
          :disabled="selectedHex.length === 0 || !isValidTrialNumber"
        >OK</button>
      </div>
    </div>
    <div v-else>
      <table class="table text-center" style="table-layout: fixed;">
        <col width="80" />
        <tr>
          <th>#</th>
          <th>
            <span :style="{visibility: selectedHex.indexOf('left') >= 0 ? 'visible':'hidden'}">Left</span>&nbsp;
          </th>
          <th>
            <span
              :style="{visibility: selectedHex.indexOf('middle') >= 0 ? 'visible':'hidden'}"
            >Middle</span>&nbsp;
          </th>
          <th>
            <span
              :style="{visibility: selectedHex.indexOf('right') >= 0 ? 'visible':'hidden'}"
            >Right</span>&nbsp;
          </th>
        </tr>
        <tr v-if="selectedHex.length > 1">
          <td>% Wins</td>
          <td v-for="(percent, index) in resultPercent" :key="index">
            <span v-if="percent > 0">{{percent}}%</span>
            &nbsp;
          </td>
        </tr>
        <tr v-if="selectedHex.length === 1">
          <td>Mean rolls</td>
          <td v-for="(item, index) in result" :key="index">
            <span v-if="item > 0">{{ item }}</span>
            &nbsp;
          </td>
        </tr>
        <tr v-if="selectedHex.length > 1">
          <td># Wins</td>
          <td v-for="(item, index) in result" :key="index">
            <span v-if="item > 0">{{ item }}</span>
            &nbsp;
          </td>
        </tr>
        <tr>
          <td>Trial</td>
          <td>
            <span v-if="numberOfTried > 0" class="text-primary">{{ numberOfTried}}&nbsp;</span>
          </td>
          <td></td>
          <td class="text-danger" v-if="trialNumber">{{trialNumber}} trials</td>
        </tr>
      </table>
      <div class="text-center mt-3">
        <button
          v-if="demoAutoOption=='0' && !isEnd"
          class="btn btn-outline-success"
          @click="handlePlayOneGame"
        >{{ isStart ? "Next game" : "First game" }}</button>
        <button
          v-if="demoAutoOption=='1' && !isEnd"
          class="btn btn-outline-success"
          @click="handleToggleTimer"
        >
          {{ !isStart ? "Start" :
          ( timer ? "Pause" : "Resume")
          }}
        </button>
        <button v-if="isEnd" class="btn btn-outline-dark" @click="handleReset">Reset</button>
        <br />
        <app-demo-auto-option
          class="mt-1"
          :option="demoAutoOption"
          @changeOption="demoAutoOption=$event"
        ></app-demo-auto-option>
      </div>
    </div>
  </div>
</template>

<script>
import Hexagon from "./Hexagon.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { throwDiceOnce } from "./utils";
import { calculateTimerInterval } from "../../common/utils";

export default {
  components: {
    appHexagon: Hexagon,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["hexSetting"],
  data: function() {
    return {
      dataLeft: [8, 9, 10, 12, 15, 16],
      dataMiddle: [1, 2, 3, 4, 5, 6],
      dataRight: [18, 20, 24, 25, 30, 36],
      selectedNumber: [],
      selectedNumberInGame: [],
      selectedHex: ["left", "middle", "right"],
      isSelected: false,
      isStart: false,
      demoAutoOption: "1",
      timer: null,
      number1: null,
      number2: null,
      product: null,
      dataLeftTest: [],
      dataMiddleTest: [],
      dataRightTest: [], // The three arrays are the copies of
      // dataLeft, dataMiddle and dataRight to test which one is winner
      result: [0, 0, 0], // The number of winning for each hexagon: 'left', 'middle' and 'right'
      trialNumber: null, // Total number to try
      numberOfTried: 0, // Number of games tried
      isEnd: false, // If the number played reaches total trial number
      meanResult: [0, 0, 0], // Mean rolls for left, middle or right
      rolls: 0
    };
  },
  watch: {
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    isEnd(value) {
      if (value) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handlePlayOneGame() {
      if (!this.isStart) this.isStart = true;
      this.numberOfTried++;
      while (
        this.dataLeftTest.length > 0 &&
        this.dataMiddleTest.length > 0 &&
        this.dataRightTest.length > 0
      ) {
        this.rolls++;
        let product = throwDiceOnce() * throwDiceOnce();
        if (this.selectedNumberInGame.indexOf(product) < 0) {
          this.selectedNumberInGame.push(product);
        }
        let indexForLeft = this.dataLeftTest.indexOf(product);
        let indexForMiddle = this.dataMiddleTest.indexOf(product);
        let indexForRight = this.dataRightTest.indexOf(product);
        if (indexForLeft >= 0 && this.selectedHex.indexOf("left") >= 0) {
          this.dataLeftTest.splice(indexForLeft, 1);
        }
        if (indexForMiddle >= 0 && this.selectedHex.indexOf("middle") >= 0) {
          this.dataMiddleTest.splice(indexForMiddle, 1);
        }
        if (indexForRight >= 0 && this.selectedHex.indexOf("right") >= 0) {
          this.dataRightTest.splice(indexForRight, 1);
        }
        if (this.dataLeftTest.length === 0) {
          // If left hex is winner
          const resultArr = [++this.result[0], this.result[1], this.result[2]];
          const resultMeanArr = [
            Number((this.rolls / this.numberOfTried).toFixed(2)),
            0,
            0
          ];
          this.result =
            this.selectedHex.length === 1 ? [...resultMeanArr] : [...resultArr];
        }
        if (this.dataMiddleTest.length === 0) {
          // If middle hex is winner
          const resultArr = [this.result[0], ++this.result[1], this.result[2]];
          const resultMeanArr = [
            0,
            Number((this.rolls / this.numberOfTried).toFixed(2)),
            0
          ];
          this.result =
            this.selectedHex.length === 1 ? [...resultMeanArr] : [...resultArr];
        }
        if (this.dataRightTest.length === 0) {
          // If right hex is winner
          const resultArr = [this.result[0], this.result[1], ++this.result[2]];
          const resultMeanArr = [
            0,
            0,
            Number((this.rolls / this.numberOfTried).toFixed(2))
          ];
          this.result =
            this.selectedHex.length === 1 ? [...resultMeanArr] : [...resultArr];
        }
      }

      this.resetGame();
      if (this.numberOfTried >= this.trialNumber) {
        this.isEnd = true;
      }
    },
    resetGame() {
      this.dataLeftTest = [...this.hexSetting[0]];
      this.dataMiddleTest = [...this.hexSetting[1]];
      this.dataRightTest = [...this.hexSetting[2]];
      this.selectedNumberInGame = [];
    },
    handleToggleTimer() {
      if (!this.isStart) this.isStart = true;
      if (!this.timer) {
        this.timer = setInterval(this.handlePlayOneGame, this.timerInterval);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleReset() {
      this.resetGame();
      this.numberOfTried = 0;
      this.result = [0, 0, 0];
      this.isEnd = false;
      this.isStart = false;
      this.rolls = 0;
    }
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    isValidTrialNumber() {
      if (
        !this.trialNumber ||
        isNaN(Number(this.trialNumber)) ||
        this.trialNumber < 1 ||
        this.trialNumber > 10000
      ) {
        return false;
      }
      return true;
    },
    resultPercent() {
      if (!this.numberOfTried > 0) {
        return [0, 0, 0];
      }
      const resultPercentArr = [];
      for (let i = 0; i < this.result.length; i++) {
        let percent = Number(
          ((this.result[i] / this.numberOfTried) * 100).toFixed(1)
        );
        resultPercentArr.push(percent);
      }
      return resultPercentArr;
    }
  },
  created() {
    this.dataLeftTest = [...this.hexSetting[0]];
    this.dataMiddleTest = [...this.hexSetting[1]];
    this.dataRightTest = [...this.hexSetting[2]];
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--enter-number {
  max-width: 700px;
  margin: 0 auto;
}
</style>
