<template>
  <div>
    <div
      class="d-flex justify-content-around"
      v-if="lottoNumbers && !totalNumbers"
    >
      <div
        v-for="(item, index) in lottoNumbers"
        :key="index"
        class="app--number-card flex-grow-1 mx-2 d-flex justify-content-center align-items-center"
        :class="{ 'app--number-card-selected': item.selected }"
        @click="handleClickNumber(item.number)"
      >
        {{ item.number }}
      </div>
    </div>

    <div
      class="d-flex justify-content-around"
      v-if="!lottoNumbers && totalNumbers"
    >
      <div
        v-for="num in totalNumbers"
        :key="num"
        class="app--number-card flex-grow-1 mx-1 d-flex justify-content-center align-items-center"
      >
        {{ num }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lottoNumbers", "totalNumbers"],
  methods: {
    handleClickNumber(number) {
      this.$emit("selectNumber", number);
    }
  }
};
</script>

<style scoped>
.app--number-card {
  border: 1px solid black;
  height: 70px;
  font-weight: bold;
  color: blue;
  cursor: pointer;
  font-size: 20px;
  max-width: 70px;
}
.app--number-card-selected {
  color: red;
}
</style>
