<template>
  <div>
    <h4 class="text-primary text-center">Score</h4>
    <div class="d-flex justify-content-center">
      <div class="mx-4">
        <h6 class="text-center">Me</h6>
        <div class="text-center" :style="{visibility: meWins===0? 'hidden' :'visible'}">{{ meWins }}</div>
      </div>
      <div class="mx-4">
        <h6 class="text-center">Computer</h6>
        <div
          class="text-center"
          :style="{visibility: computerWins===0 ? 'hidden' : 'visible'}"
        >{{ computerWins }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["meWins", "computerWins"]
};
</script>

<style scoped></style>
