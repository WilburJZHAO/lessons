<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Maths of Lotto</app-title-static>
      <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
        <app-options :options="options" @selectOption="selectedOption = $event"></app-options>
      </transition>
    </div>
    <div class="container-fluid" v-else>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-top-nav @backToMenu="selectedOption = $event">Maths Of Lotto</app-top-nav>
      </transition>

      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-lotto v-if="selectedOption === 1" :settings="settings"></app-play-lotto>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-multiple-games v-if="selectedOption === 2" :settings="settings"></app-play-multiple-games>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-is-equal-group v-if="selectedOption === 3" :settings="settings"></app-is-equal-group>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-choose-games v-if="selectedOption === 4" :settings="settings"></app-choose-games>
      </transition>
      <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
        <app-play-lotto-45 v-if="selectedOption === 5"></app-play-lotto-45>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import PlayLotto from "./PlayLotto.vue";
import ChooseGames from "./ChooseGames.vue";
import IsEqualGroup from "./IsEqualGroup.vue";
import PlayLotto45 from "./PlayLotto45.vue";
import PlayMultipleGames from "./PlayMultipleGames.vue";
import { settings } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appPlayLotto: PlayLotto,
    appChooseGames: ChooseGames,
    appIsEqualGroup: IsEqualGroup,
    appPlayLotto45: PlayLotto45,
    appPlayMultipleGames: PlayMultipleGames
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Play lotto"
        },
        {
          id: 2,
          title: "Play multiple games"
        },
        {
          id: 3,
          title: "Is each group equally likely?"
        },
        {
          id: 4,
          title: "Choose other games"
        },
        {
          id: 5,
          title: "Play 45:6 lotto"
        }
      ],
      selectedOption: -1,
      settings
    };
  }
};
</script>

<style>
</style>
