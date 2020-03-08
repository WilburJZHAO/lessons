<template>
  <div class="container mt-3">
    <!-- <h3 class="text-success text-center mb-4">multiple {{trialNumber}}</h3> -->
    <app-selection-panel :lottoNumbers="lottoNumbers" @selectNumber="handleSelectNumber"></app-selection-panel>
    <h6 class="text-center mt-3" v-if="status===0 || status===1 ">Play {{ trialNumber }} games</h6>
    <h6 class="text-center mt-3" v-else>Played {{ triedGames }} of {{ trialNumber }} games</h6>

    <app-drawn-panel :drawnNumbers="drawnNumbers" :settings="settings" :status="status"></app-drawn-panel>

    <div class="mb-4"></div>
    <div
      v-if="status === 0"
      class="text-danger text-center"
    >Click on tiles to select {{ settings.numbersToDraw }} lotto numbers</div>
    <div v-if="status===1 || status===2" class="text-center">
      <button
        class="btn btn-outline-success"
        @click="handlePlayOneGame"
        v-if="demoAutoOption==0"
      >Tap here to play a game</button>
      <button
        class="btn btn-outline-success"
        @click="handleToggleTimer"
        v-if="demoAutoOption==1"
      >{{ status=== 2 ? (timer ? "Tap here to pause" : "Tap here to resume" ) : 'Tap here to begin' }}</button>
      <div class="mb-2"></div>
      <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
    </div>
    <div v-if="status===3" class="text-center">
      <div class="text-danger">Finished</div>
      <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
    </div>
    <div v-if="status === 2 || status === 3" class="mt-3">
      <table class="table table-bordered text-center" style="table-layout: fixed">
        <tr>
          <td v-if="winGames > 0">1 win in {{ Number((triedGames / winGames).toFixed(2)) }} games</td>
          <td v-else>0 wins</td>
          <td>
            <span v-if="winGames > 0">{{ winGames }} win{{winGames > 1 ? 's' : ''}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="winGames > 0">{{ winPercent }} wins every 100 games</span>
            <span v-else style="visibility: hidden;">1</span>
          </td>
          <td>
            <span v-if="winGames > 0">{{ winPercent }}%</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { pickNumber, calculateTimerInterval } from "../../common/utils";
import {
  // lottoNumbers,
  initLottoNumbers,
  checkWin,
  findSelectedLottoNumbers
} from "./utils";
import SelectionPanel from "./SelectionPanel.vue";
import DrawnPanel from "./DrawnPanel.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";

export default {
  data: function() {
    return {
      lottoNumbers: null,
      status: 0,
      // 0 - initial status, ready for selecting number
      // 1 - numbers are selected, ready to play
      // 2 - playing
      // 3 - finished
      drawnNumbers: [],
      drawnNumbersHistory: [],
      demoAutoOption: "0",
      timer: null,
      triedGames: 0,
      winGames: 0
    };
  },
  components: {
    appSelectionPanel: SelectionPanel,
    appDrawnPanel: DrawnPanel,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["settings", "trialNumber"],
  computed: {
    selectedNumbers() {
      return findSelectedLottoNumbers(this.lottoNumbers);
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    },
    winPercent() {
      if (this.triedGames === 0) {
        return 0;
      }
      return Number(((this.winGames / this.triedGames) * 100).toFixed(2));
    }
  },
  watch: {
    selectedNumbers(value) {
      // const selectedNumbers = value.filter(item => item.selected === true);
      if (
        value.length >= this.settings.numbersToDraw &&
        (this.status === 0 || this.status === 3)
      ) {
        this.status = 1;
      } else if (
        value.length < this.settings.numbersToDraw &&
        this.status === 1
      ) {
        this.status = 0;
      }
    },
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if (value === 3) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleSelectNumber($e) {
      if (!(this.status === 0 || this.status === 1 || this.status === 3)) {
        return;
      }
      // const selectedNumber = $e;
      const selectedNumbers = this.lottoNumbers.filter(
        item => item.selected === true
      );
      this.lottoNumbers = this.lottoNumbers.map(item => {
        if (item.number === $e && item.selected) {
          item.selected = false;
        } else if (
          item.number === $e &&
          !item.selected &&
          selectedNumbers.length < this.settings.numbersToDraw
        ) {
          item.selected = true;
        }
        return item;
      });
    },
    drawNumber() {
      let pickedNumber = pickNumber(1, this.settings.totalNumbers);
      while (this.drawnNumbers.indexOf(pickedNumber) >= 0) {
        pickedNumber = pickNumber(1, this.settings.totalNumbers);
      }
      // this.drawnNumbers.push(pickedNumber);
      return pickedNumber;
    },
    handlePlayOneGame() {
      if (this.status !== 2) {
        this.status = 2;
      }
      let drawn = 0;
      this.drawnNumbers = [];
      while (drawn < this.settings.numbersToDraw) {
        this.drawnNumbers.push(this.drawNumber());
        drawn++;
      }
      this.triedGames++;
      if (checkWin(this.drawnNumbers, this.lottoNumbers)) {
        this.winGames++;
      }

      if (this.triedGames >= this.trialNumber) {
        this.status = 3;
      }
    },
    handleReset() {
      this.status = 0;
      this.triedGames = 0;
      this.winGames = 0;
      this.demoAutoOption = "0";
      this.lottoNumbers = initLottoNumbers(this.settings.totalNumbers);
      this.drawnNumbers = [];
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
    this.lottoNumbers = initLottoNumbers(this.settings.totalNumbers);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
</style>