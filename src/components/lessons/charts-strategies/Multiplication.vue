<template>
  <div>
    <transition
      appear
      appear-class="app-appear"
      appear-active-class="app-appear-active"
    >
      <div class="container mt-4 mb5">
        <h3 class="lesson-subheading">Multiplication</h3>
        <hr class="subheading-separator">
        <div class="row" style="max-width: 100%">
          <!-- Left part -->
          <div class="col-12 col-md-6 app--lesson-left" style="max-width: 60%">
            <div style="text-align: left;max-width: 70%">
              <h3>Choose the grid size</h3>
              <br />
              <select
                id="gridSize"
                style="width:10vw;font-size: 1.5vw"
                v-model="selected"
                v-on:change="generateTable()"
              >
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option> </select
              ><br /><br />
              <h5>Complete the multiplication grid</h5>
              <br />
              <div
                v-if="alertMessage"
                :class="isAlert ? 'alert alert-success' : 'alert alert-danger'"
              >
                {{ alertMessage }}
              </div>

              <table
                id="tableMul"
                class="col-lg-12 col-md-10 col-sm-6"
                style="color: #004488; text-align: center;visibility: visible; border: #7f8c8d solid;background: white;"
              >
                <tr v-for="i in selected + 1">
                  <td
                    v-for="j in selected + 1"
                    :style="
                      (j == 1 && i != 1) || (i == 1 && j != 1)
                        ? 'width: 4vw; height: 4vw; background: rgba(165, 220, 255, 1)'
                        : 'width: 4vw; height: 4vw;'
                    "
                  >
                    <b v-if="i == 1 && j == 1"><span style="color: black">x</span></b>
                    <b
                      v-else-if="
                        i === 1 && j === c[0] + 1 && randomIndex === 'r'
                      "
                      >{{ arrSimpleOne[j - 2] }}</b
                    >
                    <b
                      v-else-if="
                        j === 1 && i === r[0] + 1 && randomIndex === 'c'
                      "
                      >{{ arrSimpleTwo[i - 2] }}</b
                    >
                    <b v-else-if="i == r[0] + 1 && j == c[0] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[0] + 1 && j == c[1] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[1] + 1 && j == c[1] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[1] + 1 && j == c[2] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[2] + 1 && j == c[2] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[2] + 1 && j == c[3] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[3] + 1 && j == c[3] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>
                    <b v-else-if="i == r[3] + 1 && j == c[4] + 1">{{
                      arrSimpleTwo[i - 2] * arrSimpleOne[j - 2]
                    }}</b>

                    <b v-else-if="i == 1 && j != 1"
                      ><input
                        :ref="i * 10 + j"
                        v-model="inputNum[i * 10 + j]"
                        v-on:input="checkNum(i, j, inputNum[i * 10 + j])"
                        style="width: 3.5vw; height: 3.5vw;background: rgba(165, 220, 255, 1); border: 0px"
                    /></b>
                    <b v-else-if="j == 1 && i != 1"
                      ><input
                        :ref="i * 10 + j"
                        v-model="inputNum[i * 10 + j]"
                        v-on:input="checkNum(i, j, inputNum[i * 10 + j])"
                        style="width: 3.5vw; height: 3.5vw;background: rgba(165, 220, 255, 1); border: 0px"
                    /></b>
                    <b v-else
                      ><input
                        :ref="i * 10 + j"
                        v-model="inputNum[i * 10 + j]"
                        v-on:input="checkNum(i, j, inputNum[i * 10 + j])"
                        style="width: 3.5vw; height: 3.5vw; border: 0px"
                    /></b>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- Right part -->
          <div
            class="col-12 col-md-6 app--lesson-right"
            ref="qqq"
            style="padding-left: 200px;overflow: visible; max-width: 30%"
          >
            <div class="tt-right-box"></div>
            <div>
              <br /><br /><br /><br />
              <div
                style="font-size: 1vw;color: #0f0f0f;position: relative"
              >
                <button
                  v-if="resetNow === false"
                  v-on:click="check()"
                  id="ok"
                  class="btn btn-outline-success"
                  style="margin: auto"
                >
                  Check
                </button>
                <button
                  v-if="resetNow === true"
                  v-on:click="reset()"
                  id="rs"
                  class="btn btn-outline-success"
                  style="margin: auto; width: 110px"
                >
                  New game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tbl_rows: 2,
      tbl_columns: 2,
      selected: "",
      alertMessage: "",
      startTime: "",
      resetNow: false,
      isAlert: false,
      cur: [],
      inputNum: [],
      options: [
        {
          text: "2 by 2",
          value: 2
        },
        {
          text: "3 by 3",
          value: 3
        },
        {
          text: "4 by 4",
          value: 4
        }
      ],
      arrSimpleOne: [],
      arrSimpleTwo: [],
      randomTable: [],
      r: [],
      c: [],
      crtNum: 0,
      checkRow: [],
      checkCol: [],
      checkVal: [],
      correctNum: [],
      randomIndex: ""
    };
  },
  created() {
    this.selected = this.options[0].value;
  },
  mounted: function() {
    // disable spellcheck in all input boxes
    let inputFields = document.getElementsByTagName("input");
    for(var i = 0; i < inputFields.length; i++){
        inputFields[i].setAttribute("spellcheck", "false");
    }

    this.start();
  },
  methods: {
    start() {
      document
        .getElementById("tableMul")
        .rows[0].cells[0].setAttribute(
          "style",
          "width: 4vw; height: 4vw; background: #ffeaa5"
        );
      this.generateTable();
    },
    randomsort() {
      return Math.random() > 0.5 ? -1 : 1;
    },
    generateTable: function() {
      for (let i = 0; i < this.checkRow.length; i++) {
        let index = this.checkRow[i] * 10 + this.checkCol[i];
        this.$refs[index][0].classList.remove("red");
        this.$refs[index][0].classList.remove("g");
      }
      let a = Math.random() * 10;
      this.randomIndex = "";
      if (a > 5) {
        this.randomIndex = "c";
      } else {
        this.randomIndex = "r";
      }
      this.checkVal = [];
      this.checkRow = [];
      this.checkCol = [];
      this.correctNum = [];
      this.alertMessage = "";
      this.startTime = "";
      this.resetNow = false;
      this.isAlert = false;
      this.inputNum = [];
      var i = this.selected;
      this.arrSimpleOne = [];
      this.arrSimpleTwo = [];
      this.r = [];
      this.c = [];
      for (let s = 0; s < i; s++) {
        this.r.push(s + 1);
        this.c.push(s + 1);
      }
      this.r.sort(this.randomsort);
      this.c.sort(this.randomsort);
      for (let m = 0; m < i; m++) {
        let random = Math.floor(Math.random() * 5) + 1;
        let random2 = Math.floor(Math.random() * 5) + 1;
        this.arrSimpleOne.push(random);
        this.arrSimpleTwo.push(random2);
      }
    },
    check: function() {
      this.correctNum = [];
      this.alertMessage = "";
      this.isAlert = false;
      let l;
      for (let i = 0; i < this.checkVal.length; i++) {
        let index = this.checkRow[i] * 10 + this.checkCol[i];
        if (this.checkRow[i] === 1) {
          if (this.checkVal[i] === this.arrSimpleOne[this.checkCol[i] - 2]) {
            if (this.$refs[index][0].classList.value === "red") {
              this.$refs[index][0].classList.replace("red", "g");
            } else {
              this.$refs[index][0].classList.add("g");
            }
            this.correctNum[i] = "g";
          } else {
            if (this.$refs[index][0].classList.value === "g") {
              this.$refs[index][0].classList.replace("g", "red");
            } else {
              this.$refs[index][0].classList.add("red");
            }
            this.correctNum[i] = "red";
          }
        } else if (this.checkCol[i] === 1) {
          if (this.checkVal[i] === this.arrSimpleTwo[this.checkRow[i] - 2]) {
            if (this.$refs[index][0].classList.value === "red") {
              this.$refs[index][0].classList.replace("red", "g");
            } else {
              this.$refs[index][0].classList.add("g");
            }
            this.correctNum[i] = "g";
          } else {
            if (this.$refs[index][0].classList.value === "g") {
              this.$refs[index][0].classList.replace("g", "red");
            } else {
              this.$refs[index][0].classList.add("red");
            }
            this.correctNum[i] = "red";
          }
        } else {
          if (
            this.checkVal[i] ===
            this.arrSimpleOne[this.checkCol[i] - 2] *
              this.arrSimpleTwo[this.checkRow[i] - 2]
          ) {
            if (this.$refs[index][0].classList.value === "red") {
              this.$refs[index][0].classList.replace("red", "g");
            } else {
              this.$refs[index][0].classList.add("g");
            }
            this.correctNum[i] = "g";
          } else {
            if (this.$refs[index][0].classList.value === "g") {
              this.$refs[index][0].classList.replace("g", "red");
            } else {
              this.$refs[index][0].classList.add("red");
            }
            this.correctNum[i] = "red";
          }
        }
      }
      l = this.selected * this.selected;
      let countA = 0;
      if (this.correctNum.length === l) {
        for (let a = 0; a < this.correctNum.length; a++) {
          if (this.correctNum[a] === "g") {
            countA++;
          }
        }
        if (countA === l) {
          var end = new Date().getTime();
          var secDuration = Math.round((end - this.startTime) / 1000);
          this.isAlert = true;
          this.alertMessage = "All entries are correct. Completion time: "+ secDuration +" seconds";
          this.resetNow = true;
        } else {
          let nnn = l - countA;
          if(nnn === 1){
            this.alertMessage =
                    "All entries are checked. There is 1 error.";
          }else{
            this.alertMessage =
                    "All entries are checked. There are " +
                    nnn +
                    " errors.";
          }
        }
      } else {
        for (let a = 0; a < this.correctNum.length; a++) {
          if (this.correctNum[a] === "red") {
            countA++;
          }
        }
        if(countA === 1){
          this.alertMessage =
                  "All entries are checked. There is 1 error.";
        }else if(countA > 1){
          this.alertMessage =
                  "All entries are checked. There are " +
                  countA +
                  " errors.";
        }else{
          this.isAlert = true;
          this.alertMessage = "All entries correct";
        }
      }
    },
    checkNum: function(r, c, num) {
      if (this.startTime === "") {
        this.startTime = new Date().getTime();
      }
      if (num == "") {
        return;
      } else {
        for (var i = 0; i < this.checkRow.length; i++) {
          if (this.checkRow[i] == r && this.checkCol[i] == c) {
            let index = r * 10 + c;
            this.$refs[index][0].classList.remove("red");
            this.$refs[index][0].classList.remove("g");
            this.checkVal[i] = parseInt(num);
            return;
          }
        }
        this.checkRow.push(r);
        this.checkCol.push(c);
        this.checkVal.push(parseInt(num));
      }
    },
    reset: function() {
      this.alertMessage = "";
      for (var i = 0; i < this.checkRow.length; i++) {
        let index = this.checkRow[i] * 10 + this.checkCol[i];
        this.$refs[index][0].classList.remove("red");
        this.$refs[index][0].classList.remove("g");
      }
      this.generateTable();
    }
  }
};
</script>

<style scoped>
.g {
  color: #35b247;
}

.red {
  color: brown;
}

td {
  border: #7f8c8d solid;
  padding: 0px;
  width: 4vw;
  height: 4vw;
  font-size: 30px;
}

input {
  text-align: center;
}
</style>
