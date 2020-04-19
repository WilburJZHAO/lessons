<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Find the value of the tile</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-sm-6 text-center mb-4">
        <h5>Select Shape</h5>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="shape"
            id="shape-square"
            :value="0"
            v-model="shape"
            :disabled="shapeSelected"
          />
          <label for="shape-square" class="form-check-label">Square</label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="shape"
            id="shape-triangle"
            :value="1"
            v-model="shape"
            :disabled="shapeSelected"
          />
          <label for="shape-triangle" class="form-check-label">Triangle</label>
        </div>
        <br />
        <br />
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="numberType"
            id="type-whole-number"
            :value="1"
            v-model="numberType"
            :disabled="shapeSelected"
          />
          <label for="type-whole-number" class="form-check-label">Whole number</label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="numberType"
            id="type-decimals"
            :value="2"
            v-model="numberType"
            :disabled="shapeSelected"
          />
          <label for="type-decimals" class="form-check-label">Decimals</label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="numberType"
            id="type-fractions"
            :value="3"
            v-model="numberType"
            :disabled="shapeSelected"
          />
          <label for="type-fractions" class="form-check-label">Fractions</label>
        </div>

        <div class="text-center mt-4">
          <button
            class="btn btn-outline-success"
            v-if="!shapeSelected"
            @click="handleStartCreateNewShape"
          >Create a new shape</button>
          <button
            class="btn btn-outline-dark"
            v-if="shapeSelected"
            @click="handleClear"
            :disabled="step===2"
          >Clear</button>
        </div>
      </div>
      <div class="col-sm-6 app--shape">
        <div class="app--available-shape">
          <app-square class="shape-to-move" v-if="shape==0" :id="1" :hasStyle="true" :display="1"></app-square>
          <app-triangle
            class="shape-to-move"
            v-if="shape==1"
            :hasStyle="true"
            :type="'up'"
            :display="1"
          ></app-triangle>
          <app-triangle
            class="shape-to-move"
            v-if="shape==1"
            :hasStyle="true"
            :type="'down'"
            :display="1"
          ></app-triangle>
        </div>

        <div class="app--cover-shape-container">
          <app-shape-by-triangle
            v-if="shape=='1' && shapeSelected===true"
            :shapeData="shapeData.shape"
            @setTilesUsed="tilesUsed=$event"
            :hasStyleIndex="hasStyleIndex"
          ></app-shape-by-triangle>
          <app-shape-by-square
            v-if="shape=='0' && shapeSelected===true"
            :shapeData="shapeData.shape"
            @setTilesUsed="tilesUsed=$event"
            :hasStyleIndex="hasStyleIndex"
          ></app-shape-by-square>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="step===1">
      <button
        class="btn btn-outline-success"
        @click="handleCoverShape"
      >Auto-fill tiles</button>
    </div>
    <div class="text-center" v-if="step>=3">
      <p>{{ shapeData.totalTiles}} cover the shape</p>
      <p>
        The whole shape is worth
        <span
          class="text-primary font-weight-bold"
        >{{ numberType==3 ? `${totalNumber.up} / ${totalNumber.down}` : totalNumber }}</span>
      </p>
      <p>
        What is each tile worth?
        <span v-if="numberType==3">
          <input
            class="form-control"
            type="number"
            name="myAnswerUp"
            style="width: 10%; display: inline"
            v-model.number="myAnswerUp"
          />
          /
          <input
            class="form-control"
            type="number"
            name="myAnswerDown"
            style="width: 10%; display: inline"
            v-model.number="myAnswerDown"
          />
        </span>
        <span v-else>
          <input type="number" name="myAnswer" v-model.number="myAnswer" />
        </span>
      </p>
      <div
        class="alert"
        :class="checkMessage ==='Correct!' ? 'alert-success' : 'alert-danger'"
        v-if="step===4 || step===5"
      >{{checkMessage}}</div>
      <button
        class="btn btn-outline-success"
        v-if="step===3 || step===4"
        @click="handleCheckAnswer"
      >OK</button>
      <button
        class="btn btn-outline-success"
        v-if="step===5"
        @click="handleCreateNewShape"
      >Create a new shape</button>
    </div>
  </div>
</template>

<script>
import { Decimal } from "decimal.js";
import Square from "./Square.vue";
import Triangle from "./Triangle.vue";
import ShapeByTriangle from "./ShapeByTriangle.vue";
import ShapeBySquare from "./ShapeBySquare.vue";
import squareData from "./data/square";
import triangleData from "./data/triangle";
import { pickRandomNumber } from "./utils";

export default {
  components: {
    appSquare: Square,
    appTriangle: Triangle,
    appShapeByTriangle: ShapeByTriangle,
    appShapeBySquare: ShapeBySquare
  },
  data: function() {
    return {
      shape: 0,
      numberType: 1,
      shapeSelected: false,
      shapeData: null,
      tilesUsed: 0,
      step: 0,
      hasStyleIndex: 0,
      timer: null,
      questionNumber: null,
      myAnswer: null,
      myAnswerUp: null,
      myAnswerDown: null,
      checkMessage: ""
    };
  },
  watch: {
    hasStyleIndex(value) {
      if (!this.shapeData) {
        return;
      }
      if (value >= this.shapeData.totalData) {
        clearInterval(this.timer);
        this.timer = null;
        this.step += 1; // turn to 3
        this.generateQuestion();
      }
    }
  },
  computed: {
    totalNumber() {
      let total;
      switch (this.numberType) {
        case 1:
          total = this.questionNumber * this.shapeData.totalTiles;
          break;
        case 2:
          // total = this.questionNumber * this.shapeData.totalTiles;
          total = Decimal.mul(this.questionNumber, this.shapeData.totalTiles);
          break;
        case 3:
          total = {};
          total.up = this.questionNumber.up * this.shapeData.totalTiles;
          total.down = this.questionNumber.down;
          break;
        default:
          return;
      }
      return total;
    }
  },
  methods: {
    handleStartCreateNewShape() {
      this.createShape();
      this.shapeSelected = true;
      this.step += 1;
    },
    handleClear() {
      this.shapeSelected = false;
      this.shapeData = {};
      this.step = 0;
      this.hasStyleIndex = 0;
      this.questionNumber = null;
      this.myAnswerUp = null;
      this.myAnswerDown = null;
      this.myAnswer = null;
      this.checkMessage = "";
    },
    handleCoverShape() {
      this.step += 1; // turn to 2
      this.timer = setInterval(() => {
        this.hasStyleIndex += 1;
      }, 250);
    },
    generateQuestion() {
      switch (this.numberType) {
        case 1:
          this.questionNumber = pickRandomNumber(1, 10); // a random number between 1 - 10
          break;
        case 2:
          this.questionNumber = pickRandomNumber(1, 9) / 10; // a random number between 0.1 - 1
          break;
        case 3:
          this.questionNumber = {};
          this.questionNumber.up = pickRandomNumber(1, 10); // 分子
          this.questionNumber.down = pickRandomNumber(1, 10); // 分母
          break;
        default:
          return;
      }
    },
    handleCheckAnswer() {
      this.step = 4; // Check answer and show error message
      if (this.numberType === 3) {
        // If number type is fraction
        // answer = this.shapeData.totalTiles * this.questionNumber.up / this.questionNumber.down;
        if (!this.myAnswerUp || !this.myAnswerDown) {
          this.checkMessage = "Please enter a number";
        } else {
          if (
            this.myAnswerUp / this.myAnswerDown >
            this.questionNumber.up / this.questionNumber.down
          ) {
            this.checkMessage = "Your answer is too big. Try again.";
          } else if (
            this.myAnswerUp / this.myAnswerDown <
            this.questionNumber.up / this.questionNumber.down
          ) {
            this.checkMessage = "Your answer is too small. Try again.";
          } else {
            this.step = 5; // Answer is correct
            this.checkMessage = "Correct!";
          }
        }
      } else {
        // If number type is not fraction i.e. whole number or decimals
        // answer = this.shapeData.totalTiles * this.questionNumber;
        if (!this.myAnswer) {
          this.checkMessage = "Please enter a number";
        } else {
          if (this.myAnswer > this.questionNumber) {
            this.checkMessage = "Your answer is too big. Try again.";
          } else if (this.myAnswer < this.questionNumber) {
            this.checkMessage = "Your answer is too small. Try again.";
          } else {
            this.step = 5;
            this.checkMessage = "Correct!";
          }
        }
      }
    },
    handleCreateNewShape() {
      this.createShape();
      this.step = 1;
      this.hasStyleIndex = 0;
      this.questionNumber = null;
      this.myAnswerUp = null;
      this.myAnswerDown = null;
      this.myAnswer = null;
      this.checkMessage = "";
    },
    createShape() {
      let randomNumber;
      if (this.shape === 0) {
        randomNumber = pickRandomNumber(0, squareData.length);
        this.shapeData = squareData[randomNumber];
      }
      if (this.shape === 1) {
        randomNumber = pickRandomNumber(0, triangleData.length);
        // console.log(randomNumber);
        this.shapeData = triangleData[randomNumber];
      }
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.app--available-shape {
  display: flex;
}
.app--cover-shape-container {
  min-height: 200px;
  display: flex;
  align-items: center;
}
.app--cover-shape-row {
  display: flex;
}
.shape-to-move {
  touch-action: none;
  z-index: 100;
}
@media only screen and (max-width: 576px) {
  .app--available-shape {
    justify-content: center;
  }
  .app--cover-shape-container {
    justify-content: center;
  }
}
</style>
