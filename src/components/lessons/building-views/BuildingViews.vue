<template>
  <div class="container mt-4 mb-5">
    <div class="row">
      <div class="col-12 col-lg-7">
        <div class="app--building-option mb-3">
          <div class="app--building-option-view">
            <div class="form-check form-check-inline">
              <input
                type="radio"
                name="viewDirection"
                :value="1"
                id="front-view"
                class="form-check-input"
                v-model="viewDirection"
                :disabled="disableSetBuilding"
              />
              <label for="front-view" class="form-check-label">Front View</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                name="viewDirection"
                :value="2"
                id="back-view"
                class="form-check-input"
                v-model="viewDirection"
                :disabled="disableSetBuilding"
              />
              <label for="back-view" class="form-check-label">Back View</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                name="viewDirection"
                :value="3"
                id="left-view"
                class="form-check-input"
                v-model="viewDirection"
                :disabled="disableSetBuilding"
              />
              <label for="left-view" class="form-check-label">Left View</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                name="viewDirection"
                :value="4"
                id="right-view"
                class="form-check-input"
                v-model="viewDirection"
                :disabled="disableSetBuilding"
              />
              <label for="right-view" class="form-check-label">Right View</label>
            </div>
          </div>
          <div class="app--building-option-compare">
            <div class="form-check form-check-inline">
              <input
                type="checkbox"
                class="form-check-input"
                id="show-compare"
                v-model="showCompare"
                :disabled="disableSetBuilding"
              />
              <label for="show-compare" class="form-check-label">Compare</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                type="checkbox"
                class="form-check-input"
                id="x-ray"
                v-model="hasXRay"
                name="hasXRay"
                :disabled="disableSetBuilding"
              />
              <label for="x-ray" class="form-check-label">X-ray</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-6">
            <app-building-table
              v-if="!disableSetBuilding"
              :buildingArray="buildingArray"
              :viewDirection="viewDirection"
              :hasXRay="hasXRay"
            ></app-building-table>
          </div>
          <div class="col-12 col-sm-6">
            <app-building-table
              v-if="showCompare"
              :buildingArray="answerBuildingArray"
              :viewDirection="viewDirection"
            ></app-building-table>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-5">
        <h3 class="text-success text-center">Drag to build the top view</h3>
        <div class="app--number-blocks-container">
          <div class="app--number-blocks mt-4">
            <app-number-block v-for="number in 9" :key="number" :number="number"></app-number-block>
            <app-number-block :number="0" v-if="includeOpenSpace"></app-number-block>
          </div>

          <div class="app--number-building mt-4 mb-4">
            <div class="app--number-building-up">
              <div class="app--number-building-left">
                <span class="badge badge-danger">Left</span>
              </div>
              <div class="app--number-building-container">
                <div
                  v-for="rowNumber in gridSize"
                  :key="rowNumber"
                  class="app--number-building-row"
                >
                  <app-number-block
                    :data-arrx="rowNumber-1"
                    :data-arry="colNumber-1"
                    v-for="colNumber in gridSize"
                    :key="colNumber"
                    ref="numbersRef"
                  ></app-number-block>
                </div>
              </div>
              <div class="app--number-building-right">
                <span class="badge badge-danger">Right</span>
              </div>
            </div>
            <div class="app--number-building-down text-center">
              <span class="badge badge-danger" style="transform: translateX(-13%);">Front</span>
            </div>
          </div>
        </div>

        <div v-if="showCheck" class="app--number-check mb-4">
          <div class="app--number-check-container">
            <div
              v-for="(row, index) in (showAnswer ? buildingArray : checkBuildingArray)"
              :key="index"
              class="app--number-building-row"
            >
              <app-number-block
                v-for="(number, index) in row"
                :key="index"
                :number="number"
                :hasCheck="true"
              ></app-number-block>
            </div>
          </div>
          <div class="text-danger font-weight-bold">
            <span v-if="correctNumbers === gridSize*gridSize">Congratulations all are correct!</span>
            <span v-else>{{ correctNumbers }} out of {{ gridSize*gridSize }} are correct</span>
          </div>
        </div>

        <div class="app--options">
          <div class="form-check form-check-inline">
            <label for class="form-check-label mr-3">Grid size</label>
            <input
              type="radio"
              id="grid-size-3"
              class="form-check-input"
              name="grid-size"
              :value="3"
              v-model="gridSize"
              :disabled="isStart"
              @click="()=>{this.showCheck = false; this.disableSetBuilding = true;}"
            />
            <label for="grid-size-3" class="form-check-label mr-2">3 x 3</label>
            <input
              type="radio"
              id="grid-size-4"
              class="form-check-input"
              name="grid-size"
              :value="4"
              v-model="gridSize"
              :disabled="isStart"
              @click="()=>{this.showCheck = false; this.disableSetBuilding = true;}"
            />
            <label for="grid-size-4" class="form-check-label mr-2">4 x 4</label>
            <input
              type="radio"
              id="grid-size-5"
              class="form-check-input"
              name="grid-size"
              :value="5"
              v-model="gridSize"
              :disabled="isStart"
              @click="()=>{this.showCheck = false; this.disableSetBuilding = true;}"
            />
            <label for="grid-size-5" class="form-check-label mr-2">5 x 5</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="check-input"
              v-model="includeOpenSpace"
              :disabled="isStart"
              @click="()=>{this.showCheck = false; this.disableSetBuilding = true;}"
            />
            <label for="check-input" class="form-check-label">Include open space in design</label>
          </div>
        </div>

        <div class="app--action text-center mt-4">
          <button v-if="!isStart" class="btn btn-outline-success" @click="handleStartBuilding">Start</button>
          <button v-if="isStart" class="btn btn-outline-success" @click="handleCheckBuilding">Check</button>
          <button v-if="isStart" class="btn btn-outline-dark" @click="handleSeeAnswer">Show answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
import NumberBlock from "./NumberBlock.vue";
import BuildingTable from "./BuildingTable.vue";
import { pickNumber } from "./utils";
export default {
  components: {
    appNumberBlock: NumberBlock,
    appBuildingTable: BuildingTable
  },
  data: function() {
    return {
      gridSize: 3,
      includeOpenSpace: false,
      isStart: false, // if a game is started
      disableSetBuilding: true, //  if a game is checked
      buildingArray: null, // The array to reflect buildings
      answerBuildingArray: null, // The building array answered by user
      checkBuildingArray: null, // The building array checked by computer
      viewDirection: 1, // 1- front view, 2- back view, 3 - left view, 4- right view
      showCompare: false, // If show compared building views
      showCheck: false, // If show checked building views
      showAnswer: false, // If show answer
      hasXRay: false, // If x-ray is ticked
      arrXLeave: null,
      arrYLeave: null
    };
  },
  computed: {
    correctNumbers() {
      if (!this.checkBuildingArray || this.checkBuildingArray.length === 0) {
        return 0;
      }
      let correctNumbers = 0;
      for (let i = 0; i < this.checkBuildingArray.length; i++) {
        for (let j = 0; j < this.checkBuildingArray[i].length; j++) {
          if (this.checkBuildingArray[i][j] > 0) {
            correctNumbers++;
          }
        }
      }
      return correctNumbers;
    }
  },
  methods: {
    handleStartBuilding() {
      this.isStart = true;
      this.disableSetBuilding = false;
      this.showAnswer = this.showCheck = this.showCompare = false;
      this.createBuilding();

      this.setDraggable();
      this.setDropzone();
      this.setDraggablePositioned();
      for (let i = 0; i < this.$refs.numbersRef.length; i++) {
        this.$refs.numbersRef[i].$el.innerHTML = "";
      }
    },
    handleCheckBuilding() {
      this.showCheck = true;
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
          if (this.buildingArray[i][j] === this.answerBuildingArray[i][j]) {
            this.checkBuildingArray[i][j] = this.buildingArray[i][j];
          } else {
            this.checkBuildingArray[i][j] = -1;
          }
        }
      }
      this.checkBuildingArray = [...this.checkBuildingArray];
      if (this.correctNumbers === this.gridSize * this.gridSize) {
        this.isStart = false;
      }
    },
    handleSeeAnswer() {
      this.showCheck = true;
      this.showAnswer = true;
      // this.checkBuildingArray = [...this.buildingArray];
      this.isStart = false;
      this.unsetDraggable();
      this.unsetDropzone();
      this.unsetDraggablePositioned();
    },
    createBuilding() {
      this.buildingArray = new Array(this.gridSize);
      this.answerBuildingArray = new Array(this.gridSize);
      this.checkBuildingArray = new Array(this.gridSize);
      for (let i = 0; i < this.gridSize; i++) {
        this.buildingArray[i] = new Array(this.gridSize);
        this.answerBuildingArray[i] = new Array(this.gridSize);
        this.checkBuildingArray[i] = new Array(this.gridSize);
        for (let j = 0; j < this.gridSize; j++) {
          this.buildingArray[i][j] = pickNumber(
            this.includeOpenSpace ? 0 : 1,
            9
          );
          this.checkBuildingArray[i][j] = -1;
        }
      }
      this.buildingArray = [...this.buildingArray];
      // console.log(this.buildingArray);
    },
    // The available number blocks can be dragged
    setDraggable() {
      interact(
        ".app--number-blocks-container .app--number-draggable"
      ).draggable({
        inertia: false,
        modifiers: [
          // keep the element within the area of its parent
          interact.modifiers.restrict({
            restriction: ".app--number-blocks-container",
            endOnly: true
          })
        ],
        autoScroll: true,
        onstart: this.handleOnDragStart,
        onmove: this.handleOnDragMove,
        onend: this.handleOnDragEnd
      });
    },
    unsetDraggable() {
      interact(".app--number-blocks-container .app--number-draggable").unset();
    },
    handleOnDragStart(e) {
      this.showCheck = false;
      e.target.classList.add("app--number-selected");
      this.arrXLeave = NaN;
      this.arrYLeave = NaN;
      // e.target.removeAttribute('style');
    },
    handleOnDragMove(e) {
      let target = e.target;
      // keep the dragged position in the data-x/data-y attributes
      let x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      let y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    handleOnDragEnd(e) {
      e.target.classList.remove("app--number-selected");
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      this.arrXLeave = null;
      this.arrYLeave = null;
    },

    // Dropzone can be dropped
    setDropzone() {
      interact(".app--number-dropzone").dropzone({
        accept: [".app--number-draggable", ".app--number-draggable-positioned"],
        overlap: 0.6,
        // ondropactivate: this.handleOnDropActivate,
        // ondragenter: this.handleOnDragEnter,
        ondragleave: this.handleOnDragLeave,
        ondrop: this.handleOnDrop
        // ondropdeactivate: this.handleOndropdeactivate
      });
    },
    unsetDropzone() {
      interact(".app--number-dropzone").unset();
    },
    handleOnDragLeave(e) {
      // If a number is to move out of its position, it should be recorded.
      // console.log(e.target.getAttribute('data-arrx'));
      // console.log(e.target.getAttribute('data-arry'));
      // console.log('on drag leave');
      if (this.arrXLeave === null && this.arrYLeave === null) {
        this.arrXLeave = e.target.getAttribute("data-arrx");
        this.arrYLeave = e.target.getAttribute("data-arry");
      }
    },
    handleOnDrop(e) {
      // console.log(e.relatedTarget.innerText);
      // console.log(e.target.getAttribute('data-arrx'));
      // console.log(e.target.getAttribute('data-arry'));
      e.target.innerHTML = `<div class="
					app--number-draggable-positioned
					app--number-block
					app--number-block${e.relatedTarget.innerText.trim()}">
					${e.relatedTarget.textContent}
				</div>`;

      if (this.arrXLeave !== null && this.arrYLeave !== null) {
        // console.log('set null', this.arrXLeave, '  ', this.arrYLeave);
        // console.log(this.answerBuildingArray[this.arrXLeave][this.arrYLeave]);
        this.answerBuildingArray[this.arrXLeave][this.arrYLeave] = null;
      }
      let arrX = e.target.getAttribute("data-arrx");
      let arrY = e.target.getAttribute("data-arry");
      this.answerBuildingArray[arrX][arrY] = Number(
        e.relatedTarget.innerText.trim()
      );
      // console.log(this.answerBuildingArray);
      this.answerBuildingArray = [...this.answerBuildingArray];
      this.arrXLeave = this.arrYLeave = null;
      // e.target.classList.add('app--number-draggable-positioned');
      // e.target.classList.add(`app--number-block${e.relatedTarget.innerText}`);
      // e.target.classList.remove('app--number-fill');
      // this.canDrop = false;
    },

    // The number blocks in dropzone can be dragged
    setDraggablePositioned() {
      interact(".app--number-draggable-positioned").draggable({
        inertia: false,
        modifiers: [
          // keep the element within the area of its parent
          interact.modifiers.restrict({
            restriction: ".app--number-blocks-container",
            endOnly: true
          })
        ],
        autoScroll: true,
        onstart: this.handleOnDragPositionedStart,
        onmove: this.handleOnDragPositionedMove,
        onend: this.handleOnDragPositionedEnd
      });
    },
    unsetDraggablePositioned() {
      interact(".app--number-draggable-positioned").unset();
    },
    handleOnDragPositionedStart(e) {
      this.showCheck = false;
      e.target.classList.add("app--number-selected");
      e.target.classList.remove("app--number-dropzone");
    },
    handleOnDragPositionedMove(e) {
      let target = e.target;
      // keep the dragged position in the data-x/data-y attributes
      let x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      let y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    handleOnDragPositionedEnd(e) {
      e.target.classList.remove("app--number-selected");
      e.target.setAttribute("style", "display: none");
      if (this.arrXLeave !== null && this.arrYLeave !== null) {
        // console.log("set null", this.arrXLeave, "  ", this.arrYLeave);
        this.answerBuildingArray[this.arrXLeave][this.arrYLeave] = null;
        this.answerBuildingArray = [...this.answerBuildingArray];
        this.arrXLeave = null;
        this.arrYLeave = null;
      }
    }
  },

  mounted() {},
  destroyed() {
    this.unsetDraggable();
    this.unsetDropzone();
    this.unsetDraggablePositioned();
  }
};
</script>

<style scoped>
.app--number-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 5px;
}
.app--number-building-up {
  display: flex;
  justify-content: center;
}
.app--number-building-row {
  display: flex;
}
.app--number-building-left {
  display: flex;
  align-items: center;
  padding: 3px;
}
.app--number-building-right {
  display: flex;
  align-items: center;
  padding: 3px;
}
/* .app--number-check-container {
	margin: 1px;
} */
.app--number-check {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.app--action {
  display: flex;
  justify-content: space-around;
}
</style>
