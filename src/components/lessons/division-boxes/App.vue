<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Division Boxes</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Division Boxes</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-division-box-testing v-if="selectedOption === 1"></app-division-box-testing>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-test-2-digit-numbers v-if="selectedOption === 2"></app-test-2-digit-numbers>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-test-all-numbers v-if="selectedOption === 3"></app-test-all-numbers>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import DivisionBoxTesting from "./DivisionBoxTesting.vue";
import Test2DigitNumbers from "./Test2DigitNumbers.vue";
import TestAllNumbers from "./TestAllNumbers.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appDivisionBoxTesting: DivisionBoxTesting,
    appTest2DigitNumbers: Test2DigitNumbers,
    appTestAllNumbers: TestAllNumbers
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Test a number"
        },
        {
          id: 2,
          title: "Test systematically for all solutions"
        },
        {
          id: 3,
          title: "Test systematically (repeated digits allowed)"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
