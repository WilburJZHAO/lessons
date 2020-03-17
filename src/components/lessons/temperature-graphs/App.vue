<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Temperature Graphs</app-title-static>
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
          >Temperature Graphs</app-top-nav
        >
      </transition>

      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-pick-cities
          v-if="selectedOption === 1"
          :appData="appData"
        ></app-pick-cities>
      </transition>
      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-edit-data
          v-if="selectedOption === 2"
          :appData="appData"
        ></app-edit-data>
      </transition>
      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-au-cities
          v-if="selectedOption === 3"
          :appData="appData"
        ></app-au-cities>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import BottomNav from "../../layout/BottomNav.vue";
import Options from "../../layout/Options.vue";
import AuCities from "./AuCities.vue";
import EditData from "./EditData.vue";
import PickCities from "./PickCities.vue";
import data from "./data.json";

export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appAuCities: AuCities,
    appEditData: EditData,
    appPickCities: PickCities
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Pick your own cities"
        },
        {
          id: 2,
          title: "Edit or add to city data"
        },
        {
          id: 3,
          title: "Australian capital cities"
        }
      ],
      selectedOption: -1,
      appData: null
    };
  },
  created() {
    this.appData = JSON.parse(localStorage.getItem("appData")) || data;
    // console.log(this.appData);
    localStorage.setItem("appData", JSON.stringify(this.appData));
  }
};
</script>

<style></style>
