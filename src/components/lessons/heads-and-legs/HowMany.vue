<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-success text-center mb-4">How many pigs and chickens in the field</h3>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h6>There are {{ problem.heads }} animals with {{ problem.legs }} legs.</h6>
        <h6>How many pigs are there?</h6>
        <h6>How many chickens are there?</h6>
        <div class="d-flex justify-content-between">
          <div class="flex-grow-1 mr-1 d-flex flex-column align-items-center">
            <img
              class="app--image"
              :src="pigPicSrc"
              alt="Pig"
              data-animal="pig"
              style="visibility: hidden;"
            />
            <img
              class="app--image app--image-draggable"
              :src="pigPicSrc"
              alt="Pig"
              data-animal="pig"
            />
            <div class="app--data-box">{{ status > 0 ? solution.pigNum : ''}}</div>
            <div class="app--data-box" style="visibility: hidden;"></div>
          </div>
          <div
            class="flex-grow-1 mx-1 d-flex flex-column align-items-center"
            style="position: relative;"
          >
            <img
              class="app--image"
              :src="chickenPicSrc"
              alt="Chicken"
              data-animal="chicken"
              style="visibility: hidden;"
            />
            <img
              class="app--image app--image-draggable"
              :src="chickenPicSrc"
              alt="Chicken"
              data-animal="chicken"
            />

            <div class="app--data-box">{{ status > 0 ? solution.chickenNum : ''}}</div>
            <div
              class="app--data-box text-danger d-flex justify-content-end align-items-center"
              style="border: none; padding-right: 10px;"
            >Target</div>
          </div>
          <div class="flex-grow-1 mx-1 d-flex flex-column justify-content-between">
            <h6 class="flex-grow-1 d-flex justify-content-center align-items-end">Heads</h6>
            <div class="app--data-box">{{ status > 0 ? headLegNum.head : ''}}</div>
            <div class="app--data-box">{{ problem.heads }}</div>
          </div>
          <div class="flex-grow-1 ml-1 d-flex flex-column justify-content-between">
            <h6 class="flex-grow-1 d-flex justify-content-center align-items-end">{{ " " }}Legs</h6>
            <div class="app--data-box">{{ status > 0 ? headLegNum.leg : ''}}</div>
            <div class="app--data-box">{{ problem.legs }}</div>
          </div>
        </div>
        <div
          class="mt-3 alert alert-danger text-center"
          v-if="status === 0 || status === 1"
        >Begin by dragging the animal into the field</div>
        <div class="mt-3 text-center" v-if="status === 2">
          <div class="text-center alert alert-success">Problem solved!</div>
          <button
            class="btn btn-outline-success"
            @click="handleNewProblem"
          >Tap here for a new problem</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="app--dragging-area" ref="draggingArea"></div>
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
import { generateProblem } from "./utils";
import pigPicSrc from "@/assets/heads-and-legs/pig.png";
import chickenPicSrc from "@/assets/heads-and-legs/chicken.png";
import "./styles.css";
export default {
  data: function() {
    return {
      problem: null,
      MIN_ANIMALS: 6,
      MAX_ANIMALS: 10,
      pigPicSrc,
      chickenPicSrc,
      status: 0,
      // status = 0: not begin
      // status = 1: started
      // status = 2: finish
      solution: {
        pigNum: 0,
        chickenNum: 0
      }
    };
  },
  computed: {
    headLegNum() {
      return {
        head: this.solution.pigNum + this.solution.chickenNum,
        leg: this.solution.pigNum * 4 + this.solution.chickenNum * 2
      };
    }
  },
  watch: {
    solution(value) {
      if (
        value.pigNum === this.problem.pigsHeads &&
        value.chickenNum === this.problem.chickensHeads
      ) {
        this.status = 2;
        this.unsetDraggable();
        this.unsetDraggablePositioned();
        this.unsetDropzone();
      }
    }
  },
  methods: {
    initProblem() {
      this.problem = generateProblem(this.MIN_ANIMALS, this.MAX_ANIMALS);
    },
    handleNewProblem() {
      this.initProblem();
      this.status = 0;
      this.solution = {
        pigNum: 0,
        chickenNum: 0
      };
      this.$refs.draggingArea.innerHTML = "";
      this.setDraggable();
      this.setDraggablePositioned();
      this.setDropzone();
    },

    setDraggable() {
      interact(".app--image-draggable").draggable({
        inertia: false,
        autoScroll: true,
        onstart: this.handleDragStart,
        onmove: this.handleDragMove,
        onend: this.handleDragEnd
      });
    },
    unsetDraggable() {
      interact(".app--image-draggable").unset();
    },

    handleDragStart(e) {
      e.target.classList.add("app--image-selected");
      // eslint-disable-next-line no-console
      // console.log(e.target.parentElement.firstElementChild);
      e.target.parentElement.firstElementChild.setAttribute(
        "style",
        "visibility: visible;"
      );
    },
    handleDragMove(e) {
      let target = e.target;
      // keep the dragged position in the data-x/data-y attributes
      let x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      let y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      // console.log(e.dx, ':' ,e.dy);
      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the position attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    handleDragEnd(e) {
      if (this.status === 0) {
        this.status = 1;
      }
      e.target.classList.remove("app--image-selected");
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.target.parentElement.firstElementChild.setAttribute(
        "style",
        "visibility: hidden;"
      );
    },

    setDraggablePositioned() {
      interact(".app--image-draggable-positioned").draggable({
        inertia: false,
        autoScroll: true,
        onstart: this.handleDragPositionedStart,
        onmove: this.handleDragPositionedMove,
        onend: this.handleDragPositionedEnd
      });
    },
    unsetDraggablePositioned() {
      interact(".app--image-draggable-positioned").unset();
    },
    handleDragPositionedStart(e) {
      e.target.classList.add("app--image-selected");
    },
    handleDragPositionedMove(e) {
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
    handleDragPositionedEnd(e) {
      e.target.setAttribute("style", "display: none");
      this.countHeadsAndLegs();
    },

    setDropzone() {
      interact(".app--dragging-area").dropzone({
        accept: ".app--image-selected",
        overlap: 0.8,
        ondragenter: this.handleDragEnter,
        ondragleave: this.handleDragLeave,
        ondrop: this.handleDrop
      });
    },
    unsetDropzone() {
      interact(".app--dragging-area").unset();
    },
    handleDragEnter() {},
    handleDragLeave() {},
    handleDrop(e) {
      this.canDrop = false;
      let animal = e.relatedTarget.getAttribute("data-animal");

      // eslint-disable-next-line no-console
      // console.log(e.relatedTarget);
      e.target.innerHTML += `
          <img src=${e.relatedTarget.src} style="width: 80px; touch-action: none; " 
            class="app--image-draggable-positioned" data-animal=${animal}
          />
        `;

      this.countHeadsAndLegs();
    },

    countHeadsAndLegs() {
      let pigNum = 0;
      let chickenNum = 0;
      let animalsEl = this.$refs.draggingArea.children;
      for (let i = 0; i < animalsEl.length; i++) {
        // eslint-disable-next-line no-console
        // console.log(animalsEl[i]);
        if (
          animalsEl[i].getAttribute("data-animal") === "pig" &&
          animalsEl[i].style.display !== "none"
        ) {
          pigNum++;
        }
        if (
          animalsEl[i].getAttribute("data-animal") === "chicken" &&
          animalsEl[i].style.display !== "none"
        ) {
          chickenNum++;
        }
      }

      this.solution = {
        pigNum,
        chickenNum
      };
    }
  },
  created() {
    this.initProblem();
  },
  mounted() {
    this.setDraggable();
    this.setDraggablePositioned();
    this.setDropzone();
  },
  destroyed() {
    this.unsetDraggable();
    this.unsetDraggablePositioned();
    this.unsetDropzone();
  }
};
</script>

<style scoped>
</style>
