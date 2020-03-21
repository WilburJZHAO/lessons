<template>
  <div>
    <div id="canvasContainer" class="app-canvas-container mb-3"></div>
  </div>
</template>

<script>
import Konva from "konva";
import { getMedian } from "./utils";
export default {
  data: function() {
    return {
      stage: null,
      layer: null,
      points1Layer: null,
      points2Layer: null,
      maxWidth: 0,
      HEIGHT: 200,
      XOFFSET: 15
    };
  },
  props: ["points1", "points2", "status"],
  computed: {
    chartData1() {
      return this.getChartData(this.points1);
    },
    chartData2() {
      if (!this.points2) return null;
      return this.getChartData(this.points2);
    }
  },
  watch: {
    points1(value) {
      if (value.length < 5) return;
      this.drawChart1();
      this.drawChart2();
    },
    status(value) {
      if (value === 1) {
        if (this.points1Layer) {
          this.points1Layer.destroy();
        }
        if (this.points2Layer) {
          this.points2Layer.destroy();
        }
      }
    }
  },
  methods: {
    getChartData(points) {
      let data = [];
      if (points.length < 5) {
        return [];
      }
      let breakpoint1, breakpoint2;
      if (points.length % 2 === 0) {
        breakpoint1 = points.length / 2 - 1;
        breakpoint2 = points.length / 2;
      } else {
        breakpoint1 = (points.length - 1) / 2;
        breakpoint2 = breakpoint1;
      }
      const firstSub = points.slice(0, breakpoint1 + 1);
      const secondSub = points.slice(breakpoint2);
      return [
        points[0],
        getMedian(firstSub),
        getMedian(points),
        getMedian(secondSub),
        points[points.length - 1]
      ];
    },
    initStage() {
      this.maxWidth = document.getElementById("canvasContainer").offsetWidth;
      this.stage = new Konva.Stage({
        container: "canvasContainer",
        width: this.maxWidth,
        height: this.HEIGHT
      });
    },
    drawBase() {
      if (!this.stage) {
        this.initStage();
      }
      this.layer = new Konva.Layer();
      for (let i = 0; i <= 10; i++) {
        const text = new Konva.Text({
          x: (i * (this.maxWidth - 2 * this.XOFFSET)) / 10 + this.XOFFSET - 8,
          y: this.HEIGHT - 10,
          text: 20 * i,
          fontSize: 12,
          fill: "#333"
        });
        const divideLine = new Konva.Line({
          points: [
            (i * (this.maxWidth - 2 * this.XOFFSET)) / 10 + this.XOFFSET,
            this.HEIGHT - 25,
            (i * (this.maxWidth - 2 * this.XOFFSET)) / 10 + this.XOFFSET,
            this.HEIGHT - 20
          ],
          stroke: "#555",
          strokeWidth: 1
        });
        this.layer.add(text);
        this.layer.add(divideLine);
      }
      const baseLine = new Konva.Line({
        points: [
          this.XOFFSET,
          this.HEIGHT - 20,
          this.maxWidth - this.XOFFSET,
          this.HEIGHT - 20
        ],
        stroke: "#555",
        strokeWidth: 2
      });
      this.layer.add(baseLine);
      this.stage.add(this.layer);
    },
    drawChart1() {
      if (this.points1Layer) {
        this.points1Layer.destroy();
      }
      let min, median1, median, median2, max;
      [min, median1, median, median2, max] = this.chartData1;
      const minX =
        (min / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const median1X =
        (median1 / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const medianX =
        (median / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const median2X =
        (median2 / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const maxX =
        (max / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const startY = this.HEIGHT - 80;

      const minLine = new Konva.Line({
        points: [minX, startY + 15, minX, startY + 35],
        stroke: "#007BFF",
        strokeWidth: 1
      });
      const maxLine = new Konva.Line({
        points: [maxX, startY + 15, maxX, startY + 35],
        stroke: "#007BFF",
        strokeWidth: 1
      });
      const box = new Konva.Rect({
        x: median1X,
        y: startY,
        width: median2X - median1X,
        height: 50,
        stroke: "#007BFF",
        strokeWidth: 1
      });
      const medianLine = new Konva.Line({
        points: [medianX, startY, medianX, startY + 50],
        stroke: "#007BFF",
        strokeWidth: 1
      });
      const median1Line = new Konva.Line({
        points: [minX, startY + 25, median1X, startY + 25],
        stroke: "#007BFF",
        strokeWidth: 1
      });
      const median2Line = new Konva.Line({
        points: [median2X, startY + 25, maxX, startY + 25],
        stroke: "#007BFF",
        strokeWidth: 1
      });

      this.points1Layer = new Konva.Layer();
      this.points1Layer.add(minLine);
      this.points1Layer.add(maxLine);
      this.points1Layer.add(box);
      this.points1Layer.add(medianLine);
      this.points1Layer.add(median1Line);
      this.points1Layer.add(median2Line);
      this.stage.add(this.points1Layer);
    },
    drawChart2() {
      if (!this.points2) return;

      if (this.points2Layer) {
        this.points2Layer.destroy();
      }
      let min, median1, median, median2, max;
      [min, median1, median, median2, max] = this.chartData2;
      const minX =
        (min / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const median1X =
        (median1 / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const medianX =
        (median / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const median2X =
        (median2 / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const maxX =
        (max / 200) * (this.maxWidth - 2 * this.XOFFSET) + this.XOFFSET;
      const startY = this.HEIGHT - 140;

      const minLine = new Konva.Line({
        points: [minX, startY + 15, minX, startY + 35],
        stroke: "#DC3545",
        strokeWidth: 1
      });
      const maxLine = new Konva.Line({
        points: [maxX, startY + 15, maxX, startY + 35],
        stroke: "#DC3545",
        strokeWidth: 1
      });
      const box = new Konva.Rect({
        x: median1X,
        y: startY,
        width: median2X - median1X,
        height: 50,
        stroke: "#DC3545",
        strokeWidth: 1
      });
      const medianLine = new Konva.Line({
        points: [medianX, startY, medianX, startY + 50],
        stroke: "#DC3545",
        strokeWidth: 1
      });
      const median1Line = new Konva.Line({
        points: [minX, startY + 25, median1X, startY + 25],
        stroke: "#DC3545",
        strokeWidth: 1
      });
      const median2Line = new Konva.Line({
        points: [median2X, startY + 25, maxX, startY + 25],
        stroke: "#DC3545",
        strokeWidth: 1
      });

      this.points2Layer = new Konva.Layer();
      this.points2Layer.add(minLine);
      this.points2Layer.add(maxLine);
      this.points2Layer.add(box);
      this.points2Layer.add(medianLine);
      this.points2Layer.add(median1Line);
      this.points2Layer.add(median2Line);
      this.stage.add(this.points2Layer);
    }
  },
  mounted() {
    this.drawBase();
  }
};
</script>

<style scoped></style>
