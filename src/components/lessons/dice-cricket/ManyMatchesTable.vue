<template>
  <div>
    <table class="table table-bordered text-center" style="table-layout:fixed;">
      <tr>
        <th>Match</th>
        <td>
          <span v-if="matchPlayedNumber > 0">{{ legify(matchPlayedNumber) }}</span>
        </td>
      </tr>
      <tr>
        <th>Minimum</th>
        <td>
          <span v-if="matchPlayedNumber > 0" class="text-primary">{{ minimum }}</span>
        </td>
      </tr>
      <tr>
        <th>Maximum</th>
        <td>
          <span v-if="matchPlayedNumber > 0" class="text-primary">{{ maximum }}</span>
        </td>
      </tr>
      <tr>
        <th>Range</th>
        <td>
          <span v-if="matchPlayedNumber > 0">{{ range }}</span>
        </td>
      </tr>
      <tr>
        <th>Mean</th>
        <td>
          <span v-if="matchPlayedNumber > 0" class="text-danger">{{ mean }}</span>
        </td>
      </tr>
      <tr>
        <th>Median</th>
        <td>
          <span v-if="matchPlayedNumber > 0" class="text-success">{{ median }}</span>
        </td>
      </tr>
      <tr>
        <th>Mean # overs</th>
        <td>
          <span v-if="matchPlayedNumber > 0" class="text-success">{{ meanOvers }}</span>
        </td>
      </tr>
      <tr>
        <th>Ties</th>
        <td>
          <span v-if="matchPlayedNumber > 0">{{ ties }}</span>
        </td>
      </tr>
      <tr>
        <th>% Ties</th>
        <td>
          <span v-if="matchPlayedNumber > 0">{{ tiesPercent }}%</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { legify } from "../../common/utils.js";
export default {
  props: ["matchPlayedNumber", "matchData", "ties", "ballCount", "runCount"],
  methods: {
    legify,
  },
  computed: {
    // sortedMatchData() {
    // 	return this.matchData.sort((e1, e2) => {
    // 		if(e1 < e2) {
    // 			return -1;
    // 		} else {
    // 			return 1;
    // 		}
    // 	})
    // },
    minimum() {
      return this.matchData[0];
    },
    maximum() {
      return this.matchData[this.matchData.length - 1];
    },
    range() {
      return this.maximum - this.minimum;
    },
    mean() {
      return (this.runCount / (this.matchPlayedNumber * 2)).toFixed(1);
    },
    meanOvers() {
      return (this.ballCount / 6 / (this.matchPlayedNumber * 2)).toFixed(2);
    },
    median() {
      let middle = this.matchData.length / 2;
      let inMiddle = this.matchData.length % 2;
      return inMiddle === 0
        ?
            ((this.matchData[middle - 1] + this.matchData[middle]) / 2).toFixed(1)

        : this.matchData[Math.floor(middle)].toFixed(1);
    },
    tiesPercent() {
      return Number(((this.ties / this.matchPlayedNumber) * 100).toFixed(2));
    }
  }
};
</script>

<style scoped>
</style>
