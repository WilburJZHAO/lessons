<template>
  <div>
    <div class="container mt-3">
      <h3 class="lesson-subheading">Can you find all solutions?</h3>
      <hr class="subheading-separator" />
      <div class="row">
        <!-- Left part -->
        <div class="col-12 col-md-6 app--lesson-left">
          <form @submit.prevent="handleCheckAnswer">
            <h4 class="text-success">Find all ways to make this true</h4>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                name="level"
                value="1"
                id="check-level1"
                v-model="level"
              />
              <label for="check-level1" class="form-check-label">Level 1</label>
            </div>
            <div class="form-check mb-3">
              <input
                type="radio"
                class="form-check-input"
                name="level"
                value="2"
                id="check-level2"
                v-model="level"
              />
              <label for="check-level2" class="form-check-label">Level 2</label>
            </div>

            <div class="form-group container">
              <div class="row">
                <input
                  type="number"
                  class="form-control"
                  min="1"
                  max="100"
                  style="width: auto"
                  required
                  v-model="myNumber1"
                />
                <span>&nbsp; rows of &nbsp;</span>
                <input
                  type="number"
                  class="form-control"
                  min="1"
                  max="100"
                  style="width: auto"
                  required
                  v-model="myNumber2"
                />
                <span>&nbsp; = {{ result }}</span>
              </div>
            </div>
            <div class="app--lesson-action">
              <button
                type="submit"
                class="btn btn-outline-success btn-lg"
                :disabled="finishAnswer"
              >Answer</button>
              <button
                type="button"
                class="btn btn-outline-dark btn-lg"
                @click="createQuestion(level)"
              >Next</button>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" v-model="showGraph" id="show-graph" />
              <label for="show-graph">Graph</label>
            </div>
            <div class="tt-prompt">
              <p
                v-show="answerResult.prompt"
                class="alert"
                :class="{'alert-danger': !answerResult.isRight ,'alert-success': answerResult.isRight}"
              >{{ answerResult.prompt }}</p>
            </div>

            <div class="tt--solutions mb-5">
              <div class="mr-3 tt--solutions-count">
                <p>
                  <span style="font-size: 115%;" class="badge badge-dark">{{ countOfSolutions }}</span> Solutions
                </p>
                <p>
                  <span style="font-size: 115%;" class="badge badge-dark">{{ countOfFound }}</span> Found.
                </p>
              </div>
              <div class="tt--solutions-list">
                <h5>Solutions found</h5>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(solution, index) in solutionsArr"
                    :key="index"
                  >{{ solution.number1 }} x {{ solution.number2 }} = {{solution.result}}</li>
                </ul>
              </div>
            </div>
          </form>
        </div>

        <!-- Right part -->
        <div v-if="showGraph" class="col-12 col-md-6">show graph</div>
        <div
          v-else
          class="col-12 col-md-6 app--lesson-right"
          style="overflow: visible;"
          v-show="answerResult.isRight"
        >
          <p class="tt--right-num1 mr-2 mt-1">
            <br />
            <span
              class="badge badge-light"
            >{{ myNumber1Temp }} row{{ this.myNumber1Temp > 1 ? 's' : ''}}</span>
          </p>
          <div class="tt--right-num2">
            <p class="ml-1 mb-1">
              <span class="badge badge-dark">{{ myNumber2Temp }} in each row</span>
            </p>
            <div class="tt--right-box">
              <div class="tt--right-row" v-for="num1 in myNumber1Arr" :key="num1">
                <div class="tt--right-circle" style="display:flex">
                  <div v-for="num2 in myNumber2Arr" :key="num2">
                    <app-circle />
                  </div>
                </div>
              </div>
              <div v-if="myNumber1Temp > 10">
                ...
                <small>More rows</small>
              </div>
            </div>
          </div>
          <div v-if="myNumber2Temp > 10" style="transform: translateY(9%);">
            ...
            <small>More</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Circle from "./Circle.vue";
import { pickRandomNumber, countSolutions, numberToArr } from "./utils";
export default {
  components: {
    AppCircle: Circle
  },
  data: function() {
    return {
      level: 1,
      number1: 0,
      number2: 0, // number1 and number2 for question
      myNumber1: null,
      myNumber2: null, // myNumber1 and myNumber2 are from user input
      myNumber1Temp: null,
      myNumber2Temp: null,
      result: 0, // result = number1 * number2
      countOfSolutions: 0,
      countOfFound: 0,
      solutionsArr: [],
      answerResult: {
        isRight: false,
        prompt: ""
      },
      finishAnswer: false, // if all solutions are found
      showDiagram: false,
      showGraph: false
    };
  },
  methods: {
    /**
     * Create a question based on the level and set this.number1, this.number2 and this.result
     * and calculate the count of solutions
     */
    createQuestion(level) {
      this.myNumber1 = null;
      this.myNumber2 = null;
      this.countOfFound = 0;
      this.finishAnswer = false;
      this.answerResult.isRight = false;
      this.answerResult.prompt = "";
      this.showDiagram = false;
      if (this.solutionsArr.length > 0) {
        this.solutionsArr.length = 0;
      }
      if (parseInt(level) === 1) {
        this.number1 = pickRandomNumber(1, 6);
        this.number2 = pickRandomNumber(1, 6);
      } else {
        this.number1 = pickRandomNumber(6, 11);
        this.number2 = pickRandomNumber(6, 11);
      }
      this.result = this.number1 * this.number2;
      this.countOfSolutions = countSolutions(this.result);
    },

    /*
     * Check input answer
     */
    handleCheckAnswer() {
      const answer = parseInt(this.myNumber1) * parseInt(this.myNumber2);
      if (answer === this.result) {
        // If the answer is right...
        // Check if the answer is already in solutions array
        const dupAnswerArr = this.solutionsArr.filter(solution => {
          return solution.number1 == this.myNumber1;
        });
        if (dupAnswerArr.length > 0) {
          this.answerResult.isRight = false;
          this.answerResult.prompt = "This solution already found";
          this.myNumber1 = null;
          this.myNumber2 = null;
          return;
        }

        this.solutionsArr.push({
          // Now put the answer in solutions array
          number1: this.myNumber1,
          number2: this.myNumber2,
          result: this.result
        });
        this.countOfFound++;
        this.answerResult.isRight = true;
        this.answerResult.prompt = "";
        this.showDiagram = true;
        this.myNumber1Temp = this.myNumber1;
        this.myNumber2Temp = this.myNumber2;

        if (this.countOfFound === this.countOfSolutions) {
          // If all solutions are found...
          this.answerResult.isRight = true;
          this.answerResult.prompt = "All solutions are found, well done!";
          this.finishAnswer = true;
          this.myNumber1 = null;
          this.myNumber2 = null;
          return;
        }
        this.myNumber1 = null;
        this.myNumber2 = null;
      } else {
        this.answerResult.isRight = false;
        if (answer < this.result) {
          this.answerResult.prompt = `${answer} is too small`;
        } else if (answer > this.result) {
          this.answerResult.prompt = `${answer} is too big`;
        } else {
          this.answerResult.prompt = "Your answer is invalid.";
        }
      }
    }
  },
  created() {
    this.createQuestion(this.level);
    window.addEventListener("keyup", e => {
      if (e.code == "Space") {
        this.createQuestion(this.level);
      }
    });
  },
  watch: {
    level: function(levelVal) {
      this.createQuestion(levelVal);
    }
  },
  computed: {
    myNumber1Arr: function() {
      if (this.myNumber1Temp > 10) {
        return numberToArr(10);
      }
      return numberToArr(this.myNumber1Temp);
    },
    myNumber2Arr: function() {
      if (this.myNumber2Temp > 10) {
        return numberToArr(10);
      }
      return numberToArr(this.myNumber2Temp);
    }
  }
};
</script>

<style scoped>
.tt--solutions {
  display: flex;
}
.tt--solutions-list {
  flex-grow: 2;
}
/* .tt--solutions-count {

} */
</style>
