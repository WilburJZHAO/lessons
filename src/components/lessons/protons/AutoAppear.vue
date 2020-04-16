<template>
  <div class="container mt-3 pb-5 mb-5">
    <h3 class="lesson-subheading">Auto appear</h3>
    <hr class="subheading-separator">
    <div class="mt-3 app--container">
      <div class="app--input d-flex align-items-center justify-content-center">
        <div class="mx-2">({{ protonsPair.protonText }}, {{ protonsPair.antiText }}) =</div>
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
          <button class="btn btn-outline-success" :disabled="status === 2" @click="handleCheck">OK</button>
        </div>
      </div>
      <div class="mt-2 text-center" style="height: 80px;">
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
      <div class="app--board">
        <div v-for="(button, index) in buttonsArr" :key="index">
          <app-proton-btn
            v-if="button.type === 'p'"
            :style="{
              position: 'absolute',
              left: `${button.x}%`,
              top: `${button.y}%`
            }"
            :isDraggable="true"
          ></app-proton-btn>
          <app-anti-btn
            v-if="button.type === 'a'"
            :style="{
              position: 'absolute',
              left: `${button.x}%`,
              top: `${button.y}%`
            }"
            :isDraggable="true"
          ></app-anti-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createProtonsPair, convertInput } from "./utils";
import { pickNumber } from "../../common/utils";
import ProtonBtn from "./ProtonBtn.vue";
import AntiBtn from "./AntiBtn.vue";
import interact from "interactjs";

export default {
  data: function() {
    return {
      protonsPair: null,
      status: 0,
      // 0 - ready to input answer
      // 1 - check wrong
      // 2 - check correct
      wrongMessage: "",
      inputAnswer: "",
      buttonsArr: [],
      zIndex: 0,
      leftPosition: 0,
      isMatch: false
    };
  },
  components: {
    appProtonBtn: ProtonBtn,
    appAntiBtn: AntiBtn
  },
  watch: {
    buttonsArr() {
      let btns = document.querySelectorAll(".app--btn");
      btns.forEach(btn => {
        btn.style.webkitTransform = btn.style.transform = "translate(0, 0)";
        btn.removeAttribute("data-x");
        btn.removeAttribute("data-y");
        // onsole.log(btn.classList);
        btn.classList.remove("app--btn-matched");
        btn.classList.add("app--btn-draggable");
        btn.style["z-index"] = "";
      });
    }
  },
  methods: {
    handleSetInput(e) {
      // console.log(e);
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

      // Check answer input
      const inputNumber = convertInput(this.inputAnswer);
      const answer = this.protonsPair.pair;
      if (inputNumber > answer) {
        this.status = 1;
        this.wrongMessage = "Too many protons. Try again.";
        return;
      } else if (inputNumber < answer) {
        this.status = 1;
        this.wrongMessage = "Too many anti-protons. Try again.";
        return;
      }
      this.unsetDraggable();
      this.unsetDropZone();
      this.wrongMessage = "";
      this.status = 2;
    },
    drawButtons() {
      this.buttonsArr = [];
      if (!this.protonsPair) {
        return;
      }
      for (let i = 1; i <= this.protonsPair.proton; i++) {
        this.buttonsArr.push({
          type: "p",
          x: pickNumber(10, 90),
          y: pickNumber(10, 90)
        });
      }
      for (let j = 1; j <= this.protonsPair.anti; j++) {
        this.buttonsArr.push({
          type: "a",
          x: pickNumber(10, 90),
          y: pickNumber(10, 90)
        });
      }
    },
    handleNext() {
      this.protonsPair = createProtonsPair();
      this.drawButtons();
      this.setDraggable();
      this.setDropzone();
      this.status = 0;
      this.wrongMessage = "";
      this.inputAnswer = "";
      this.zIndex = 0;
      this.leftPosition = 0;
      this.isMatch = false;
    },
    setDraggable() {
      interact(".app--btn-draggable").draggable({
        inertia: false,
        autoScroll: false,
        modifiers: [
          // keep the element within the area of its parent
          interact.modifiers.restrict({
            restriction: ".app--board",
            endOnly: true
          })
        ],
        onstart: this.handleDragStart,
        onmove: this.handleDragMove,
        onend: this.handleDragEnd
      });
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
    handleDragEnd() {},
    unsetDraggable() {
      interact(".app--btn-draggable").unset();
    },
    setDropzone() {
      interact(".app--proton-btn").dropzone({
        accept: ".app--anti-btn",
        overlap: 0.55,
        ondrop: this.handleOnDrop,
        ondropdeactivate: this.handleOndropdeactivate
      });
      interact(".app--anti-btn").dropzone({
        accept: ".app--proton-btn",
        overlap: 0.55,
        ondrop: this.handleOnDrop,
        ondragenter: this.handleOnDragEnter,
        ondragleave: this.handleOnDragLeave,
        ondropdeactivate: this.handleOndropdeactivate
      });
    },
    unsetDropZone() {
      interact(".app--proton-btn").unset();
      interact(".app--anti-btn").unset();
    },
    handleOnDragEnter() {},
    handleOnDragLeave() {},
    handleOndropdeactivate() {},
    handleOnDrop(e) {
      console.log("drop");
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
    }
  },
  created() {
    this.protonsPair = createProtonsPair();
    this.drawButtons();
    this.setDraggable();
    this.setDropzone();
  },
  destroyed() {
    this.unsetDraggable();
    this.unsetDropZone();
  }
};
</script>

<style scoped>
.app--container {
  max-width: 600px;
  margin: 0 auto;
}
.app--board {
  background-color: #fff263;
  height: 450px;
  border: 1px solid #555;
  padding-bottom: 45px;
  position: relative;
}
</style>
