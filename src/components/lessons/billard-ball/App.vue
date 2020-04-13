<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Billiard Ball Bounces</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Billiard Ball Bounces</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-billard-ball v-if="selectedOption === 1"></app-billard-ball>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import BillardBall from "./BillardBall.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appBillardBall: BillardBall
  },
  data: function() {
    return {
      options: [{ id: 1, title: "Billiard Ball Bounces" }],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
