<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Table of number partitions</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-5">
        <div  id="solutionsField" style="height: 500px; overflow: auto;">
          <table class="table">
            <thead class="text-primary">
              <th>n</th>
              <th class="text-center">P(n)</th>
              <th v-if="showRatio" class="text-center">P(n+1)/P(n)</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataSetDisplay" :key="index">
                <td>{{ item.n }}</td>
                <td class="text-center">{{ separateNumber(item.pn) }}</td>
                <td v-if="showRatio" class="text-center">{{ item.ratio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <p>
            <label for="showRatio">
              <input type="checkbox" name="showRatio" id="showRatio" v-model="showRatio" />
              Show ratio P(n+1)/P(n)
            </label>
          </p>
          <div class="alert alert-danger" v-if="gameStatus === 2">Finished</div>
          <button
            class="btn btn-outline-success"
            v-if="gameStatus < 2 && demoAutoOption === '0'"
            @click="handleNextNumber"
          >
            {{
            gameStatus === 0
            ? "First number"
            : "Next number"
            }}
          </button>
          <button
            class="btn btn-outline-success"
            v-if="gameStatus < 2 && demoAutoOption === '1'"
            @click="handleToggleTimer"
          >
            {{
            timer
            ? "Pause"
            : gameStatus === 0
            ? "Start"
            : "Resume"
            }}
          </button>
          <button class="btn btn-outline-dark" v-if="gameStatus === 2" @click="handleReset">Reset</button>
          <app-demo-auto-option
            :option="demoAutoOption"
            v-if="gameStatus !== 2"
            @changeOption="demoAutoOption = $event"
            class="mt-1 mb-3"
          ></app-demo-auto-option>
        </div>
      </div>
      <div class="col-md-7">
        <h6 class="text-primary text-center">Graph of P(n)</h6>
        <canvas id="dataChart" width="400" height="400"></canvas>
        <h6 class="text-center mt-3" v-if="dataSetDisplay.length > 0">
          P({{ dataSetDisplay[dataSetDisplay.length - 1].n }}) =
          {{ separateNumber(dataSetDisplay[dataSetDisplay.length - 1].pn) }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { integerPartition, separateNumber } from "./utils";
import DemoAutoOption from "../../common/DemoAutoOption.vue";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      gameStatus: 0,
      // 0 - ready for start
      // 1 - running
      // 2 - finished
      dataSet: [],
      dataSetDisplay: [],
      demoAutoOption: "0",
      timer: null,
      showRatio: false,
      nIndex: 1,
      chart: null,
      chartLabel: [],
      chartData: [],
      separateNumber
    };
  },
  computed: {
    dataSetTable() {
      if (this.dataSetDisplay.length === 0) {
        return [];
      }
      return this.dataSetDisplay.map(data => {
        return data.pn;
      });
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        this.clearTimer();
      }
    },
    nIndex(value) {
      if (value > 100) {
        this.gameStatus = 2;
        this.clearTimer();
      }
      // scroll to bottom
      this.$nextTick( function() {
        const solutionsField = document.getElementById("solutionsField");
        solutionsField.scrollTop = solutionsField.scrollHeight;
      });
    }
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    createDataChart() {
      const ctx = document.getElementById("dataChart");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabel,
          datasets: [
            {
              label: "",
              data: this.chartData,
              fill: false,
              backgroundColor: "#0000FF",
              borderColor: "#00FFFF",
              borderWidth: 1
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
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "Partitions"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  min: 1,
                  max: 103
                },
                scaleLabel: {
                  display: true,
                  labelString: "Number",
                  padding: 0
                }
              }
            ]
          }
        }
      });
    },
    handleNextNumber() {
      if (this.gameStatus === 0) {
        this.gameStatus = 1;
      }
      this.dataSetDisplay.push(this.dataSet[this.nIndex - 1]);
      this.chartData[this.nIndex - 1] = this.dataSet[this.nIndex - 1].pn;
      this.nIndex++;

      if (!this.chart) {
        this.createDataChart();
      } else {
        this.chart.data.datasets[0].data = this.chartData;
        this.chart.update();
      }
      if (this.nIndex > 100) {
        this.gameStatus = 2;
        this.clearTimer();
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        this.clearTimer();
      } else {
        this.timer = setInterval(this.handleNextNumber, 200);
      }
    },
    handleReset() {
      this.demoAutoOption = "0";
      this.gameStatus = 0;
      this.dataSetDisplay = [];
      this.nIndex = 1;

      // reset graph, changes may only show after first iteration of new trial
      this.dataSet = [];
      this.timer = null;
      this.showRatio = false;
      this.chart = null;
      this.chartLabel = [];
      this.chartData = [];
      for (let i = 1; i <= 100; i++) {
        this.chartLabel.push(i);
        this.chartData.push[0];
        let partitionsNumber = integerPartition(i);
        let partitionsNumberPrev = 0;
        if (i > 1) {
          partitionsNumberPrev = integerPartition(i - 1);
        }
        this.dataSet.push({
          n: i,
          pn: partitionsNumber,
          ratio:
            i > 1
              ? Number((partitionsNumber / partitionsNumberPrev).toFixed(2))
              : null
        });
      }
      this.createDataChart(); // old one will be garbage collected

    }
  },
  created() {
    for (let i = 1; i <= 100; i++) {
      this.chartLabel.push(i);
      this.chartData.push[0];
      let partitionsNumber = integerPartition(i);
      let partitionsNumberPrev = 0;
      if (i > 1) {
        partitionsNumberPrev = integerPartition(i - 1);
      }
      this.dataSet.push({
        n: i,
        pn: partitionsNumber,
        ratio:
          i > 1
            ? Number((partitionsNumber / partitionsNumberPrev).toFixed(2))
            : null
      });
    }
  },
  destroyed() {
    this.clearTimer();
  }
};
</script>

<style scoped></style>
