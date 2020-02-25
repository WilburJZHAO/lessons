<template>
  <div
    class="app--proton-btn app--btn"
    data-type="p"
    :class="isDraggable ? 'app--btn-draggable' : ''"
  >P</div>
</template>

<script>
export default {
  props: ["isDraggable"]
};
</script>

<style scoped>
.app--proton-btn {
  width: 40px;
  height: 40px;
  background-color: red;
  color: yellow;
  border-radius: 50%;
  border: 1px solid #555;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
}
.app--btn-matched {
  opacity: 0.5;
}
</style>
