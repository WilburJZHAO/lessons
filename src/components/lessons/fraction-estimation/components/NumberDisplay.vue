<template>
  <div>
    <h3 class="text-center" v-if="percentageType===1">{{ percentageData }}%</h3>
    <h3 class="text-center" v-if="percentageType===0">{{ percentageData / 100 }}</h3>
  </div>
</template>

<script>
export default {
  props: ["percentageData", "percentageType"]
};
</script>

<style scoped>
</style>