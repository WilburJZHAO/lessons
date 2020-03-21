<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Greedy Pig</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Greedy Pig</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-demonstration v-if="selectedOption === 1" :killerDice="killerDice"></app-demonstration>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-testing-theories v-if="selectedOption === 2" :killerDice="killerDice"></app-testing-theories>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-comparing-strategies v-if="selectedOption === 3" :killerDice="killerDice"></app-comparing-strategies>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-change-killer
          v-if="selectedOption === 4"
          :killerDice="killerDice"
          @setKiller="
            killerDice = $event;
            selectedOption = -1;
          "
        ></app-change-killer>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import Demonstration from "./Demonstration.vue";
import ChangeKiller from "./ChangeKiller.vue";
import ComparingStrategies from "./ComparingStrategies.vue";
import TestingTheories from "./TestingTheories.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appChangeKiller: ChangeKiller,
    appDemonstration: Demonstration,
    appComparingStrategies: ComparingStrategies,
    appTestingTheories: TestingTheories
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
          title: "Testing theories"
        },
        {
          id: 3,
          title: "Comparing strategies"
        },
        {
          id: 4,
          title: "Change the killer dice"
        }
      ],
      selectedOption: -1,
      killerDice: 2
    };
  }
};
</script>

<style>
</style>
