<template>
  <div v-if="!hasXRay" class="app--building-table-box">
    <div class="app--building-table">
      <div class="m-1" v-for="(oneBuilding, arrKey) in viewArray" :key="arrKey">
        <!-- one building -->
        <div v-if="oneBuilding.length===0" style="width: 40px;"></div>
        <div v-for="(block, buildingKey) in oneBuilding" :key="buildingKey">
          <app-number-block :number="block.number" :noDisplay="block.noDisplay"></app-number-block>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="app--building-table-box">
    <div class="app--building-table">
      <div class="m-1" v-for="(oneBuilding, arrKey) in viewArrayX" :key="arrKey">
        <!-- one building with x ray -->
        <div v-if="oneBuilding.length===0" style="width: 40px;"></div>
        <div v-for="(el, buildingKey) in oneBuilding" :key="buildingKey">
          <app-number-block
            :number="el ? el.number : null"
            :hidden="el ? el.hidden : null"
            :solid="el ? el.solid : null"
            :noDisplay="el.noDisplay"
            :hiddenNumber="el ? el.hiddenNumber : null"
            :noDisplayHiddenNumber="el ? el.noDisplayHiddenNumber : null"
            :hasXRay="hasXRay"
          ></app-number-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberBlock from "./NumberBlock.vue";
import {
  fillArrayWithZero,
  convertArrayRowToCol,
  convertArrayByRow,
  convertArrayByEl,
  makeViewArray,
  makeViewArrayX
} from "./utils";
export default {
  components: {
    appNumberBlock: NumberBlock
  },
  props: ["buildingArray", "viewDirection", "hasXRay"],
  computed: {
    viewArray() {
      if (!this.buildingArray || this.buildingArray.length === 0) {
        return [];
      }
      switch (this.viewDirection) {
        case 1: // Front
          return makeViewArray(
            convertArrayRowToCol(
              convertArrayByRow(fillArrayWithZero(this.buildingArray))
            )
          );
        case 2: // Back
          return makeViewArray(
            convertArrayByRow(
              convertArrayRowToCol(fillArrayWithZero(this.buildingArray))
            )
          );
        case 3: // Left
          return makeViewArray(fillArrayWithZero(this.buildingArray));
        case 4: // Right
          return makeViewArray(
            convertArrayByRow(
              convertArrayByEl(fillArrayWithZero(this.buildingArray))
            )
          );
        default:
          return [];
      }
      // const viewArrayToReturn  = new Array(this.buildingArray.length);
    },
    viewArrayX() {
      if (!this.buildingArray || this.buildingArray.length === 0) {
        return [];
      }
      switch (this.viewDirection) {
        case 1: // Front
          return makeViewArrayX(
            convertArrayRowToCol(
              convertArrayByRow(fillArrayWithZero(this.buildingArray))
            )
          );
        case 2: // Back
          return makeViewArrayX(
            convertArrayByRow(
              convertArrayRowToCol(fillArrayWithZero(this.buildingArray))
            )
          );
        case 3: // Left
          return makeViewArrayX(fillArrayWithZero(this.buildingArray));
        case 4: // Right
          return makeViewArrayX(
            convertArrayByRow(
              convertArrayByEl(fillArrayWithZero(this.buildingArray))
            )
          );
        default:
          return [];
      }
    }
  }
};
</script>

<style scoped>
.app--building-table-box {
  height: 100%;
}
.app--building-table {
  display: flex;
  align-items: flex-end;
  height: 100%;
}
</style>
