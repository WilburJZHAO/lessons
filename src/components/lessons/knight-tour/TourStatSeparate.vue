<template>
  <div style="overflow: auto;">
    <table class="table table-bordered" style="min-width: 800px;  table-layout: fixed; ">
      <tr class="table-danger">
        <th>Trials</th>
        <td v-for="(data, index) in statData" :key="index">{{ data.trials }}</td>
      </tr>
      <tr>
        <th class="table-danger">Solutions</th>
        <td v-for="(data, index) in statData" :key="index">{{ data.solutions }}</td>
      </tr>
      <tr>
        <th class="table-danger">Duplicates</th>
        <td v-for="(data, index) in statData" :key="index">{{ data.duplicates }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["solutions", "duplicates", "trialNumber", "trial"],
  data: function() {
    return {
      statData: []
    };
  },
  watch: {
    trial(value, prevValue) {
      if (value === 0 && prevValue > 0) {
        this.initData();
      }
    },
    solutions(value) {
      if (!value) {
        return;
      }
      // console.log("solution", value);
      this.statData[this.currentColIndex].solutions++;
      this.statData = [...this.statData];
    },
    duplicates(value) {
      if (!value) {
        return;
      }
      // console.log("dup", value);
      this.statData[this.currentColIndex].duplicates++;
      this.statData = [...this.statData];
    }
  },
  computed: {
    breakPoint() {
      if (this.trialNumber > 10) {
        return this.trialNumber / 10;
      } else {
        return 1;
      }
    },
    currentColIndex() {
      return Math.ceil(this.trial / this.breakPoint) - 1;
    }
  },
  methods: {
    initData() {
      this.statData = [];
      // Initialize statData
      for (
        let i = 1;
        i <= Math.floor(this.trialNumber / this.breakPoint);
        i++
      ) {
        this.statData.push({
          // trials: `${Math.floor(this.breakPoint * (i - 1)) + 1} - ${Math.floor(
          //   this.breakPoint * i
          // )}`,
          trials: ` ${Math.floor(this.breakPoint * i)}`,
          solutions: 0,
          duplicates: 0
        });
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped>
</style>