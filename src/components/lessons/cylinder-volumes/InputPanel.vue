<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-8 col-xs-10">
        <h5 class="text-success mb-3">Enter the length and width of the paper</h5>
        <div class="d-flex align-items-center mb-3">
          <label class="mr-3">Length(cm)</label>
          <input
            type="text"
            class="form-control"
            v-model.number="length"
            @keypress="handleCheckInput"
          />
        </div>
        <div class="d-flex align-items-center mb-3">
          <label class="mr-3">Width(cm){{ ' '}}</label>
          <input
            type="text"
            class="form-control"
            v-model.number="width"
            @keypress="handleCheckInput"
          />
        </div>
        <div class="text-center">
          <button class="btn btn-outline-success" :disabled="!isValidInput" @click="handleOK">OK</button>
          <div class="mt-3 alert alert-danger" v-if="!isValidInput">Enter the paper size</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      width: null,
      length: null
    };
  },
  computed: {
    isValidInput() {
      if (this.length > 0 && this.width > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleCheckInput(e) {
      let { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57)) {
        e.preventDefault();
      }
    },
    handleOK() {
      this.$emit("setPaperSize", {
        width: this.width,
        length: this.length
      });
    }
  }
};
</script>

<style scoped>
</style>