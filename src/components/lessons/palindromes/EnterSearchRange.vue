<template>
  <div class="mt-3 container">
    <h3 class="text-center text-success">Enter your number and search range</h3>
    <div class="row mt-3">
      <div class="col-md-5 text-center mb-3">
        <div class="d-flex align-items-center mb-3">
          <label class="mr-3">Start:</label>
          <input
            type="text"
            class="form-control"
            v-model.number="startNumber"
            ref="startNumberInput"
            @keypress="handleCheckInput"
            @focus="handleStart"
          />
        </div>
        <div class="d-flex align-items-center">
          <label class="mr-2">Finish:</label>
          <input
            type="text"
            class="form-control"
            v-model.number="finishNumber"
            ref="finishNumberInput"
            @keypress="handleCheckInput"
            @focus="handleFinish"
          />
        </div>
        <button
          class="btn btn-outline-success mt-3"
          v-if="gameStatus === 0"
          @click="handleOK"
        >
          OK
        </button>

        <div class="text-center mt-3" v-if="gameStatus === 1">
          <button
            class="btn btn-outline-success"
            @click="handleNewPalindrome"
            v-if="demoAutoOption === '0'"
          >
            {{ currentNumber > startNumber === 0 ? "First" : "Next" }}
            palindrome
          </button>
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption === '1'"
            @click="handleToggleTimer"
          >
            {{
              currentNumber > startNumber === 0
                ? "Tap here to begin"
                : timer
                ? "Tap here to pause"
                : "Tap here to resume"
            }}
          </button>
          <app-demo-auto-option
            @changeOption="demoAutoOption = $event"
            :option="demoAutoOption"
            class="mt-2"
          ></app-demo-auto-option>
        </div>

        <div class="text-center mt-3" v-if="gameStatus === 2">
          <button class="btn btn-outline-success" @click="handleReset">
            Reset
          </button>
        </div>
        <p class="text-center text-danger mt-2">{{ message }}</p>
        <app-addition :additionNumber="additionNumber"></app-addition>

        <div class="mt-4 d-flex justify-content-around" v-if="gameStatus >= 1">
          <button class="btn btn-outline-dark" @click="handleFindMax">
            Maximum
          </button>
          <button class="btn btn-outline-dark" @click="handleClear">
            Clear
          </button>
        </div>
      </div>
      <div class="col-md-7">
        <app-number-table
          :tableData="numberTableData"
          @selectData="selectedIndex = $event"
          :selectedIndex="selectedIndex"
        ></app-number-table>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <app-addition-table :tableData="additionTableData"></app-addition-table>
      </div>
    </div>
  </div>
</template>

<script>
import { MESSAGE, isPanlindrome, getReverse, addTwoNumbers } from "./utils";
import Addition from "./Addition.vue";
import AdditionTable from "./AdditionTable.vue";
import NumberTable from "./NumberTable.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";

export default {
  components: {
    appAddition: Addition,
    appAdditionTable: AdditionTable,
    appNumberTable: NumberTable,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      gameStatus: 0,
      // 0 - ready for start
      // 1 - addition
      // 2 - panlindrome found
      demoAutoOption: "0",
      message: "",
      palindromeData: [],
      startNumber: null,
      finishNumber: null,
      currentNumber: null,
      timer: null,
      selectedIndex: null,
      additionNumber: null
    };
  },
  computed: {
    maxFinishNumber() {
      if (this.startNumber) {
        return this.startNumber + 100;
      }
      return null;
    },
    additionTableData() {
      let tableData = [];
      if (
        this.palindromeData[this.selectedIndex] &&
        this.palindromeData[this.selectedIndex].additionNumber > 0
      ) {
        tableData.push({
          number: this.palindromeData[this.selectedIndex].prevNumber,
          addition: this.palindromeData[this.selectedIndex].reversedPrevNumber,
          currentNumber: this.palindromeData[this.selectedIndex].currentNumber
        });
      }
      return tableData;
    },
    numberTableData() {
      let tableData = [];
      for (let i = 0; i < this.palindromeData.length; i++) {
        tableData.push({
          number: this.palindromeData[i].originalNumber,
          additionNumber: this.palindromeData[i].additionNumber
        });
      }
      return tableData;
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        this.clearTimer();
      }
    },
    selectedIndex(value) {
      if (!this.palindromeData[value]) {
        return;
      }
      if (this.palindromeData[value].additionNumber > 0) {
        this.message = "";
        this.additionNumber = this.palindromeData[value].additionNumber;
      } else {
        this.additionNumber = null;
        this.message = `${this.palindromeData[value].originalNumber} is a palindrome`;
      }
    }
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    handleCheckInput(e) {
      let { charCode } = e;
      if (!((charCode >= 48 && charCode <= 57) || charCode === 44)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 14) {
        e.preventDefault();
      }
    },

    handleStart() {
      this.message = MESSAGE.INPUT_PROMPT;
    },
    handleFinish() {
      if (this.startNumber) {
        this.message = MESSAGE.INPUT_FINISH_PROMPT(
          this.startNumber,
          this.maxFinishNumber
        );
      } else {
        this.message = MESSAGE.INPUT_PROMPT;
      }
    },

    handleOK() {
      if (!this.startNumber) {
        this.message = MESSAGE.INPUT_PROMPT;
        this.$refs.startNumberInput.select();
        return;
      }
      if (
        this.startNumber &&
        (this.finishNumber < this.startNumber ||
          this.finishNumber > this.maxFinishNumber)
      ) {
        this.message = MESSAGE.INPUT_FINISH_PROMPT(
          this.startNumber,
          this.maxFinishNumber
        );
        this.$refs.finishNumberInput.select();
        return;
      }
      this.currentNumber = this.startNumber;
      this.gameStatus = 1;
      this.message = "";
    },

    calculatePalindrome(number) {
      let originalNumber = number;
      let currentNumber = number;
      let prevNumber = number;
      let reversedPrevNumber = 0;
      let additionNumber = 0;
      let palindromeObj = {};
      while (!isPanlindrome(currentNumber) && additionNumber <= 175) {
        additionNumber++;
        prevNumber = currentNumber;
        reversedPrevNumber = getReverse(prevNumber);
        currentNumber = addTwoNumbers(currentNumber, getReverse(currentNumber));
      }
      palindromeObj = {
        originalNumber,
        currentNumber,
        prevNumber,
        additionNumber,
        reversedPrevNumber
      };
      return palindromeObj;
    },

    handleNewPalindrome() {
      this.palindromeData.push(this.calculatePalindrome(this.currentNumber));
      this.currentNumber++;
      if (this.currentNumber > this.finishNumber) {
        this.gameStatus = 2;
        this.message = MESSAGE.FINISH;
        this.clearTimer();
      }
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleNewPalindrome, 100);
      } else {
        this.clearTimer();
      }
    },
    handleReset() {
      this.gameStatus = 0;
      this.demoAutoOption = "0";
      this.startNumber = null;
      this.finishNumber = null;
      this.currentNumber = null;
      this.message = "";
      this.selectedIndex = null;
      this.additionNumber = null;
      this.clearTimer();
    },

    handleFindMax() {
      let maxIndex = 0;
      let maxAddition = this.palindromeData[0].additionNumber;
      for (let i = 0; i < this.palindromeData.length; i++) {
        if (this.palindromeData[i].additionNumber > maxAddition) {
          maxAddition = this.palindromeData[i].additionNumber;
          maxIndex = i;
        }
      }
      this.selectedIndex = maxIndex;
    },
    handleClear() {
      this.palindromeData = [];
      this.selectedIndex = null;
      this.message = "";
      this.additionNumber = null;
    }
  },
  created() {
    this.message = MESSAGE.INPUT_PROMPT;
  },
  destroyed() {
    this.clearTimer();
  }
};
</script>

<style scoped></style>
