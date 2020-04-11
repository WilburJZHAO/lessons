<template>
  <div class="container">
    <h3 class="text-success text-center my-3">Find the LCM</h3>
    <div class="row">
      <div class="col-sm-2 col-md-3"></div>
      <div class="col-sm-8 col-md-6">
        <label>Separate each number with a comma</label>
        <input
          type="text"
          class="form-control"
          v-model="inputNumbers"
          @keypress="checkInput"
          :disabled="gameStatus > 0"
        />
        <div class="text-center mt-3">
          <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
          <button
            class="btn btn-outline-success"
            @click="handleInputNumbers"
            v-if="gameStatus === 0"
          >OK</button>
        </div>
      </div>
      <div class="col-sm-2 col-md-3"></div>
    </div>
    <div class="row justify-content-center" v-if="gameStatus > 0">
      <div class="col-md-4 col-sm-6">
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-end text-danger"
            v-for="(number, index) in numbers"
            :key="index"
          >
            {{ number }}
            <span style="visibility: hidden">p</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-end text-primary"
            :style="{ 'background-color': lcm && '#FEEDD6'}"
          >
            {{ lcm }}
            <span style="visibility: hidden">p</span>
          </li>
        </ul>
      </div>
      <div class="col-md-4 col-sm-6" v-if="gameStatus > 1">
        <ul class="list-group">
          <li class="list-group-item" v-for="(factor, index) in factors" :key="index">
            <span style="visibility: hidden">p</span>
            {{ factor }}
          </li>
          <li class="list-group-item text-primary" :style="{ 'background-color': lcm && '#FEEDD6'}">
            <span style="visibility: hidden">p</span>
            {{ lcmFactors }}
          </li>
        </ul>
      </div>
      <div class="col-md-4 col-sm-6" v-else></div>
      <div class="col-12 text-center mt-5">
        <button
          class="btn btn-outline-success"
          v-if="gameStatus === 1"
          @click="handleCalculateFactors"
        >Calculate prime factors for each number</button>
        <button
          class="btn btn-outline-success"
          v-if="gameStatus === 2"
          @click="handleCalculateLCM"
        >Caculate the LCM</button>
        <button class="btn btn-outline-dark" v-if="gameStatus === 3" @click="handleReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import pf from "primes-and-factors";
import lcm from "lcm";
export default {
  data: function() {
    return {
      gameStatus: 0,
      // 0 - start, wait for inputing numbers
      // 1 - Ready to calculate prime factors for each number
      // 2 - Ready to calculate LCM
      // 3 - Finish, ready to reset
      inputNumbers: null,
      numbers: [],
      factors: [],
      lcm: null,
      lcmFactors: "",
      errorMessage: ""
    };
  },
  watch: {},
  methods: {
    handleInputNumbers() {
      const inputNumbersArr = this.inputNumbers.split(",");
      // console.log(inputNumbersArr); /* eslint-disable-line no-console */
      if (inputNumbersArr.length <= 1) {
        this.errorMessage = "Enter at lease two numbers, each greater than 0";
        return;
      }
      for (let i = 0; i < inputNumbersArr.length; i++) {
        if (
          !typeof inputNumbersArr[i] === "number" ||
          inputNumbersArr[i] <= 0
        ) {
          this.errorMessage = "Enter at lease two numbers, each greater than 0";
          return;
        }
        if (inputNumbersArr[i] > 9999) {
          this.errorMessage = "Enter a number less than 10000";
          return;
        }
        this.numbers.push(Number(inputNumbersArr[i]));
      }
      this.errorMessage = "";
      this.gameStatus = 1;
    },
    checkInput(e) {
      // console.log(e.charCode); /* eslint-disable-line no-console */
      let { charCode } = e;
      if (!((charCode >= 48 && charCode <= 57) || charCode === 44)) {
        e.preventDefault();
      }
      if (e.target.value.length > 18) {
        e.preventDefault();
      }
    },
    handleCalculateFactors() {
      for (let i = 0; i < this.numbers.length; i++) {
        // do calculation...
        this.factors.push(pf.getFactors(this.numbers[i]).join(", "));
      }
      this.gameStatus = 2;
    },
    handleCalculateLCM() {
      let lcmNumber = lcm(this.numbers[0], this.numbers[1]);
      for (let i = 2; i < this.numbers.length; i++) {
        lcmNumber = lcm(lcmNumber, this.numbers[i]);
      }
      this.lcm = `LCM is ${lcmNumber}`;
      this.lcmFactors = pf.getFactors(lcmNumber).join(", ");
      this.gameStatus = 3;
    },
    handleReset() {
      this.gameStatus = 0;
      this.inputNumbers = null;
      this.numbers = [];
      this.factors = [];
      this.lcm = null;
      this.lcmFactors = "";
      this.errorMessage = "";
    }
  }
};
</script>

<style scoped></style>
