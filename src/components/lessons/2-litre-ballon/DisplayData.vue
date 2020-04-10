<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Gathering and displaying balloon data</h3>
    <div class="row">
      <div class="col-md-6">
        <div>
          <!-- Data table -->
          <table class="table">
            <thead>
              <tr>
                <th class="text-center">

                  <select class="form-control" id="range" v-model="unit" :disabled="isSet" @click="updateUnitMessage">
                    <option value="D">Diameter (cm)</option>
                    <option value="R">Radius (cm)</option>
                    <option value="C">Circumference (cm)</option>
                    <option value="V">Volume (L)</option>
                  </select>
                </th>
                <th class="text-center">
                  <select class="form-control" id="comparison" v-model="unit2" :disabled="isSet">
                    <option value="D">Diameter (cm)</option>
                    <option value="R">Radius (cm)</option>
                    <option value="C">Circumference (cm)</option>
                    <option value="V">Volume (L)</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody v-if="isSet">
              <tr v-for="(item, index) in dataArray" :key="index">
                <td class="text-center">{{ item.getValue(unit) }}</td>
                <td class="text-center">{{ item.getValue(unit2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-6">
        <canvas id="dataChart" width="400" height="400"></canvas>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3"></div>

      <div class="col-md-6">

        <div class="row">
          <div class="form-group col-md-6">
            <label for="min">Min</label>&nbsp;&nbsp;
            <input
              type="number"
              class="form-control"
              v-model.number="min"
              :min="1"
              :max="50"
              :disabled="isSet"
              @focus="()=> {this.alertMessage='Please enter the minimum of the range (0 to 50)'}"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="max">Max</label>&nbsp;&nbsp;
            <input
              type="number"
              class="form-control"
              v-model.number="max"
              :min="1"
              :max="50"
              :disabled="isSet"
              @focus="()=> {this.alertMessage='Please enter the maximum of the range (0 to 50)'}"
            />
          </div>
        </div>
        <div v-if="alertMessage" class="alert alert-danger">{{alertMessage}}</div>
        <div v-if="!isSet" class="text-center">
          <button class="btn btn-outline-success" @click="handleStart">OK</button>
        </div>
        <div v-if="isSet" class="text-center">
          <button
            class="btn btn-outline-success"
            @click="handleDrawPoint"
            v-if="!isFinish && demoAutoOption === '0'"
          >{{ isStart ? 'Show next point' : 'Show first point' }}</button>

          <button
            class="btn btn-outline-success"
            @click="toggleTimer"
            v-if="!isFinish && demoAutoOption === '1'"
          >{{ !isStart ? 'Start' : ( timer ? 'Pause' : 'Resume') }}</button>
          <button class="btn btn-outline-dark" @click="handleReset" v-if="isFinish">Reset</button>
          <app-demo-auto-option
            :option="demoAutoOption"
            @changeOption="demoAutoOption=$event"
            class="mt-1 mb-3"
          ></app-demo-auto-option>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Ballon from "./Ballon";
import DemoAutoOption from "../../common/DemoAutoOption.vue";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      unit: "D",
      unit2: "V",
      min: null,
      max: null,
      isSet: false,
      isStart: false,
      isFinish: false,
      count: 0,
      alertMessage: "Enter the range for the diameter (cm), or change units above.",
      dataArray: null,
      step: null,
      demoAutoOption: "0",
      timer: null,
      chart: null
    };
  },
  computed: {
    chartData() {
      if (!this.dataArray) {
        return [];
      }
      return this.dataArray.map(data => {
        return {
          x: data.getValue(this.unit),
          y: data.getValue(this.unit2),
          r: 5
        };
      });
    },
    /** The smallest number displayed on Y axis */
    smallestBallon() {
      const ballon = new Ballon(this.unit, this.min);
      const ballonValue = ballon.getValue(this.unit2);
      return ballonValue;
    },
    /** The biggest number displayed on Y axis  */
    biggestBallon() {
      const ballon = new Ballon(this.unit, this.max);
      const ballonValue = ballon.getValue(this.unit2);
      if (ballonValue < 0.0045) {
        return 0.0045;
      } else if (ballonValue < 0.015) {
        return 0.015;
      } else if (ballonValue < 0.035) {
        return 0.035;
      } else if (ballonValue < 0.1) {
        return 0.1;
      } else if (ballonValue < 0.4) {
        return 0.4;
      } else if (ballonValue < 0.6) {
        return 0.6;
      } else if (ballonValue < 1) {
        return 1;
      } else if (ballonValue > 1) {
        return Math.ceil(ballonValue);
      } else {
        return ballonValue;
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
      if (value) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    isSet(value) {
      let data = this.chartData;
      if (value) {
        const ctx = document.getElementById("dataChart");
        this.chart = new Chart(ctx, {
          type: "bubble",
          data: {
            labels: [],
            datasets: [
              {
                backgroundColor: "blue",
                borderColor: "blue",
                data,
                fill: false,
                pointRadius: 8,
                showLine: false
              }
            ]
          },
          options: {
            animation: false,
            responsive: true,
            title: {
              display: false
            },
            legend: {
              display: false
            },
            elements: {
              point: {
                pointStyel: "circle"
              }
            },
            scales: {

              xAxes: [
                {
                  ticks: {
                    min: this.min,
                    max: this.max,
                  },
                  scaleLabel: {display: true,
                    labelString: this.getLabel(this.unit),
                    fontSize: 14,
                    fontColor: '#222',
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    min: this.smallestBallon,
                    max: this.biggestBallon
                  },
                  scaleLabel: {display: true,
                    labelString: this.getLabel(this.unit2),
                    fontSize: 14,
                    fontColor: '#222',
                  }
                }
              ]
            }
          }
        });
      }
    }
  },
  methods: {
    /** Validate input and set data if validation is passed */
    handleStart() {
      if ((!this.min || !this.max) && (this.min !== 0)) { // handle case where Javascript treats 0 as 'falsy'
        this.alertMessage = `Please enter the range for the ${this.getLabel(this.unit)}.`;
        return;
      } else if (
        this.min < 0 ||
        this.min > 50 ||
        this.max < 0 ||
        this.max > 50 ||
        !Number.isInteger(this.min) ||
        !Number.isInteger(this.max)
      ) {
        this.alertMessage = "Please input an integer number between 0 and 50.";
        return;
      } else if (this.min >= this.max) {
        this.alertMessage = `Please make sure the maximum is larger than the minimum.`;
        return;
      }
      this.alertMessage = "";
      this.dataArray = [];
      this.step = (this.max - this.min) / 10;
      this.isSet = true;
    },

    updateUnitMessage() {
      this.alertMessage = `Units changed to ${this.getLabel(this.unit)}, enter the range.`
    },

    handleDrawPoint() {
      if (!this.isStart) {
        this.isStart = true;
      }
      let ballon;
      let inputNumber = this.min + this.count * this.step;
      ballon = new Ballon(this.unit, Number(inputNumber.toFixed(2)));
      this.count += 1;
      this.dataArray.push(ballon);
      this.chart.data.datasets[0].data = this.chartData;
      this.chart.update();
      if (this.count >= 11) {
        this.isFinish = true;
      }
    },

    toggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handleDrawPoint, 500);
      }
    },

    handleReset() {
      this.min = null;
      this.max = null;
      this.isSet = false;
      this.isStart = false;
      this.isFinish = false;
      this.count = 0;
      this.dataArray = null;
      this.step = null;
      this.demoAutoOption = "0";
      this.timer = null;
      this.chart.destroy();
      this.chart = null;
    },
    getLabel(unit) {
      switch (unit) {
        case "D":
          return "Diameter (cm)";
        case "R":
          return "Radius (cm)";
        case "C":
          return "Circumference (cm)";
        case "V":
          return "Volume (L)";
        default:
          return "";
      }

    }
  }
};
</script>

<style scoped>
</style>
