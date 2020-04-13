<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Cracked Tiles</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Cracked Tiles</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-cracked-tiles v-if="selectedOption === 1"></app-cracked-tiles>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import CrackedTiles from "./CrackedTiles.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appCrackedTiles: CrackedTiles
  },
  data: function() {
    return {
      options: [{ id: 1, title: "Cracked Tiles" }],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
