<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Enter your number</h3>
    <hr class="subheading-separator">

    <div style="display: flex; flex-direction: row">
      <div>
        <table>
          <tr>
            <td>
              <h4 class="text-success">
                <b id="error" style="">Please enter a number to begin</b>
              </h4>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="height: 20px"></div>
    <div class="row">
      <div class="col-md-6 pb-4">
        <div style="margin-left: 20px;">
          <label id="instruction" class="instructionLabel"
            >Enter an even number greater than 2</label
          >
        </div>
        <div
          style="margin-left: 20px; margin-top: 10px; display:flex; flex-direction: row;"
        >
          <div>
            <input v-model="enterNum" type="text" id="inputNumber" />
          </div>
          <div>
            <input
              class="btn btn-outline-success"
              style="width: 70px; font-weight: bold; margin-left: 20px"
              type="button"
              id="buttonOk"
              value="OK"
              @click="okClicked()"
            />
          </div>
          <div>
            <input
              class="btn btn-outline-success"
              style="width: 70px; font-weight: bold; margin-left: 20px"
              type="button"
              id="buttonReset"
              value="Reset"
              @click="reset()"
            />
          </div>
        </div>

        <div style="margin-left: 20px; margin-top: 40px">
          <label
            id="instructionDetail"
            class="instructionLabel"
            style="color:grey"
            >Every even number, greater than two, can be written as the sum of
            two primes</label
          >
        </div>
      </div>
<!--      <div style="width: 10%"></div>-->
      <div class="col-md-6">
        <div class="table-wrapper-scroll-y" v-if="isSet" id="scroller">
          <table id="mainTable" v-if="isSet" class="table table-bordered table-striped" style="text-align: center">
            <thead>
              <tr>
                <th style="text-align: center" scope="col">Number</th>
                <th style="text-align: center" colspan="2">Pairs</th>
              </tr>
              <tr v-for="i in isSet ? pairs.length : 0">
                <td style="color: brown"><b>
                  {{ index[i - 1][0] ? parseInt(index[i - 1][1]) : "" }}</b>
                </td>
                <td>{{ pairs[i - 1][0] }}</td>
                <td>{{ pairs[i - 1][1] }}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPrimes, getPairs } from "./utils";
export default {
  data: function() {
    return {
      enterNum: "",
      firstNum: "",
      displayNum: [],
      pairs: [],
      pair: [],
      isSet: false,
      index: [],
      time: 0,
      display: [0]
    };
  },
  mounted: function() {},
  updated: function() {
    this.$nextTick(function() {
      var div = document.getElementById('scroller');
      div.scrollTop = div.scrollHeight;
    })
  },
  methods: {
    okClicked() {
      this.index = [];
      if (this.time === 0) {
        this.firstNum = this.enterNum;
      }
      if (
        this.enterNum === "" ||
        parseInt(this.enterNum) % 2 !== 0 ||
        parseInt(this.enterNum) <= 2
      ) {
        document.getElementById("error").innerHTML =
          "Please enter even number greater than 2";
        return;
      }
      let n = parseInt(this.enterNum);
      let primes = getPrimes(n);
      this.pair = getPairs(n, primes);
      for (let i = 0; i < this.pair.length; i++) {
        this.pairs.push(this.pair[i]);
      }
      this.display.push(this.pairs.length);
      this.displayNum.push([this.enterNum]);
      for (let i = 0; i < this.pairs.length; i++) {
        this.index.push(false);
      }
      for (let i = 0; i < this.display.length; i++) {
        this.index[this.display[i]] = [true, this.displayNum[i]];
      }
      this.isSet = true;
      document.getElementById("error").innerHTML =
              "Please enter a number to begin";
      this.enterNum= "";
    },
      reset(){
          this.enterNum= "";
              this.firstNum= "";
              this.displayNum= [];
              this.pairs= [];
              this.pair= [];
              this.isSet= false;
              this.index= [];
              this.time= 0;
              this.display= [0];
          document.getElementById("error").innerHTML =
              "Please enter a number to begin";
      }
  },
  name: "EnterYourNumber"
};
</script>

<style scoped>
.table-wrapper-scroll-y {
  display: block;
  max-height: 600px;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>
