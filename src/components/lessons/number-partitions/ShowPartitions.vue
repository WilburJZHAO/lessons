<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Show number partitions</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-3">
        <h6>Enter a number to partition:</h6>
        <input
          type="text"
          class="form-control"
          v-model.number="numberToPartition"
          @keypress="handleCheckNumber"
          :disabled="gameStatus!==0"
        />
        <div class="my-3 text-center">
          <button
            class="btn btn-outline-success"
            @click="handleOk"
            :disabled="numberToPartition > 40 || numberToPartition < 1"
            v-if="gameStatus === 0 || gameStatus===1"
          >OK</button>
          <button class="btn btn-outline-dark" @click="handleReset" v-if="gameStatus===2">Reset</button>
        </div>
        <div class="alert alert-danger" v-if="gameStatus===0">Enter a number between 1 and 40</div>
      </div>
      <div class="col-md-9">
        <div v-if="gameStatus===2" class="d-flex justify-content-around mb-4">
          <h6>{{ numberToPartition }}</h6>
          <h6>{{ partitionsNumber }} partitions</h6>
        </div>
        <div class="app--table-container">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(item, index) in partitions"
              :key="index"
            >{{ item.join(' + ') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { partition, integerPartition, sumArray } from "./utils";
import { legify } from "../../common/utils.js";
export default {
  data: function() {
    return {
      numberToPartition: null,
      partitions: [],
      gameStatus: 0,
      partitionsNumber: 0
    };
  },
  methods: {
    legify,
    handleCheckNumber(e) {
      let { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 2) {
        e.preventDefault();
      }
    },
    handleOk() {
      this.gameStatus = 1;
      this.partitions.push([this.numberToPartition]); // add the first partition
      this.partitionsNumber = legify(integerPartition(this.numberToPartition));

      // let tableContainer = document.getElementById("app--table-container");
      partition(this.numberToPartition, p => {
        // eslint-disable-next-line no-console
        let sum = sumArray(p);
        // console.log(p, "---", sum);
        let diff = sum - this.numberToPartition;
        p.splice(p.length - diff, diff);

        let arr = [...p];
        this.partitions.push(arr);
      });
      this.gameStatus = 2;
    },

    handleReset() {
      this.numberToPartition = null;
      this.partitions = [];
      this.gameStatus = 0;
    }
  }
};
</script>

<style scoped>
.app--table-container {
  max-height: 500px;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
