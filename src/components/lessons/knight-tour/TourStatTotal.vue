<template>
  <div>
    <table class="table table-bordered" style="table-layout: fixed;">
      <thead v-if="trialNumber">
        <tr class="table-danger text-primary">
          <th colspan="2">{{ legify(trialNumber) }} games</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-primary">Trial</td>
          <td>
            <span v-if="trial>0">{{ legify(trial) }}</span>
          </td>
        </tr>
        <tr>
          <td class="text-primary">Mean</td>
          <td>
            <span v-if="trial>0">{{ mean }}</span>
          </td>
        </tr>
        <tr>
          <td class="text-primary">Re-entrants</td>
          <td>
            <span v-if="trial>0">{{ reEntrants }}</span>
          </td>
        </tr>
        <tr>
          <td class="text-primary">Solutions</td>
          <td>
            <span v-if="trial>0">{{ legify(currentSolutionIndex) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="solutions> 0 && status===2"
      class="text-center d-flex justify-content-center align-items-center"
    >
      <button
        class="btn btn-outline-success mr-2"
        :disabled="showingSolution"
        @click="handleShowSolution"
      >Show solution</button>
      <div class="d-flex flex-column">
        <button
          class="btn btn-outline-primary btn-sm mb-1"
          :disabled="showingSolution"
          @click="handlePrevSolution"
        >
          <i class="fas fa-sort-up"></i>
        </button>
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="showingSolution"
          @click="handleNextSolution"
        >
          <i class="fas fa-sort-down"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { legify } from "../../common/utils";
export default {
  props: [
    "trialNumber",
    "trial",
    "mean",
    "reEntrants",
    "solutions",
    "showingSolution",
    "status"
  ],
  data: function() {
    return {
      legify,
      currentSolutionIndex: 0
    };
  },
  watch: {
    solutions(value) {
      this.currentSolutionIndex = this.solutions;
    }
  },
  methods: {
    handleShowSolution() {
      this.$emit("showSolution", this.currentSolutionIndex - 1);
    },
    handlePrevSolution() {
      if (this.currentSolutionIndex > 1) {
        this.currentSolutionIndex--;
      }
    },
    handleNextSolution() {
      if (this.currentSolutionIndex < this.solutions) {
        this.currentSolutionIndex++;
      }
    }
  },
  created() {
    this.currentSolutionIndex = this.solutions;
  }
};
</script>

<style scoped>
</style>