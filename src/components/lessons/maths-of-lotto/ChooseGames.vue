<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Choose other games</h3>
    <div class="mt-3">
      <div>
        <app-selection-panel
          :totalNumbers="settings.totalNumbers"
        ></app-selection-panel>
        <div class="mb-2"></div>
        <div class="app--range-container">
          <input
            type="range"
            class="custom-range"
            :min="totalRange[0]"
            :max="totalRange[1]"
            v-model.number="settings.totalNumbers"
            id="totalRange"
            @input="handleChangeTotal"
          />
        </div>
      </div>
      <div class="app--range-container">
        <app-drawn-panel
          :settings="settings"
          :drawnNumbers="[]"
        ></app-drawn-panel>
        <div class="mb-2"></div>
        <input
          type="range"
          class="custom-range"
          :min="drawRange[0]"
          :max="drawRange[1]"
          v-model.number="settings.numbersToDraw"
          id="drawRange"
        />
      </div>
      <div class="text-center mt-3">
        <p class="text-danger">Drag the slides to change the numbers</p>
        <button class="btn btn-outline-dark" @click="handleReset">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectionPanel from "./SelectionPanel.vue";
import DrawnPanel from "./DrawnPanel.vue";
export default {
  components: {
    appSelectionPanel: SelectionPanel,
    appDrawnPanel: DrawnPanel
  },
  props: ["settings"],
  computed: {
    totalRange() {
      return [this.settings.minTotalNumbers, this.settings.maxTotalNumbers];
    },
    drawRange() {
      return [
        this.settings.minNumbersToDraw,
        this.settings.totalNumbers >= 5 ? 4 : this.settings.totalNumbers - 1
      ];
    }
  },
  methods: {
    handleReset() {
      this.settings.numbersToDraw = 2;
      this.settings.totalNumbers = 6;
    },
    handleChangeTotal() {
      // console.log("change");
      if (this.settings.numbersToDraw >= this.settings.totalNumbers) {
        this.settings.numbersToDraw = this.settings.totalNumbers - 1;
      }
    }
  }
};
</script>

<style scoped>
.app--range-container {
  width: 70%;
  margin: 0 auto;
}
</style>
