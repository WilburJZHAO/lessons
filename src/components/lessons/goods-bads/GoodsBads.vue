<template>
  <div class="container">
    <h5>Week {{ weekNumber}}</h5>
    <div class="row mb-4" v-for="(dayData, row) in data" :key="row">
      <div class="col-lg-7 d-flex">
        <div class="row mb-3">
          <h5 class="text-primary col-sm-1 col-12">{{ dayData.date }}</h5>
          <div class="d-flex col-sm-11 col-12">
            <div
              v-for="(gbData, col) in dayData.data"
              :key="`gb-${col}`"
              style="font-size: 1rem"
              class="mr-1 font-weight-bold"
            >
              <input
                type="text"
                class="form-control mb-1"
                v-model="inputData[row].data[col].gb"
                @keypress="checkInputGB"
                @input="forceUppercase($event, inputData[row].data[col], 'gb')"
                :class="{
                  'text-success': inputData[row].data[col].gb==='G' && inputData[row].data[col].checkResult===true,
                  'text-primary': inputData[row].data[col].gb==='B' && inputData[row].data[col].checkResult===true,
                  'text-danger': inputData[row].data[col].checkResult===false
                 }"
                :disabled="inputData[row].data[col].checkResult===true"
              />
              <!-- 正确的G绿色 正确的B蓝色，错误输入是红色-->
              <div class="text-center">
                <span>{{ gbData.sign ===-1 ? '-' : '+'}}</span>

                <span class="pl-1" style="position: relative;">
                  <sup>{{ gbData.number > 0 ? '+' : '-'}}</sup>
                  {{ Math.abs(gbData.number)}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 d-flex">
        <div class="mr-2">
          <div class="text-success text-center">G</div>
          <input
            type="text"
            class="form-control"
            v-model.number="inputData[row].gSum.number"
            @keypress="checkInputNumber"
            :class="{
                  'text-success': inputData[row].gSum.checkResult===true,
                  'text-danger': inputData[row].gSum.checkResult===false
                 }"
            :disabled="inputData[row].gSum.checkResult===true"
          />
          <!-- Day Good input-->
        </div>
        <div>
          <div class="text-primary text-center">B</div>
          <input
            type="text"
            class="form-control"
            v-model.number="inputData[row].bSum.number"
            @keypress="checkInputNumber"
            :class="{
                  'text-success': inputData[row].bSum.checkResult===true,
                  'text-danger': inputData[row].bSum.checkResult===false
                 }"
            :disabled="inputData[row].bSum.checkResult===true"
          />
          <!-- Day Bad input-->
        </div>
        <div class="font-weight-bold d-flex align-items-center mx-1">=</div>
        <div style="transform: translateY(-20%);">
          <div class="mb-1">
            <input
              type="text"
              class="form-control"
              v-model="inputData[row].gb.value"
              @keypress="checkInputGB"
              @input="forceUppercase($event, inputData[row].gb, 'value')"
              :class="{
                  'text-success': inputData[row].gb.value==='G' && inputData[row].gb.checkResult===true,
                  'text-primary': inputData[row].gb.value==='B' && inputData[row].gb.checkResult===true,
                  'text-danger': inputData[row].gb.checkResult===false
                 }"
              :disabled="inputData[row].gb.checkResult===true"
            />
          </div>
          <div class="mt-1">
            <input
              type="text"
              class="form-control"
              v-model.number="inputData[row].daySum.number"
              @keypress="checkInputNumber"
              :class="{
                  'text-success': inputData[row].gb.value==='G' && inputData[row].daySum.checkResult===true,
                  'text-primary': inputData[row].gb.value==='B' && inputData[row].daySum.checkResult===true,
                  'text-danger': inputData[row].daySum.checkResult===false
                 }"
              :disabled="inputData[row].daySum.checkResult===true"
            />
          </div>
        </div>

        <div class="font-weight-bold d-flex align-items-center mx-1">=</div>
        <div>
          <div
            class="text-center"
            :style="{visibility: inputData[row].finalSum.checkResult===true ? 'visible' :'hidden' }"
          >
            <i class="fas fa-check text-success"></i>
          </div>
          <div
            style="width: 50px; height: 40px; border: 1px solid #ddd; border-radius: 10%;"
            class="d-flex justify-content-center align-items-center"
          >
            <span v-if="inputData[row].finalSum.number !== null">
              <sup>{{ inputData[row].finalSum.number > 0 ? '+' : (inputData[row].finalSum.number === 0 ? '' : '-')}}</sup>
              {{ Math.abs(inputData[row].finalSum.number) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-7 col-sm-2 col-2"></div>
      <div class="col-md-5 col-sm-10 col-10 d-flex">
        <div
          class="text-primary flex-grow-1 d-flex justify-content-end align-items-center mr-2"
        >Result for week one =</div>
        <div
          class="flex-grow-1 d-flex justify-content-center align-items-center"
          style="border: 1px solid #ddd; border-radius: 10%; height: 40px;"
        >
          <span v-if="resultForWeek!==null ">
            <sup>{{ resultForWeek > 0 ? '+' : ( resultForWeek === 0 ? '' : '-') }}</sup>
            {{ Math.abs(resultForWeek) }}
          </span>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-7 col-sm-2 col-2"></div>
      <div class="col-md-5 col-sm-10 col-10 d-flex justify-content-center">
        <button class="btn btn-outline-success" v-if="!isWeekFinish" @click="handleCheck">Check</button>
        <button class="btn btn-outline-dark" v-if="isWeekFinish" @click="handleReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { pickNumber, pickSign } from "./utils";
export default {
  props: ["level"],
  data: function() {
    return {
      weekNumber: 1,
      data: [],
      inputData: []
    };
  },
  computed: {
    maxPossibleNumber() {
      return this.level === 2 ? 20 : 9;
    },
    resultForWeek() {
      let result = null;
      for (let el of this.inputData) {
        if (el.finalSum.checkResult === true) {
          if (result === null) {
            result = 0;
          }
          result += el.finalSum.number;
        }
      }
      return result;
    },
    isWeekFinish() {
      let isFinish = true;
      for (let el of this.inputData) {
        if (el.finalSum.checkResult === null) {
          isFinish = false;
          break;
        }
      }
      return isFinish;
    }
  },
  methods: {
    initOneDayData(day) {
      let oneDayData = {};
      let oneDayInputData = {};
      let parts = pickNumber(6, 9);

      oneDayData.date = day;
      oneDayData.parts = parts;
      oneDayData.data = [];
      oneDayInputData.data = [];

      for (let i = 1; i <= parts; i++) {
        let sign = pickSign();
        let numberSign = pickSign();
        let number = numberSign * pickNumber(1, this.maxPossibleNumber);
        let gb = sign * number > 0 ? "G" : "B";
        // let checkResult = null;
        oneDayData.data.push({
          sign,
          number,
          gb
        });

        oneDayInputData.data.push({
          gb: null,
          checkResult: null
        });
      }

      let gSum = 0,
        bSum = 0;
      for (let k = 0; k < oneDayData.data.length; k++) {
        if (oneDayData.data[k].gb === "G") {
          gSum += Math.abs(oneDayData.data[k].number);
        }
        if (oneDayData.data[k].gb === "B") {
          bSum += Math.abs(oneDayData.data[k].number);
        }
      }
      oneDayData.gSum = gSum;
      oneDayData.bSum = bSum;
      oneDayData.day = {
        gb: gSum >= bSum ? "G" : "B",
        number: Math.abs(gSum - bSum),
        daySum: gSum - bSum
      };

      oneDayInputData.gSum = {
        number: null,
        checkResult: null
      };
      oneDayInputData.bSum = {
        number: null,
        checkResult: null
      };
      oneDayInputData.gb = {
        value: null,
        checkResult: null
      };
      oneDayInputData.daySum = {
        number: null,
        checkResult: null
      };
      oneDayInputData.finalSum = {
        number: null,
        checkResult: null
      };

      return [oneDayData, oneDayInputData];
    },
    initWeekData() {
      let monData = this.initOneDayData("Mon");
      let tueData = this.initOneDayData("Tue");
      let wedData = this.initOneDayData("Wed");
      let thuData = this.initOneDayData("Thu");
      let friData = this.initOneDayData("Fri");
      this.data = [monData[0], tueData[0], wedData[0], thuData[0], friData[0]];
      this.inputData = [
        monData[1],
        tueData[1],
        wedData[1],
        thuData[1],
        friData[1]
      ];
    },

    handleCheck() {
      for (let i = 0; i < this.data.length; i++) {
        let elData = this.data[i];
        let elInputData = this.inputData[i];
        let isDayCheckComplete = true;

        for (let j = 0; j < elData.data.length; j++) {
          // Check every day's good parts and bad parts
          let elPartData = elData.data[j];
          let elPartInputData = elInputData.data[j];
          if (elPartInputData.gb === null) {
            isDayCheckComplete = false;
          } else if (elPartInputData.gb === elPartData.gb) {
            elPartInputData.checkResult = true;
          } else {
            elPartInputData.checkResult = false;
            isDayCheckComplete = false;
          }
        }

        // check good sum
        if (elInputData.gSum.number === null) {
          isDayCheckComplete = false;
        } else if (elInputData.gSum.number === elData.gSum) {
          elInputData.gSum.checkResult = true;
        } else {
          elInputData.gSum.checkResult = false;
          isDayCheckComplete = false;
        }

        // check bad sum
        if (elInputData.bSum.number === null) {
          isDayCheckComplete = false;
        } else if (elInputData.bSum.number === elData.bSum) {
          elInputData.bSum.checkResult = true;
        } else {
          elInputData.bSum.checkResult = false;
          isDayCheckComplete = false;
        }

        // check day's good/bad
        if (elInputData.gb.value === null) {
          isDayCheckComplete = false;
        } else if (elInputData.gb.value === elData.day.gb) {
          elInputData.gb.checkResult = true;
        } else {
          elInputData.gb.checkResult = false;
          isDayCheckComplete = false;
        }

        // check day's good/bad sum
        if (elInputData.daySum.number === null) {
          isDayCheckComplete = false;
        } else if (elInputData.daySum.number === elData.day.number) {
          elInputData.daySum.checkResult = true;
        } else {
          elInputData.daySum.checkResult = false;
          isDayCheckComplete = false;
        }

        if (isDayCheckComplete) {
          elInputData.finalSum.number = elData.day.daySum;
          elInputData.finalSum.checkResult = true;
        }
      }
    },

    checkInputGB(e) {
      // Only allow for inputting letter G or B.
      let { charCode } = e;
      if (
        !(
          charCode === 103 || // charcode for 'g'
          charCode === 71 || // charcode for 'G'
          charCode === 98 || // charcode for 'b'
          charCode === 66
        ) || // charcode for 'B'
        e.target.value.length >= 1
      ) {
        e.preventDefault();
      }
    },

    checkInputNumber(e) {
      // Only allow inputting two-digit numbers
      let { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 2) {
        e.preventDefault();
      }
    },

    forceUppercase(e, o, prop) {
      const start = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      this.$set(o, prop, e.target.value);
      e.target.setSelectionRange(start, start);
    },

    handleReset() {
      this.weekNumber++;
      this.data = [];
      this.inputData = [];
      this.initWeekData();
    }
  },
  created() {
    this.initWeekData();
  }
};
</script>

<style scoped>
</style>