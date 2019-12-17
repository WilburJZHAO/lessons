<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">Show The Fraction</h3>

    <div style="display: flex; flex-direction: row; margin-left: 10%;">
      <div>
        <table>
          <tr>
            <td>
              <h6 class="text-success">
                <b id="error" :style="{ color: error ? 'red' : '' }"
                  >Please answer following question:</b
                >
              </h6>
            </td>
            <td>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button
                v-if="finished"
                name="Reset"
                @click="reset()"
                class="btn btn-outline-success"
                id="resetBt"
              >
                Tap here for new question
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="height: 20px"></div>
    <div class="row">
      <div class="col-md-6 pb-4">
      <div
        align="center"
        style="width: 60%; position: center; margin-left: 20%"
      >
        <div style="width: 80%;">
          <div>
            <p>Click on rows, columns or cells to show</p>
          </div>
          <table align="center">
            <tbody>
              <tr align="center">
                <td align="center" style="">
                  <b>
                    <p
                      v-if="fractionM != 0"
                      style="border-bottom: #0f0f0f solid;margin: 0px; font-size: 25px; color: brown"
                    >
                      {{ fractionM }}
                    </p>
                    <p
                      v-else
                      style="border-bottom: #0f0f0f solid;margin: 0px; font-size: 25px; color: brown"
                    >
                      {{ fractionM + 1 }}
                    </p>
                    <p
                      style="border-top: #0f0f0f solid;margin: 0px; font-size: 25px;  color: brown"
                    >
                      {{ fractionL }}
                    </p>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <button
            @click="checkResult()"
            class="btn btn-outline-success"
            id="okBt"
          >
            OK
          </button>
        </div>
      </div>
      </div>
      <div class="col-md-6" >
      <div style="width:100%; height: auto" id="table">
        <div class="div-relative">
          <div class="div-a" id="t">
            <table id="table1" style="border: #0f0f0f solid; margin-right: 0; margin-bottom: 15%;">
              <tbody id="tbody1">
                <tr v-for="i in length + 2">
                  <td
                    v-for="j in width + 2"
                    @click="change($event, i, j)"
                    v-bind:style="
                      j == 1 || i == 1 || j == width + 2 || i == length + 2
                        ? 'height: 20px; width: 20px; background: red'
                        : {height: font, width: font, border: '1px solid #0f0f0f', color: '#0f0f0f'}
                    "
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="div-b text-center"
            v-if="finished"
            :style="{ width: widthT, height: heightT }"
            style="margin-right: 0; margin-bottom: 15%; margin-left: 5%"
          >
            <img
              src="../../../assets/right.png"
              id="5"
              style="height: 90px;"
              :style="{ 'margin-top': heightT1 }"
            />
          </div>
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
      length: Math.round(Math.random() * 10) + 1,
      width: Math.round(Math.random() * 10) + 1,
      countClick: 0,
      fractionL: "",
      fractionM: "",
      widthT: 0,
      heightT: 0,
      heightT1: 0,
      a: Math.random() * 10,
      b: 0,
      clickOrNot: true,
      finished: false,
      error: false,
      timer: null,
      font: "",
    };
  },
  mounted: function() {
    this.start();
  },
  updated: function() {
    this.$nextTick(function() {
      this.widthT = document.getElementById("table1").scrollWidth + "px";
      this.heightT = document.getElementById("table1").scrollHeight + "px";
      this.heightT1 =
        document.getElementById("table1").scrollHeight / 2 - 45 + "px";
    });
  },
  methods: {
    start() {
      let width = document.getElementById("table").scrollWidth;
      if(((width-40)/this.width)*this.length >= width){
        this.font = (width-40)/this.length;
      }else {
        this.font = (width - 40) / this.width;
      }
      if(this.font>60){
        this.font = "60px";
      }else{
        this.font = this.font + "px";
      }
      if (this.a < 5) {
        this.fractionL = this.width;
        this.fractionM = Math.round(Math.random() * this.fractionL);
      }
      if (this.a >= 5) {
        this.fractionL = this.length;
        this.fractionM = Math.round(Math.random() * this.fractionL);
      }
      this.widthT = document.getElementById("table1").scrollWidth + "px";
      this.heightT = document.getElementById("table1").scrollHeight + "px";
      this.heightT1 =
        document.getElementById("table1").scrollHeight / 2 - 50 + "px";
    },
    checkResult() {
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
      if (this.fractionM == 0) {
        if (this.a < 5) {
          if ((this.fractionM + 1) * this.length == this.countClick) {
            this.error = false;
            this.finished = true;
            document.getElementById("error").innerHTML =
              "Your answer is correct.";
            document.getElementById("okBt").classList.add("hide");
          } else {
            if ((this.fractionM + 1) * this.length > this.countClick) {
              document.getElementById("error").innerHTML =
                "Too small. Fill in more cells.";
              this.countClick = 0;
              this.error = true;
            } else {
              document.getElementById("error").innerHTML =
                "Too big. Remove some cells.";
              this.countClick = 0;
              this.error = true;
            }
          }
        }
        if (this.a >= 5) {
          if ((this.fractionM + 1) * this.width == this.countClick) {
            this.error = false;
            this.finished = true;
            document.getElementById("error").innerHTML =
              "Your answer is correct.";
            document.getElementById("okBt").classList.add("hide");
          } else {
            if ((this.fractionM + 1) * this.width > this.countClick) {
              document.getElementById("error").innerHTML =
                "Too small. Fill in more cells.";
              this.countClick = 0;
              this.error = true;
            } else {
              document.getElementById("error").innerHTML =
                "Too big. Remove some cells.";
              this.countClick = 0;
              this.error = true;
            }
          }
        }
      }
      if (this.fractionM != 0) {
        if (this.a < 5) {
          if (this.fractionM * this.length == this.countClick) {
            this.error = false;
            this.finished = true;
            document.getElementById("error").innerHTML =
              "Your answer is correct.";
            document.getElementById("okBt").classList.add("hide");
          } else {
            if (this.fractionM * this.length > this.countClick) {
              document.getElementById("error").innerHTML =
                "Too small. Fill in more cells.";
              this.countClick = 0;
              this.error = true;
            } else {
              document.getElementById("error").innerHTML =
                "Too big. Remove some cells.";
              this.countClick = 0;
              this.error = true;
            }
          }
        }
        if (this.a >= 5) {
          if (this.fractionM * this.width == this.countClick) {
            this.error = false;
            this.finished = true;
            document.getElementById("error").innerHTML =
              "Your answer is correct.";
            document.getElementById("okBt").classList.add("hide");
          } else {
            if (this.fractionM * this.width > this.countClick) {
              document.getElementById("error").innerHTML =
                "Too small. Fill in more cells.";
              this.countClick = 0;
              this.error = true;
            } else {
              document.getElementById("error").innerHTML =
                "Too big. Remove some cells.";
              this.countClick = 0;
              this.error = true;
            }
          }
        }
      }
    },
    reset() {
      this.finished = false;
      this.error = false;
      var tab = document.getElementById("table1");
      var row = tab.rows;
      for (var i = 0; i < this.length + 2; i++) {
        for (var j = 0; j < this.width + 2; j++) {
          var cell = row[i].cells;
          if (cell[j].classList == "Y") {
            cell[j].classList.remove("Y");
          }
        }
      }
      this.length = Math.round(Math.random() * 10) + 1;
      this.width = Math.round(Math.random() * 10) + 1;
      this.fractionL = "";
      this.fractionM = "";
      this.a = Math.random() * 10;
      this.countClick = 0;
      this.start();
      document.getElementById("okBt").classList.replace("hide", "appear");
      document.getElementById("error").innerHTML =
        "Please enter the number of rows.";
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
          // this.countClick++;
        } else if (cur.classList == "Y") {
          cur.classList.remove("Y");
          // this.countClick--;
        }
      } else {
        if ((i == 1) & (j != 1)) {
          if (cur.classList == "") {
            for (let k = 1; k < this.length + 1; k++) {
              row[k].cells[j - 1].classList.add("Y");
            }
            // this.countClick = this.countClick + this.length;
            cur.classList.add("Y");
          } else {
            for (let k = 1; k < this.length + 1; k++) {
              row[k].cells[j - 1].classList.remove("Y");
            }
            // this.countClick = this.countClick - this.length;
            cur.classList.remove("Y");
          }
        }
        if ((j == 1) & (i != 1)) {
          if (cur.classList == "") {
            for (let k = 1; k < this.width + 1; k++) {
              row[i - 1].cells[k].classList.add("Y");
            }
            // this.countClick = this.countClick + this.width;
            cur.classList.add("Y");
          } else {
            for (let k = 1; k < this.width + 1; k++) {
              row[i - 1].cells[k].classList.remove("Y");
            }
            // this.countClick = this.countClick - this.width;
            cur.classList.remove("Y");
          }
        }
      }
    }
  },
  name: "HowManyRows"
};
</script>

<style scoped>
.Y {
  background: aqua;
}

.hide {
  width: 5vw;
  visibility: hidden;
}
.appear {
  width: 5vw;
}
.div-relative {
  position: relative;
  width: 100%;
}
.div-a {
  position: absolute;
  width: 100%;
}
.div-b {
  position: absolute;
  width: 100%;
}
</style>
