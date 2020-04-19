<template>
  <div class="container mt-3 mb-5">
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
              {{ legify(trialNum) }} games
            </td>
          </tr>
          <tr>
            <td
              colspan="2"
              style="text-align: center; color: #001cc6; font-weight: bold"
            >
              Game {{ legify(count) }}
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
        </table>

        <div id="controller" class="text-center" style="margin-top: 20px;">
          <div>
            <button
              class="btn btn-outline-success"
              v-if="!finished && demoAutoOption === '0'"
              @click="startGameManually"
            >
              {{
                "Run one game"
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
              Click here to reset</button
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
        <div class="col-sm-12" style="position:relative; margin-left: 20%;">
          <img
            src="../../../assets/beetle-game/beetle_body.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleBody"
          />
          <img
            src="../../../assets/beetle-game/beetle_head.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleHead"
          />
          <img
            src="../../../assets/beetle-game/beetle_mouth.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleMouth"
          />
          <img
            src="../../../assets/beetle-game/beetle_feelers_left.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleFeeler1"
          />
          <img
            src="../../../assets/beetle-game/beetle_feelers_right.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleFeeler2"
          />
          <img
            src="../../../assets/beetle-game/beetle_eyes_left.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleEye1"
          />
          <img
            src="../../../assets/beetle-game/beetle_eyes_right.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleEye2"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg1.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleLeg1"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg2.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleLeg2"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg3.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleLeg3"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg4.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleLeg4"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg5.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleLeg5"
          />
          <img
            src="../../../assets/beetle-game/beetle_leg6.png"
            alt=""
            style="position:absolute;left:0px;top:0px;width: 70%;"
            id="beetleLeg6"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "./DemoAutoOption.vue";
import { pickNumber, legify } from "../../common/utils.js";

export default {
  props: ["trialNum"],
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      demoAutoOption: "1",
      count: 0,
      averageNum: "",
      minimum: "",
      maximum: "",
      partsNum: 0,
      rollsNum: 0,
      randomNum: "",
      body: 0,
      head: 0,
      eyes: 0,
      legs: 0,
      feelers: 0,
      mouth: 0,
      allGameResults: [],
      finished: false,
      timer: null,
      timer1: null,
      isStart: false,
      isAutoStart: false,
      manualFinished: false,
    };
  },
  computed: {
    forTime() {
      if (this.trialNum <= 200) {
        return 10;
      } else if (this.trialNum <= 1000) {
        return 50;
      } else if (this.trialNum <= 2000) {
        return 70;
      } else if (this.trialNum <= 5000) {
        return 100;
      } else if (this.trialNum <= 10000) {
        return 300;
      } else {
        return 400;
      }
    }
  },
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
    },
    manualFinished(value) {
      if (value === true && this.timer1) {
        clearInterval(this.timer1);
        this.timer1 = null;
      }
    }
  },
  mounted: function() {},
  methods: {
    legify,
    startGameAuto() {
      console.log("trying to start game")
      this.isAutoStart = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.startGame, 0.1);
      }
    },
    startGame() {
      let times = this.forTime;
      for (let i = 0; i < times; i++) {
        this.rollDice();
        if (parseInt(this.count) === parseInt(this.trialNum)) {
          this.finished = true;
          break;
        }
      }
    },
    startGameManually() {
      this.manualFinished = false;
      while (!this.manualFinished) {
        this.rollDice();
      }
    },
    rollDice() {
      this.randomNum = pickNumber(1, 6);
      this.rollsNum++;
      this.updateBeetle();
    },
    updateBeetle() {
      if (this.body === 0 && this.randomNum === 6) {
        this.body++;
        this.partsNum++;
      } else if (this.body === 1 && this.legs < 6 && this.randomNum === 1) {
        this.legs++;
        this.partsNum++;
      } else if(this.body === 1 && this.head === 0 && this.randomNum === 5){
        this.head++;
        this.partsNum++;
      } else if(this.body === 1 && this.head === 1 && this.legs === 6) {
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
        this.partsNum = 0;
        this.rollsNum = 0;
        this.randomNum = "";
        this.body = 0;
        this.head = 0;
        this.eyes = 0;
        this.legs = 0;
        this.feelers = 0;
        this.mouth = 0;
        this.manualFinished = true;
      }




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
      this.count = 0;
      this.allGameResults = [];
      this.partsNum = 0;
      this.rollsNum = 0;
      this.randomNum = "";
      this.body = 0;
      this.head = 0;
      this.eyes = 0;
      this.legs = 0;
      this.feelers = 0;
      this.mouth = 0;
      this.minimum = "";
      this.maximum = "";
      this.averageNum = "";
      this.finished = false;
      this.timer = null;
      this.isStart = false;
      this.isAutoStart = false;
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.timer1) {
      clearInterval(this.timer1);
      this.timer1 = null;
    }
  },
  name: "MakeManyBeetles"
};
</script>

