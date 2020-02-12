<template>
  <div id="stripContainer" style="width: 80%;" class="d-flex justify-content-center">
    <!-- <canvas id="stripCanvas" class="app--canvas"></canvas> -->
  </div>
</template>

<script>
import Konva from "konva";
import { pickNumber } from "../../../common/utils";
import { canvasConstant } from "../utils";
export default {
  props: ["status", "fractionData", "percentageData"],
  data: function() {
    return {
      stage: null,
      layer: null,
      // STRIP_HEIGHT: 80,
      maxWidth: 300,
      canvasConstant,
      // MIN_WIDTH: 200,
      // START_X: 5,
      // START_Y: 10
      rectPartWidth: 0,
      rectPartWidthSet: 0,
      rectWidth: 300,
      shouldDrag: false,
      validWidth: true
    };
  },
  watch: {
    status(value, oldValue) {
      if ((value === 3 && oldValue !== 3) || (value === 0 && oldValue === 2)) {
        this.drawStrip();
        return;
      }
      if (value === 2 && oldValue === 1) {
        // alert("check");
        this.drawCheckStrip();
        return;
      }
    },
    rectPartWidth(value) {
      if (value >= 0 && value + this.canvasConstant.START_X <= this.rectWidth) {
        this.validWidth = true;
      } else {
        this.validWidth = false;
      }
    },
    percentageData(value) {
      if (this.status === undefined && value) {
        this.shouldDrag = false;

        this.rectWidth = pickNumber(
          this.canvasConstant.MIN_WIDTH,
          this.maxWidth
        );
        this.drawStrip(this.rectWidth, this.rectPartWidthAnswer);
      }
    }
  },
  computed: {
    rectDividedWidth() {
      if (this.fractionData) {
        return Number(
          (this.rectWidth / this.fractionData.denominator).toFixed(2)
        );
      } else if (this.percentageData) {
        return Number(
          ((this.rectWidth * this.percentageData) / 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    rectPartWidthAnswer() {
      if (this.fractionData) {
        return (
          (this.rectWidth * this.fractionData.numerator) /
          this.fractionData.denominator
        );
      } else if (this.percentageData) {
        return (this.rectWidth * this.percentageData) / 100;
      } else {
        return 0;
      }
    }
  },
  methods: {
    drawStrip(wholeWidth, partWidth) {
      this.rectPartWidthSet = 0;
      this.maxWidth = document.getElementById("stripContainer").offsetWidth;

      this.rectWidth =
        wholeWidth || pickNumber(this.canvasConstant.MIN_WIDTH, this.maxWidth);
      // eslint-disable-next-line no-console
      // console.log(this.rectWidth);
      this.stage = new Konva.Stage({
        container: "stripContainer",
        width: this.rectWidth + this.canvasConstant.START_X,
        height: 120
      });

      this.layer = new Konva.Layer();
      const rect = new Konva.Rect({
        x: this.canvasConstant.START_X,
        y: this.canvasConstant.START_Y,
        width: this.rectWidth,
        height: this.canvasConstant.STRIP_HEIGHT,
        fill: "yellow",
        stroke: "black",
        strokeWidth: 0.5
      });
      rect.fillPatternX(10);
      this.layer.add(rect);

      let partRect;
      if (partWidth) {
        this.rectPartWidth = partWidth;
        partRect = new Konva.Rect({
          x: this.canvasConstant.START_X,
          y: this.canvasConstant.START_Y,
          width: this.rectPartWidth,
          height: this.canvasConstant.STRIP_HEIGHT,
          fill: "green",
          stroke: "black",
          strokeWidth: 0.5
        });
        this.layer.add(partRect);
      }

      this.stage.add(this.layer);

      this.stage.on("mousedown", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        const mousePos = this.stage.getPointerPosition();
        // eslint-disable-next-line no-console
        // console.log(mousePos);
        this.rectPartWidth = mousePos.x - this.canvasConstant.START_X;
        this.drawStrip(this.rectWidth, this.rectPartWidth);
        this.shouldDrag = true;
        this.$emit("updateStatus", 1);
      });
      this.stage.on("mousemove", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        if (this.shouldDrag && this.validWidth) {
          const mousePos = this.stage.getPointerPosition();
          this.rectPartWidth = mousePos.x - this.canvasConstant.START_X;
          this.drawStrip(this.rectWidth, this.rectPartWidth);
        }
      });
      this.stage.on("mouseup", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.shouldDrag = false;
        this.rectPartWidthSet = this.rectPartWidth;
      });

      this.stage.on("touchstart", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        // eslint-disable-next-line no-console
        // console.log(this.stage);
        const mousePos = this.stage.getPointerPosition();
        this.rectPartWidth = mousePos.x - this.canvasConstant.START_X;
        this.drawStrip(this.rectWidth, this.rectPartWidth);
        this.shouldDrag = true;
        this.$emit("updateStatus", 1);
      });
      this.stage.on("touchmove", e => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.stage.setPointersPositions(e.evt);
        if (this.shouldDrag && this.validWidth) {
          const mousePos = this.stage.getPointerPosition();
          this.rectPartWidth = mousePos.x - this.canvasConstant.START_X;
          this.drawStrip(this.rectWidth, this.rectPartWidth);
        }
      });
      this.stage.on("touchend", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.shouldDrag = false;
        this.rectPartWidthSet = this.rectPartWidth;
      });

      rect.on("mouseout", () => {
        // eslint-disable-next-line no-console
        // console.log("out");
        this.shouldDrag = false;
      });
    },

    drawCheckStrip() {
      this.shouldDrag = false;
      if (this.fractionData) {
        for (let i = 1; i <= this.fractionData.denominator - 1; i++) {
          // eslint-disable-next-line no-console
          // console.log(i);
          let dividedLine = new Konva.Line({
            points: [
              canvasConstant.START_X + this.rectDividedWidth * i,
              canvasConstant.START_Y,
              canvasConstant.START_X + this.rectDividedWidth * i,
              canvasConstant.START_Y + canvasConstant.STRIP_HEIGHT
            ],
            stroke: i <= this.fractionData.numerator ? "red" : "white",
            strokeWidth: 2
          });
          this.layer.add(dividedLine);
        }
      }
      if (this.percentageData) {
        let dividedLine = new Konva.Line({
          points: [
            canvasConstant.START_X + this.rectDividedWidth,
            canvasConstant.START_Y,
            canvasConstant.START_X + this.rectDividedWidth,
            canvasConstant.START_Y + canvasConstant.STRIP_HEIGHT
          ],
          stroke: "red",
          strokeWidth: 2
        });
        this.layer.add(dividedLine);
      }

      this.stage.add(this.layer);
      this.$emit(
        "estimateAccuracy",
        Number(
          (
            ((this.rectPartWidth - this.rectPartWidthAnswer) / this.rectWidth) *
            100
          ).toFixed(2)
        )
      );
    }
  },
  mounted() {
    if (this.status === undefined) {
      this.rectWidth = pickNumber(this.canvasConstant.MIN_WIDTH, this.maxWidth);
      this.drawStrip(this.rectWidth, this.rectPartWidthAnswer);
    } else {
      this.drawStrip();
    }
  }
};
</script>

<style scoped>
.app--canvas {
  width: 100%;
  max-height: 100%;
}
</style>
