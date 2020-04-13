<template>
  <div class="container  mt-4 mb-5">
    <h3 class="lesson-subheading">Solve a problem</h3>
    <hr class="subheading-separator">
    <app-input-panel @setGroupsRule="groupsRule=$event" v-if="!groupsRule"></app-input-panel>
    <div v-if="groupsRule">
      <div class="d-flex justify-content-center mt-3">
        <form @submit="(e) => {e.preventDefault(); this.handleTestNumber()}">
          <label>What number do you want to test?</label>
          <input
            type="number"
            class="form-control"
            v-model.number="testNumber"
            ref="inputTestNumber"
          />
          <div class="text-center">
            <div
              class="badge badge-danger mb-3"
              v-if="!(testNumber<=99999 && testNumber>=2)"
            >Enter a test number between 2 and 99999</div>
            <div class="badge badge-danger mb-3" v-if="testedNumber">{{testedNumber}} already tested</div>
            <br />
            <button
              type="button"
              class="btn btn-outline-success mb-3"
              :disabled="!(testNumber<=99999 && testNumber>=2) "
              @click="handleTestNumber"
            >OK</button>
          </div>
        </form>
      </div>
      <div class="app--test-result row mt-3">
        <div class="row col-md-9">
          <div class="col-sm-3 mb-3">
            <p class="font-weight-bold">Number tested</p>
            <ul class="list-group app--list">
              <li class="list-group-item" v-for="number in numberTested" :key="number">{{ number }}</li>
            </ul>
          </div>
          <div class="col-sm-3 mb-3">
            <p
              class="font-weight-bold"
            >Groups of {{groupsRule.groupSizeA}} + {{ groupsRule.leftOverA }}</p>
            <ul class="list-group app--list">
              <li class="list-group-item" v-for="(item, index) in groupsA" :key="index">
                <span
                  :class="{'text-danger': (numberTested[index]%groupsRule.groupSizeA)!==groupsRule.leftOverA, 'text-primary': (numberTested[index]%groupsRule.groupSizeA)===groupsRule.leftOverA}"
                >{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="col-sm-3 mb-3">
            <p
              class="font-weight-bold"
            >Groups of {{groupsRule.groupSizeB}} + {{ groupsRule.leftOverB }}</p>
            <ul class="list-group app--list">
              <li class="list-group-item" v-for="(item, index) in groupsB" :key="index">
                <span
                  :class="{'text-danger': (numberTested[index]%groupsRule.groupSizeB)!==groupsRule.leftOverB, 'text-primary': (numberTested[index]%groupsRule.groupSizeB)===groupsRule.leftOverB}"
                >{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="col-3" v-if="groupsRule.groupSizeC">
            <p
              class="font-weight-bold"
            >Groups of {{groupsRule.groupSizeC}} + {{ groupsRule.leftOverC }}</p>
            <ul class="list-group app--list">
              <li class="list-group-item" v-for="(item, index) in groupsC" :key="index">
                <span
                  :class="{'text-danger': (numberTested[index]%groupsRule.groupSizeC)!==groupsRule.leftOverC, 'text-primary': (numberTested[index]%groupsRule.groupSizeC)===groupsRule.leftOverC}"
                >{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-3">
          <p class="font-weight-bold">Solutions</p>
          <ul class="list-group app--list">
            <li class="list-group-item" v-for="(item, index) in solutions" :key="index">
              <span
                :class="{'text-danger': solutions[index]==='No solution', 'text-primary': typeof(solutions[index])==='number'}"
              >{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputPanel from "./InputPanel";
export default {
  components: {
    appInputPanel: InputPanel
  },
  data: function() {
    return {
      groupsRule: null,
      testNumber: null,
      numberTested: [],
      groupsA: [],
      groupsB: [],
      groupsC: [],
      solutions: [],
      testedNumber: null
    };
  },
  watch: {
    testNumber(value, prevValue) {
      if (value !== prevValue) {
        this.testedNumber = null;
      }
    }
  },
  methods: {
    handleTestNumber() {
      if (this.numberTested.indexOf(this.testNumber) !== -1) {
        this.testedNumber = this.testNumber;
        return;
      } else {
        this.testedNumber = null;
      }

      let hasGroupsASolution,
        hasGroupsBSolution,
        hasGroupsCSolution = false;

      this.numberTested.push(this.testNumber);
      // Test A's group size and left over
      this.groupsA.push(
        this.createRule(this.testNumber, this.groupsRule.groupSizeA)
      );
      hasGroupsASolution = this.hasSolution(
        this.testNumber,
        this.groupsRule.groupSizeA,
        this.groupsRule.leftOverA
      );
      // Test B's group size and left over
      this.groupsB.push(
        this.createRule(this.testNumber, this.groupsRule.groupSizeB)
      );
      hasGroupsBSolution = this.hasSolution(
        this.testNumber,
        this.groupsRule.groupSizeB,
        this.groupsRule.leftOverB
      );

      // Test C's group size and left over if C is added.
      if (this.groupsRule.groupSizeC) {
        this.groupsC.push(
          this.createRule(this.testNumber, this.groupsRule.groupSizeC)
        );
        hasGroupsCSolution = this.hasSolution(
          this.testNumber,
          this.groupsRule.groupSizeC,
          this.groupsRule.leftOverC
        );
      }

      // Check if there's solution
      if (
        hasGroupsASolution &&
        hasGroupsBSolution &&
        (!this.groupsRule.groupSizeC ||
          (hasGroupsCSolution && this.groupsRule.groupSizeC))
      ) {
        this.solutions.push(this.testNumber);
      } else {
        this.solutions.push("No solution");
      }
      this.testNumber = null;
      this.$refs.inputTestNumber.focus();
    },
    hasSolution(number, groupSize, leftOver) {
      return number % groupSize === leftOver ? true : false;
    },
    createRule(number, groupSize) {
      return `${parseInt(number / groupSize)}G + ${number % groupSize}`;
    }
  }
};
</script>

<style scoped>
.app--list {
  height: auto !important;
  max-height: 600px;
  overflow-y: auto;
}
.app--test-result p {
  height: 50px;
  display: flex;
  align-items: flex-end;
}
</style>