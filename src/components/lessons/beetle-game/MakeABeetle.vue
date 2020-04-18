<template>
  <div class="container mt-3 mb-5">
    <h3 class="lesson-subheading">Make a beetle</h3>
    <hr class="subheading-separator">
    <div style="height: 10px"></div>

    <div class="row">
      <div class="col-md-6 pb-4">
        <div class="app--score-table">
          <table
            style="margin-left: 20%; width: 60%; border:1px solid;"
            cellpadding="5"
          >
            <tr>
              <td style="text-align: right; color: brown; font-weight: bold">
                First:
              </td>
              <td style="color: #001cc6; font-weight: bold">6 for body</td>
            </tr>
            <tr>
              <td style="text-align: right; color: brown; font-weight: bold">
                Then:
              </td>
              <td style="color: #001cc6; font-weight: bold">1 for legs</td>
            </tr>
            <tr>
              <td></td>
              <td style="color: #001cc6; font-weight: bold">5 for head</td>
            </tr>
            <tr>
              <td style="text-align: right; color: brown; font-weight: bold">
                Then:
              </td>
              <td style="color: #001cc6; font-weight: bold">2 for eyes</td>
            </tr>
            <tr>
              <td></td>
              <td style="color: #001cc6; font-weight: bold">3 for feelers</td>
            </tr>
            <tr>
              <td></td>
              <td style="color: #001cc6; font-weight: bold">4 for mouth</td>
            </tr>
          </table>
        </div>
        <table
          style="margin-left: 20%; margin-top: 20px; width: 60%; border:1px solid;"
          border="5"
          cellpadding="5"
          cellspacing="0"
        >
          <tr>
            <td
              colspan="2"
              style="text-align: center; color: #001cc6; font-weight: bold"
            >
              Game {{ displayCount }}
            </td>
          </tr>
          <tr>
            <td style="text-align: right; color: brown; font-weight: bold">
              Average:
            </td>
            <td style="color: #001cc6; font-weight: bold">{{ averageNum }}</td>
          </tr>
          <tr>
            <td style="text-align: right; color: brown; font-weight: bold">
              Minimum:
            </td>
            <td style="color: #001cc6; font-weight: bold">{{ minimum }}</td>
          </tr>
          <tr>
            <td style="text-align: right; color: brown; font-weight: bold">
              Maximum:
            </td>
            <td style="color: #001cc6; font-weight: bold">{{ maximum }}</td>
          </tr>
          <tr>
            <td style="text-align: right; color: brown; font-weight: bold">
              Parts:
            </td>
            <td style="color: #001cc6; font-weight: bold">{{ partsNum }}</td>
          </tr>
          <tr>
            <td style="text-align: right; color: brown; font-weight: bold">
              Rolls:
            </td>
            <td style="color: #001cc6; font-weight: bold">{{ rollsNum }}</td>
          </tr>
        </table>

        <div id="controller" class="text-center" style="margin-top: 20px;">
          <div>
            <button
              class="btn btn-outline-success"
              v-if="!finished && demoAutoOption === '0'"
              @click="rollDice"
            >
              {{
                isStart ? "Roll dice" : "Roll dice"
              }}
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
            <button
              class="btn btn-outline-dark"
              v-if="finished"
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

      <div class="col-md-6">
        <label v-if="finished" style="color: #35b247; font-weight: bold; margin-left: 40%">Beetle Made</label>
        <div class="col-sm-12" style="position:relative; margin-top: 5%">
          <img
            src="../../../assets/beetle-game/beetle_body.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;display: none"
            id="beetleBody"
          />
          <img
            src="../../../assets/beetle-game/beetle_head.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleHead"
          />
          <img
            src="../../../assets/beetle-game/beetle_mouth.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleMouth"
          />
          <img
            src="../../../assets/beetle-game/beetle_feelers_left.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleFeeler1"
          />
          <img
            src="../../../assets/beetle-game/beetle_feelers_right.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleFeeler2"
          />
          <img
            src="../../../assets/beetle-game/beetle_eyes_left.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleEye1"
          />
          <img
            src="../../../assets/beetle-game/beetle_eyes_right.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleEye2"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleLeg1"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleLeg2"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleLeg3"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg4.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleLeg4"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg5.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleLeg5"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg6.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%; display: none"
            id="beetleLeg6"
          />
          <img
            v-if="p === 1 && randomNum === 1"
            src="../../../assets/beetle-game/dice1p1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice1p1"
          />
          <img
            v-if="p === 2 && randomNum === 1"
            src="../../../assets/beetle-game/dice1p2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice1p2"
          />
          <img
            v-if="p === 3 && randomNum === 1"
            src="../../../assets/beetle-game/dice1p3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice1p3"
          />
          <img
            v-if="p === 1 && randomNum === 2"
            src="../../../assets/beetle-game/dice2p1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice2p1"
          />
          <img
            v-if="p === 2 && randomNum === 2"
            src="../../../assets/beetle-game/dice2p2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice2p2"
          />
          <img
            v-if="p === 3 && randomNum === 2"
            src="../../../assets/beetle-game/dice2p3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice2p3"
          />
          <img
            v-if="p === 1 && randomNum === 3"
            src="../../../assets/beetle-game/dice3p1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice3p1"
          />
          <img
            v-if="p === 2 && randomNum === 3"
            src="../../../assets/beetle-game/dice3p2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice3p2"
          />
          <img
            v-if="p === 3 && randomNum === 3"
            src="../../../assets/beetle-game/dice3p3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice3p3"
          />
          <img
            v-if="p === 1 && randomNum === 4"
            src="../../../assets/beetle-game/dice4p1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice4p1"
          />
          <img
            v-if="p === 2 && randomNum === 4"
            src="../../../assets/beetle-game/dice4p2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice4p2"
          />
          <img
            v-if="p === 3 && randomNum === 4"
            src="../../../assets/beetle-game/dice4p3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice4p3"
          />
          <img
            v-if="p === 1 && randomNum === 5"
            src="../../../assets/beetle-game/dice5p1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice5p1"
          />
          <img
            v-if="p === 2 && randomNum === 5"
            src="../../../assets/beetle-game/dice5p2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice5p2"
          />
          <img
            v-if="p === 3 && randomNum === 5"
            src="../../../assets/beetle-game/dice5p3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice5p3"
          />
          <img
            v-if="p === 1 && randomNum === 6"
            src="../../../assets/beetle-game/dice6p1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice6p1"
          />
          <img
            v-if="p === 2 && randomNum === 6"
            src="../../../assets/beetle-game/dice6p2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice6p2"
          />
          <img
            v-if="p === 3 && randomNum === 6"
            src="../../../assets/beetle-game/dice6p3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="dice6p3"
          />
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
      displayCount: 1,
      averageNum: "",
      minimum: "",
      maximum: "",
      partsNum: 0,
      rollsNum: 0,
      p: "",
      randomNum: "",
      body: 0,
      head: 0,
      eyes: 0,
      legs: 0,
      feelers: 0,
      mouth: 0,
      allGameResults: [],
      isSet: false,
      finished: false,
      timer: null,
      isStart: false,
      isAutoStart: false,
    };
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
  mounted: function() {},
  methods: {
    generateRandom(num) {
      //from 0 - num
      return Math.ceil(Math.random() * num);
    },
    startGameAuto() {
      this.isAutoStart = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.rollDice();
        this.timer = setInterval(this.rollDice, 800);
      }
    },
    rollDice() {
      this.isStart = true;
      this.p = this.generateRandom(3);
      this.randomNum = this.generateRandom(6);
      this.rollsNum++;
      this.updateBeetle();
      this.drawBeetle();
    },

    updateBeetle() {
      if (this.body === 0 && this.randomNum === 6) {
        this.body++;
        this.partsNum++;
      } else if (this.body === 1 && this.legs <6 && this.randomNum === 1) {
        this.legs++;
        this.partsNum++;
      } else if(this.body === 1 && this.head === 0 && this.randomNum === 5){
        this.head++;
        this.partsNum++;
      } else if(this.body === 1 && this.head === 1) {
        if (this.randomNum === 2 && this.eyes < 2) {
          this.eyes++;
          this.partsNum++;
        } else if (this.randomNum === 3 && this.feelers < 2) {
          this.feelers++;
          this.partsNum++;
        } else if (this.randomNum === 4 && this.mouth < 1) {
          this.mouth++;
          this.partsNum++;
        }
      }
      // run check regardless of previous code
      if (this.partsNum === 13) {
        this.count++;
        this.freshData();
        this.finished = true;
      }
    },

    drawBeetle() {
      document.getElementById("beetleBody").style.display = this.body < 1 ? "none" : "block";
      document.getElementById("beetleHead").style.display = this.head < 1 ? "none" : "block";
      document.getElementById("beetleMouth").style.display = this.mouth < 1 ? "none" : "block";
      document.getElementById("beetleFeeler1").style.display = this.feelers < 1 ? "none" : "block";
      document.getElementById("beetleFeeler2").style.display = this.feelers < 2 ? "none" : "block";
      document.getElementById("beetleEye1").style.display = this.eyes < 1 ? "none": "block";
      document.getElementById("beetleEye2").style.display = this.eyes < 2 ? "none" : "block";
      document.getElementById("beetleLeg1").style.display = this.legs < 1 ? "none" : "block";
      document.getElementById("beetleLeg2").style.display = this.legs < 2 ? "none" : "block";
      document.getElementById("beetleLeg3").style.display = this.legs < 3 ? "none" : "block";
      document.getElementById("beetleLeg4").style.display = this.legs < 4 ? "none" : "block";
      document.getElementById("beetleLeg5").style.display = this.legs < 5 ? "none" : "block";
      document.getElementById("beetleLeg6").style.display = this.legs < 6 ? "none" : "block";
    },
    freshData() {
      this.allGameResults.push(this.rollsNum);
      if (this.count === 1) {
        this.maximum = this.rollsNum;
        this.minimum = this.rollsNum;
        this.averageNum = this.rollsNum;
      } else {
        if (this.rollsNum >= this.maximum) {
          this.maximum = this.rollsNum;
        }
        if (this.rollsNum < this.minimum) {
          this.minimum = this.rollsNum;
        }
        let allResults = 0;
        for (let i = 0; i < this.allGameResults.length; i++) {
          allResults += this.allGameResults[i];
        }
        this.averageNum = (allResults / this.count).toFixed(2);
      }
    },
    reset() {
      this.displayCount++;
      this.partsNum = 0;
      this.rollsNum = 0;
      this.p = "";
      this.randomNum = "";
      this.body = 0;
      this.head = 0;
      this.eyes = 0;
      this.legs = 0;
      this.feelers = 0;
      this.mouth = 0;
      this.finished = false;
      this.timer = null;
      this.isStart = false;
      this.isAutoStart = false;
      this.drawBeetle(); // must be after legs, eyes etc are reset
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  name: "MakeABeetle"
};
</script>

<style scoped></style>
