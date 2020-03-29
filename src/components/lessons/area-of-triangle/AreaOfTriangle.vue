<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-12 col-md-5 mb-5">
          <form class="app--question mb-3">
            <div class="app--area-units">
              <div class="form-group">
                <label>Area of triangle</label>
                <input
                  type="number"
                  v-model="areaUnits"
                  class="form-control"
                  min="1"
                  max="50"
                  :disabled="areaOption==='area-computer' || startDragging"
                >
                <small>square units</small>
              </div>
            </div>

            <div class="app--status" v-if="!startDragging">
              <div class="app--selection-form">
                <div class="form-check">
                  <input
                    type="radio"
                    id="area-computer"
                    class="form-check-input"
                    name="area-option"
                    value="area-computer"
                    v-model="areaOption"
                    @click="()=>{this.handleGenerateTriangleArea(this.levelOption)}"
                  >
                  <label for="area-computer" class="form-check-label">Computer Area</label>
                </div>
                <div class="form-check mb-4">
                  <input
                    type="radio"
                    id="area-input"
                    class="form-check-input"
                    name="area-option"
                    value="area-input"
                    v-model="areaOption"
                    @click="() => { this.initializeStatus() }"
                  >
                  <label for="area-input" class="form-check-label">Input Area</label>
                </div>

                <div class="form-check-box" v-if="areaOption==='area-computer'">
                  <div class="form-check">
                    <input
                      type="radio"
                      id="level-level1"
                      class="form-check-input"
                      name="level-option"
                      value="level-level1"
                      v-model="levelOption"
                      @click="()=>{this.handleGenerateTriangleArea('level-level1')}"
                    >
                    <label for="level-level1" class="form-check-label">Level 1</label>
                  </div>
                  <div class="form-check mb-4">
                    <input
                      type="radio"
                      id="level-expert"
                      class="form-check-input"
                      name="level-option"
                      value="level-expert"
                      v-model="levelOption"
                      @click="()=>{this.handleGenerateTriangleArea('level-expert')}"
                    >
                    <label for="level-expert" class="form-check-label">Expert</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- End of form -->
          <div v-if="startDragging">
            <div class="app--your-area-table">
              <h6>Your Area</h6>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Base</th>
                    <td>{{p2.x.toFixed(1)}}</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{{p1.y.toFixed(1)}}</td>
                  </tr>
                  <tr v-if="isChecked">
                    <th>Area</th>
                    <td>{{yourArea.toFixed(1)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-action">
              <button
                type="button"
                class="btn btn-outline-success"
                @click="handleCheckArea"
                v-if="!isChecked"
              >Check</button>
              <button
                type="button"
                class="btn btn-outline-success"
                @click="handleRestore"
                v-else
              >Restore</button>
              <button
                type="button"
                class="btn btn-outline-dark"
                @click="handleNext"
                :disabled="!isChecked"
              >Next</button>
            </div>
            <div class="alert alert-danger mt-3" v-if="isChecked">
              Your area is {{yourArea.toFixed(1)}}.
              {{checkResult}}
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7">
          <h4 class="text-success text-center">Maximum base length is 10.</h4>
          <br>
          <canvas id="app-canvas" width='600px' height='400px'></canvas>
          <br>
          <br>
          <p
            class="alert alert-info text-center"
          >Drag the top or right vertex to change the triangle</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  generateTriangleArea,
  clearCanvas,
  drawGrid,
  drawTriangle,
  drawDraggableArea,
  // resizeTriangle,
  dragHeight,
  dragBase
} from "./utils";
export default {
  data: function() {
    return {
      areaUnits: null,
      areaOption: "area-computer",
      levelOption: "level-level1",
      triangleBase: 6,
      triangleHeight: 6,
      p1: { x: 3, y: 6 },
      p2: { x: 6, y: 0 },
      isDragging: false,
      startDragging: false,
      allowDragging: true,
      isChecked: false
    };
  },
  computed: {
    yourArea: function() {
      return Number(this.p1.y.toFixed(1)) * Number(this.p2.x.toFixed(1)) * 0.5;
    },
    areaDiff: function() {
      return ((this.yourArea - this.areaUnits) / this.areaUnits) * 100;
    },
    checkResult: function() {
      if (this.areaDiff === 0) return "Correct!";
      if (this.areaDiff < 0) return `Down by ${-this.areaDiff.toFixed(0)}%`;
      if (this.areaDiff > 0) return `Up by ${this.areaDiff.toFixed(0)}%`;
      return null;
    }
  },
  watch: {
    // isDragging(value) {
    // 	if(value===true) {
    // 		document.querySelector('body').setAttribute('style', 'overflow: hidden');
    // 	} else {
    // 		document.querySelector('body').removeAttribute('style');
    // 	}
    // }
  },
  methods: {
    initializeStatus() {
      this.startDragging = false;
      this.isDragging = false;
      this.allowDragging = true;
      this.isChecked = false;
    },
    handleCheckArea() {
      // console.log('submit!');
      this.isChecked = true;
      this.allowDragging = false;
    },
    handleRestore() {
      this.isChecked = false;
      this.allowDragging = true;
    },
    handleGenerateTriangleArea(level) {
      // console.log(level);
      this.areaUnits = generateTriangleArea(level === "level-expert");
      this.initializeStatus();
    },
    handleNext() {
      this.handleGenerateTriangleArea();
      this.p1 = { x: 3, y: 6 };
      this.p2 = { x: 6, y: 0 };
      this.drawCanvas();
    },
    checkInput() {
      const inputNum = Number(this.areaUnits);
      if (isNaN(inputNum)) return false;
      if (inputNum <= 0 || inputNum > 50) {
        return false;
      } else {
        return true;
      }
    },
    drawCanvas() {
      const canvas = document.querySelector("#app-canvas");
      //canvas.height = (2 / 3) * canvas.width;
      // const ctx = canvas.getContext('2d');
      clearCanvas(canvas);
      drawGrid(canvas);
      // const p1 = {x: 3, y: 6};
      // const p2 = {x: 6, y: 0};
      drawTriangle(canvas, this.p1, this.p2);
      drawDraggableArea(canvas, this.p1);
      drawDraggableArea(canvas, this.p2);
      /** Above is to draw the original shape */

      canvas.addEventListener("mousedown", e => {
        if (!this.checkInput()) return; // If input is invalid, not allow to drag triangle
        if (!this.allowDragging) return;
        this.isDragging = true;
        this.startDragging = true;
        this.p1 = dragHeight(canvas, e.clientX, e.clientY, this.p1, this.p2);
        this.p2 = dragBase(canvas, e.clientX, e.clientY, this.p1, this.p2);
      });
      canvas.addEventListener("mousemove", e => {
        if (!this.checkInput()) return;
        if (!this.allowDragging) return;
        if (this.isDragging) {
          this.p1 = dragHeight(canvas, e.clientX, e.clientY, this.p1, this.p2);
          this.p2 = dragBase(canvas, e.clientX, e.clientY, this.p1, this.p2);
        }
      });
      canvas.addEventListener("mouseup", e => {
        if (!this.checkInput()) return;
        if (!this.allowDragging) return;
        this.p1 = dragHeight(canvas, e.clientX, e.clientY, this.p1, this.p2);
        this.p2 = dragBase(canvas, e.clientX, e.clientY, this.p1, this.p2);
        this.isDragging = false;
      });

      canvas.addEventListener("touchstart", e => {
        if (!this.checkInput()) return; // If input is invalid, not allow to drag triangle
        if (!this.allowDragging) return;
        this.isDragging = true;
        this.startDragging = true;
        this.p1 = dragHeight(
          canvas,
          e.touches[0].clientX,
          e.touches[0].clientY,
          this.p1,
          this.p2
        );
        this.p2 = dragBase(
          canvas,
          e.touches[0].clientX,
          e.touches[0].clientY,
          this.p1,
          this.p2
        );
      });
      canvas.addEventListener("touchmove", e => {
        e.preventDefault();
        if (!this.checkInput()) return;
        if (!this.allowDragging) return;
        if (this.isDragging) {
          this.p1 = dragHeight(
            canvas,
            e.touches[0].clientX,
            e.touches[0].clientY,
            this.p1,
            this.p2
          );
          this.p2 = dragBase(
            canvas,
            e.touches[0].clientX,
            e.touches[0].clientY,
            this.p1,
            this.p2
          );
        }
      });
      canvas.addEventListener("touchend", e => {
        if (!this.checkInput()) return;
        if (!this.allowDragging) return;
        this.isDragging = false;
        this.p1 = dragHeight(
          canvas,
          e.touches[0].clientX,
          e.touches[0].clientY,
          this.p1,
          this.p2
        );
        this.p2 = dragBase(
          canvas,
          e.touches[0].clientX,
          e.touches[0].clientY,
          this.p1,
          this.p2
        );
      });
    }
  },
  created() {
    this.handleGenerateTriangleArea();
  },
  mounted() {
    this.drawCanvas();

    const docBody = document.querySelector("body");
    docBody.addEventListener("mouseup", () => {
      this.isDragging = false;
    }); // Bug fix: When dragging on canvas and mouse moves outside the canvas,
    // The 'mouseup' event registered on canvas will not be listened.
  }
};
</script>

<style scoped>
.app--question {
  display: flex;
  flex-direction: column;
}

.form-check-input,
.form-check-label {
  cursor: pointer;
}

#app-canvas {
  width: 100%;
  /* height: 400; */
  border: none;
}

.form-action {
  display: flex;
  justify-content: space-around;
}

@media only screen and (max-width: 768px) {
  .app--question {
    flex-direction: row;
    justify-content: space-around;
  }
}
@media only screen and (max-width: 425px) {
  .app--question {
    flex-direction: column;
  }
}
</style>
