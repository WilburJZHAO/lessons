<template>
  <div class="row">
    <div class="col-md-9 mb-4">
      <div class="row">
        <div class="col-md-6" v-for="(data, index) in shuffledSelectedCities" :key="index">
          <app-graphData :temperatureData="data" :temperatureType="temperatureType"></app-graphData>
          <div class="d-flex justify-content-between align-items-center">
            <input
              type="number"
              class="form-control ml-3 mr-5"
              v-model.number="myAnswers[index]"
              style="width: 100px;"
              :disabled="checkStatus[index] === true"
              @focus="
                message = `Enter the number of city(1-${selectedCities.length})`
              "
            />
            <div
              class="flex-grow-1"
              :class="{
                'text-success': checkStatus[index] === true,
                'text-danger': checkStatus[index] === false
              }"
            >
              {{
              selectedCities[myAnswers[index] - 1] &&
              selectedCities[myAnswers[index] - 1].city
              }}
              <i
                class="fas fa-check"
                v-if="checkStatus[index] === true"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div
        class="text-center mt-2"
        :class="status === 1 ? 'text-success' : 'text-danger'"
      >{{ message }}</div>
    </div>
    <div class="col-md-3">
      <ul class="list-group mb-4 app--city-list" style="position: sticky; top: 0;">
        <li
          class="list-group-item text-primary"
          v-for="(data, index) in selectedCities"
          :key="index"
        >{{ index + 1 }} - {{ data.city }}</li>
      </ul>
      <div class="text-center mb-3">
        <button class="btn btn-outline-success" @click="handleOk" :disabled="status === 1">OK</button>
      </div>
      <div v-if="status === 1" class="text-center">
        <button class="btn btn-outline-dark" @click="handleNewCities">Tap here for new cities</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import GraphData from "./GraphData.vue";
export default {
  components: {
    appGraphData: GraphData
  },
  props: ["selectedCities", "temperatureType"],
  data: function() {
    return {
      shuffledSelectedCities: null,
      myAnswers: new Array(this.selectedCities.length),
      checkStatus: new Array(this.selectedCities.length),
      message: "",
      status: 0 // 0 - answers not pass, 1 - answers pass
    };
  },
  methods: {
    handleOk() {
      for (let i = 0; i < this.myAnswers.length; i++) {
        if (
          (typeof this.myAnswers[i] === "string" &&
            this.myAnswers[i].trim() === "") ||
          this.myAnswers[i] === undefined
        ) {
          continue;
        }
        if (
          this.selectedCities[this.myAnswers[i] - 1] &&
          this.shuffledSelectedCities[i].id ===
            this.selectedCities[this.myAnswers[i] - 1].id
        ) {
          this.checkStatus[i] = true;
        } else {
          this.checkStatus[i] = false;
        }
      }
      this.checkStatus = [...this.checkStatus];
      if (this.checkAnswersPass()) {
        this.status = 1;
        this.message = "All cities correct";
      } else {
        this.message = "Try again.";
      }
    },
    checkAnswersPass() {
      for (let i = 0; i < this.checkStatus.length; i++) {
        if (this.checkStatus[i] !== true) {
          return false;
        }
      }
      return true;
    },
    handleNewCities() {
      this.$emit("newCities", true);
      this.status = 0;
      this.message = "";
      this.shuffledSelectedCities = _.shuffle(this.selectedCities);
      this.myAnswers = new Array(this.selectedCities.length);
      this.checkStatus = new Array(this.selectedCities.length);
    }
  },
  created() {
    this.shuffledSelectedCities = _.shuffle(this.selectedCities);
  }
};
</script>

<style scoped>
.app--city-list {
  width: 65%;
  margin: 0 auto;
}
@media only screen and (max-width: 1200px) {
  .app--city-list {
    width: 100%;
  }
}
@media only screen and (max-width: 768px) {
  .app--city-list {
    width: 70%;
  }
}
</style>
