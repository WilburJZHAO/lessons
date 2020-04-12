<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Several games slow: Plank length five each way</h3>
    <hr class="subheading-separator">
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
        <div
          class="badge badge-danger"
          v-if="result===-1"
          style="position: absolute; bottom: -50%; left: 0;"
        >Shark has gobbbled you up</div>
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
    <div class="app--dice">
      <div
        class="app--dice-direction alert alert-primary"
        v-if="direction!==null && step >= 1"
      >{{ direction > 0 ? "Boat" : "Shark" }}</div>
      <div
        class="app--dice-walk alert alert-danger"
        v-if="walk!==null && step >= 2"
      >{{ walk.direction > 0 ? "F" : "B"}}{{walk.steps}}</div>
    </div>
    <div class="app--action text-center" v-if="demoAutoOption=='0'">
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
      >Next turn</button>
      <button class="btn btn-outline-dark" @click="handleReset" v-if="step===4">Reset</button>
    </div>
    <div class="app--action text-center" v-if="demoAutoOption=='1'">
      <button class="btn btn-outline-success" @click="handleToggleTimer">
        {{ !isStart ? "Tap here to begin" :
        ( timer ? "Tap here to pause" : "Tap here to resume") }}
      </button>
    </div>
    <div class="text-center mt-1 mb-3">
      <app-demo-auto-option :option="demoAutoOption" @changeOption="demoAutoOption=$event"></app-demo-auto-option>
    </div>
    <app-game-frequency-graph :frequency="frequency" :moves="moves" :unit="6"></app-game-frequency-graph>
  </div>
</template>

<script>
import GameTable from "./GameTable.vue";
import ArrowLeft from "./ArrowLeft.vue";
import ArrowRight from "./ArrowRight.vue";
import GameFrequencyGraph from "./GameFrequencyGraph.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import Plank from "./Plank";

export default {
  components: {
    appGameTable: GameTable,
    appGameFrequencyGraph: GameFrequencyGraph,
    appArrowLeft: ArrowLeft,
    appArrowRight: ArrowRight,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      plankLength: 5,
      turns: 0,
      totalTurns: 0,
      numberOfGames: 1,
      plank: null,
      step: 0,
      direction: null,
      walk: null,
      isWalking: false,
      position: 0,
      demoAutoOption: "1",
      isStart: false,
      frequency: Array(20),
      moves: Array(20),
      // frequency: An array to mark the frequency of how many moves are made
      timer: null
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
      if (value) {
        // console.log(this.turns);
        this.step = 4; // If step equals 4, a game is end
        if (this.turns > 19) {
          this.frequency[19] += 1;
        } else {
          this.frequency[this.turns - 1] += 1;
        }
        this.frequency = [...this.frequency];
      }
    },
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
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
        }, 150);
      } else {
        let timer = setInterval(() => {
          this.position -= 1;
          if (this.position <= newPosition) {
            clearInterval(timer);
            this.position = newPosition;
            this.isWalking = false;
            this.step++;
          }
        }, 150);
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
    },
    playOneGame() {
      switch (this.step) {
        case 0:
          this.handleRollDirection();
          break;
        case 1:
          this.handleRollWalk();
          break;
        case 2:
          this.handleWalkPlank();
          break;
        case 3:
          this.handleNextTurn();
          break;
        case 4:
          this.handleReset();
          break;
        default:
          return;
      }
    },
    handleToggleTimer() {
      if (!this.isStart) this.isStart = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.playOneGame, 550);
      }
    }
  },
  created() {
    this.plank = new Plank(this.plankLength);
    for (let i = 0; i < this.frequency.length; i++) {
      this.frequency[i] = 0;
    }
    for (let j = 0; j < this.moves.length; j++) {
      this.moves[j] = j + 1;
    }
    this.moves[this.moves.length - 1] = ">";
  },
  destroyed() {
    clearInterval(this.timer);
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
  min-height: 100px;
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
