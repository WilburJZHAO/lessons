<template>
  <div>
    <div v-if="selectedOption === -1" style="margin-bottom: 5rem;">
      <app-title-static>Fraction Estimation</app-title-static>
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
          >Fraction Estimation</app-top-nav
        >
      </transition>

      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-fraction-strip v-if="selectedOption === 1"></app-fraction-strip>
        <app-fraction-tower v-if="selectedOption === 2"></app-fraction-tower>
        <app-fraction-pie v-if="selectedOption === 3"></app-fraction-pie>
        <app-fraction-number v-if="selectedOption === 4"></app-fraction-number>
        <app-percentage-area v-if="selectedOption === 5"></app-percentage-area>
        <app-decimal-area v-if="selectedOption === 6"></app-decimal-area>
        <app-percentage-number
          v-if="selectedOption === 7"
        ></app-percentage-number>
        <app-decimal-number v-if="selectedOption === 8"></app-decimal-number>
      </transition>
    </div>
    <!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
      <app-bottom-nav></app-bottom-nav>
    </transition> -->
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import DecimalArea from "./DecimalArea.vue";
import DecimalNumber from "./DecimalNumber.vue";
import FractionNumber from "./FractionNumber.vue";
import FractionPie from "./FractionPie.vue";
import FractionStrip from "./FractionStrip.vue";
import FractionTower from "./FractionTower.vue";
import PercentageArea from "./PercentageArea.vue";
import PercentageNumber from "./PercentageNumber.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appDecimalArea: DecimalArea,
    appDecimalNumber: DecimalNumber,
    appFractionNumber: FractionNumber,
    appFractionPie: FractionPie,
    appFractionStrip: FractionStrip,
    appFractionTower: FractionTower,
    appPercentageArea: PercentageArea,
    appPercentageNumber: PercentageNumber
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Fraction strip"
        },
        {
          id: 2,
          title: "Fraction tower"
        },
        {
          id: 3,
          title: "Fraction pie"
        },
        {
          id: 4,
          title: "Fraction number"
        },
        {
          id: 5,
          title: "Percentage area"
        },
        {
          id: 6,
          title: "Decimal area"
        },
        {
          id: 7,
          title: "Percentage number"
        },
        {
          id: 8,
          title: "Decimal number"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style></style>
