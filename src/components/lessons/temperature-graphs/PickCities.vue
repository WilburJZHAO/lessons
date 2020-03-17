<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Pick your own cities</h3>
    <div class="row" v-if="status === 0">
      <div class="col-md-6 mb-4">
        <div class="row">
          <div class="col-sm-6">
            <h5 class="text-center">Select up to 6 cities</h5>
            <p class="text-center">Click on list to select your cities(2-6)</p>
            <div class="app--list">
              <ul class="list-group">
                <li
                  class="list-group-item app--item"
                  :class="{
                    active: data.selected === true
                  }"
                  v-for="(data, index) in sortedAppData"
                  :key="index"
                  @click="handleSelectCity(index)"
                >
                  {{ data.city }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 mt-3 mb-5">
            <div class="custom-control custom-radio">
              <input
                type="radio"
                v-model="selectedState"
                value="World"
                id="world"
                class="custom-control-input"
              />
              <label for="world" class="custom-control-label">World</label>
            </div>

            <div class="custom-control custom-radio">
              <input
                type="radio"
                v-model="selectedState"
                value="Africa"
                id="africa"
                class="custom-control-input"
              />
              <label for="africa" class="custom-control-label">Africa</label>
            </div>

            <div class="custom-control custom-radio">
              <input
                type="radio"
                v-model="selectedState"
                value="AsiaPacific"
                id="asiaPacific"
                class="custom-control-input"
              />
              <label for="asiaPacific" class="custom-control-label"
                >Asia Pacific</label
              >
            </div>

            <div class="custom-control custom-radio">
              <input
                type="radio"
                v-model="selectedState"
                value="Europe"
                id="europe"
                class="custom-control-input"
              />
              <label for="europe" class="custom-control-label">Europe</label>
            </div>

            <div class="custom-control custom-radio">
              <input
                type="radio"
                v-model="selectedState"
                value="TheAmericans"
                id="theAmericans"
                class="custom-control-input"
              />
              <label for="theAmericans" class="custom-control-label"
                >Americans</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h5 class="text-center">Worksheet Cities</h5>
        <div style="height: 190px;  overflow-y: auto;" class="mb-3">
          <ul class="list-group" v-if="selectedCities.length > 0">
            <li
              class="list-group-item app--item text-center"
              v-for="(data, index) in selectedCities"
              :key="index"
              @click="handleRemoveCity(index)"
            >
              {{ data.city }}
            </li>
          </ul>
          <p v-else class="text-center">No cities selected</p>
        </div>

        <p class="text-center text-danger" v-if="message">{{ message }}</p>
        <p class="text-center">Remove a city by clicking on the city</p>
        <div class="custom-control custom-radio text-center">
          <input
            type="radio"
            v-model="temperatureType"
            value="celcius"
            id="celcius"
            class="custom-control-input"
          />
          <label for="celcius" class="custom-control-label">Celcius</label>
        </div>
        <div class="custom-control custom-radio text-center">
          <input
            type="radio"
            v-model="temperatureType"
            value="fahren"
            id="fahrenheit"
            class="custom-control-input"
          />
          <label for="fahrenheit" class="custom-control-label"
            >Fahrenheit</label
          >
        </div>
        <div class="mt-3 text-center d-flex justify-content-around">
          <button class="btn btn-outline-dark" @click="handleRandomPick">
            Random Pick
          </button>
          <button
            class="btn btn-outline-success"
            @click="handleOk"
            :disabled="selectedCities.length < 2"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    <div v-if="status === 1">
      <app-graph
        :selectedCities="selectedCities"
        :temperatureType="temperatureType"
        @newCities="
          status = 0;
          selectedIndex = -1;
          selectedCities = [];
        "
      ></app-graph>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Graph from "./Graph.vue";
import { pickNumber } from "../../common/utils";
export default {
  components: {
    appGraph: Graph
  },
  props: ["appData"],
  data: function() {
    return {
      selectedIndex: -1,
      sortedAppData: null,
      selectedState: null,
      temperatureType: "celcius",
      status: 0, // 0 - pick city, 1 - Enter the number of city
      selectedCities: [],
      message: ""
    };
  },
  watch: {
    selectedState(value) {
      if (value === "World") {
        this.sortedAppData = _.cloneDeep(this.appData);
      } else {
        this.sortedAppData = this.appData.filter(el => el.state === value);
      }
      this.sortedAppData.sort((a, b) => {
        return a.city.toLowerCase() < b.city.toLowerCase() ? -1 : 1;
      });
    }
  },
  methods: {
    handleSelectCity(e) {
      this.selectedIndex = e;
      for (let i = 0; i < this.sortedAppData.length; i++) {
        this.sortedAppData[i].selected = false;
      }
      this.sortedAppData[this.selectedIndex].selected = true;

      const selectedId = this.sortedAppData[this.selectedIndex].id;
      // console.log(selectedId);
      if (this.selectedCities.findIndex(city => city.id === selectedId) >= 0) {
        // Check if the city is selected
        this.message = `${
          this.sortedAppData[this.selectedIndex].city
        } is selected`;
        return;
      }
      this.message = "";
      if (this.selectedCities.length >= 6) {
        // If selected cities is equal or more than six
        this.selectedCities.shift();
      }
      this.selectedCities.push(this.sortedAppData[this.selectedIndex]);
    },
    handleRandomPick() {
      // Randomly select 6 cities.
      this.selectedCities = [];
      const indexForSelection = [];
      for (let i = 0; i < this.sortedAppData.length; i++) {
        indexForSelection.push(i);
      }
      for (let n = 1; n <= 6; n++) {
        const selectedIndex = pickNumber(0, indexForSelection.length - 1);
        this.selectedCities.push(
          this.sortedAppData[indexForSelection[selectedIndex]]
        );
        indexForSelection.splice(selectedIndex, 1);
      }
    },
    handleOk() {
      this.status = 1;
    },
    handleRemoveCity(index) {
      this.selectedCities.splice(index, 1);
    }
  },
  created() {
    this.sortedAppData = _.cloneDeep(this.appData);
    this.sortedAppData.sort((a, b) => {
      return a.city.toLowerCase() < b.city.toLowerCase() ? -1 : 1;
    });
  }
};
</script>

<style scoped>
.app--list {
  max-height: 450px;
  overflow-y: auto;
}
.app--item {
  padding: 2px 0 2px 10px;
  cursor: pointer;
}
</style>
