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
            <span style="position: absolute; left: 1px;">{{ row }}</span>
          </div>
          <div class="app--table-cell" v-for="col in indexArray" :key="col">
            <span
              style="position: absolute; font-weight: bold;"
              v-if="row+col===currentNumber || row+col===20-currentNumber || currentNumber===11"
              :class="{
                'app--color-0' : row+col===0 || row+col===20,
                'app--color-1' : row+col===1 || row+col===19,
                'app--color-2' : row+col===2 || row+col===18,
                'app--color-3' : row+col===3 || row+col===17,
                'app--color-4' : row+col===4 || row+col===16,
                'app--color-5' : row+col===5 || row+col===15,
                'app--color-6' : row+col===6 || row+col===14,
                'app--color-7' : row+col===7 || row+col===13,
                'app--color-8' : row+col===8 || row+col===12,
                'app--color-9' : row+col===9 || row+col===11,
                'app--color-10' : row+col===10,
              }"
            >{{row + col}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 pt-4">
        <div class="d-flex">
          <div class="flex-fill">
            <!-- Left column -->
            <div class="d-flex">
              <div
                class="flex-grow-1 app--color-cell"
                style="background-color: #808000"
                @click="() => {this.currentNumber = 0}"
              >
                <span style="position: absolute; color: White">once</span>
              </div>
              <div class="flex-grow-1 app--color-cell">
                <span class="app--color-number" v-if="currentNumber===0 || currentNumber===11">2</span>
              </div>
            </div>
            <div class="d-flex">
              <div
                class="flex-fill app--color-cell"
                style="background-color: #666666"
                @click="() => {this.currentNumber = 1}"
              >
                <span style="position: absolute; color: White">2x</span>
              </div>
              <div class="flex-fill app--color-cell">
                <span class="app--color-number" v-if="currentNumber===1 || currentNumber===11">4</span>
              </div>
            </div>
            <div class="d-flex">
              <div
                class="flex-fill app--color-cell"
                style="background-color: #00FF00"
                @click="() => {this.currentNumber = 2}"
              >
                <span style="position: absolute; color: White">3x</span>
              </div>
              <div class="flex-fill app--color-cell">
                <span class="app--color-number" v-if="currentNumber===2 || currentNumber===11">6</span>
              </div>
            </div>
            <div class="d-flex">
              <div
                class="flex-fill app--color-cell"
                style="background-color: #804000"
                @click="() => {this.currentNumber = 3}"
              >
                <span style="position: absolute; color: White">4x</span>
              </div>
              <div class="flex-fill app--color-cell">
                <span class="app--color-number" v-if="currentNumber===3 || currentNumber===11">8</span>
              </div>
            </div>
            <div class="d-flex">
              <div
                class="flex-fill app--color-cell"
                style="background-color: #0080FF"
                @click="() => {this.currentNumber = 4}"
              >
                <span style="position: absolute; color: White">5x</span>
              </div>
              <div class="flex-fill app--color-cell">
                <span class="app--color-number" v-if="currentNumber===4 || currentNumber===11">10</span>
              </div>
            </div>
          </div>
          <div class="flex-fill">
            <!-- Right column -->
            <div>
              <div class="d-flex">
                <div
                  class="flex-fill app--color-cell"
                  style="background-color: #FF0080"
                  @click="() => {this.currentNumber = 5}"
                >
                  <span style="position: absolute; color: White">6x</span>
                </div>
                <div class="flex-fill app--color-cell">
                  <span class="app--color-number" v-if="currentNumber===5 || currentNumber===11">12</span>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex">
                <div
                  class="flex-fill app--color-cell"
                  style="background-color: #007405"
                  @click="() => {this.currentNumber = 6}"
                >
                  <span style="position: absolute; color: White">7x</span>
                </div>
                <div class="flex-fill app--color-cell">
                  <span class="app--color-number" v-if="currentNumber===6 || currentNumber===11">14</span>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex">
                <div
                  class="flex-fill app--color-cell"
                  style="background-color: #B81513"
                  @click="() => {this.currentNumber =7}"
                >
                  <span style="position: absolute; color: White">8x</span>
                </div>
                <div class="flex-fill app--color-cell">
                  <span class="app--color-number" v-if="currentNumber===7 || currentNumber===11">16</span>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex">
                <div
                  class="flex-fill app--color-cell"
                  style="background-color: #EA8D1F"
                  @click="() => {this.currentNumber = 8}"
                >
                  <span style="position: absolute; color: White">9x</span>
                </div>
                <div class="flex-fill app--color-cell">
                  <span class="app--color-number" v-if="currentNumber===8 || currentNumber===11">18</span>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex">
                <div
                  class="flex-fill app--color-cell"
                  style="background-color: #001CC6"
                  @click="() => {this.currentNumber = 9}"
                >
                  <span style="position: absolute; color: White">10x</span>
                </div>
                <div class="flex-fill app--color-cell">
                  <span class="app--color-number" v-if="currentNumber===9 || currentNumber===11">20</span>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex">
                <div
                  class="flex-fill app--color-cell"
                  style="background-color: #000000"
                  @click="() => {this.currentNumber = 10}"
                >
                  <span style="position: absolute; color: White">11x</span>
                </div>
                <div class="flex-fill app--color-cell">
                  <span class="app--color-number" v-if="currentNumber===10 || currentNumber===11">11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <div
            class="flex-fill app--color-cell"
            style="background: #4ED5D7; position: relative;"
            @click="() => {this.currentNumber = 11}"
          >
            <span style="position: absolute; font-weight: 700">Any</span>
          </div>
          <div class="flex-fill app--color-cell">
            <span class="app--color-number" v-if="currentNumber===11">121</span>
          </div>
        </div>
      </div>
    </div>
    <p class="alert alert-danger mt-3 text-center">Click on a coloured rectangle</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      indexArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentNumber: null
    };
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

.app--color-0 {
  color: #808000;
}
.app--color-1 {
  color: #666666;
}
.app--color-2 {
  color: #00ff00;
}
.app--color-3 {
  color: #804000;
}
.app--color-4 {
  color: #0080ff;
}
.app--color-5 {
  color: #ff0080;
}
.app--color-6 {
  color: #007405;
}
.app--color-7 {
  color: #b81513;
}
.app--color-8 {
  color: #ea8d1f;
}
.app--color-9 {
  color: #001cc6;
}
.app--color-10 {
  color: #000000;
}
</style>
