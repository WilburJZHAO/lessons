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
          @focus="message='Enter the group size (2-10,000)'"
          min="1"
          max="10000"
          step="1"
        />
      </div>
      <div class="d-flex">
        <label>Left Over</label>
        <input
          type="number"
          class="form-control"
          v-model.number="leftOverA"
          @focus="message='Enter the left over number (0-1,000)'"
          min="0"
          max="1000"
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
          @focus="message='Enter the group size (2-10,000)'"
          min="1"
          max="10000"
          step="1"
        />
      </div>
      <div class="d-flex">
        <label>Left Over</label>
        <input
          type="number"
          class="form-control"
          v-model.number="leftOverB"
          @focus="message='Enter the left over number (0-1,000)'"
          min="0"
          max="1000"
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
            @focus="message='Enter the group size (2-10,000)'"
            min="1"
            max="10000"
            step="1"
          />
        </div>
        <div class="d-flex">
          <label>Left Over</label>
          <input
            type="number"
            class="form-control"
            v-model.number="leftOverC"
            @focus="message='Enter the left over number (0-1,000)'"
            min="0"
            max="1000"
            step="1"
          />
        </div>
      </div>
    </div>
    <div class="text-center col-12 mt-3">
      <p class="text-center text-danger">{{ message }}</p>
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
      leftOverC: null,
      message: "Input a number: left over should be smaller than group size"
    };
  },
  computed: {
    isValidInput() {
      if (
        !(
          typeof this.groupSizeA === "number" &&
          typeof this.leftOverA === "number" &&
          this.groupSizeA >= 2 &&
          this.groupSizeA <= 10000 &&
          this.leftOverA >= 0 &&
          this.leftOverA <= 1000
        )
      ) {
        return false;
      }

      if (
        !(
          typeof this.groupSizeB === "number" &&
          typeof this.leftOverB === "number" &&
          this.groupSizeB >= 2 &&
          this.groupSizeB <= 10000 &&
          this.leftOverB >= 0 &&
          this.leftOverB <= 1000
        )
      ) {
        return false;
      }

      if (
        this.addC &&
        !(
          typeof this.groupSizeC === "number" &&
          typeof this.leftOverC === "number" &&
          this.groupSizeC >= 2 &&
          this.groupSizeC <= 10000 &&
          this.leftOverC >= 0 &&
          this.leftOverC < 1000
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