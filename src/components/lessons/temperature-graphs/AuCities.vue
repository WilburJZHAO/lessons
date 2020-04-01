<template>
  <div class="container mt-3">
    <h3 class="text-success text-center">Australian capital cities</h3>
    <app-graph :selectedCities="auCapitalCities" :temperatureType="'fahren'"></app-graph>
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
      status: 0
    };
  },
  methods: {},
  created() {
    this.auCapitalCities = this.appData.data.filter(
      data => data.auCapitalCity === true
    );
  }
};
</script>

<style scoped></style>
