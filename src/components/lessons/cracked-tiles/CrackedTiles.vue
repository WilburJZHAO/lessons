<template>
  <div class="container mt-3">
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="form-group row">
          <label class="col-sm-3 col-md-3 col-form-label">Rows</label>
          <div class="col-sm-9 col-md-9">
            <input
              type="text"
              class="form-control"
              @focus="message = '1-24 for both rows and columns'"
              @keypress="handleCheckInput"
              v-model.number="row"
              ref="rowInput"
              :disabled="gameStatus > 0"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-md-3 col-form-label">Columns</label>
          <div class="col-sm-9 col-md-9">
            <input
              type="text"
              class="form-control"
              @focus="message = '1-24 for both rows and columns'"
              @keypress="handleCheckInput"
              v-model.number="col"
              ref="colInput"
              :disabled="gameStatus > 0"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-md-3 col-form-label">Estimate</label>
          <div class="col-sm-9 col-md-9">
            <input
              type="text"
              class="form-control"
              @focus="message = 'Enter your estimate'"
              @keypress="handleCheckInput"
              v-model.number="estimate"
              ref="estimateInput"
              :disabled="gameStatus > 0"
            />
          </div>
        </div>
        <div class="form-group row" v-if="gameStatus > 0 && tileNumber !== null">
          <label class="col-sm-3 col-md-3 col-form-label">Tile Count</label>
          <div class="col-sm-9 col-md-9">
            <input type="number" class="form-control" disabled v-model.number="tileNumber" />
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-outline-success" @click="handleOK" v-if="gameStatus === 0">OK</button>
          <div v-if="gameStatus === 1">
            <button
              class="btn btn-outline-success"
              @click="handleDrawDiagonal"
              v-if="demoAutoOption==='0'"
            >Draw diagonal</button>
            <button
              class="btn btn-outline-success"
              @click="handleToggleTimer"
              v-if="demoAutoOption==='1'"
            >{{ tileNumber === 0 ? 'Start' : timer ? 'Pause' : 'Resume' }}</button>
            <app-demo-auto-option
              @changeOption="demoAutoOption = $event"
              :option="demoAutoOption"
              class="mt-2"
            ></app-demo-auto-option>
          </div>
          <button
            class="btn btn-outline-success"
            @click="handleCalculateAnswer"
            v-if="gameStatus === 2"
          >Calculate answer</button>
          <button
            class="btn btn-outline-dark"
            @click="handleReset"
            v-if="gameStatus === 3 || gameStatus === 4"
          >Reset</button>
        </div>
        <div
          class="text-center alert alert-danger mt-3"
          :style="{ visibility: message ? 'visible' : 'hidden' }"
        >{{ message }}</div>

        <div class="mt-4">
          <table class="table">
            <thead>
              <tr>
                <th>Row</th>
                <th>Col</th>
                <th>Est</th>
                <th>Ans</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in resultsData" :key="index" class="text-primary">
                <td>{{ data.row }}</td>
                <td>{{ data.col }}</td>
                <td>{{ data.est }}</td>
                <td>{{ data.ans }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-8" style="height: 750px;">
        <div
          style="positioin: relative"
          :style="{visibility: gameStatus === 0 || gameStatus === 1 || gameStatus === 3 ? 'visible' :'hidden' }"
        >
          <canvas class="app--canvas" id="canvas1" width="900" height="900"></canvas>
          <canvas class="app--canvas" id="canvas2" width="900" height="900"></canvas>
          <canvas class="app--canvas" id="canvas3" width="900" height="900"></canvas>
        </div>
        <div
          v-if="gameStatus === 2 || gameStatus === 4"
          class="d-flex justify-content-center align-items-center"
        >
          <h5 class="text-canger">
            Too many tiles to draw
            <br />
            (When rows or columns exceed {{ MAX_NUMBER }})
          </h5>
        </div>
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
      // 0 - ready for start, user input
      // 1 - started, draw diagnoal lines
      // 2 - started, do not draw diagonal lines, directly calculate results
      // 3 - draw diagnoal lines - finished
      // 4 - calculate results - finished
      message: "",
      row: null,
      col: null,
      estimate: null,
      tileNumber: 0,
      rightAnswer: null,
      demoAutoOption: "0",
      displayCanvas: false,
      lengthOfSquare: 0,
      canvas1: null,
      canvas2: null,
      canvas3: null,
      c: null, // canvas context object for canvas1
      q: null, // canvas context object for canvas2
      p: null, // canvas context object for canvas3
      resultsData: [],
      container: [],
      timer: null,
      CANVAS_HEIGHT: 890,
      CANVAS_WIDTH: 890,
      GRID_LINE_WIDTH: 0.5,
      MAX_NUMBER: 24
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
    /** Calculate right answer */
    calculateAnswer() {
      let answer = this.row + this.col - this.calculateGcd(this.row, this.col);
      return answer;
    },

    /** Calculate greatest common divider */
    calculateGcd(x, y) {
      x = Math.abs(x);
      y = Math.abs(y);
      while (y) {
        let t = y;
        y = x % y;
        x = t;
      }
      return x;
    },

    /** Initialize canvas object when component is mounted */
    initCanvas() {
      this.canvas1 = document.getElementById("canvas1");
      this.canvas2 = document.getElementById("canvas2");
      this.canvas3 = document.getElementById("canvas3");
      this.c = this.canvas1.getContext("2d");
      this.q = this.canvas1.getContext("2d");
      this.p = this.canvas1.getContext("2d");
    },

    /** Only allow number input */
    handleCheckInput(e) {
      let { charCode } = e;
      if (!((charCode >= 48 && charCode <= 57) || charCode === 44)) {
        e.preventDefault();
      }
      if (e.target.value.length > 3) {
        e.preventDefault();
      }
    },

    /** Operations when user clicks OK button */
    handleOK() {
      if (!this.row || this.row > 1000 || this.row < 1) {
        this.message = "Enter the number of rows(1-1000)";
        this.$refs.rowInput.select();
        return;
      }
      if (!this.col || this.col > 1000 || this.row < 1) {
        this.message = "Enter the number of columns(1-1000)";
        this.$refs.colInput.select();
        return;
      }
      this.message = "";
      if (this.row <= this.MAX_NUMBER && this.col <= this.MAX_NUMBER) {
        this.gameStatus = 1;
        this.tileNumber = 0;
        this.rightAnswer = this.calculateAnswer();
        this.lengthOfSquare = this.calculateSquareLength();
        this.drawGrid();
        this.calculateAllCoordinates();
        this.removeDuplicated();
        this.container.sort((obj1, obj2) => {
          return obj1.x - obj2.x;
        });
        // for (let i = 0; i < this.container.length; i++) {
        //   console.log(
        //     "x: " +
        //       this.container[i].x +
        //       "y: " +
        //       this.container[i].y +
        //       "length: " +
        //       this.container.length
        //   );
        // }
      } else {
        this.gameStatus = 2;
      }

      const data = {
        row: this.row,
        col: this.col,
        est: this.estimate,
        ans: null
      };
      this.resultsData.push(data);
    },

    removeDuplicated() {
      let l = this.container.length;
      let unique = true;
      let tempContainer = [];
      for (let i = 0; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
          if (
            this.container[i].x == this.container[j].x ||
            this.container[i].y == this.container[j].y
          ) {
            unique = false;
          }
        }
        if (unique) {
          tempContainer.push(this.container[i]);
        }
        unique = true;
      }
      this.container = tempContainer;
    },

    calculateAllCoordinates() {
      for (let i = 1; i <= this.row; i++) {
        let coordinate = {
          x: (i * this.col) / this.row,
          y: i
        };
        this.container.push(coordinate);
      }

      for (let j = 1; j <= this.col; j++) {
        let coordinate = {
          x: j,
          y: (j * this.row) / this.col
        };
        this.container.push(coordinate);
      }
    },

    calculateSquareLength() {
      if (this.row >= this.col) {
        return Math.floor(this.CANVAS_HEIGHT / this.row);
      } else {
        return Math.floor(this.CANVAS_HEIGHT / this.col);
      }
    },

    drawGrid() {
      this.c.strokeStyle = this.GRID_LINE_WIDTH;
      let counterC = 1;
      let counterR = 1;
      let rowMax = this.lengthOfSquare * this.row;
      for (
        let i = 0.5;
        i < this.CANVAS_HEIGHT + 2;
        i = i + this.lengthOfSquare
      ) {
        this.c.beginPath();
        this.c.moveTo(i, 0);
        this.c.lineTo(i, rowMax);
        this.c.closePath();
        this.c.stroke();
        if (counterC > this.col) {
          break;
        }
        counterC++;
      }

      let columnMax = this.lengthOfSquare * this.col;
      for (
        let j = 0.5;
        j < this.CANVAS_HEIGHT + 2;
        j = j + this.lengthOfSquare
      ) {
        this.c.beginPath();
        this.c.moveTo(0, j);
        this.c.lineTo(columnMax, j);
        this.c.closePath();
        this.c.stroke();
        if (counterR > this.row) {
          break;
        }
        counterR++;
      }
    },

    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleDrawDiagonal, 200);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    handleDrawDiagonal() {
      this.drawDiagonalLine();
      this.tileNumber++;
      if (this.tileNumber >= this.rightAnswer) {
        this.resultsData[this.resultsData.length - 1].ans = this.rightAnswer;
        this.gameStatus = 3;
        this.message = "Finished";
        clearInterval(this.timer);
        this.timer = null;
        return;
      }
    },

    drawDiagonalLine() {
      let endX = this.container[this.tileNumber].x * this.lengthOfSquare;
      let endY = this.container[this.tileNumber].y * this.lengthOfSquare;
      let canvas2X = 0;
      let canvas2Y = 0;
      this.q.beginPath();
      this.q.moveTo(canvas2X, canvas2Y);
      this.q.lineTo(endX, endY);
      this.q.strokeStyle = "red";
      this.q.closePath();
      this.q.stroke();

      // fill tile's background color
      let rectX = 0;
      let rectY = 0;
      if (this.tileNumber === 0) {
        rectX = 0;
        rectY = 0;
      } else {
        rectX =
          Math.floor(this.container[this.tileNumber - 1].x) *
          this.lengthOfSquare;
        rectY =
          Math.floor(this.container[this.tileNumber - 1].y) *
          this.lengthOfSquare;
      }
      this.p.fillStyle = "pink";
      this.p.globalAlpha = 0.4;
      this.p.fillRect(rectX, rectY, this.lengthOfSquare, this.lengthOfSquare);
      canvas2X = endX;
      canvas2Y = endY;
    },

    handleCalculateAnswer() {
      this.resultsData[
        this.resultsData.length - 1
      ].ans = this.calculateAnswer();
      this.resultsData = [...this.resultsData];
      this.gameStatus = 4;
      this.message = "Finished";
    },

    handleReset() {
      this.gameStatus = 0;
      this.message = 0;
      this.row = null;
      this.col = null;
      this.estimate = null;
      this.tileNumber = null;
      this.rightAnswer = null;
      this.demoAutoOption = "0";
      this.container = [];
      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
      this.q.clearRect(0, 0, this.q.canvas.width, this.q.canvas.height);
      this.p.clearRect(0, 0, this.p.canvas.width, this.p.canvas.height);
    }
  },
  created() {},
  mounted() {
    this.initCanvas();
  },
  unmounted() {
    clearInterval(this.timer);
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
