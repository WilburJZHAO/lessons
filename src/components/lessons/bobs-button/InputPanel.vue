<template>
  <div class="row mt-4">
    <div class="col-md-4 mb-3">
      <div style="height: 30px;"></div>
      <div class="d-flex mb-3">
        <label>A's group-size</label>
        <input
          type="number"
          class="form-control"
          v-model.number="groupSizeA"
          min="1"
          max="9999"
          step="1"
        />
      </div>
      <div class="d-flex">
        <label>Left Over</label>
        <input
          type="number"
          class="form-control"
          v-model.number="leftOverA"
          min="0"
          :max="groupSizeA-1"
          step="1"
        />
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div style="height: 30px;"></div>
      <div class="d-flex mb-3">
        <label>B's group-size</label>
        <input
          type="number"
          class="form-control"
          v-model.number="groupSizeB"
          min="1"
          max="9999"
          step="1"
        />
      </div>
      <div class="d-flex">
        <label>Left Over</label>
        <input
          type="number"
          class="form-control"
          v-model.number="leftOverB"
          min="0"
          :max="groupSizeB-1"
          step="1"
        />
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="form-check" style="height: 30px;">
        <input type="checkbox" class="form-check-input" id="add-c" v-model="addC" />
        <label for="add-c" class="form-check-label">Add C</label>
      </div>
      <div :style="{visibility: addC ? 'visible': 'hidden'}">
        <div class="d-flex mb-3">
          <label>C's group-size</label>
          <input
            type="number"
            class="form-control"
            v-model.number="groupSizeC"
            min="1"
            max="9999"
            step="1"
          />
        </div>
        <div class="d-flex">
          <label>Left Over</label>
          <input
            type="number"
            class="form-control"
            v-model.number="leftOverC"
            min="0"
            :max="groupSizeC-1"
            step="1"
          />
        </div>
      </div>
    </div>
    <div class="text-center col-12 mt-3">
      <p class="text-center text-danger">Input a number: left over should be smaller than group size</p>
      <button class="btn btn-outline-success" @click="handleOK" :disabled="!isValidInput">OK</button>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      addC: false,
      groupSizeA: null,
      groupSizeB: null,
      groupSizeC: null,
      leftOverA: null,
      leftOverB: null,
      leftOverC: null
    };
  },
  computed: {
    isValidInput() {
      if (
        !(
          typeof this.groupSizeA === "number" &&
          typeof this.leftOverA === "number" &&
          this.groupSizeA >= 0 &&
          this.groupSizeA <= 99 &&
          this.leftOverA >= 0 &&
          this.leftOverA < this.groupSizeA
        )
      ) {
        return false;
      }

      if (
        !(
          typeof this.groupSizeB === "number" &&
          typeof this.leftOverB === "number" &&
          this.groupSizeB >= 0 &&
          this.groupSizeB <= 99 &&
          this.leftOverB >= 0 &&
          this.leftOverB < this.groupSizeB
        )
      ) {
        return false;
      }

      if (
        this.addC &&
        !(
          typeof this.groupSizeC === "number" &&
          typeof this.leftOverC === "number" &&
          this.groupSizeC >= 0 &&
          this.groupSizeC <= 99 &&
          this.leftOverC >= 0 &&
          this.leftOverC < this.groupSizeC
        )
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    handleOK() {
      this.$emit("setGroupsRule", {
        groupSizeA: this.groupSizeA,
        groupSizeB: this.groupSizeB,
        groupSizeC: this.groupSizeC,
        leftOverA: this.leftOverA,
        leftOverB: this.leftOverB,
        leftOverC: this.leftOverC
      });
    }
    // handleCheckInput(e) {
    //   console.log(e); // eslint-disable-line no-console
    //   console.log(e.target.value); // eslint-disable-line no-console
    //   if (e.target.value >= 999 || e.charCode === 45 || e.charCode === 101) {
    //     e.preventDefault();
    //   }
    // }
  }
};
</script>

<style scoped>
label {
  width: 170px;
}
</style>