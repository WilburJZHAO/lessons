<template>
  <div :id="`boardCanvas${id}`" style="border: 1px solid #333;"></div>
</template>

<script>
import Konva from "konva";
export default {
  props: [
    "status",
    "order",
    "currentOrder",
    "drawGrid",
    "rule",
    "id",
    "reset",
    "active"
  ],
  data: function() {
    return {
      stage: null,
      gridLayer: null,
      textLayer: null,
      maxWidth: null,
      spiroLayer: null,
      origX: null,
      origY: null,
      startX: 100,
      startY: 100,
      endX: 0,
      endY: 0,
      prevDirection: null
    };
  },
  computed: {
    unit() {
      if (!this.maxWidth) return 0;
      return this.maxWidth / 200 < 1 ? 1 : Math.floor(this.maxWidth / 200);
    },
    scale() {
      let scale;
      if (this.order <= 3) {
        scale = 10;
      } else if (this.order >= 4 && this.order < 10) {
        scale = 5;
      } else if (this.order >= 10 && this.order <= 15) {
        scale = 4;
      } else if (this.order > 15 && this.order <= 30) {
        scale = 2;
      } else if (this.order > 30 && this.order <= 50) {
        scale = 1;
      } else {
        scale = 0.5;
      }
      return scale * this.unit;
    },
    direction() {
      /** The direction of line drawing */
      const remaining = this.currentOrder % 3;
      let direction; // L - left, D - down, R - right, U - up
      const rule1 = this.rule[0];
      const rule2 = this.rule[1];
      const rule3 = this.rule[2];
      switch (remaining) {
        case 1:
          if (!this.prevDirection) {
            direction = rule1 === "L" ? "L" : "R";
          } else {
            direction = this.getNextDirection(this.prevDirection, rule1);
          }
          break;
        case 2:
          direction = this.getNextDirection(this.prevDirection, rule2);
          break;
        case 0:
          direction = this.getNextDirection(this.prevDirection, rule3);
          break;
        // case 0:
        //   direction = this.getNextDirection(this.prevDirection, rule1);
        //   break;
        default:
          direction = "";
      }

      this.prevDirection = direction;
      return direction;
    },
    lineLength() {
      /** How long the line is drawn */
      const remaining = this.currentOrder % this.order;
      return remaining === 0 ? this.order * this.scale : remaining * this.scale;
    }
  },
  watch: {
    status(value, prevValue) {
      if ((prevValue === 2 || prevValue === 3) && value === 0) {
        // console.log("new");
      }
      if (prevValue === 0 && value === 1) {
        if (!this.reset) {
          return;
        }
        // Draw grid
        if (this.stage) {
          this.stage.destroy();
          this.stage = null;
        }
        this.initStage();
      }
    },
    currentOrder(value) {
      if (this.status !== 2 || !this.active) {
        return;
      }
      if (!this.spiroLayer) {
        this.spiroLayer = new Konva.Layer();
      }

      switch (this.direction) {
        case "L":
          this.endX = Math.round(this.startX - this.lineLength);
          this.endY = this.startY;
          break;
        case "D":
          this.endX = this.startX;
          this.endY = Math.round(this.startY + this.lineLength);
          break;
        case "R":
          this.endX = Math.round(this.startX + this.lineLength);
          this.endY = this.startY;
          break;
        case "U":
          this.endX = this.startX;
          this.endY = Math.round(this.startY - this.lineLength);
          break;
        default:
          break;
      }
      // console.log(value);
      if (this.order >= 10) {
        // If order is bigger than 10, draw lines directly
        const line = new Konva.Line({
          points: [this.startX, this.startY, this.endX, this.endY],
          stroke: this.currentOrder % 2 === 1 ? "blue" : "red",
          strokeWidth: 1
        });
        this.spiroLayer.add(line);
        this.stage.add(this.spiroLayer);
      } else {
        // If order is smaller than 10, create the drawing animation
        const inc = 5;
        let currentX = this.startX;
        let currentY = this.startY;
        let nextX = currentX;
        let nextY = currentY;
        const timer = setInterval(() => {
          this.$emit("drawing", true);
          if (this.direction === "L") {
            nextX -= inc;
            nextY = currentY;
            if (nextX <= this.endX) {
              clearInterval(timer);
              this.$emit("drawing", false);
            }
          } else if (this.direction === "D") {
            nextX = currentX;
            nextY += inc;
            if (nextY >= this.endY) {
              clearInterval(timer);
              this.$emit("drawing", false);
            }
          } else if (this.direction === "R") {
            nextX += inc;
            nextY = currentY;
            if (nextX >= this.endX) {
              clearInterval(timer);
              this.$emit("drawing", false);
            }
          } else if (this.direction === "U") {
            nextX = currentX;
            nextY -= inc;
            if (nextY <= this.endY) {
              clearInterval(timer);
              this.$emit("drawing", false);
            }
          }

          // this.startX = this.endX;
          // this.startY = this.endY;
          const line = new Konva.Line({
            points: [currentX, currentY, nextX, nextY],
            stroke: this.currentOrder % 2 === 1 ? "blue" : "red",
            strokeWidth: 1
          });
          this.spiroLayer.add(line);
          this.stage.add(this.spiroLayer);
        }, 20);
      }

      if (this.endX === this.origX && this.endY === this.origY) {
        // console.log("ok");
        this.$emit("drawSuccess", true);
        return;
      }
      if (
        this.endX < 0 ||
        this.endY < 0 ||
        this.endX > this.maxWidth ||
        this.endY > this.maxWidth
      ) {
        // console.log("out boarder");
        this.$emit("drawFailure", false);
        return;
      }
      this.startX = this.endX;
      this.startY = this.endY;
    }
  },

  methods: {
    getNextDirection(prevDirection, rule) {
      let nextDirection;
      switch (prevDirection) {
        case "L":
          nextDirection = rule === "L" ? "D" : "U";
          break;
        case "R":
          nextDirection = rule === "L" ? "U" : "D";
          break;
        case "U":
          nextDirection = rule === "L" ? "L" : "R";
          break;
        case "D":
          nextDirection = rule === "L" ? "R" : "L";
          break;
      }
      return nextDirection;
    },
    initStage() {
      this.maxWidth = document.getElementById(
        `boardCanvas${this.id}`
      ).offsetWidth;
      this.stage = new Konva.Stage({
        container: `boardCanvas${this.id}`,
        width: this.maxWidth,
        height: this.maxWidth
      });
      // Initialize starting point
      this.origX = this.startX = Math.floor(this.maxWidth / 2);
      this.origY = this.startY = Math.floor(this.startX * 0.8);

      if (this.drawGrid) {
        this.gridLayer = new Konva.Layer();
        const gridUnit =
          this.id === -1 ? this.maxWidth / 20 : this.maxWidth / 50;
        for (let i = 1; i <= 50; i++) {
          const verticalGrid = new Konva.Line({
            points: [i * gridUnit, 0, i * gridUnit, this.maxWidth],
            stroke: "#66CCFF",
            strokeWidth: 1
          });
          const horizontalGrid = new Konva.Line({
            points: [0, i * gridUnit, this.maxWidth, i * gridUnit],
            stroke: "#66CCFF",
            strokeWidth: 1
          });
          this.gridLayer.add(verticalGrid);
          this.gridLayer.add(horizontalGrid);
        }
        this.stage.add(this.gridLayer);
      }

      if (this.rule) {
        this.textLayer = new Konva.Layer();
        const ruleText = new Konva.Text({
          x: 5,
          y: 5,
          text: this.rule,
          fontSize: 12,
          fill: "blue"
        });
        this.textLayer.add(ruleText);
        this.stage.add(this.textLayer);
      }

      this.prevDirection = null;
    }
  },

  mounted() {
    this.initStage();
  }
};
</script>
<style scoped></style>
