<template>
  <div style="width: 150px; position: relative;" class="d-flex justify-content-center">
    <div style="position: absolute; width: 50px; left: -40px; top: 40px;">{{ leftDices }}</div>
    <div
      style="position: absolute;left: 50%; top: 10px; transform: translateX(-50%);"
    >{{ centerDices }}</div>
    <div style="position: absolute; width: 50px;left: 120px; top: 40px;">{{ rightDices }}</div>
    <img
      :src="require('@/assets/win-at-the-fair/left.png')"
      alt="left-arrow"
      style="position: absolute; z-index: 100; left: 0; top: 60px;"
    />
    <img
      :src="require('@/assets/win-at-the-fair/center.png')"
      style="position: absolute; z-index: 100; left: 52px; top: 60px;"
      alt="center-arrow"
    />
    <img
      :src="require('@/assets/win-at-the-fair/right.png')"
      style="position: absolute; z-index: 100; left: 100px; top: 60px;"
      alt="right-arrow"
    />
    <div id="hexagon-canvas" class="app--hexagon-canvas"></div>
  </div>
</template>

<script>
import Konva from "konva";
export default {
  props: ["rules"],
  data: function() {
    return {
      stage: null,
      layer: null
    };
  },
  computed: {
    leftDices() {
      return this.rules
        .filter(item => item.next === 1)
        .map(obj => obj.dice)
        .join(" ");
    },
    centerDices() {
      return this.rules
        .filter(item => item.next === 2)
        .map(obj => obj.dice)
        .join(" ");
    },
    rightDices() {
      return this.rules
        .filter(item => item.next === 3)
        .map(obj => obj.dice)
        .join(" ");
    }
  },
  methods: {
    drawHexagon() {
      const width = 150;
      const radius = width / 5;
      const height = 150 + 10;
      this.stage = new Konva.Stage({
        container: "hexagon-canvas",
        width,
        height
      });
      this.layer = new Konva.Layer();
      const hexagon = new Konva.RegularPolygon({
        x: width / 2,
        y: height / 2,
        sides: 6,
        radius,
        fill: "#FFFFA9",
        stroke: "#0000FF",
        strokeWidth: 1,
        rotation: 90
      });
      this.layer.add(hexagon);
      this.stage.add(this.layer);
      // console.log("draw", width);
    }
  },
  created() {},
  mounted() {
    this.drawHexagon();
  }
};
</script>

<style scoped>
.app--hexagon-canvas {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
