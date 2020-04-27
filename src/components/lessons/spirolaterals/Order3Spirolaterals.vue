<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Order 3 Spirolaterals</h3>
    <hr class="subheading-separator" />
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="col-3 mb-3" v-for="(rule, index) in rules" :key="index">
            <app-board
              :order="order"
              :currentOrder="currentOrder"
              :status="status"
              :drawGrid="false"
              :id="index"
              :rule="rule"
              :reset="false"
              :active="rule===selectedRule"
            ></app-board>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <h5 class="text-primary">Order 3 rule</h5>
        <div v-for="(rule, index) in rules" :key="`rule${index}`" class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            :id="`rule${index}`"
            :disabled="selectedRules.indexOf(rule) >= 0 || status === 1 || status === 2 "
            @click="handleSelectRule(rule)"
          />
          <label :for="`rule${index}`">{{ rulesWords[index] }}</label>
        </div>
      </div>
    </div>
    <div class="app--container">
      <app-board
        :order="order"
        :currentOrder="currentOrder"
        :status="status"
        :drawGrid="true"
        :id="-1"
        :rule="selectedRule"
        :reset="true"
        :active="true"
        @drawSuccess="handleDrawSuccess"
        @drawFailure="handleDrawFailure"
        @drawing="isDrawing=$event"
      ></app-board>
    </div>
    <div class="mb-3"></div>
    <div class="text-center">
      <div
        v-if="status===0 || status === 3"
        class="text-danger"
      >{{ selectedRules.length < 8 ? 'Choose an order 3 rule to draw' : 'All order 3 Spirolaterals have been drawn'}}</div>
      <div v-if="status === 1 || status===2">
        <button
          class="btn btn-outline-success"
          v-if="demoAutoOption==='0'"
          @click="handleDrawing"
        >Tap here to begin drawing</button>
        <button
          class="btn btn-outline-success"
          v-if="demoAutoOption==='1'"
          @click="handleToggleTimer"
        >
          {{
          status===1 ? 'Tap here to begin'
          : timer ?
          'Tap here to pause' : 'Tap here to resume'
          }}
        </button>
        <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
export default {
  components: {
    appBoard: Board,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      order: 3,
      currentOrder: 0,
      status: 0,
      // 0 - not started, 1 - rule selected, ready to start, 2 - draw is running, 3 - finished
      demoAutoOption: "0",
      timer: null,
      isDrawing: false,
      rules: ["LLL", "LLR", "LRL", "LRR", "RLL", "RLR", "RRL", "RRR"],
      selectedRules: [],
      selectedRule: null
    };
  },
  computed: {
    rulesWords() {
      const words = [];
      this.rules.forEach(rule => {
        const word = rule
          .split("")
          .map(el => (el === "L" ? "Left" : "Right"))
          .join(" ");
        words.push(word);
      });
      return words;
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if ((value === 0 || value === 3) && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleSelectRule(e) {
      // console.log(e);
      this.selectedRule = e;
      this.selectedRules.push(this.selectedRule);
      this.status = 1;
    },
    handleDrawing() {
      if (this.status === 1) {
        this.status = 2;
      }
      if (this.isDrawing) {
        return;
      }
      this.currentOrder++;
    },
    handleDrawSuccess() {
      this.status = 0;
    },
    handleDrawFailure() {},
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleDrawing, 100);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }
};
</script>

<style scoped>
.app--container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
