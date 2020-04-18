<template>
  <div class="mt-3">
    <h6 class="text-center" v-if="status === 0 || status === 1">
      Draw {{ settings.numbersToDraw }} numbers from
      {{ settings.totalNumbers }} numbers
    </h6>
    <div class="d-flex justify-content-center">
      <div
        v-for="num in settings.numbersToDraw"
        :key="num"
        class="app--drawn-number mx-2 d-flex justify-content-center align-items-center"
        style="font-size: 2rem"
      >{{ drawnNumbers[num - 1] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["drawnNumbers", "settings", "status"]
};
</script>

<style scoped>
.app--drawn-number {
  border: 1px solid black;
  height: 80px;
  width: 80px;
  font-size: 24px;
  background-color: #fbfe93;
}
</style>
