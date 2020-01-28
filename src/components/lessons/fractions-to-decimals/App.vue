<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Fractions To Decimals</app-title-static>
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
          >Fractions To Decimals</app-top-nav
        >
      </transition>

      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-create-rope v-if="selectedOption === 1"></app-create-rope>
        <app-fractions-to-decimals
          v-if="selectedOption === 2"
        ></app-fractions-to-decimals>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import CreateRope from "./CreateRope.vue";
import FractionsToDecimals from "./FractionsToDecimals.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appCreateRope: CreateRope,
    appFractionsToDecimals: FractionsToDecimals
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Create a decimal rope"
        },
        {
          id: 2,
          title: "Fractions to decimals"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style></style>
