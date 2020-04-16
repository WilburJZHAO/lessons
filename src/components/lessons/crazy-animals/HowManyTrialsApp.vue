<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6">
        <app-animal-picture :animalDrawn="animalDrawn"></app-animal-picture>
      </div>
      <div class="col-12 col-sm-6">
        <h4 class="text-danger">{{ selectedAnimalData.numberOfAnimals }} animals</h4>
        <h5 class="text-danger">Trials to make a {{ animalName }}</h5>
        <div class="app--stat">
          <table class="table" style="table-layout:fixed;">
            <tr class="text-center">
              <td class="table-danger">{{ legify(trialNumber) }}</td>
              <td class="table-primary">trials</td>
            </tr>
            <tr class="text-center">
              <td class="table-danger">
                <span v-if="isStart">{{ legify(count) }}</span>
              </td>
              <td class="table-primary">count</td>
            </tr>
            <tr class="text-center">
              <td class="table-danger">
                <span v-if="isStart">{{ matched }}</span>
              </td>
              <td class="table-primary">#matched</td>
            </tr>
            <tr class="text-center">
              <td class="table-danger">
                <span v-if="isStart">{{ matched ? soFar.toFixed(2) : '--' }}</span>
              </td>
              <td class="table-primary">{{demoAutoOption == '0' ? "so far" : "average"}}</td>
            </tr>
            <tr class="text-center">
              <td class="table-danger">
                <span v-if="minimum > 0">{{ minimum }}</span>
              </td>
              <td class="table-primary">minimum</td>
            </tr>
            <tr class="text-center">
              <td class="table-danger">
                <span v-if="maximum > 0">{{ maximum }}</span>
              </td>
              <td class="table-primary">maximum</td>
            </tr>
          </table>
        </div>
        <div class="app--action text-center">
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption==0 && !isFinish"
            @click="handleNextAnimal"
          >Make {{ isStart ? 'next' : 'first' }} animal</button>
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption==1 && !isFinish"
            @click="handleToggleTimer"
          >
            {{ !isStart ? "Start" :
            ( timer ? "Pause" : "Resume")
            }}
          </button>
          <button class="btn btn-outline-dark" v-if="isFinish" @click="handleReset">Reset</button>
        </div>
        <div class="text-center mt-1">
          <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "./DemoAutoOption.vue";
import AnimalPicture from "./AnimalPicture.vue";
import {
  // throwDice,
  generateAnimalsParts,
  getAnimalsPart,
  throwDiceOnce
} from "./utils";
import { calculateTimerInterval, legify } from "../../common/utils";

import duckBody from "@/assets/duck-body.jpg";
import duckHead from "@/assets/duck-head.jpg";
import duckLeg from "@/assets/duck-leg.jpg";
import giraffeBody from "@/assets/giraffe-body.jpg";
import giraffeHead from "@/assets/giraffe-head.jpg";
import giraffeLeg from "@/assets/giraffe-leg.jpg";
import horseBody from "@/assets/horse-body.jpg";
import horseHead from "@/assets/horse-head.jpg";
import horseLeg from "@/assets/horse-leg.jpg";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption,
    appAnimalPicture: AnimalPicture
  },
  props: ["trialNumber", "selectedAnimalData"],
  data: function() {
    return {
      animalDrawn: null,
      animalsParts: null,
      animalName: null,
      demoAutoOption: "0",
      isStart: false,
      isFinish: false,
      timer: null,
      count: 0, // How many animals are created
      lastMatchCount: 0, // The count of last time animal is matched
      matched: 0, // The count of matched animal
      matchHistory: [] // The count value when animal is matched
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    soFar() {
      if (this.matched > 0) {
        return Number((this.count / this.matched).toFixed(2));
      }
    },
    minimum() {
      if (this.matchHistory.length === 0) return 0;
      let min = this.matchHistory[0];
      for (let i = 0; i < this.matchHistory.length; i++) {
        if (this.matchHistory[i] < min) {
          min = this.matchHistory[i];
        }
      }
      return min;
    },
    maximum() {
      if (this.matchHistory.length === 0) return 0;
      let max = this.matchHistory[0];
      for (let i = 0; i < this.matchHistory.length; i++) {
        if (this.matchHistory[i] > max) {
          max = this.matchHistory[i];
        }
      }
      return max;
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
    legify,
    getAnimalDrawn() {
      const combinationArr = this.selectedAnimalData.selectedAnimal.split(",");
      const head = {
        name: this.animalsParts[0][Number(combinationArr[0])],
        src: ""
      };
      switch (head.name) {
        case "Gir":
          head.src = giraffeHead;
          break;
        case "H":
          head.src = horseHead;
          break;
        case "D":
          head.src = duckHead;
          break;
        default:
          break;
      }
      const body = {
        name: this.animalsParts[1][Number(combinationArr[1])],
        src: ""
      };
      switch (body.name) {
        case "a":
          body.src = giraffeBody;
          break;
        case "or":
          body.src = horseBody;
          break;
        case "u":
          body.src = duckBody;
          break;
        default:
          break;
      }
      const leg = {
        name: this.animalsParts[2][Number(combinationArr[2])],
        src: ""
      };
      switch (leg.name) {
        case "ffe":
          leg.src = giraffeLeg;
          break;
        case "se":
          leg.src = horseLeg;
          break;
        case "ck":
          leg.src = duckLeg;
          break;
        default:
          break;
      }
      this.animalDrawn = [head, body, leg];
      this.animalName = head.name + body.name + leg.name;
    },
    getAnimal(combinations) {
      let head = this.animalsParts[0][combinations[0]];
      let body = this.animalsParts[1][combinations[1]];
      let leg = this.animalsParts[2][combinations[2]];
      let animal = head + body + leg;
      return animal;
    },
    handleNextAnimal() {
      if (!this.isStart) this.isStart = true;
      this.count++;
      let head = getAnimalsPart(
        throwDiceOnce(),
        this.selectedAnimalData.numberOfAnimals
      );
      let body = getAnimalsPart(
        throwDiceOnce(),
        this.selectedAnimalData.numberOfAnimals
      );
      let leg = getAnimalsPart(
        throwDiceOnce(),
        this.selectedAnimalData.numberOfAnimals
      );
      let combinations = [head, body, leg];
      let animal = this.getAnimal(combinations);
      if (animal === this.animalName) {
        this.matched++;
        this.matchHistory.push(this.count - this.lastMatchCount);
        this.lastMatchCount = this.count;
      }
      // console.log(animal);
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
      this.matched = 0;
      this.matchHistory = [];
    }
  },
  created() {
    this.animalsParts = generateAnimalsParts(
      this.selectedAnimalData.numberOfAnimals
    );
    this.getAnimalDrawn();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
</style>
