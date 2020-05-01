<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Knight's Tour</app-title-static>
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
          >Knight's Tour</app-top-nav
        >
      </transition>

      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-play-game v-if="selectedOption === 1"></app-play-game>
      </transition>
      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-explore-strategies
          v-if="selectedOption === 2"
        ></app-explore-strategies>
      </transition>
      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-many-trials v-if="selectedOption === 3"></app-many-trials>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import PlayGame from "./PlayGame.vue";
import ExploreStrategies from "./ExploreStrategies.vue";
import ManyTrials from "./ManyTrials.vue";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appPlayGame: PlayGame,
    appExploreStrategies: ExploreStrategies,
    appManyTrials: ManyTrials,
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Play the game",
        },
        {
          id: 2,
          title: "Exploring strategies",
        },
        {
          id: 3,
          title: "Many trials",
        },
      ],
      selectedOption: -1,
    };
  },
};
</script>

<style></style>
