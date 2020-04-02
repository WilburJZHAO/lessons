<template>
  <div id="boardCanvas"></div>
</template>

<script>
import Konva from "konva";
import { createBoard, getBoardHeight } from "./utils";
export default {
  props: ["boardSettings", "draggable", "status", "whoIsTurn", "dice"],
  data: function() {
    return {
      board: null, // board data
      maxWidth: 0, // The max width of canvas, which determines the size of board
      stage: null, // stage object for canvas
      boardLayer: null, // layer object for board
      snakeLayer: null, // layer object for snake
      ladderLayer: null, // layer object for ladder
      player1Layer: null, // layer object for player 1 button
      player2Layer: null, // layer object for player 2 button
      player1Button: null, // node object for player 1 button
      player2Button: null, // node object for player 2 button
      player1Number: 0, // The number(in board) where player 1 button sits
      player2Number: 0, // The number(in board) where player 2 button sits
      player1ButtonOriginalPosition: null, // The original position where player 1 button sits on board
      player2ButtonOriginalPosition: null // The original position where player 2 button sits on board
    };
  },
  watch: {
    status(value) {
      // Detect the state passed from parent component and respond to the change.
      const buttonRadius = this.board[0].rect.width / 5; // The radius of button
      if (value === 1) {
        // If game is reset or just started, do initializing work.
        if (this.player1Layer) {
          this.player1Layer.destroy();
        }
        if (this.player2Layer) {
          this.player2Layer.destroy();
        }

        this.player1Number = 0;
        this.player2Number = 0;
      }
      if (value === 2) {
        const boardHeight = getBoardHeight(
          this.maxWidth,
          this.boardSettings.rows,
          this.boardSettings.columns
        );
        // If game is ready to start, draw the starting position for player1 and player2
        this.player1Layer = new Konva.Layer();
        this.player2Layer = new Konva.Layer();
        this.player1ButtonOriginalPosition = {
          x: this.whoIsTurn === 1 ? buttonRadius : buttonRadius * 3,
          y:
            boardHeight *
              ((this.boardSettings.columns - 1) / this.boardSettings.columns) +
            buttonRadius
        };
        this.player2ButtonOriginalPosition = {
          x: this.whoIsTurn === 1 ? buttonRadius * 3 : buttonRadius,
          y:
            boardHeight *
              ((this.boardSettings.columns - 1) / this.boardSettings.columns) +
            buttonRadius
        };
        this.player1Button = new Konva.Circle({
          x: this.player1ButtonOriginalPosition.x,
          y: this.player1ButtonOriginalPosition.y,
          radius: buttonRadius,
          fill: "#8BD1DC",
          opacity: 0.5,
          stroke: "black",
          strokeWidth: 1
        });
        this.player2Button = new Konva.Circle({
          x: this.player2ButtonOriginalPosition.x,
          y: this.player2ButtonOriginalPosition.y,
          radius: buttonRadius,
          fill: "#FFE083",
          opacity: 0.5,
          stroke: "black",
          strokeWidth: 1
        });
        this.player1Layer.add(this.player1Button);
        this.player2Layer.add(this.player2Button);
        this.stage.add(this.player1Layer);
        this.stage.add(this.player2Layer);
      }
      if (value === 3) {
        // If dice is throwed, move button on the board
        if (this.whoIsTurn === 1) {
          // If it is player1's turn, move player1's button
          const fromNumber = this.player1Number;
          const rowFromNumber =
            fromNumber === 0
              ? 1
              : Math.ceil(fromNumber / this.boardSettings.columns);

          this.player1Number += this.dice;
          const toNumber =
            this.player1Number >
            this.boardSettings.columns * this.boardSettings.rows
              ? this.boardSettings.columns * this.boardSettings.rows
              : this.player1Number;
          const rowToNumber = Math.ceil(toNumber / this.boardSettings.columns);

          let jumpToNumber;
          if (!jumpToNumber) {
            this.boardSettings.ladders.forEach(ladder => {
              if (toNumber === ladder.from) {
                jumpToNumber = ladder.to;
                this.player1Number = jumpToNumber;
              }
            });
          }
          if (!jumpToNumber) {
            this.boardSettings.snakes.forEach(snake => {
              if (toNumber === snake.from) {
                jumpToNumber = snake.to;
                this.player1Number = jumpToNumber;
              }
            });
          }

          const middleNumber =
            rowToNumber === rowFromNumber
              ? 0
              : rowFromNumber * this.boardSettings.columns + 1;

          const prevMiddleNumber = middleNumber ? middleNumber - 1 : 0;

          // console.log(fromNumber, prevMiddleNumber, middleNumber, toNumber);
          const fromPoint =
            fromNumber === 0
              ? {
                  x: this.player1ButtonOriginalPosition.x,
                  y: this.player2ButtonOriginalPosition.y
                }
              : {
                  x:
                    this.board[fromNumber - 1].rect.x +
                    this.board[fromNumber - 1].rect.width / 2,
                  y:
                    this.board[fromNumber - 1].rect.y +
                    this.board[fromNumber - 1].rect.height / 2
                };

          const toPoint = {
            x:
              this.board[toNumber - 1].rect.x +
              this.board[toNumber - 1].rect.width / 2,
            y:
              this.board[toNumber - 1].rect.y +
              this.board[toNumber - 1].rect.height / 2
          };

          const jumpToPoint = jumpToNumber && {
            x:
              this.board[jumpToNumber - 1].rect.x +
              this.board[jumpToNumber - 1].rect.width / 2,
            y:
              this.board[jumpToNumber - 1].rect.y +
              this.board[jumpToNumber - 1].rect.height / 2
          };

          const middlePoint = middleNumber && {
            x:
              this.board[middleNumber - 1].rect.x +
              this.board[middleNumber - 1].rect.width / 2,
            y:
              this.board[middleNumber - 1].rect.y +
              this.board[middleNumber - 1].rect.height / 2
          };

          const prevMiddlePoint = prevMiddleNumber && {
            x:
              this.board[prevMiddleNumber - 1].rect.x +
              this.board[prevMiddleNumber - 1].rect.width / 2,
            y:
              this.board[prevMiddleNumber - 1].rect.y +
              this.board[prevMiddleNumber - 1].rect.height / 2
          };

          let currentX = fromPoint.x;
          let currentY = fromNumber === 0 ? toPoint.y : fromPoint.y;
          const fromX = fromPoint.x;
          const fromY = fromPoint.y;
          const toX = toPoint.x;
          const toY = toPoint.y;
          const prevMiddleX = prevMiddlePoint && prevMiddlePoint.x;
          const prevMiddleY = prevMiddlePoint && prevMiddlePoint.y;
          const middleX = middlePoint && middlePoint.x;
          const middleY = middlePoint && middlePoint.y;
          const jumpToX = jumpToPoint && jumpToPoint.x;
          const jumpToY = jumpToPoint && jumpToPoint.y;
          let currentRow = this.boardSettings.rows;

          const animation1 = new Konva.Animation(frame => {
            const inc = 3;
            if (middleNumber) {
              if (
                currentRow === this.boardSettings.rows &&
                fromX < prevMiddleX &&
                currentX < prevMiddleX
              ) {
                currentX += inc; // Move horizontally on the first line from let to right
              } else if (
                currentRow === this.boardSettings.rows &&
                fromX > prevMiddleX &&
                currentX > prevMiddleX
              ) {
                currentX -= inc; // Move horizontally on the first line from right to left
              } else if (
                (fromX <= prevMiddleX &&
                  currentX >= prevMiddleX &&
                  currentY >= middleY) ||
                (fromX >= prevMiddleX &&
                  currentX <= prevMiddleX &&
                  currentY >= middleY)
              ) {
                currentY -= inc;
                currentRow--;
              } else if (
                currentRow < this.boardSettings.rows &&
                toX > middleX &&
                currentX < toX
              ) {
                currentX += inc;
              } else if (
                currentRow < this.boardSettings.rows &&
                toX < middleX &&
                currentX > toX
              ) {
                currentX -= inc;
              } else {
                animation1.stop();
                this.$emit("stopMoving", true);
                if (jumpToNumber) {
                  currentX = jumpToX;
                  currentY = jumpToY;
                  this.player1Button.x(currentX);
                  this.player1Button.y(currentY);
                }
              }
            } else {
              // Move on the same level
              if (fromX < toX && currentX < toX) {
                currentX += inc; // Move from left to right
              } else if (fromX < toX && currentX >= toX) {
                animation1.stop();
                this.$emit("stopMoving", true);
                if (jumpToNumber) {
                  currentX = jumpToX;
                  currentY = jumpToY;
                  this.player1Button.x(currentX);
                  this.player1Button.y(currentY);
                }
              }
              if (fromX > toX && currentX > toX) {
                currentX -= inc; // Move from right to left
              } else if (fromX > toX && currentX <= toX) {
                animation1.stop();
                this.$emit("stopMoving", true);
                if (jumpToNumber) {
                  currentX = jumpToX;
                  currentY = jumpToY;
                  this.player1Button.x(currentX);
                  this.player1Button.y(currentY);
                }
              }
            }
            this.player1Button.x(currentX);
            this.player1Button.y(currentY);
          }, this.player1Layer);
          animation1.start();

          // this.player1Layer.move({
          //   x: toPoint.x - fromPoint.x,
          //   y: toPoint.y - fromPoint.y
          // });
        }
        if (this.whoIsTurn === 2) {
          // If it is player2's turn, move player2's button
          const fromNumber = this.player2Number;
          const rowFromNumber =
            fromNumber === 0
              ? 1
              : Math.ceil(fromNumber / this.boardSettings.columns);
          this.player2Number += this.dice;

          const toNumber =
            this.player2Number >
            this.boardSettings.columns * this.boardSettings.rows
              ? this.boardSettings.columns * this.boardSettings.rows
              : this.player2Number;
          const rowToNumber = Math.ceil(toNumber / this.boardSettings.columns);

          let jumpToNumber;
          if (!jumpToNumber) {
            this.boardSettings.ladders.forEach(ladder => {
              if (toNumber === ladder.from) {
                jumpToNumber = ladder.to;
                this.player2Number = jumpToNumber;
              }
            });
          }
          if (!jumpToNumber) {
            this.boardSettings.snakes.forEach(snake => {
              if (toNumber === snake.from) {
                jumpToNumber = snake.to;
                this.player2Number = jumpToNumber;
              }
            });
          }

          const middleNumber =
            rowToNumber === rowFromNumber
              ? 0
              : rowFromNumber * this.boardSettings.columns + 1;
          const prevMiddleNumber = middleNumber ? middleNumber - 1 : 0;
          // console.log(fromNumber, middleNumber, toNumber);

          const fromPoint =
            fromNumber === 0
              ? {
                  x: this.player2ButtonOriginalPosition.x,
                  y: this.player2ButtonOriginalPosition.y
                }
              : {
                  x:
                    this.board[fromNumber - 1].rect.x +
                    this.board[fromNumber - 1].rect.width / 2,
                  y:
                    this.board[fromNumber - 1].rect.y +
                    this.board[fromNumber - 1].rect.height / 2
                };

          const toPoint = {
            x:
              this.board[toNumber - 1].rect.x +
              this.board[toNumber - 1].rect.width / 2,
            y:
              this.board[toNumber - 1].rect.y +
              this.board[toNumber - 1].rect.height / 2
          };
          const jumpToPoint = jumpToNumber && {
            x:
              this.board[jumpToNumber - 1].rect.x +
              this.board[jumpToNumber - 1].rect.width / 2,
            y:
              this.board[jumpToNumber - 1].rect.y +
              this.board[jumpToNumber - 1].rect.height / 2
          };
          const middlePoint = middleNumber && {
            x:
              this.board[middleNumber - 1].rect.x +
              this.board[middleNumber - 1].rect.width / 2,
            y:
              this.board[middleNumber - 1].rect.y +
              this.board[middleNumber - 1].rect.height / 2
          };
          const prevMiddlePoint = prevMiddleNumber && {
            x:
              this.board[prevMiddleNumber - 1].rect.x +
              this.board[prevMiddleNumber - 1].rect.width / 2,
            y:
              this.board[prevMiddleNumber - 1].rect.y +
              this.board[prevMiddleNumber - 1].rect.height / 2
          };

          let currentX = fromPoint.x;
          let currentY = fromNumber === 0 ? toPoint.y : fromPoint.y;
          const fromX = fromPoint.x;
          const fromY = fromPoint.y;
          const toX = toPoint.x;
          const toY = toPoint.y;
          const prevMiddleX = prevMiddlePoint && prevMiddlePoint.x;
          const prevMiddleY = prevMiddlePoint && prevMiddlePoint.y;
          const middleX = middlePoint && middlePoint.x;
          const middleY = middlePoint && middlePoint.y;
          const jumpToX = jumpToPoint && jumpToPoint.x;
          const jumpToY = jumpToPoint && jumpToPoint.y;
          let currentRow = this.boardSettings.rows;

          const animation2 = new Konva.Animation(frame => {
            const inc = 3;
            if (middleNumber) {
              if (
                currentRow === this.boardSettings.rows &&
                fromX < prevMiddleX &&
                currentX < prevMiddleX
              ) {
                currentX += inc;
              } else if (
                currentRow === this.boardSettings.rows &&
                fromX > prevMiddleX &&
                currentX > prevMiddleX
              ) {
                currentX -= inc;
              } else if (
                (fromX <= prevMiddleX &&
                  currentX >= prevMiddleX &&
                  currentY >= middleY) ||
                (fromX >= prevMiddleX &&
                  currentX <= prevMiddleX &&
                  currentY >= middleY)
              ) {
                currentY -= inc;
                currentRow--;
              } else if (
                currentRow < this.boardSettings.rows &&
                toX > middleX &&
                currentX < toX
              ) {
                currentX += inc;
              } else if (
                currentRow < this.boardSettings.rows &&
                toX < middleX &&
                currentX > toX
              ) {
                currentX -= inc;
              } else {
                animation2.stop();
                this.$emit("stopMoving", true);
                if (jumpToNumber) {
                  currentX = jumpToX;
                  currentY = jumpToY;
                  this.player2Button.x(currentX);
                  this.player2Button.y(currentY);
                }
              }
            } else {
              if (fromX < toX && currentX < toX) {
                currentX += inc;
              } else if (fromX < toX && currentX >= toX) {
                animation2.stop();
                this.$emit("stopMoving", true);
                if (jumpToNumber) {
                  currentX = jumpToX;
                  currentY = jumpToY;
                  this.player2Button.x(currentX);
                  this.player2Button.y(currentY);
                }
              }
              if (fromX > toX && currentX > toX) {
                currentX -= inc;
              } else if (fromX > toX && currentX <= toX) {
                animation2.stop();
                this.$emit("stopMoving", true);
                if (jumpToNumber) {
                  currentX = jumpToX;
                  currentY = jumpToY;
                  this.player2Button.x(currentX);
                  this.player2Button.y(currentY);
                }
              }
            }

            this.player2Button.x(currentX);
            this.player2Button.y(currentY);
          }, this.player2Layer);
          animation2.start();
        }
        // console.log("move button", `${this.whoIsTurn} move ${this.dice}`);
      }
    },
    // If board's columns and rows are changed, redraw the board
    "boardSettings.columns"(value, prevValue) {
      if (value === prevValue) return;
      this.drawBoard(this.maxWidth, this.boardSettings.rows, value);
      this.boardSettings.snakes = [];
      this.boardSettings.ladders = [];
    },
    "boardSettings.rows"(value, prevValue) {
      if (value === prevValue) return;
      this.drawBoard(this.maxWidth, value, this.boardSettings.columns);
      this.boardSettings.snakes = [];
      this.boardSettings.ladders = [];
    },

    // If board's ladders and snakes are changed, redraw the snakes and ladders
    "boardSettings.ladders"(value) {
      this.ladderLayer.destroy();
      this.drawLadders(value);
    },
    "boardSettings.snakes"(value) {
      this.snakeLayer.destroy();
      this.drawSnakes(value);
    }
  },
  computed: {
    usedNumbers() {
      // All numbers used by ladder or snake
      const used = [];
      this.boardSettings.snakes.forEach(item => {
        used.push(item.from);
        used.push(item.to);
      });
      this.boardSettings.ladders.forEach(item => {
        used.push(item.from);
        used.push(item.to);
      });
      return used;
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("boardCanvas").offsetWidth * 0.9;
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
      // console.log("draw board");
      this.initStage();
      this.board = createBoard(
        this.maxWidth,
        this.boardSettings.rows,
        this.boardSettings.columns
      );

      this.boardLayer = new Konva.Layer();
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
        this.boardLayer.add(rect);

        const text = new Konva.Text({
          x: this.board[i].number.x,
          y: this.board[i].number.y,
          text: this.board[i].number.value,
          fontSize: 18,
          fill: "#DC3545"
        });
        this.boardLayer.add(text);

        // if (i === this.board.length - 1) {
        //   console.log(i);
        //   const finishText = new Konva.Text({
        //     x: this.board[i].rect.x + (this.board[i].rect.width / 2) * 0.5,
        //     y: this.board[i].rect.y + this.board[i].rect.height / 2,
        //     text: "Finish",
        //     fontSize: 10,
        //     fill: "black"
        //   });
        //   this.boardLayer.add(finishText);
        // }
      }
      this.stage.add(this.boardLayer);
    },
    drawSnakes(snakes) {
      // console.log(snakes);
      if (!snakes || snakes.length === 0) {
        return;
      }
      this.snakeLayer = new Konva.Layer();
      for (let i = 0; i < snakes.length; i++) {
        const { from, to } = snakes[i];
        const fromRect = this.board[from - 1].rect;
        const toRect = this.board[to - 1].rect;
        const fromPoint = new Konva.Circle({
          x: fromRect.x + fromRect.width / 2,
          y: fromRect.y + fromRect.height / 2,
          radius: 10,
          fill: "red",
          stroke: "#aaa",
          strokeWidth: 1,
          draggable: this.draggable,
          dragBoundFunc: pos => {
            // console.log(pos);
            const leftBoundary = 10; // 10 - button radius
            const rightBoundary = this.maxWidth - 10;
            // const upBoundary =
            //   Math.ceil(to / this.boardSettings.columns) * fromRect.height + 11;
            // const downBoundary =
            //   getBoardHeight(
            //     this.maxWidth,
            //     this.boardSettings.rows,
            //     this.boardSettings.columns
            //   ) - 10;
            const upBoundary = 10;
            const downBoundary =
              (this.boardSettings.rows -
                Math.ceil(to / this.boardSettings.columns)) *
                fromRect.height -
              10;
            return {
              x:
                pos.x <= leftBoundary
                  ? leftBoundary
                  : pos.x >= rightBoundary
                  ? rightBoundary
                  : pos.x,
              y:
                pos.y <= upBoundary
                  ? upBoundary
                  : pos.y >= downBoundary
                  ? downBoundary
                  : pos.y
            };
          }
        });
        const toPoint = new Konva.Circle({
          x: toRect.x + toRect.width / 2,
          y: toRect.y + toRect.height / 2,
          radius: 10,
          fill: "blue",
          stroke: "#aaa",
          strokeWidth: 1,
          draggable: this.draggable,
          dragBoundFunc: pos => {
            const leftBoundary = 10; // 10 - radius
            const rightBoundary = this.maxWidth - 10;
            // const upBoundary = 0;
            // const downBoundary =
            //   (Math.ceil(from / this.boardSettings.columns) - 1) *
            //     fromRect.height -
            //   10;
            const upBoundary =
              (this.boardSettings.rows -
                Math.floor(from / this.boardSettings.columns)) *
                fromRect.height +
              11;
            const downBoundary =
              getBoardHeight(
                this.maxWidth,
                this.boardSettings.rows,
                this.boardSettings.columns
              ) - 10;
            return {
              x:
                pos.x <= leftBoundary
                  ? leftBoundary
                  : pos.x >= rightBoundary
                  ? rightBoundary
                  : pos.x,
              y:
                pos.y <= upBoundary
                  ? upBoundary
                  : pos.y >= downBoundary
                  ? downBoundary
                  : pos.y
            };
          }
        });

        let currentFromX = fromRect.x + fromRect.width / 2;
        let currentFromY = fromRect.y + fromRect.height / 2;
        let currentToX = toRect.x + toRect.width / 2;
        let currentToY = toRect.y + toRect.height / 2;
        const path = new Konva.Line({
          points: [
            currentFromX,
            currentFromY,
            ((currentFromX + currentToX) / 2) * 0.8,
            ((currentFromY + currentToY) / 2) * 0.8,
            currentToX,
            currentToY
          ],
          stroke: "grey",
          strokeWidth: 10,
          opacity: 0.3,
          tension: 1
        });
        this.snakeLayer.add(path);
        this.snakeLayer.add(fromPoint);
        this.snakeLayer.add(toPoint);

        fromPoint.on("dragmove", e => {
          currentFromX = e.target.attrs.x;
          currentFromY = e.target.attrs.y;
          path.setAttr("points", [
            currentFromX,
            currentFromY,
            ((currentFromX + currentToX) / 2) * 0.8,
            ((currentFromY + currentToY) / 2) * 0.8,
            currentToX,
            currentToY
          ]);
          path.draw();
        });
        fromPoint.on("dragend", e => {
          const pointerPosition = this.boardLayer.getIntersection(
            this.stage.getPointerPosition()
          );
          if (pointerPosition) {
            const newFromNumber = Number(pointerPosition.name());
            const minNumberAllowed =
              Math.ceil(to / this.boardSettings.columns) *
              this.boardSettings.columns;
            const maxNumberAllowed =
              this.boardSettings.columns * this.boardSettings.rows;
            if (
              newFromNumber > minNumberAllowed &&
              newFromNumber < maxNumberAllowed &&
              this.usedNumbers.indexOf(newFromNumber) === -1
            ) {
              this.boardSettings.snakes[i].from = newFromNumber;
            }
          }
          this.snakeLayer.destroy();
          this.drawSnakes(this.boardSettings.snakes);
        });

        toPoint.on("dragmove", e => {
          currentToX = e.target.attrs.x;
          currentToY = e.target.attrs.y;
          path.setAttr("points", [
            currentFromX,
            currentFromY,
            ((currentFromX + currentToX) / 2) * 0.8,
            ((currentFromY + currentToY) / 2) * 0.8,
            currentToX,
            currentToY
          ]);
          path.draw();
        });
        toPoint.on("dragend", e => {
          const pointerPosition = this.boardLayer.getIntersection(
            this.stage.getPointerPosition()
          );
          if (pointerPosition) {
            const newToNumber = Number(pointerPosition.name());
            const maxNumberAllowed =
              (Math.ceil(from / this.boardSettings.columns) - 1) *
                this.boardSettings.columns +
              1;
            if (
              newToNumber < maxNumberAllowed &&
              this.usedNumbers.indexOf(newToNumber) === -1
            ) {
              this.boardSettings.snakes[i].to = newToNumber;
            }
          }
          this.snakeLayer.destroy();
          this.drawSnakes(this.boardSettings.snakes);
        });
      }
      this.stage.add(this.snakeLayer);
    },
    drawLadders(ladders) {
      if (!ladders || ladders.length === 0) {
        return;
      }
      this.ladderLayer = new Konva.Layer();
      for (let i = 0; i < ladders.length; i++) {
        const { from, to } = ladders[i];
        const fromRect = this.board[from - 1].rect;
        const toRect = this.board[to - 1].rect;
        const fromPoint = new Konva.Rect({
          x: fromRect.x + toRect.width / 2 - 20 / 2,
          y: fromRect.y + toRect.height / 2 - 20 / 2,
          height: 20,
          width: 20,
          stroke: "#aaa",
          strokeWidth: 1,
          fill: "green",
          draggable: this.draggable,
          dragBoundFunc: pos => {
            const leftBoundary = 0;
            const rightBoundary = this.maxWidth - 20;
            // const upBoundary = 0;
            // const downBoundary =
            //   (Math.ceil(to / this.boardSettings.columns) - 1) *
            //     fromRect.height -
            //   20;
            const upBoundary =
              (this.boardSettings.rows -
                Math.ceil(to / this.boardSettings.columns) +
                1) *
              fromRect.height;
            const downBoundary =
              getBoardHeight(
                this.maxWidth,
                this.boardSettings.rows,
                this.boardSettings.columns
              ) - 20;

            return {
              x:
                pos.x <= leftBoundary
                  ? leftBoundary
                  : pos.x >= rightBoundary
                  ? rightBoundary
                  : pos.x,
              y:
                pos.y <= upBoundary
                  ? upBoundary
                  : pos.y >= downBoundary
                  ? downBoundary
                  : pos.y
            };
          }
        });
        const toPoint = new Konva.Rect({
          x: toRect.x + toRect.width / 2 - 20 / 2,
          y: toRect.y + toRect.height / 2 - 20 / 2,
          height: 20,
          width: 20,
          stroke: "#aaa",
          strokeWidth: 1,
          fill: "grey",
          draggable: this.draggable,
          dragBoundFunc: pos => {
            const leftBoundary = 0;
            const rightBoundary = this.maxWidth - 20;
            const upBoundary = 0;

            const downBoundary =
              (this.boardSettings.rows -
                Math.ceil(from / this.boardSettings.columns)) *
                fromRect.height -
              20;
            return {
              x:
                pos.x <= leftBoundary
                  ? leftBoundary
                  : pos.x >= rightBoundary
                  ? rightBoundary
                  : pos.x,
              y:
                pos.y <= upBoundary
                  ? upBoundary
                  : pos.y >= downBoundary
                  ? downBoundary
                  : pos.y
            };
          }
        });

        let currentFromX = fromRect.x + fromRect.width / 2;
        let currentFromY = fromRect.y + fromRect.height / 2;
        let currentToX = toRect.x + toRect.width / 2;
        let currentToY = toRect.y + toRect.height / 2;
        const path = new Konva.Line({
          points: [currentFromX, currentFromY, currentToX, currentToY],
          stroke: "green",
          strokeWidth: 10,
          opacity: 0.3
        });
        this.ladderLayer.add(path);
        this.ladderLayer.add(fromPoint);

        fromPoint.on("dragmove", e => {
          currentFromX = e.target.attrs.x + 20 / 2;
          currentFromY = e.target.attrs.y + 20 / 2;
          path.setAttr("points", [
            currentFromX,
            currentFromY,
            currentToX,
            currentToY
          ]);
          path.draw();
        });
        fromPoint.on("dragend", e => {
          const pointerPosition = this.boardLayer.getIntersection(
            this.stage.getPointerPosition()
          );
          if (pointerPosition) {
            const newFromNumber = Number(pointerPosition.name());
            const maxNumberAllowed =
              (Math.ceil(to / this.boardSettings.columns) - 1) *
                this.boardSettings.columns +
              1;
            if (
              newFromNumber < maxNumberAllowed &&
              this.usedNumbers.indexOf(newFromNumber) === -1
            ) {
              this.boardSettings.ladders[i].from = newFromNumber;
            }
          }
          this.ladderLayer.destroy();
          this.drawLadders(this.boardSettings.ladders);
        });

        toPoint.on("dragmove", e => {
          currentToX = e.target.attrs.x + 20 / 2;
          currentToY = e.target.attrs.y + 20 / 2;
          path.setAttr("points", [
            currentFromX,
            currentFromY,
            currentToX,
            currentToY
          ]);
          path.draw();
        });
        toPoint.on("dragend", e => {
          const pointerPosition = this.boardLayer.getIntersection(
            this.stage.getPointerPosition()
          );
          if (pointerPosition) {
            const newToNumber = Number(pointerPosition.name());
            const minNumberAllowed =
              Math.ceil(from / this.boardSettings.columns) *
              this.boardSettings.columns;
            if (
              newToNumber > minNumberAllowed &&
              this.usedNumbers.indexOf(newToNumber) === -1
            ) {
              this.boardSettings.ladders[i].to = newToNumber;
            }
          }
          this.ladderLayer.destroy();
          this.drawLadders(this.boardSettings.ladders);
        });
        this.ladderLayer.add(toPoint);
      }
      this.stage.add(this.ladderLayer);
    }
  },
  created() {},
  mounted() {
    this.drawBoard();
    this.drawLadders(this.boardSettings.ladders);
    this.drawSnakes(this.boardSettings.snakes);
  }
};
</script>

<style scoped></style>
