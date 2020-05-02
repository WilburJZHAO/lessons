<template>
  <div id="boardCanvas" style="max-width: 400px; margin: 0 auto;"></div>
</template>

<script>
import Konva from "konva";
export default {
  props: ["tour", "showNextMove"],
  data: function() {
    return {
      stage: null,
      boardLayer: null,
      pieceLayer: null,
      maxWidth: null
    };
  },
  computed: {
    squareLength() {
      // The length/width of each square.
      return this.maxWidth / 8;
    }
  },
  watch: {
    "tour.step"(value) {
      this.boardLayer.destroy();
      this.drawBoard();
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("boardCanvas").offsetWidth;
      this.stage = new Konva.Stage({
        container: "boardCanvas",
        width: this.maxWidth,
        height: this.maxWidth
      });
    },
    drawBoard() {
      this.boardLayer = new Konva.Layer();
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          let fillColor = "";
          const pStr = `${i}${j}`;
          const nextPosIndex = this.tour.nextPos.indexOf(pStr);
          if (
            this.showNextMove &&
            this.tour.nextPosMark.length === 0 &&
            nextPosIndex >= 0
          ) {
            fillColor = "blue";
          }
          if (
            this.showNextMove &&
            this.tour.nextPosMark[nextPosIndex] >= 0 &&
            nextPosIndex >= 0
          ) {
            switch (this.tour.nextPosMark[nextPosIndex]) {
              case 0:
              case 1:
                fillColor = "blue";
                break;
              case 2:
                fillColor = "green";
                break;
              case 3:
              case 4:
                fillColor = "red";
                break;
              case 5:
              case 6:
                fillColor = "#00FFFF";
                break;
              case 7:
                fillColor = "#FBB117";
                break;
              default:
                fillColor = "#fff";
            }
          }
          const rect = new Konva.Rect({
            x: j * this.squareLength,
            y: i * this.squareLength,
            width: this.squareLength,
            height: this.squareLength,
            stroke: "blue",
            fill: fillColor
          });
          rect.on("click", () => {
            // console.log(i, j);
            this.$emit("clickOnSquare", pStr);
          });
          this.boardLayer.add(rect);

          if (this.showNextMove && this.tour.nextPosMark[nextPosIndex] >= 0) {
            const text = new Konva.Text({
              x: j * this.squareLength + this.squareLength / 2 - 20 * 0.2,
              y: i * this.squareLength + this.squareLength / 2 - 20 * 0.4,
              text: this.tour.nextPosMark[nextPosIndex],
              fontSize: 16,
              fill: "black"
            });
            this.boardLayer.add(text);
          }

          if (this.tour.solution[i][j]) {
            // console.log(i, j);
            const text = new Konva.Text({
              x: j * this.squareLength + this.squareLength / 2 - 20 * 0.4,
              y: i * this.squareLength + this.squareLength / 2 - 20 * 0.4,
              text: this.tour.solution[i][j],
              fontSize: 20,
              fill:
                this.tour.solution[i][j] === this.tour.step
                  ? "red"
                  : this.tour.solution[i][j] === 1
                  ? "orange"
                  : "black"
            });
            this.boardLayer.add(text);
          }
        }
      }
      this.stage.add(this.boardLayer);
    }
  },
  mounted() {
    this.initStage();
    this.drawBoard();
  }
};
</script>

<style scoped></style>
