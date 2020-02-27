<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Win At The Fair</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Win At The Fair</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-demonstration v-if="selectedOption === 1" :values="values" :rules="rules"></app-demonstration>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-run-trials v-if="selectedOption === 2" :values="values" :rules="rules"></app-run-trials>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-change-rules
          v-if="selectedOption === 3"
          :values="values"
          :rules="rules"
          @changeSettings="handleChangeSettings"
        ></app-change-rules>
      </transition>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import Demonstration from "./Demonstration.vue";
import RunTrials from "./RunTrials.vue";
import ChangeRules from "./ChangeRules.vue";
import { values, rules } from "./utils";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appDemonstration: Demonstration,
    appRunTrials: RunTrials,
    appChangeRules: ChangeRules
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
          title: "Run some trials"
        },
        {
          id: 3,
          title: "Change prize values and rules"
        }
      ],
      selectedOption: -1,
      values: null,
      rules: null
    };
  },
  methods: {
    handleChangeSettings(e) {
      this.selectedOption = -1;
      this.values = _.cloneDeep(e.myValues);
      this.rules = _.cloneDeep(e.myRules);
    }
  },
  created() {
    this.values = _.cloneDeep(values);
    this.rules = _.cloneDeep(rules);
  }
};
</script>

<style>
</style>
