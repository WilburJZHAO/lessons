<template>
  <div class="app--button-container">
    <div class="app--button">
      {{ number }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["number"]
};
</script>

<style scoped>
.app--button-container {
  border-radius: 50%;
  border: 1px solid orangered;
  background-color: yellow;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--button {
  color: orangered;
  font-weight: bold;
}
@media only screen and (max-width: 576px) {
  .app--button-container {
    width: 35px;
    height: 35px;
  }
}
@media only screen and (max-width: 476px) {
  .app--button-container {
    width: 25px;
    height: 25px;
  }
}
@media only screen and (max-width: 366px) {
  .app--button-container {
    width: 18px;
    height: 18px;
  }
}
</style>
