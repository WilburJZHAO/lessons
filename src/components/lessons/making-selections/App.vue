<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Making Selections</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Making Selections</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-make-a-selection v-if="selectedOption === 1" :rule="rule"></app-make-a-selection>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-make-many-selections v-if="selectedOption === 2" :rule="rule"></app-make-many-selections>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-change-rules v-if="selectedOption === 3" :rule="rule" @setRule="handleSetRule($event)"></app-change-rules>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-expanding-rules v-if="selectedOption === 4"></app-expanding-rules>
      </transition>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import MakeASelection from "./MakeASelection.vue";
import MakeManySelections from "./MakeManySelections.vue";
import ChangeRules from "./ChangeRules.vue";
import ExpandingRules from "./ExpandingRules.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appMakeASelection: MakeASelection,
    appMakeManySelections: MakeManySelections,
    appChangeRules: ChangeRules,
    appExpandingRules: ExpandingRules
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Make a selection"
        },
        {
          id: 2,
          title: "Make many selections"
        },
        {
          id: 3,
          title: "Change the selection rules"
        },
        {
          id: 4,
          title: "Expanding the selection rules"
        }
      ],
      selectedOption: -1,
      rule: {
        teamPlayers: 7,
        clinicPlayers: 3,
        winningCards: [1, 2],
        allToWin: false
      }
    };
  },
  methods: {
    handleSetRule(e) {
      console.log(e);
      this.rule = _.cloneDeep(e);
      this.selectedOption = -1;
    }
  }
};
</script>

<style>
</style>
