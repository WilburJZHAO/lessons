<template>
  <div>
    <div v-if="selectedOption===-1">
      <app-title-static>Walk the Plank</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Walk the Plank</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-demo-game v-if="selectedOption === 1"></app-demo-game>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-several-games v-if="selectedOption === 2"></app-several-games>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-many-games v-if="selectedOption === 3"></app-many-games>
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
import DemoGame from "./DemoGame.vue";
import ManyGames from "./ManyGames.vue";
import SeveralGames from "./SeveralGames.vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appDemoGame: DemoGame,
    appManyGames: ManyGames,
    appSeveralGames: SeveralGames
  },
  data: function() {
    return {
      options: [
        { id: 1, title: "Demonstration game: Plank length five each way" },
        { id: 2, title: "Several games slow: Plank length five each way" },
        { id: 3, title: "Many games fast: Change the plank length" }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
