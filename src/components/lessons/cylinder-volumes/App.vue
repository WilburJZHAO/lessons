<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Cylinder Volumes</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Cylinder Volumes</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-tall-squat-cylinders v-if="selectedOption === 1"></app-tall-squat-cylinders>
        <app-find-maximum v-if="selectedOption === 2"></app-find-maximum>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import TallSquatCylinders from "./TallSquatCylinders.vue";
import FindMaximum from "./FindMaximum.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appTallSquatCylinders: TallSquatCylinders,
    appFindMaximum: FindMaximum
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Tall and squat cylinders"
        },
        {
          id: 2,
          title: "Finding the maximum volume"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
