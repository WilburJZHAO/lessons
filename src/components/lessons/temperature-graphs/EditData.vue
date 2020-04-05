<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Edit or add to city data</h3>
    <div class="row">
      <div class="col-lg-3">
        <div class="row">
          <div class="col-lg-8">
            <h5 class="text-center">City List</h5>
            <div class="app--list">
              <ul class="list-group">
                <li
                  class="list-group-item app--item"
                  :class="{
                    active: data.selected === true
                  }"
                  v-for="(data, index) in appData.data"
                  :key="index"
                  @click="handleSelectCity(index)"
                >{{ data.city }}</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 mt-3 mb-5" style="padding: 10px 0 0 5px;">
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
              <label for="asiaPacific" class="custom-control-label">Asia Pacific</label>
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
              <label for="theAmericans" class="custom-control-label">Americans</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th></th>
              <th>Jan</th>
              <th>Feb</th>
              <th>Mar</th>
              <th>Apr</th>
              <th>May</th>
              <th>Jun</th>
              <th>Jul</th>
              <th>Aug</th>
              <th>Sep</th>
              <th>Oct</th>
              <th>Nov</th>
              <th>Dec</th>
            </tr>
            <tbody v-if="temperatureType === 'celcius'">
              <tr>
                <th class="text-danger">Max</th>
                <td
                  v-for="(temperature, index) in inputData.celcius.max"
                  :key="index"
                  style="padding-left: 2px; padding-right: 2px;"
                >
                  <input
                    type="text"
                    class="form-control text-danger"
                    style="padding-left: 2px; padding-right: 2px;"
                    v-model.number="inputData.celcius.max[index]"
                    @focus="message = 'Enter the temperature value(50 to -30)'"
                  />
                </td>
              </tr>
              <tr>
                <th class="text-danger">Min</th>
                <td
                  v-for="(temperature, index) in inputData.celcius.min"
                  :key="index"
                  style="padding-left: 2px; padding-right: 2px;"
                >
                  <input
                    type="text"
                    class="form-control text-primary"
                    style="padding-left: 2px; padding-right: 2px;"
                    v-model.number="inputData.celcius.min[index]"
                    @focus="message = 'Enter the temperature value(50 to -30)'"
                  />
                </td>
              </tr>
            </tbody>
            <tbody v-if="temperatureType === 'fahren'">
              <tr>
                <th class="text-danger">Max</th>
                <td
                  v-for="(temperature, index) in inputData.fahren.max"
                  :key="index"
                  style="padding-left: 2px; padding-right: 2px;"
                >
                  <input
                    type="text"
                    class="form-control text-danger"
                    style="padding-left: 2px; padding-right: 2px;"
                    v-model.number="inputData.fahren.max[index]"
                    @focus="message = 'Enter the temperature value(122 to -22)'"
                  />
                </td>
              </tr>
              <tr>
                <th class="text-danger">Min</th>
                <td
                  v-for="(temperature, index) in inputData.fahren.min"
                  :key="index"
                  style="padding-left: 2px; padding-right: 2px;"
                >
                  <input
                    type="text"
                    class="form-control text-primary"
                    style="padding-left: 2px; padding-right: 2px;"
                    v-model.number="inputData.fahren.min[index]"
                    @focus="message = 'Enter the temperature value(122 to -22)'"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="width: 50%; margin: 0 auto;">
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
            <label for="fahrenheit" class="custom-control-label">Fahrenheit</label>
          </div>
          <input
            type="text"
            v-model="inputData.city"
            class="form-control text-center mt-3"
            @focus="message = 'Enter a city name'"
          />
          <div class="d-flex justify-content-around my-3">
            <button class="btn btn-outline-danger" @click="handleNew">New</button>
            <button class="btn btn-outline-success" @click="handleSave" :disabled="!validInput">Save</button>
          </div>
        </div>
        <div class="text-center text-danger" v-if="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { cToF, fToC, initInputData } from "./utils";
export default {
  props: ["appData"],
  data: function() {
    return {
      inputData: null,
      selectedState: null,
      selectedIndex: -1,
      temperatureType: "celcius",
      message: "",
      validInput: false
    };
  },
  computed: {
    editMode() {
      // if editMode is true, update the record; if editMode is false, add a record
      if (
        this.appData.data[this.selectedIndex] &&
        this.appData.data[this.selectedIndex].city.trim() ===
          this.inputData.city.trim()
      ) {
        return true;
      }
      return false;
    }
  },
  watch: {
    selectedState() {
      // console.log("ok");
      this.validInput = this.checkValidInput();
    },
    "inputData.city": {
      handler(value) {
        this.validInput = this.checkValidInput();
      }
    },
    "inputData.celcius.max": {
      handler(value) {
        value.forEach((data, index) => {
          this.inputData.fahren.max[index] = cToF(data);
        });
        this.validInput = this.checkValidInput();
      },
      deep: true
    },
    "inputData.celcius.min": {
      handler(value) {
        value.forEach((data, index) => {
          this.inputData.fahren.min[index] = cToF(data);
        });
        this.validInput = this.checkValidInput();
      },
      deep: true
    },
    "inputData.fahren.max": {
      handler(value) {
        value.forEach((data, index) => {
          this.inputData.celcius.max[index] = fToC(data);
        });
        this.validInput = this.checkValidInput();
      },
      deep: true
    },
    "inputData.fahren.min": {
      handler(value) {
        value.forEach((data, index) => {
          this.inputData.celcius.min[index] = fToC(data);
        });
        this.validInput = this.checkValidInput();
      },
      deep: true
    }
  },
  methods: {
    handleSelectCity(e) {
      this.selectedIndex = e;
      this.selectedState = "";
      // console.log(this.appData[selectedIndex]);
      for (let i = 0; i < this.appData.data.length; i++) {
        this.appData.data[i].selected = false;
      }
      this.appData.data[this.selectedIndex].selected = true;
      this.selectedState = this.appData.data[this.selectedIndex].state;
      this.inputData = _.cloneDeep(this.appData.data[this.selectedIndex]);
      this.message = "";
    },
    handleSave() {
      if (this.editMode) {
        // Update record
        this.inputData.state = this.selectedState;
        this.appData.data[this.selectedIndex] = this.inputData;
      } else {
        // Add a record
        this.inputData.selected = false;
        this.inputData.id = this.appData.data.length + 1;
        this.inputData.state = this.selectedState;
        this.appData.data.push(this.inputData);
        this.appData.data.sort((a, b) => {
          return a.city.toLowerCase() < b.city.toLowerCase() ? -1 : 1;
        });
      }
      localStorage.setItem("appData", JSON.stringify(this.appData));
      this.inputData = _.cloneDeep(initInputData);
    },
    handleNew() {
      this.inputData = _.cloneDeep(initInputData);
      this.selectedState = "";
      this.selectedIndex = -1;
      this.message = "";
    },
    checkValidInput() {
      if (!this.selectedState) {
        return false;
      }
      if (!this.inputData.city.trim()) {
        return false;
      }
      for (let i = 0; i < 12; i++) {
        // Range for celcius: -30 - 50
        if (
          typeof this.inputData.celcius.max[i] === "string" ||
          typeof this.inputData.celcius.min[i] === "string" ||
          this.inputData.celcius.max[i] < -30 ||
          this.inputData.celcius.max[i] > 50 ||
          this.inputData.celcius.min[i] < -30 ||
          this.inputData.celcius.min[i] > 50 ||
          this.inputData.celcius.max[i] <= this.inputData.celcius.min[i]
        ) {
          return false;
        }
        if (
          // Range for fahrenheir: -22 - 122
          typeof this.inputData.fahren.max[i] === "string" ||
          typeof this.inputData.fahren.min[i] === "string" ||
          this.inputData.fahren.max[i] < -22 ||
          this.inputData.fahren.max[i] > 122 ||
          this.inputData.fahren.min[i] < -22 ||
          this.inputData.fahren.min[i] > 122 ||
          this.inputData.fahren.max[i] <= this.inputData.fahren.min[i]
        ) {
          return false;
        }
      }
      return true;
    }
  },
  created() {
    this.inputData = _.cloneDeep(initInputData);
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
