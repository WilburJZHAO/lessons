<template>
  <div class="container">
    <h3 class="text-center text-success my-3">Computer solutions</h3>
    <app-input-panel @setGroupsRule="groupsRule=$event" v-if="!groupsRule"></app-input-panel>
    <div v-if="groupsRule">
      <div class="row">
        <div class="col-md-8">
          <div class="d-flex align-items-center justify-content-center">
            <h5 class="mx-2">Test Number</h5>
            <div class="app--input">{{ testNumber}}</div>
          </div>
          <br />
          <div class="d-flex align-items-center justify-content-center mb-3">
            <span class="text-primary">A</span>
            <div
              class="app--input mx-2"
              :class="{
              'text-primary':  hasSolution(testNumber, groupsRule.groupSizeA, groupsRule.leftOverA),
              'text-danger': !hasSolution(testNumber, groupsRule.groupSizeA, groupsRule.leftOverA)
            }"
            >{{ createRule(testNumber, groupsRule.groupSizeA) }}</div>
            Groups of {{ groupsRule.groupSizeA }} with {{ groupsRule.leftOverA }}
          </div>
          <div class="d-flex align-items-center justify-content-center mb-3">
            <span class="text-primary">B</span>
            <div
              class="app--input mx-2"
              :class="{
              'text-primary':  hasSolution(testNumber, groupsRule.groupSizeB, groupsRule.leftOverB),
              'text-danger': !hasSolution(testNumber, groupsRule.groupSizeB, groupsRule.leftOverB)
            }"
            >{{ createRule(testNumber, groupsRule.groupSizeB) }}</div>
            Groups of {{ groupsRule.groupSizeB }} with {{ groupsRule.leftOverB }}
          </div>
          <div
            v-if="groupsRule.groupSizeC"
            class="d-flex align-items-center justify-content-center"
          >
            <span class="text-primary">C</span>
            <div
              class="app--input mx-2"
              :class="{
              'text-primary':  hasSolution(testNumber, groupsRule.groupSizeC, groupsRule.leftOverC),
              'text-danger': !hasSolution(testNumber, groupsRule.groupSizeC, groupsRule.leftOverC)
            }"
            >{{ groupsRule.groupSizeC && createRule(testNumber, groupsRule.groupSizeC) }}</div>
            Groups of {{ groupsRule.groupSizeC }} with {{ groupsRule.leftOverC }}
          </div>

          <div class="text-center mt-5" v-if="testNumber < maxTestNumber">
            <button
              class="btn btn-outline-success mb-2"
              v-if="demoAutoOption==='0'"
              @click="handleCreateGroup"
            >{{ testNumber ? 'Show next group' : 'Show first group' }}</button>
            <button
              class="btn btn-outline-success mb-2"
              v-if="demoAutoOption==='1'"
              @click="handleToggleTimer"
            >{{ timer ? "Pause" : (testNumber ? "Resume" : "Start") }}</button>
            <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
          </div>
          <div v-else class="text-center d-flex justify-content-center">
            <div class="alert alert-danger px-5">Finished!</div>
          </div>
        </div>
        <div class="col-md-4">
          <h5>
            <span v-if="solutions.length > 0">{{solutions.length}}</span>&nbsp;
            <span>Solution</span>
            <span v-if="solutions.length > 1">s</span>
          </h5>
          <ul class="list-group app--list">
            <li class="list-group-item" v-for="solution in solutions" :key="solution">{{ solution }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputPanel from "./InputPanel";
import DemoAutoOption from "../../common/DemoAutoOption";

export default {
  components: {
    appInputPanel: InputPanel,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      groupsRule: null,
      testNumber: null,
      solutions: [],
      demoAutoOption: "0",
      maxTestNumber: 9999,
      timer: null
    };
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    testNumber(value) {
      if (value >= this.maxTestNumber) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    hasSolution(number, groupSize, leftOver) {
      return number % groupSize === leftOver;
    },
    createRule(number, groupSize) {
      if (!number) {
        return null;
      }
      return `${parseInt(number / groupSize)}G + ${number % groupSize}`;
    },
    handleCreateGroup() {
      if (!this.testNumber) {
        this.testNumber = 1;
      } else {
        this.testNumber++;
        if (
          this.hasSolution(
            this.testNumber,
            this.groupsRule.groupSizeA,
            this.groupsRule.leftOverA
          ) &&
          this.hasSolution(
            this.testNumber,
            this.groupsRule.groupSizeB,
            this.groupsRule.leftOverB
          ) &&
          (!this.groupsRule.groupSizeC ||
            this.hasSolution(
              this.testNumber,
              this.groupsRule.groupSizeC,
              this.groupsRule.leftOverC
            ))
        ) {
          this.solutions.push(this.testNumber);
        }
      }
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleCreateGroup, 100);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
.app--input {
  width: 150px;
  border: 1px solid #ccc;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--list {
  height: auto !important;
  max-height: 600px;
  overflow-y: scroll;
}
</style>