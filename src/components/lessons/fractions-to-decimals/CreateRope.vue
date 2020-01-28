<template>
  <div class="container mt-3">
    <h3 class="text-center text-success mb-4">Create a decimal rope</h3>
    <div id="ropeContainer" class="canvasContainer"></div>
    <!-- <div class="mb-5"></div>
    <div id="tagContainer" class="canvasContainer"></div>-->
    <div class="mb-4"></div>
    <div class="text-center mb-2">
      <button v-if="status===0" class="btn btn-outline-success" @click="handleCheck">Check</button>
      <button
        v-if="status===1"
        class="btn btn-outline-dark"
        @click="handleReset"
      >Tap here for another rope length</button>
    </div>
    <div
      class="alert alert-danger text-center app--alert"
      v-if="status===0"
    >Drag the decimal markers to the rope</div>
    <div
      class="alert alert-success text-center app--alert"
      v-if="status===1"
    >All decimal markers have been placed and checked</div>
  </div>
</template>

<script>
import Konva from "konva";
import { APP_CONST, generateTagArr } from "./utils";
import { pickNumber } from "../../common/utils";
export default {
  data: function() {
    return {
      ropeWidth: 0,
      maxWidth: 0,
      tagArr: null,
      tagContainer: [],
      stage: null,
      layer: null,
      tagLayer: null,
      ropeData: [],
      status: 0
    };
  },
  methods: {
    initRopeData() {
      if (!this.tagArr) {
        return [];
      }
      this.tagArr.forEach(el => {
        this.ropeData.push({
          decimal: el,
          positioned: false,
          checked: false,
          diff: 0,
          currentPos: { x: 0, y: 0 },
          originalPos: { x: 0, y: 0 },
          correctPos: { x: 0, y: 0 }
        });
      });
    },
    initStage() {
      this.maxWidth = document.getElementById("ropeContainer").offsetWidth;
      this.stage = new Konva.Stage({
        container: "ropeContainer",
        width: this.maxWidth,
        height: APP_CONST.CONTAINER_HEIGHT
      });
    },
    drawRope() {
      if (!this.stage) {
        this.initStage();
      }
      // eslint-disable-next-line no-console
      // Calculate the width of rope
      this.maxWidth = document.getElementById("ropeContainer").offsetWidth - 10;
      this.ropeWidth =
        this.maxWidth > APP_CONST.MIN_ROPE_WIDTH
          ? pickNumber(APP_CONST.MIN_ROPE_WIDTH, this.maxWidth)
          : this.maxWidth;

      // Draw rope...
      this.layer = new Konva.Layer();
      const rope = new Konva.Rect({
        x: (this.maxWidth - this.ropeWidth) / 2,
        y: 0,
        width: this.ropeWidth,
        height: APP_CONST.ROPE_HEIGHT,
        fill: "pink",
        stroke: "pink",
        strokeWidth: 1
      });
      this.layer.add(rope);
      this.stage.add(this.layer);
      return true;
    },
    drawTags() {
      if (!this.stage) {
        this.initStage();
      }
      // this.tagStage = new Konva.Stage({
      //   container: "tagContainer",
      //   width: this.maxWidth,
      //   height: APP_CONST.ROPE_HEIGHT
      // });
      this.tagLayer = new Konva.Layer();

      const length = this.tagArr.length;
      const unitRopeWidth = this.ropeWidth / 10;
      const offsetX = (this.maxWidth - this.ropeWidth) / 2;
      // const textOffset = 3;
      // const tagRectWidth = 12;

      this.tagArr.forEach((el, index) => {
        // eslint-disable-next-line no-console
        // console.log(el);
        const tagPositionOnX =
          ((this.ropeWidth / length) * index +
            (this.maxWidth - this.ropeWidth) / 2 +
            ((this.ropeWidth / length) * (index + 1) +
              (this.maxWidth - this.ropeWidth) / 2)) /
          2;
        const tagPositionOnY = APP_CONST.ROPE_HEIGHT + APP_CONST.MARGIN_Y;
        const rectPositionOnX = tagPositionOnX - APP_CONST.TAG_RECT_WIDTH / 2;
        const boundaryX =
          (this.maxWidth - this.ropeWidth) / 2 -
          rectPositionOnX -
          APP_CONST.TAG_RECT_WIDTH / 2;
        const boundaryY = this.ropeWidth - Math.abs(boundaryX);
        // console.log(APP_CONST);

        // console.log(boundaryX, boundaryY);

        // The group item to hold tag and decimal
        const ropeDataBak = this.ropeData;
        this.tagContainer[index] = new Konva.Group({
          draggable: true,
          dragBoundFunc: function(pos) {
            // console.log(pos);
            // console.log(this.index);
            this.index * APP_CONST.TAG_RECT_WIDTH;
            return {
              x: ropeDataBak[this.index].checked
                ? ropeDataBak[this.index].correctPos.x
                : pos.x < boundaryX
                ? boundaryX
                : pos.x > boundaryY
                ? boundaryY
                : pos.x,
              y: ropeDataBak[this.index].checked
                ? ropeDataBak[this.index].correctPos.y
                : pos.y > 0
                ? 0
                : pos.y < -APP_CONST.MARGIN_Y
                ? -APP_CONST.MARGIN_Y * 1.5
                : pos.y
            };
          }
        });

        this.tagContainer[index].on("mouseover", function() {
          document.body.style.cursor = "pointer";
        });
        this.tagContainer[index].on("mouseout", function() {
          document.body.style.cursor = "default";
        });

        // Draw tag rect, the container to hold tag and decimal
        const tagRect = new Konva.Rect({
          x: rectPositionOnX,
          y: tagPositionOnY,
          width: APP_CONST.TAG_RECT_WIDTH,
          height: APP_CONST.TAG_RECT_HEIGHT,
          stroke: "transparent",
          strokeWidth: 1
        });

        // Draw tag
        const tag = new Konva.Line({
          points: [
            tagPositionOnX,
            tagPositionOnY,
            tagPositionOnX,
            tagPositionOnY + APP_CONST.TAG_HEIGHT
          ],
          stroke: "blue",
          strokeWidth: 1
        });

        // Print decimal
        const text = new Konva.Text({
          x: tagPositionOnX - APP_CONST.TAG_TEXT_OFFSET,
          y: tagPositionOnY + APP_CONST.TAG_HEIGHT + 5,
          text: el,
          fontSize: 13,
          fill: "blue"
        });

        this.tagContainer[index].add(tagRect);
        this.tagContainer[index].add(tag);
        this.tagContainer[index].add(text);
        this.tagLayer.add(this.tagContainer[index]);

        this.ropeData[index].id = this.tagContainer[index]._id;
        this.ropeData[index].index = this.tagContainer[index].index;
        this.ropeData[index].correctPos = {
          x:
            offsetX +
            unitRopeWidth * this.ropeData[index].decimal * 10 -
            tagPositionOnX,
          y: -APP_CONST.MARGIN_Y * 1.5
        };
      });

      // this.stage.on("dragstart", e => {
      //   console.log(e);
      //   return;
      // });
      this.stage.on("dragend", e => {
        // console.log(this.tagContainer);
        const targetId = e.target._id;
        const targetTagContainer = this.tagContainer.find(tag => {
          return tag._id === targetId;
        });
        const targetTag = this.ropeData.find(el => el.id === targetId);
        targetTag.currentPos.x = e.target.attrs.x;
        targetTag.currentPos.y = e.target.attrs.y;
        // console.log(targetTag);
        if (e.target.attrs.y === targetTag.correctPos.y) {
          targetTag.positioned = true;
        } else {
          targetTag.positioned = false;
        }

        // console.log(targetId, e.target.attrs.x, e.target.attrs.y);
        // console.log(this.tagArr[targetTagContainer.index]);
      });
      this.stage.add(this.tagLayer);
    },

    drawDivideLine(lineArr = []) {
      if (!this.stage) {
        this.initStage();
      }
      lineArr.sort();
      // console.log(lineArr);
      const unitRopeWidth = this.ropeWidth / 10;
      const offsetX = (this.maxWidth - this.ropeWidth) / 2;
      lineArr.forEach(el => {
        const line = new Konva.Line({
          points: [
            offsetX + this.ropeWidth * el,
            0,
            offsetX + this.ropeWidth * el,
            APP_CONST.ROPE_HEIGHT
          ],
          stroke: "yellow",
          strokeWidth: 2
        });

        const target = this.ropeData.find(rEl => rEl.decimal === el);
        const tag = this.tagContainer.find(tEl => tEl._id === target.id);
        // console.log(tag);
        tag.move({ x: target.diff, y: 0 });
        if (Math.abs(target.diff) > 2) {
          // console.log(tag.children[2]);
          tag.children[2].fill("red");
        }
        this.layer.add(line);
        this.stage.add(this.layer);
      });
      this.stage.add(this.tagLayer); // Ensure tags are always above the rope
    },

    handleCheck() {
      const lineArr = [];
      for (let i = 0; i < this.ropeData.length; i++) {
        if (this.ropeData[i].positioned && !this.ropeData[i].checked) {
          // TODO: Do check work and place tag to correct position.
          lineArr.push(this.ropeData[i].decimal);
          this.ropeData[i].diff =
            this.ropeData[i].correctPos.x - this.ropeData[i].currentPos.x;
          this.ropeData[i].checked = true;
        }
      }
      this.drawDivideLine(lineArr);
      const unchecked = this.ropeData.findIndex(el => el.checked === false);
      if (unchecked === -1) {
        this.status = 1;
      }
    },
    handleReset() {
      this.tagContainer = [];
      this.stage = null;
      this.layer = null;
      this.tagLayer = null;
      this.ropeData = [];
      this.tagArr = generateTagArr();
      this.initRopeData();
      this.drawRope();
      this.drawTags();
      this.status = 0;
    }
  },
  created() {
    this.tagArr = generateTagArr();
    this.initRopeData();
  },
  mounted() {
    this.drawRope();
    this.drawTags();
  }
};
</script>

<style scoped>
.canvasContainer {
  width: 80%;
  margin: 0 auto;
}

.app--alert {
  width: 60%;
  margin: 0 auto;
}

@media (max-width: 576px) {
  .app--alert {
    width: 100%;
  }
}
</style>
