<template>
  <div class="container">
    <h3 class="lesson-subheading">Find pairs of numbers for a given LCM</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-4 col-sm-6">
        <h5>Enter a chosen LCM</h5>
        <input
          type="text"
          class="form-control"
          v-model.number="lcmNumber"
          @keypress="handleCheckInput"
          :disabled="gameStatus !== 0"
        />
        <div class="text-center my-3">
          <button
            class="btn btn-outline-success mb-3"
            @click="handleCheckPrime"
            v-if="gameStatus === 0"
            :disabled="!lcmNumber || lcmNumber <= 2"
          >OK</button>
          <div
            v-if="gameStatus===0 && (lcmNumber===0 || lcmNumber===1)"
            class="alert alert-danger"
          >Enter a number greater than 1</div>
          <div v-if="gameStatus > 0" class="alert alert-danger">
            {{
            primeFactors.length > 1
            ? `${lcmNumber} is made up of ${primeFactors.length} prime factors.`
            : `${lcmNumber} is a prime number`
            }}
          </div>
          <button
            class="btn btn-outline-success"
            v-if="gameStatus === 1"
            @click="handleCalculateFactors"
          >Calculate factors</button>
          <button
            class="btn btn-outline-success"
            v-if="gameStatus === 2"
            @click="handleCalFirstGroupPairs"
          >Calculate the first group of number pairs</button>
          <button
            class="btn btn-outline-success"
            v-if="gameStatus === 3"
            @click="handleCalSecondGroupPairs"
          >Calculate the second group of number pairs</button>
          <button class="btn btn-outline-dark" v-if="gameStatus === 4" @click="handleReset">Reset</button>
          <div class="mt-3">
            <h5 class="text-primary" v-if="gameStatus > 0">
              {{
              primeFactors.length > 1
              ? `${primeFactors.length} primes`
              : "Prime"
              }}
            </h5>
            <ul class="list-group app--list" v-if="gameStatus > 0">
              <li
                class="list-group-item"
                v-for="(factor, index) in primeFactors"
                :key="index"
              >{{ factor }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-2 col-sm-6 mb-3">
        <h5 class="text-primary text-center">
          <span v-if="gameStatus > 1">{{ factors.length }}</span> Factors
        </h5>
        <ul class="list-group app--list" v-if="gameStatus > 1">
          <li
            class="list-group-item text-center"
            v-for="(factor, index) in factors"
            :key="index"
          >{{ factor }}</li>
        </ul>
      </div>

      <div class="col-md-6 col-sm-12">
        <h5 class="text-primary text-center" v-if="gameStatus <= 2">LCM Pairs</h5>
        <h5 class="text-primary text-center" v-if="gameStatus > 2">
          {{ firstGroupPairs.length + secondGroupPairs.length }} pairs with a
          LCM of {{ lcmNumber }}
        </h5>
        <div class="row">
          <div class="col-sm-6">
            <ul class="list-group app--list" v-if="gameStatus > 2">
              <li
                class="list-group-item"
                v-for="(factor, index) in firstGroupPairs"
                :key="index"
              >{{ factor }} , {{ lcmNumber }}</li>
            </ul>
          </div>
          <div class="col-sm-6">
            <ul class="list-group app--list" v-if="gameStatus > 3">
              <li
                class="list-group-item"
                v-for="(item, index) in secondGroupPairs"
                :key="index"
              >{{ item[0] }} , {{ item[1] }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aMath from "array-math";
import Combinatorics from "js-combinatorics";
import lcm from "lcm";

export default {
  data: function() {
    return {
      gameStatus: 0,
      // 0 - start, ready for input and caculating primes
      // 1 - ready for calculating factors
      // 2- ready for first group of number pairs
      // 3 - ready for second group of number pairs
      lcmNumber: null,
      primeFactors: [],
      factors: [],
      firstGroupPairs: [],
      secondGroupPairs: []
    };
  },
  methods: {
    handleCheckInput(e) {
      let { charCode } = e;
      if (!((charCode >= 48 && charCode <= 57) || charCode === 44)) {
        e.preventDefault();
      }
      if (e.target.value.length > 5) {
        e.preventDefault();
      }
    },
    handleCheckPrime() {
      this.gameStatus = 1;
      this.primeFactors = aMath.factors(this.lcmNumber);
    },
    handleCalculateFactors() {
      this.gameStatus = 2;
      this.factors = aMath.divisors(this.lcmNumber);
    },
    handleCalFirstGroupPairs() {
      this.firstGroupPairs = this.factors;
      this.gameStatus = 3;
    },
    handleCalSecondGroupPairs() {
      const factorsAlt = []; // The array to save all factors except the first one(1) and the last one(the number itself)
      this.gameStatus = 4;
      if (this.factors.length <= 2) {
        return;
      }
      for (let i = 1; i < this.factors.length - 1; i++) {
        factorsAlt.push(this.factors[i]);
      }
      const factorsCmb = Combinatorics.combination(factorsAlt, 2);
      let cmb;
      while ((cmb = factorsCmb.next())) {
        if (lcm(cmb[0], cmb[1]) === this.lcmNumber) {
          this.secondGroupPairs.push([cmb[0], cmb[1]]);
        }
      }
    },
    handleReset() {
      this.gameStatus = 0;
      this.lcmNumber = null;
      this.primeFactors = [];
      this.factors = [];
      this.firstGroupPairs = [];
      this.secondGroupPairs = [];
    }
  }
};
</script>

<style scoped>
.app--list {
  height: auto !important;
  max-height: 500px;
  overflow-y: auto;
}
</style>
