<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Tall and squat cylinders</h3>
    <hr class="subheading-separator">
    <app-input-panel v-if="!paperSize" @setPaperSize="paperSize=$event"></app-input-panel>
    <div v-if="paperSize">
      <div class="row">
        <div class="col-md-4">
          <table class="table text-center">
            <thead>
              <tr>
                <th></th>
                <th>Tall</th>
                <th>Squat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Height (cm)</th>
                <td>{{ leftHeight }}</td>
                <td>{{ rightHeight }}</td>
              </tr>
              <tr>
                <th>Radius (cm)</th>
                <td>{{ leftRadius }}</td>
                <td>{{ rightRadius }}</td>
              </tr>
              <tr>
                <th>Volume (L)</th>
                <td>{{ currentLeftVol }}</td>
                <td>{{ currentRightVol }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <button
              v-if="status===0"
              class="btn btn-outline-success"
              @click="handleToggleTimer"
            >Fill cylinders</button>
            <button
              v-if="status===1"
              class="btn btn-outline-success"
              @click="handleToggleTimer"
            >{{ (leftTimer || rightTimer) ? 'Pause' : 'Resume'}}</button>
            <button
              v-if="status===2"
              class="btn btn-outline-dark"
              @click="handleReset"
            >Reset</button>
            <div class="alert alert-danger mt-2" v-if="status===2">Both cylinders are full.</div>
          </div>
        </div>
        <div class="col-md-8">
          <div
            :style="{visibility: showCylindars ? 'visible': 'hidden'}"
            class="app--canvas-container"
          >
            <canvas class="app--canvas" id="canvas1" width="400" height="400"></canvas>
            <canvas class="app--canvas" id="canvas2" width="400" height="400"></canvas>
          </div>
          <div v-if="!showCylindars">
            <p class="text-muted">
              Cylinders cannot be drawn as the size difference
              between cylinders is too great to scale on this screen
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputPanel from "./InputPanel.vue";
import { calculateRadius, calculateArea, calculateVolume } from "./utils";
export default {
  components: {
    appInputPanel: InputPanel
  },
  data: function() {
    return {
      paperSize: null,

      // Data for left/tall cylinder
      leftHeight: 0,
      leftCycle: 0,
      leftRadius: 0,
      leftArea: 0,
      leftVol: 0,

      // Data for right/squat cylinder
      rightHeight: 0,
      rightCycle: 0,
      rightRadius: 0,
      rightArea: 0,
      rightVol: 0,

      // Canvas context
      canvas1: null,
      canvas2: null,
      c: null,
      q: null,

      rate: 0,
      volIncrease: 0.01,
      leftDelayTime: 0,
      rightDelayTime: 0,
      leftIncrease: 0,
      rightIncrease: 0,
      timer: false,
      status: 0,
      // status = 0: not started
      // stauts = 1: start filling
      // status = 2: filling completed
      leftFinished: false,
      rightFinished: false,

      leftTimer: null,
      rightTimer: null,

      START_X: 100,
      START_Y: 350,
      STANDARD_DELAY_TIME: 100
    };
  },
  computed: {
    finished() {
      return this.leftFinished && this.rightFinished;
    },
    currentLeftVol() {
      let currentVol = Number(
        (((this.leftIncrease / this.rate) * this.leftArea) / 1000).toFixed(4)
      );
      let maxLeftVol = Number((this.leftVol / 1000).toFixed(4));
      return currentVol <= maxLeftVol ? currentVol : maxLeftVol;
    },
    currentRightVol() {
      let currentVol = Number(
        (((this.rightIncrease / this.rate) * this.rightArea) / 1000).toFixed(4)
      );
      let maxRightVol = Number((this.rightVol / 1000).toFixed(4));
      return currentVol <= maxRightVol ? currentVol : maxRightVol;
    },
    showCylindars() {
      if (this.paperSize.length >= this.paperSize.width) {
        return this.paperSize.length / this.paperSize.width <= 48;
      } else {
        return this.paperSize.width / this.paperSize.length <= 48;
      }
    }
  },
  watch: {
    paperSize(value) {
      if (value) {
        this.initData();
        this.caluclateRate();
        this.calculateDelayTime();
        setTimeout(() => {
          this.initCanvas();
          this.drawCylinder(
            this.c,
            this.START_X,
            this.START_Y,
            this.leftRadius * this.rate,
            (this.leftRadius / 2) * this.rate,
            this.leftHeight * this.rate
          );
          this.drawCylinder(
            this.q,
            this.START_X + 200,
            this.START_Y,
            this.rightRadius * this.rate,
            (this.rightRadius / 2) * this.rate,
            this.rightHeight * this.rate
          );
        }, 10);
      } else {
        this.resetData();
      }
    },

    leftIncrease(value) {
      if (value >= this.leftHeight * this.rate) {
        this.leftFinished = true;
        this.clearLeftTimer();
      }
    },

    rightIncrease(value) {
      if (value >= this.rightHeight * this.rate) {
        this.rightFinished = true;
        this.clearRightTimer();
      }
    },

    finished(value) {
      if (value) {
        this.status = 2;
      }
    }
  },
  methods: {
    /** Calculate cylinder's radius, volume */
    initData() {
      if (this.paperSize.length >= this.paperSize.width) {
        this.leftHeight = this.paperSize.length;
        this.rightHeight = this.paperSize.width;

        this.leftCycle = this.paperSize.width;
        this.rightCycle = this.paperSize.length;
      } else {
        this.leftHeight = this.paperSize.width;
        this.rightHeight = this.paperSize.length;

        this.leftCycle = this.paperSize.length;
        this.rightCycle = this.paperSize.width;
      }
      this.leftRadius = calculateRadius(this.leftCycle);
      this.leftArea = calculateArea(this.leftRadius);
      this.leftVol = calculateVolume(this.leftArea, this.leftHeight);

      this.rightRadius = calculateRadius(this.rightCycle);
      this.rightArea = calculateArea(this.rightRadius);
      this.rightVol = calculateVolume(this.rightArea, this.rightHeight);
      this.leftFinished = false;
      this.rightFinished = false;
    },

    resetData() {
      this.leftHeight = 0;
      this.leftCycle = 0;
      this.leftRadius = 0;
      this.leftArea = 0;
      this.leftVol = 0;
      this.rightHeight = 0;
      this.rightCycle = 0;
      this.rightRadius = 0;
      this.rightArea = 0;
      this.rightVol = 0;
      this.canvas1 = null;
      this.canvas2 = null;
      this.c = null;
      this.q = null;
      this.rate = 0;
      this.volIncrease = 0.01;
      this.leftDelayTime = 0;
      this.rightDelayTime = 0;
      this.leftIncrease = 0;
      this.rightIncrease = 0;
      this.status = 0;
      this.leftFinished = false;
      this.rightFinished = false;
      this.clearLeftTimer();
      this.clearRightTimer();
    },

    /** Initialize canvas object */
    initCanvas() {
      this.canvas1 = document.getElementById("canvas1");
      this.canvas2 = document.getElementById("canvas2");
      this.c = this.canvas1.getContext("2d");
      this.q = this.canvas2.getContext("2d");
    },

    /** Draw cylinder */
    drawCylinder(context, x, y, a, b, h) {
      context.save();
      var r = a > b ? a : b;
      var ratioX = a / r;
      var ratioY = b / r;
      context.scale(ratioX, ratioY);
      context.beginPath();
      context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
      context.closePath();
      context.stroke();
      context.beginPath();
      context.arc(x / ratioX, (y - h) / ratioY, r, 0, 2 * Math.PI, false);
      context.closePath();
      context.stroke();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(x - r, y);
      context.lineTo(x - r, y - h);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.moveTo(x + r, y);
      context.lineTo(x + r, y - h);
      context.closePath();
      context.stroke();
    },

    /** Fill water to the cylinder */
    fillWater(context, x, y, a, b, h, increase) {
      context.save();
      var r = a > b ? a : b;
      var ratioX = a / r;
      var ratioY = b / r;
      context.scale(ratioX, ratioY);
      context.beginPath();
      context.arc(
        x / ratioX,
        (y - increase) / ratioY,
        r,
        0,
        2 * Math.PI,
        false
      );
      context.closePath();
      context.fillStyle = "rgba(0, 255, 255, 1)";
      context.fill();
      context.stroke();
      if (y - increase <= y - h + r) {
        context.beginPath();
        context.arc(x / ratioX, (y - h) / ratioY, r, 0, 2 * Math.PI, false);
        context.closePath();
        context.stroke();
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
    },

    autoFillLeftWater() {
      this.fillWater(
        this.c,
        this.START_X,
        this.START_Y,
        this.leftRadius * this.rate,
        (this.leftRadius / 2) * this.rate,
        this.leftHeight * this.rate,
        this.leftIncrease
      );
      this.leftIncrease += 1;
    },
    autoFillRightWater() {
      this.fillWater(
        this.q,
        this.START_X + 200,
        this.START_Y,
        this.rightRadius * this.rate,
        (this.rightRadius / 2) * this.rate,
        this.rightHeight * this.rate,
        this.rightIncrease
      );
      this.rightIncrease += 1;
    },

    caluclateRate() {
      let leftRateHeight = 300 / this.paperSize.length;
      let rightRateHeight = 300 / this.paperSize.width;
      this.rate =
        leftRateHeight > rightRateHeight ? rightRateHeight : leftRateHeight;

      //determine the speed of increase
      if (this.leftVol >= this.rightVol) {
        this.volIncrease = this.leftVol / 60;
      } else {
        this.volIncrease = this.rightVol / 60;
      }
    },

    calculateDelayTime() {
      this.leftDelayTime =
        (this.leftArea * this.STANDARD_DELAY_TIME) /
        (this.volIncrease * this.rate);
      this.rightDelayTime =
        (this.rightArea * this.STANDARD_DELAY_TIME) /
        (this.volIncrease * this.rate);
    },

    handleStart() {
      this.status = 1;
      this.leftTimer = setInterval(this.autoFillLeftWater, this.leftDelayTime);
      this.rightTimer = setInterval(
        this.autoFillRightWater,
        this.rightDelayTime
      );
    },
    handleToggleTimer() {
      if (this.status === 0) {
        this.status = 1;
      }
      if (this.leftTimer) {
        this.clearLeftTimer();
      } else {
        if (!this.leftFinished) {
          this.leftTimer = setInterval(
            this.autoFillLeftWater,
            this.leftDelayTime
          );
        }
      }
      if (this.rightTimer) {
        this.clearRightTimer();
        this.clearRightCalTimer();
      } else {
        if (!this.rightFinished) {
          this.rightTimer = setInterval(
            this.autoFillRightWater,
            this.rightDelayTime
          );
        }
      }
    },
    handleReset() {
      this.paperSize = null;
    },

    clearLeftTimer() {
      if (this.leftTimer) {
        clearInterval(this.leftTimer);
        this.leftTimer = null;
      }
    },
    clearRightTimer() {
      if (this.rightTimer) {
        clearInterval(this.rightTimer);
        this.rightTimer = null;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.app--canvas-container {
  position: relative;
}
.app--canvas {
  position: absolute;
  width: 100%;
  height: auto;
  margin-bottom: 5rem;
}
</style>
