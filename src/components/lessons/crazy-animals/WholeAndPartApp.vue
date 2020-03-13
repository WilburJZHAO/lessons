<template>
  <div class="container mt-4 mb-5">
    <h3 class="text-success text-center">Whole and part animals</h3>
    <div class="form-check form-check-inline d-flex justify-content-center">
      <input
        class="form-check-input"
        type="radio"
        name="numberOfAnimals"
        :value="2"
        v-model="numberOfAnimals"
        id="2-animals"
        :disabled="isStart"
      />
      <label for="2-animals" class="form-check-label mr-3">2 Animals</label>
      <input
        class="form-check-input"
        type="radio"
        name="numberOfAnimals"
        :value="3"
        v-model="numberOfAnimals"
        id="3-animals"
        :disabled="isStart"
      />
      <label for="3-animals" class="form-check-label">3 Animals</label>
    </div>
    <div class="app--animal-parts text-center mt-4">
      <h4 class="text text-success">Animal parts</h4>
      <table class="table" style="table-layout:fixed;">
        <tr>
          <th></th>
          <th>3</th>
          <th>2</th>
          <th>1</th>
          <th>0</th>
        </tr>
        <tr v-for="(item, index) in animalsPartsCounterDisplay" :key="index">
          <th>{{ item[0]}}</th>
          <td>{{ item[1][3] }}</td>
          <td>{{ item[1][2] }}</td>
          <td>{{ item[1][1] }}</td>
          <td>{{ item[1][0] }}</td>
        </tr>
      </table>
      <h5 class="text-center">{{ trialNumber }} with {{ numberOfAnimals }} animals</h5>
      <h5 class="text-center">{{ count }} so far</h5>
    </div>

    <div class="app--action text-center">
      <div>
        <span v-if="!isStart" class="badge badge-danger mb-1">Change the number of animals or</span>
        <span v-if="isFinish" class="badge badge-danger mb-1">Finished</span>
      </div>
      <button
        v-if="demoAutoOption=='0' & !isFinish"
        class="btn btn-outline-success"
        @click="handleNextAnimal"
      >Tap here for {{ isStart ? "next" : "first"}} animal</button>
      <button
        v-if="demoAutoOption == '1' && !isFinish"
        class="btn btn-outline-success"
        @click="handleToggleTimer"
      >
        {{ !isStart ? "Tap here to begin auto" :
        ( timer ? "Tap here to pause" : "Tap here to resume")
        }}
      </button>
      <button v-if="isFinish" class="btn btn-outline-dark" @click="handleReset">Reset</button>
    </div>
    <div class="text-center">
      <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "./DemoAutoOption.vue";
import { throwDiceOnce, getAnimalsPart } from "./utils";
import { calculateTimerInterval } from "../../common/utils";
export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  props: ["trialNumber"],
  data: function() {
    return {
      numberOfAnimals: 3,
      demoAutoOption: "0",
      count: 0,
      isStart: false,
      isFinish: false,
      timer: null,
      animalsPartsCounter: null
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    animalsPartsCounterDisplay() {
      if (this.numberOfAnimals === 2) {
        return [this.animalsPartsCounter[0], this.animalsPartsCounter[1]];
      } else {
        return this.animalsPartsCounter;
      }
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    isFinish(value) {
      if (value === true) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleNextAnimal() {
      if (!this.isStart) this.isStart = true;
      let head = getAnimalsPart(throwDiceOnce(), this.numberOfAnimals);
      let body = getAnimalsPart(throwDiceOnce(), this.numberOfAnimals);
      let leg = getAnimalsPart(throwDiceOnce(), this.numberOfAnimals);
      const animalParts = [head, body, leg];
      let giraffePart = 0;
      let horsePart = 0;
      let duckPart = 0;
      for (let i = 0; i < animalParts.length; i++) {
        // Calculate how many parts are from each animal.
        switch (animalParts[i]) {
          case 0:
            giraffePart++;
            break;
          case 1:
            horsePart++;
            break;
          case 2:
            duckPart++;
            break;
          default:
        }
      }
      this.animalsPartsCounter[0][1][giraffePart]++;
      this.animalsPartsCounter[1][1][horsePart]++;
      this.animalsPartsCounter[2][1][duckPart]++;
      this.animalsPartsCounter = [...this.animalsPartsCounter];
      // console.log([head, body, leg]);

      this.count++;
      if (this.count >= Number(this.trialNumber)) {
        this.isFinish = true;
        return;
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleNextAnimal, this.timerInterval);
      }
    },
    handleReset() {
      this.isStart = false;
      this.isFinish = false;
      this.count = 0;
      this.numberOfAnimals = 3;
      this.initAnimalsPartsCounter();
    },
    initAnimalsPartsCounter() {
      switch (this.numberOfAnimals) {
        case 2:
          this.animalsPartsCounter = [
            ["Giraffe", [0, 0, 0, 0]],
            ["Horse", [0, 0, 0, 0]]
          ];
          break;
        case 3:
          this.animalsPartsCounter = [
            ["Giraffe", [0, 0, 0, 0]],
            ["Horse", [0, 0, 0, 0]],
            ["Duck", [0, 0, 0, 0]]
          ];
          break;
        default:
          this.animalsPartsCounter = [];
      }
    }
  },
  created() {
    this.initAnimalsPartsCounter();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
</style>
