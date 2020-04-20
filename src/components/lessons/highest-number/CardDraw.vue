<template>
  <div>
    <h5 class="text-center">Card Draw</h5>
    <div>
      <div class="text-danger d-flex" style="height: 35px;">
        <div class="d-flex flex-grow-1 justify-content-end align-items-center pr-3">First</div>
        <div class="app--card-box">{{ usedNumbers[0] }}</div>
      </div>
      <div class="text-primary d-flex my-2" style="height: 35px;">
        <div class="d-flex flex-grow-1 justify-content-end align-items-center pr-3">Second</div>
        <div class="app--card-box">{{ usedNumbers[1] }}</div>
      </div>
      <div class="text-success d-flex" style="height: 35px;">
        <div class="d-flex flex-grow-1 justify-content-end align-items-center pr-3">Third</div>
        <div class="app--card-box">{{ usedNumbers[2] }}</div>
      </div>
    </div>
    <div class="d-flex mt-3" style="height: 35px;">
      <div class="app--card-box flex-grow-1">{{ numbersInPos[0] }}</div>
      <div class="app--card-box flex-grow-1 mx-1">{{ numbersInPos[1] }}</div>
      <div class="app--card-box flex-grow-1">{{ numbersInPos[2] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["usedNumbers", "numbersInPos"]
};
</script>

<style scoped>
.app--card-box {
  border: 1px solid #ccc;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>