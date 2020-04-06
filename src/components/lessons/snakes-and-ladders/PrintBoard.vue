<template>
  <div class="container mt-3">
    <h3 class="text-success text-center mb-3">Print the board</h3>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8 mb-3">
        <div
          v-if="!isPrinting"
          class="text-center text-success mb-3"
        >To print, press Control+P(Windows) or Command+P(Macintosh)</div>
        <app-board :boardSettings="boardSettings"></app-board>
      </div>
      <div class="col-2">
        <!-- <button v-if="!isPrinting" class="btn btn-outline-success" @click="handlePrint">Print</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
export default {
  props: ["boardSettings"],
  components: {
    appBoard: Board
  },
  data: function() {
    return {
      isPrinting: false
    };
  },
  methods: {
    handlePrint() {
      this.isPrinting = true;
      window.print();
    }
  },
  mounted() {
    window.addEventListener("beforeprint", () => {
      this.isPrinting = true;
    });
    window.addEventListener("afterprint", () => {
      this.isPrinting = false;
    });
  }
};
</script>

<style scoped>
</style>