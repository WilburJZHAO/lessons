<template>
  <div class="container mt-3 mb-5">
    <h3 class="text-center text-success mb-4">
      Enter your number and search range
    </h3>

    <div style="height: 10px"></div>

    <div class="row">
      <div class="col-md-6 pb-4">
        <div>
          <div>
            <label id="instructionLabel" class="instructionLabel"
              >Enter a start number (1-999999999):
            </label>
          </div>
          <div style="margin-top: 5px; display:flex; flex-direction: row;">
            <div style="display: flex; flex-direction: row">
              <div
                style="margin: 20px; flex-direction: column; align-content: flex-end"
              >
                <div>
                  <label class="inputLabel">Start:</label>
                </div>
                <div>
                  <label class="inputLabel">Finish: </label>
                </div>
              </div>
              <div
                style="display:flex; margin: 20px; flex-direction: column; align-content: flex-start"
              >
                <div>
                  <input
                    v-if="!isStart"
                    id="inputStart"
                    class="inputNumber"
                    v-model="enterNum"
                    type="number"
                    @click="checkInput1()"
                  />
                  <input
                    v-if="isStart"
                    class="inputNumber"
                    v-model="useNum"
                    type="number"
                    disabled
                    @click="checkInput1()"
                  />
                </div>
                <div>
                  <input
                    class="inputNumber"
                    v-model="enterNum2"
                    type="text"
                    id="inputFinish"
                    @click="checkInput2()"
                  />
                </div>
                <div class="row" style="width: 270px">
                  <div style="text-align: center; margin-top: 10px">
                    <button
                      class="btn btn-outline-success"
                      style="width: 70px; font-weight: bold; margin-left: 0px"
                      id="okBtn"
                      @click="onOKClicked()"
                    >
                      OK
                    </button>
                  </div>
                  <div style="text-align: center; margin-top: 15px">
                    <label
                      id="error"
                      style="text-align: left; width: 170px; color: red"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex; flex-direction: column;">
            <div>
              <label id="instruction" class="instructionLabel"
                >Chain length</label
              >
            </div>
            <div>
              <input
                class="inputNumber"
                disabled
                v-model="chainLength"
                type="text"
                id="chainLength"
              />
            </div>
            <div style="margin-top: 10px; display:flex; flex-direction: row;">
              <div>
                <input
                  class="btn btn-outline-success"
                  disabled
                  style="width: 100px; font-weight: bold;"
                  type="button"
                  id="maximumBtn"
                  value="Maximum"
                  @click="onMaximumClicked()"
                />
              </div>
              <div>
                <input
                  class="btn btn-outline-success"
                  disabled
                  style="width: 100px; font-weight: bold; margin-left: 20px"
                  type="button"
                  id="clearBtn"
                  value="Clear"
                  @click="onClearClicked()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="table-wrapper-scroll-y" id="tableDiv">
          <table id="tblResult" class="table table-bordered">
            <thead>
              <tr>
                <th style="text-align: center" scope="col">Number</th>
                <th style="text-align: center" scope="col">
                  Chain Length
                </th>
              </tr>
              <tr
                v-for="j in isSet1 ? row1 : 4"
                :style="{ background: j - 1 === idx ? '#f4ffec' : '' }"
                @click="change(j)"
              >
                <td>{{ isSet1 ? display[j - 1][0] : "" }}</td>
                <td>{{ isSet1 ? display[j - 1][1] : "" }}</td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      <div class="row" style="margin-left: 5px; margin-right: 5px">
        <div id="infoDiv" style="margin-left: 20px;">
          <label
            id="info"
            class="infoLabel"
            :style="{
              visibility: isSet ? 'visible' : isSet2 ? 'visible' : 'hidden'
            }"
            >Chain for {{ useNum }}</label
          >
        </div>
        <div
          id="chainTblDiv"
          class="table-chain-wrapper-scroll-y col-sm-12"
          style="margin-top: 10px"
        >
          <table id="tblChain" class="table table-bordered">
            <tr v-for="i in isSet ? row : 6">
              <td>
                {{
                  isSet
                    ? numberArr[0].chain[i - 1]
                    : isSet2
                    ? numberArr[0].chain[i - 1]
                    : ""
                }}
              </td>
            </tr>
          </table>
        </div>

        <div
          class="text-center"
          style="margin-top: 10px; width: 100%"
          :style="{
            visibility: isSet ? 'visible' : 'hidden'
          }"
        >
          <button
            class="btn btn-outline-success"
            v-if="!finalFinished && demoAutoOption === '0'"
            @click="startGame"
          >
            {{ isStart ? "Next game" : "First game" }}
          </button>
          <button
            class="btn btn-outline-success"
            v-if="!finalFinished && demoAutoOption === '1'"
            @click="startGameAuto"
          >
            {{
              !isAutoStart
                ? "Start"
                : timer
                ? "Pause"
                : "Resume"
            }}
          </button>
          <button
            class="btn btn-outline-dark"
            v-if="finalFinished"
            @click="reset()"
          >
            Reset</button
          >&nbsp;&nbsp;&nbsp;
          <app-demo-auto-option
            class="mt-1"
            @changeOption="demoAutoOption = $event"
            :option="demoAutoOption"
          ></app-demo-auto-option>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "./DemoAutoOption.vue";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      demoAutoOption: "1",
      count: 0,
      count1: 0,
      enterNum: "",
      enterNum2: "",
      number: "",
      number1: "",
      useNum: 0,
      chainLength: "",
      numberArr: [],
      display: [],
      row: 6,
      row1: 4,
      idx: "",
      r: "",
      clickMax: false,
      clickMax1: false,
      isSet: false,
      isSet1: false,
      isSet2: false,
      isSet3: false,
      finished: false,
      click: false,
      click1: false,
      click2: false,
      finalFinished: false,
      timer: null,
      isStart: false,
      isAutoStart: false,
      firstChain: false
    };
  },
  updated: function() {
    this.$nextTick(function() {
      if (!this.click) {
        var div = document.getElementById("tableDiv");
        div.scrollTop = div.scrollHeight;
        var div1 = document.getElementById("chainTblDiv");
        div1.scrollTop = div1.scrollHeight;
        if (this.clickMax) {
          div.scrollTop = parseInt((this.idx + 1) * 50);
        }
        this.clickMax = false;
      } else {
        this.click = false;
      }
    });
  },
  computed: {},
  watch: {
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    finalFinished(value) {
      if (value === true && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  mounted: function() {
    this.start();
  },
  methods: {
    checkInput1() {
      document.getElementById("instructionLabel").innerHTML =
        "Enter a start number (1-999999999):";
    },
    checkInput2() {
      if (this.enterNum !== "") {
        document.getElementById("instructionLabel").innerHTML =
          "Enter a finish number (" +
          this.enterNum +
          "-" +
          (parseInt(this.enterNum) + 100) +
          ")";
      }
    },
    a() {
      alert("ssss");
    },
    start() {
      for (let i = 0; i < 4; i++) {
        this.display[i] = ["", ""];
      }
    },
    onOKClicked() {
      if (
        this.enterNum === "" ||
        this.enterNum2 === "" ||
        parseInt(this.enterNum) <= 0 ||
        parseInt(this.enterNum) > 999999999
      ) {
        if (this.enterNum === "")
          document.getElementById("error").innerHTML =
            "&nbsp;&nbsp;Enter a start number.";
        else if (this.enterNum2 === "")
          document.getElementById("error").innerHTML =
            "&nbsp;&nbsp;Enter a finish number.";
        else
          document.getElementById("error").innerHTML =
            "&nbsp;&nbsp;Numbers out of range!";
        return;
      }
      if (
        parseInt(this.enterNum2) < parseInt(this.enterNum) ||
        parseInt(this.enterNum2) > parseInt(this.enterNum + 100)
      ) {
        document.getElementById("error").innerHTML =
          "&nbsp;&nbsp;Numbers out of range!";
        return;
      }
      document.getElementById("error").innerHTML = "";
      document.getElementById("okBtn").setAttribute("disabled", "true");
      document.getElementById("inputStart").setAttribute("disabled", "true");
      document.getElementById("inputFinish").setAttribute("disabled", "true");
      this.isSet = true;
      this.isSet2 = false;
      this.chainLength = 0;
      this.firstChain = true;
      this.finished = false;
      this.isStart = false;
      this.isAutoStart = false;

      this.number = parseInt(this.enterNum);
      this.useNum = parseInt(this.enterNum);
      this.numberArr.push({
        number: this.number,
        chainLength: 0,
        chain: [""]
      });
    },
    startGameAuto() {
      this.isAutoStart = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.startGame, 50);
      }
    },
    startGame() {
      this.chainLength = 0;
      if (this.count !== 0) {
        this.useNum++;
      }
      if (this.clickMax1) {
        this.useNum = this.r + 1;
      }
      this.clickMax1 = false;
      if (this.click1) {
        this.useNum = parseInt(this.enterNum) + parseInt(this.count);
      }
      this.click1 = false;
      this.number = this.useNum;
      this.firstChain = true;
      this.numberArr = [];
      this.numberArr.push({
        number: this.number,
        chainLength: 0,
        chain: [""]
      });
      this.row = 6;
      this.finished = false;
      while (!this.finished) {
        this.execute();
      }
    },
    executeMax() {
      this.isSet2 = true;
      let object = this.numberArr[0];
      this.chainLength++;
      object.chainLength = this.chainLength;
      if (this.firstChain) {
        object.chain[object.chain.length - 1] += this.number1;
        this.firstChain = false;
      } else {
        if (this.number1 % 2 === 0) {
          this.number1 = this.number1 / 2;
        } else {
          this.number1 = this.number1 * 3 + 1;
        }
        if (
          object.chain[object.chain.length - 1].length +
            this.number1.toString().length <
          85
        )
          object.chain[object.chain.length - 1] += "->" + this.number1;
        else {
          object.chain.push("");
          object.chain[object.chain.length - 1] += this.number1;
        }
        if (this.numberArr[0].chain.length > 6) {
          this.row = this.numberArr[0].chain.length;
        }
        if (this.number1 === 1) {
          this.finished1 = true;
        }
      }
    },
    execute() {
      this.isStart = true;
      let object = this.numberArr[0];
      this.chainLength++;
      object.chainLength = this.chainLength;
      if (this.firstChain) {
        object.chain[object.chain.length - 1] += this.number;
        this.firstChain = false;
      } else {
        if (this.number % 2 === 0) {
          this.number = this.number / 2;
        } else {
          this.number = this.number * 3 + 1;
        }
        if (
          object.chain[object.chain.length - 1].length +
            this.number.toString().length <
          85
        )
          object.chain[object.chain.length - 1] += "->" + this.number;
        else {
          object.chain.push("");
          object.chain[object.chain.length - 1] += this.number;
        }
        if (this.numberArr[0].chain.length > 6) {
          this.row = this.numberArr[0].chain.length;
        }
        if (this.number === 1) {
          this.finished = true;
        }
      }
      if (this.finished) {
        if (this.click2) {
          if (this.count1 < 4) {
            this.display[this.count1] = [
              parseInt(this.useNum),
              parseInt(this.chainLength)
            ];
          }
        } else {
          if (this.count < 4) {
            this.display[this.count] = [
              parseInt(this.useNum),
              parseInt(this.chainLength)
            ];
          } else {
            this.display.push([
              parseInt(this.useNum),
              parseInt(this.chainLength)
            ]);
          }
        }
        this.count1++;
        if (this.count1 >= 4) {
          this.click2 = false;
        }
        this.count++;
        this.isSet1 = true;
        if (this.display.length > 4) {
          this.row1 = this.display.length;
        }
        document.getElementById("maximumBtn").removeAttribute("disabled");
        document.getElementById("clearBtn").removeAttribute("disabled");
        if (parseInt(this.useNum) === parseInt(this.enterNum2)) {
          this.finalFinished = true;
        }
      }
    },
    onMaximumClicked() {
      this.clickMax = true;
      this.clickMax1 = true;
      let max = this.display[0];
      this.idx = 0;
      for (let i = 1; i < this.display.length; i++) {
        let r = this.display[i];
        if (parseInt(r[1]) > parseInt(max[1])) {
          max = r;
          this.idx = i;
        }
      }
      this.chainLength = 0;
      this.number1 = this.display[this.idx][0];
      this.r = this.useNum;
      this.useNum = this.number1;
      this.firstChain = true;
      this.numberArr = [];
      this.numberArr.push({
        number: this.number1,
        chainLength: 0,
        chain: [""]
      });
      this.row = 6;
      this.finished1 = false;
      while (!this.finished1) {
        this.executeMax();
      }
    },
    onClearClicked() {
      this.row1 = 4;
      this.idx = -1;
      this.isSet1 = false;
      this.isSet2 = false;
      this.click2 = true;
      this.display = [];
      for (let i = 0; i < 4; i++) {
        this.display[i] = ["", ""];
      }
      this.count1 = 0;
      document.getElementById("maximumBtn").setAttribute("disabled", "true");
      document.getElementById("clearBtn").setAttribute("disabled", "true");
    },
    change(j) {
      if (!this.isStart) {
        return;
      }
      if(this.display[j-1][0]===""){
        return;
      }
      this.idx = j - 1;
      this.click = true;
      this.click1 = true;
      this.chainLength = 0;
      this.number1 = this.display[this.idx][0];
      this.r = this.useNum;
      this.useNum = this.number1;
      this.firstChain = true;
      this.numberArr = [];
      this.numberArr.push({
        number: this.number1,
        chainLength: 0,
        chain: [""]
      });
      this.row = 6;
      this.finished1 = false;
      while (!this.finished1) {
        this.executeMax();
      }
    },
    reset() {
      this.useNum = "";
      this.number = "";
      this.row = 6;
      this.row1 = 4;
      this.idx = "";
      this.isSet3 = false;
      this.click = false;
      this.clickMax = false;
      this.finished = false;
      this.finalFinished = false;
      this.finished1 = false;
      this.timer = null;
      this.isStart = false;
      this.isAutoStart = false;
      this.firstChain = false;
      this.idx = -1;
      this.chainLength = "";
      this.isSet = false;
      this.isSet1 = false;
      this.isSet2 = false;
      this.numberArr = [];
      this.numberArr.push({
        number: this.number,
        chainLength: 0,
        chain: [""]
      });
      this.display = [];
      for (let i = 0; i < 4; i++) {
        this.display[i] = ["", ""];
      }
      this.count = 0;
      this.enterNum = "";
      this.enterNum2 = "";
      document.getElementById("okBtn").removeAttribute("disabled");
      // document.getElementById("inputStart").removeAttribute("disabled");
      document.getElementById("inputFinish").removeAttribute("disabled");
      document.getElementById("maximumBtn").setAttribute("disabled", "true");
      document.getElementById("clearBtn").setAttribute("disabled", "true");
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  name: "EnterYourNumberAndSearchRange"
};
</script>

<style scoped>
.table-chain-wrapper-scroll-y {
  display: block;
  max-height: 317px;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
.table-wrapper-scroll-y {
  display: block;
  max-height: 267px;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
td {
  color: #001cc6;
  font-weight: bold;
  height: 50px;
}
.Y {
  background: #f4ffec;
}
</style>
