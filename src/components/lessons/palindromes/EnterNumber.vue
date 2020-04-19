<template>
  <div class="mt-3 container">
    <h3 class="lesson-subheading">Enter your number</h3>
    <hr class="subheading-separator">
    <div class="row mt-3">
      <div class="col-md-5 text-center mb-3">
        <div class="d-flex align-items-center">
          <label class="mr-2">Start</label>
          <input
            type="text"
            class="form-control"
            v-model.number="startNumber"
            @keypress="handleCheckInput"
          />
        </div>
        <button class="btn btn-outline-success mt-3" v-if="gameStatus===0" @click="handleOK">OK</button>

        <div class="text-center mt-3" v-if="gameStatus===1">
          <button
            class="btn btn-outline-success"
            @click="handleAddition"
            v-if="demoAutoOption==='0'"
          >Calculate {{ additionNumber === 0 ? 'first' : 'next'}} addition</button>
          <button
            class="btn btn-outline-success"
            @click="handleToggleTimer"
            v-if="demoAutoOption==='1'"
          >{{ additionNumber === 0 ? 'Start' : (timer ? 'Pause' : 'Resume') }}</button>
          <app-demo-auto-option
            @changeOption="demoAutoOption = $event"
            :option="demoAutoOption"
            class="mt-2"
          ></app-demo-auto-option>
        </div>

        <div class="text-center mt-3" v-if="gameStatus===2">
          <button class="btn btn-outline-success" @click="handleReset">Reset</button>
        </div>
        <p class="text-center text-danger mt-2">{{ message }}</p>
        <app-addition :additionNumber="additionNumber"></app-addition>
      </div>
      <div class="col-md-7">
        <app-number-table :tableData="numberTableData"></app-number-table>
      </div>
    </div>
    <div class="row mt-2">
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
      numberTableData: [],
      additionTableData: [],
      startNumber: null,
      currentNumber: null,
      additionNumber: 0,
      timer: null
    };
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        this.clearTimer();
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
    handleOK() {
      if (this.startNumber <= 0) {
        this.message = MESSAGE.INPUT_PROMPT;
        return;
      }
      if (isPanlindrome(this.startNumber)) {
        // The input number itself happens to be a palindrome.
        this.message = MESSAGE.CONFIRM_PALINDROME;
        this.gameStatus = 2;
        return;
      }

      this.message = "";
      this.currentNumber = this.startNumber;
      let data = {
        number: this.startNumber,
        additionNumber: this.additionNumber
      };
      this.numberTableData.push(data);
      this.gameStatus = 1;
    },
    handleAddition() {
      this.additionNumber++;
      this.numberTableData[this.numberTableData.length - 1].additionNumber++;

      let temp = this.currentNumber;
      let reverseNumber = getReverse(this.currentNumber);
      this.currentNumber = addTwoNumbers(
        String(this.currentNumber),
        String(reverseNumber)
      );
      let data = {
        number: temp,
        addition: reverseNumber,
        currentNumber: this.currentNumber
      };
      this.additionTableData.push(data);

      if (isPanlindrome(this.currentNumber)) {
        this.message = MESSAGE.PALINDROME_FOUND(this.additionNumber);
        this.gameStatus = 2;
        this.clearTimer();
      }
      if (this.additionNumber > 175) {
        this.message = MESSAGE.PALINDROME_NOT_FOUND;
        this.gameStatus = 2;
        this.clearTimer();
      }
    },
    handleReset() {
      this.gameStatus = 0;
      this.startNumber = null;
      this.additionNumber = 0;
      this.additionTableData = [];
      this.message = MESSAGE.INPUT_PROMPT;
      this.clearTimer();
    },

    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleAddition, 100);
      } else {
        this.clearTimer();
      }
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
