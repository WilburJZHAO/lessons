<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">
      The number of times each product occurs - {{ legify(trialNumber) }} trials
    </h3>
    <hr class="subheading-separator">
    <h5 class="text-center">Trial {{ legify(numberOfTrials) }}</h5>
    <div class="app--table">
      <div
        class="app--table-row"
        v-for="(item, index) in numberOccursTable"
        :key="index"
        :class="{'text-danger': index<=5, 'text-info': index>5 && index<=11, 'text-success': index>11}"
      >
        <div class="app--table-item app--table-item-product">{{ item.product }}</div>
        <div class="app--table-item app--table-item-times">
          <span v-if="isStart">{{ item.times }}</span>
        </div>
        <div style="padding: 0;" class="app--table-item app--table-item-bar">
          <div
            v-if="isStart"
            class="app--table-bar"
            :class="{'bg-danger': index<=5, 'bg-info': index>5 && index<=11, 'bg-success': index>11}"
            :style="{width: item.times*widthUnit+'px'}"
          >&nbsp;</div>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption=='0' && !isEnd"
        @click="handlePlayOneGame"
      >{{ isStart ? "Next game" : "First game" }}</button>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption=='1' && !isEnd"
        @click="handleToggleTimer"
      >
        {{ !isStart ? 'Start' :
        ( timer ? "Pause" : "Resume")
        }}
      </button>
      <button class="btn btn-outline-dark" v-if="isEnd" @click="handleReset">Reset</button>
      <app-demo-auto-option
        :option="demoAutoOption"
        class="mt-1"
        @changeOption="demoAutoOption=$event"
      ></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "../../common/DemoAutoOption";
import { throwDiceOnce } from "./utils";
import { calculateTimerInterval, legify } from "../../common/utils";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  props: ["trialNumber"],
  data: function() {
    return {
      numberOccursTable: [],
      demoAutoOption: "1",
      isStart: false,
      isEnd: false,
      timer: null,
      numberOfTrials: 0
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    widthUnit() {
      if (this.trialNumber <= 100) {
        return 5;
      } else if (this.trialNumber <= 500) {
        return 2;
      } else if (this.trialNumber <= 1000) {
        return 1.5;
      } else if (this.trialNumber <= 5000) {
        return 0.3;
      } else {
        return 0.2;
      }
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    isEnd(value) {
      if (value) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    legify,
    handlePlayOneGame() {
      if (!this.isStart) this.isStart = true;
      let product = throwDiceOnce() * throwDiceOnce();
      let index = this.numberOccursTable.findIndex(item => {
        return item.product === product;
      });
      this.numberOccursTable[index].times += 1;
      this.numberOccursTable = [...this.numberOccursTable];
      this.numberOfTrials++;
      if (this.numberOfTrials >= this.trialNumber) {
        this.isEnd = true;
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlayOneGame, this.timerInterval);
      }
    },
    handleReset() {
      this.initializeNumberOccursTable();
      this.isStart = false;
      this.isEnd = false;
      this.numberOfTrials = 0;
    },
    initializeNumberOccursTable() {
      this.numberOccursTable = [
        { product: 8, times: 0 },
        { product: 9, times: 0 },
        { product: 10, times: 0 },
        { product: 12, times: 0 },
        { product: 15, times: 0 },
        { product: 16, times: 0 },
        { product: 1, times: 0 },
        { product: 2, times: 0 },
        { product: 3, times: 0 },
        { product: 4, times: 0 },
        { product: 5, times: 0 },
        { product: 6, times: 0 },
        { product: 18, times: 0 },
        { product: 20, times: 0 },
        { product: 24, times: 0 },
        { product: 25, times: 0 },
        { product: 30, times: 0 },
        { product: 36, times: 0 }
      ];
    }
  },
  created() {
    this.initializeNumberOccursTable();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--table {
  max-width: 500px;
  margin: 0 auto;
}
.app--table-row {
  display: flex;
}
.app--table-item {
  border: 1px solid #ccc;
  height: 40px;
}
.app--table-item-product {
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--table-item-times {
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--table-item-bar {
  flex: 1;
  border: none;
}
.app--table-bar {
  height: 100%;
  border: 1px solid #888;
}

@media only screen and (max-width: 576px) {
  .app--table-item-product {
    width: 25px;
  }
  .app--table-item-times {
    width: 35px;
  }
}
</style>
