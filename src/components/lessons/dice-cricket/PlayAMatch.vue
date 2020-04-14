<template>
  <div class="mt-3 mb-5">
    <h3 class="lesson-subheading">Play a match</h3>
    <hr class="subheading-separator">
    <app-play-a-match-app v-if="matchSetting" :matchSetting="matchSetting"></app-play-a-match-app>
    <app-set-match v-else @setMatch="matchSetting=$event"></app-set-match>
  </div>
</template>

<script>
import SetMatch from "./SetMatch.vue";
import PlayAMatchApp from "./PlayAMatchApp.vue";

export default {
  components: {
    appSetMatch: SetMatch,
    appPlayAMatchApp: PlayAMatchApp
  },
  data: function() {
    return {
      matchSetting: null
    };
  }
};
</script>

<style scoped>
</style>
