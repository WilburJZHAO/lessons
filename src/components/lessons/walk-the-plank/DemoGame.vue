<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-3">Demonstration game: Plank length five each way</h3>
    <app-game-table
      :plankLength="plankLength"
      :turns="turns"
      :numberOfGames="numberOfGames"
      :average="average"
    ></app-game-table>
    <div class="app--game-board mt-4">
      <div class="app--game-board-square font-weight-bold text-danger" ref="shark">
        Shark
        <app-arrow-left v-if="direction<0 && position===-1*plankLength-1"></app-arrow-left>
        <app-arrow-right v-if="direction>0 && position===-1*plankLength-1"></app-arrow-right>

        <div v-if="result===-1" style="position: absolute; bottom: -50%; left: 0;">
          <span class="badge badge-danger">Shark has gobbled you up</span>
        </div>
        <img
          :src="sharkSrc"
          alt="shark"
          :style="{height: sharkImageHeight +'px', width: 'auto'}"
          style="position: absolute; bottom: -140%;"
        >
      </div>
      <div
        v-for="i in plankLength"
        :key="`shark-${i}`"
        class="app--game-board-square"
        :ref="`shark${plankLength-i+1}`"
      >
        {{ plankLength-i+1 }}
        <app-arrow-left v-if="direction<0 && position===-1*(plankLength-i+1)"></app-arrow-left>
        <app-arrow-right v-if="direction>0 && position===-1*(plankLength-i+1)"></app-arrow-right>
      </div>
      <div class="app--game-board-square font-weight-bold text-primary" ref="middle">
        M
        <app-arrow-left v-if="direction<0 && position===0"></app-arrow-left>
        <app-arrow-right v-if="direction>0 && position===0"></app-arrow-right>
      </div>
      <div
        v-for="k in plankLength"
        :key="`boat-${k}`"
        class="app--game-board-square"
        :ref="`boat${k}`"
      >
        {{ k }}
        <app-arrow-left v-if="direction<0 && position===k"></app-arrow-left>
        <app-arrow-right v-if="direction>0 && position===k"></app-arrow-right>
      </div>
      <div class="app--game-board-square font-weight-bold text-danger" ref="boat">
        Boat
        <app-arrow-left v-if="direction<0 && position===plankLength+1"></app-arrow-left>
        <app-arrow-right v-if="direction>0 && position===plankLength+1"></app-arrow-right>
        <div
          class="badge badge-success"
          v-if="result===1"
          style="position: absolute; bottom: -50%;"
        >Safe on the boat</div>
      </div>
    </div>
    <div class="app--dice p-3">
      <div
        class="app--dice-direction alert alert-primary"
        v-if="direction!==null && step >= 1"
      >{{ direction > 0 ? "Boat" : "Shark" }}</div>
      <div
        class="app--dice-walk alert alert-danger"
        v-if="walk!==null && step >= 2"
      >{{ walk.direction > 0 ? "F" : "B"}}{{walk.steps}}</div>
    </div>
    <div class="app--action text-center">
      <button
        class="btn btn-outline-success"
        @click="handleRollDirection"
        v-if="step===0 && !result"
      >Roll dice for direction</button>
      <button
        class="btn btn-outline-success"
        @click="handleRollWalk"
        v-if="step===1 && !result"
      >Roll dice for the walk</button>
      <button
        class="btn btn-outline-success"
        @click="handleWalkPlank"
        :disabled="isWalking"
        v-if="step===2 && !result"
      >Walk the plank</button>
      <button
        class="btn btn-outline-success"
        @click="handleNextTurn"
        v-if="step===3 && !result"
      >Go to next turn</button>
      <button class="btn btn-outline-dark" @click="handleReset" v-if="result">Reset</button>
    </div>
  </div>
</template>

<script>
import GameTable from "./GameTable.vue";
import ArrowLeft from "./ArrowLeft.vue";
import ArrowRight from "./ArrowRight.vue";
import Plank from "./Plank";
import sharkSrc from "@/assets/shark.png";

export default {
  components: {
    appGameTable: GameTable,
    appArrowLeft: ArrowLeft,
    appArrowRight: ArrowRight
  },
  data: function() {
    return {
      sharkImageHeight: 0,
      sharkSrc,
      plankLength: 5,
      turns: 0,
      totalTurns: 0,
      numberOfGames: 1,
      plank: null,
      step: 0, // 0 - roll for direction, 1 - roll for walk, 2 - walk the plank, 3 - next turn
      direction: null,
      walk: null,
      isWalking: false,
      position: 0
    };
  },
  computed: {
    result() {
      if (this.position < -1 * this.plankLength) {
        return -1; // 'Shark has gobbbled you up'
      }
      if (this.position > this.plankLength) {
        return 1; // 'Safe on the boat'
      }
      return null;
    },
    average() {
      if (this.numberOfGames <= 1) {
        return 0;
      }
      return Number((this.totalTurns / (this.numberOfGames - 1)).toFixed(2));
    }
  },
  watch: {
    result(value) {
      if (value === -1) {
        let growTimer = setInterval(() => {
          this.sharkImageHeight++;

          if (this.sharkImageHeight >= 50) {
            let shrinkTimer = setInterval(() => {
              if (this.sharkImageHeight < 0) {
                clearInterval(shrinkTimer);
                clearInterval(growTimer);
              }
              this.sharkImageHeight--;
            }, 40);
          }
        }, 20);
      } else {
        this.sharkImageHeight = 0;
      }
    }
  },
  methods: {
    handleRollDirection() {
      this.plank.setDirection();
      this.direction = this.plank.getDirection();
      this.turns++;
      this.step++;
    },
    handleRollWalk() {
      this.plank.setWalk();
      this.walk = this.plank.getWalk();
      this.step++;
    },
    handleWalkPlank() {
      this.plank.setPosition();
      let newPosition = this.plank.getPosition();
      // console.log(newPosition, '  ', this.position);
      this.isWalking = true;
      if (newPosition > this.position) {
        let timer = setInterval(() => {
          this.position += 1;
          if (this.position >= newPosition) {
            clearInterval(timer);
            this.position = newPosition;
            this.isWalking = false;
            this.step++;
          }
        }, 500);
      } else {
        let timer = setInterval(() => {
          this.position -= 1;
          if (this.position <= newPosition) {
            clearInterval(timer);
            this.position = newPosition;
            this.isWalking = false;
            this.step++;
          }
        }, 500);
      }
    },
    handleNextTurn() {
      // this.plank = new Plank(this.plankLength);
      this.step = 0;
      // this.direction = null;
      // this.walk = null;
    },
    handleReset() {
      this.totalTurns += this.turns;
      this.numberOfGames++;
      this.plank = new Plank(this.plankLength);
      this.turns = 0;
      this.step = 0;
      this.direction = null;
      this.walk = null;
      this.isWalking = false;
      this.position = 0;
    }
  },
  created() {
    this.plank = new Plank(this.plankLength);
  }
};
</script>

<style scoped>
.app--game-board {
  display: flex;
  justify-content: center;
}
.app--game-board-square {
  border: 1px solid #000;
  height: 60px;
  width: 60px;
  position: relative;
}
.app--game-board-square {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--dice {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--dice-direction,
.app--dice-walk {
  height: 50px;
  width: 50px;
  border: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.5rem;
}
</style>
