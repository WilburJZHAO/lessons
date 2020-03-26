
<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Bob's Buttons</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Bob's Buttons</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-demonstration v-if="selectedOption === 1"></app-demonstration>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-solve-problem v-if="selectedOption === 2"></app-solve-problem>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-computer-solutions v-if="selectedOption === 3"></app-computer-solutions>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import ComputerSolutions from "./ComputerSolutions.vue";
import Demonstration from "./Demonstration.vue";
import SolveProblem from "./SolveProblem.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appComputerSolutions: ComputerSolutions,
    appDemonstration: Demonstration,
    appSolveProblem: SolveProblem
  },
  data: function() {
    return {
      options: [
        { id: 1, title: "Demonstration" },
        { id: 2, title: "Solve a problem" },
        { id: 3, title: "Computer solutions" }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>