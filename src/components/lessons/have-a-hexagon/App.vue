<template>
  <div>
    <div v-if="selectedOption===-1">
      <app-title-static>Have a Hexagon</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Have a Hexagon</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-game v-if="selectedOption === 1" :hexSetting="hexSetting"></app-play-game>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-many-games v-if="selectedOption === 2" :hexSetting="hexSetting"></app-play-many-games>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-number-occurs v-if="selectedOption === 3"></app-number-occurs>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-make-your-own
          v-if="selectedOption === 4"
          :hexSetting="hexSetting"
          @backToMenu="selectedOption=$event"
          @setHexSetting="hexSetting=$event"
        ></app-make-your-own>
      </transition>
    </div>
    <!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
			<app-bottom-nav></app-bottom-nav> 
    </transition>-->
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import PlayGame from "./PlayGame.vue";
import PlayManyGames from "./PlayManyGames.vue";
import NumberOccurs from "./NumberOccurs.vue";
import MakeYourOwn from "./MakeYourOwn.vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appPlayGame: PlayGame,
    appPlayManyGames: PlayManyGames,
    appNumberOccurs: NumberOccurs,
    appMakeYourOwn: MakeYourOwn
  },
  data: function() {
    return {
      options: [
        { id: 1, title: "Play the game" },
        { id: 2, title: "Play many games" },
        { id: 3, title: "The number of times each product occurs" },
        { id: 4, title: "Make your own hexagon" }
      ],
      selectedOption: -1,
      hexSetting: [
        [8, 9, 10, 12, 15, 16],
        [1, 2, 3, 4, 5, 6],
        [18, 20, 24, 25, 30, 36]
      ]
    };
  }
};
</script>

<style>
</style>
