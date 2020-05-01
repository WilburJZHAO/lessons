<template>
  <div>
    <div style="max-width: 450px; margin: 0 auto;">
      <h5 class="text-danger">Strategies</h5>
      <div class="form-check" v-for="(value) in STRATEGY" :key="value">
        <input
          type="radio"
          class="form-check-input"
          v-model="selectedStrategy"
          :id="value"
          :value="value"
        />
        <label :for="value" class="text-capitalize">{{ value }}</label>
      </div>
      <div
        class="form-check"
        :style="{visibility: selectedStrategy === STRATEGY.BF || selectedStrategy === STRATEGY.WF ? 'hidden' : 'visible'}"
      >
        <input type="checkbox" class="form-check-input" id="lookAhead" v-model="lookAhead" />
        <label for="lookAhead" class="form-check-label">Look one move ahead for a dead end?</label>
      </div>
    </div>
    <div class="app--enter-number form-group row mt-5" v-if="enterTrialNumber">
      <label
        for="trial-numbers"
        class="col-form-label col-sm-6"
      >Enter the number of trials(1 - 10000):</label>
      <div class="col-sm-6">
        <input type="number" class="form-control" v-model.number="trialNumber" required />
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-outline-success" @click="handleOk" :disabled="!isValidInput">OK</button>
    </div>
  </div>
</template>

<script>
import { STRATEGY } from "./utils";
export default {
  props: ["enterTrialNumber"],
  data: function() {
    return {
      STRATEGY: null,
      selectedStrategy: null,
      lookAhead: false,
      trialNumber: ""
    };
  },
  computed: {
    isValidInput() {
      if (
        (this.enterTrialNumber &&
          this.trialNumber >= 1 &&
          this.trialNumber <= 10000 &&
          this.selectedStrategy) ||
        (!this.enterTrialNumber && this.selectedStrategy)
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    handleOk() {
      this.$emit("selectStrategy", {
        selectedStrategy: this.selectedStrategy,
        lookAhead:
          this.selectedStrategy === STRATEGY.BF ||
          this.selectedStrategy === STRATEGY.WF
            ? false
            : this.lookAhead,
        trialNumber: this.trialNumber
      });
    }
  },
  created() {
    this.STRATEGY = STRATEGY;
  }
};
</script>

<style scoped>
.app--enter-number {
  max-width: 700px;
  margin: 0 auto;
}
</style>