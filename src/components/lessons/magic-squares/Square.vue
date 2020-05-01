<template>
  <div class="app--square">
    <div class="app--square-outer-container p-5">
      <div class="app--square-inner-container">
        <div v-for="(row, indexRow) in squareArr" :key="indexRow" class="app--square-row">
          <div v-if="indexRow === 0" class="app--check-result app--check-result-firstrow">
            <div
              class="app--check-result-firstrow1"
              style="color: black;"
              v-bind:style="{
                visibility:
                  (!strategy || (strategy && step == 3)) &&
                  isStart &&
                  isDiagnoalMagic1 === true
                    ? 'visible'
                    : 'hidden',
              }"
            >
              <i class="fas fa-asterisk"></i>
            </div>
            <div
              class="app--check-result-firstrow2"
              style="color: purple; padding-right: 5px"
              v-bind:style="{
                visibility:
                  (!strategy ||
                    (strategy == 'rowsFirst' && step >= 1) ||
                    (strategy == 'colsFirst' && step >= 2)) &&
                  isStart &&
                  isRowMagic[indexRow]
                    ? 'visible'
                    : 'hidden',
              }"
            >
              <i class="fas fa-asterisk"></i>
            </div>
          </div>
          <div
            v-else
            class="app--check-result"
            style="color: purple; padding-right: 5px"
            v-bind:style="{
              visibility:
                (!strategy ||
                  (strategy == 'rowsFirst' && step >= 1) ||
                  (strategy == 'colsFirst' && step >= 2)) &&
                isStart &&
                isRowMagic[indexRow]
                  ? 'visible'
                  : 'hidden',
            }"
          >
            <div>
              <i class="fas fa-asterisk"></i>
            </div>
          </div>
          <div v-for="(number, indexCol) in row" :key="indexCol">
            <div v-if="indexRow === 0" class="app--check-result app--check-result-lastcol">
              <div
                class="app--check-result-lastcol1"
                style="color: red; padding-bottom: 5px;"
                v-bind:style="{
                  visibility:
                    (!strategy ||
                      (strategy == 'colsFirst' && step >= 1) ||
                      (strategy == 'rowsFirst' && step >= 2)) &&
                    isStart &&
                    isColMagic[indexCol]
                      ? 'visible'
                      : 'hidden',
                }"
              >
                <i class="fas fa-asterisk"></i>
              </div>
              <div
                v-if="indexCol === row.length - 1"
                class="app--check-result-lastcol2"
                style="color: blue;"
                v-bind:style="{
                  visibility:
                    (!strategy || (strategy && step == 3)) &&
                    isStart &&
                    isDiagnoalMagic2 === true
                      ? 'visible'
                      : 'hidden',
                }"
              >
                <i class="fas fa-asterisk"></i>
              </div>
            </div>
            <div class="app--square-number-container">
              <div class="app--square-number">{{ number }}</div>
              <div class="app--square-number-shadow">{{ number }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center text-success">Magic sum is {{ magicSum }}</p>
    <h5 v-if="isSquareMagic" class="text-center text-danger mb-3">It's a magic square!</h5>
    <div class="app--action-reset pb-3">
      <button class="btn btn-secondary" @click="initSquare">Reset</button>
    </div>
    <!-- <app-test></app-test> -->
  </div>
</template>

<script>
import interact from "interactjs";
export default {
  props: ["size", "step", "strategy", "lockRows", "lockCols"],
  data: function() {
    return {
      squareArrInit: [],
      displayShadow: false,
      isStart: false
    };
  },
  computed: {
    magicSum() {
      switch (this.size) {
        case "3":
          return 15;
        case "4":
          return 34;
        default:
          return 0;
      }
    },
    squareArr() {
      switch (this.size) {
        case "3":
          return [
            [...this.squareArrInit.slice(0, 3)],
            [...this.squareArrInit.slice(3, 6)],
            [...this.squareArrInit.slice(6)]
          ];
        case "4":
          return [
            [...this.squareArrInit.slice(0, 4)],
            [...this.squareArrInit.slice(4, 8)],
            [...this.squareArrInit.slice(8, 12)],
            [...this.squareArrInit.slice(12)]
          ];
        default:
          return [];
      }
    },
    isDiagnoalMagic1() {
      // Check magic number on diagnoal direction
      switch (this.size) {
        case "3":
          return (
            this.squareArr[0][0] +
              this.squareArr[1][1] +
              this.squareArr[2][2] ===
            this.magicSum
          );
        case "4":
          return (
            this.squareArr[0][0] +
              this.squareArr[1][1] +
              this.squareArr[2][2] +
              this.squareArr[3][3] ===
            this.magicSum
          );
        default:
          return false;
      }
    },
    isDiagnoalMagic2() {
      // Check magic number on diagnoal direction
      switch (this.size) {
        case "3":
          return (
            this.squareArr[2][0] +
              this.squareArr[1][1] +
              this.squareArr[0][2] ===
            this.magicSum
          );
        case "4":
          return (
            this.squareArr[3][0] +
              this.squareArr[2][1] +
              this.squareArr[1][2] +
              this.squareArr[0][3] ===
            this.magicSum
          );
        default:
          return false;
      }
    },
    isRowMagic() {
      // Check magic numbers on rows
      let isRowMagicTemp;
      if (this.squareArr.length === 3) {
        isRowMagicTemp = [false, false, false];
      } else if (this.squareArr.length === 4) {
        isRowMagicTemp = [false, false, false, false];
      } else {
        return null;
      }
      for (let iRow = 0; iRow < this.squareArr.length; iRow++) {
        let sumInRow = 0;
        for (let iCol = 0; iCol < this.squareArr[iRow].length; iCol++) {
          sumInRow += this.squareArr[iRow][iCol];
          if (sumInRow == this.magicSum) {
            isRowMagicTemp[iRow] = true;
          } else {
            isRowMagicTemp[iRow] = false;
          }
        }
      }
      return [...isRowMagicTemp];
    },
    isColMagic() {
      // Check magic numbers on columns
      let isColMagicTemp;
      if (this.squareArr.length === 3) {
        isColMagicTemp = [false, false, false];
      } else if (this.squareArr.length === 4) {
        isColMagicTemp = [false, false, false, false];
      } else {
        return null;
      }
      for (let i = 0; i < this.squareArr.length; i++) {
        switch (this.size) {
          case "3":
            if (
              this.squareArr[0][i] +
                this.squareArr[1][i] +
                this.squareArr[2][i] ==
              this.magicSum
            ) {
              isColMagicTemp[i] = true;
            }
            break;
          case "4":
            if (
              this.squareArr[0][i] +
                this.squareArr[1][i] +
                this.squareArr[2][i] +
                this.squareArr[3][i] ==
              this.magicSum
            ) {
              isColMagicTemp[i] = true;
            }
            break;
          default:
            return [...isColMagicTemp];
        }
      }
      return [...isColMagicTemp];
    },
    isSquareMagic() {
      // Check if magic square is made
      let isSquareMagicTemp = true;
      for (let i = 0; i < this.isRowMagic.length; i++) {
        if (!this.isRowMagic[i]) {
          isSquareMagicTemp = false;
        }
      }
      for (let i = 0; i < this.isColMagic.length; i++) {
        if (!this.isColMagic[i]) {
          isSquareMagicTemp = false;
        }
      }
      if (!this.isDiagnoalMagic1 || !this.isDiagnoalMagic2) {
        isSquareMagicTemp = false;
      }
      if (!this.strategy || (this.strategy && this.step == 3)) {
        return isSquareMagicTemp;
      }
      return false;
    }
  },
  methods: {
    initSquare() {
      this.isStart = false;
      switch (this.size) {
        case "3":
          this.squareArrInit = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          this.$emit("watchSquare", {
            // Emit data to parent component
            isRowMagic: this.isRowMagic,
            isColMagic: this.isColMagic,
            // isSquareMagic: this.isSquareMagic,
            // isDiagnoalMagic1: this.isDiagnoalMagic1,
            // isDiagnoalMagic2: this.isDiagnoalMagic2,
            reset: true
          });
          return;
        case "4":
          this.squareArrInit = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ];
          this.$emit("watchSquare", {
            // Emit data to parent component
            isRowMagic: this.isRowMagic,
            isColMagic: this.isColMagic,
            // isSquareMagic: this.isSquareMagic,
            // isDiagnoalMagic1: this.isDiagnoalMagic1,
            // isDiagnoalMagic2: this.isDiagnoalMagic2,
            reset: true
          });
          return;
        default:
          return (this.squareArr = []);
      }
    },

    handleOnDragStart(e) {
      if (this.isSquareMagic) return;
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.target.classList.add("app--number-selected");
    },

    handleOnDragMove(e) {
      if (this.isSquareMagic) return;
      var target = e.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      // console.log(e.dx, ':' ,e.dy);
      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },

    handleOnDragEnd(e) {
      if (!this.isStart) this.isStart = true;
      e.target.classList.remove("app--number-selected");
    },

    // Set each number in grid to be draggable
    setDraggable() {
      interact(".app--square-number").draggable({
        inertia: false,
        modifiers: [
          // keep the element within the area of its parent
          interact.modifiers.restrict({
            restriction: ".app--square-inner-container",
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
      interact(".app--square-number").unset();
    },

    handleOnDropActivate() {
      // console.log('drop activate');
      this.displayShadow = true;
      // console.log(e.target);
    },
    // handleOnDragEnter(e) {
    //   // console.log('drag enter');
    // },
    // handleOnDragLeave(e) {
    //   // console.log('drag leave');
    // },

    handleOnDrop(e) {
      let selectedNumberEl = e.relatedTarget,
        selectedNumber = e.relatedTarget.textContent,
        selectedNumberIndex = this.squareArrInit.indexOf(
          Number(selectedNumber)
        ),
        selectedNumberIndexXY = this.getXY(selectedNumberIndex),
        targetNumberEl = e.target,
        targetNumber = e.target.textContent.substring(
          0,
          targetNumberEl.textContent.length / 2
        ), // Truncate the last half part to get the correct number
        targetNumberIndex = this.squareArrInit.indexOf(Number(targetNumber)),
        targetNumberIndexXY = this.getXY(targetNumberIndex);
      // console.log(selectedNumberEl.textContent, '---', targetNumberEl.textContent.length);

      // console.log(selectedNumberIndex, '-', selectedNumber, 'dropped');
      // console.log(targetNumberIndex, '-', targetNumber, 'target');
      // console.log('selected:', selectedNumberIndexXY, 'target:', targetNumberIndexXY);
      if (this.strategy == "colsFirst" && this.step == 2) {
        //只能行间移动，除此以外不允许移动
        if (selectedNumberIndexXY.y != targetNumberIndexXY.y) {
          selectedNumberEl.style.webkitTransform = selectedNumberEl.style.transform =
            "translate(0, 0)";
          return;
        }
      }

      if (this.strategy == "rowsFirst" && this.step == 2) {
        // 只能列间移动，除此以外不允许移动
        if (selectedNumberIndexXY.x != targetNumberIndexXY.x) {
          selectedNumberEl.style.webkitTransform = selectedNumberEl.style.transform =
            "translate(0, 0)";
          return;
        }
      }

      if (this.strategy && this.step == 3) {
        // 只能列间或者行间移动，除此以外不允许移动
        if (
          selectedNumberIndexXY.x != targetNumberIndexXY.x &&
          selectedNumberIndexXY.y != targetNumberIndexXY.y
        ) {
          selectedNumberEl.style.webkitTransform = selectedNumberEl.style.transform =
            "translate(0, 0)";
          return;
        }
      }

      if (selectedNumber && targetNumber && selectedNumber != targetNumber) {
        // Swap numbers
        // let temp = this.squareArrInit[selectedNumberIndex];
        // this.squareArrInit[selectedNumberIndex] = this.squareArrInit[targetNumberIndex];
        // this.squareArrInit[targetNumberIndex] = temp;
        this.squareArrInit = [...this.squareArrInit];
        [
          this.squareArrInit[selectedNumberIndex],
          this.squareArrInit[targetNumberIndex]
        ] = [
          this.squareArrInit[targetNumberIndex],
          this.squareArrInit[selectedNumberIndex]
        ];

        // Move the number to their correct positions
        selectedNumberEl.style.webkitTransform = selectedNumberEl.style.transform =
          "translate(0, 0)";
        selectedNumberEl.removeAttribute("data-x");
        selectedNumberEl.removeAttribute("data-y");

        targetNumberEl.style.webkitTransform = targetNumberEl.style.transform =
          "translate(0, 0)";
        targetNumberEl.removeAttribute("data-x");
        targetNumberEl.removeAttribute("data-y");
      } else {
        selectedNumberEl.style.webkitTransform = selectedNumberEl.style.transform =
          "translate(0, 0)";
      }
      // console.log(this.squareArr);

      // this.initSquare();
      this.displayShadow = false;
      this.$emit("watchSquare", {
        // Emit data to parent component
        isRowMagic: this.isRowMagic,
        isColMagic: this.isColMagic,
        reset: false
        // isSquareMagic: this.isSquareMagic,
        // isDiagnoalMagic1: this.isDiagnoalMagic1,
        // isDiagnoalMagic2: this.isDiagnoalMagic2
      });
    },
    handleOndropdeactivate() {
      // console.log('drop deactivate');
      this.displayShadow = false;
    },

    getXY(index) {
      // 根据元素在一维数组(squareArrInit)中的index 计算出其在二维数组(squareArr)中的坐标位置
      // 返回一个对象 如{x: 1, y: 2}
      let x, y;
      const size = this.size;
      x = Math.floor(index / size);
      y = index - x * size;
      return {
        x,
        y
      };
    },

    // Set dropzone
    setDropzone() {
      interact(".app--square-number-container").dropzone({
        accept: ".app--number-selected",
        overlap: 0.25,

        ondropactivate: this.handleOnDropActivate,
        ondragenter: this.handleOnDragEnter,
        ondragleave: this.handleOnDragLeave,
        ondrop: this.handleOnDrop,
        ondropdeactivate: this.handleOndropdeactivate
      });
    },
    unsetDropzone() {
      interact(".app--square-number-container").unset();
    }
  },
  watch: {
    size() {
      this.initSquare();
    }
  },
  created() {
    if (this.squareArrInit.length === 0) {
      this.initSquare();
    }
    /** Set up number can be dragged */
  },
  mounted() {
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
.app--square {
  margin: 0 auto;
}
.app--square-outer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 5% 22%; */
}
.app--square-inner-container {
  display: inline-block;
}
.app--square-row {
  display: flex;
}
.app--square-number-container {
  border: 1px solid #eee;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.app--square-number {
  width: 100%;
  height: 100%;
  font-size: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
  border: 1px solid #000;
  z-index: 1;
}
.app--square-number-shadow {
  width: 100%;
  height: 100%;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  position: absolute;
  z-index: -1;
}
.app--action-reset {
  display: flex;
  justify-content: center;
}

.app--number-selected {
  z-index: 100;
}

.app--check-result {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--check-result-firstrow {
  flex-direction: column;
  justify-content: space-between;
}
.app--check-result-firstrow1 {
  flex: initial;
}
.app--check-result-firstrow2 {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--check-result-lastcol {
  position: relative;
}
.app--check-result-lastcol2 {
  position: absolute;
  right: -30%;
}

@media only screen and (max-width: 576px) {
  .app--square-number-container {
    width: 65px;
    height: 65px;
  }
  .app--square-number {
    font-size: 1.6rem;
  }
  .app--square-number-shadow {
    font-size: 1.6rem;
  }
}
</style>
