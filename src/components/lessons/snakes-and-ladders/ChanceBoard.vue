<template>
  <div id="boardCanvas"></div>
</template>

<script>
import Konva from "konva";
import { createBoard, getBoardHeight } from "./utils";
export default {
  props: ["boardSettings", "gamesChanceData", "playedGames"],
  data: function() {
    return {
      board: null,
      maxWidth: 0,
      stage: null,
      layer: null
    };
  },
  watch: {
    gamesChanceData(value) {
      this.layer.destroy();
      this.drawBoard();
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("boardCanvas").offsetWidth;
      this.stage = new Konva.Stage({
        container: "boardCanvas",
        width: this.maxWidth,
        height:
          getBoardHeight(
            this.maxWidth,
            this.boardSettings.rows,
            this.boardSettings.columns
          ) + 20
      });
    },
    drawBoard() {
      if (!this.stage) {
        this.initStage();
      }
      this.board = createBoard(
        this.maxWidth,
        this.boardSettings.rows,
        this.boardSettings.columns
      );

      this.layer = new Konva.Layer();
      for (let i = 0; i < this.board.length; i++) {
        const rect = new Konva.Rect({
          x: this.board[i].rect.x,
          y: this.board[i].rect.y,
          width: this.board[i].rect.width,
          height: this.board[i].rect.height,
          stroke: "#aaa",
          strokeWidth: 1,
          name: `${this.board[i].number.value}`
        });
        this.layer.add(rect);

        const rectHeight = this.board[i].rect.height;

        const text = new Konva.Text({
          x: this.board[i].number.x,
          y: this.board[i].number.y,
          text: this.board[i].number.value,
          fontSize: 18,
          fill: "#DC3545"
        });

        const count = new Konva.Text({
          x: this.board[i].number.x,
          y: rectHeight * 0.3 + this.board[i].number.y,
          text: this.gamesChanceData[i],
          fontSize: 15,
          fill: "#004085"
        });
        const freq = new Konva.Text({
          x:
            this.gamesChanceData[i] === 0
              ? this.board[i].number.x
              : this.board[i].number.x - 10,
          y: rectHeight * 0.6 + this.board[i].number.y,
          text:
            this.gamesChanceData[i] === 0
              ? "0%"
              : ((this.gamesChanceData[i] / this.playedGames) * 100).toFixed(
                  2
                ) + "%",
          fontSize: 15,
          fill: "#333"
        });
        this.layer.add(text);
        this.layer.add(count);
        this.layer.add(freq);
      }
      this.stage.add(this.layer);
    }
  },
  mounted() {
    this.drawBoard();
  }
};
</script>

<style scoped>
</style>