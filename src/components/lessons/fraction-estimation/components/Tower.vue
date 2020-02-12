<template>
  <div id="towerContainer" style="width: 80%;" class="d-flex justify-content-center">
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
      maxHeight: 300,
      canvasConstant,
      // MIN_WIDTH: 200,
      // START_X: 5,
      // START_Y: 10
      rectPartHeight: 0,
      rectPartHeightSet: 0,
      rectHeight: 300,
      shouldDrag: false,
      validHeight: true
    };
  },
  watch: {
    status(value, oldValue) {
      if ((value === 3 && oldValue !== 3) || (value === 0 && oldValue === 2)) {
        this.drawTower();
        return;
      }
      if (value === 2 && oldValue === 1) {
        // alert("check");
        this.drawCheckStrip();
        return;
      }
    },
    rectPartHeight(value) {
      if (
        value >= 0 &&
        value + this.canvasConstant.START_X <= this.rectHeight
      ) {
        this.validHeight = true;
      } else {
        this.validHeight = false;
      }
    },
    percentageData(value) {
      if (this.status === undefined && value) {
        this.shouldDrag = false;
        this.rectHeight = pickNumber(
          this.canvasConstant.MIN_HEIGHT,
          this.canvasConstant.MAX_HEIGHT
        );
        this.drawTower(this.rectHeight, this.rectPartHeightAnswer);
      }
    }
  },
  computed: {
    rectDiviedHeight() {
      if (this.fractionData) {
        return Number(
          (this.rectHeight / this.fractionData.denominator).toFixed(2)
        );
      } else if (this.percentageData) {
        return Number(
          ((this.rectHeight * this.percentageData) / 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    rectPartHeightAnswer() {
      if (this.fractionData) {
        return (
          (this.rectHeight * this.fractionData.numerator) /
          this.fractionData.denominator
        );
      } else if (this.percentageData) {
        return (this.rectHeight * this.percentageData) / 100;
      } else {
        return 0;
      }
    }
  },
  methods: {
    drawTower(wholeHeight, partHeight) {
      this.rectPartHeightSet = 0;

      this.rectHeight =
        wholeHeight ||
        pickNumber(
          this.canvasConstant.MIN_HEIGHT,
          this.canvasConstant.MAX_HEIGHT
        );
      // eslint-disable-next-line no-console
      // console.log(this.rectHeight);
      this.stage = new Konva.Stage({
        container: "towerContainer",
        height: this.rectHeight + this.canvasConstant.START_Y,
        width: 120
      });

      this.layer = new Konva.Layer();
      const rect = new Konva.Rect({
        x: this.canvasConstant.START_X,
        y: this.canvasConstant.START_Y,
        width: this.canvasConstant.TOWER_WIDTH,
        height: this.rectHeight,
        fill: "yellow",
        stroke: "black",
        strokeWidth: 0.5
      });
      rect.fillPatternX(10);
      this.layer.add(rect);

      let partRect;
      if (partHeight) {
        this.rectPartHeight = partHeight;
        partRect = new Konva.Rect({
          x: this.canvasConstant.START_X,
          y: this.canvasConstant.START_Y,
          width: this.canvasConstant.TOWER_WIDTH,
          height: this.rectPartHeight,
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
        this.rectPartHeight = mousePos.y - this.canvasConstant.START_Y;
        this.drawTower(this.rectHeight, this.rectPartHeight);
        this.shouldDrag = true;
        this.$emit("updateStatus", 1);
      });
      this.stage.on("mousemove", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        if (this.shouldDrag && this.validHeight) {
          const mousePos = this.stage.getPointerPosition();
          this.rectPartHeight = mousePos.y - this.canvasConstant.START_Y;
          this.drawTower(this.rectHeight, this.rectPartHeight);
        }
      });
      this.stage.on("mouseup", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.shouldDrag = false;
        this.rectPartHeightSet = this.rectPartHeight;
      });

      this.stage.on("touchstart", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        // eslint-disable-next-line no-console
        // console.log(this.stage);
        const mousePos = this.stage.getPointerPosition();
        this.rectPartHeight = mousePos.y - this.canvasConstant.START_Y;
        this.drawTower(this.rectHeight, this.rectPartHeight);
        this.shouldDrag = true;
        this.$emit("updateStatus", 1);
      });
      this.stage.on("touchmove", e => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.stage.setPointersPositions(e.evt);
        if (this.shouldDrag && this.validHeight) {
          const mousePos = this.stage.getPointerPosition();
          this.rectPartHeight = mousePos.y - this.canvasConstant.START_Y;
          this.drawTower(this.rectHeight, this.rectPartHeight);
        }
      });
      this.stage.on("touchend", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.shouldDrag = false;
        this.rectPartHeightSet = this.rectPartHeight;
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
              canvasConstant.START_X,
              canvasConstant.START_Y + this.rectDiviedHeight * i,
              canvasConstant.START_X + canvasConstant.TOWER_WIDTH,
              canvasConstant.START_Y + this.rectDiviedHeight * i
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
            canvasConstant.START_X,
            canvasConstant.START_Y + this.rectDiviedHeight,
            canvasConstant.START_X + canvasConstant.TOWER_WIDTH,
            canvasConstant.START_Y + this.rectDiviedHeight
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
            ((this.rectPartHeight - this.rectPartHeightAnswer) /
              this.rectHeight) *
            100
          ).toFixed(2)
        )
      );
    }
  },
  mounted() {
    if (this.status === undefined) {
      this.rectHeight = pickNumber(
        this.canvasConstant.MIN_HEIGHT,
        this.canvasConstant.MAX_HEIGHT
      );
      this.drawTower(this.rectHeight, this.rectPartHeightAnswer);
    } else {
      this.drawTower();
    }
  }
};
</script>

<style scoped>
.app--canvas {
  width: 100%;
  height: 200px;
}
</style>
