<template>
  <div>
    <div class="text-center">
      <h3 style="transform: translateY(100%);">{{ fractionData.numerator }}</h3>
      <h3 class="text-center">____</h3>
      <h3 style="transform: translateY(-20%);">{{ fractionData.denominator }}</h3>
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