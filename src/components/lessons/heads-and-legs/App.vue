<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Heads and Legs</app-title-static>
      <transition
        appear
        appear-class="options-appear"
        appear-active-class="options-appear-active"
      >
        <app-options
          :options="options"
          @selectOption="selectedOption = $event"
        ></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-top-nav @backToMenu="selectedOption = $event"
          >Heads and Legs</app-top-nav
        >
      </transition>

      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-how-many v-if="selectedOption === 1"></app-how-many>
        <app-problems v-if="selectedOption === 2"></app-problems>
        <app-strategies1 v-if="selectedOption === 3"></app-strategies1>
        <app-strategies2 v-if="selectedOption === 4"></app-strategies2>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import HowMany from "./HowMany.vue";
import Problems from "./Problems.vue";
import Strategies1 from "./Strategies1.vue";
import Strategies2 from "./Strategies2.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appHowMany: HowMany,
    appProblems: Problems,
    appStrategies1: Strategies1,
    appStrategies2: Strategies2
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "How many pigs and chickens in the field?"
        },
        {
          id: 2,
          title: "Heads and legs problems"
        },
        {
          id: 3,
          title: "Focus on strategies: 20-100 heads"
        },
        {
          id: 4,
          title: "Focus on strategies: 100-1000 heads"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style></style>
