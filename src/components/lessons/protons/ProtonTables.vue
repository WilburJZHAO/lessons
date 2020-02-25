<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Proton and anti-proton tables</h3>
    <div class="mt-3 row">
      <div class="col-md-10 app--grid">
        <table class="table table-bordered text-center" v-if="protonsGrid">
          <tr v-for="(row, i) in protonsGrid" :key="i" class="app--grid-row">
            <td v-for="(item, j) in row" :key="j" class="app--grid-item">
              <span v-if="i===0 && j===0" style="font-size: 25px;">{{item}}</span>
              <span v-else-if="item.show=== false">
                <input
                  type="text"
                  class="form-control"
                  v-model="item.answer"
                  @keypress="handleSetPress"
                  :disabled="item.check===true"
                  :class="item.check=== true ? 'text-success' : item.check===false ? 'text-danger' : ''"
                />
              </span>
              <span v-else-if="item.show ===true">{{ convertProton(item.number) }}</span>
            </td>
          </tr>
        </table>
        <div class="text-center text-danger">
          <span v-if="status===0">Complete the {{ operator === 1 ? 'addition' : 'subtraction'}} grid</span>
          <span v-if="status===1 && wrongEntriesCount===0" class="text-success">All entries correct</span>
          <span
            v-if="status===1 && wrongEntriesCount>0"
          >All entries checked. There is {{wrongEntriesCount}} error{{wrongEntriesCount>1 ? 's' : ''}}</span>
          <div v-if="status===2">
            <p>All entries correct.</p>
            <button class="btn btn-outline-dark" @click="handleNext">Tap here for new grid</button>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="d-flex flex-column align-items-center justify-content-center">
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="operator1"
              class="custom-control-input"
              v-model.number="operator"
              value="1"
              @click="handleNext"
              @change="handleNext"
              :disabled="status === 1"
            />
            <label for="operator1" class="custom-control-label">Addition</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="operator2"
              class="custom-control-input"
              v-model.number="operator"
              value="0"
              @click="handleNext"
              @change="handleNext"
              :disabled="status === 1"
            />
            <label for="operator2" class="custom-control-label">Subtraction</label>
          </div>
          <button @click="handleCheck" class="btn btn-outline-success mt-3">Check</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createProtonsGrid, convertInput, validateInput } from "./utils";
export default {
  data: function() {
    return {
      protonsGrid: null,
      operator: 1,
      status: 0
    };
  },
  computed: {
    wrongEntriesCount() {
      let count = 0;
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 5; j++) {
          if (this.protonsGrid[i][j].check === false) {
            count++;
          }
        }
      }
      return count;
    },
    isCompleteGrid() {
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 5; j++) {
          if (
            this.protonsGrid[i][j].check !== true &&
            this.protonsGrid[i][j].show === false
          ) {
            return false;
          }
        }
      }
      return true;
    }
  },
  methods: {
    convertProton(number) {
      if (number === 0) {
        return 0;
      } else if (number > 0) {
        return `${number}P`;
      } else {
        // number < 0
        return `${Math.abs(number)}A`;
      }
    },
    handleCheck() {
      this.status = 1;
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 5; j++) {
          if (i === 0 && j === 0) continue;
          if (this.protonsGrid[i][j].answer.trim() === "") continue;
          if (
            this.protonsGrid[i][j].show === false &&
            this.protonsGrid[i][j].check !== true
          ) {
            // Check if input is corect
            if (!validateInput(this.protonsGrid[i][j].answer)) {
              this.protonsGrid[i][j].check = false;
              continue;
            }
            // console.log(convertInput(this.protonsGrid[i][j].answer));
            if (
              convertInput(this.protonsGrid[i][j].answer) ===
              this.protonsGrid[i][j].number
            ) {
              this.protonsGrid[i][j].check = true;
            } else {
              this.protonsGrid[i][j].check = false;
            }
          }
        }
      }
      if (this.isCompleteGrid) {
        this.status = 2;
      }
    },
    handleNext() {
      this.protonsGrid = createProtonsGrid(this.operator);
      this.status = 0;
    },
    handleSetPress(e) {
      if (e.target.value.length >= 3) {
        e.preventDefault();
      }
      if (
        !(
          (e.charCode >= 48 && e.charCode <= 57) ||
          e.key === "a" ||
          e.key === "A" ||
          e.key === "p" ||
          e.key === "P"
        )
      ) {
        e.preventDefault();
      }
    }
  },
  created() {
    this.protonsGrid = createProtonsGrid(this.operator);
  }
};
</script>

<style scoped>
.form-control {
  padding: 0;
  border: none;
  text-align: center;
}
.app--grid-item {
  padding: 5px;
  vertical-align: center;
}
</style>
