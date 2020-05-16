<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Change the selection rules</h3>
    <hr class="subheading-speartor" />
    <div class="row">
      <div class="col-5 col-sm-4">
        <h6 class="text-primary">Choose the number of players in the team</h6>
        <div class="form-check" v-for="num in MAX_TEAM_PLAYERS" :key="`team${num}`">
          <input
            type="radio"
            class="form-check-input"
            v-if="num > 1"
            v-model.number="myRule.teamPlayers"
            :value="num"
            :id="`team${num}`"
          />
          <label :for="`team${num}`" class="form-check-label" v-if="num > 1">{{ num }} players</label>
        </div>
      </div>
      <div class="col-5 col-sm-4">
        <h6 class="text-primary">Choose the number of players in the mini clinic</h6>
        <div class="form-check" v-for="num in maxClinicPlayers" :key="`clinic${num}`">
          <input
            type="radio"
            class="form-check-input"
            v-model.number="myRule.clinicPlayers"
            :value="num"
            :id="`clinic${num}`"
          />
          <label :for="`clinic${num}`" class="form-check-label">{{ num }} players</label>
        </div>
      </div>
      <div class="col-2 col-sm-4">
        <h6 class="text-primary">Choose the winning cards</h6>
        <div v-if="maxWinningCardsForSelection > 1">
          <div class="form-check" v-for="num in maxWinningCards" :key="`card${num}`">
            <input
              type="checkbox"
              class="form-check-input"
              v-model.number="myRule.winningCards"
              :value="num"
              :id="`card${num}`"
              :disabled="
              (selectedWinningCards >= maxWinningCardsForSelection &&
                myRule.winningCards.indexOf(num) === -1) ||
                (selectedWinningCards === 1 &&
                  myRule.winningCards.indexOf(num) !== -1)
            "
            />
            <label :for="`card${num}`" class="form-check-label">{{ num }}</label>
          </div>
        </div>
        <div v-if="maxWinningCardsForSelection === 1">
          <div class="form-check" v-for="num in maxWinningCards" :key="`card${num}`">
            <input
              type="radio"
              class="form-check-input"
              v-model="winningCard"
              :value="num"
              :id="`card${num}`"
            />
            <label :for="`card${num}`" class="form-check-label">{{ num }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center my-2">
      <input type="checkbox" v-model="myRule.allToWin" id="all-to-win" />
      <label for="all-to-win">All cards to win</label>
    </div>
    <div
      class="text-center text-danger my-3"
    >Select the number of players, the mini clinic size and the winning cards</div>
    <div class="text-center">
      <button class="btn btn-outline-success" @click="handleOk">OK</button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: ["rule"],
  data: function() {
    return {
      MAX_TEAM_PLAYERS: 13,
      maxClinicPlayers: null,
      maxWinningCards: null,
      maxWinningCardsForSelection: null,
      myRule: null,
      winningCard: 1
    };
  },
  computed: {
    selectedWinningCards() {
      return this.myRule.winningCards.length;
    }
  },
  watch: {
    winningCard(value) {
      this.myRule.winningCards = [value];
    },
    "myRule.teamPlayers"(value, prevValue) {
      if (prevValue && value !== prevValue) {
        this.maxClinicPlayers = this.myRule.teamPlayers - 1;
        this.maxWinningCards = this.myRule.teamPlayers - 1;
        this.myRule.clinicPlayers = 1;
        this.myRule.winningCards = [1];
      }
    },
    "myRule.clinicPlayers"(value, prevValue) {
      if (prevValue && value !== prevValue) {
        this.maxWinningCardsForSelection = this.myRule.clinicPlayers;
        if (this.selectedWinningCards > this.maxWinningCardsForSelection) {
          this.myRule.winningCards = [1];
        }
      }
    }
  },
  methods: {
    handleOk() {
      this.$emit("setRule", this.myRule);
    }
  },
  created() {
    this.myRule = _.cloneDeep(this.rule);
    this.maxClinicPlayers = this.myRule.teamPlayers - 1;
    this.maxWinningCards = this.myRule.teamPlayers - 1;
    this.maxWinningCardsForSelection = this.myRule.clinicPlayers;
  }
};
</script>

<style scoped></style>
