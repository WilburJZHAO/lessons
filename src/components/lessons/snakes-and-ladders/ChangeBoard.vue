<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Change the board</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-8 mb-3">
        <app-board :boardSettings="myBoardSettings" :draggable="true"></app-board>
      </div>
      <div class="col-md-4">
        <form @submit.prevent="handleChangeBoard">
          <div class="w-50 mb-2" style="margin: 0 auto;">
            <h5>Enter...</h5>
            <div class="mb-3">
              <label>Rows:</label>
              <input type="text" v-model.number="rows" class="form-control" />
            </div>
            <div>
              <label>Columns:</label>
              <input type="text" v-model.number="columns" class="form-control" />
            </div>
          </div>
          <p class="text-danger text-center">Enter a number between 5 and 10</p>
          <div class="text-center w-50 mb-4" style="margin: 0 auto;">
            <button
              class="btn btn-outline-success btn-block"
              type="submit"
              :disabled="!validInputs"
            >Save</button>
          </div>
        </form>
        <div class="text-center w-50" style="margin: 0 auto;">
          <button
            class="btn btn-outline-success btn-block"
            :disabled="boardSettings.snakes.length>=5"
            @click="handleAddSnake"
          >Add snake</button>
          <button
            class="btn btn-outline-dark btn-block"
            :disabled="boardSettings.snakes.length===0"
            @click="handleRemoveSnake"
          >Remove snake</button>
          <div class="mb-4"></div>
          <button
            class="btn btn-outline-danger btn-block"
            :disabled="boardSettings.ladders.length>=5"
            @click="handleAddLadder"
          >Add ladder</button>
          <button
            class="btn btn-outline-dark btn-block"
            :disabled="boardSettings.ladders.length===0"
            @click="handleRemoveLadder"
          >Remove ladder</button>
        </div>
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
      rows: null,
      columns: null,
      myBoardSettings: null
    };
  },
  computed: {
    usedNumbers() {
      // All numbers used by ladder or snake
      const used = [];
      this.boardSettings.snakes.forEach(item => {
        used.push(item.from);
        used.push(item.to);
      });
      this.boardSettings.ladders.forEach(item => {
        used.push(item.from);
        used.push(item.to);
      });
      return used;
    },
    validInputs() {
      if (
        this.rows < 5 ||
        this.rows > 10 ||
        this.columns < 5 ||
        this.columns > 10
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    getMax() {
      let max = this.boardSettings.columns * this.boardSettings.rows - 1;
      while (this.usedNumbers.indexOf(max) !== -1) {
        max--;
      }
      return max;
    },
    getMin() {
      let min = 1;
      while (this.usedNumbers.indexOf(min) !== -1) {
        min++;
      }
      return min;
    },
    handleAddSnake() {
      this.boardSettings.snakes.push({
        from: this.getMax(),
        to: this.getMin()
      });
    },
    handleRemoveSnake() {
      this.boardSettings.snakes.pop();
    },
    handleAddLadder() {
      this.boardSettings.ladders.push({
        from: this.getMin(),
        to: this.getMax()
      });
    },
    handleRemoveLadder() {
      this.boardSettings.ladders.pop();
    },
    handleChangeBoard(e) {
      if (!this.validInputs) {
        return;
      }
      this.boardSettings.rows = this.rows;
      this.boardSettings.columns = this.columns;
      this.$emit("changeBoardSettings", this.myBoardSettings);
    }
  },
  created() {
    this.rows = this.boardSettings.rows;
    this.columns = this.boardSettings.columns;
    this.myBoardSettings = this.boardSettings;
  }
};
</script>

<style scoped></style>
