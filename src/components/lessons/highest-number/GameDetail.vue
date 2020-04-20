<template>
  <div>
    <div v-for="index in 5" :key="index" class="row mb-2">
      <div class="col-7 text-center">Game {{ index }}</div>
      <div class="col-5 app--tally-box">{{ gamesTally[index-1] }}</div>
    </div>
    <div class="row">
      <div class="col-7 text-center">Total</div>
      <div class="col-5 app--tally-box">{{ total ? separateNumber(total) : '' }}</div>
    </div>
  </div>
</template>

<script>
import { separateNumber } from "../../common/utils";

export default {
  props: ["gamesTally"],
  data: function() {
    return {
      separateNumber
    };
  },
  computed: {
    total() {
      let totalNum = 0;
      if (!this.gamesTally[0]) {
        return null;
      }
      this.gamesTally.forEach(tally => {
        totalNum += tally;
      });
      return totalNum;
    }
  }
};
</script>

<style scoped>
.app--tally-box {
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  height: 26px;
}
</style>