<template>
  <div class="row">
    <div class="col-md-9 pr-5">
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th colspan="3">{{ legify(trialNumber) }} trials</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <th>Prize</th>
            <th># Winners</th>
            <th>Payout</th>
          </tr>
          <tr v-for="(item, index) in trialData" :key="index">
            <td>
              {{ item.prize % 1 > 0 ? item.prize.toFixed(2) : item.prize }}
            </td>
            <td>
              <span v-if="status > 0">{{ legify(item.winners) }}</span>
            </td>
            <td>
              <span v-if="status > 0">{{ legify((item.winners * item.prize), 2) }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot class="text-center">
          <tr>
            <th>Total</th>
            <td>
              <span v-if="status > 0">{{ legify(triedNumber) }}</span>
            </td>
            <td>
              <span v-if="status > 0">{{ '$' + legify(totalPayout, 2) }}</span>
            </td>
          </tr>
          <tr>
            <th>Average payout</th>
            <td colspan="2">
              <span v-if="status > 0">{{ '$' + (totalPayout / triedNumber).toFixed(2) }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="col-md-3 d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-center">
        <app-rule-map :rules="rules"></app-rule-map>
      </div>
      <div class="text-center">
        <button
          class="btn btn-outline-success"
          @click="handleOneTrial"
          v-if="(status===0 || status === 1)&&demoAutoOption==0"
        >Next trial</button>
        <button
          class="btn btn-outline-success"
          @click="handleToggleTimer"
          v-if="(status===0 || status === 1)&&demoAutoOption==1"
        >{{ status===0 ? "Start" : timer ? "Pause" : "Resume" }}</button>
        <button
          class="btn btn-outline-dark"
          v-if="status===2"
          @click="handleReset"
        >Reset</button>
      </div>
      <div class="text-center mt-1">
        <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
      </div>
    </div>
  </div>
</template>

<script>
import RuleMap from "./RuleMap.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { createMap, convertValuesId } from "./utils";
import { pickNumber, calculateTimerInterval, legify } from "../../common/utils.js";

export default {
  props: ["rules", "values", "trialNumber"],
  components: {
    appRuleMap: RuleMap,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      status: 0,
      demoAutoOption: "0",
      trialData: [],
      timer: null,
      gameMap: null,
      triedNumber: 0
    };
  },
  computed: {
    totalPayout() {
      let total = 0;
      for (let i = 0; i < this.trialData.length; i++) {
        total += this.trialData[i].prize * this.trialData[i].winners;
      }
      return total;
    },
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
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
    initTrialData() {
      let trialData = [];
      for (let i = 0; i < this.values.length; i++) {
        trialData.push({
          prize: this.values[i],
          winners: 0
        });
      }
      return trialData;
    },
    throwDice() {
      return pickNumber(1, 6) + pickNumber(1, 6);
    },
    getDirection(dice) {
      return this.rules.find(item => item.dice === dice).next;
    },
    handleOneTrial() {
      if (this.status === 0) {
        this.status = 1;
      }
      let current = this.gameMap[0];
      while (!current.value) {
        const dice = this.throwDice();
        const direction = this.getDirection(dice);
        switch (direction) {
          case 1:
            current = this.gameMap[current.left];
            break;
          case 2:
            current = this.gameMap[current.center];
            break;
          case 3:
            current = this.gameMap[current.right];
            break;
        }
      }
      this.trialData[convertValuesId(current.id)].winners++;
      this.trialData = [...this.trialData];
      this.triedNumber++;
      if (this.triedNumber >= this.trialNumber) {
        this.status = 2;
      }
      // console.log(this.values[convertValuesId(current.id)]);
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleOneTrial, this.timerInterval);
      }
    },
    handleReset() {
      this.trialData = this.initTrialData();
      this.triedNumber = 0;
      this.status = 0;
    }
  },
  created() {
    this.trialData = this.initTrialData();
    this.gameMap = createMap(500, this.values);
  }
};
</script>

<style scoped></style>
