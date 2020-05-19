<template>
  <div>
    <div>
      <div v-for="grid in myStrategy.strategyData" :key="grid.id" class="form-check">
        <input
          type="checkbox"
          :id="grid.id"
          class="form-check-input"
          :checked="grid.isChecked"
          v-model="grid.isChecked"
        />
        <label :for="grid.id">{{ grid.name }}</label>
      </div>
    </div>

    <div class="form-group">
      <h5 class="text-dark">Saved Strategies</h5>
      <select
        v-model="myStrategyId"
        name="selected-strategy"
        id="selected-strategy"
        class="form-control"
        size="8"
        @click="getSelectedStrategy"
        @change="getSelectedStrategy"
        @blur="handleLoseFocus"
      >
        <!-- <option :value="-1">Blank</option> -->
        <option
          v-for="strategy in strategies"
          :key="strategy.id"
          :value="strategy.id"
        >{{ strategy.name }}</option>
      </select>
      <div class="text-center my-3">
        <button class="btn btn-outline-success" @click="handleSaveStrategy">Save strategy</button>
      </div>
      <div class="text-center">
        <button class="btn btn-outline-dark" @click="handleDeleteStrategies">Delete strategies</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { BLANK_STRATEGY } from "./utils/settings";
import {
  checkDuplicateInStrategy,
  checkDuplicateStrategy
} from "./utils/utils";

export default {
  props: ["strategies", "newStrategy", "duplicateNumber"],
  data: function() {
    return {
      myStrategyId: null,
      myStrategy: BLANK_STRATEGY
    };
  },
  computed: {},
  watch: {},
  methods: {
    /** Select strategy, save selected strategy and emit relevant message to parent component */
    getSelectedStrategy() {
      const strategiesCopy = _.cloneDeep(this.strategies);
      this.myStrategy = strategiesCopy.find(
        strategy => strategy.id === this.myStrategyId
      );
      if (!this.myStrategy) {
        this.myStrategy = BLANK_STRATEGY;
      }
      this.$emit("selectStrategy", this.myStrategy);
      if (this.myStrategy.id === 0) {
        this.$emit(
          "showMessage",
          "Fill the cells with your numbers or choose another strategy"
        );
      } else {
        this.$emit(
          "showMessage",
          "Click on grid cell to enter or change numbers"
        );
      }
    },

    handleLoseFocus() {
      this.$emit("showMessage", "");
    },

    /**
     * Save strategy. Name it as 'strategy 1, strategy 2, strategy 3 ...'
     */
    handleSaveStrategy() {
      let strategyToSave = _.cloneDeep(this.newStrategy);
      strategyToSave.id = this.strategies.length;
      strategyToSave.name = "Strategy" + (this.strategies.length - 1);
      // console.log(strategyToSave);
      // console.log(this.strategies);
      // console.log(checkDuplicateInStrategy(strategyToSave));
      if (this.duplicateNumber) {
        // console.log("duplicate number " + this.duplicateNumber);
        this.$emit("showMessage", `Duplicate ${this.duplicateNumber}`);
        return;
      }
      const duplicateStrategyIndex = checkDuplicateStrategy(
        strategyToSave,
        this.strategies
      );
      if (duplicateStrategyIndex) {
        // console.log(
        //   "duplicate strategy " + this.strategies[duplicateStrategyIndex].name
        // );
        this.$emit(
          "showMessage",
          `Grids are already saved as ${this.strategies[duplicateStrategyIndex].name}`
        );
        return;
      }
      this.strategies.push(strategyToSave);
    },

    /**
     * Delete all saved strategies except the default one.
     */
    handleDeleteStrategies() {
      this.strategies.splice(2);
      this.myStrategy = this.strategies[0];
      this.$emit("selectStrategy", this.myStrategy);
    }
  }
};
</script>

<style scoped></style>
