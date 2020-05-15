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
        <app-board :tour="tour" :showNextMove="false"></app-board>
        <div class="mb-3"></div>
      </div>
      <div class="col-md-3" v-if="tourStat">
        <app-tour-stat-total
          :trialNumber="trialNumber"
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
    <app-tour-stat-separate
      :trialNumber="trialNumber"
      :trial="trial"
      :solutions="solutions.length"
      :duplicates="duplicates"
    ></app-tour-stat-separate>
    <div v-if="status !==2 && !showingSolution" class="text-center">
      <button
        v-if="demoAutoOption==='0'"
        class="btn btn-outline-success"
        @click="handleNextGame"
      >{{ status === 0 ? 'Simulate first game' : 'Simulate next game' }}</button>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption==='1'"
        @click="handleToggleTimer"
      >{{ status === 0 ? 'Start' : timer ? 'Pause' : 'Resume'}}</button>
      <app-demo-auto-option
        @changeOption="demoAutoOption = $event"
        :option="demoAutoOption"
        class="mt-2"
      ></app-demo-auto-option>
    </div>
    <div v-if="status===2 && !showingSolution">
      <div class="text-center text-danger">Finished</div>
      <div class="text-center">
        <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { KnightTour, TOUR_STATUS, STRATEGY } from "./utils";
import { calculateTimerInterval } from "../../common/utils";
import Board from "./Board.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import TourStatTotal from "./TourStatTotal.vue";
import TourStatSeparate from "./TourStatSeparate.vue";

export default {
  components: {
    appBoard: Board,
    appDemoAutoOption: DemoAutoOption,
    appTourStatTotal: TourStatTotal,
    appTourStatSeparate: TourStatSeparate
  },
  props: ["selectedStrategy"],
  data: function() {
    return {
      TOUR_STATUS: null,
      STRATEGY: null,
      tour: null,
      strategy: null,
      trialNumber: 0,
      lookAhead: null,
      demoAutoOption: "0",
      timer: null,
      status: 0,
      tourStat: true,
      trial: 0, // How many trials are played
      total: 0, // Total steps in all games
      reEntrants: 0,
      solutions: [], // All solutions found
      showingSolution: false,
      showSolutionTimer: null,
      duplicates: 0  // How many duplicate solutions
    };
  },
  computed: {
    mean() {
      if (this.trial === 0) {
        return 0;
      }
      return Number((this.total / this.trial).toFixed(2));
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    status(value) {
      if (value === 2 && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    "tour.status"(value) {
      if (value === TOUR_STATUS.CLOSED) {
        if (this.showingSolution) {
          this.showingSolution = false;
        }
        if (this.showSolutionTimer) {
          clearInterval(this.showSolutionTimer);
          this.showSolutionTimer = null;
        }
      }
    }
  },
  methods: {
    handleNextGame() {
      if (this.status === 0) {
        this.status = 1;
      }
      this.tour = new KnightTour(this.strategy, this.lookAhead);
      while (this.tour.status === this.TOUR_STATUS.RUNNING) {
        this.tour.moveForward();
      }
      this.total += this.tour.step;
      this.trial++;

      if (this.tour.status === TOUR_STATUS.CLOSED) {
        if (this.solutions.indexOf(this.tour.solutionStr) >= 0) {
          // Check if it is a duplicate
          this.duplicates++;
        }
        else {
          // if solution is unique
          this.solutions.push(this.tour.solutionStr); // Record a solution
          if (this.tour.isReEntrants) {
            // Check if the solution is re-entrant
            this.reEntrants++;
          }
        }
      }
      this.tour = new KnightTour(this.strategy, this.lookAhead);
      if (this.trial >= this.trialNumber) {
        this.status = 2;
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleNextGame, this.timerInterval);
      }
    },
    handleReset() {
      this.status = 0;
      this.trial = 0;
      this.total = 0;
      this.reEntrants = 0;
      this.duplicates = 0;
      this.solutions = [];
      this.showingSolution = false;
      this.tour = new KnightTour();
    },
    handleShowSolution(e) {
      this.showingSolution = true;
      const solutionIndexToShow = e;
      const solution = this.solutions[solutionIndexToShow].split(",");
      this.tour = new KnightTour();
      this.showSolutionTimer = setInterval(() => {
        this.tour.moveForwardWithSolution(solution);
      }, 100);
    }
  },
  created() {
    this.TOUR_STATUS = TOUR_STATUS;
    this.STRATEGY = STRATEGY;
    this.strategy = this.selectedStrategy.selectedStrategy;
    this.lookAhead = this.selectedStrategy.lookAhead;
    this.trialNumber = this.selectedStrategy.trialNumber;
    this.tour = new KnightTour(this.strategy, this.lookAhead);
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