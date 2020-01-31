<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="app--cutout-square">
            <h5 class="text text-success">Enter the length of cutout square(0 - {{maxSquareSize}})</h5>
            <div class="app--square-input">
              <input
                class="form-control mr-3"
                type="number"
                required
                min="0"
                :max="maxSquareSize"
                v-model="squareSize"
              />
              <button class="btn btn-outline-success mr-3" @click="handleCutout">OK</button>
              <button class="btn btn-outline-danger" @click="handleReset">Reset</button>
            </div>
            <div
              class="badge badge-danger mt-2"
              v-bind:style="{visibility: isInvalidInput ? 'visible' : 'hidden' }"
            >{{ errorMsg }}</div>
            <h5 class="text text-success text-center mt-3">Dimensions of box</h5>
            <table class="table">
              <tr class="table-info">
                <th>Length</th>
                <td>{{boxLength === 0 ? '' : boxLength}}</td>
              </tr>
              <tr class="table-info">
                <th>Width</th>
                <td>{{boxWidth === 0 ? '' : boxWidth}}</td>
              </tr>
              <tr class="table-info">
                <th>Square Length</th>
                <td>{{boxSquareLength === 0 ? '' : boxSquareLength}}</td>
              </tr>
              <tr class="table-danger">
                <th>Volume</th>
                <td>{{volume}}</td>
              </tr>
            </table>
          </div>

          <div class="app--volume-output">
            <table class="table">
              <tr>
                <th>Square length</th>
                <th>Volume</th>
              </tr>
              <tr v-for="(box, index) in boxVolumeArr" :key="index">
                <td>{{ box.squareLength }}</td>
                <td :class="{'text-danger': index==biggestVolumeIndex }">{{ box.volume }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-6" style="margin-bottom: 5rem;">
          <h5 class="text text-success pl-4">Paper Size is {{this.width}} by {{this.length}}</h5>
          <canvas id="app-canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accSub, accMul, drawPaper } from "./utils";
export default {
  props: ["width", "length"],
  data: function() {
    return {
      squareSize: null, // The number input in cutout square
      maxSquareSize: null, // The possible maximum number of square size
      isInvalidInput: false,
      errorMsg: "",
      paperWidth: null, // The width of paper
      paperLength: null, // The height of paper
      boxLength: 0,
      boxWidth: 0,
      boxSquareLength: 0,
      boxVolumeArr: [],
      biggestVolumeIndex: 0
    };
  },
  methods: {
    handleReset() {
      this.squareSize = null;
      // this.maxSquareSize = null;
      this.isInvalidInput = false;
      this.errorMsg = false;
      // this.paperWidth = null;
      // this.paperLength = null;
      this.boxLength = 0;
      this.boxWidth = 0;
      this.boxSquareLength = 0;
      this.boxVolumeArr = [];
      this.biggestVolumeIndex = 0;
    },
    handleCutout() {
      // console.log(this.squareSize);
      if (
        this.squareSize.toString().split(".")[1] &&
        this.squareSize.toString().split(".")[1].length > 1
      ) {
        this.isInvalidInput = true;
        this.errorMsg = "Please input a number with no more than 1 decimals";
        return;
      }
      // Check if the input is between 0 and maxSquareSize
      if (
        !(
          this.squareSize &&
          this.squareSize >= 0 &&
          this.squareSize <= this.maxSquareSize
        )
      ) {
        this.isInvalidInput = true;
        this.errorMsg = `Input a number between 0 and ${this.maxSquareSize}`;
        return;
      }
      // Check if the input is already tested
      const tested = this.boxVolumeArr.findIndex(el => {
        return el.squareLength == this.squareSize;
      });
      if (tested !== -1) {
        this.isInvalidInput = true;
        this.errorMsg = `${this.squareSize} is already tested`;
        return;
      }

      this.isInvalidInput = false;
      this.boxSquareLength = Number(this.squareSize);
      this.boxLength = accSub(this.paperLength, 2 * this.squareSize);
      this.boxWidth = accSub(this.paperWidth, 2 * this.squareSize);
      this.boxVolumeArr.push({
        squareLength: this.boxSquareLength,
        volume: this.volume,
        isBiggest: false
      });
      let biggestVolume = 0;
      for (let i = 0; i < this.boxVolumeArr.length; i++) {
        // Get the biggest volume
        if (this.boxVolumeArr[i].volume > biggestVolume) {
          biggestVolume = this.boxVolumeArr[i].volume;
          this.biggestVolumeIndex = i;
        }
      }
      this.drawCanvas();
      // console.log(this.boxVolumeArr);
    },
    drawCanvas() {
      const canvas = document.querySelector("#app-canvas");
      canvas.height = canvas.width * 1.2; // Canvas size: 300 * 360
      const unit = Math.min(
        Math.floor((canvas.width - 20) / this.paperWidth),
        Math.floor((canvas.height - 20) / this.paperLength)
      );
      drawPaper(
        canvas,
        this.paperWidth,
        this.paperLength,
        this.squareSize,
        unit
      );
    }
  },
  computed: {
    volume: function() {
      return accMul(
        accMul(this.boxLength, this.boxWidth),
        this.boxSquareLength
      );
    }
  },
  created() {
    this.maxSquareSize = Math.min(this.width, this.length) / 2;
    this.paperWidth = Math.min(this.width, this.length);
    this.paperLength = Math.max(this.width, this.length);
  },
  mounted() {
    this.drawCanvas();
  }
};
</script>

<style scoped>
#app-canvas {
  border: none;
}
.app--square-input {
  display: flex;
}
</style>
