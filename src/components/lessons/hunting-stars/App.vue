<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Hunting for Stars</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Hunting for Stars</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-hunting-for-stars v-if="selectedOption === 1"></app-hunting-for-stars>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import HuntingForStars from "./HuntingForStars.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appHuntingForStars: HuntingForStars
  },
  data: function() {
    return {
      options: [{ id: 1, title: "Hunting for Stars" }],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
