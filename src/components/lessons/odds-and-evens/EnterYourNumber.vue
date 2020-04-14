<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Enter your number</h3>
    <hr class="subheading-separator">

    <div style="height: 10px"></div>

    <div class="row">
      <div class="col-md-6 pb-4">
        <div>
          <div>
            <label class="instructionLabel"
              >Enter a number to find its chain (1 to {{legify(999999999)}}):
            </label>
          </div>
          <div style="margin-top: 10px; display:flex; flex-direction: row;">
            <div>
              <input
                class="inputNumber"
                v-model="enterNum"
                type="number"
                @click="checked()"
                id="inputNumber"
              />
            </div>
            <div>
              <button
                class="btn btn-outline-success"
                style="width: 70px; font-weight: bold; margin-left: 20px"
                id="okBtn"
                @click="onOKClicked()"
              >
                OK
              </button>
            </div>
            <div>
              <label id="error" style="width: 200px; color: red"></label>
            </div>
          </div>

          <div style="margin-top: 20px; display:flex; flex-direction: column;">
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
                <td>{{ isSet1 ? legify(display[j - 1][0]) : "" }}</td>
                <td>{{ isSet1 ? legify(display[j - 1][1]) : "" }}</td>
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
            >Chain for {{ legify(useNum) }}</label
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
            visibility: isSet ? (isSet2 ? 'hidden' : 'visible') : 'hidden'
          }"
        >
          <button
            class="btn btn-outline-success"
            v-if="!finished && demoAutoOption === '0'"
            @click="execute"
          >
            {{ isStart ? "Next game" : "First game" }}
          </button>
          <button
            class="btn btn-outline-success"
            v-if="!finished && demoAutoOption === '1'"
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
          <button class="btn btn-outline-dark" v-if="finished" @click="reset()">
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
import { legify } from "../../common/utils.js";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      demoAutoOption: "1",
      count: 0,
      enterNum: "",
      useNum: "",
      number: "",
      chainLength: "",
      numberArr: [],
      display: [],
      row: 6,
      row1: 4,
      idx: "",
      isSet: false,
      isSet1: false,
      isSet2: false,
      isSet3: false,
      click: false,
      clickMax: false,
      finished: false,
      finished1: false,
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
    finished(value) {
      if (value === true && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  mounted: function() {
    for (let i = 0; i < 4; i++) {
      this.display[i] = ["", ""];
    }
  },
  methods: {
    legify,
    checked() {
      if (this.isSet2) {
        this.enterNum = "";
      }
    },
    onOKClicked() {
      if (
        this.enterNum === "" ||
        parseInt(this.enterNum) <= 0 ||
        parseInt(this.enterNum) > 999999999
      ) {
        if (this.enterNum === "")
          document.getElementById("error").innerHTML =
            "&nbsp;&nbsp;Please enter a number.";
        else
          document.getElementById("error").innerHTML =
            "&nbsp;&nbsp;Out of range";
        return;
      }
      document.getElementById("error").innerHTML = "";
      document.getElementById("okBtn").setAttribute("disabled", "true");
      document.getElementById("inputNumber").setAttribute("disabled", "true");
      this.isSet = true;
      this.isSet2 = false;
      this.useNum = parseInt(this.enterNum);
      this.number = this.useNum;
      this.chainLength = 0;
      this.firstChain = true;
      this.finished = false;
      this.isStart = false;
      this.isAutoStart = false;
      this.numberArr = [];
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
        this.timer = setInterval(this.execute, 50);
      }
    },
    execute() {
      this.isStart = true;
      let object = this.numberArr[0];
      this.chainLength++;
      object.chainLength = this.chainLength;
      if (this.firstChain) {
        object.chain[object.chain.length - 1] += legify(this.number);
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
          object.chain[object.chain.length - 1] += "->" + legify(this.number);
        else {
          object.chain.push("");
          object.chain[object.chain.length - 1] += legify(this.number);
        }
        if (this.numberArr[0].chain.length > 6) {
          this.row = this.numberArr[0].chain.length;
        }
        if (this.number === 1) {
          this.finished = true;
        }
      }
      if (this.finished) {
        if (this.count < 4) {
          this.display[this.count] = [this.enterNum, this.chainLength];
        } else {
          this.display.push([
            parseInt(this.enterNum),
            parseInt(this.chainLength)
          ]);
        }
        this.count++;
        this.isSet1 = true;
        if (this.display.length > 4) {
          this.row1 = this.display.length;
        }
        document.getElementById("maximumBtn").removeAttribute("disabled");
        document.getElementById("clearBtn").removeAttribute("disabled");
      }
    },
    executeMax() {
      this.isSet2 = true;
      let object = this.numberArr[0];
      this.chainLength++;
      object.chainLength = this.chainLength;
      if (this.firstChain) {
        object.chain[object.chain.length - 1] += legify(this.number);
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
          object.chain[object.chain.length - 1] += "->" + legify(this.number);
        else {
          object.chain.push("");
          object.chain[object.chain.length - 1] += legify(this.number);
        }
        if (this.numberArr[0].chain.length > 6) {
          this.row = this.numberArr[0].chain.length;
        }
        if (this.number === 1) {
          this.finished1 = true;
        }
      }
    },
    onMaximumClicked() {
      this.clickMax = true;
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
      this.useNum = this.display[this.idx][0];
      this.number = this.useNum;
      this.firstChain = true;
      this.numberArr = [];
      this.numberArr.push({
        number: this.number,
        chainLength: 0,
        chain: [""]
      });
      this.row = 6;
      this.finished1 = false;
      while (!this.finished1) {
        this.executeMax();
      }
      document.getElementById("okBtn").removeAttribute("disabled");
      document.getElementById("inputNumber").removeAttribute("disabled");
      this.enterNum = this.useNum;
    },
    onClearClicked() {
      this.useNum = "";
      this.number = "";
      this.row = 6;
      this.row1 = 4;
      this.idx = "";
      this.isSet3 = false;
      this.click = false;
      this.clickMax = false;
      this.finished = false;
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
      document.getElementById("okBtn").removeAttribute("disabled");
      document.getElementById("inputNumber").removeAttribute("disabled");
      document.getElementById("maximumBtn").setAttribute("disabled", "true");
      document.getElementById("clearBtn").setAttribute("disabled", "true");
    },
    change(j) {
      if(!this.isStart){
        return;
      }
      if(this.display[j-1][0]===""){
        return;
      }
      this.idx = j - 1;
      this.click = true;
      this.chainLength = 0;
      this.useNum = this.display[this.idx][0];
      this.number = this.useNum;
      this.firstChain = true;
      this.numberArr = [];
      this.numberArr.push({
        number: this.number,
        chainLength: 0,
        chain: [""]
      });
      this.row = 6;
      this.finished1 = false;
      while (!this.finished1) {
        this.executeMax();
      }
      document.getElementById("okBtn").removeAttribute("disabled");
      document.getElementById("inputNumber").removeAttribute("disabled");
      this.enterNum = this.useNum;
    },
    reset() {
      this.enterNum = "";
      this.chainLength = "";
      this.numberArr = [];
      this.row = 6;
      this.isSet = false;
      this.isSet2 = false;
      this.finished = false;
      this.finished1 = false;
      this.timer = null;
      this.isStart = false;
      this.isAutoStart = false;
      this.firstChain = false;

      document.getElementById("okBtn").removeAttribute("disabled");
      document.getElementById("inputNumber").removeAttribute("disabled");
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  name: "EnterYourNumber"
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
</style>
