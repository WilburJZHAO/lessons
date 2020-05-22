<template>
  <div id="graphCanvas"></div>
</template>

<script>
import Konva from "konva";
export default {
  props: ["solutions", "result"],
  data: function() {
    return {
      stage: null,
      maxWidth: null,
      gridLayer: null,
      solutionLayer: null
    };
  },
  computed: {
    drawConst() {
      const offset = 20;
      if (this.maxWidth) {
        return {
          offset,
          startX: offset,
          startY: this.maxWidth - offset,
          length: this.maxWidth - offset * 2,
          unit: (this.maxWidth - offset * 2) / this.result,
          squareWidth: 8
        };
      }
    }
  },
  watch: {
    solutions(value) {
      if (!value || value.length === 0) {
        this.solutionLayer.destroy();
      } else {
        this.drawSolutions();
      }
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("graphCanvas").offsetWidth;
      this.stage = new Konva.Stage({
        container: "graphCanvas",
        width: this.maxWidth,
        height: this.maxWidth
      });
    },
    drawGrid() {
      this.gridLayer = new Konva.Layer();
      const lineX = new Konva.Line({
        points: [
          this.drawConst.startX,
          this.drawConst.startY,
          this.drawConst.startX + this.drawConst.length,
          this.drawConst.startY
        ],
        stroke: "black",
        strokeWidth: 1
      });
      const lineY = new Konva.Line({
        points: [
          this.drawConst.startX,
          this.drawConst.startY,
          this.drawConst.startX,
          this.drawConst.startY - this.drawConst.length
        ],
        stroke: "black",
        strokeWidth: 1
      });
      this.gridLayer.add(lineX);
      this.gridLayer.add(lineY);
      this.stage.add(this.gridLayer);
    },
    drawSolutions() {
      if (!this.solutions || this.solutions.length === 0) {
        return;
      }
      if (!this.solutionLayer) {
        this.solutionLayer = new Konva.Layer();
      }
      this.solutions.forEach(solution => {
        const yMark =
          this.drawConst.startY - this.drawConst.unit * solution.number1;

        const xMark =
          this.drawConst.unit * solution.number2 + this.drawConst.startX;

        const yNumber = new Konva.Text({
          x: this.drawConst.offset / 5,
          y: yMark - 6,
          text: solution.number1,
          fontSize: 12,
          fill: "#000"
        });
        const xNumber = new Konva.Text({
          x: xMark - 6,
          y: this.maxWidth - this.drawConst.offset * 0.8,
          text: solution.number2,
          fontSize: 12,
          fill: "#000"
        });
        const horizontalLine = new Konva.Line({
          points: [this.drawConst.startX, yMark, xMark, yMark],
          stroke: "#00FFF8",
          strokeWidth: 1
        });
        const verticalLine = new Konva.Line({
          points: [xMark, this.drawConst.startY, xMark, yMark],
          stroke: "#00FFF8",
          strokeWidth: 1
        });
        const rect = new Konva.Rect({
          x: xMark - this.drawConst.squareWidth / 2,
          y: yMark - this.drawConst.squareWidth / 2,
          width: this.drawConst.squareWidth,
          height: this.drawConst.squareWidth,
          fill: "red",
          stroke: "black",
          strokeWidth: 1
        });
        this.solutionLayer.add(horizontalLine);
        this.solutionLayer.add(verticalLine);
        this.solutionLayer.add(yNumber);
        this.solutionLayer.add(xNumber);
        this.solutionLayer.add(rect);
      });
      this.stage.add(this.solutionLayer);
    }
  },
  mounted() {
    this.initStage();
    this.drawGrid();
    this.drawSolutions();
  }
};
</script>

<style scoped>
</style>