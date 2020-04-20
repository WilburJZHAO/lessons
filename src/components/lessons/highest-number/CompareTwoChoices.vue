<template>
  <div class="container mt-3">
    <h3 class="text-success text-center mb-3">Comparing two choices</h3>
    <div class="d-flex flex-column align-items-center">
      <div>
        First card is a:
        <span v-if="firstNum">{{ firstNum }}</span>
        <input type="text" v-else v-model.number="firstNum" class="mx-2" @keypress="handleInputNum" />
        <span v-if="!firstNum" class="text-success">
          <i class="fas fa-less-than mx-2"></i>
          Enter {{ availableNumWord }}
        </span>
      </div>
      <div class="mb-2"></div>
      <div :style="{ visibility: firstNum && firstNumPos!==null ? 'visible':'hidden'}">
        Then you draw a:
        <span v-if="secondNum" class="text-danger">{{ secondNum }}</span>
        <input
          v-else
          type="text"
          v-model.number="secondNum"
          class="mx-2"
          @keypress="handleInputNum"
        />
        <span v-if="!secondNum" class="text-success">
          <i class="fas fa-less-than mx-2"></i>
          Enter {{ availableNumWord }}
        </span>
      </div>
      <div class="mb-4"></div>
      <div class="d-flex flex-column" :style="{ visibility: firstNum ? 'visible':'hidden'}">
        <div>
          <div
            class="d-flex justify-content-end"
            style="transform:translateX(-40px);"
            :style="{visibility: status===0 ? 'hidden' : 'visible'}"
          >Average</div>
          <div class="d-flex justify-content-center">
            <div
              class="app--num-box"
              :class="{'text-danger': secondNumPos[0] === 0, 'app--card-box': status!==0 && choice1[0]===null } "
              @click="handlePlaceNum(0)"
            >{{ firstNumPos === 0 ? firstNum : secondNumPos[0] === 0 ? secondNum : card ? card.number : ''}}</div>
            <div
              class="app--num-box mx-2"
              :class="{'text-danger': secondNumPos[0] === 1, 'app--card-box': status!==0 &&choice1[1]===null } "
              @click="handlePlaceNum(1)"
            >{{ firstNumPos === 1 ? firstNum : secondNumPos[0] === 1 ? secondNum : card ? card.number : ''}}</div>
            <div
              class="app--num-box"
              @click="handlePlaceNum(2)"
              :class="{'text-danger': secondNumPos[0] === 2, 'app--card-box': status!==0 &&choice1[2]===null } "
            >{{ firstNumPos === 2 ? firstNum : secondNumPos[0] ===2 ? secondNum : card ? card.number : ''}}</div>
            <div
              class="app--average-box"
              :style="{visibility: status===0 ? 'hidden' : 'visible'}"
            >{{ choice1Average }}</div>
          </div>
          <h5>or</h5>
          <div class="d-flex justify-content-center">
            <div
              class="app--num-box"
              @click="handlePlaceNum(0)"
              :class="{'text-danger': secondNumPos[1] === 0, 'app--card-box': status!==0 && choice2[0]===null } "
            >{{ firstNumPos === 0 ? firstNum : secondNumPos[1] === 0 ? secondNum : card ? card.number : ''}}</div>
            <div
              class="app--num-box mx-2"
              @click="handlePlaceNum(1)"
              :class="{'text-danger': secondNumPos[1] === 1, 'app--card-box': status!==0 && choice2[1]===null } "
            >{{ firstNumPos === 1 ? firstNum : secondNumPos[1] === 1 ? secondNum : card ? card.number : ''}}</div>
            <div
              class="app--num-box"
              @click="handlePlaceNum(2)"
              :class="{'text-danger': secondNumPos[1] === 2, 'app--card-box': status!==0 && choice2[2]===null } "
            >{{ firstNumPos === 2 ? firstNum : secondNumPos[1] === 2 ? secondNum : card ? card.number : ''}}</div>
            <div
              class="app--average-box"
              :style="{visibility: status===0 ? 'hidden' : 'visible'}"
            >{{ choice2Average }}</div>
          </div>
        </div>
        <div class="text-success" v-if="status === 0">
          <div v-if="firstNum && !secondNum">
            <i class="fas fa-less-than mx-2"></i>Enter your choice for your card
            <br />by
            clicking on an empty column
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center my-3" style="min-height:150px;">
        <img
          v-if="card && demoAutoOption==='0'"
          :src="
                  card &&
                    require(`@/assets/highest-number/${card.suit}${card.number}.jpg`)
                "
          alt="card"
        />
      </div>
      <div v-if="status===0" class="mt-5">
        <div v-if="firstNumPos>=0 && secondNum && secondNumPos.length > 0">
          <div>
            Number of trials:
            <input type="text" v-model.number="trialNum" />
            <span class="text-success">
              <i class="fas fa-less-than mx-2"></i>Enter the number of trials(1 - 10000)
            </span>
          </div>
          <div class="text-center mt-2">
            <button
              class="btn btn-outline-success"
              @click="handleOk"
              :disabled="!validTrialNumber"
            >OK</button>
          </div>
        </div>
      </div>
      <div v-if="status===1 || status === 2">
        <div>
          <span class="text-danger">Trial:</span>
          {{ trial }}
        </div>
        <div class="mb-3">
          <span class="text-primary">Number of trials:</span>
          {{ trialNum }}
        </div>
        <div v-if="status===1">
          <button
            class="btn btn-outline-success"
            @click="handleOneGame"
            v-if="demoAutoOption==='0'"
          >{{ trial===0 ? 'Tap here to begin testing' : 'Tap here for next game' }}</button>
          <button
            class="btn btn-outline-success"
            @click="handleToggleTimer"
            v-else
          >{{ trial===0 ? 'Tap here to begin' : timer ? 'Tap here to pause' : 'Tap here to resume' }}</button>
          <div class="text-center mt-2">
            <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
          </div>
        </div>
        <div v-if="status===2" class="text-center">
          <div class="text-center text-danger">Finished</div>
          <button class="btn btn-outline-dark" @click="handleReset">Tap here to reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { drawCard } from "./utils";
import { calculateTimerInterval } from "../../common/utils";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      firstNum: "",
      firstNumPos: null,
      secondNum: "",
      availableNum: [1, 2, 3, 4, 5, 6],
      trialNum: "",
      trial: 0,
      status: 0,
      // 0 - ready for start
      // 1 - set finish, to started
      // 2 - finished
      demoAutoOption: "0",
      timer: null,
      card: null,
      choice1Total: 0,
      choice2Total: 0
    };
  },
  watch: {
    firstNum(value) {
      if (value) {
        this.availableNum = this.availableNum.filter(num => num !== value);
      }
    },
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if (value === 2) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNum);
    },
    availableNumWord() {
      const availableNumCopy = [...this.availableNum];
      const last = availableNumCopy.pop();
      return availableNumCopy.join(", ") + " or " + last;
    },
    validTrialNumber() {
      if (this.trialNum >= 1 && this.trialNum <= 10000) {
        return true;
      }
      return false;
    },
    secondNumPos() {
      let posArr = [];
      switch (this.firstNumPos) {
        case 0:
          posArr = [1, 2];
          break;
        case 1:
          posArr = [0, 2];
          break;
        case 2:
          posArr = [0, 1];
          break;
        default:
          posArr = [];
      }
      return posArr;
    },
    choice1() {
      const choice = [null, null, null];
      if (this.firstNumPos !== null && this.secondNumPos.length > 0) {
        choice[this.firstNumPos] = this.firstNum;
        choice[this.secondNumPos[0]] = this.secondNum;
      }
      return choice;
    },
    choice2() {
      const choice = [null, null, null];
      if (this.firstNumPos !== null && this.secondNumPos.length > 0) {
        choice[this.firstNumPos] = this.firstNum;
        choice[this.secondNumPos[1]] = this.secondNum;
      }
      return choice;
    },
    choice1Average() {
      if (this.trial > 0) {
        return Number((this.choice1Total / this.trial).toFixed(1));
      } else {
        return 0;
      }
    },
    choice2Average() {
      if (this.trial > 0) {
        return Number((this.choice2Total / this.trial).toFixed(1));
      } else {
        return 0;
      }
    },
    choice1Number() {
      if (this.status === 0) {
        return 0;
      }
      const numberArr = new Array(3);
      numberArr[this.firstNumPos] = this.firstNum;
      numberArr[this.secondNumPos[0]] = this.secondNum;
      numberArr[this.choice1.indexOf(null)] = this.card.number;
      return numberArr[0] * 100 + numberArr[1] * 10 + numberArr[2];
    },
    choice2Number() {
      if (this.status === 0) {
        return 0;
      }
      const numberArr = new Array(3);
      numberArr[this.firstNumPos] = this.firstNum;
      numberArr[this.secondNumPos[1]] = this.secondNum;
      numberArr[this.choice2.indexOf(null)] = this.card.number;
      return numberArr[0] * 100 + numberArr[1] * 10 + numberArr[2];
    }
  },
  methods: {
    handleInputNum(e) {
      const { key } = e;
      if (this.availableNum.indexOf(Number(key)) === -1) {
        e.preventDefault();
      }
    },
    handlePlaceNum(e) {
      if (this.secondNum) {
        return;
      }
      console.log(e);
      this.firstNumPos = e;
    },
    handleOk() {
      this.status = 1;
    },
    handleOneGame() {
      this.card = drawCard([this.firstNum, this.secondNum]);
      this.trial++;
      this.choice1Total += this.choice1Number;
      this.choice2Total += this.choice2Number;
      if (this.trial >= this.trialNum) {
        this.status = 2;
      }
    },
    handleToggleTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.handleOneGame, this.timerInterval);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleReset() {
      this.firstNum = "";
      this.firstNumPos = null;
      this.secondNum = "";
      this.availableNum = [1, 2, 3, 4, 5, 6];
      this.trialNum = "";
      this.trial = 0;
      this.card = null;
      this.choice1Total = 0;
      this.choice2Total = 0;
      this.status = 0;
    }
  },
  unmounted() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--num-box {
  width: 50px;
  height: 50px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--average-box {
  width: 100px;
  height: 50px;
  border: 1px solid #333;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app--card-box {
  background-color: pink;
}
</style>
