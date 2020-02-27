<template>
  <div class="container mt-3">
    <h3 class="text-success text-center mb-3">Change prize values and rules</h3>
    <div class="row">
      <div class="col-md-9" style="position: relative;">
        <div
          v-for="(item, index) in myValues"
          :key="index"
          style="position: absolute; z-index: 100;"
          :style="{
            left: valuesMap[index].position.x + 'px',
            top: valuesMap[index].position.y + 'px'
          }"
        >
          <input
            type="text"
            class="app--value-input"
            @keypress="handleSetInput"
            @focus="message = 'Enter the prize value(0 to 10)'"
            v-model.number="myValues[index]"
          />
        </div>

        <div class="app--canvas" id="board-container"></div>
      </div>
      <div class="col-md-3 d-flex flex-column align-items-center">
        <div v-for="item in myRules" :key="item.index">
          <span class="mr-2">{{ item.dice }}</span>
          <img
            v-if="item.next === 1"
            :src="require('@/assets/win-at-the-fair/left.png')"
            alt="left-arrow"
            @click="handleChangeDirection(item.id)"
          />
          <img
            v-if="item.next === 2"
            :src="require('@/assets/win-at-the-fair/center.png')"
            alt="center-arrow"
            @click="handleChangeDirection(item.id)"
          />
          <img
            v-if="item.next === 3"
            :src="require('@/assets/win-at-the-fair/right.png')"
            alt="right-arrow"
            @click="handleChangeDirection(item.id)"
          />
        </div>
        <app-rule-map :rules="myRules"></app-rule-map>
        <div class="text-center">
          <button class="btn btn-outline-dark" @click="handleRestore">Restore</button>
          <div class="mb-2"></div>
          <button class="btn btn-outline-success" @click="handleOk" :disabled="!isValuesValid">OK</button>
        </div>
      </div>
    </div>
    <div class="text-danger text-center">{{ message }}</div>
  </div>
</template>

<script>
import Konva from "konva";
import _ from "lodash";
import RuleMap from "./RuleMap.vue";
import { createMap, values, rules, convertNodeId } from "./utils";
export default {
  props: ["rules", "values"],
  data: function() {
    return {
      stage: null,
      layer: null,
      maxWidth: 500,
      map: null,
      myRules: null,
      myValues: null,
      message: ""
    };
  },
  components: {
    appRuleMap: RuleMap
  },
  computed: {
    radius() {
      return this.maxWidth / 11;
    },
    valuesMap() {
      const valuesMap = [];
      for (let i = 0; i < this.myValues.length; i++) {
        valuesMap.push(this.map[convertNodeId(i)]);
      }
      return valuesMap;
    },
    isValuesValid() {
      if (!this.myValues) {
        return false;
      }
      for (let i = 0; i < this.myValues.length; i++) {
        if (
          typeof this.myValues[i] !== "number" ||
          this.myValues[i] < 0 ||
          this.myValues[i] > 10
        ) {
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    maxWidth(value, oldValue) {
      if (value !== oldValue) {
        this.map = createMap(value, this.myValues);
        this.initStage();
        this.drawHexagon();
      }
    },
    isValuesValid(value) {
      if (value) {
        this.message = "";
      } else {
        this.message = "There is invalid value";
      }
    }
  },
  methods: {
    initStage() {
      this.maxWidth = document.getElementById("board-container").offsetWidth;
      this.stage = new Konva.Stage({
        container: "board-container",
        width: this.maxWidth,
        height: this.maxWidth + 100
      });
    },
    drawHexagon() {
      this.initStage();
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
      }
      this.stage.add(this.layer);
    },
    handleSetInput(e) {
      // console.log(e.target.value);
      if (!((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 46)) {
        e.preventDefault();
      }
      if (e.target.value > 9 || e.target.value.length > 2) {
        e.preventDefault();
      }
    },
    handleChangeDirection(e) {
      // console.log(e);
      const index = e;
      if (this.myRules[index].next === 3) {
        this.myRules[index].next = 1;
      } else {
        this.myRules[index].next++;
      }
    },
    handleRestore() {
      for (let i = 0; i < values.length; i++) {
        if (this.myValues[i] !== values[i]) {
          this.myValues[i] = values[i];
        }
      }

      for (let i = 0; i < rules.length; i++) {
        if (this.myRules[i].next !== rules[i].next) {
          this.myRules[i].next = rules[i].next;
        }
      }
      this.myValues = [...this.myValues];
      this.myRules = [...this.myRules];
    },
    handleOk() {
      this.$emit("changeSettings", {
        myValues: this.myValues,
        myRules: this.myRules
      });
    }
  },

  created() {
    this.myRules = _.cloneDeep(this.rules);
    this.myValues = _.cloneDeep(this.values);
    this.map = createMap(this.maxWidth, this.myValues);
  },
  mounted() {
    this.drawHexagon();
  }
};
</script>

<style scoped>
.app--value-input {
  text-align: center;
  width: 30px;
  transform: translateY(-15px);
}
</style>
