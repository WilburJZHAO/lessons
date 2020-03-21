<template>
  <div class="text-center">
    <h5>Strategy {{strategy.index}}</h5>
    <div class="mb-3">
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          v-model="strategy.type"
          :id="`${strategy.index}rolls`"
          value="rolls"
        />
        <label class="form-check-label" :for="`${strategy.index}rolls`">Rolls</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          v-model="strategy.type"
          :id="`${strategy.index}points`"
          value="points"
        />
        <label class="form-check-label" :for="`${strategy.index}points`">Points</label>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <div>
        <input
          type="text"
          v-model.number="strategy.value"
          class="form-control"
          @keypress="handleInputCheck"
        />
      </div>
      <div class="text-capitalize mx-3">{{ strategy.type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["strategy"],
  data: function() {
    return {};
  },
  methods: {
    handleInputCheck(e) {
      let { charCode } = e;
      if (!((charCode >= 48 && charCode <= 57) || charCode === 44)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 2) {
        e.preventDefault();
      }
    }
  }
};
</script>

<style scoped>
</style>