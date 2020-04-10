<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-8">
        <div class="row" v-if="gameStatus === 0">
          <!-- Input form -->
          <div class="col-md-3 col-sm-2"></div>
          <div class="col-md-6 col-sm-8">
            <label>Enter the length:</label>
            <input
              type="text"
              class="form-control mb-2"
              v-model.number="inputLength"
              @keypress="handleCheckInput"
            />
            <label>Enter the width:</label>
            <input
              type="text"
              class="form-control"
              v-model.number="inputWidth"
              @keypress="handleCheckInput"
            />
            <div class="text-center mt-3">
              <button class="btn btn-outline-success" @click="handleOK">
                OK
              </button>
              <div class="alert alert-danger mt-3" v-if="message">
                {{ message }}
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-2"></div>
        </div>
        <div :style="{ visibility: gameStatus >= 1 ? 'visible' : 'hidden' }">
          <div style="position: relative">
            <canvas
              id="boardCanvas"
              class="app--canvas"
              width="600px"
              height="550px"
            ></canvas>
          </div>
          <div class="text-center" v-if="gameStatus === 1">
            <button
              class="btn btn-outline-success"
              @click="handleBounce"
              v-if="demoAutoOption === '0'"
            >
              Show {{ bounces > 0 ? "next" : "first" }} pool shot
            </button>
            <button
              class="btn btn-outline-success"
              @click="handleToggleTimer"
              v-if="demoAutoOption === '1'"
            >
              {{
                bounces === 0
                  ? "Start"
                  : timer
                  ? "Pause"
                  : "Resume"
              }}
            </button>
            <app-demo-auto-option
              @changeOption="demoAutoOption = $event"
              :option="demoAutoOption"
              class="mt-2"
            ></app-demo-auto-option>
          </div>
          <div class="text-center" v-if="gameStatus === 2">
            <div class="alert alert-danger mt-3" v-if="message">
              {{ message }}
            </div>
            <button class="btn btn-outline-dark" @click="handleReset">
              Reset
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center">Table Size</th>
              <th class="text-center">Bounces</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in resultData"
              :key="index"
              class="text-primary"
            >
              <td class="text-center">{{ data.size }}</td>
              <td
                class="text-center"
                :class="{ 'text-danger': index === resultData.length - 1 }"
              >
                {{ data.bounces }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "../../common/DemoAutoOption.vue";
export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      gameStatus: 0,
      // 0 - ready for start
      // 1 - started
      // 2 - finished
      inputLength: null,
      inputWidth: null,
      length: null,
      width: null,
      message: "",
      resultData: [],
      canvas: null,
      bounces: 0,
      demoAutoOption: "0",
      timer: null,
      START_X: 40,
      START_Y: 40,
      unit: 0,
      rwidth: 0,
      rlength: 0,
      gwidth: 0,
      glength: 0,
      direction: null,
      DIRECTION: {
        UP_LEFT: 0,
        DOWN_LEFT: 1,
        UP_RIGHT: 2,
        DOWN_RIGHT: 3
      }
    };
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }
  },
  methods: {
    handleCheckInput(e) {
      let { charCode } = e;
      if (!((charCode >= 48 && charCode <= 57) || charCode === 46)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 3) {
        e.preventDefault();
      }
    },

    handleOK() {
      let errorMessage = "Enter a number (1 to 100) or (0.1 to 10)";
      if (!this.checkInput()) {
        this.message = errorMessage;
        return;
      }
      this.message = "";
      this.gameStatus = 1;
      if (this.inputLength > this.inputWidth) {
        let temp = this.inputLength;
        this.inputLength = this.inputWidth;
        this.inputWidth = temp;
      }
      let result = {
        size: `${this.inputLength} by ${this.inputWidth}`,
        bounces: 0
      };
      this.resultData.push(result);

      if (this.inputLength < 1 || this.inputWidth < 1) {
        this.length = this.inputLength * 10;
        this.width = this.inputWidth * 10;
      } else {
        this.length = this.inputLength;
        this.width = this.inputWidth;
      }
      this.rwidth = this.width;
      this.rlength = this.length;
      this.gwidth = this.width;
      this.glength = this.length;

      this.drawBillardTable();
    },

    drawBillardTable() {
      let poolWidth, poolHeight;
      // const START_X = 40;
      // const START_Y = 40;
      const MAX_SIZE = 450;
      if (this.length < this.width) {
        poolWidth = MAX_SIZE;
        poolHeight = (this.length * MAX_SIZE) / this.width;
        this.unit = MAX_SIZE / this.width;
      } else {
        poolHeight = MAX_SIZE;
        poolWidth = (this.width * MAX_SIZE) / this.length;
        this.unit = MAX_SIZE / this.length;
      }
      const canvas = document.getElementById("boardCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 4 holes
      this.drawPoolHole(ctx, this.START_X, this.START_Y);
      this.drawPoolHole(ctx, this.START_X, poolHeight + this.START_Y);
      this.drawPoolHole(ctx, poolWidth + this.START_X, this.START_Y);
      this.drawPoolHole(
        ctx,
        poolWidth + this.START_X,
        poolHeight + this.START_Y
      );

      // Draw billard table
      ctx.fillStyle = "#16a085";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#2c3e50";
      ctx.fillRect(this.START_X, this.START_Y, poolWidth, poolHeight);
      ctx.strokeRect(this.START_X, this.START_Y, poolWidth, poolHeight);

      // Draw unit lines
      for (let i = 1; i < this.width; i++) {
        this.drawUnitLine(
          ctx,
          this.unit * i + this.START_X,
          this.START_Y - 4,
          this.unit * i + this.START_X,
          this.START_Y + 4
        );
        this.drawUnitLine(
          ctx,
          this.unit * i + this.START_X,
          this.START_Y + poolHeight - 4,
          this.unit * i + this.START_X,
          this.START_Y + poolHeight + 4
        );
      }
      for (let i = 1; i < this.length; i++) {
        this.drawUnitLine(
          ctx,
          this.START_X - 4,
          this.unit * i + this.START_Y,
          this.START_X + 4,
          this.unit * i + this.START_Y
        );
        this.drawUnitLine(
          ctx,
          this.START_X + poolWidth - 4,
          this.unit * i + this.START_Y,
          this.START_X + poolWidth + 4,
          this.unit * i + this.START_Y
        );
      }

      // Draw text
      ctx.font = "22px Arial bold";
      ctx.fillStyle = "#2c3e50";
      ctx.textAlign = "right";
      ctx.fillText(
        this.inputLength,
        this.START_X - 5,
        poolHeight / 2 + this.START_Y + 10
      );
      ctx.fillText(
        this.inputWidth,
        poolWidth / 2 + this.START_X + 10,
        this.START_Y - 5
      );
    },

    drawUnitLine(ctx, x0, y0, x1, y1) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = "#c0392b";
      ctx.stroke();
    },

    drawPoolHole(ctx, x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
      ctx.fillStyle = "#2c3e50";
      ctx.fill();
    },
    checkInput() {
      if (
        this.inputWidth > 100 ||
        this.inputWidth <= 0 ||
        this.inputLength <= 0 ||
        this.inputLength > 100
      ) {
        return false;
      } else if (
        this.inputLength / this.inputWidth > 100 ||
        this.inputWidth / this.inputLength > 100
      ) {
        return false;
      } else {
        return true;
      }
    },

    drawBounceLine(x0, y0, x1, y1) {
      const canvas = document.getElementById("boardCanvas");
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(this.START_X + x0 * this.unit, this.START_Y + y0 * this.unit);
      ctx.lineTo(this.START_X + x1 * this.unit, this.START_Y + y1 * this.unit);
      ctx.strokeStyle = "#f39c12";
      ctx.stroke();
    },

    handleBounce() {
      let x0,
        y0,
        x1,
        y1 = 0;
      // let rw = parseFloat(this.width.toFixed(6));
      // let rh = parseFloat(this.length.toFixed(6));
      // let gwidth = this.width;
      // let glength = this.length;
      this.rwidth = parseFloat(this.rwidth.toFixed(6));
      this.rlength = parseFloat(this.rlength.toFixed(6));
      // let direction = this.DIRECTION.UP_RIGHT;

      switch (this.direction) {
        case this.DIRECTION.UP_LEFT: {
          if (this.rwidth >= this.rlength) {
            x0 = this.rwidth;
            y0 = this.rlength;

            this.rwidth -= this.rlength;
            this.direction = this.DIRECTION.DOWN_LEFT;
            this.rlength = this.glength;

            x1 = this.rwidth;
            y1 = 0;
          } else {
            x0 = this.rwidth;
            y0 = this.rlength;

            this.rlength -= this.rwidth;
            this.rwidth = this.gwidth;
            this.direction = this.DIRECTION.UP_RIGHT;

            x1 = 0;
            y1 = this.rlength;
          }
          break;
        }
        case this.DIRECTION.UP_RIGHT: {
          if (this.rwidth >= this.rlength) {
            x0 = this.gwidth - this.rwidth;
            y0 = this.rlength;

            this.rwidth -= this.rlength;
            this.direction = this.DIRECTION.DOWN_RIGHT;
            this.rlength = this.glength;

            x1 = this.gwidth - this.rwidth;
            y1 = 0;
          } else {
            x0 = this.gwidth - this.rwidth;
            y0 = this.rlength;

            this.rlength -= this.rwidth;
            this.rwidth = this.gwidth;
            this.direction = this.DIRECTION.UP_LEFT;

            x1 = this.rwidth;
            y1 = this.rlength;
          }
          break;
        }
        case this.DIRECTION.DOWN_LEFT: {
          if (this.rwidth >= this.rlength) {
            x0 = this.rwidth;
            y0 = this.glength - this.rlength;

            this.rwidth -= this.rlength;
            this.direction = this.DIRECTION.UP_LEFT;
            this.rlength = this.glength;

            x1 = this.rwidth;
            y1 = this.rlength;
          } else {
            x0 = this.rwidth;
            y0 = 0;

            this.rlength -= this.rwidth;
            this.rwidth = this.gwidth;
            this.direction = this.DIRECTION.DOWN_RIGHT;

            x1 = 0;
            y1 = this.glength - this.rlength;
          }
          break;
        }
        case this.DIRECTION.DOWN_RIGHT: {
          if (this.rwidth >= this.rlength) {
            x0 = this.gwidth - this.rwidth;
            y0 = this.glength - this.rlength;

            this.rwidth -= this.rlength;
            this.direction = this.DIRECTION.UP_RIGHT;
            this.rlength = this.glength;

            x1 = this.gwidth - this.rwidth;
            y1 = this.rlength;
          } else {
            x0 = this.gwidth - this.rwidth;
            y0 = 0;

            this.rlength -= this.rwidth;
            this.rwidth = this.gwidth;
            this.direction = this.DIRECTION.DOWN_LEFT;

            x1 = this.rwidth;
            y1 = this.glength - this.rlength;
          }
          break;
        }
      }

      if (this.rwidth === 0) {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.message = "Finished";
        this.gameStatus = 2;
      } else {
        this.bounces += 1;
        this.resultData[this.resultData.length - 1].bounces = this.bounces;
      }

      this.drawBounceLine(x0, y0, x1, y1);

      // if (this.rwidth != 0) {
      //
      //   this.bounces++;
      //   this.resultData[this.resultData.length - 1].bounces = this.bounces;
      // } else {

      // }
    },

    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleBounce, 100);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    handleReset() {
      this.inputLength = null;
      this.inputWidth = null;
      (this.message = "Enter a number (1 to 100) or (0.1 to 10)"),
        (this.canvas = null);
      this.bounces = 0;
      this.demoAutoOption = "0";
      this.unit = 0;
      this.rwidth = 0;
      this.rlength = 0;
      this.gwidth = 0;
      this.glength = 0;
      this.direction = this.DIRECTION.UP_RIGHT;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      const canvas = document.getElementById("boardCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      ctx.style = "border: solid 0px";
      this.gameStatus = 0;
    }
  },
  created() {
    this.direction = this.DIRECTION.UP_RIGHT;
    this.message = "Enter a number (1 to 100) or (0.1 to 10)";
  },
  mounted() {},
  unmounted() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
.app--canvas {
  width: 100%;
  height: auto;
}
</style>
