<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Square Pairs</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Square Pairs</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-find-solution v-if="selectedOption === 1"></app-find-solution>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-computer-pathway v-if="selectedOption === 2"></app-computer-pathway>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import FindSolution from "./FindSolution.vue";
import ComputerPathway from "./ComputerPathway.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appFindSolution: FindSolution,
    appComputerPathway: ComputerPathway
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Find a solution"
        },
        {
          id: 2,
          title: "Computer finds a pathway"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
