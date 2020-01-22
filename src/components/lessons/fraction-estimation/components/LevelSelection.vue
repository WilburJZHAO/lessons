<template>
  <div class="d-flex flex-column align-items-center">
    <h6>Level Selection</h6>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        v-model="level"
        id="level5"
        :value="5"
        @change="emitChangeLevel"
      />
      <label class="form-check-label" for="level5">{{ percentageType===1 ? '5%' : '0.05'}} level</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        v-model="level"
        id="level1"
        :value="1"
        @change="emitChangeLevel"
      />
      <label class="form-check-label" for="level1">{{ percentageType===1 ? '1%' : '0.01'}} level</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["percentageType"],
  data: function() {
    return {
      level: 1
    };
  },
  methods: {
    emitChangeLevel() {
      this.$emit("changeLevel", this.level);
    }
  }
};
</script>

<style scoped>
</style>