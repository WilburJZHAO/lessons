<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Game of 31</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Game of 31</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-two-players v-if="selectedOption === 1" :settings="settings"></app-two-players>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-beat-computer v-if="selectedOption === 2" :settings="settings"></app-beat-computer>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-change-total-and-cards
          v-if="selectedOption === 3"
          :settings="settings"
          @changeSettings="handleChangeSettings"
        ></app-change-total-and-cards>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-computer-challenge v-if="selectedOption === 4" :settings="settings"></app-computer-challenge>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-lotto-45 v-if="selectedOption === 5"></app-play-lotto-45>
      </transition>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import TwoPlayers from "./TwoPlayers.vue";
import BeatComputer from "./BeatComputer.vue";
import ChangeTotalAndCards from "./ChangeTotalAndCards.vue";
import ComputerChallenge from "./ComputerChallenge.vue";
import { settings } from "./utils";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appTwoPlayers: TwoPlayers,
    appBeatComputer: BeatComputer,
    appChangeTotalAndCards: ChangeTotalAndCards,
    appComputerChallenge: ComputerChallenge
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Two players"
        },
        {
          id: 2,
          title: "Try to beat the computer"
        },
        {
          id: 3,
          title: "Change the target total and the number of cards"
        },
        {
          id: 4,
          title: "Computer challenges"
        }
      ],
      selectedOption: -1,
      settings
    };
  },
  methods: {
    handleChangeSettings($e) {
      this.selectedOption = -1;
      this.settings = _.cloneDeep($e);
    }
  }
};
</script>

<style>
</style>
