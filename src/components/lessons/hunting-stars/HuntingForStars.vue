<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-4">
        <h5>How many people</h5>
        <input
          type="number"
          class="form-control"
          v-model.number="peopleNumber"
          min="1"
          max="100"
          step="1"
          @focus="handleFocusPeopleNumber"
          :disabled="gameStatus !==0"
        />
        <h5 class="mt-3">
          Pass to every
          <input
            type="number"
            class="form-control"
            v-model.number="personNumber"
            min="1"
            :max="maxInputNumber"
            step="1"
            @focus="handleFocusPersonNumber"
            :disabled="gameStatus !==0"
          />
          person
        </h5>
        <div class="mt-3 text-center" v-if="gameStatus <= 1">
          <div
            class="alert alert-danger"
          >Enter a number between {{ minInputNumber }} - {{ maxInputNumber }}</div>
          <div class="d-flex justify-content-around">
            <button
              class="btn btn-outline-success"
              @click="handleInputNumber"
              :disabled="
              !(peopleNumber >=2 && peopleNumber <= 100 && personNumber>=1 && personNumber<=peopleNumber-1)
            "
            >OK</button>
          </div>
        </div>
        <div class="mt-3 text-center" v-if="gameStatus ===2">
          <button
            class="btn btn-outline-success mb-2"
            @click="handleDrawLine"
            v-if="demoAutoOption==='0'"
          >Draw a line</button>
          <button
            class="btn btn-outline-success mb-2"
            v-if="demoAutoOption==='1'"
            @click="handleToggleTimer"
          >Start auto</button>
          <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
        </div>
        <div class="mt-3 text-center" v-if="gameStatus === 3">
          <button class="btn btn-outline-dark" @click="handleRestart">Reset</button>
        </div>
        <div class="text-center mt-3">
          <button
            class="btn btn-outline-dark"
            @click="showCircle = !showCircle"
          >{{ showCircle ? 'Hide circle' : 'Show circle'}}</button>
        </div>
      </div>
      <div class="col-lg-8 mt-4">
        <div v-if="gameStatus>=2" class="d-flex justify-content-around">
          <h5 class="text-danger">{{ peopleNumber}} , {{ personNumber }}</h5>
          <h5>{{ lines===0 ? ' ' : (lines === 1 ? 'The first line' : `${lines} lines`) }}</h5>
        </div>
        <div style="position: relative;">
          <canvas
            id="canvas1"
            class="app--canvas"
            :style="{visibility: showCircle ? 'visible' : 'hidden'}"
            width="900"
            height="800"
          ></canvas>
          <canvas id="canvas2" class="app--canvas" width="900" height="800"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "../../common/DemoAutoOption.vue";
// import { fabric } from "fabric";
export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      gameStatus: 0,
      // 0 - ready for inputting how many people
      // 1 - ready for inputting how many person
      // 2 - drawing line
      // 3 - finish
      peopleNumber: null,
      personNumber: null,
      minInputNumber: 2,
      maxInputNumber: 100,
      demoAutoOption: "0",
      timer: null,
      showCircle: false,

      canvas1: null, // canvas for circle
      canvas2: null, // canvas for line
      c: null, // context object for circle
      q: null, // context object for line

      centerX: 450,
      centerY: 330, // Center of circle
      radius: 320, // radius of circle
      x1: 450, // the starting point x coordinate of the line
      y1: 650, // the starting point y coordinate of the line
      lines: 0,
      degrees: 0,
      counter: 1
    };
  },
  computed: {},
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
    handleInputNumber() {
      // if (this.gameStatus === 0) {
      //   this.gameStatus = 1;
      //   this.minInputNumber = 1;
      //   this.maxInputNumber = this.peopleNumber - 1;
      // } else if (this.gameStatus === 1) {
      //   this.gameStatus = 2;
      //   this.degrees = 360 / this.peopleNumber;
      //   this.showCircle = true;
      // }
      if (this.peopleNumber >= 2 && this.peopleNumber)
        this.degrees = 360 / this.peopleNumber;
      this.showCircle = true;
      this.gameStatus = 2;
      this.drawPeople();
    },
    initCanvas() {
      this.canvas1 = document.getElementById("canvas1");
      this.canvas2 = document.getElementById("canvas2");
      this.c = this.canvas1.getContext("2d");
      this.q = this.canvas2.getContext("2d");
    },
    drawCircle() {
      this.c.beginPath();
      this.c.arc(
        this.centerX,
        this.centerY,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      this.c.strokeStyle = "red";
      this.c.lineWidth = 3;
      this.c.closePath();
      this.c.stroke();
    },
    drawPeople() {
      this.c.fillStyle = "rgba(255, 0, 100, 0.8)";
      if (this.peopleNumber) {
        let personRadius = 3 + 0.03 * (100 - this.peopleNumber); // smaller dots the more there are
        let circleFraction = (Math.PI * 2) / this.peopleNumber;
        for (let i = 0; i < this.peopleNumber; i++) {
          let x = this.centerX + this.radius * Math.sin(i * circleFraction);
          let y = this.centerY + this.radius * Math.cos(i * circleFraction);
          this.c.beginPath();
          this.c.arc(x, y, personRadius, 0, 2 * Math.PI);
          this.c.fill();
        }
      }
    },
    drawLine(angle) {
      let radians = (angle / 180) * Math.PI;
      let endX = this.centerX + this.radius * Math.cos(radians);
      let endY = this.centerY - this.radius * Math.sin(radians);
      endX = Math.round(endX);
      endY = Math.round(endY);
      this.q.beginPath();
      this.q.moveTo(this.x1, this.y1);
      this.q.lineTo(endX, endY);
      this.q.closePath();
      this.q.stroke();
      this.x1 = endX;
      this.y1 = endY;
    },

    handleDrawLine() {
      this.drawLine(this.degrees * this.counter * this.personNumber - 90);
      this.counter++;
      this.lines++;
      if (this.x1 === this.centerX && this.y1 === this.centerY + this.radius) {
        this.gameStatus = 3;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
      // this.drawLine();
      // this.counter++;
    },

    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleDrawLine, 300);
      }
    },

    handleRestart() {
      this.gameStatus = 0;
      this.peopleNumber = null;
      this.personNumber = null;
      this.minInputNumber = 2;
      this.maxInputNumber = 100;
      this.demoAutoOption = "0";
      this.showCircle = false;
      this.x1 = 450;
      this.y1 = 650;
      this.lines = 0;
      this.degrees = 0;
      this.counter = 1;
      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
      this.drawCircle();
      this.q.clearRect(0, 0, this.q.canvas.width, this.q.canvas.height);
    },

    handleFocusPeopleNumber() {
      this.minInputNumber = 2;
      this.maxInputNumber = 100;
    },
    handleFocusPersonNumber(e) {
      if (!(this.peopleNumber >= 2 && this.peopleNumber <= 100)) {
        this.peopleNumber = "";
        e.target.blur();
      } else {
        this.minInputNumber = 1;
        this.maxInputNumber = this.peopleNumber - 1;
      }
    }
  },
  mounted() {
    this.initCanvas();
    this.drawCircle();
  },
  dismounted() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>
<style scoped>
.app--canvas {
  position: absolute;
  width: 100%;
  height: auto;
}
</style>
