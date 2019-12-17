<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Show The Fraction</h3>

    <div style="display: flex; flex-direction: row; margin-left: 10%">
      <div>
        <table>
          <tr>
            <td>
              <h6 class="text-success">
                <b id="error2"
                  >Please enter the number of rows, columns to start (2-12)</b
                >
              </h6>
            </td>
            <td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                name="Reset"
                @click="reset()"
                class="btn btn-outline-success"
                id="resetBt"
                v-if="count == 4"
              >
                Tap here for new question
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="height: 20px"></div>
    <div class="row">
      <div class="col-md-6 pb-4">
      <div style="width: 60%;position: center; margin-left: 20%">
        <div align="center" style="border: 1px #0f0f0f solid; margin-left: 10%">
          <div>
            <p id="change" class="chain-text"></p>
            <p>Click on rows, columns or cells to show</p>
          </div>

          <div class="row" style="margin-left: 40%">
            <div width="40%">
              <b
                ><p
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ numeratorOne }}
                </p></b
              >
              <b
                ><p
                  v-if="denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorOne + 1 }}
                </p>
                <p
                  v-else
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorOne }}
                </p></b
              >
            </div>
            <div style="width: 3%"></div>
            <div>
              &nbsp;
              <b><p style="color: #0f0f0f">+</p></b>
            </div>
            <div style="width: 3%"></div>
            <div>
              <b
                ><p
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ numeratorTwo }}
                </p></b
              >
              <b
                ><p
                  v-if="denominatorTwo == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo + 1 }}
                </p>
                <p
                  v-else
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo }}
                </p></b
              >
            </div>
          </div>
          <div
            style="margin-top: 10%;width: 100%;"
            :style="{
              visibility: count == 3 || count == 4 ? 'visible' : 'hidden'
            }"
          >
            <b
              ><p>
                = {{ numeratorOne }} {{ numeratorOne === 1 ? "row" : "rows" }} +
                {{ numeratorTwo }}
                {{ numeratorTwo === 1 ? "column" : "columns" }}
              </p></b
            >
          </div>
          <div
            class="row"
            style="margin-left: 26%;"
            :style="{ visibility: count == 4 ? 'visible' : 'hidden' }"
          >
            <div style="width: 3%"></div>
            <div>
              &nbsp;
              <b><p style="color: #0f0f0f">=</p></b>
            </div>
            <div style="width: 3%"></div>
            <div width="40%">
              <b
                ><p
                  v-if="denominatorTwo == 1"
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ numeratorOne * (denominatorTwo + 1) }}
                </p>
                <p
                  v-else
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ numeratorOne * denominatorTwo }}
                </p>
              </b>
              <b
                ><p
                  v-if="denominatorTwo == 1 && denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ (denominatorTwo + 1) * (denominatorOne + 1) }}
                </p>
                <p
                  v-else-if="denominatorTwo != 1 && denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo * (denominatorOne + 1) }}
                </p>
                <p
                  v-else-if="denominatorTwo == 1 && denominatorOne != 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ (denominatorTwo + 1) * denominatorOne }}
                </p>
                <p
                  v-else
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo * denominatorOne }}
                </p></b
              >
            </div>
            <div style="width: 3%"></div>
            <div>
              &nbsp;
              <b><p style="color: #0f0f0f">+</p></b>
            </div>
            <div style="width: 3%"></div>
            <div>
              <b
                ><p
                  v-if="denominatorOne == 1"
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ numeratorTwo * (denominatorOne + 1) }}
                </p>
                <p
                  v-else
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ numeratorTwo * denominatorOne }}
                </p>
              </b>
              <b
                ><p
                  v-if="denominatorTwo == 1 && denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ (denominatorTwo + 1) * (denominatorOne + 1) }}
                </p>
                <p
                  v-else-if="denominatorTwo != 1 && denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo * (denominatorOne + 1) }}
                </p>
                <p
                  v-else-if="denominatorTwo == 1 && denominatorOne != 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ (denominatorTwo + 1) * denominatorOne }}
                </p>
                <p
                  v-else
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo * denominatorOne }}
                </p></b
              >
            </div>
          </div>
          <div
            class="row"
            style="margin-left: 26%"
            :style="{ visibility: count == 4 ? 'visible' : 'hidden' }"
          >
            <div style="width: 3%"></div>
            <div>
              &nbsp;
              <b><p style="color: #0f0f0f">=</p></b>
            </div>
            <div style="width: 3%"></div>
            <div width="40%">
              <b
                ><p
                  v-if="denominatorTwo == 1 && denominatorOne != 1"
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{
                    numeratorOne * (denominatorTwo + 1) +
                      numeratorTwo * denominatorOne
                  }}
                </p>
                <p
                  v-else-if="denominatorTwo != 1 && denominatorOne == 1"
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{
                    numeratorOne * denominatorTwo +
                      numeratorTwo * (denominatorOne + 1)
                  }}
                </p>
                <p
                  v-else-if="denominatorTwo != 1 && denominatorOne != 1"
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{
                    numeratorOne * denominatorTwo +
                      numeratorTwo * denominatorOne
                  }}
                </p>
                <p
                  v-else
                  style="margin:0;border-bottom: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{
                    numeratorOne * (denominatorTwo + 1) +
                      numeratorTwo * (denominatorOne + 1)
                  }}
                </p>
              </b>
              <b
                ><p
                  v-if="denominatorTwo == 1 && denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ (denominatorTwo + 1) * (denominatorOne + 1) }}
                </p>
                <p
                  v-else-if="denominatorTwo != 1 && denominatorOne == 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo * (denominatorOne + 1) }}
                </p>
                <p
                  v-else-if="denominatorTwo == 1 && denominatorOne != 1"
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ (denominatorTwo + 1) * denominatorOne }}
                </p>
                <p
                  v-else
                  style="margin: 0;border-top: #0f0f0f solid; font-size: 25px; color: brown"
                >
                  {{ denominatorTwo * denominatorOne }}
                </p></b
              >
            </div>
          </div>
          <div style="margin-top: 20px"></div>
          <button
            v-if="count == 1"
            @click="checkRow()"
            class="btn btn-outline-success"
          >
            OK
          </button>
          <button
            v-if="count == 2"
            @click="checkCol()"
            class="btn btn-outline-success"
          >
            OK
          </button>
          &nbsp;
          <button
            @click="resetEnter()"
            class="btn btn-outline-success"
            :style="{
              visibility:
                count == 1 || count == 2 || count == 3 ? 'visible' : 'hidden'
            }"
          >
            reset
          </button>
          <div style="margin-top: 5%"></div>
        </div>
        <div align="center" style="margin-left: 10%">
          <b id="error1" style="color: red">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </b>
        </div>
      </div>
      </div>


      <div class="col-md-6" id="table" >
      <div style="width: 100%; margin-top: 17px;">
        <div class="instructionLabel" v-if="!isSet">
          <p>
            Please enter your grid size
          </p>
          <p class="chain-text">
            Enter rows:
            <input
              id="rows"
              v-model.number="length"
              style=" width: 50px"
              class="inputLabel"
            />
          </p>
          <p class="chain-text">
            Enter columns:
            <input
              id="columns"
              v-model.number="width"
              style=" width: 50px"
              class="inputLabel"
            />
          </p>
          <table>
            <tr>
              <td>
                <button
                  id="ok"
                  @click="createTable()"
                  class="btn btn-outline-success"
                >
                  OK
                </button>
              </td>
              <td>
                <p id="error" style="color: red">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div style="width:100%; height: auto">
          <table
            v-if="isSet"
            id="table1"
            style="border: #0f0f0f solid; text-align: center;"
            v-bind:style="{ fontSize: fontSize }"
          >
            <tbody id="tbody1">
              <tr v-for="i in length + 2">
                <td
                  v-for="j in width + 2"
                  @click="change($event, i, j)"
                  style="color: white"
                  v-bind:style="
                    j == 1 || i == 1 || j == width + 2 || i == length + 2
                      ? 'height: 20px; width: 20px; background: red'
                      : {
                          height: font,
                          width: font,
                          border: '1px solid #0f0f0f',
                          color: '#0f0f0f'
                        }
                  "
                >
                  <b
                    >{{
                      i == Math.round((length + 2) / 2) && j == 1
                        ? length + "R"
                        : ""
                    }}{{
                      j == Math.round((width + 2) / 2) && i == 1
                        ? width + "C"
                        : ""
                    }}</b
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="height: 20px"></div>
        <div>
          <table>
            <tr>
              <td>
                <b v-if="isSet" id="number" style="text-align: left">
                  Total number of cells =
                  <input
                    v-model="cells"
                    id="res"
                    style="width:50px; text-align: center"
                  />
                </b>
              </td>
              <td>
                &nbsp;
                <button
                  id="finalOk"
                  v-if="isFinal1"
                  @click="checkRes()"
                  class="btn btn-outline-success"
                >
                  OK
                </button>
              </td>
              <td>
                <b id="error3" style="color: red;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </b>
              </td>
            </tr>
          </table>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      denominatorOne: Math.round(Math.random() * 10) + 1,
      denominatorTwo: Math.round(Math.random() * 10) + 1,
      width: null,
      length: null,
      countClick: 0,
      isSet: false,
      isButton: false,
      cells: "",
      isFinal1: false,
      font: "",
      fontSize: "",
      isFinal2: false,
      count: 0
    };
  },
  computed: {
    numeratorOne: function() {
      return Math.round(Math.random() * (this.denominatorOne / 2 - 1) + 1);
    },
    numeratorTwo: function() {
      return Math.round(Math.random() * (this.denominatorTwo / 2 - 1) + 1);
    }
  },

  methods: {
    createTable() {
      if (
        this.length < 2 ||
        this.length > 12 ||
        this.width < 2 ||
        this.width > 12
      ) {
        document.getElementById("error").innerHTML =
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The rows and columns should be in 2-12";
      } else {
        let width = document.getElementById("table").scrollWidth;
        if (((width - 40) / this.width) * this.length >= width) {
          this.font = (width - 40) / this.length;
        } else {
          this.font = (width - 40) / this.width;
        }
        if (this.font > 60) {
          this.font = "60px";
          this.fontSize = "20px";
        } else {
          this.fontSize = this.font / 3 + "px";
          this.font = this.font + "px";
        }
        this.isSet = true;
        this.isFinal1 = true;
        document.getElementById("error2").innerHTML =
          "Please enter the total number of cells! ";
        document.getElementById("error").innerHTML =
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      }
    },
    reset() {
      this.denominatorOne = Math.round(Math.random() * 10) + 1;
      this.denominatorTwo = Math.round(Math.random() * 10) + 1;
      this.width = null;
      this.length = null;
      this.countClick = 0;
      this.isSet = false;
      this.isButton = false;
      this.cells = "";
      this.isFinal1 = false;
      this.isFinal2 = false;
      this.count = 0;
      document.getElementById("error2").innerHTML =
        "Please enter the number of rows, columns to start (2-12)";
      document.getElementById("error1").innerHTML = "";
    },
    change(event, i, j) {
      var cur = event.target;
      var tab = document.getElementById("table1");
      var row = tab.rows;
      if (this.count === 1) {
        if ((j == 1) & (i != 1)) {
          if (row[i - 1].cells[2].classList == "") {
            for (let k = 1; k < this.width + 1; k++) {
              row[i - 1].cells[k].classList.add("Y");
            }
          } else {
            for (let k = 1; k < this.width + 1; k++) {
              row[i - 1].cells[k].classList.remove("Y");
            }
          }
        }
      }
      if (this.count === 2) {
        if ((j != 1) & (i == 1)) {
          let a = true;
          for (let k = 1; k < this.length + 1; k++) {
            if (row[k].cells[j - 1].classList == "B") {
              a = false;
              break;
            }
          }
          if (a) {
            for (let k = 1; k < this.length + 1; k++) {
              if (row[k].cells[j - 1].classList == "Y") {
                row[k].cells[j - 1].classList.replace("Y", "B");
              } else {
                row[k].cells[j - 1].classList.add("Y");
              }
            }
          } else {
            for (let k = 1; k < this.length + 1; k++) {
              if (row[k].cells[j - 1].classList == "B") {
                row[k].cells[j - 1].classList.replace("B", "Y");
              } else {
                row[k].cells[j - 1].classList.remove("Y");
              }
            }
          }
        }
      }
      if (this.count === 3) {
        if (
          (i != 1) &
          (i != this.length + 2) &
          (j != 1) &
          (j != this.width + 2)
        ) {
          if (cur.classList == "B") {
            for (let k = 1; k < this.length + 1; k++) {
              for (let z = 1; z < this.width + 1; z++) {
                if (row[k].cells[z].classList == "") {
                  row[k].cells[z].classList.add("Y");
                  cur.classList.replace("B", "Y");
                  this.checkFinish();
                  return;
                }
              }
            }
          }
        }
      }
    },
    checkFinish() {
      this.countClick = 0;
      var tab = document.getElementById("table1");
      var row = tab.rows;
      for (var i = 1; i < this.length + 1; i++) {
        for (var j = 1; j < this.width + 1; j++) {
          var cell = row[i].cells;
          if (cell[j].classList == "B") {
            this.countClick++;
          }
        }
      }
      if(this.countClick==0){
        document.getElementById("error1").innerHTML = "";
        document.getElementById("error2").innerHTML =
                "All correct! Click here for new question!";
        this.count++;
      }
    },
    checkRow() {
      this.countClick = 0;
      var tab = document.getElementById("table1");
      var row = tab.rows;
      for (var i = 1; i < this.length + 1; i++) {
        for (var j = 1; j < this.width + 1; j++) {
          var cell = row[i].cells;
          if (cell[j].classList == "Y") {
            this.countClick++;
          }
        }
      }
      if (this.denominatorOne == 1) {
        if (
          this.numeratorOne / (this.denominatorOne + 1) ==
          this.countClick / (this.width * this.length)
        ) {
          document.getElementById("error1").innerHTML = "";
          document.getElementById("error2").innerHTML =
            "Correct! Please click on the top of the red border to enter columns!";
          this.count++;
        } else {
          document.getElementById("error1").innerHTML = "Incorrect.";
        }
      }
      if (this.denominatorOne != 1) {
        if (
          this.numeratorOne / this.denominatorOne ==
          this.countClick / (this.width * this.length)
        ) {
          document.getElementById("error1").innerHTML = "";
          document.getElementById("error2").innerHTML =
            "Correct! Please click on the top of the red border to enter columns!";
          this.count++;
        } else {
          document.getElementById("error1").innerHTML = "Incorrect.";
        }
      }
    },
    checkCol() {
      this.countClick = 0;
      let countDouble = 0;
      var tab = document.getElementById("table1");
      var row = tab.rows;
      for (var i = 1; i < this.length + 1; i++) {
        for (var j = 1; j < this.width + 1; j++) {
          var cell = row[i].cells;
          if (cell[j].classList == "Y") {
            this.countClick++;
          }
          if (cell[j].classList == "B") {
            countDouble++;
          }
        }
      }
      if (this.denominatorOne == 1 && this.denominatorTwo != 1) {
        if (
          ((this.denominatorOne + 1) * this.numeratorTwo +
            this.numeratorOne * this.denominatorTwo) /
            ((this.denominatorOne + 1) * this.denominatorTwo) ==
          (this.countClick + 2 * countDouble) / (this.width * this.length)
        ) {
          document.getElementById("error1").innerHTML = "";
          document.getElementById("error2").innerHTML =
            "Please click on the overlap squares to move them!";
          this.count++;
        } else {
          document.getElementById("error1").innerHTML = "Incorrect.";
        }
      }
      if (this.denominatorTwo == 1 && this.denominatorOne != 1) {
        if (
          (this.denominatorOne * this.numeratorTwo +
            this.numeratorOne * (this.denominatorTwo + 1)) /
            (this.denominatorOne * (this.denominatorTwo + 1)) ==
          (this.countClick + 2 * countDouble) / (this.width * this.length)
        ) {
          document.getElementById("error1").innerHTML = "";
          document.getElementById("error2").innerHTML =
            "Please click on the overlap squares to move them!";
          this.count++;
        } else {
          document.getElementById("error1").innerHTML = "Incorrect.";
        }
      }
      if (this.denominatorTwo == 1 && this.denominatorOne == 1) {
        if (
          ((this.denominatorOne + 1) * this.numeratorTwo +
            this.numeratorOne * (this.denominatorTwo + 1)) /
            ((this.denominatorOne + 1) * (this.denominatorTwo + 1)) ==
          (this.countClick + 2 * countDouble) / (this.width * this.length)
        ) {
          document.getElementById("error1").innerHTML = "";
          document.getElementById("error2").innerHTML =
            "Please click on the overlap squares to move them!";
          this.count++;
        } else {
          document.getElementById("error1").innerHTML = "Incorrect.";
        }
      }
      if (this.denominatorTwo != 1 && this.denominatorOne != 1) {
        if (
          (this.denominatorOne * this.numeratorTwo +
            this.numeratorOne * this.denominatorTwo) /
            (this.denominatorOne * this.denominatorTwo) ==
          (this.countClick + 2 * countDouble) / (this.width * this.length)
        ) {
          document.getElementById("error1").innerHTML = "";
          document.getElementById("error2").innerHTML =
            "Please click on the overlap squares to move them!";
          this.count++;
        } else {
          document.getElementById("error1").innerHTML = "Incorrect.";
        }
      }
    },
    checkRes() {
      if (this.cells == this.width * this.length) {
        document.getElementById("number").innerHTML = "Correct! " + (this.width*this.length) + " cells! ";
        document.getElementById("error2").innerHTML =
          "Please click on the sides of the red border to enter rows!";
        document.getElementById("error3").innerHTML = "";
        this.isFinal1 = false;
        this.isFinal2 = true;
        this.count = 1;
      } else {
        if (this.cells > this.width * this.length) {
          document.getElementById("error3").innerHTML = "&nbsp;&nbsp;Too big!";
        } else {
          document.getElementById("error3").innerHTML =
            "&nbsp;&nbsp;Too small!";
        }
      }
    },
    resetEnter() {
      this.isSet = false;
      this.isButton = false;
      this.cells = "";
      this.isFinal1 = false;
      this.isFinal2 = false;
      this.count = 0;
      this.width = "";
      this.length = "";
      document.getElementById("error2").innerHTML =
        "Please enter the number of rows, columns to start (2-12)";
      document.getElementById("error1").innerHTML = "";
    }
  },
  name: "AddingFraction"
};
</script>

<style scoped>
.Y {
  background: aqua;
}
.B {
  background: blue;
}
.hide {
  width: 5vw;
  visibility: hidden;
}
.appear {
  width: 5vw;
}
</style>
