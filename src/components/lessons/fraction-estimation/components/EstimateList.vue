<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(data, index) in estimateArr" :key="index">
        {{ data }}
        <span v-if="percentageType===1">%</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["estimateArr", "percentageType"]
};
</script>

<style scoped>
</style>