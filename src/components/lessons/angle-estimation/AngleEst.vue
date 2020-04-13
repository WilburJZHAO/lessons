<template>
  <div>
    <div class="container mt-4" style="margin-bottom: 9rem;">
      <h3 class="lesson-subheading">Angle estimation (5 to {{maxDegree}} degrees)</h3>
      <hr class="subheading-separator">
      <div class="row">
        <div class="col-12 col-md-6">
          <h4 class="text-success mb-4">
            Estimate the size of the angle (in whole degrees)
          </h4>
          <canvas id="app-canvas"></canvas>
          <form @submit.prevent="handleCheckEstimate">
            <div class="form-group row mt-4">
              <label
                for="angle-estimate"
                class="col-sm-4 col-form-label">
                Your estimate
              </label>
              <div class="col-sm-8">
                <input
                  type="number"
                  class="form-control"
                  id="angle-estimate"
                  required
                  v-model="estimateDegree"
                  min="5"
                  :max="this.maxDegree">
              </div>
            </div>
            <div class="app--lesson-action">
              <button
                type="submit"
                class="btn btn-outline-success"
                :disabled="!estimateDegree || isChecked">Check</button>
              <button
                type="button"
                class="btn btn-outline-dark"
                @click="handleCreateNextAngle"
                :disabled="!isChecked">Next</button>
            </div>
          </form>
          <div>
            <p class="alert alert-success" v-show="isChecked">
              Answer: {{degree}} degrees
              <span class="text-danger" style="float: right;" v-show="isCorrect">Spot on!</span>
            </p>
          </div>
        </div>

        <div class="col-12 col-md-6 app--estimate-history">
          <app-estimate-history-table :estimateHistory="estimateHistory">
          </app-estimate-history-table>
          <app-estimate-history-graph :estimateHistory="estimateHistory">
          </app-estimate-history-graph>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pickRandomNumberWithExcept, drawAngle } from './utils.js';
import EstimateHistoryTable from './EstimateHistoryTable.vue';
import EstimateHistoryGraph from './EstimateHistoryGraph.vue';
export default {
  components: {
    appEstimateHistoryTable: EstimateHistoryTable,
    appEstimateHistoryGraph: EstimateHistoryGraph
  },
  props: {
    maxDegree: Number
  },
  data: function() {
    return {
      degree: null, // The angle's degree
      estimateDegree: null, // The angle's degree estimated by user
      isChecked: false, // If user's estimate is checked
      isCorrect: false, // If user's estimate is correct
      estimateIndex: 0, // How many times user has estimated
      estimateHistory: []    // Estimate history, used to record correct degree, user's estimate and error
    }
  },
  methods: {
    /** Draw an angle on canvas */
    drawCanvas() {
      const canvas = document.querySelector('#app-canvas');
      canvas.height = canvas.width *.5; // Canvas size: 300 * 150
      if(canvas.getContext) {
        drawAngle(canvas, this.degree)
      }
    },
    createOneAngle() {
      return pickRandomNumberWithExcept(5, this.maxDegree);
    },
    /** Check the estimate */
    handleCheckEstimate() {
      // console.log(this.estimateDegree);
      this.isChecked = true;
      if(this.estimateDegree == this.degree) {
        this.isCorrect=true;
      }
      this.estimateHistory.push({
        id: this.estimateIndex,
        angle: this.degree,
        estimate: this.estimateDegree,
        error: this.estimateDegree - this.degree
      })
    },
    /** Create a new angle */
    handleCreateNextAngle() {
      if(this.estimateIndex >= 9) {
        this.estimateIndex = 0;
        this.estimateHistory = [];
      } else {
        this.estimateIndex++;
      }
      this.degree = this.createOneAngle();
      this.drawCanvas();
      this.isChecked = false;
      this.isCorrect = false;
      this.estimateDegree = null;
      // console.log(this.degree);
    }
  },
  created() {
    this.degree = this.createOneAngle();
  },
  mounted() {
    this.drawCanvas();
  }
}
</script>
