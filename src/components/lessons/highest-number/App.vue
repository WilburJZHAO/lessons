<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Highest Number</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Highest Number</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-2-digit-game v-if="selectedOption === 1"></app-play-2-digit-game>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-3-digit-game v-if="selectedOption === 2"></app-play-3-digit-game>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-demonstration v-if="selectedOption === 3" :strategies="strategies"></app-demonstration>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-many-games v-if="selectedOption === 4" :strategies="strategies"></app-play-many-games>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-compare-two-choices v-if="selectedOption === 5"></app-compare-two-choices>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-enter-strategy
          v-if="selectedOption === 6"
          :strategies="strategies"
          @clearStrategy="handleClearStrategy"
        ></app-enter-strategy>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import BottomNav from "../../layout/BottomNav.vue";
import Options from "../../layout/Options.vue";
import CompareTwoChoices from "./CompareTwoChoices.vue";
import Demonstration from "./Demonstration.vue";
import EnterStrategy from "./EnterStrategy.vue";
import Play2DigitGame from "./Play2DigitGame.vue";
import Play3DigitGame from "./Play3DigitGame.vue";
import PlayManyGames from "./PlayManyGames.vue";
import { randomStrategy } from "./utils";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appCompareTwoChoices: CompareTwoChoices,
    appDemonstration: Demonstration,
    appEnterStrategy: EnterStrategy,
    appPlay2DigitGame: Play2DigitGame,
    appPlay3DigitGame: Play3DigitGame,
    appPlayManyGames: PlayManyGames
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Play 2 digit game"
        },
        {
          id: 2,
          title: "Play 3 digit game"
        },
        {
          id: 3,
          title: "Demonstration"
        },
        {
          id: 4,
          title: "Play many games fast"
        },
        {
          id: 5,
          title: "Comparing two choices"
        },
        {
          id: 6,
          title: "Enter a strategy for testing"
        }
      ],
      selectedOption: -1,
      strategies: [
        {
          id: 1,
          name: "Random Strategy",
          strategy: randomStrategy
        }
      ]
    };
  },
  methods: {
    handleClearStrategy() {
      this.strategies = [
        {
          id: 1,
          name: "Random Strategy",
          strategy: randomStrategy
        }
      ];
    }
  },
  created() {
    this.strategies =
      JSON.parse(localStorage.getItem("appStrategies")) || this.strategies;
    localStorage.setItem("appStrategies", JSON.stringify(this.strategies));
  }
};
</script>

<style>
</style>
