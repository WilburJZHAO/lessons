<template>
  <div class="row">
    <div class="col-4">
      <h5 style="visibility: hidden;">{{ tableData2 && tableData2.count }}</h5>
      <h5 class="text-danger" v-if="tableData2">{{ tableData2.max }}</h5>
      <h5 class="text-danger" v-if="tableData2">{{ tableData2.mean }}</h5>
      <h5 class="text-danger" v-if="tableData2 && tableData2.count >= 5">
        {{ tableData2.median }}
      </h5>
    </div>
    <div class="col-4">
      <h5>Count</h5>
      <h5>Max</h5>
      <h5>Mean</h5>
      <h5>Median</h5>
    </div>
    <div class="col-4">
      <h5>{{ tableData1.count }}</h5>
      <h5 class="text-primary">{{ tableData1.max }}</h5>
      <h5 class="text-primary">{{ tableData1.mean }}</h5>
      <h5 class="text-primary" v-if="tableData1.count >= 5">
        {{ tableData1.median }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: ["points1", "points2"],
  computed: {
    tableData1() {
      return this.getTableData(this.points1);
    },
    tableData2() {
      if (!this.points2) return null;
      return this.getTableData(this.points2);
    }
  },
  methods: {
    getTableData(points) {
      let max = 0;
      let sum = 0;
      let mean;
      let median;
      for (let i = 0; i < points.length; i++) {
        if (points[i] > max) {
          max = points[i];
        }
        sum += points[i];
      }
      if (points.length > 0) {
        mean = Number((sum / points.length).toFixed(2));
        if (points.length % 2 === 0) {
          // If the length of dataset is an even number
          median =
            (points[points.length / 2] + points[points.length / 2 - 1]) / 2;
        } else {
          // If the length of dataset is an odd number
          median = points[(points.length - 1) / 2];
        }
      } else {
        mean = 0;
        median = 0;
      }

      return {
        count: points.length,
        max,
        mean,
        median
      };
    }
  }
};
</script>

<style scoped></style>
