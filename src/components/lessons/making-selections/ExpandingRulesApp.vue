<template>
  <div>
    <div class="app--container">
      <div class="row my-2">
        <div class="col-6 col-md-5 d-flex align-items-center">Number of players</div>
        <div class="col-6 col-md-7">
          <input
            type="text"
            ref="input-team-players"
            class="form-control"
            v-model.number="rule.teamPlayers"
            autofocus
            @keypress="handleInputCheck"
            @focus="message='Enter a number between 2 and 100'"
            :disabled="status !== 0"
          />
        </div>
      </div>
      <div class="row my-2">
        <div class="col-6 col-md-5 d-flex align-items-center">Clinic size</div>
        <div class="col-6 col-md-7">
          <input
            type="text"
            ref="input-clinic-players"
            class="form-control"
            v-model.number="rule.clinicPlayers"
            @keypress="handleInputCheck"
            @focus="message = rule.teamPlayers ? `Enter a number between 1 and ${rule.teamPlayers - 1}` : 'Enter a number between 1 and 100'"
            :disabled="status !== 0"
          />
        </div>
      </div>
      <div class="row my-2">
        <div class="col-6 col-md-5 d-flex align-items-center">Number of winning cards</div>
        <div class="col-6 col-md-7">
          <input
            type="text"
            ref="input-winning-cards"
            class="form-control"
            v-model.number="rule.winningCardsNum"
            @keypress="handleInputCheck"
            @focus="message = rule.clinicPlayers ? `Enter a number between 1 and ${rule.clinicPlayers}` : 'Enter a number between 1 and 100'"
            :disabled="status !== 0"
          />
        </div>
      </div>
      <div class="row my-2">
        <div class="col-6 col-md-5"></div>
        <div class="col-6 col-md-7">
          <input type="checkbox" v-model="rule.allToWin" id="all-to-win" />
          <label for="all-to-win">All cards to win</label>
        </div>
      </div>
      <div class="text-center mt-3">
        <button class="btn btn-outline-success" @click="handleOk" v-if="status === 0">OK</button>
      </div>
      <div
        class="text-center text-danger"
        :style="{visibility: message ? 'visible' : 'hidden'}"
      >{{ message }}</div>
    </div>
    <div class="mb-4"></div>
    <div class="app--container">
      <app-game-rule v-if="status !== 0" :rule="rule"></app-game-rule>
      <div class="mb-3"></div>
      <app-game-stat :trialNumber="trialNumber" :game="game" :win="win" :lose="lose"></app-game-stat>
    </div>
    <div class="text-center" v-if="status !==0">
      <div class="text-danger" :style="{visibility: status === 2 ? 'visible' :'hidden'}">Finished</div>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption==='0' && status === 1 "
        @click="handleOneGame"
      >{{ game===0 ? 'Tap here to begin' : 'Tap here for next game' }}</button>
      <button
        class="btn btn-outline-success"
        v-if="demoAutoOption==='1' && status === 1"
        @click="handleToggleTimer"
      >{{ game=== 0 ? 'Tap here to begin' : timer ? 'Tap here to pause' : 'Tap here to resume' }}</button>
      <button
        class="btn btn-outline-dark"
        v-if="status === 2"
        @click="handleReset"
      >Tap here to Reset</button>
      <app-demo-auto-option @changeOption="demoAutoOption=$event" :option="demoAutoOption"></app-demo-auto-option>
    </div>
  </div>
</template>

<script>
import GameStat from "./GameStat.vue";
import GameRule from "./GameRule.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { calculateTimerInterval } from "../../common/utils";
import { drawCards, checkResult } from "./utils";

export default {
  components: {
    appGameStat: GameStat,
    appGameRule: GameRule,
    appDemoAutoOption: DemoAutoOption
  },
  props: ["trialNumber"],
  data: function() {
    return {
      rule: {
        teamPlayers: "",
        clinicPlayers: "",
        winningCardsNum: "",
        allToWin: false
      },
      winningCards: [],
      game: 0,
      win: 0,
      lose: 0,
      demoAutoOption: "0",
      timer: null,
      message: "",
      status: 0 // 0 - not started, 1 -started, 2 - finished
    };
  },
  computed: {
    timerInterval() {
      return calculateTimerInterval(this.trialNumber);
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0" && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    game(value) {
      if (value >= this.trialNumber && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    handleOk() {
      const teamPlayersInput = this.$refs["input-team-players"];
      const clinicPlayersInput = this.$refs["input-clinic-players"];
      const winningCardsInput = this.$refs["input-winning-cards"];
      if (!(this.rule.teamPlayers >= 2 && this.rule.teamPlayers <= 100)) {
        teamPlayersInput.focus();
        return;
      }
      if (
        !(
          this.rule.clinicPlayers >= 1 &&
          this.rule.clinicPlayers <= this.rule.teamPlayers - 1
        )
      ) {
        clinicPlayersInput.focus();
        return;
      }
      if (
        !(
          this.rule.winningCardsNum >= 1 &&
          this.rule.winningCardsNum <= this.rule.clinicPlayers
        )
      ) {
        winningCardsInput.focus();
        return;
      }
      for (let i = 1; i <= this.rule.winningCardsNum; i++) {
        this.winningCards.push(i);
      }
      this.winningCards = drawCards(
        this.rule.winningCardsNum,
        this.rule.teamPlayers
      );
      this.message = "";
      this.status = 1;
    },
    handleInputCheck(e) {
      // console.log(e.target.value);
      const { charCode } = e;
      if (!(charCode >= 48 && charCode <= 57)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 3) {
        e.preventDefault();
      }
    },
    handleOneGame() {
      const drawnCards = drawCards(
        this.rule.clinicPlayers,
        this.rule.teamPlayers
      );
      // console.log(drawnCards);
      const result = checkResult(
        drawnCards,
        this.winningCards,
        this.rule.allToWin
      );
      if (result) {
        this.win++;
      } else {
        this.lose++;
      }
      this.game++;
      if (this.game >= this.trialNumber) {
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
      this.game = 0;
      this.win = 0;
      this.lose = 0;
      this.timer = null;
      this.rule = {
        teamPlayers: "",
        clinicPlayers: "",
        winningCardsNum: "",
        allToWin: false
      };
      this.winningCards = [];
      this.status = 0;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.app--container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
 