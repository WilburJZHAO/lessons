<template>
  <div>
    <div class="row">
      <div :class="tourStat ? 'col-md-9' : 'col-12'">
        <h5 class="text-center">
          <span class="text-capitalize">{{ strategy }}</span> strategy
        </h5>
        <p
          v-if="lookAhead && strategy!==STRATEGY.WF && strategy !==STRATEGY.BF"
          class="text-center"
        >Look ahead one move</p>
        <app-board :tour="tour" :showNextMove="showNextMove"></app-board>
        <div class="mb-3"></div>
        <div class="text-center" v-if="status !== 2 && !showingSolution">
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption==='0'"
            @click="handleNextMove"
          >{{ status === 0 ? 'First move' : 'Next move' }}</button>
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption==='1'"
            @click="handleToggleTimer"
          >{{ status === 0 ? 'Start' : timer ? 'Pause' : 'Resume'}}</button>
          <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
        </div>
        <div v-if="status===2 && !showingSolution">
          <div
            class="text-center text-danger"
          >{{ tour.status === TOUR_STATUS.CLOSED ? 'Solution found!' : `Game over. You got ${tour.step} moves.` }}</div>
          <div class="text-center">
            <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
          </div>
        </div>
      </div>
      <div class="col-md-3" v-if="tourStat">
        <app-tour-stat-total
          :trial="trial"
          :mean="mean"
          :reEntrants="reEntrants"
          :solutions="solutions.length"
          :showingSolution="showingSolution"
          :status="status"
          @showSolution="handleShowSolution"
        ></app-tour-stat-total>
      </div>
    </div>
  </div>
</template>

<script>
import { KnightTour, TOUR_STATUS, STRATEGY } from "./utils";
import Board from "./Board.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import TourStatTotal from "./TourStatTotal.vue";

export default {
  components: {
    appBoard: Board,
    appDemoAutoOption: DemoAutoOption,
    appTourStatTotal: TourStatTotal
  },
  props: ["selectedStrategy"],
  data: function() {
    return {
      TOUR_STATUS: null,
      STRATEGY: null,
      tour: null,
      strategy: null,
      lookAhead: null,
      demoAutoOption: "0",
      tourStat: null,
      timer: null,
      status: 0, // 0 - ready to start, 1 - running, 2 - finished
      trial: 0,
      total: 0,
      reEntrants: 0,
      solutions: [],
      showNextMove: true,
      showSolutionTimer: null,
      showingSolution: false
    };
  },
  computed: {
    mean() {
      if (this.trial === 0) {
        return 0;
      }
      return Number((this.total / this.trial).toFixed(2));
    }
  },
  watch: {
    "tour.status"(value) {
      if (value === TOUR_STATUS.OPEN || value === TOUR_STATUS.CLOSED) {
        // When a tour ends.
        this.status = 2;

        // Clear timer
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        if (this.showSolutionTimer) {
          clearInterval(this.showSolutionTimer);
          this.showSolutionTimer = null;
        }

        // If solutions is found
        if (value === TOUR_STATUS.CLOSED) {
          if (this.showingSolution) {
            this.showingSolution = false;
          } else {
            this.total += this.tour.step;
            this.trial++;
            this.solutions.push(this.tour.solutionStr);
            if (this.tour.isReEntrants) {
              this.reEntrants++;
            }
            this.tourStat = true;
          }
        }
      }
    },
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleNextMove() {
      if (this.status === 0) {
        this.status = 1;
      }
      this.tour.moveForward();
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleNextMove, 500);
      }
    },
    handleReset() {
      this.tour = new KnightTour(this.strategy, this.lookAhead);
      this.status = 0;
      this.showNextMove = true;
      this.showingSolution = false;
    },
    handleShowSolution(e) {
      this.showNextMove = false;
      this.status = 1;
      this.showingSolution = true;
      const solutionIndexToShow = e;
      const solution = this.solutions[solutionIndexToShow].split(",");
      this.tour = new KnightTour();

      this.showSolutionTimer = setInterval(() => {
        this.tour.moveForwardWithSolution(solution);
      }, 100);
      // console.log(this.solutions[solutionIndexToShow]);
    }
  },
  created() {
    this.strategy = this.selectedStrategy.selectedStrategy;
    this.lookAhead = this.selectedStrategy.lookAhead;
    this.tour = new KnightTour(this.strategy, this.lookAhead);
    // this.tour.getNextMove();
    this.TOUR_STATUS = TOUR_STATUS;
    this.STRATEGY = STRATEGY;
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.showSolutionTimer) {
      clearInterval(this.showSolutionTimer);
    }
  }
};
</script>

<style scoped>
</style>