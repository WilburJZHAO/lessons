<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Snakes and Ladders</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Snakes and Ladders</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-a-game v-if="selectedOption === 1" :boardSettings="boardSettings"></app-play-a-game>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-many-games v-if="selectedOption === 2" :boardSettings="boardSettings"></app-play-many-games>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-print-board v-if="selectedOption === 3" :boardSettings="boardSettings"></app-print-board>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-change-board
          v-if="selectedOption === 4"
          :boardSettings="boardSettings"
          @changeBoardSettings="boardSettings=$event"
        ></app-change-board>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-landing-chance v-if="selectedOption === 5" :boardSettings="boardSettings"></app-landing-chance>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import PlayAGame from "./PlayAGame.vue";
import PlayManyGames from "./PlayManyGames.vue";
import PrintBoard from "./PrintBoard.vue";
import ChangeBoard from "./ChangeBoard.vue";
import LandingChance from "./LandingChance.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appPlayAGame: PlayAGame,
    appPlayManyGames: PlayManyGames,
    appPrintBoard: PrintBoard,
    appChangeBoard: ChangeBoard,
    appLandingChance: LandingChance
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Play a game"
        },
        {
          id: 2,
          title: "Play many games"
        },
        {
          id: 3,
          title: "Print the board"
        },
        {
          id: 4,
          title: "Change the board"
        },
        {
          id: 5,
          title: "What is the chance of landing on any square?"
        }
      ],
      selectedOption: -1,
      boardSettings: {
        columns: 7,
        rows: 7,
        snakes: [
          { from: 46, to: 4 },
          { from: 35, to: 19 }
        ],
        ladders: [
          { from: 15, to: 39 },
          { from: 8, to: 25 }
        ]
      }
    };
  }
};
</script>

<style>
</style>
