<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Protons And Anti-protons</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Protons And Anti-protons</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-auto-appear v-if="selectedOption === 1"></app-auto-appear>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-construct-and-solve v-if="selectedOption === 2"></app-construct-and-solve>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-proton-tables v-if="selectedOption === 3"></app-proton-tables>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import AutoAppear from "./AutoAppear.vue";
import ConstructAndSolve from "./ConstructAndSolve.vue";
import ProtonTables from "./ProtonTables.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appAutoAppear: AutoAppear,
    appConstructAndSolve: ConstructAndSolve,
    appProtonTables: ProtonTables
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Auto appear"
        },
        {
          id: 2,
          title: "Construct and solve"
        },
        {
          id: 3,
          title: "Proton and anti-proton tables"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
