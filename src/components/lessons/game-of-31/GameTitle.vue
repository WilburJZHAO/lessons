<template>
  <div>
    <h6>The first to reach the target wins</h6>
    <h6>The target is {{ settings.target }}</h6>
    <h6>Playing with {{ settings.cards }} cards</h6>
  </div>
</template>

<script>
export default {
  props: ["settings"]
};
</script>

<style scoped>
</style>