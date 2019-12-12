<template>
  <div>
    <div v-if="selectedOption === -1">
      <app-title-static>Number Partitions</app-title-static>
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
          >Number Partitions</app-top-nav
        >
      </transition>

      <transition
        appear
        appear-class="lesson-appear"
        appear-active-class="lesson-appear-active"
      >
        <app-show-partitions v-if="selectedOption === 1"></app-show-partitions>
        <app-calculate-partitions
          v-if="selectedOption === 2"
        ></app-calculate-partitions>
        <app-table-of-partitions
          v-if="selectedOption === 3"
        ></app-table-of-partitions>
      </transition>
    </div>
  </div>
</template>

<script>
import TitleStatic from "../../layout/TitleStatic.vue";
import TopNav from "../../layout/TopNav.vue";
import Options from "../../layout/Options.vue";
import ShowPartitions from "./ShowPartitions.vue";
import CalculatePartitions from "./CalculatePartitions.vue";
import TableOfPartitions from "./TableOfPartitions.vue";
export default {
  components: {
    appTitleStatic: TitleStatic,
    appTopNav: TopNav,
    appOptions: Options,
    appShowPartitions: ShowPartitions,
    appCalculatePartitions: CalculatePartitions,
    appTableOfPartitions: TableOfPartitions
  },
  data: function() {
    return {
      options: [
        {
          id: 1,
          title: "Show number partitions"
        },
        {
          id: 2,
          title: "Calculate the number of partitions"
        },
        {
          id: 3,
          title: "Table of number partitions"
        }
      ],
      selectedOption: -1
    };
  }
};
</script>

<style></style>
