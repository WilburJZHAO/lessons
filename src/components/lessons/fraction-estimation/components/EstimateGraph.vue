<template>
  <div class="app--graph-container">
    <div class="app--graph d-flex align-items-end">
      <div class="d-flex align-items-end">
        <div v-for="(row, i) in estimateHistory" :key="'row'+i" class="app--row">
          <div v-for="(data, j) in row" :key="'data'+j">
            <img :src="data === 1 ? correctFaceSrc : wrongFaceSrc " class="app--image-face" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="app--data-graph d-flex">
      <div v-for="(data, k) in answerArr" :key="'answer'+k" class="mx-1">{{ data }}</div>
    </div>-->
  </div>
</template>

<script>
import correctFaceSrc from "@/assets/fraction-estimation/correct-face.jpg";
import wrongFaceSrc from "@/assets/fraction-estimation/wrong-face.jpg";
export default {
  props: ["estimateHistory", "answerArr"],
  data: function() {
    return {
      correctFaceSrc,
      wrongFaceSrc
    };
  }
};
</script>

<style scoped>
.app--graph-container {
  width: 100%;
}
.app--graph {
  width: 80%;
  margin: 0 auto;
  height: 200px;
  border-left: 1px solid blue;
  border-bottom: 1px solid blue;
}

.app--image-face {
  max-width: 100%;
  height: auto;
}
.app--data-graph {
  width: 80%;
  margin: 0 auto;
}
.app--row {
  margin-right: 3px;
}
</style>