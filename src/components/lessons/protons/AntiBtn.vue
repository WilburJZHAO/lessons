<template>
  <div
    class="app--anti-btn app--btn"
    data-type="a"
    :class="isDraggable ? 'app--btn-draggable' : ''"
  >A</div>
</template>

<script>
export default {
  props: ["isDraggable"]
};
</script>

<style scoped>
.app--anti-btn {
  width: 40px;
  height: 40px;
  background-color: #0080ff;
  color: white;
  border-radius: 50%;
  border: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
}
.app--btn-matched {
  opacity: 0.5;
}
</style>
