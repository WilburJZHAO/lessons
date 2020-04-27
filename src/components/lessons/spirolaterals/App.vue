<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Spirolaterals</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Spirolaterals</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-draw-a-spirolateral v-if="selectedOption === 1"></app-draw-a-spirolateral>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-order-3-spirolaterals v-if="selectedOption === 2"></app-order-3-spirolaterals>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import DrawASpirolateral from "./DrawASpirolateral.vue";
import Order3Spirolaterals from "./Order3Spirolaterals.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appDrawASpirolateral: DrawASpirolateral,
    appOrder3Spirolaterals: Order3Spirolaterals
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Draw a Spirolateral"
        },
        {
          id: 2,
          title: "Order 3 Spirolaterals"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
