<template>
  <div>
    <h6 class="text-center">There are {{ problem.heads }} animals with {{ problem.legs }} legs.</h6>
    <h6 class="text-center my-3" v-if="status===0">
      Start with all
      <span
        class="text-primary app--animal-link"
        @click="handleChooseAnimal('pig')"
      >pigs</span> or all
      <span
        class="text-primary app--animal-link"
        @click="handleChooseAnimal('chicken')"
      >chickens</span>?
    </h6>
    <div v-if="status > 0" class="my-3 d-flex flex-column align-items-center">
      <div class="my-2 d-flex">
        <label
          class="mr-3"
          :class="{'text-danger': headLegNum.leg > problem.legs}"
        >How many pigs do you want to swap for chickens?</label>
        <div>
          <input
            type="text"
            class="form-control"
            :disabled="status!==1"
            @keypress="handleInput"
            v-model.number="pigSwapNum"
          />
        </div>
      </div>
      <div class="d-flex">
        <label
          class="mr-3"
          :class="{'text-danger': headLegNum.leg < problem.legs}"
        >How many chickens do you want to swap for pigs?</label>
        <div>
          <input
            type="text"
            class="form-control"
            :disabled="status!==1"
            @keypress="handleInput"
            v-model.number="chickenSwapNum"
          />
        </div>
      </div>
      <div
        class="my-1 badge badge-danger"
        :style="{visibility: invalidInput ? 'visible': 'hidden'}"
      >Too big</div>
      <button class="mt-2 btn btn-outline-success" @click="handleSwap" :disabled="status!==1">OK</button>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
        <div
          class="text-danger mb-3"
        >The challenge is to learn a method to get the answer in just one trial</div>

        <div class="d-flex justify-content-center">
          Trial:
          <span class="text-danger ml-3">{{ trial}}</span>
        </div>

        <div v-if="status===0" class="alert alert-danger mt-3">Choose an animal by clicking on blue</div>
        <div v-if="status===2" class="text-center mt-3">
          <div class="alert alert-success">Problem solved!</div>
          <button class="btn btn-outline-success" @click="handleReset">Next challenge</button>
        </div>
        <div v-if="status===3" class="text-center mt-3">
          <div class="alert alert-danger">
            You have run out of trials.
            <br />
            The answer is {{ problem.pigsHeads}} pigs
          </div>
          <button class="btn btn-outline-success" @click="handleReset">Next challenge</button>
        </div>
      </div>
      <div class="col-md-8">
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <img :src="pigPicSrc" alt="pig" class="app--image" style="width: 60px;" />
              </th>
              <th>
                <img :src="chickenPicSrc" alt="chicken" class="app--image" style="width: 60px;" />
              </th>
              <th>Heads</th>
              <th>Legs</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 6" :key="i">
              <td>{{ i-1 }}</td>
              <td>{{ trialHistory[i-1] && trialHistory[i-1].pig }}</td>
              <td>{{ trialHistory[i-1] && trialHistory[i-1].chicken }}</td>
              <td>{{ trialHistory[i-1] && trialHistory[i-1].heads }}</td>
              <td>{{ trialHistory[i-1] && trialHistory[i-1].legs }}</td>
            </tr>

            <tr>
              <td></td>
              <td colspan="3" class="text-success text-right">Target</td>
              <td class="text-center">{{ problem.legs }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { generateProblem } from "./utils";
import pigPicSrc from "@/assets/heads-and-legs/pig.png";
import chickenPicSrc from "@/assets/heads-and-legs/chicken.png";
import "./styles.css";
export default {
  props: ["min", "max"],
  data: function() {
    return {
      problem: null,
      pigPicSrc,
      chickenPicSrc,
      status: 0,
      // 0 - not started, ready for input
      // 1 - started
      // 2 - finish, correct
      // 3 - finish, run out of trial
      solution: {
        pigNum: 0,
        chickenNum: 0
      },
      trial: 0,
      MAX_TRIAL: 5,
      selectedAnimal: null,
      trialHistory: [],
      pigSwapNum: null,
      chickenSwapNum: null,
      invalidInput: false
    };
  },
  computed: {
    headLegNum() {
      return {
        head: this.solution.pigNum + this.solution.chickenNum,
        leg: this.solution.pigNum * 4 + this.solution.chickenNum * 2
      };
    }
  },
  watch: {
    solution(value) {
      if (
        value.pigNum === this.problem.pigsHeads &&
        value.chickenNum === this.problem.chickensHeads
      ) {
        this.status = 2;
      }
    }
  },
  methods: {
    initProblem() {
      this.problem = generateProblem(this.min, this.max);
    },
    handleReset() {
      this.initProblem();
      this.status = 0;
      this.trial = 0;
      this.selectedAnimal = 0;
      this.solution = {
        pigNum: 0,
        chickenNum: 0
      };
      this.trialHistory = [];
      this.pigSwapNum = null;
      this.chickenSwapNum = null;
      this.invalidInput = false;
    },
    handleChooseAnimal(animal) {
      this.status = 1;
      this.selectedAnimal = animal;
      if (animal === "pig") {
        this.solution = {
          pigNum: this.problem.heads,
          chickenNum: 0
        };
      }
      if (animal === "chicken") {
        this.solution = {
          pigNum: 0,
          chickenNum: this.problem.heads
        };
      }
      this.trialHistory.push({
        pig: this.solution.pigNum,
        chicken: this.solution.chickenNum,
        heads: this.headLegNum.head,
        legs: this.headLegNum.leg
      });
    },
    handleInput(e) {
      let { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57) || !charCode) {
        e.preventDefault();
      }
    },
    handleSwap() {
      if (!this.pigSwapNum && !this.chickenSwapNum) {
        this.pigSwapNum = "";
        this.chickenSwapNum = "";
        return;
      }
      if (
        this.pigSwapNum > this.solution.pigNum ||
        this.chickenSwapNum > this.solution.chickenNum
      ) {
        this.pigSwapNum = "";
        this.chickenSwapNum = "";
        this.invalidInput = true;
        return;
      }
      if (
        (this.pigSwapNum && !this.chickenSwapNum) ||
        (this.pigSwapNum &&
          this.chickenSwapNum &&
          this.selectedAnimal === "pig")
      ) {
        this.invalidInput = false;
        this.solution.pigNum -= this.pigSwapNum;
        this.solution.chickenNum += this.pigSwapNum;
      }
      if (
        (this.chickenSwapNum && !this.pigSwapNum) ||
        (this.pigSwapNum &&
          this.chickenSwapNum &&
          this.selectedAnimal === "chicken")
      ) {
        this.invalidInput = false;
        this.solution.pigNum += this.chickenSwapNum;
        this.solution.chickenNum -= this.chickenSwapNum;
      }
      this.solution = { ...this.solution };
      this.trialHistory.push({
        pig: this.solution.pigNum,
        chicken: this.solution.chickenNum,
        heads: this.headLegNum.head,
        legs: this.headLegNum.leg
      });
      this.pigSwapNum = "";
      this.chickenSwapNum = "";
      this.trial++;
      if (this.trial >= this.MAX_TRIAL) {
        this.status = 3;
      }
    }
  },
  created() {
    this.initProblem();
  }
};
</script>

<style scoped>
.app--animal-link {
  cursor: pointer;
}
</style>