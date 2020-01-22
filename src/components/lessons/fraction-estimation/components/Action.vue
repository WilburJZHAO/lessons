<template>
  <div class="text-center">
    <button
      class="btn btn-outline-dark mb-2"
      style="width: 50%;"
      @click="handleNext"
      :disabled="status !== 2"
    >
      Next
    </button>
    <br />
    <button
      class="btn btn-outline-success mb-3"
      style="width: 50%;"
      @click="handleOk"
      :disabled="status !== 1"
    >
      OK
    </button>
  </div>
</template>

<script>
export default {
  props: ["status"],
  methods: {
    handleNext() {
      this.$emit("clickNext");
    },
    handleOk() {
      this.$emit("clickOk");
    }
  }
};
</script>

<style scoped></style>
