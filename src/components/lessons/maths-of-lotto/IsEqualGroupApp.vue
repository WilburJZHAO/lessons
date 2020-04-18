<template>
  <div class="container mt-3">
    <h5
      class="text-center"
    >Draw {{ settings.numbersToDraw }} numbers from {{ settings.totalNumbers }} numbers</h5>
    <p class="text-center" v-if="triedNumber===0">Play {{ legify(trialNumber) }} games</p>
    <p class="text-center" v-else>Played {{ legify(triedNumber) }} of {{ legify(trialNumber) }} games</p>

    <div style="width: 80%; margin: 0 auto; height: auto; max-height: 500px; overflow-y: scroll;">
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th>Numbers</th>
            <th>Wins</th>
            <th>%Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, index) in cmbArr" :key="index">
            <td>{{el.cmb.join(', ')}}</td>
            <td>
              <span v-if="el.win>0">{{ legify(el.win) }}</span>
            </td>
            <td>
              <span v-if="el.win>0">{{ ((el.win / triedNumber)*100).toFixed(1) }} %</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-3"></div>
    <div class="text-center" v-if="status===0 || status===1">
      <button
        class="btn btn-outline-success mb-2"
        @click="handlePlayOneGame"
        v-if="demoAutoOption==0"
      >Play a game</button>
      <button
        class="btn btn-outline-success mb-2"
        @click="handleToggleTimer"
        v-if="demoAutoOption==1"
      >{{ status=== 1 ? (timer ? "Pause" : "Resume" ) : 'Start' }}</button>

      <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
    </div>
    <div class="text-center" v-if="status===2">
      <div class="text-danger">Finished</div>
      <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
    </div>
  </div>
</template>

<script>
import Combinatorics from "js-combinatorics";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { pickNumber, calculateTimerInterval, legify } from "../../common/utils.js";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  props: ["settings", "trialNumber"],
  data: function() {
    return {
      triedNumber: 0,
      cmbArr: [],
      status: 0,
      // 0 - ready to start
      // 1 - running
      // 2 - finish
      timer: null,
      demoAutoOption: "0",
      numbersToDraw: []
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if (value === 2) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    legify,
    setNumbersToDraw(total) {
      const numbersToDraw = [];
      for (let i = 1; i <= total; i++) {
        numbersToDraw.push(i);
      }
      return numbersToDraw;
    },
    initNumbersToDraw() {
      this.numbersToDraw = this.setNumbersToDraw(this.settings.totalNumbers);
    },
    initCombination() {
      // const total = this.settings.totalNumbers;
      const numsArr = this.setNumbersToDraw(this.settings.totalNumbers);
      const cmb = Combinatorics.combination(
        numsArr,
        this.settings.numbersToDraw
      );
      let el;
      this.cmbArr = [];
      while ((el = cmb.next())) {
        this.cmbArr.push({
          cmb: el,
          win: 0
        });
      } // Create the combination array
      // console.log(this.cmbArr);
    },
    handleReset() {
      this.triedNumber = 0;
      this.status = 0;
      this.initCombination();
      this.initNumbersToDraw();
      this.demoAutoOption = "0";
    },
    handlePlayOneGame() {
      if (this.status === 0) {
        this.status = 1;
      }
      let drawn = 0;
      const drawnNumbers = [];
      this.initNumbersToDraw();
      // Draw numbers
      while (drawn < this.settings.numbersToDraw) {
        let pickedNumber = this.numbersToDraw[
          pickNumber(0, this.numbersToDraw.length - 1)
        ];
        this.numbersToDraw = this.numbersToDraw.filter(
          num => num !== pickedNumber
        );
        drawnNumbers.push(pickedNumber);
        drawn++;
      }
      // Check win
      const winIndex = this.cmbArr.findIndex(el => {
        const { cmb } = el;
        for (let i = 0; i < drawnNumbers.length; i++) {
          if (cmb.indexOf(drawnNumbers[i]) === -1) {
            return false;
          }
        }
        return true;
      });
      this.cmbArr[winIndex].win++;

      // console.log(drawnNumbers);
      this.triedNumber++;
      if (this.triedNumber >= this.trialNumber) {
        this.status = 2;
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlayOneGame, this.timerInterval);
      }
    }
  },
  created() {
    this.initNumbersToDraw();
    this.initCombination();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
.table thead th {
  padding-top: 7px;
  padding-bottom: 7px;

}
.table tbody td {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>