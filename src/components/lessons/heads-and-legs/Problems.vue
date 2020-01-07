<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-success text-center mb-4">Heads and legs problems</h3>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h6>There are {{ problem.heads }} animals with {{ problem.legs }} legs.</h6>
        <h6>How many pigs are there?</h6>
        <h6>How many chickens are there?</h6>

        <div v-if="status===0">
          <div class="d-flex justify-content-between">
            <div class="flex-grow-1 mr-1 d-flex flex-column align-items-center">
              <img class="app--image" :src="pigPicSrc" alt="Pig" data-animal="pig" />
            </div>
            <div class="flex-grow-1 mx-1 d-flex flex-column align-items-center">
              <img class="app--image" :src="chickenPicSrc" alt="Chicken" data-animal="chicken" />
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div
              class="text-danger flex-grow-1 d-flex justify-content-end align-items-center mr-2"
            >How many pigs?</div>
            <div>
              <input
                type="text"
                class="form-control"
                v-model.number="pigNumInput"
                @keypress="handleCheckInput"
              />
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <div
              class="text-danger flex-grow-1 d-flex justify-content-end align-items-center mr-2"
            >Chickens</div>
            <div>
              <input type="text" class="form-control" disabled style="background-color: white;" />
            </div>
          </div>
          <div class="text-center my-2">
            <button
              class="btn btn-outline-success"
              :disabled="!isValidInput"
              @click="handleStart"
            >OK</button>
          </div>
        </div>

        <div v-if="status > 0">
          <div class="d-flex justify-content-between">
            <div class="flex-grow-1 mr-1 d-flex flex-column align-items-center">
              <img class="app--image" :src="pigPicSrc" alt="Pig" data-animal="pig" />
              <div class="app--data-box">{{ status > 0 ? solution.pigNum : ''}}</div>
              <div class="app--data-box" style="visibility: hidden;"></div>
            </div>
            <div
              class="flex-grow-1 mx-1 d-flex flex-column align-items-center"
              style="position: relative;"
            >
              <img class="app--image" :src="chickenPicSrc" alt="Chicken" data-animal="chicken" />

              <div class="app--data-box">{{ status > 0 ? solution.chickenNum : ''}}</div>
              <div
                class="app--data-box text-danger d-flex justify-content-end align-items-center"
                style="border: none; padding-right: 10px;"
              >Target</div>
            </div>
            <div class="flex-grow-1 mx-1 d-flex flex-column justify-content-between">
              <h6 class="flex-grow-1 d-flex justify-content-center align-items-end">Heads</h6>
              <div class="app--data-box">{{ status > 0 ? headLegNum.head : ''}}</div>
              <div class="app--data-box">{{ problem.heads }}</div>
            </div>
            <div class="flex-grow-1 ml-1 d-flex flex-column justify-content-between">
              <h6 class="flex-grow-1 d-flex justify-content-center align-items-end">{{ " " }}Legs</h6>
              <div class="app--data-box">{{ status > 0 ? headLegNum.leg : ''}}</div>
              <div class="app--data-box">{{ problem.legs }}</div>
            </div>
          </div>
          <div
            class="mt-3 alert alert-danger text-center"
            v-if="status === 0 || status === 1"
          >Swap animals by clicking on the animal in the pen</div>
          <div v-if="status===2" class="mt-3 text-center">
            <div class="alert alert-success">The answer is correct, click to reset problem</div>
            <button class="btn btn-outline-success" @click="handleNewProblem">Reset</button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="app--dragging-area" ref="draggingArea">
          <div v-if="status > 0">
            <img
              v-for="i in drawnAnimals.chickenNum"
              :key="'c'+i"
              :src="chickenPicSrc"
              alt="Chicken"
              class="app--image"
              data-animal="chicken"
              @click="handleSwapAnimal"
            />
            <img
              v-for="j in drawnAnimals.pigNum"
              :key="'p'+j"
              :src="pigPicSrc"
              alt="Pig"
              class="app--image"
              data-animal="pig"
              @click="handleSwapAnimal"
            />
          </div>
        </div>
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
  data: function() {
    return {
      problem: null,
      MIN_ANIMALS: 11,
      MAX_ANIMALS: 25,
      pigPicSrc,
      chickenPicSrc,
      status: 0,
      // 0 - not begin, ready for input
      // 1 - started
      // 2 - finished

      solution: {
        pigNum: 0,
        chickenNum: 0
      },
      pigNumInput: null,
      drawnAnimals: null
    };
  },
  computed: {
    headLegNum() {
      return {
        head: this.solution.pigNum + this.solution.chickenNum,
        leg: this.solution.pigNum * 4 + this.solution.chickenNum * 2
      };
    },
    chickenNumInput() {
      if (!this.pigNumInput && this.pigNumInput !== 0) {
        return null;
      } else {
        return this.problem.heads - this.pigNumInput;
      }
    },
    isValidInput() {
      return (
        typeof this.pigNumInput === "number" &&
        this.pigNumInput >= 0 &&
        this.chickenNumInput >= 0
      );
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
      this.problem = generateProblem(this.MIN_ANIMALS, this.MAX_ANIMALS);
    },
    handleNewProblem() {
      this.initProblem();
      this.status = 0;
      this.solution = {
        pigNum: 0,
        chickenNum: 0
      };
      this.pigNumInput = null;
      this.drawnAnimals = { ...this.solution };
    },
    handleCheckInput(e) {
      let { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57) || !charCode) {
        e.preventDefault();
      }
    },
    handleStart() {
      this.status = 1;
      this.solution = {
        pigNum: this.pigNumInput,
        chickenNum: this.chickenNumInput
      };
      this.drawnAnimals = { ...this.solution };
    },
    handleSwapAnimal(e) {
      let animal = e.target.getAttribute("data-animal");
      if (animal === "pig") {
        this.solution.chickenNum++;
        this.solution.pigNum--;
        e.target.src = this.chickenPicSrc;
        e.target.setAttribute("data-animal", "chicken");
      }
      if (animal === "chicken") {
        this.solution.pigNum++;
        this.solution.chickenNum--;
        e.target.src = this.pigPicSrc;
        e.target.setAttribute("data-animal", "pig");
      }
      this.solution = { ...this.solution };
    }
  },
  created() {
    this.initProblem();
  }
};
</script>

<style scoped>
</style>