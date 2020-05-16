<template>
  <div>
    <h5 class="text-center">{{ legify(trials) }} trials</h5>
    <div class="row">
      <div class="col-6" style="padding: 0;">
        <div class="text-center mb-2">Trial</div>
        <div class="text-center mb-2">Mean</div>
        <div class="text-center mb-2">Low</div>
        <div class="text-center mb-2">High</div>
      </div>
      <div class="col-6" style="padding: 0;">
        <div class="app--stat-box mb-2">{{ trial}}</div>
        <div class="app--stat-box mb-2">{{ mean ? legify(mean, 1) : '' }}</div>
        <div class="app--stat-box mb-2">{{low ? legify(low) : ''}}</div>
        <div class="app--stat-box mb-2">{{high ? legify(high) : ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { legify } from "../../common/utils";
export default {
  props: ["trials", "trial", "mean", "low", "high"],
  data: function() {
    return {
      legify
    };
  }
};
</script>

<style scoped>
.app--stat-box {
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  height: 26px;
}
</style>