<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">All possible arrangements</h3>
    <hr class="subheading-separator">
    <app-all-arrangements-app
      v-if="trialNumber && gameRule.boxes == 3"
      :numberOfGames="trialNumber"
      :gameRule="gameRule"
    ></app-all-arrangements-app>
    <div v-else-if="trialNumber && gameRule.boxes != 3">
      <div class="app--alert-container mt-5">
        <h5 class="text-danger">Only works for 3 boxes. Change the rules to 3 boxes</h5>
        <button
          class="btn btn-outline-danger mt-5"
          @click="()=> {this.$emit('backToMenu', -1);}"
        >Back</button>
      </div>
    </div>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import AllArrangementsApp from "./AllArrangementsApp.vue";
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
export default {
  props: ["gameRule"],
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appAllArrangementsApp: AllArrangementsApp
  },
  data: function() {
    return {
      trialNumber: null
    };
  }
};
</script>

<style scoped>
.app--alert-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
