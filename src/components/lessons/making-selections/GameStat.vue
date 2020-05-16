<template>
  <div class="row">
    <div class="col-6">
      <div v-if="trialNumber">{{ legify(trialNumber) }} trials</div>
      <div class="app--box text-center" style="width: 100px;">
        <span :style="{visibility: game ? 'visible' : 'hidden'}">{{ legify(game) }}</span>
      </div>
      game{{ game === 1 ? '' : 's' }} played
    </div>
    <div class="col-6">
      <div class="d-flex">
        <span class="app--fix-width text-right pr-2">Wins</span>
        <div class="app--box text-primary app--fix-width text-center">
          <span :style="{visibility: game ? 'visible' : 'hidden'}">
            {{
            legify(win)
            }}
          </span>
        </div>
        <div class="text-primary app--fix-width text-center">
          <span :style="{visibility: game ? 'visible' : 'hidden'}">{{ winPercent.toFixed(2) }}%</span>
        </div>
      </div>
      <div class="mb-2"></div>
      <div class="d-flex">
        <span class="app--fix-width text-right pr-2">Losses</span>
        <div class="app--box text-danger app--fix-width text-center">
          <span :style="{visibility: game ? 'visible' : 'hidden'}">
            {{
            legify(lose)
            }}
          </span>
        </div>
        <div class="text-danger app--fix-width text-center">
          <span :style="{visibility: game ? 'visible' : 'hidden'}">{{ losePercent.toFixed(2) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { legify } from "../../common/utils";
export default {
  props: ["trialNumber", "win", "lose", "game"],
  computed: {
    winPercent() {
      if (!this.game) {
        return 0;
      }
      return Number(((this.win / this.game) * 100).toFixed(2));
    },
    losePercent() {
      if (!this.game) {
        return 0;
      }
      return Number(((this.lose / this.game) * 100).toFixed(2));
    }
  },
  methods: {legify}
};
</script>

<style scoped>
.app--box {
  border: 1px solid #333;
}
.app--fix-width {
  width: 30%;
  display: inline-block;
}
</style>