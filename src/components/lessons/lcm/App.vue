<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Natalie's LCM Task</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Natalie's LCM Task</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-find-pairs v-if="selectedOption === 1"></app-find-pairs>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-find-lcm v-if="selectedOption === 2"></app-find-lcm>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import FindLcm from "./FindLcm.vue";
import FindPairs from "./FindPairs.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appFindLcm: FindLcm,
    appFindPairs: FindPairs
  },
  data: function() {
    return {
      options: [
        { id: 1, title: "Find pairs of numbers for a given LCM" },
        { id: 2, title: "Find the LCM" }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style></style>
