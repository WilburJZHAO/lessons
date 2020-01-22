<template>
  <div>
    <h3 class="text-center">{{ fractionData.numerator }} / {{ fractionData.denominator }}</h3>
  </div>
</template>

<script>
export default {
  props: ["fractionData"]
};
</script>

<style scoped>
</style>