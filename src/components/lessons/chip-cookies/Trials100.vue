<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Stem and leaf plot of 100 trial batches</h3>
    <hr class="subheading-separator">
    <app-input
      @setCookie="($event) => {this.cookieSet=$event; this.gameStatus = 0;}"
      v-if="gameStatus===-1"
      :originalCookieSet="cookieSet"
    ></app-input>
    <div v-else>
      <h3
        class="text-center text-success"
      >{{ cookieSet.cookieNumber }} cookies: Minimum of {{ cookieSet.chipNumber }} chocolate chips</h3>
      <h5 class="text-center">
        Minimum:
        <span class="text-danger">{{ minBatchNumber }}</span>
      </h5>
      <h5 class="text-center">
        Maximum:
        <span class="text-danger">{{ maxBatchNumber }}</span>
      </h5>
      <h5 class="text-center">
        Batch number:
        <span class="text-danger" v-if="batchNumber > 0">{{ batchNumber }}</span>
      </h5>
      <div class="mb-4">
        <div class="d-flex mb-2" v-for="(row, index) in batchData" :key="index">
          <div class="mr-2">{{ (index + 1 ===batchData.length) ? '>' : index+startNumber }}</div>
          <div
            class="text-primary py-1 px-2 ml-3"
            style="border: 1px solid yellow; width: 100%; min-height: 35px;"
          >{{ row.join(' ') }}</div>
        </div>
      </div>
      <div class="text-center" v-if="gameStatus===0">
        <button
          class="btn btn-outline-success"
          @click="handleNext"
          v-if="demoAutoOption==='0'"
        >Show {{ batchNumber === 0 ? 'first' : 'next' }} batch</button>
        <button
          class="btn btn-outline-success"
          @click="handleToggleTimer"
          v-if="demoAutoOption==='1'"
        >{{ batchNumber === 0 ? 'Start' : timer ? 'Pause' : 'Resume' }}</button>
        <app-demo-auto-option
          @changeOption="demoAutoOption = $event"
          :option="demoAutoOption"
          class="mt-2"
        ></app-demo-auto-option>
      </div>
      <div class="text-center" v-if="gameStatus===1">
        <div class="alert alert-danger">Finished 100 batches</div>
        <button class="btn btn-outline-dark" @click="handleReset">Tap here to reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./Input.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { pickNumber, minInArray } from "./utils";
export default {
  components: {
    appInput: Input,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      gameStatus: -1,
      // -1 - for select
      // 0 - ready for start
      // 1 - finish
      cookieSet: null,
      batchNumber: 0,
      minBatchNumber: '',
      maxBatchNumber: '',
      demoAutoOption: "0",
      timer: null,
      resultData: [],
      batchData: [],

      MAX_TRIALS: 100
    };
  },
  computed: {
    startNumber() {
      if (!this.cookieSet) {
        return 0;
      }
      return Math.floor(
        (this.cookieSet.cookieNumber * this.cookieSet.chipNumber) / 10
      );
    },
    originalData() {
      if (!this.cookieSet) {
        return [];
      } else {
        let arr = [];
        for (let i = 0; i < this.cookieSet.cookieNumber; i++) {
          arr.push(0);
        }
        return arr;
      }
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        this.clearTimer();
      }
    }
  },
  methods: {
    initBatchData() {
      this.batchData = [];
      for (let i = 1; i <= 12; i++) {
        this.batchData.push([]);
      }
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleNext() {
      let count = 0;
      let minNumber = 0;
      this.resultData = [...this.originalData];
      while (minNumber < this.cookieSet.chipNumber) {
        let pickedNumber = pickNumber(1, this.cookieSet.cookieNumber);
        this.resultData[pickedNumber - 1]++;
        count++;
        minNumber = minInArray(this.resultData);
      }
      if (this.maxBatchNumber === '' || count > this.maxBatchNumber) {
        this.maxBatchNumber = count;
      }
      if (this.minBatchNumber === '' || count < this.minBatchNumber) {
        this.minBatchNumber = count;
      }
      let stem = Math.floor(count / 10) - this.startNumber;
      if (stem >= this.batchData.length - 1) {
        stem = this.batchData.length - 1;
      }
      let leaf = count % 10;
      this.batchData[stem].push(leaf);
      this.batchNumber++;
      // this.batchData = [...this.batchData];
      if (this.batchNumber >= this.MAX_TRIALS) {
        this.gameStatus = 1;
        this.clearTimer();
      }
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleNext, 100);
      } else {
        this.clearTimer();
      }
    },
    handleReset() {
      this.gameStatus = -1;
      // this.cookieSet = null;
      this.batchNumber = 0;
      this.minBatchNumber = '';
      this.maxBatchNumber = '';
      this.demoAutoOption = "0";
      this.resultData = [];
      this.initBatchData();
    }
  },
  created() {
    this.initBatchData();
  }
};
</script>

<style scoped></style>
