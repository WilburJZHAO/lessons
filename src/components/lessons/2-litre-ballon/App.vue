<template>
  <div>
    <div v-if="selectedOption===-1">
      <app-title-static>2 Litre Balloon</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">2 Litre Balloon</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-enter-data v-if="selectedOption === 1"></app-enter-data>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-display-data v-if="selectedOption === 2"></app-display-data>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
// import BottomNav from "../../layout/BottomNav.vue";
import Options from "../../layout/Options.vue";
import EnterData from "./EnterData.vue";
import DisplayData from "./DisplayData.vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    // appBottomNav: BottomNav,
    appEnterData: EnterData,
    appDisplayData: DisplayData
  },
  data: function() {
    return {
      options: [
        { id: 1, title: "Enter diameter, radius, circumference or volume" },
        { id: 2, title: "Gathering and displaying balloon data" }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
