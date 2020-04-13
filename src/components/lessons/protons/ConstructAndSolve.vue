<template>
  <div class="container mt-3 mb-5 pb-5">
    <h3 class="lesson-subheading">Construct and solve</h3>
    <hr class="subheading-separator">
    <div class="mt-3 container">
      <div class="row">
        <div class="col-12">
          <div class="app--input d-flex align-items-center justify-content-center">
            <div class="mx-2">
              <span v-for="(item, index) in equation" :key="index">
                {{ item.operator === 1 ? '+' : item.operator === -1 ? '-' : '' }}
                {{ item.number }}{{ item.proton === 1 ? 'P' : 'A'}}
              </span> =
            </div>
            <div class="mx-2">
              <input
                type="text"
                class="form-control"
                :disabled="status === 2"
                v-model="inputAnswer"
                @keypress="handleSetInput"
              />
            </div>
            <div class="mx-2">
              <button
                class="btn btn-outline-success"
                :disabled="status === 2"
                @click="handleCheck"
              >OK</button>
            </div>
          </div>
        </div>
        <div class="mt-2 text-center col-12" style="height: 80px;">
          <div
            v-if="status === 0"
            class="text-danger"
          >To make a zero pair drop a Proton onto an Anti-Proton</div>
          <div v-if="status === 1" class="text-danger">{{ wrongMessage }}</div>
          <div v-if="status === 2">
            <div class="text-success">Correct!</div>
            <div>
              <button class="btn btn-outline-dark" @click="handleNext">Next question</button>
            </div>
          </div>
        </div>
        <div class="col-sm-3 app--selection mb-3">
          <div class="d-flex align-items-center justify-content-center">
            Add
            <div class="mr-3"></div>
            <div class="app--click-area" @click="handleAddProton(1)">
              <app-proton-btn></app-proton-btn>
            </div>
          </div>
          <div class="mb-2"></div>
          <div class="d-flex align-items-center justify-content-center">
            Add
            <div class="mr-3"></div>
            <div class="app--click-area" @click="handleAddProton(-1)">
              <app-anti-btn></app-anti-btn>
            </div>
          </div>
          <div class="mb-2"></div>
          <div>
            <div class="text-center">Add Zero</div>
            <div class="d-flex justify-content-center app--click-area" @click="handleAddProton(0)">
              <app-proton-btn></app-proton-btn>
              <div class="mr-2"></div>
              <app-anti-btn></app-anti-btn>
            </div>
          </div>
          <div class="mb-3"></div>
          <div class="d-flex flex-column align-items-center">
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="level1"
                class="custom-control-input"
                v-model.number="level"
                value="0"
                @click="handleNext"
                @change="handleNext"
              />
              <label for="level1" class="custom-control-label">Level1</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="expert"
                class="custom-control-input"
                v-model.number="level"
                value="1"
                @click="handleNext"
                @change="handleNext"
              />
              <label for="expert" class="custom-control-label">Expert</label>
            </div>
            <div class="text-center mt-3">
              <button class="btn btn-outline-dark" @click="handleClear">Clear</button>
            </div>
          </div>
        </div>
        <div class="col-sm-9 app--board">
          <div v-for="(button, index) in buttonsArr" :key="index">
            <app-proton-btn
              v-if="button && button.type === 'p'"
              :style="{
              position: 'absolute',
              left: `${button.x}%`,
              top: `${button.y}%`
            }"
              :data-id="index"
              :isDraggable="true"
            ></app-proton-btn>
            <app-anti-btn
              v-if="button && button.type === 'a'"
              :style="{
              position: 'absolute',
              left: `${button.x}%`,
              top: `${button.y}%`
            }"
              :data-id="index"
              :isDraggable="true"
            ></app-anti-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createProtonsEquation, convertInput, computeAnswer } from "./utils";
import { pickNumber } from "../../common/utils";
import ProtonBtn from "./ProtonBtn.vue";
import AntiBtn from "./AntiBtn.vue";
import interact from "interactjs";
export default {
  data: function() {
    return {
      equation: null,
      status: 0,
      level: 0,
      inputAnswer: "",
      wrongMessage: "",
      buttonsArr: [],
      zIndex: 0,
      leftPosition: 0,
      protonToMoveIndex: -1
    };
  },
  components: {
    appProtonBtn: ProtonBtn,
    appAntiBtn: AntiBtn
  },
  computed: {
    protonsOnBoard() {
      return this.buttonsArr.filter(btn => btn !== null).length;
    }
  },
  methods: {
    handleSetInput(e) {
      if (
        !(
          (e.charCode >= 48 && e.charCode <= 57) ||
          e.key === "a" ||
          e.key === "A" ||
          e.key === "p" ||
          e.key === "P"
        )
      ) {
        e.preventDefault();
      }
    },
    handleCheck() {
      // Validate input
      const re = /^\d*[apAP]?$/;
      if (this.inputAnswer.length === 0) {
        this.status = 1;
        this.wrongMessage = "Please put your answer in the box above.";
        return;
      }
      if (!re.test(this.inputAnswer)) {
        this.status = 1;
        this.wrongMessage = "Enter a number";
        return;
      }
      if (
        Number(this.inputAnswer) !== 0 &&
        ["a", "p", "A", "P"].indexOf(
          this.inputAnswer[this.inputAnswer.length - 1]
        ) === -1
      ) {
        this.status = 1;
        this.wrongMessage = "Enter A or P";
        return;
      }

      const inputNumber = convertInput(this.inputAnswer);

      const answer = computeAnswer(this.equation);
      if (inputNumber > answer) {
        this.status = 1;
        this.wrongMessage = "Too many protons. Try again.";
        return;
      } else if (inputNumber < answer) {
        this.status = 1;
        this.wrongMessage = "Too many anti-protons. Try again.";
        return;
      }
      // this.unsetDraggable();
      // this.unsetDropZone();
      this.wrongMessage = "";
      this.status = 2;
    },
    handleNext() {
      const level = this.level;
      this.equation = createProtonsEquation(level);
      this.status = 0;
      this.wrongMessage = "";
      this.inputAnswer = "";
      this.buttonsArr = [];
      this.leftPosition = 0;
    },
    handleAddProton($e) {
      // console.log($e);
      if (this.protonsOnBoard >= 20) {
        return;
      }
      switch ($e) {
        case 1:
          this.buttonsArr.push({
            type: "p",
            x: pickNumber(10, 90),
            y: pickNumber(10, 90)
          });
          break;
        case -1:
          this.buttonsArr.push({
            type: "a",
            x: pickNumber(10, 90),
            y: pickNumber(10, 90)
          });
          break;
        case 0:
          this.buttonsArr.push({
            type: "p",
            x: pickNumber(10, 90),
            y: pickNumber(10, 90)
          });
          this.buttonsArr.push({
            type: "a",
            x: pickNumber(10, 90),
            y: pickNumber(10, 90)
          });
          break;
        default:
          return;
      }
    },
    handleClear() {
      this.buttonsArr = [];
      this.leftPosition = 0;
    },

    setDraggable() {
      interact(".app--btn-draggable").draggable({
        inertia: false,
        autoScroll: false,
        // modifiers: [
        //   // keep the element within the area of its parent
        //   interact.modifiers.restrict({
        //     restriction: ".app--board",
        //     elementRect: { left: -0, right: 1, top: -0, bottom: 1 },
        //     endOnly: true
        //   })
        // ],
        onstart: this.handleDragStart,
        onmove: this.handleDragMove,
        onend: this.handleDragEnd
      });
    },
    unsetDraggable() {
      interact(".app--btn-draggable").unset();
    },
    handleDragStart(e) {
      e.target.style["z-index"] = ++this.zIndex;
    },
    handleDragMove(e) {
      let target = e.target;
      let x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      let y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
      e.preventDefault();
    },
    handleDragEnd() {
      if (this.protonToMoveIndex >= 0) {
        this.buttonsArr[this.protonToMoveIndex] = null;
        this.buttonsArr = [...this.buttonsArr];
      }
      // console.log(this.protonToMoveIndex);
    },
    setDropzone() {
      interact(".app--proton-btn").dropzone({
        accept: ".app--anti-btn",
        overlap: 0.6,
        ondrop: this.handleOnDrop,
        ondragenter: this.handleOnEnter
      });
      interact(".app--anti-btn").dropzone({
        accept: ".app--proton-btn",
        overlap: 0.6,
        ondrop: this.handleOnDrop,
        ondragenter: this.handleOnEnter
      });

      interact(".app--board").dropzone({
        accept: ".app--btn-draggable",
        overlap: 0.6,
        ondragenter: this.handleProtonEnter,
        ondragleave: this.handleProtonLeave,
        ondrop: this.handleProtonDrop,
        ondropdeactivate: this.handleProtonDropDeactivate
      });
    },
    unsetDropzone() {
      interact(".app--proton-btn").unset();
      interact(".app--anti-btn").unset();
      interact(".app--board").unset();
    },
    handleOnEnter() {
      if (this.protonToMoveIndex >= 0) {
        this.protonToMoveIndex = -1;
      }
    },
    handleOnDrop(e) {
      // console.log("drop");
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.relatedTarget.style.webkitTransform = e.relatedTarget.style.transform =
        "translate(0, 0)";
      e.relatedTarget.removeAttribute("data-x");
      e.relatedTarget.removeAttribute("data-y");
      e.target.style.left = `${this.leftPosition}%`;
      e.target.style.top = "100%";
      e.relatedTarget.style.left = `${this.leftPosition}%`;
      e.relatedTarget.style.top = "105%";
      e.target.classList.remove("app--btn-draggable");
      e.relatedTarget.classList.remove("app--btn-draggable");
      e.relatedTarget.classList.add("app--btn-matched");
      e.target.classList.add("app--btn-matched");
      this.leftPosition = this.leftPosition + 10;
    },
    handleProtonEnter() {
      // console.log("enter");
      this.protonToMoveIndex = -1;
    },
    handleProtonLeave(e) {
      // console.log("leave");
      // console.log(e.relatedTarget.dataset.id);
      this.protonToMoveIndex = e.relatedTarget.dataset.id;
    },
    handleProtonDrop() {
      // console.log("drop");
      // console.log(this.protonToMoveIndex);
    }
  },
  created() {
    this.equation = createProtonsEquation();
    this.setDraggable();
    this.setDropzone();
  },
  destroyed() {
    this.unsetDraggable();
    this.unsetDropzone();
  }
};
</script>

<style scoped>
.app--board {
  height: 450px;
  background-color: #fff263;
  border: 1px solid #555;
  position: relative;
}
.app--click-area {
  cursor: pointer;
}
/* .app--click-area:hover {
  background-color: #eee;
} */
</style>