<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">How many trials to make your favourite?</h3>
    <hr class="subheading-separator">
    <app-how-many-trials-app
      v-if="trialNumber&&selectedAnimalData"
      :trialNumber="trialNumber"
      :selectedAnimalData="selectedAnimalData"
    ></app-how-many-trials-app>
    <app-select-favorite
      v-else-if="trialNumber"
      :trialNumber="trialNumber"
      @selectAnimal="selectedAnimalData=$event"
    ></app-select-favorite>
    <app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
  </div>
</template>

<script>
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import SelectFavorite from "./SelectFavorite.vue";
import HowManyTrialsApp from "./HowManyTrialsApp.vue";

export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appSelectFavorite: SelectFavorite,
    appHowManyTrialsApp: HowManyTrialsApp
  },
  data: function() {
    return {
      trialNumber: null,
      selectedAnimalData: null
    };
  }
};
</script>

<style scoped>
</style>
