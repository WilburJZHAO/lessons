<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>What's My Rule</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">What's My Rule</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-whats-my-rule v-if="selectedOption === 1"></app-whats-my-rule>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import WhatsMyRule from "./WhatsMyRule.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appWhatsMyRule: WhatsMyRule
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Start what's my rule"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
