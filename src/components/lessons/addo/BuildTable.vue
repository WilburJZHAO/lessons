<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Build an addition table</h3>
    <div class="row">
      <div class="col-md-9">
        <div class="app--table-line">
          <div class="app--table-title">&nbsp;</div>
          <div v-for="index in indexArray" :key="index" class="app--table-title">{{ index }}</div>
        </div>
        <div class="app--table-line" v-for="row in indexArray" :key="row">
          <div class="app--table-title">
            <span style="position: absolute; left: 1px;">{{ row }}</span>
          </div>
          <div
            class="app--table-cell"
            v-for="col in indexArray"
            :data-row="row"
            :data-col="col"
            :key="col"
            @mouseover="handleHint"
            @click="handleTestAnswer"
          >
            <span
              v-if="displayArray[row][col]"
              style="position: absolute; font-weight: bold;"
              :class="{
                'app--color-0' : row+col===0 || row+col===20,
                'app--color-1' : row+col===1 || row+col===19,
                'app--color-2' : row+col===2 || row+col===18,
                'app--color-3' : row+col===3 || row+col===17,
                'app--color-4' : row+col===4 || row+col===16,
                'app--color-5' : row+col===5 || row+col===15,
                'app--color-6' : row+col===6 || row+col===14,
                'app--color-7' : row+col===7 || row+col===13,
                'app--color-8' : row+col===8 || row+col===12,
                'app--color-9' : row+col===9 || row+col===11,
                'app--color-10' : row+col===10,
              }"
            >{{row + col}}</span>
          </div>
        </div>
      </div>

      <div class="col-md-3 mt-4" v-if="gameStatus > 0">
        <h5>Click on all the cells that equal:</h5>
        <h3 class="text-center">{{ testAddition }}</h3>
        <h5>{{ addition1 }} + {{ addition2 }}</h5>
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
      >Correct! Next question</button>
      <div class="alert alert-danger" v-if="gameStatus===3">Finished!</div>
    </div>
  </div>
</template>

<script>
import { pickNumber } from "./utils/utils";
export default {
  data: function() {
    return {
      indexArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      gameStatus: 0,
      // 0 - ready for start
      // 1 - started, wait for answer
      // 2 - started, wait for next question
      // 3 - finished,
      generatedNumber: [],
      testAddition: null,
      cellNumbers: 0,
      foundCellNumbers: 0,
      addition1: null,
      addition2: null,
      displayArray: [],
      foundCombinations: []
    };
  },
  watch: {
    foundCellNumbers(value) {
      if (value >= this.cellNumbers) {
        if (this.generatedNumber.length >= 21) {
          this.gameStatus = 3;
        } else {
          this.gameStatus = 2;
        }
      }
    }
  },
  methods: {
    /** Pick up a number from 0 - 20 */
    generateAddition() {
      if (this.generatedNumber.length === 21) {
        // It means all numbers from 0 - 20 have been generated
        return null;
      }
      let number;
      do {
        number = pickNumber(0, 20);
      } while (this.generatedNumber.indexOf(number) !== -1);
      this.generatedNumber.push(number);
      return number;
    },

    /**
     * Calculate how many cells available for the given number
     */
    calculateCellNumbers(number) {
      if (number <= 10 && number >= 0) {
        return number + 1;
      } else if (number > 10 && number <= 20) {
        return 20 - number + 1;
      } else {
        return 0;
      }
    },

    /**
     * Fill displayArray's elements with false
     */
    resetDisplayArray() {
      for (let i = 0; i <= 20; i++) {
        this.displayArray[i] = [];
        for (let j = 0; j <= 20; j++) {
          this.displayArray[i][j] = false;
        }
      }
    },

    /** Check if the cell clicked is clicked before */
    checkCombinationFound(number1, number2) {
      return this.foundCombinations.find(combination => {
        return (
          combination.addition1 === number1 && combination.addition2 === number2
        );
      });
    },

    newQuestion() {
      this.testAddition = this.generateAddition();
      if (this.testAddition === null) {
        this.gameStatus = 3;
        return;
      }
      this.cellNumbers = this.calculateCellNumbers(this.testAddition);
      this.gameStatus = 1;
    },

    handleHint(el) {
      if (el.target.attributes["data-row"]) {
        this.addition1 = Number(el.target.attributes["data-row"].value);
      }
      if (el.target.attributes["data-col"]) {
        this.addition2 = Number(el.target.attributes["data-col"].value);
      }
    },

    handleTestAnswer() {
      // console.log(this.addition1);
      // console.log(this.addition2);
      if (this.addition1 + this.addition2 === this.testAddition) {
        if (this.checkCombinationFound(this.addition1, this.addition2)) {
          return;
        }

        this.displayArray[this.addition1][this.addition2] = true;
        this.displayArray = [...this.displayArray];
        this.foundCellNumbers++;
        this.foundCombinations.push({
          addition1: this.addition1,
          addition2: this.addition2
        });
      }
    },

    handleBegin() {
      this.newQuestion();
      this.foundCombinations = [];
    },

    handleNextQuestion() {
      this.gameStatus = 1;
      this.foundCellNumbers = 0;
      this.newQuestion();
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

.app--color-0 {
  color: #808000;
}
.app--color-1 {
  color: #666666;
}
.app--color-2 {
  color: #00ff00;
}
.app--color-3 {
  color: #804000;
}
.app--color-4 {
  color: #0080ff;
}
.app--color-5 {
  color: #ff0080;
}
.app--color-6 {
  color: #007405;
}
.app--color-7 {
  color: #b81513;
}
.app--color-8 {
  color: #ea8d1f;
}
.app--color-9 {
  color: #001cc6;
}
.app--color-10 {
  color: #000000;
}
</style>
