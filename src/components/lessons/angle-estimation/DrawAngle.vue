<template>
  <div>
    <div class="container mt-4" style="margin-bottom: 9rem;">
      <h3 class="lesson-subheading">Draw an angle (5 to {{maxDegree}} degrees)</h3>
      <hr class="subheading-separator">
      <div class="row">
        <div class="col-12 col-md-6">
          <h4 class="text-success mb-4">
            Draw an angle of {{degree}} degrees
          </h4>
          <canvas id="app-canvas"></canvas>
          <div class="app--lesson-action">
            <button
              type="button"
              class="btn btn-outline-success"
              @click="handleCheckDegree"
              :disabled="!estimateDegree || isChecked">Check</button>
            <button
              type="button"
              class="btn btn-outline-dark"
              @click="handleCreateNextAngle"
              :disabled="!isChecked">Next</button>
          </div>
          <div>
            <p class="alert alert-success" v-show="isChecked">
              {{estimateDegree}} degrees drawn
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
import {
  pickRandomNumberWithExcept,
  drawAngleStarter,
  drawCorrectAngle,
  drawPosition } from './utils';
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
      degree: null,
      estimateDegree: null,
      isChecked: false,
      isCorrect: false,
      estimateIndex: 0,
      estimateHistory: [],
      isDrawing: false
    }
  },
  watch: {
		// isDrawing(value) {
		// 	if(value===true) {
		// 		document.querySelector('body').setAttribute('style', 'overflow: hidden');
		// 	} else {
		// 		document.querySelector('body').removeAttribute('style');
		// 	}
		// }
	},
  methods: {
    createOneAngle() {
      return pickRandomNumberWithExcept(5, this.maxDegree);
    },
    /** Check the angle degree drawn by user */
    handleCheckDegree() {
      this.isChecked = true;
      this.drawCorrectAngle();
      if(this.estimateDegree == this.degree) {
        this.isCorrect = true;
      }
      this.estimateHistory.push({
        id: this.estimateIndex,
        angle: this.degree,
        estimate: this.estimateDegree,
        error: this.estimateDegree - this.degree
      });
      // const canvas = document.querySelector('#app-canvas');
    },
    /** Create next angle */
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
    },
    /** Allow user to draw/estimate angle on canvas */
    drawCanvas() {
      const canvas = document.querySelector('#app-canvas');
      canvas.height = canvas.width*.5;
      if(canvas.getContext) {
        drawAngleStarter(canvas);
        // let isDrawing = false;
        canvas.addEventListener('mousedown', (e) => {
          if(this.isChecked) return;
          this.estimateDegree = drawPosition(canvas, e.clientX, e.clientY);
          this.isDrawing = true;
        });
        canvas.addEventListener('mousemove', (e) => {
          if(this.isChecked) return;
          if(this.isDrawing) {
            this.estimateDegree = drawPosition(canvas, e.clientX, e.clientY);
          }
        });
        canvas.addEventListener('mouseup', (e) => {
          if(this.isChecked) return;
          this.estimateDegree = drawPosition(canvas, e.clientX, e.clientY);
          this.isDrawing = false;
        });
        canvas.addEventListener('touchstart', (e) => {
          if(this.isChecked) return;
          this.isDrawing = true;
          this.estimateDegree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
        });
        canvas.addEventListener('touchmove', (e) => {
          e.preventDefault();
          if(this.isChecked) return;
          if(this.isDrawing) {
            this.estimateDegree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
          }
        });
        canvas.addEventListener('touchend', (e) => {
          if(this.isChecked) return;
          this.isDrawing = false;
          this.estimateDegree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
        });
      }
    },
    /** Draw user's angle and correct angle on canvas */
    drawCorrectAngle() {
      const canvas = document.querySelector('#app-canvas');
      canvas.height = canvas.width*.5;
      if(canvas.getContext) {
        drawCorrectAngle(canvas, this.degree, this.estimateDegree);
      }
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
