<template>
  <div class="mx-2">
    <div class="text-center text-primary font-weight-bold">
      <div>{{ fractionData.up }}</div>
      <div style="border: 1px solid #007BFF;"></div>
      <div>{{ fractionData.down }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fractionData"]
};
</script>

<style scoped>
</style>