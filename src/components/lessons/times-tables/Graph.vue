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
      gridLayer: null
    };
  },
  computed: {
    drawConst() {
      const offset = 10;
      if (this.maxWidth) {
        return {
          startX: offset,
          startY: this.maxWidth - offset,
          length: this.maxWidth - offset * 2,
          unit: Math.floor((this.maxWidth - offset * 2) / this.result),
          squareWidth: 3
        };
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
    }
  },
  mounted() {
    this.initStage();
    this.drawGrid();
  }
};
</script>

<style scoped>
</style>