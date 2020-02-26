<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">
      Change the target total and the number of cards
    </h3>
    <div class="mb-5"></div>
    <div class="form-group row">
      <label class="col-sm-5">Enter the number of cards</label>
      <div class="col-sm-3">
        <input
          type="number"
          class="form-control"
          v-model.number="mySettings.cards"
        />
      </div>
      <div class="col-sm-4">(between 3 and 10)</div>
    </div>
    <div class="form-group row">
      <label class="col-sm-5">Enter the target total</label>
      <div class="col-sm-3">
        <input
          type="number"
          class="form-control"
          v-model.number="mySettings.target"
          :disabled="!isValidCards"
        />
      </div>
      <div class="col-sm-4" v-if="targetRange.length > 0">
        (between {{ targetRange[0] }} and {{ targetRange[1] }})
      </div>
    </div>
    <div
      :style="{
        visibility: !isValidCards || !isValidTarget ? 'visible' : 'hidden'
      }"
      class="text-center text-danger"
    >
      Please input number between the range
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-outline-dark mr-5" @click="handleReset">
        Reset
      </button>
      <button
        class="btn btn-outline-success"
        :disabled="!isValidCards || !isValidTarget"
        @click="handleOk"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { getTargetRange, cardsRange } from "./utils";
export default {
  props: ["settings"],
  data: function() {
    return {
      mySettings: null
    };
  },
  computed: {
    targetRange() {
      return getTargetRange(this.mySettings.cards);
    },
    isValidCards() {
      const { cards } = this.mySettings;
      if (cards < cardsRange[0] || cards > cardsRange[1]) {
        return false;
      }
      return true;
    },
    isValidTarget() {
      const { target } = this.mySettings;
      if (target >= this.targetRange[0] && target <= this.targetRange[1]) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleReset() {
      this.mySettings.cards = 6;
      this.mySettings.target = 31;
    },
    handleOk() {
      this.$emit("changeSettings", this.mySettings);
    }
  },
  created() {
    this.mySettings = _.cloneDeep(this.settings);
  }
};
</script>

<style scoped></style>
