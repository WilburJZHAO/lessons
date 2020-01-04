<template>
  <div class="container mt-3">
    <h3 class="text-center text-success mb-3">Testing theories</h3>
    <app-many-games-app
      v-if="isTheorySet"
      :trialNumber="Number(trialNumber)"
      :game="setCustGame"
      @initGame="resetGame"
    ></app-many-games-app>
    <div class="row" v-else>
      <div class="col-md-6 mb-3">
        <app-enter-trials-number @acceptTrialNumber="handleSetTheory"></app-enter-trials-number>
      </div>
      <div class="col-md-6">
        <label>
          Select the numbers to be tested by checking the box.
          <br />Then enter the number of spaces to win.
        </label>
        <div v-for="(item, i) in custGame" :key="i" class="d-flex mb-2">
          <div class="form-check form-check-inline">
            <input
              type="text"
              class="mr-2 form-control"
              v-model.number="item.spaces"
              :style="{ visibility: item.selected ? 'visible': 'hidden'}"
              style="width: 80px;"
              @keypress="handleCheckInput"
              @input="handleInput"
              :data-index="i"
            />
            <input
              type="checkbox"
              :id="item.diceSums"
              class="form-check-input"
              v-model="custGame[i].selected"
            />
            <label
              :for="item.diceSums"
              class="form-check-label"
              style="width: 20px;"
            >{{ item.diceSums }}</label>
          </div>
          <div class="d-flex" v-if="item.selected">
            <div v-for="num in item.spaces" :key="num + '-' + item.diceSums" class="app--count"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import EnterTrialsNumber from "../../common/EnterTrialsNumber.vue";
import ManyGamesApp from "./ManyGamesApp.vue";
import { custGame } from "./game";
export default {
  components: {
    appEnterTrialsNumber: EnterTrialsNumber,
    appManyGamesApp: ManyGamesApp
  },
  data: function() {
    return {
      trialNumber: null,
      options: [],
      custGame: null,
      isTheorySet: false,
      setCustGame: null
    };
  },
  computed: {
    setGame() {
      const setGame = [];
      for (let i = 0; i < this.custGame.length; i++) {
        if (
          this.custGame[i].selected &&
          this.custGame[i].spaces > 0 &&
          this.custGame[i].spaces <= 9
        ) {
          setGame.push(this.custGame[i]);
        }
      }
      return setGame;
    }
  },
  methods: {
    initGame() {
      this.custGame = _.cloneDeep(custGame);
    },
    resetGame() {
      this.setCustGame = _.cloneDeep(this.setGame);
    },
    handleCheckInput(e) {
      let { charCode } = e;
      if (!(charCode >= 49 && charCode <= 57) || !charCode) {
        e.preventDefault();
      }
    },
    handleInput(e) {
      // eslint-disable-next-line no-console
      // console.log(e.target.getAttribute("data-index"));
      // eslint-disable-next-line no-console
      // console.log(e);

      const index = e.target.getAttribute("data-index");
      if (!e.data) {
        this.custGame[index].spaces = 1;
      } else {
        const inputNum = Number(e.target.value[e.target.value.length - 1]);
        this.custGame[index].spaces = inputNum;
      }
    },
    handleSetTheory($event) {
      this.trialNumber = Number($event);
      if (this.setGame.length >= 2) {
        this.setCustGame = _.cloneDeep(this.setGame);
        this.isTheorySet = true;
      }
    }
  },
  created() {
    this.initGame();
  }
};
</script>

<style  scoped>
.app--count {
  width: 15px;
  background-color: orangered;
  margin-right: 2px;
}
</style>