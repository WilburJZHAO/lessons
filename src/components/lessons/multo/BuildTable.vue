<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Build a multiplication table</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-9">
        <div class="app--table-line">
          <div class="app--table-title">&nbsp;</div>
          <div v-for="index in indexArray" :key="index" class="app--table-title">{{ index }}</div>
        </div>
        <div class="app--table-line" v-for="row in indexArray" :key="row">
          <div class="app--table-title">
            <span style="position:absolute; left: 5px">{{ row }}</span>
          </div>
          <div
            class="app--table-cell"
            v-for="col in indexArray"
            :data-row="row"
            :data-col="col"
            :key="col"
            @mouseover="handleHint"
            @click="handleTestAnswer"
            :class="{
                'app--color-1': getOccur(row*col)===5 ,
                'app--color-2': getOccur(row*col)===44,
                'app--color-3': getOccur(row*col)===12,
                'app--color-4': getOccur(row*col)===20,
                'app--color-5': getOccur(row*col)===19,

              }"
          >
            <span
              style="position: absolute; font-weight: bold;"
              v-if="displayArray[row][col]"
            >{{ row*col }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 pt-4">
        <div class="d-flex">
          <div class="flex-grow-1 app--color-cell" style="background-color: #000"></div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="occur1>0">{{occur1}}</span>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-grow-1 app--color-cell" style="background-color: #007405"></div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="occur2>0">{{occur2}}</span>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-grow-1 app--color-cell" style="background-color: #b81513"></div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="occur3>0">{{occur3}}</span>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-grow-1 app--color-cell" style="background-color: #ea8d1f"></div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="occur4>0">{{occur4}}</span>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-grow-1 app--color-cell" style="background-color: #001cc6"></div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="occur19>0">{{occur19}}</span>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-grow-1 app--color-cell" style="background-color: #4ed5d7">
            <span style="position: absolute;">Total</span>
          </div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="totalOccur>0">{{totalOccur}}</span>
          </div>
        </div>

        <div v-if="gameStatus > 0" class="mt-3">
          <h5>Click on all the cells that equal:</h5>
          <h3 class="text-center">{{ testMultiplication }}</h3>
          <h5 class="text-center mt-5">{{ number1 }} X {{number2}}</h5>
        </div>
      </div>
    </div>

    <div class="mt-3 text-center">
      <button
        class="btn btn-outline-success"
        v-if="gameStatus===0"
        @click="handleBegin"
      >Start</button>
      <div class="alert alert-danger" v-if="gameStatus===1">There are {{ cellNumbers }} cells</div>
      <button
        class="btn btn-outline-success"
        v-if="gameStatus===2"
        @click="handleNextQuestion"
      >Correct! Go to next question</button>
      <div class="alert alert-danger" v-if="gameStatus===3">Finished!</div>
    </div>
  </div>
</template>

<script>
import {
  pickNumber,
  allPossibleMultiplyResults,
  getEachOccur,
  getOccur
} from "./utils/utils";
export default {
  data: function() {
    return {
      indexArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      gameStatus: 0,
      // 0 - ready for start
      // 1 - started, wait for answer
      // 2 - started, wait for next question
      // 3 - finished,
      generatedNumber: [],
      testMultiplication: null,
      cellNumbers: 0,
      foundCellNumbers: 0,
      number1: null,
      number2: null,
      displayArray: [],
      getOccur,
      occur1: 0,
      occur2: 0,
      occur3: 0,
      occur4: 0,
      occur19: 0,
      foundCombinations: []
    };
  },
  watch: {
    foundCellNumbers(value) {
      if (value >= getEachOccur(this.testMultiplication)) {
        if (this.foundCombinations.length >= 100) {
          this.gameStatus = 3;
        } else {
          this.gameStatus = 2;
        }
      }
    }
  },
  computed: {
    totalOccur() {
      return (
        this.occur1 + this.occur2 + this.occur3 + this.occur4 + this.occur19
      );
    }
  },
  methods: {
    /* Generate a new number which is a multiplication of two 0-9 random numbers
     If it is generated before, generate another one.
     If all possible numbers are generated, return null.
     */
    generateMultiplication() {
      if (this.generatedNumber.length === allPossibleMultiplyResults.length) {
        return null;
      }
      let number;
      do {
        number = pickNumber(0, 9) * pickNumber(0, 9);
      } while (this.generatedNumber.indexOf(number) !== -1);
      this.generatedNumber.push(number);
      return number;
    },

    /**
     * Fill displayArray's elements with false
     */
    resetDisplayArray() {
      for (let i = 0; i <= 9; i++) {
        this.displayArray[i] = [];
        for (let j = 0; j <= 9; j++) {
          this.displayArray[i][j] = false;
        }
      }
    },

    startNew() {
      this.foundCellNumbers = 0;
      this.testMultiplication = this.generateMultiplication();
      if (this.testMultiplication === null) {
        this.gameStatus = 3;
        return;
      }
      this.cellNumbers = getEachOccur(this.testMultiplication);
      this.gameStatus = 1;
    },

    handleBegin() {
      this.startNew();

      this.occur1 = 0;
      this.occur2 = 0;
      this.occur3 = 0;
      this.occur4 = 0;
      this.occur19 = 0;
      this.foundCombinations = [];
    },

    handleHint(el) {
      if (el.target.attributes["data-row"]) {
        this.number1 = Number(el.target.attributes["data-row"].value);
      }
      if (el.target.attributes["data-col"]) {
        this.number2 = Number(el.target.attributes["data-col"].value);
      }
    },

    /** Check if the cell clicked is clicked before */
    checkCombinationFound(number1, number2) {
      return this.foundCombinations.find(combination => {
        return (
          combination.number1 === number1 && combination.number2 === number2
        );
      });
    },

    handleTestAnswer() {
      if (this.number1 * this.number2 === this.testMultiplication) {
        if (this.checkCombinationFound(this.number1, this.number2)) {
          return;
        }

        this.displayArray[this.number1][this.number2] = true;
        this.displayArray = [...this.displayArray];
        this.foundCellNumbers++;
        this.foundCombinations.push({
          number1: this.number1,
          number2: this.number2
        });
        switch (getEachOccur(this.testMultiplication)) {
          case 1:
            this.occur1++;
            break;
          case 2:
            this.occur2++;
            break;

          case 3:
            this.occur3++;
            break;

          case 4:
            this.occur4++;
            break;

          case 19:
            this.occur19++;
            break;

          default:
        }
      }
    },

    handleNextQuestion() {
      this.startNew();
    }
  },
  created() {
    this.resetDisplayArray();
  }
};
</script>

<style scoped>
.app--table-line {
  display: flex;
}
.app--table-title {
  width: 10%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--table-cell {
  width: 10%;
  background-color: #edffff;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.app--color-cell {
  border: 1px solid #000;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--color-number {
  position: absolute;
}

.app--color-1 {
  color: #000000;
}
.app--color-2 {
  color: #007405;
}
.app--color-3 {
  color: #b81513;
}
.app--color-4 {
  color: #ea8d1f;
}
.app--color-5 {
  color: #001cc6;
}
.app--color-6 {
  color: #4ed5d7;
}
</style>