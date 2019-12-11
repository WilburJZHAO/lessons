<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Goods and Bads</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Goods and Bads</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-level1 v-if="selectedOption === 1"></app-level1>
        <app-level2 v-if="selectedOption === 2"></app-level2>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import Level1 from "./Level1.vue";
import Level2 from "./Level2.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appLevel1: Level1,
    appLevel2: Level2
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Level 1"
        },
        {
          id: 2,
          title: "Level 2"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style>
</style>
