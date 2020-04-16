<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Australian capital cities</h3>
    <hr class="subheading-separator">
    <app-graph :selectedCities="auCapitalCities" :temperatureType="'fahren'"></app-graph>

    <div
      class="text-success text-center"
      v-if="showMessage"
    >To print, press Control+P (Windows & Chromebooks) or Command+P (Macintosh)</div>
  </div>
</template>

<script>
import _ from "lodash";
import Graph from "./Graph.vue";
export default {
  components: {
    appGraph: Graph
  },
  props: ["appData"],
  data: function() {
    return {
      auCapitalCities: [],
      status: 0,
      showMessage: true
    };
  },
  methods: {},
  created() {
    this.auCapitalCities = this.appData.data.filter(
      data => data.auCapitalCity === true
    );
  },
  mounted() {
    window.addEventListener("beforeprint", () => {
      this.showMessage = false;
    });
    window.addEventListener("afterprint", () => {
      this.showMessage = true;
    });
  }
};
</script>

<style scoped></style>
