<template>
  <div class="app--graph-container">
    <div class="app--graph d-flex align-items-end">
      <div v-for="(num, index) in graphData" :key="index" :style="{width: 1/27*100+'%' }">
        <div>
          <div
            class="app--graph-prev-bar d-flex align-items-end"
            v-if="prevGraphData[index]"
            :style="{ height: prevGraphData[index] *heightUnit + 'px'}"
          >
            <div
              class="flex-fill"
              v-if="num"
              style="background-color: red;"
              :style="{ height: num * heightUnit + 'px'}"
            ></div>
          </div>
          <div
            class="app--graph-bar"
            v-if="num && !prevGraphData[index]"
            :style="{ height: num * heightUnit + 'px'}"
          ></div>
        </div>
        <div class="app--line"></div>
        <div style="font-size: 12px;" class="d-flex justify-content-center">{{ index+start }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["graphData", "prevGraphData", "trialNumber"],
  data: function() {
    return {
      start: 6
    };
  },
  computed: {
    heightUnit() {
      let unit = 1;
      if (this.trialNumber < 100) {
        unit = 5;
      } else if (this.trialNumber < 1000) {
        unit = 3;
      } else if (this.trialNumber < 5000) {
        unit = 0.6;
      } else {
        unit = 0.3;
      }
      return unit;
    }
  }
};
</script>

<style scoped>
.app--graph-container {
  overflow: auto;
  height: 100%;
}
.app--graph {
  height: 100%;
  border: 1px solid #000;
}
.app--graph-bar {
  background-color: red;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}
.app--graph-prev-bar {
  background-color: #7fff7f;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}
.app--line {
  border-bottom: 1px solid blue;
}
</style>