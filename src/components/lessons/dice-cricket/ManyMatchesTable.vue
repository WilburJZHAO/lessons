<template>
  <div>
    <table class="table table-bordered text-center" style="table-layout:fixed;">
      <tr>
        <th>Game</th>
        <td>
          <span v-if="gamePlayedNumber > 0">{{ gamePlayedNumber }}</span>
        </td>
      </tr>
      <tr>
        <th>Minimum</th>
        <td>
          <span v-if="gamePlayedNumber > 0" class="text-primary">{{ minimum }}</span>
        </td>
      </tr>
      <tr>
        <th>Maximum</th>
        <td>
          <span v-if="gamePlayedNumber > 0" class="text-primary">{{ maximum }}</span>
        </td>
      </tr>
      <tr>
        <th>Range</th>
        <td>
          <span v-if="gamePlayedNumber > 0">{{ range }}</span>
        </td>
      </tr>
      <tr>
        <th>Mean</th>
        <td>
          <span v-if="gamePlayedNumber > 0" class="text-danger">{{ mean }}</span>
        </td>
      </tr>
      <tr>
        <th>Median</th>
        <td>
          <span v-if="gamePlayedNumber > 0" class="text-success">{{ median }}</span>
        </td>
      </tr>
      <tr>
        <th>Mean # overs</th>
        <td>
          <span v-if="gamePlayedNumber > 0" class="text-success">{{ meanOvers }}</span>
        </td>
      </tr>
      <tr>
        <th>Ties</th>
        <td>
          <span v-if="gamePlayedNumber > 0">{{ ties }}</span>
        </td>
      </tr>
      <tr>
        <th>% Ties</th>
        <td>
          <span v-if="gamePlayedNumber > 0">{{ tiesPercent }}%</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["gamePlayedNumber", "gameData", "ties", "overCounts"],
  computed: {
    // sortedGameData() {
    // 	return this.gameData.sort((e1, e2) => {
    // 		if(e1 < e2) {
    // 			return -1;
    // 		} else {
    // 			return 1;
    // 		}
    // 	})
    // },
    minimum() {
      return this.gameData[0];
    },
    maximum() {
      return this.gameData[this.gameData.length - 1];
    },
    range() {
      return this.maximum - this.minimum;
    },
    mean() {
      let total = 0;
      for (let i = 0; i < this.gameData.length; i++) {
        total += this.gameData[i];
      }
      return (total / this.gameData.length).toFixed(1);
    },
    meanOvers() {
      return (this.overCounts / 6 / (this.gamePlayedNumber * 2)).toFixed(2);
    },
    median() {
      let middle = this.gameData.length / 2;
      let inMiddle = this.gameData.length % 2;
      return inMiddle === 0
        ?
            ((this.gameData[middle - 1] + this.gameData[middle]) / 2).toFixed(1)

        : this.gameData[Math.floor(middle)].toFixed(1);
    },
    tiesPercent() {
      return Number(((this.ties / this.gamePlayedNumber) * 100).toFixed(2));
    }
  }
};
</script>

<style scoped>
</style>
