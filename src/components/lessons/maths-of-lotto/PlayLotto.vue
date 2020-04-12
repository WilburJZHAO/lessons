<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play lotto</h3>
    <hr class="subheading-separator">
    <app-selection-panel :lottoNumbers="lottoNumbers" @selectNumber="handleSelectNumber"></app-selection-panel>
    <div class="row mt-4">
      <div class="col-md-8 mb-3">
        <div class="mt-3">
          <h6
            class="text-center"
            :style="{visibility: (status === 2 || status === 3) && drawnNumbers.length > 0 ? 'visible' : 'hidden'}"
          >Draw {{ drawnNumbers.length }}</h6>
          <app-drawn-panel :drawnNumbers="drawnNumbers" :settings="settings" :status="status"></app-drawn-panel>
        </div>
        <div class="mb-4"></div>
        <div
          v-if="status === 0"
          class="text-danger text-center"
        >Click on tiles to select {{ settings.numbersToDraw }} lotto numbers</div>
        <div v-if="status === 1 || status === 2" class="text-center">
          <button
            class="btn btn-outline-success"
            @click="handleDrawNumber"
          >Draw a number</button>
        </div>
        <div v-if="status === 3" class="text-center">
          <button
            class="btn btn-outline-success"
            @click="handleCheckWin"
          >Check for a win</button>
        </div>
        <div v-if="status === 4" class="text-center">
          <button
            class="btn btn-outline-success"
            @click="handleStartNext"
          >Clear for next game</button>
        </div>
      </div>
      <div class="col-md-4">
        <div
          v-if="status > 1 && drawnNumbersHistory.length > 0"
          class="d-flex justify-content-center"
          style="max-height: 20px;"
        >
          <div>
            <h6 class="text-center">{{ selectedNumbers.join(', ')}} to win</h6>
            <ul
              class="list-group"
              style="height: auto; max-height: 500px; overflow-y: scroll; width: 200px; margin-bottom: 100px;"
            >
              <li
                v-for="(el, index) in drawnNumbersHistory"
                :key="index"
                class="list-group-item text-center"
                :class="el.win ? 'list-group-item-danger' : 'list-group-item-primary'"
              >{{ el.numbers.join(', ') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3"></div>
  </div>
</template>

<script>
// import _ from "lodash";
import { pickNumber } from "../../common/utils";
import {
  // lottoNumbers,
  initLottoNumbers,
  checkWin,
  findSelectedLottoNumbers
} from "./utils";
import SelectionPanel from "./SelectionPanel.vue";
import DrawnPanel from "./DrawnPanel.vue";

export default {
  components: {
    appSelectionPanel: SelectionPanel,
    appDrawnPanel: DrawnPanel
  },
  data: function() {
    return {
      lottoNumbers: null,
      status: 0,
      // 0 - initial status, ready for select number
      // 1 - numbers are selected, ready to draw
      // 2 - is drawing
      // 3 - finish drawing and ready to check
      // 4 - win checked
      drawnNumbers: [],
      drawnNumbersHistory: []
    };
  },
  props: ["settings"],
  computed: {
    selectedNumbers() {
      // if (!this.lottoNumbers) {
      //   return [];
      // }
      // return this.lottoNumbers.filter(item => item.selected === true);
      return findSelectedLottoNumbers(this.lottoNumbers);
    }
  },
  watch: {
    selectedNumbers(value) {
      // const selectedNumbers = value.filter(item => item.selected === true);
      if (value.length >= this.settings.numbersToDraw && this.status === 0) {
        this.status = 1;
      } else if (
        value.length < this.settings.numbersToDraw &&
        this.status === 1
      ) {
        this.status = 0;
      }
    }
  },
  methods: {
    handleSelectNumber($e) {
      if (!(this.status === 0 || this.status === 1)) {
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
    handleCheckWin() {
      if (this.status !== 4) {
        this.status = 4;
      }
      this.drawnNumbersHistory.push({
        numbers: [...this.drawnNumbers],
        win: checkWin(this.drawnNumbers, this.lottoNumbers)
      });
    },
    handleDrawNumber() {
      if (this.status === 1) {
        this.status = 2;
      }

      let pickedNumber = pickNumber(1, this.settings.totalNumbers);
      while (this.drawnNumbers.indexOf(pickedNumber) >= 0) {
        pickedNumber = pickNumber(1, this.settings.totalNumbers);
      }
      this.drawnNumbers.push(pickedNumber);

      if (this.drawnNumbers.length >= this.settings.numbersToDraw) {
        this.status = 3;
      }
    },
    handleStartNext() {
      this.status = 2;
      // this.lottoNumbers = initLottoNumbers(this.settings.totalNumbers);
      this.drawnNumbers = [];
    }
  },
  created() {
    this.lottoNumbers = initLottoNumbers(this.settings.totalNumbers);
  }
};
</script>

<style scoped></style>
