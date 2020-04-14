<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Finding the maximum volume</h3>
    <hr class="subheading-separator">
    <app-input-panel v-if="!paperSize" @setPaperSize="paperSize=$event"></app-input-panel>
    <div v-if="paperSize">
      <h5
        class="text-center text-success"
      >A piece of paper has a fixed area. What height will give the maximum volume?</h5>
      <div class="row mt-3">
        <div class="col-md-6">
          <table class="table text-center" style="table-layout: fixed;">
            <tr>
              <th>
                Area (cm
                <sup>2</sup>)
              </th>
              <td>{{ legify(area) }}</td>
            </tr>
            <tr>
              <th>Paper height (cm)</th>
              <td>{{ legify(height) }}</td>
            </tr>
            <tr>
              <th>Paper width (cm)</th>
              <td>{{ legify(width) }}</td>
            </tr>
            <tr>
              <th>Current height (cm)</th>
              <td>{{ legify(Math.round(currentHeight * 100) / 100) }}</td>
            </tr>
            <tr>
              <th></th>
              <td>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="increase"
                    name="incDec"
                    :value="1"
                    v-model="incDec"
                  />
                  <label for="increase" class="form-check-label">Increase height</label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="decrease"
                    name="incDec"
                    :value="-1"
                    v-model="incDec"
                  />
                  <label for="decrease" class="form-check-label">Decrease height</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>Enter increment (cm)</th>
              <td>
                <input class="form-control" name="increment" v-model="increment" type="number" />
                <br />
                <button
                  class="btn btn-outline-success"
                  @click="handleOK"
                  :disabled="!isValidInput"
                >OK</button>
                <p class="text-danger mt-2">
                  {{ incDec > 0 ?
                  "Enter a positive number equal or less than 10"
                  : "Enter a positive number less than or equal to the current height"
                  }}
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-md-6">
          <table class="table table-bordered text-center">
            <tr>
              <th>Height (cm)</th>
              <th>Radius (cm)</th>
              <th>Volume (L)</th>
            </tr>
            <tr
              v-for="(data, index) in resultArr"
              :key="index"
              :class="{'table-primary': index===maxIndex }"
            >
              <td>{{ legify(Math.round(data.height * 100) / 100) }}</td>
              <td>{{ legify(data.radius, 2) }}</td>
              <td>{{ legify(data.volume, 2) }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputPanel from "./InputPanel.vue";
import { calculateRadius, calculateArea, calculateVolume } from "./utils";
import { legify } from "../../common/utils.js";

export default {
  components: {
    appInputPanel: InputPanel
  },
  data: function() {
    return {
      paperSize: null,
      currentHeight: 0,
      incDec: 1,
      increment: null,
      resultArr: [],
      maxIndex: -1
    };
  },
  watch: {
    paperSize(value) {
      if (value) {
        this.currentHeight = this.paperSize.length;
        const [height, radius, volume] = this.calculate(this.currentHeight);
        this.resultArr.push({
          height,
          radius: radius,
          volume: volume
        });
      } else {
        this.currentHeight = 0;
        this.resultArr = [];
        this.maxIndex = -1;
        this.increment = null;
        this.incDec = 1;
      }
    }
  },
  computed: {
    height() {
      return this.paperSize ? this.paperSize.length : 0;
    },
    width() {
      return this.paperSize ? this.paperSize.width : 0;
    },
    area() {
      return this.paperSize ? this.paperSize.length * this.paperSize.width : 0;
    },
    isValidInput() {
      if (this.incDec > 0 && this.increment > 0 && this.increment < 10) {
        return true;
      }
      if (
        this.incDec < 0 &&
        this.increment > 0 &&
        this.increment <= this.currentHeight
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    legify,
    handleOK() {
      if (!this.isValidInput) {
        return;
      }
      this.resultArr = [];
      //  this.currentHeight = this.height;
      let count = 0;
      while (count <= 11 && this.currentHeight > 0) {
        const [height, radius, volume] = this.calculate(this.currentHeight);
        this.resultArr.push({
          height: height,
          radius: radius,
          volume: volume
        });
        count++;
        if (count >= 11) {
          break;
        }
        let nextCurrentHeight = (this.currentHeight + this.incDec * this.increment);
        if (nextCurrentHeight <= 0) {
          break;
        }
        this.currentHeight = nextCurrentHeight;
      }

      let maxVolume = this.resultArr[0].volume;
      let maxIndex = 0;
      for (let i = 0; i < this.resultArr.length; i++) {
        if (this.resultArr[i].volume > maxVolume) {
          maxIndex = i;
          maxVolume = this.resultArr[i].volume;
        }
      }
      this.maxIndex = maxIndex;
    },
    calculate(height) {
      let width = this.area / height;
      let radius = calculateRadius(width);
      let area = calculateArea(radius);
      let volume = calculateVolume(area, height) / 1000;
      return [height, radius, volume];
    }
  }
};
</script>

<style scoped></style>
