<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play the game</h3>
    <hr class="subheading-separator" />
    <app-board
      :tour="tour"
      :showNextMove="true"
      @clickOnSquare="handleClickOnSquare"
    ></app-board>
    <div class="mb-2"></div>
    <div class="text-right" style="max-width: 400px; margin: 0 auto;">
      <button class="btn btn-outline-dark" @click="handleUndo">Undo</button>
    </div>
    <div class="mb-4"></div>
    <div class="text-center text-danger" v-if="status === TOUR_STATUS.RUNNING">
      Click on a blue square to move
    </div>
    <div v-if="status === TOUR_STATUS.OPEN">
      <div class="text-center text-danger">
        Game over. You got {{ tour.step }} moves
      </div>
      <div class="text-center">
        <button class="btn btn-outline-dark" @click="handleReset">
          Tap here to reset
        </button>
      </div>
    </div>
    <div v-if="status === TOUR_STATUS.CLOSED">
      <div class="text-center text-danger">Solution found</div>
      <div class="text-center">
        <button class="btn btn-outline-dark" @click="handleReset">
          Tap here to reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { KnightTour, TOUR_STATUS } from "./utils";
import Board from "./Board.vue";
export default {
  components: {
    appBoard: Board,
  },
  data: function() {
    return {
      tour: null,
      solutionsNum: 0,
      TOUR_STATUS: null,
    };
  },
  computed: {
    status() {
      if (this.tour) {
        return this.tour.getTourStatus();
      }
    },
  },
  watch: {
    status(value) {
      if (value === this.TOUR_STATUS.CLOSED) {
        this.solutionsNum++;
      }
    },
  },
  methods: {
    handleUndo() {
      this.tour.moveBack();
    },
    handleClickOnSquare(e) {
      const pStr = e;
      if (!this.tour.canMove(pStr)) return;
      this.tour.moveTo(pStr);
      this.tour.nextPos = this.tour.getNextMove();
    },
    handleReset() {
      this.tour = new KnightTour();
      // this.tour.getNextMove();
    },
  },
  created() {
    this.tour = new KnightTour();
    this.TOUR_STATUS = TOUR_STATUS;
    console.log(this.tour.currentPos);
    // this.tour.getNextMove();
    // console.log(this.tour.getNextMove(this.tour.currentPos));
  },
  mounted() {},
};
</script>

<style scoped></style>
