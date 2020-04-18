<template>
  <div>
    <table class="table table-bordered text-center table-danger">
      <thead>
        <tr>
          <th>Trial number</th>
          <th>How close?</th>
          <th>Average so far</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span :style="{ visibility: trialNumber > 0 ? 'visible' : 'hidden' }">{{ trialNumber }}</span>
          </td>
          <td>
            <span :style="{ visibility: trialNumber > 0 ? 'visible' : 'hidden' }">{{ estAccuracy }}%</span>
          </td>
          <td>
            <span :style="{ visibility: trialNumber > 0 ? 'visible' : 'hidden' }">{{ average }}%</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <canvas id="appChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: ["trialNumber", "estAccuracy", "estArray"],
  data: function() {
    return {
      accuracyChart: null,
      barColorArr: [],
      barDataArr: []
    };
  },
  computed: {
    average() {
      if (this.estArray.length === 0) {
        return 0;
      }
      let total = 0;
      for (let i = 0; i < this.estArray.length; i++) {
        total += Math.abs(this.estArray[i]);
      }
      return Number((total / this.estArray.length).toFixed(2));
    }
  },
  watch: {
    trialNumber(value, oldValue) {
      if (value !== oldValue) {
        if (!this.accuracyChart) {
          this.createChart();
        } else {
          // eslint-disable-next-line no-console
          // console.log(this.estAccuracy);
          let color;
          if (this.estAccuracy > 2) {
            color = "blue";
          } else if (this.estAccuracy < -2) {
            color = "red";
          } else {
            color = "green";
          }
          this.barColorArr.push(color);
          if (this.estAccuracy <= 2 && this.estAccuracy >= -2) {
            this.barDataArr.push([-1, 1]);
          } else {
            this.barDataArr.push(this.estAccuracy);
          }
          this.accuracyChart.update();
        }
      }
    }
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("appChart");
      this.accuracyChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.estArray,
          datasets: [
            {
              label: "",
              data: this.barDataArr,
              fill: false,
              backgroundColor: this.barColorArr,
              borderColor: this.barColorArr,
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
                  min: -30,
                  max: 30,
                  fontSize: 14,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Under / Over (%)",
                  fontSize: 16,
                  fontColor: '#222',
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
                  display: false
                }
              }
            ]
          }
        }
      });
    }
  },
  mounted() {
    this.createChart();
  }
};
</script>

<style scoped></style>
