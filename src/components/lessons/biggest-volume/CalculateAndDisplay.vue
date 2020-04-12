<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-12">
          <div>
            <h3 class="lesson-subheading">Calculate and display a range of up to 11 volumes</h3>
            <hr class="subheading-separator">
            <h4 class="text text-center mb-4">Paper size</h4>
            <div class="row">
              <div class="form-group col-12 col-sm-6 col-md-6">
                <label class="text text-dark">Enter paper's length (4-30)</label>
                <input type="number" class="form-control" v-model="paperLength" />
                <!-- <div class="badge badge-danger">{{ errorMsg.paperLength }}</div> -->
                <div
                  class="badge badge-danger mt-2"
                  v-if="isInvalidPaperLength"
                >Input an integer between 4 - 30</div>
              </div>
              <div class="form-group col-12 col-sm-6 col-md-6">
                <label class="text text-dark">Enter paper's width (4-30)</label>
                <input type="number" class="form-control" v-model="paperWidth" />
                <div
                  class="badge badge-danger mt-2"
                  v-if="isInvalidPaperWidth"
                >Input an integer between 4 - 30</div>
              </div>
              <div class="form-group col-12 col-sm-6 col-md-6">
                <label class="text text-info">
                  Enter the square length
                  <span v-if="maxSquareLength">(up to {{maxSquareLength}})</span>
                </label>
                <input type="number" class="form-control" v-model="squareLength" />
                <div
                  class="badge badge-danger mt-2"
                  v-if="isInvalidSquareLength"
                >Input a valid number less than {{maxSquareLength}}</div>
              </div>
              <div class="form-group col-12 col-sm-6 col-md-6">
                <label class="text text-info">
                  Enter the increment length
                  <span
                    v-if="maxIncrementLength && maxIncrementLength > 0"
                  >(up to {{maxIncrementLength}})</span>
                </label>
                <input type="number" class="form-control" v-model="incrementLength" />
                <div
                  class="badge badge-danger mt-2"
                  v-if="isInvalidIncrementLength"
                >Input a valid number less than {{maxIncrementLength}}</div>
              </div>
            </div>
            <div class="form-group text-center">
              <button class="btn btn-outline-success" @click="handleDisplay">OK</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <table class="table">
            <tr>
              <th>Square length</th>
              <th>Volume</th>
            </tr>
            <tr v-for="(box, index) in boxVolumeArr" :key="index">
              <td :class="{'text-danger': index==biggestVolumeIndex }">{{box.squareSize}}</td>
              <td :class="{'text-danger': index==biggestVolumeIndex }">{{box.volume}}</td>
            </tr>
          </table>
        </div>
        <div class="col-12 col-md-6 app--canvas-container">
          <div class="app--canvas-container-row">
            <div
              style="transform: translateX(10%);"
              class="app--canvas-label"
              v-if="boxVolumeArr[biggestVolumeIndex]"
            >
              <div
                style="transform: translateY(10px);"
              >{{ boxVolumeArr[biggestVolumeIndex].volume }}</div>
              <div style="transform: translateY(115px);">Vol</div>
              <div
                style="transform: translateY(210px);"
              >{{ boxVolumeArr[smallestVolumeIndex].volume }}</div>
            </div>
            <canvas id="app-canvas" style="margin-bottom: 5rem;"></canvas>
          </div>
          <div
            v-if="boxVolumeArr[biggestVolumeIndex]"
            style="transform: translate(100px, -90px);"
          >Square length</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accAdd, accSub, accMul, calDecimal, drawCoord } from "./utils";
export default {
  data: function() {
    return {
      paperLength: null,
      paperWidth: null,
      squareLength: null,
      incrementLength: null,
      boxVolumeArr: [],
      biggestVolumeIndex: 0,
      smallestVolumeIndex: 0,
      isInvalidPaperLength: false,
      isInvalidPaperWidth: false,
      isInvalidSquareLength: false,
      isInvalidIncrementLength: false
    };
  },
  computed: {
    maxSquareLength: function() {
      if (this.paperLength && this.paperWidth) {
        return Math.min(this.paperLength, this.paperWidth) / 2;
      } else {
        return null;
      }
    },
    maxIncrementLength: function() {
      if (this.maxSquareLength && this.squareLength) {
        return accSub(this.maxSquareLength, this.squareLength);
      } else {
        return null;
      }
    }
  },
  watch: {
    paperLength: function(paperLength) {
      if (
        // Check input in paper length
        calDecimal(paperLength) !== 0 ||
        paperLength < 4 ||
        paperLength > 30
      ) {
        this.isInvalidPaperLength = true;
      } else {
        this.isInvalidPaperLength = false;
      }
    },
    paperWidth: function(paperWidth) {
      if (
        // Check input in paper width
        calDecimal(paperWidth) !== 0 ||
        paperWidth < 4 ||
        paperWidth > 30
      ) {
        this.isInvalidPaperWidth = true;
      } else {
        this.isInvalidPaperWidth = false;
      }
    },
    squareLength: function(squareLength) {
      if (
        // Check input in square length
        calDecimal(squareLength) > 6 ||
        squareLength > this.maxSquareLength ||
        squareLength <= 0
      ) {
        this.isInvalidSquareLength = true;
      } else {
        this.isInvalidSquareLength = false;
      }
    },
    incrementLength: function(incrementLength) {
      if (
        // Check input in increment length
        calDecimal(incrementLength) > 6 ||
        incrementLength <= 0 ||
        incrementLength > this.maxIncrementLength
      ) {
        this.isInvalidIncrementLength = true;
      } else {
        this.isInvalidIncrementLength = false;
      }
    }
  },
  methods: {
    handleDisplay() {
      this.boxVolumeArr = [];
      if (
        !this.paperLength ||
        !this.paperWidth ||
        !this.squareLength ||
        !this.incrementLength ||
        this.isInvalidPaperLength ||
        this.isInvalidPaperWidth ||
        this.isInvalidSquareLength ||
        this.isInvalidIncrementLength
      )
        return false;

      let biggestVolume = 0,
        smallestVolume;
      for (
        let size = Number(this.squareLength), n = 0;
        size <= Number(this.maxSquareLength) && n < 11;
        size = accAdd(size, Number(this.incrementLength)), n++
      ) {
        let x = accSub(this.paperLength, accMul(2, size));
        let y = accSub(this.paperWidth, accMul(2, size));
        let volume = accMul(accMul(x, y), size);
        if (volume > biggestVolume) {
          biggestVolume = volume;
          this.biggestVolumeIndex = n;
        }
        if (volume < smallestVolume || !smallestVolume) {
          smallestVolume = volume;
          this.smallestVolumeIndex = n;
        }
        // console.log(volume);
        this.boxVolumeArr.push({
          squareSize: size,
          volume: Number(volume.toFixed(6))
        });
      }
      // console.log(this.boxVolumeArr);
      this.drawCanvas();
    },
    drawCanvas() {
      const canvas = document.querySelector("#app-canvas");
      canvas.height = canvas.width;
      drawCoord(
        canvas,
        this.boxVolumeArr,
        this.biggestVolumeIndex,
        this.smallestVolumeIndex
      );
    }
  },
  created() {
    this.boxVolumeArr = [];
  },
  mounted() {}
};
</script>

<style scoped>
#app-canvas {
  border: none;
}

.app--canvas-container-row {
  display: flex;
}
.app--canvas-label {
  text-align: right;
}
</style>
