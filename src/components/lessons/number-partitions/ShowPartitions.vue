<template>
  <div class="container mt-3">
    <h3 class="text-center text-success mb-3">Show number partitions</h3>
    <div class="row">
      <div class="col-md-3">
        <h6>Enter a number to partion(1- 40)</h6>
        <input
          type="text"
          class="form-control"
          v-model.number="numberToPartion"
          @keypress="handleCheckNumber"
          :disabled="gameStatus!==0"
        />
        <div class="my-3 text-center">
          <button
            class="btn btn-outline-success"
            @click="handleOk"
            :disabled="numberToPartion > 40 || numberToPartion < 1"
            v-if="gameStatus === 0 || gameStatus===1"
          >OK</button>
          <button class="btn btn-outline-dark" @click="handleReset" v-if="gameStatus===2">Reset</button>
        </div>
        <div class="alert alert-danger" v-if="gameStatus===0">Enter a number between 1 and 40</div>
      </div>
      <div class="col-md-9">
        <div v-if="gameStatus===2" class="d-flex justify-content-around mb-4">
          <h6>{{ numberToPartion }}</h6>
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
import { partition, integerPartition, separateNumber, sumArray } from "./utils";
export default {
  data: function() {
    return {
      numberToPartion: null,
      partitions: [],
      gameStatus: 0,
      partitionsNumber: 0
    };
  },
  methods: {
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
      this.partitionsNumber = separateNumber(
        integerPartition(this.numberToPartion)
      );
      // let tableContainer = document.getElementById("app--table-container");
      partition(this.numberToPartion, p => {
        // eslint-disable-next-line no-console
        let sum = sumArray(p);
        console.log(p, "---", sum);
        let diff = sum - this.numberToPartion;
        p.splice(p.length - diff, diff);

        let arr = [...p];
        this.partitions.push(arr);
      });
      this.gameStatus = 2;
    },

    handleReset() {
      this.numberToPartion = null;
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
