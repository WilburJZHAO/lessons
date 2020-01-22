<template>
  <div>
    <div class="d-flex align-items-center justify-content-center">
      <input
        type="number"
        class="form-control mr-2"
        v-model.number="numberInput"
        @change="emitInputNumber"
      />
      <h5 v-if="numberType===1">%</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: ["numberType", "status"],
  data: function() {
    return {
      numberInput: null
    };
  },
  watch: {
    status(value, oldValue) {
      if (value === 1 && oldValue === 2) {
        this.numberInput = null;
      }
    }
  },
  methods: {
    emitInputNumber() {
      this.$emit("numberInput", this.numberInput);
    }
  }
};
</script>

<style scoped>
</style>