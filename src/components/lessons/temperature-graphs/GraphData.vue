<template>
  <div>
    <canvas :id="'graph' + temperatureData.id"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: ["temperatureData", "temperatureType"],
  mounted() {
    const ctx = document.getElementById(`graph${this.temperatureData.id}`);
    // console.log(ctx);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        datasets: [
          {
            label: "Max",
            backgroundColor: "#FF6384",
            borderColor: "#FF6384",
            data: this.temperatureData[this.temperatureType].max,
            fill: false
          },
          {
            label: "Min",
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            data: this.temperatureData[this.temperatureType].min,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: false
        }
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         min: this.temperatureType === "celcius" ? -30 : -20,
        //         max: this.temperatureType === "celcius" ? 50 : 120
        //       }
        //     }
        //   ]
        // }
      }
    });
  }
};
</script>

<style scoped></style>
