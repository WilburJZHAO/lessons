<template>
  <div class="app--container container mt-4 mb-5">
    <h3 class="lesson-subheading">Which animal is most likely?</h3>
    <hr class="subheading-separator">
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
    <div class="app--animals-table mt-3">
      <h5
        class="text-success text-center"
      >{{ trialNumber }} trials in total - {{ triedNumber }} tried</h5>
      <div class="app--animal-list">
        <div class="app--animal-item" v-for="(item, index) in allAnimals" :key="index">
          <h4>
            {{ item.animal }}
            <span class="badge badge-danger">{{ item.count }}</span>
          </h4>
        </div>
      </div>
    </div>
    <div class="text-center mt-4 mb-1">
      <div v-if="!isStart">
        <span class="badge badge-danger">Change the number of animals or</span>
      </div>
      <div v-if="isFinish">
        <span class="badge badge-danger">Finished</span>
      </div>
      <button
        v-if="demoAutoOption=='0' && !isFinish"
        class="btn btn-outline-success"
        @click="handleNextAnimal"
      >Make {{ isStart ? 'next' : 'first'}} animal</button>
      <button
        v-if="demoAutoOption=='1' && !isFinish"
        class="btn btn-outline-success"
        @click="handleToggle"
      >
        {{ !isStart ? "Start" :
        ( timer ? "Pause" : "Resume" ) }}
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
import { calculateTimerInterval } from "../../common/utils";
import {
  throwDiceOnce,
  generateAnimalsParts,
  generateCombinations,
  getAnimalsPart
} from "./utils";
export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  props: ["trialNumber"],
  data: function() {
    return {
      demoAutoOption: "0", // 0- demo, 1- auto
      numberOfAnimals: 2,
      triedNumber: 0,
      allAnimals: [],
      isStart: false,
      isFinish: false,
      timer: null
    };
  },
  computed: {
    animalsParts() {
      return generateAnimalsParts(this.numberOfAnimals);
    },
    combinations() {
      return generateCombinations(this.numberOfAnimals);
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    numberOfAnimals(value, prevValue) {
      if (value !== prevValue) {
        this.generateAnimals();
      }
    },
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
    generateAnimals() {
      // Generate all animals with different combinations
      this.allAnimals = [];
      for (let i = 0; i <= this.combinations.length - 1; i++) {
        let animal =
          this.animalsParts[0][this.combinations[i][0]] +
          this.animalsParts[1][this.combinations[i][1]] +
          this.animalsParts[2][this.combinations[i][2]];
        this.allAnimals.push({
          animal,
          count: 0
        });
      }
    },
    // getAnimalsPart() {
    // 	// Throw a dice and return a number that is corresponding to the animal part
    // 	let diceNumber;
    // 	if(this.numberOfAnimals === 2) {
    // 		diceNumber = throwDiceOnce();
    // 		if(diceNumber === 1 || diceNumber === 2 || diceNumber === 3) {
    // 			return 0;
    // 		}
    // 		if(diceNumber === 4 || diceNumber === 5 || diceNumber === 6) {
    // 			return 1;
    // 		}
    // 	} else if(this.numberOfAnimals === 3) {
    // 		diceNumber = throwDiceOnce();
    // 		if(diceNumber === 1 || diceNumber === 2) {
    // 			return 0;
    // 		}
    // 		if(diceNumber === 3 || diceNumber === 4 ) {
    // 			return 1;
    // 		}
    // 		if(diceNumber === 5 || diceNumber === 6 ) {
    // 			return 2;
    // 		}
    // 	} else {
    // 		return null;
    // 	}
    // },
    getAnimal(combinations) {
      // Based on the value in combination array, return the name of animal
      let head = this.animalsParts[0][combinations[0]];
      let body = this.animalsParts[1][combinations[1]];
      let leg = this.animalsParts[2][combinations[2]];
      let animal = head + body + leg;
      return animal;
    },
    handleToggle() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleNextAnimal, this.timerInterval);
      }
    },
    handleNextAnimal() {
      if (!this.isStart) this.isStart = true;
      let head = getAnimalsPart(throwDiceOnce(), this.numberOfAnimals);
      let body = getAnimalsPart(throwDiceOnce(), this.numberOfAnimals);
      let leg = getAnimalsPart(throwDiceOnce(), this.numberOfAnimals);
      let combinations = [head, body, leg];
      let animal = this.getAnimal(combinations);
      for (let i = 0; i < this.allAnimals.length; i++) {
        if (this.allAnimals[i].animal === animal) {
          this.allAnimals[i].count++;
        }
      }
      this.triedNumber++;
      if (this.triedNumber >= Number(this.trialNumber)) {
        this.isFinish = true;
        return;
      }
    },
    handleReset() {
      this.isFinish = false;
      this.isStart = false;
      this.triedNumber = 0;
      this.generateAnimals();
    }
  },
  created() {
    this.generateAnimals();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--animal-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1.5rem;
}
.app--animal-item {
  display: flex;
  justify-content: space-around;
}
</style>
