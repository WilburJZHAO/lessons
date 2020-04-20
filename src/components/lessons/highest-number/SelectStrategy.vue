<template>
  <div style="position: relative; width: 170px;">
    <div
      @click="handleToggleShow"
      style="cursor: pointer; background-color: pink;"
      class="font-weight-bold px-4 py-1"
    >Strategy</div>
    <div v-if="showStrategy" class="app--select-box" style="position: absolute;">
      <div class="form-check" v-for="(strategy, index) in strategies" :key="`s${index}`">
        <input
          type="radio"
          class="form-check-input"
          v-model.number="selectedStrategyId"
          :id="`strategy${strategy.id}`"
          :value="strategy.id"
          @change="handleSelectStrategy"
          @click="showStrategy = false"
        />
        <label :for="`strategy${strategy.id}`" class="form-check-label">
          {{
          strategy.name
          }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["strategies", "disabled"],
  data: function() {
    return {
      showStrategy: false,
      selectedStrategyId: 1
    };
  },
  methods: {
    handleSelectStrategy() {
      this.$emit("selectStrategy", this.selectedStrategyId);
    },
    handleToggleShow() {
      if (this.disabled) {
        this.showStrategy = false;
        return;
      }
      this.showStrategy = !this.showStrategy;
    }
  }
};
</script>

<style scoped>
.app--select-box {
  border: 1px solid #ccc;
  padding-left: 5px;
  width: 100%;
  background-color: #fff;
}
</style>
