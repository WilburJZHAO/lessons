<template>
  <div class="container mt-3">
    <h3 class="text-center text-success">Fractions to decimals</h3>
    <div class="mb-3"></div>
    <div class="row">
      <div class="col-md-3">
        <div class="mb-3">
          <label>Enter an estimate of the decimal equivalent</label>
          <input type="number" class="form-control mb-2" v-model.number="decimalInput" />
          <h5 v-if="status === 2" class="text-center">{{ decimalData }}</h5>
        </div>
        <div class="text-center mb-2">
          <button
            class="btn btn-outline-dark mb-2"
            @click="handleNext"
            :disabled="status !== 2"
          >Next</button>
          <br />
          <button class="btn btn-outline-success" @click="handleCheck" :disabled="status !== 1">OK</button>
        </div>
        <div>
          <h3 class="text-center" style="transform: translateY(100%);">{{ fractionData.numerator }}</h3>
          <h3 class="text-center">___</h3>
          <h3
            class="text-center"
            style="transform: translateY(-20%);"
          >{{ fractionData.denominator }}</h3>
        </div>
        <app-fraction-selection
          :fractionSelection="fractionSelection"
          @fractionChange="handleFractionChange"
        ></app-fraction-selection>
      </div>
      <div class="col-md-9">
        <div id="ropeContainer" class="canvasContainer"></div>
        <div class="text-danger mb-3 text-center">
          <span v-if="status !== 2">Click on the pink rope to estimate the given fraction</span>
          <span v-if="status === 2">Next button for new challenge</span>
        </div>
        <app-accuracy-stat
          :trialNumber="trialNumber"
          :estAccuracy="estimateAccuracy"
          :estArray="estimateArray"
        ></app-accuracy-stat>
      </div>
    </div>
  </div>
</template>

<script>
import Konva from "konva";
import { pickNumber } from "../../common/utils";
import { fractionSelection, generateFraction, APP_CONST } from "./utils";
import FractionSelection from "./FractionSelection.vue";
import AccuracyStat from "./AccuracyStat.vue";
export default {
  components: {
    appFractionSelection: FractionSelection,
    appAccuracyStat: AccuracyStat
  },
  data: function() {
    return {
      fractionSelection,
      fractionData: null,
      ropeWidth: 0,
      maxWidth: 0,
      stage: null,
      layer: null,
      // tagLayer: null,
      // divideLineLayer: null,
      divideLine: null,
      tagLineLayer: null,
      canDrag: false,
      divideLineX: 0,
      estimateDecimal: 0,
      trialNumber: 0,
      estimateAccuracy: 0,
      estimateArray: [],
      status: 0,
      decimalInput: null
    };
  },
  computed: {
    decimalData() {
      if (!this.fractionData) {
        return 0;
      }
      return Number(
        (this.fractionData.numerator / this.fractionData.denominator).toFixed(3)
      );
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("ropeContainer").offsetWidth;
      // console.log(this.maxWidth);
      this.stage = new Konva.Stage({
        container: "ropeContainer",
        width: this.maxWidth,
        height: APP_CONST.CONTAINER_HEIGHT
      });
    },
    handleFractionChange() {
      this.fractionData = generateFraction(this.fractionSelection);
      this.drawRope();
      this.drawTags();
      this.status = 0;
      this.decimalInput = null;
    },
    drawRope() {
      this.initStage();
      // if (!this.stage) {
      //   this.initStage();
      // }
      this.maxWidth = document.getElementById("ropeContainer").offsetWidth - 10;
      this.ropeWidth =
        this.maxWidth > APP_CONST.MIN_ROPE_WIDTH
          ? pickNumber(APP_CONST.MIN_ROPE_WIDTH, this.maxWidth)
          : this.maxWidth;

      // Draw rope
      this.layer = new Konva.Layer();
      const rope = new Konva.Rect({
        x: (this.maxWidth - this.ropeWidth) / 2,
        y: 0,
        width: this.ropeWidth,
        height: APP_CONST.ROPE_HEIGHT,
        fill: "pink",
        stroke: "pink",
        strokeWidth: 1
      });
      this.layer.add(rope);
      this.stage.add(this.layer);

      this.stage.on("mousedown", () => {
        if (this.status === 2) {
          return;
        }
        if (this.status === 0) {
          this.status = 1;
        }
        const mousePos = this.stage.getPointerPosition();
        this.drawDivideLine(mousePos.x, 0, mousePos.x, APP_CONST.ROPE_HEIGHT);
        this.canDrag = true;
      });
      this.stage.on("mousemove", () => {
        const mousePos = this.stage.getPointerPosition();
        if (this.canDrag) {
          // console.log(mousePos);
          this.drawDivideLine(mousePos.x, 0, mousePos.x, APP_CONST.ROPE_HEIGHT);
        }
      });
      this.stage.on("mouseup", () => {
        this.canDrag = false;
        this.estimateDecimal = Number(
          (
            (this.divideLineX - (this.maxWidth - this.ropeWidth) / 2) /
            this.ropeWidth
          ).toFixed(3)
        );
      });

      this.stage.on("touchstart", () => {
        if (this.status === 2) {
          return;
        }
        if (this.status === 0) {
          this.status = 1;
        }
        const mousePos = this.stage.getPointerPosition();
        this.drawDivideLine(mousePos.x, 0, mousePos.x, APP_CONST.ROPE_HEIGHT);
        this.canDrag = true;
      });
      this.stage.on("touchmove", () => {
        // console.log("move", this.canDrag);
        const mousePos = this.stage.getPointerPosition();
        if (this.canDrag) {
          // console.log(mousePos);
          this.drawDivideLine(mousePos.x, 0, mousePos.x, APP_CONST.ROPE_HEIGHT);
        }
      });
      this.stage.on("touchend", () => {
        this.canDrag = false;
        this.estimateDecimal = Number(
          (
            (this.divideLineX - (this.maxWidth - this.ropeWidth) / 2) /
            this.ropeWidth
          ).toFixed(3)
        );
      });
    },
    drawDivideLine(startX, startY, endX, endY) {
      // if (!this.divideLineLayer) {
      // this.divideLineLayer.destroy();
      // this.divideLineLayer = new Konva.Layer();
      // }
      const boundaryLeft = (this.maxWidth - this.ropeWidth) / 2;
      const boundaryRight = boundaryLeft + this.ropeWidth;
      this.divideLineX =
        startX <= boundaryLeft
          ? boundaryLeft
          : startX >= boundaryRight
          ? boundaryRight
          : startX;
      if (!this.divideLine) {
        this.divideLine = new Konva.Line({
          points: [this.divideLineX, startY, this.divideLineX, endY],
          stroke: "black",
          strokeWidth: 1
        });
      } else {
        this.divideLine.points([
          this.divideLineX,
          startY,
          this.divideLineX,
          endY
        ]);
        this.divideLine.draw();
      }
      this.layer.add(this.divideLine);
      this.stage.add(this.layer);
    },
    drawTags() {
      // this.tagLayer = new Konva.Layer();
      const unitRopeWidth = this.ropeWidth / 10;
      // const length = 11;
      const offsetX = (this.maxWidth - this.ropeWidth) / 2;

      [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].forEach(
        (el, index) => {
          const tagPositionOnX = unitRopeWidth * index + offsetX;
          const tagPositionOnY =
            APP_CONST.ROPE_HEIGHT - APP_CONST.MARGIN_Y * 0.4;
          const tag = new Konva.Line({
            points: [
              tagPositionOnX,
              tagPositionOnY,
              tagPositionOnX,
              tagPositionOnY + APP_CONST.TAG_HEIGHT
            ],
            stroke: "blue",
            strokeWidth: 1
          });

          const text = new Konva.Text({
            x: tagPositionOnX - APP_CONST.TAG_TEXT_OFFSET,
            y: tagPositionOnY + APP_CONST.TAG_HEIGHT + 5,
            text: el,
            fontSize: 13,
            fill: "blue"
          });
          this.layer.add(tag);
          this.layer.add(text);
        }
      );

      this.stage.add(this.layer);
    },

    drawTagsLine() {
      if (!this.fractionData) {
        return;
      }
      this.tagLineLayer = new Konva.Layer();
      const unitRopeWidth = Number(
        (this.ropeWidth / this.fractionData.denominator).toFixed(2)
      );
      const offsetX = (this.maxWidth - this.ropeWidth) / 2;
      for (let i = 1; i < this.fractionData.denominator; i++) {
        let tagLine = new Konva.Line({
          points: [
            unitRopeWidth * i + offsetX,
            0,
            unitRopeWidth * i + offsetX,
            APP_CONST.ROPE_HEIGHT
          ],
          stroke: i <= this.fractionData.numerator ? "red" : "yellow",
          strokeWidth: 1
        });
        this.tagLineLayer.add(tagLine);
      }
      this.stage.add(this.tagLineLayer);
    },

    handleNext() {
      this.handleFractionChange();
      // this.status = 0;
    },
    handleCheck() {
      this.drawTagsLine();
      this.trialNumber++;
      // const diff = this.estimateDecimal - this.decimalData;
      this.estimateAccuracy = Number(
        ((this.estimateDecimal - this.decimalData) * 100).toFixed(2)
      );
      this.estimateArray.push(this.estimateAccuracy);
      this.status = 2;
    }
  },
  created() {
    this.fractionData = generateFraction(this.fractionSelection);
  },
  mounted() {
    this.drawRope();
    this.drawTags();
  }
};
</script>

<style scoped>
.canvasContainer {
  width: 80%;
  margin: 0 auto;
}
</style>
