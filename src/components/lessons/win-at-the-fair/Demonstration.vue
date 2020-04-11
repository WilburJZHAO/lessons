<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Demonstration game</h3>
    <div id="board-container" class="app--canvas-container"></div>
    <div class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4 d-flex justify-content-center">
        <app-rule-map :rules="rules"></app-rule-map>
      </div>
      <div class="col-sm-4 d-flex mb-3">
        <app-dice :number="dice1" :index="1"></app-dice>
        <div class="mr-2"></div>
        <app-dice :number="dice2" :index="2"></app-dice>
      </div>
    </div>
    <div
      v-if="status===2"
      class="text-center text-danger"
    >You win &dollar;{{ current.value.toFixed(2) }}</div>
    <div class="text-center">
      <button
        class="btn btn-outline-success"
        v-if="status===0"
        @click="handleThrowDice"
      >Roll dice</button>
      <button
        class="btn btn-outline-success"
        v-if="status===1"
        @click="handleMoveCounter"
      >Move counter</button>

      <button class="btn btn-outline-dark" v-if="status===2" @click="handleReset">Reset</button>
    </div>
  </div>
</template>

<script>
import Konva from "konva";
import { createMap } from "./utils";
import { pickNumber } from "../../common/utils";
import RuleMap from "./RuleMap.vue";
import Dice from "../../common/Dice.vue";

export default {
  data: function() {
    return {
      stage: null,
      layer: null,
      maxWidth: 500,
      map: null,
      counterLayer: null,
      counter: null,
      routeLayer: null,
      status: 0, // 0 - throw dice, 1 - move counter, 2- finish
      dice1: 0,
      dice2: 0,
      current: null,
      prev: null
    };
  },
  components: {
    appRuleMap: RuleMap,
    appDice: Dice
  },
  props: ["values", "rules"],
  computed: {
    radius() {
      return this.maxWidth / 11;
    },
    diceNumber() {
      return this.dice1 + this.dice2;
    }
  },
  watch: {
    maxWidth(value, oldValue) {
      if (value !== oldValue) {
        console.log(value);
        this.map = createMap(value, this.values);
        this.initStage();
        this.drawHexagon();
        this.drawCounter();
      }
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("board-container").offsetWidth;
      this.stage = new Konva.Stage({
        container: "board-container",
        width: this.maxWidth,
        height: this.maxWidth + 70
      });
    },
    drawHexagon() {
      if (!this.stage) {
        this.initStage();
      }
      this.layer = new Konva.Layer();
      for (let i = 0; i < this.map.length; i++) {
        const hexagon = new Konva.RegularPolygon({
          // Draw a hexagon
          x: this.map[i].position.x,
          y: this.map[i].position.y,
          sides: 6,
          radius: this.radius,
          fill: "#FFFFA9",
          stroke: "#0000FF",
          strokeWidth: 1,
          rotation: 90
        });
        this.layer.add(hexagon);
        if (this.map[i].value) {
          const text = new Konva.Text({
            x:
              this.map[i].value < 1
                ? this.map[i].position.x - 18
                : this.map[i].position.x - 7,
            y: this.map[i].position.y - 10,
            text:
              this.map[i].value < 1
                ? `${this.map[i].value.toFixed(2)}`
                : `${this.map[i].value}`,
            fontFamily: "Calibri",
            fontSize: 20,
            fill: "black"
          });
          this.layer.add(text);
        }
      }
      this.stage.add(this.layer);
    },
    drawCounter() {
      if (!this.counterLayer) {
        this.counterLayer = new Konva.Layer();
      }
      this.counter = new Konva.Circle({
        x: this.current.position.x,
        y: this.current.position.y,
        radius: this.radius * 0.7,
        fill: "#FF7E79"
      });
      this.counterLayer.add(this.counter);
      this.stage.add(this.counterLayer);
    },
    drawRoute() {
      if (!this.routeLayer) {
        this.routeLayer = new Konva.Layer();
      }
      const line = new Konva.Line({
        points: [
          this.current.position.x,
          this.current.position.y,
          this.prev.position.x,
          this.prev.position.y
        ],
        stroke: "blue",
        strkeWidth: 5
      });
      this.routeLayer.add(line);
      this.stage.add(this.routeLayer);
    },
    handleThrowDice() {
      this.dice1 = pickNumber(1, 6);
      this.dice2 = pickNumber(1, 6);
      this.status = 1;
    },
    getDirection(dice) {
      return this.rules.find(item => item.dice === dice).next;
    },
    handleMoveCounter() {
      const direction = this.getDirection(this.diceNumber);
      this.prev = this.current;
      switch (direction) {
        case 1:
          this.current = this.map[this.current.left];
          break;
        case 2:
          this.current = this.map[this.current.center];
          break;
        case 3:
          this.current = this.map[this.current.right];
          break;
      }
      this.drawRoute();
      this.counter.move({
        x: this.current.position.x - this.prev.position.x,
        y: this.current.position.y - this.prev.position.y
      });
      this.counterLayer.add(this.counter);
      if (this.current.value) {
        const text = new Konva.Text({
          x: this.current.value < 1
                ? this.current.position.x - 18
                : this.current.position.x - 7,
          y: this.current.position.y - 10,
          text:
            this.current.value < 1
              ? `${this.current.value.toFixed(2)}`
              : `${this.current.value}`,
          fontFamily: "Calibri",
          fontSize: 20,
          fill: "yellow"
        });
        this.counterLayer.add(text);
        this.status = 2;
      } else {
        this.status = 0;
      }
      this.stage.add(this.counterLayer);
    },
    handleReset() {
      this.routeLayer.destroy();
      this.counterLayer.destroy();
      this.status = 0;
      this.current = this.map[0];
      this.prev = null;
      this.dice1 = 0;
      this.dice2 = 0;
      this.drawCounter();
    }
  },
  created() {
    this.map = createMap(this.maxWidth, this.values);
    this.current = this.map[0];
  },
  mounted() {
    this.initStage();
    this.drawHexagon();
    this.drawCounter();
  }
};
</script>

<style scoped>
.app--canvas-container {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
