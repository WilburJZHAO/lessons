<template>
  <div
    class="app--cal"
    :class="{'app--cal-disabled': isDisable || (numberToCheck && numberToCheck==numberCal)}"
  >
    <div class="app--cal-inner">
      <div class="app--cal-input">
        <div class="app--cal-input-operator">{{ operator }}</div>
        <div class="app--cal-input-number">
          {{ legify(numberCal) }}
          <i
            v-if="numberToCheck && numberToCheck==numberCal"
            class="fas fa-check text-success"
          ></i>
        </div>
      </div>
      <div class="app--cal-panel">
        <div class="app--cal-row">
          <div class="app--cal-button" @click="handleReset">C</div>
          <div class="app--cal-button" @click="handleMinus">-</div>
          <div class="app--cal-button" @click="handlePlus">+</div>
        </div>
        <div class="app--cal-row">
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(7) }"
          >7</div>
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(8) }"
          >8</div>
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(9) }"
          >9</div>
        </div>
        <div class="app--cal-row">
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(4) }"
          >4</div>
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(5) }"
          >5</div>
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(6) }"
          >6</div>
        </div>
        <div class="app--cal-row">
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(1) }"
          >1</div>
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(2) }"
          >2</div>
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(3) }"
          >3</div>
        </div>
        <div class="app--cal-row">
          <div
            class="app--cal-button"
            @click="() => { if(isDisable) return; handlePressNumber(0) }"
          >0</div>
          <div class="app--cal-button" style="visibility: hidden;">-</div>
          <div class="app--cal-button" @click="handleCalculate">=</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { legify } from "../../common/utils.js";

export default {
  props: [
    "calNumber",
    "form",
    "isDisable",
    "countingSet",
    "numberToCheck",
    "isCreatingNewNumber"
  ],
  data: function() {
    return {
      numberCalArr: [],
      tempNumber: null,
      // isDisable: false,
      operator: null,
      hasOperator: false
    };
  },
  computed: {
    numberCal() {
      return Number(this.numberCalArr.join(""));
    }
  },
  watch: {
    numberCal(value) {
      if (this.numberToCheck && this.numberToCheck == value) {
        this.$emit("setCalNumber", { value, inputCorrect: true });
      }
    },
    isCreatingNewNumber(value, prevValue) {
      if (prevValue === false && value === true) {
        this.numberCalArr = [];
      }
    },
    calNumber(value) {
      if (!value) {
        // console.log("value", value);
        this.numberCalArr = [];
        return;
      }
      let number = Number(value);
      if (number > 0) {
        const numberArr = number.toString().split("");
        this.numberCalArr = [...numberArr];
      }
    }
  },
  methods: {
    legify,
    handleReset() {
      if (this.isDisable) return;
      this.operator = null;
      this.numberCalArr = [];
      this.tempNumber = null;
    },
    handlePlus() {
      if (this.isDisable) return;
      if (this.operator === "-") {
        this.operator = "+";
        return;
      }
      this.operator = "+";
      this.hasOperator = true;
      if (this.tempNumber === null) {
        this.tempNumber = this.numberCal;
      } else {
        // this.number2 = this.numberCal;
        let result = this.tempNumber + this.numberCal;
        this.numberCalArr = result.toString().split("");
        this.tempNumber = result;
      }
    },
    handleMinus() {
      if (this.isDisable) return;
      if (this.operator === "+") {
        this.operator = "-";
        return;
      }
      this.operator = "-";
      this.hasOperator = true;
      if (this.tempNumber === null) {
        this.tempNumber = this.numberCal;
      } else {
        // this.hasOperator = false;
        // this.number2 = this.numberCal;
        let result = this.tempNumber - this.numberCal;
        this.numberCalArr = result.toString().split("");
        this.tempNumber = result;
      }
    },
    handlePressNumber(number) {
      if (this.isDisable) return;
      // console.log(number);
      if (this.numberCalArr.length >= 5) {
        return;
      }
      if (this.hasOperator) {
        this.numberCalArr = [];
        this.hasOperator = false;
      }
      this.numberCalArr.push(number);
      // console.log(this.numberCalArr.join(''));
      // this.$emit("setCalNumber", Number(this.numberCalArr.join("")));
    },
    handleCalculate() {
      if (this.isDisable) return;
      if (this.tempNumber !== null && this.numberCal && this.operator) {
        let result;
        switch (this.operator) {
          case "+":
            result = this.tempNumber + this.numberCal;
            break;
          case "-":
            result = this.tempNumber - this.numberCal;
            break;
          default:
            break;
        }
        // console.log(result);
        this.numberCalArr = result.toString().split("");
        this.tempNumber = null;
        this.operator = null;
        this.$emit("setCalNumber", result);
      }
    }
  }
};
</script>

<style scoped>
.app--cal {
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: auto;
  width: 12rem;
  margin: 0 auto;
  background-color: #4fccfc;
  border-radius: 1rem;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--cal-inner {
  width: 80%;
  height: 90%;
}
.app--cal-input {
  height: auto;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0 0.5rem;
  background-color: #fceaec;
  cursor: default;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
}
.app--cal-input-operator {
  height: 0.8rem;
  font-size: 0.8rem;
}
.app--cal-input-number {
  position: relative;
  font-size: 1.6rem;
}
.app--cal-input-number i {
  position: absolute;
  top: 25%;
}
.app--cal-panel {
  margin-top: 9px;
}
.app--cal-row {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.app--cal-button {
  cursor: default;
  font-size: 1.8rem;
  font-weight: 800;
  background-color: #ffef42;
  color: #222;
  width: 30%;
  height: 0;
  padding-bottom: 30%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  cursor: pointer;
}
.app--cal-disabled .app--cal-button {
  color: #808080;
  cursor: default;
}

@media only screen and (max-width: 425px) {
  .app--cal-button {
    font-size: 1.4rem;
  }
}
</style>
