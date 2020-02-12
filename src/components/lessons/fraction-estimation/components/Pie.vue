<template>
  <div id="pieContainer" class="d-flex justify-content-center"></div>
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
      canvasConstant,
      pieRadius: 0,
      maxWidth: 300,
      angle: 0,
      shouldDrag: false
    };
  },
  watch: {
    status(value, oldValue) {
      if ((value === 3 && oldValue !== 3) || (value === 0 && oldValue === 2)) {
        this.drawPie();
        return;
      }

      if (value === 2 && oldValue === 1) {
        this.drawCheckPie();
        return;
      }
    },
    percentageData(value) {
      if (this.status === undefined && value) {
        this.shouldDrag = false;
        this.drawPie(null, this.piePartAngleAnswer);
      }
    }
  },
  computed: {
    pieDividedAngle() {
      if (this.fractionData) {
        return Number((360 / this.fractionData.denominator).toFixed(2));
      } else if (this.percentageData) {
        return Number(((360 * this.percentageData) / 100).toFixed(2));
      } else {
        return 0;
      }
    },
    piePartAngleAnswer() {
      if (this.fractionData) {
        return (
          (360 * this.fractionData.numerator) / this.fractionData.denominator
        );
      } else if (this.percentageData) {
        return (360 * this.percentageData) / 100;
      } else {
        return 0;
      }
    }
  },
  methods: {
    drawPie(radius, angle) {
      this.maxWidth = document.getElementById("pieContainer").offsetWidth;
      this.pieRadius =
        radius ||
        pickNumber(
          this.canvasConstant.MIN_RADIUS,
          this.canvasConstant.MAX_RADIUS
        );

      this.stage = new Konva.Stage({
        container: "pieContainer",
        width: (this.pieRadius + this.canvasConstant.START_X) * 2,
        height: (this.pieRadius + this.canvasConstant.START_Y) * 2
      });

      this.layer = new Konva.Layer();
      const pie = new Konva.Circle({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        radius: this.pieRadius,
        fill: "yellow",
        stroke: "black",
        strokeWidth: 1
      });
      this.layer.add(pie);

      let partPie;
      if (angle) {
        this.angle = angle;
        partPie = new Konva.Wedge({
          x: this.stage.width() / 2,
          y: this.stage.height() / 2,
          radius: this.pieRadius,
          angle: this.angle,
          fill: "green",
          stroke: "black",
          strokeWidth: 1,
          rotation: -90
        });
        // eslint-disable-next-line no-console
        //console.log(partPie);
        this.layer.add(partPie);
      }

      this.stage.add(this.layer);

      this.stage.on("mousedown", e => {
        // eslint-disable-next-line no-console
        //console.log(e);
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        const mousePos = e.currentTarget.pointerPos;
        const angle = this.calculateAngle(mousePos.x, mousePos.y);
        this.drawPie(this.pieRadius, angle);
        this.shouldDrag = true;
        this.$emit("updateStatus", 1);
        // eslint-disable-next-line no-console
      });

      this.stage.on("mousemove", e => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        if (this.shouldDrag) {
          const mousePos = e.currentTarget.pointerPos;
          const angle = this.calculateAngle(mousePos.x, mousePos.y);
          this.drawPie(this.pieRadius, angle);
        }
      });

      this.stage.on("mouseup", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.shouldDrag = false;
      });

      this.stage.on("touchstart", e => {
        // eslint-disable-next-line no-console
        // console.log(e);
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.stage.setPointersPositions(e.evt);
        const mousePos = this.stage.getPointerPosition();
        const angle = this.calculateAngle(mousePos.x, mousePos.y);
        this.drawPie(this.pieRadius, angle);
        this.shouldDrag = true;
        this.$emit("updateStatus", 1);
        // eslint-disable-next-line no-console
      });

      this.stage.on("touchmove", e => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.stage.setPointersPositions(e.evt);
        if (this.shouldDrag) {
          const mousePos = this.stage.getPointerPosition();
          const angle = this.calculateAngle(mousePos.x, mousePos.y);
          this.drawPie(this.pieRadius, angle);
        }
      });

      this.stage.on("touchend", () => {
        if (this.status === 2 || this.status === undefined) {
          return;
        }
        this.shouldDrag = false;
      });
    },
    /** Calculate the angle based on x and y on stage */
    calculateAngle(x, y) {
      const xr = x - this.canvasConstant.START_X - this.pieRadius;
      const yr = this.pieRadius - (y - this.canvasConstant.START_Y);
      // eslint-disable-next-line no-console
      //console.log(xr, yr);
      const r0 = Math.sqrt(xr * xr + yr * yr);
      const arc = Math.asin(xr / r0);
      const angle = (180 / Math.PI) * arc;
      // eslint-disable-next-line no-console
      // console.log(angle);
      if (xr > 0 && yr > 0) {
        return angle;
      }
      if (xr > 0 && yr < 0) {
        return Math.abs(180 - angle);
      }

      if (xr <= 0 && yr < 0) {
        return 180 + Math.abs(angle);
      }

      if (xr < 0 && yr >= 0) {
        return 360 - Math.abs(angle);
      }
      return angle;
    },
    /** Calculate the point on circle based on the given angle */
    calculatePosition(angle) {
      let sinValue, cosValue, xr, yr;
      if (angle >= 0 && angle < 90) {
        sinValue = Math.sin(((90 - angle) * Math.PI) / 180);
        cosValue = Math.cos(((90 - angle) * Math.PI) / 180);
        yr = sinValue * this.pieRadius;
        xr = cosValue * this.pieRadius;
        return {
          x: xr + this.pieRadius + this.canvasConstant.START_X,
          y: this.pieRadius - yr + this.canvasConstant.START_Y
        };
      } else if (angle === 90) {
        return {
          x: this.pieRadius * 2 + this.canvasConstant.START_X,
          y: this.pieRadius + this.canvasConstant.START_Y
        };
      } else if (angle > 90 && angle < 180) {
        sinValue = Math.sin(((angle - 90) * Math.PI) / 180);
        cosValue = Math.cos(((angle - 90) * Math.PI) / 180);
        yr = sinValue * this.pieRadius;
        xr = cosValue * this.pieRadius;
        return {
          x: xr + this.pieRadius + this.canvasConstant.START_X,
          y: yr + this.pieRadius + this.canvasConstant.START_Y
        };
      } else if (angle === 180) {
        return {
          x: this.pieRadius + this.canvasConstant.START_X,
          y: this.pieRadius * 2 + this.canvasConstant.START_Y
        };
      } else if (angle > 180 && angle < 270) {
        sinValue = Math.sin(((270 - angle) * Math.PI) / 180);
        cosValue = Math.cos(((270 - angle) * Math.PI) / 180);
        yr = sinValue * this.pieRadius;
        xr = cosValue * this.pieRadius;
        return {
          x: this.pieRadius - xr + this.canvasConstant.START_X,
          y: this.pieRadius + yr + this.canvasConstant.START_Y
        };
      } else if (angle === 270) {
        return {
          x: this.canvasConstant.START_X,
          y: this.pieRadius + this.canvasConstant.START_Y
        };
      } else if (angle > 270 && angle <= 360) {
        sinValue = Math.sin(((angle - 270) * Math.PI) / 180);
        cosValue = Math.cos(((angle - 270) * Math.PI) / 180);
        yr = sinValue * this.pieRadius;
        xr = cosValue * this.pieRadius;
        return {
          x: this.pieRadius - xr + this.canvasConstant.START_X,
          y: this.pieRadius - yr + this.canvasConstant.START_Y
        };
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    },
    drawCheckPie() {
      this.shouldDrag = false;
      if (this.fractionData) {
        for (let i = 1; i <= this.fractionData.denominator - 1; i++) {
          let dividedAngle = this.pieDividedAngle * i;
          let position = this.calculatePosition(dividedAngle);
          let dividedLine = new Konva.Line({
            points: [
              this.canvasConstant.START_X + this.pieRadius,
              this.canvasConstant.START_Y + this.pieRadius,
              position.x,
              position.y
            ],
            stroke: i <= this.fractionData.numerator ? "red" : "white",
            strokeWidth: 2
          });
          this.layer.add(dividedLine);
        }
      }
      if (this.percentageData) {
        let dividedAngle = this.pieDividedAngle;
        let position = this.calculatePosition(dividedAngle);
        let dividedLine = new Konva.Line({
          points: [
            this.canvasConstant.START_X + this.pieRadius,
            this.canvasConstant.START_Y + this.pieRadius,
            position.x,
            position.y
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
          (((this.angle - this.piePartAngleAnswer) / 360) * 100).toFixed(2)
        )
      );
    }
  },
  mounted() {
    if (this.status === undefined) {
      this.drawPie(null, this.piePartAngleAnswer);
    } else {
      this.drawPie();
    }
  }
};
</script>

<style scoped>
</style>