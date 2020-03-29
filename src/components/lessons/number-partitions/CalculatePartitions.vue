<template>
  <div class="container mt-3">
    <h3 class="text-center text-success">Calculate the number of partitions</h3>
    <div class="row">
      <div class="col-md-3">
        <h6>Enter a number to partition:</h6>
        <input
          type="text"
          class="form-control"
          v-model.number="numberToPartition"
          @keypress="handleCheckNumber"
        />
        <div class="my-3 text-center">
          <button
            class="btn btn-outline-success"
            @click="handleOk"
            :disabled="numberToPartition > 500 || numberToPartition < 1"
          >OK</button>
        </div>
        <div class="alert alert-danger">Enter a number between 1 and 500</div>
      </div>
      <div class="col-md-9">
        <div class="d-flex justify-content-around" v-if="partitionsNumber">
          <h5 class="text-primary">{{ numberToPartitionResult }}</h5>
          <h5 class="text-primary">{{ partitionsNumber }} partitions</h5>
        </div>
        <div>
          <p
            style="margin-top:150px;text-align:center;font-size:20px; "
          >How to calculate the number of partitions recursively.</p>
          <p style="text-align:center;font-size:20px; ">
            p(n) = &#8721; (-1)
            <sup>k-1</sup>p(n - k(3k - 1)/2) (k &ne; 0)
          </p>
          <p style="text-align:center;font-size:20px; ">
            where the summation is over all nonzero integeers k (positive and
            negative) and p(m) is taken to be 0 if m &lt; 0.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  integerPartition,
  separateNumber /*, bigIntegerPartition*/
} from "./utils";
export default {
  data: function() {
    return {
      numberToPartition: null,
      partitionsNumber: null,
      numberToPartitionResult: null
    };
  },
  methods: {
    handleCheckNumber(e) {
      let { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 3) {
        e.preventDefault();
      }
    },
    handleOk() {
      // if (this.numberToPartition <= 300) {
      // } else {
      //   // this.partitionsNumber = String(
      //   //   bigIntegerPartition[this.numberToPartition - 300 - 1]
      //   // );
      //   this.partitionsNumber = integerPartition(this.numberToPartition);
      //   // let temp = bigIntegerPartition[this.numberToPartition - 300 - 1];
      //   // return temp;
      // }
      this.partitionsNumber = separateNumber(
        integerPartition(this.numberToPartition)
      );
      this.numberToPartitionResult = this.numberToPartition;
    }
  }
};
</script>

<style scoped></style>
