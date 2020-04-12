<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Fill the cookies</h3>
    <hr class="subheading-separator">
    <app-input
      @setCookie="($event) => {this.cookieSet=$event; this.gameStatus = 0;}"
      v-if="gameStatus===-1"
      :originalCookieSet="cookieSet"
    ></app-input>
    <div v-else>
      <h3
        class="text-center text-success mb-5"
      >{{ cookieSet.cookieNumber }} cookies: Minimum of {{ cookieSet.chipNumber }} chocolate chips</h3>
      <h5 class="text-center">
        Number of chips:
        <span class="text-danger">{{ chipNumber }}</span>
      </h5>
      <div style="height: 50vh">
        <div v-for="i in cookieSet.cookieNumber" :key="i" class="row mb-2">
          <div class="col-1 d-flex justify-content-between">
            <div class="text-primary">{{ resultData[i-1] }}</div>
            <div>{{ i }}</div>
          </div>
          <div class="col-11 d-flex">
            <div
              v-for="k in resultData[i-1]"
              :key="`${i}-${k}`"
              class="app--chip mr-1"
              :class="{'app--chip-extra': k > cookieSet.chipNumber }"
            ></div>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="gameStatus === 0">
        <button
          class="btn btn-outline-success"
          @click="handleNext"
          v-if="demoAutoOption==='0'"
        >Show {{ chipNumber === 0 ? 'first' : 'next' }} chocolate chip</button>
        <button
          class="btn btn-outline-success"
          @click="handleToggleTimer"
          v-if="demoAutoOption==='1'"
        >{{ chipNumber === 0 ? 'Start' : timer ? 'Pause' : 'Resume' }}</button>
        <app-demo-auto-option
          @changeOption="demoAutoOption = $event"
          :option="demoAutoOption"
          class="mt-2"
        ></app-demo-auto-option>
      </div>
      <div class="text-center" v-if="gameStatus===1">
        <div
          class="alert alert-danger"
        >Finished. All cookies have at least {{ cookieSet.chipNumber }} chocolate chips.</div>
        <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./Input.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { pickNumber } from "./utils";
export default {
  components: {
    appInput: Input,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      gameStatus: -1,
      // 0 - ready for start,
      // 1 - end
      cookieSet: null,
      chipNumber: 0,
      demoAutoOption: "0",
      timer: null,
      resultData: []
    };
  },
  computed: {
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
    },
    /** The minimum number in resultData array */
    minNumber() {
      let min = this.resultData[0];
      for (let i = 0; i < this.resultData.length; i++) {
        if (this.resultData[i] < min) {
          min = this.resultData[i];
        }
      }
      return min;
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
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleNext() {
      if (this.resultData.length === 0) {
        this.resultData = [...this.originalData];
      }
      let pickedNumber = pickNumber(1, this.cookieSet.cookieNumber);
      this.resultData[pickedNumber - 1]++;
      this.resultData = [...this.resultData];
      this.chipNumber++;
      if (this.minNumber === this.cookieSet.chipNumber) {
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
      this.chipNumber = 0;
      this.demoAutoOption = "0";
      this.resultData = [];
    }
  },
  unmounted() {
    this.clearTimer();
  }
};
</script>

<style scoped>
.app--cookie-container {
  height: 35px;
  display: flex;
}
.app--chip {
  height: 100%;
  width: 15px;
  background: #804000;
  margin-right: 1rem;
}
.app--chip-extra {
  background: #0099ff;
}
</style>
