<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>First Down the Mountain</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">First Down the Mountain</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-demonstration v-if="selectedOption === 1"></app-demonstration>
        <app-many-games v-if="selectedOption === 2"></app-many-games>
        <app-testing-theory v-if="selectedOption === 3"></app-testing-theory>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import Demonstration from "./Demonstration.vue";
import ManyGames from "./ManyGames.vue";
import TestingTheory from "./TestingTheory.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appDemonstration: Demonstration,
    appManyGames: ManyGames,
    appTestingTheory: TestingTheory
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Demonstration game"
        },
        {
          id: 2,
          title: "Play many games"
        },
        {
          id: 3,
          title: "Testing theories"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
