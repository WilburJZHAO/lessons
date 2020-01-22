<template>
  <div>
    <div class="d-flex align-items-center justify-content-center" v-if="inputType===1">
      <div>
        <input
          type="number"
          class="form-control mr-2"
          v-model.number="numberInput"
          @change="emitInputNumber"
          style="max-width: 90px;"
        />
      </div>
      <h5 class="mx-2">/</h5>
      <h5>{{ fractionData.denominator}}</h5>
    </div>
    <div class="d-flex align-items-center justify-content-center" v-if="inputType===2">
      <h5>{{ fractionData.numerator}}</h5>
      <h5 class="mx-2">/</h5>
      <input
        type="number"
        class="form-control mr-2"
        v-model.number="numberInput"
        @change="emitInputNumber"
        style="max-width: 90px;"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputType", "fractionData", "status"],
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