<template>
  <div>
    <div style="width: 100%; text-align: center">
      <label id="showChange" style="color:red;font-size:40px;">{{
        ifChange ? "Change" : "No change"
      }}</label>
    </div>
    <div style="width: 100%; margin-top: 4px;" class="app--score-table">
      <table style="width: 60%; margin-left: 20%" class="table">
        <tr>
          <td style="width: 40%;">
            <label style="font-size: 25px">Wins</label>
          </td>
          <td
            style="width: 30%; font-size:25px;color: green;text-align: center;"
          >
            {{ wins }}
          </td>
          <td
            style="width: 30%; font-size:25px;color: green;text-align: center;"
          >
            {{ winsPersentage }}%
          </td>
        </tr>
        <tr>
          <td>
            <label style="font-size: 25px; text-align: left">Losses</label>
          </td>
          <td
            style="font-size:25px;color: green;text-align: center; width: 100%"
          >
            {{ losses }}
          </td>
          <td
            style="font-size:25px;color: green;text-align: center; width: 100%"
          >
            {{ lossesPersentage }}%
          </td>
        </tr>
        <tr>
          <td>
            <label style="font-size: 25px; text-align: left"
              >Games played</label
            >
          </td>
          <td style="font-size:25px;text-align: center; width: 100%">
            {{ counter }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <label style="font-size: 25px; text-align: left"
              >Number of trials</label
            >
          </td>
          <td style="font-size:25px;text-align: center; width: 100%">
            {{ trialNum }}
          </td>
          <td></td>
        </tr>
      </table>
    </div>
    <div>
      <table
        :style="{ visibility: checkGroup ? 'visible' : 'hidden' }"
        style="width: 100%; margin-top: 40px"
      >
        <tr>
          <td style="width: 50%">
            <label style="font-size:25px;" id="asking"
              >Would you like to change your mind?</label
            >
          </td>
          <td>
            <input
              type="checkbox"
              id="checkYes"
              :checked="ifChange ? true : false"
              @click="btnYes()"
            />&nbsp;&nbsp;&nbsp;
            <label style="font-size:25px;">Yes</label
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              style=""
              id="checkNo"
              :checked="ifChange ? false : true"
              @click="btnNo()"
            />&nbsp;&nbsp;&nbsp; <label style="font-size:25px;">No</label>
          </td>
        </tr>
      </table>
    </div>
    <div class="app--action text-center">
      <h5
        class="text-danger text-center"
        :style="{ visibility: finished ? 'visible' : 'hidden' }"
      >
        Finished
      </h5>
      <button
        class="btn btn-outline-success"
        v-if="!finished && demoAutoOption === '0'"
        @click="startGameMuna"
      >
        {{ isStart ? "Tap here for next game" : "Tap here for first game" }}
      </button>
      <button
        class="btn btn-outline-success"
        v-if="!finished && demoAutoOption === '1'"
        @click="startGameAuto"
      >
        {{
          !isAutoStart
            ? "Tap here to begin"
            : timer
            ? "Tap here to pause"
            : "Tap here to resume"
        }}
      </button>
      <button class="btn btn-outline-dark" v-if="finished" @click="reset()">
        Reset
      </button>
      <app-demo-auto-option
        class="mt-1"
        @changeOption="demoAutoOption = $event"
        :option="demoAutoOption"
      ></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "./DemoAutoOption.vue";
export default {
  props: ["trialNum"],
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      arr: new Array(3),
      emptyNum: -1,
      playNum: -1,
      gameNum: 0,
      finalNum: -1,
      wins: 0,
      losses: 0,
      winsPersentage: 0,
      lossesPersentage: 0,
      counter: 0,
      timer: null,
      demoAutoOption: "1",
      checkGroup: true,
      finished: false,
      isStart: false,
      ifChange: false
    };
  },
  computed: {
    timerInterval() {
      if (this.trialNum <= 600) {
        return 50;
      } else if (this.trialNum <= 5000) {
        return 10;
      } else if (this.trialNum <= 10000) {
        return 0.5;
      } else {
        return 0.1;
      }
    },

    forTime() {
      if (this.trialNum <= 200) {
        return 1;
      } else if (this.trialNum <= 10000) {
        return 2;
      } else if (this.trialNum <= 20000) {
        return 4;
      } else if (this.trialNum <= 30000) {
        return 6;
      } else if (this.trialNum <= 50000) {
        return 10;
      } else {
        return 20;
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
    }
  },
  mounted: function() {},
  methods: {
    btnYes() {
      this.ifChange = true;
    },

    btnNo() {
      this.ifChange = false;
    },
    startGameAuto() {
      if (!this.isAutoStart) this.isAutoStart = true;

      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.startGame, this.timerInterval);
      }
    },

    startGame() {
      let times = this.forTime;
      for (let i = 0; i < times; i++) {
        this.startGameMuna();
        if (this.counter == this.trialNum) {
          break;
        }
      }
    },

    startGameMuna() {
      this.checkGroup = false;
      this.isStart = true;
      this.counter += 1;
      this.finalNum = this.generateRandom();
      this.playNum = this.generateRandom();
      this.arr.push(this.finalNum);
      this.arr.push(this.playNum);
      this.checkEmpty();
      // if (this.ifChange) {
      //   let maxTimes = 250;
      //   do {
      //     let num2 = this.generateRandom();
      //     if (this.arr.indexOf(num2) == -1 && num2 != this.playNum) {
      //       this.playNum = num2;
      //       break;
      //     }
      //     maxTimes--;
      //   } while (maxTimes);
      // }
      this.checkPrice();
    },

    checkPrice() {
      this.gameNum += 1;
      if (this.finalNum == this.playNum) {
        this.wins += 1;
      } else {
        this.losses += 1;
      }
      this.updatePersentage();
      if (this.counter == this.trialNum) {
        this.finished = true;
      }
    },
    generateRandom() {
      //from 0 - 2
      return Math.floor(Math.random() * 3);
    },
    checkEmpty() {
      this.emptyNum = this.getNumNoRepeat();
      for (let i = 0; i < this.arr.length; i++) {
        this.arr.pop();
      }
      this.arr.push(this.emptyNum);
    },

    getNumNoRepeat() {
      let maxTimes = 250;
      do {
        let num1 = this.generateRandom();
        if (this.arr.indexOf(num1) == -1) {
          return num1;
        }
        maxTimes--;
      } while (maxTimes);
    },
    updatePersentage() {
      if (this.ifChange) {
        this.lossesPersentage = this.calculatePrecentage(this.wins, this.counter);
        this.winsPersentage = this.calculatePrecentage(
                this.losses,
                this.counter
        );
      }else{
        this.winsPersentage = this.calculatePrecentage(this.wins, this.counter);
        this.lossesPersentage = this.calculatePrecentage(
                this.losses,
                this.counter
        );
      }
    },

    calculatePrecentage(Numerator, denominator) {
      let temp = (Numerator * 100) / denominator;
      if (Math.round(temp) == temp) {
        return temp;
      } else {
        return temp.toFixed(2);
      }
    },
    reset() {
      this.arr = new Array(3);
      this.emptyNum = -1;
      this.playNum = -1;
      this.gameNum = 0;
      this.finalNum = -1;
      this.wins = 0;
      this.losses = 0;
      this.winsPersentage = 0;
      this.lossesPersentage = 0;
      this.counter = 0;
      this.checkGroup = true;
      this.finished = false;
      this.isStart = false;
      this.ifChange = false;
      this.isAutoStart = false;
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  name: "Demonstration"
};
</script>

<style scoped></style>
