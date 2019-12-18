<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Add Fraction</h3>

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
                v-if="finished"
                name="Reset"
                @click="reset()"
                class="btn btn-outline-success"
                id="resetBt"
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
          <div align="center">
            <div style="margin: 5px;">
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
            <div style="margin-top: 10%"></div>
            <button
              v-if="isFinal2&&!finished"
              @click="checkRes1()"
              class="btn btn-outline-success"
            >
              OK
            </button>
            &nbsp;
            <button
              @click="resetEnter()"
              v-if="isFinal2&&!finished"
              class="btn btn-outline-success"
            >
              reset
            </button>
            <div style="margin-top: 5%"></div>

            <p id="error1" style="color: red">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6" id="table">
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
                style=" width: 50px; text-align: center"
                class="inputLabel"
              />
            </p>
            <p class="chain-text">
              Enter columns:
              <input
                id="columns"
                v-model.number="width"
                style=" width: 50px; text-align: center"
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
              style="border: #0f0f0f solid; font-size: 13px; text-align: center"
            >
              <tbody id="tbody1">
                <tr v-for="i in length + 2">
                  <td
                    v-for="j in width + 2"
                    @click="change($event, i, j)"
                    style="color: white"
                    v-bind:style="
                      j == 1 || i == 1 || j == width + 2 || i == length + 2
                        ? 'height: 30px; width:30px;background: red'
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
          <div style="text-align: left">
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
                  &nbsp;&nbsp;&nbsp;
                </td>

                <td>
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
                  <p id="error3" style="color: red">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
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
      font: "",
      fontSize: "",
      isFinal1: false,
      isFinal2: false,
      finished: false
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
        if (((width - 70) / this.width) * this.length >= width) {
          this.font = (width - 70) / this.length;
        } else {
          this.font = (width - 70) / this.width;
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
      this.finished = false;
      this.cells = "";
      this.isFinal1 = false;
      this.isFinal2 = false;
      document.getElementById("error").innerHTML =
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    },
    change(event, i, j) {
      var cur = event.target;
      var tab = document.getElementById("table1");
      var row = tab.rows;

      if (
        (i != 1) &
        (i != this.length + 2) &
        (j != 1) &
        (j != this.width + 2)
      ) {
        if (cur.classList == "") {
          cur.classList.add("Y");
        } else if (cur.classList == "Y") {
          cur.classList.remove("Y");
        }
      } else {
        if ((i == 1) & (j != 1)) {
          if (cur.classList == "") {
            for (let k = 1; k < this.length + 1; k++) {
              row[k].cells[j - 1].classList.add("Y");
            }
            cur.classList.add("R");
          } else {
            for (let k = 1; k < this.length + 1; k++) {
              row[k].cells[j - 1].classList.remove("Y");
            }
            cur.classList.remove("R");
          }
        }
        if ((j == 1) & (i != 1)) {
          if (cur.classList == "") {
            for (let k = 1; k < this.width + 1; k++) {
              row[i - 1].cells[k].classList.add("Y");
            }
            cur.classList.add("R");
          } else {
            for (let k = 1; k < this.width + 1; k++) {
              row[i - 1].cells[k].classList.remove("Y");
            }
            cur.classList.remove("R");
          }
        }
      }
    },
    checkRes1() {
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
      if (this.denominatorOne == 1 && this.denominatorTwo != 1) {
        if (
          (this.numeratorTwo * (this.denominatorOne + 1) +
            this.denominatorTwo * this.numeratorOne) /
            ((this.denominatorOne + 1) * this.denominatorTwo) ==
          this.countClick / (this.length * this.width)
        ) {
          document.getElementById("error2").innerHTML =
            "Your answer is correct.";
          document.getElementById("error1").innerHTML = "";
          this.finished = true;
        } else {
          document.getElementById("error1").innerHTML =
            "&nbsp;&nbsp;Incorrect!";
        }
      }
      if (this.denominatorTwo == 1 && this.denominatorOne != 1) {
        if (
          (this.numeratorTwo * this.denominatorOne +
            (this.denominatorTwo + 1) * this.numeratorOne) /
            (this.denominatorOne * (this.denominatorTwo + 1)) ==
          this.countClick / (this.length * this.width)
        ) {
          document.getElementById("error2").innerHTML =
            "Your answer is correct.";
          document.getElementById("error1").innerHTML = "";
          this.finished = true;
        } else {
          document.getElementById("error1").innerHTML =
            "&nbsp;&nbsp;Incorrect!";
        }
      }
      if (this.denominatorTwo == 1 && this.denominatorOne == 1) {
        if (
          (this.numeratorTwo * (this.denominatorOne + 1) +
            (this.denominatorTwo + 1) * this.numeratorOne) /
            ((this.denominatorOne + 1) * (this.denominatorTwo + 1)) ==
          this.countClick / (this.length * this.width)
        ) {
          document.getElementById("error2").innerHTML =
            "Your answer is correct.";
          document.getElementById("error1").innerHTML = "";
          this.finished = true;
        } else {
          document.getElementById("error1").innerHTML =
            "&nbsp;&nbsp;Incorrect!";
        }
      }
      if (this.denominatorTwo != 1 && this.denominatorOne != 1) {
        if (
          (this.numeratorTwo * this.denominatorOne +
            this.denominatorTwo * this.numeratorOne) /
            (this.denominatorOne * this.denominatorTwo) ==
          this.countClick / (this.length * this.width)
        ) {
          document.getElementById("error2").innerHTML =
            "Your answer is correct.";
          document.getElementById("error1").innerHTML = "";
          this.finished = true;
        } else {
          document.getElementById("error1").innerHTML =
            "&nbsp;&nbsp;Incorrect!";
        }
      }
    },
    checkRes() {
      if (this.cells == this.width * this.length) {
        document.getElementById("error2").innerHTML =
          "Correct! Then click the grids to show the result!";
        document.getElementById("number").innerHTML = "";
        document.getElementById("error3").innerHTML = "";
        this.isFinal1 = false;
        this.isFinal2 = true;
      } else {
        document.getElementById("error3").innerHTML =
          "&nbsp;&nbsp;Incorrect! Please try again!";
      }
    },
    resetEnter() {
      this.isSet = false;
      this.isButton = false;
      this.cells = "";
      this.isFinal1 = false;
      this.isFinal2 = false;
      this.width = "";
      this.length = "";
      document.getElementById("error2").innerHTML =
        "Please enter the number of rows, columns to start (2-12)";
      document.getElementById("error1").innerHTML = "";
      document.getElementById("error3").innerHTML = "";
    }
  },
  name: "AddingFraction"
};
</script>

<style scoped>
.Y {
  background: aqua;
}
.R {
  background: red;
}
.hide {
  width: 5vw;
  visibility: hidden;
}
.appear {
  width: 5vw;
}
</style>
