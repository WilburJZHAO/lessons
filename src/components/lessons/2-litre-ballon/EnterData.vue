<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Enter diameter, radius, circumference or volume</h3>
    <hr class="subheading-separator">
    <div class="app--container">
      <div class="form-group row">
        <label for="diameter" class="col-sm-3 col-form-label">Diameter (cm)</label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control"
            id="diamter"
            v-model.number="inputD"
            @focus="() => { this.handleInput('D') }"
            autofocus
          >
        </div>
      </div>

      <div class="form-group row">
        <label for="radius" class="col-sm-3 col-form-label">Radius (cm)</label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control"
            id="radius"
            v-model.number="inputR"
            @focus="() => { this.handleInput('R') }"
          >
        </div>
      </div>

      <div class="form-group row">
        <label for="circumference" class="col-sm-3 col-form-label">Circumference (cm)</label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control"
            id="circumference"
            v-model.number="inputC"
            @focus="() => { this.handleInput('C') }"
          >
        </div>
      </div>

      <div class="form-group row">
        <label for="volume" class="col-sm-3 col-form-label">Volume (L)</label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control"
            id="volume"
            v-model.number="inputV"
            @focus="() => { this.handleInput('V') }"
          >
        </div>
      </div>

      <div class="text-center alert alert-danger">
        <span v-if="unit==='C'">Enter the circumference</span>
        <span v-else-if="unit==='R'">Enter the radius</span>
        <span v-else-if="unit==='V'">Enter the volume</span>
        <span v-else>Enter the diameter</span>
      </div>
      <div class="text-center">
        <button class="btn btn-outline-success" @click="handleCalculate">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import Ballon from "./Ballon";
export default {
  data: function() {
    return {
      unit: null,
      inputR: null,
      inputD: null,
      inputC: null,
      inputV: null
    };
  },

  methods: {
    handleInput(unit) {
      // console.log(unit);
      this.unit = unit;
      this.inputR = null;
      this.inputD = null;
      this.inputC = null;
      this.inputV = null;
    },
    handleCalculate() {
      let ballon;
      switch (this.unit) {
        case "D":
          ballon = new Ballon(this.unit, this.inputD);
          this.inputR = ballon.radius;
          this.inputC = ballon.circumference;
          this.inputV = ballon.volume;
          break;
        case "R":
          ballon = new Ballon(this.unit, this.inputR);
          this.inputD = ballon.diameter;
          this.inputC = ballon.circumference;
          this.inputV = ballon.volume;
          break;
        case "C":
          ballon = new Ballon(this.unit, this.inputC);
          this.inputD = ballon.diameter;
          this.inputR = ballon.radius;
          this.inputV = ballon.volume;
          break;
        case "V":
          ballon = new Ballon(this.unit, this.inputV);
          this.inputD = ballon.diameter;
          this.inputR = ballon.radius;
          this.inputC = ballon.circumference;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.app--container {
  max-width: 650px;
  margin: 0 auto;
}
</style>
