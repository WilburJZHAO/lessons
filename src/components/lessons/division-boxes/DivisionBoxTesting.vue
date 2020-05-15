<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Test a number</h3>
    <hr class="subheading-speartor" />
    <div class="app--container">
      <div class="d-flex">
        <!-- Tiles -->
        <div v-for="num in 10" :key="num" class="app--tile-container">
          <div
            class="app--tile"
            :class="{ 'app--tile-selected': testNumberArr.includes(num - 1) }"
          >{{ num - 1 }}</div>
          <div class="app--tile-shadow">{{ num - 1 }}</div>
        </div>
      </div>
      <div class="text-danger text-center mt-2">Drag digits to the boxes below, then test.</div>
      <div class="mb-3"></div>
      <div class="d-flex">
        <!-- Boxes -->
        <div v-for="tile in numberOfTiles" :key="`tile${tile}`" class="app--box-wrapper">
          <div
            class="text-center"
            :style="{
              visibility: tested && checkResult[tile - 1] ? 'visible' : 'hidden'
            }"
          >
            <i class="fas fa-check text-success"></i>
          </div>
          <div class="app--box-container">
            <div class="app--box" :data-pos="tile - 1">{{ testNumberArr[tile - 1] }}</div>
            <div class="app--box-shadow">{{ testNumberArr[tile - 1] }}</div>
          </div>
          <div class="text-center text-danger">{{ tile }}</div>
        </div>
      </div>
    </div>
    <div class="mb-3"></div>
    <div class="app--container">
      <!-- selector radios and test button-->
      <div class="text-danger">Select the number of tiles</div>
      <div v-for="num in 9" :key="`radio${num}`" class="form-check form-check-inline">
        <input
          type="radio"
          class="form-check-input"
          :id="`num${num}`"
          :value="num + 1"
          v-model="numberOfTiles"
        />
        <label :for="`num${num}`" class="form-check-label">{{ num + 1 }}</label>
      </div>
      <div class="text-center mt-3">
        <button class="btn btn-outline-success" @click="handleTest">Test</button>
      </div>
    </div>
    <div class="my-2" :style="{ visibility: tested ? 'visible' : 'hidden' }">
      <div class="text-center">
        <span style="font-size: 120%;">{{ testNumberStr }}</span>
        &nbsp;
        <span class="text-danger">
          {{
          correctCount === 0
          ? "No test correct"
          : correctCount === testNumberArr.length
          ? `All ${correctCount} tests correct.`
          : `Only ${correctCount} ${correctCount === 1? "test" : "tests"} correct.`
          }}
        </span>
      </div>
    </div>
    <div class="app--container">
      <!-- Solutions -->
      <h5 class="text-center text-primary">{{ numberOfTiles }} Tile Solutions</h5>
      <div
        class="text-center"
      >Number of solutions: {{ solutions.length > 0 ? solutions.length : "" }}</div>
      <div class="app--solutions" id="solutions-list" style="padding-bottom: 50px;">
        <ul class="list-group">
          <li
            v-for="(solution, index) in solutions"
            class="list-group-item"
            :key="`solution${index}`"
          >{{ solution }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  data: function() {
    return {
      numberOfTiles: 2,
      testNumberArr: [],
      selectedNumber: null,
      targetNumber: null,
      originalPosition: null,
      targetPosition: null,
      solutions: [],
      checkResult: [],
      tested: false
    };
  },
  computed: {
    testNumberStr() {
      let str = "";
      for (let i = 0; i < this.testNumberArr.length; i++) {
        if (this.testNumberArr[i] >= 0) {
          str += this.testNumberArr[i];
        } else {
          return str;
        }
      }
      return str;
    },
    correctCount() {
      let count = 0;
      this.checkResult.forEach(res => {
        if (res === true) {
          count++;
        }
      });
      return count;
    }
  },
  watch: {
    numberOfTiles(value) {
      this.testNumberArr = new Array(this.numberOfTiles);
      this.checkResult = new Array(this.numberOfTiles);
      this.solutions = [];
      this.tested = false;
    },
    solutions(value) {
      const solutionsList = document.getElementById("solutions-list");
      solutionsList.scrollTop = solutionsList.scrollHeight;
    }
  },
  methods: {
    handleTest() {
      for (let i = 0; i < this.testNumberStr.length; i++) {
        let testNumber = this.testNumberStr.substring(0, i + 1);
        let divider = i + 1;
        if (testNumber % divider === 0) {
          this.checkResult[i] = true;
        } else {
          this.checkResult[i] = false;
        }
      }
      this.checkResult = [...this.checkResult];
      if (
        this.testNumberStr.length === this.numberOfTiles &&
        this.checkResult.indexOf(false) === -1 &&
        this.solutions.indexOf(this.testNumberStr) === -1
      ) {
        this.solutions.push(this.testNumberStr);
      }
      this.tested = true;
    },
    setBoxDraggable() {
      interact(".app--box").draggable({
        inertia: false,
        modifiers: [
          interact.modifiers.restrict({
            restriction: ".app--container",
            endOnly: true
          })
        ],
        autoScroll: true,
        onstart: this.handleOnBoxDragStart,
        onmove: this.handleOnBoxDragMove,
        onend: this.handleOnBoxDragEnd
      });
    },
    handleOnBoxDragStart(e) {
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.target.classList.add("app--tile-dragging");
      this.selectedNumber = e.target.textContent.trim()
        ? Number(e.target.textContent.trim())
        : null;
      this.originalPosition = Number(e.target.getAttribute("data-pos"));
      this.targetPosition = null;
      console.log(this.selectedNumber);
    },
    handleOnBoxDragMove(e) {
      if (this.selectedNumber === null) {
        return;
      }
      let { target } = e;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    handleOnBoxDragEnd(e) {
      e.target.classList.remove("app--tile-dragging");
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      this.tested = false;
      if (this.targetPosition === null) {
        this.testNumberArr[this.originalPosition] = undefined;
        this.testNumberArr = [...this.testNumberArr];
        return;
      }
    },
    unsetBoxDraggable() {
      interact(".app--box").unset();
    },

    /** Drag and drop of tiles */
    setTilesDraggable() {
      interact(".app--tile").draggable({
        inertia: false,
        modifiers: [
          interact.modifiers.restrict({
            restriction: ".app--container",
            endOnly: true
          })
        ],
        autoScroll: true,
        onstart: this.handleOnTileDragStart,
        onmove: this.handleOnTileDragMove,
        onend: this.handleOnTileDragEnd
      });
    },
    handleOnTileDragStart(e) {
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.target.classList.add("app--tile-dragging");
      this.selectedNumber = Number(e.target.textContent.trim());
      const selectedNumberIndex = this.testNumberArr.indexOf(
        this.selectedNumber
      );
      if (selectedNumberIndex >= 0) {
        this.testNumberArr[selectedNumberIndex] = undefined;
        this.testNumberArr = [...this.testNumberArr];
      }
      this.originalPosition = null;
    },
    handleOnTileDragMove(e) {
      let { target } = e;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    handleOnTileDragEnd(e) {
      e.target.classList.remove("app--tile-dragging");
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      this.tested = false;
    },
    unsetTilesDraggable() {
      interact(".app--tile").unset();
    },
    // End of tiles dropzone setting

    /** Set box drop zone */
    setDropzone() {
      interact(".app--box").dropzone({
        accept: ".app--tile-dragging",
        overlap: 0.25,
        ondrop: this.handleOnDrop
      });
    },
    unsetDropzone() {
      interact(".app--box").unset();
    },
    handleOnDrop(e) {
      // console.log(e.target);
      // console.log(e.relatedTarget);
      this.targetPosition = Number(e.target.getAttribute("data-pos"));
      this.targetNumber = this.testNumberArr[this.targetPosition];

      if (this.originalPosition === null) {
        if (this.selectedNumber === 0 && this.targetPosition === 0) {
          // Cannot put 0 at the first digit position;
          return;
        }
        // If the number is moved from tiles
        this.testNumberArr[this.targetPosition] = this.selectedNumber;
      } else {
        // Consider move numbers between different boxes.
        if (this.selectedNumber === 0 && this.targetPosition === 0) {
          // Cannot put 0 at the first digit position;
          this.testNumberArr[this.targetPosition] = undefined;
        } else {
          this.testNumberArr[this.targetPosition] = this.selectedNumber;
        }
        let temp = this.testNumberArr[this.originalPosition];
        this.testNumberArr[this.originalPosition] = this.targetNumber;
        // let temp = this.testNumberArr[this.originalPosition];
        // this.testNumberArr[this.targetPosition] = this.selectedNumber;
        // this.testNumberArr[this.originalPosition] = temp;
      }
      this.testNumberArr = [...this.testNumberArr];
    }
    // End of box dropzone setting
  },
  created() {
    this.testNumberArr = new Array(this.numberOfTiles);
    this.solutionsCheckResult = new Array(this.numberOfTiles);
  },
  mounted() {
    this.setTilesDraggable();
    this.setBoxDraggable();
    this.setDropzone();
  },
  destroyed() {
    this.unsetTilesDraggable();
    this.unsetBoxDraggable();
    this.unsetDropzone();
  }
};
</script>

<style scoped>
.app--container {
  max-width: 500px;
  margin: 0 auto;
}
.app--tile-container {
  /* border: 1px solid #000; */
  width: 10%;
  height: 45px;
  margin-left: 2px;
  margin-right: 2px;
  font-size: 150%;
  position: relative;
}
.app--tile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  touch-action: none;
  z-index: 5;
  border: 1px solid #000;
}
.app--tile-shadow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border: 1px solid #ccc;
  color: #ccc;
}
.app--tile-selected {
  color: red;
}
.app--box-wrapper {
  width: 10%;
  margin-left: 2px;
  margin-right: 2px;
}
.app--box-container {
  position: relative;
}
.app--box {
  width: 100%;
  height: 45px;
  color: red;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  z-index: 1;
  touch-action: none;
}
.app--box-shadow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 150%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border: 1px solid #ccc;
  color: #ccc;
}
.app--solutions {
  height: 300px;
  width: 250px;
  margin: 0 auto;
  overflow: auto;
}
</style>
