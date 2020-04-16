<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">How often does each total occur?</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-9">
        <div class="app--table-line">
          <div class="app--table-title">&nbsp;</div>
          <div v-for="index in indexArray" :key="index" class="app--table-title">{{ index }}</div>
        </div>
        <div class="app--table-line" v-for="row in indexArray" :key="row">
          <div class="app--table-title">
            <span style="position:absolute; left: 5px;">{{row }}</span>
          </div>
          <div
            class="app--table-cell"
            v-for="col in indexArray"
            :key="col"
            :data-row="row"
            :data-col="col"
          >
            <span
              style="position: absolute; font-weight: bold"
              v-if="getOccur(row*col)===currentNumber || currentNumber === 100"
              :class="{
                'app--color-1': getOccur(row*col)===5 ,
                'app--color-2': getOccur(row*col)===44,
                'app--color-3': getOccur(row*col)===12,
                'app--color-4': getOccur(row*col)===20,
                'app--color-5': getOccur(row*col)===19,

              }"
            >{{ row*col }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 pt-4">
        <div class="d-flex">
          <div
            class="flex-grow-1 app--color-cell"
            style="background-color: #000"
            @click="currentNumber = 5"
          >
            <span style="position: absolute; color: White">once</span>
          </div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="currentNumber===5 || currentNumber===100">5</span>
          </div>
        </div>

        <div class="d-flex">
          <div
            class="flex-grow-1 app--color-cell"
            style="background-color: #007405"
            @click="currentNumber = 44"
          >
            <span style="position: absolute; color: White">twice</span>
          </div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="currentNumber===44 || currentNumber===100">44</span>
          </div>
        </div>

        <div class="d-flex">
          <div
            class="flex-grow-1 app--color-cell"
            style="background-color: #b81513"
            @click="currentNumber = 12"
          >
            <span style="position: absolute; color: White">3 times</span>
          </div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="currentNumber===12 || currentNumber===100">12</span>
          </div>
        </div>

        <div class="d-flex">
          <div
            class="flex-grow-1 app--color-cell"
            style="background-color: #ea8d1f"
            @click="currentNumber = 20"
          >
            <span style="position: absolute; color: White">4 times</span>
          </div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="currentNumber===20 || currentNumber===100">20</span>
          </div>
        </div>

        <div class="d-flex">
          <div
            class="flex-grow-1 app--color-cell"
            style="background-color: #001cc6"
            @click="currentNumber = 19"
          >
            <span style="position: absolute; color: White">5+ times</span>
          </div>
          <div class="flex-grow-1 app--color-cell">
            <span class="app--color-number" v-if="currentNumber===19 || currentNumber===100">19</span>
          </div>
        </div>

        <div class="d-flex">
          <div
            class="flex-fill app--color-cell"
            style="background-color: #4ed5d7; position: relative;"
            @click="currentNumber = 100"
          >
            <span style="position: absolute; font-weight: 700">Any</span>
          </div>
          <div class="flex-fill app--color-cell">
            <span class="app--color-number" v-if="currentNumber===100">100</span>
          </div>
        </div>
        <!-- <h5
          class="mt-4 app--color-3"
          v-if="number1!==null && number2!==null"
        >{{ number1 }} X {{ number2 }}</h5>-->
      </div>
    </div>
    <div class="alert alert-danger text-center mt-3">Click on a coloured rectangle</div>
  </div>
</template>

<script>
import { getOccur } from "./utils/utils";
export default {
  data: function() {
    return {
      indexArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      currentNumber: null,
      getOccur
      // number1: null,
      // number2: null
    };
  },
  methods: {
    // handleHint(el) {
    //   if (el.target.attributes["data-row"]) {
    //     this.number1 = Number(el.target.attributes["data-row"].value);
    //   }
    //   if (el.target.attributes["data-col"]) {
    //     this.number2 = Number(el.target.attributes["data-col"].value);
    //   }
    // }
  }
};
</script>

<style scoped>
.app--table-line {
  display: flex;
}
.app--table-title {
  width: 10%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--table-cell {
  width: 10%;
  background-color: #edffff;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.app--color-cell {
  border: 1px solid #000;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--color-number {
  position: absolute;
}

.app--color-1 {
  color: #000000;
}
.app--color-2 {
  color: #007405;
}
.app--color-3 {
  color: #b81513;
}
.app--color-4 {
  color: #ea8d1f;
}
.app--color-5 {
  color: #001cc6;
}
.app--color-6 {
  color: #4ed5d7;
}
</style>