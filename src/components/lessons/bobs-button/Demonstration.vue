<template>
  <div class="container">
    <h3 class="text-center text-success my-3">Demonstration</h3>
    <div class="row">
      <div class="col-md-6 col-lg-4">
        <div v-if="gameStatus === 0">
          <h5 class="text-cent">Number of counters</h5>
          <div class="d-flex mb-3">
            <input type="number" v-model.number="inputCountersNumber" class="form-control mr-4" />
            <div class="text-center">
              <button
                class="btn btn-outline-success"
                :disabled="
                  !(inputCountersNumber >= 2 && inputCountersNumber <= 100)
                "
                @click="handleInputCountersNumber"
              >OK</button>
            </div>
          </div>
        </div>

        <div v-if="gameStatus === 1">
          <h5>{{ inputCountersNumber }} counters</h5>
          <label for>Enter group size</label>
          <div class="d-flex mb-3">
            <input type="number" v-model.number="inputGroupSize" class="form-control mr-4" />
            <div class="text-center">
              <button
                class="btn btn-outline-success"
                :disabled="
                  !(
                    inputGroupSize >= 1 && inputGroupSize <= inputCountersNumber
                  )
                "
                @click="handleInputGroupSize"
              >OK</button>
            </div>
          </div>
        </div>

        <div v-if="gameStatus === 2 || gameStatus === 3">
          <h5>{{ inputCountersNumber }} counters</h5>
          <h5>Group size is {{ groupSize }}</h5>
          <h5 class="text-danger" v-if="groups > 0">
            {{ groups }} group{{ groups > 1 ? "s" : "" }} of {{ groupSize }} +
            {{ countersNumber }}
          </h5>
          <h5 v-if="gameStatus===3">{{ countersNumber }} counter{{countersNumber > 1 ? 's' : ''}} left</h5>
        </div>

        <app-buttons-container :countersNumber="countersNumber"></app-buttons-container>

        <div class="text-center mt-3" v-if="gameStatus === 2">
          <button
            class="btn btn-outline-success"
            @click="handleGroupButtons"
          >Show {{ groups > 0 ? "next" : "first" }} group</button>
        </div>

        <div class="text-center mt-3" v-if="gameStatus === 3">
          <button class="btn btn-outline-success" @click="handleReset">Reset</button>
        </div>
      </div>
      <div
        class="col-md-6 col-lg-8 app--buttons-group-box"
        v-if="gameStatus === 2 || gameStatus === 3"
        :style="{
          'grid-template-columns':
            'repeat(auto-fill, minmax(' + gridColWidth + 'rem, 1fr))'
        }"
      >
        <app-buttons-group
          v-for="group in groups"
          :key="group"
          :buttonsNumber="groupSize"
          class="m-1"
        ></app-buttons-group>
      </div>
    </div>
    <div class="alert alert-danger text-center mt-3" v-if="gameStatus != 2">
      <span v-if="gameStatus === 0">Enter a number between 2 and 100</span>
      <span v-if="gameStatus === 1">Enter a number between 1 and {{ countersNumber }}</span>
      <span v-if="gameStatus === 3">Finished</span>
    </div>
  </div>
</template>

<script>
import ButtonsContainer from "./ButtonsContainer";
import ButtonsGroup from "./ButtonsGroup";
export default {
  components: {
    appButtonsContainer: ButtonsContainer,
    appButtonsGroup: ButtonsGroup
  },
  data: function() {
    return {
      gameStatus: 0,
      // 0 - waiting for inputing counters number
      // 1 - waiting for inputing group size
      // 2 - Wait for displaying group
      // 3 - game ends
      inputCountersNumber: null,
      countersNumber: null,
      inputGroupSize: null,
      groupSize: null,
      groups: 0
    };
  },
  computed: {
    gridColWidth() {
      if (this.groupSize <= 6) {
        return 7;
      } else if (this.groupSize <= 10) {
        return 12;
      } else {
        return 20;
      }
    }
  },
  watch: {
    groups(value, prevValue) {
      if (value !== prevValue) {
        this.countersNumber = this.inputCountersNumber - value * this.groupSize;
      }
    },
    countersNumber(value) {
      if (value < this.groupSize) {
        this.gameStatus = 3;
      }
    }
  },
  methods: {
    handleInputCountersNumber() {
      this.countersNumber = this.inputCountersNumber;
      this.gameStatus = 1;
    },
    handleInputGroupSize() {
      this.groupSize = this.inputGroupSize;
      this.gameStatus = 2;
    },

    handleGroupButtons() {
      this.groups++;
    },

    handleReset() {
      this.gameStatus = 0;
      this.inputCountersNumber = null;
      this.countersNumber = null;
      this.inputGroupSize = null;
      this.groupSize = null;
      this.groups = 0;
    }
  }
};
</script>

<style scoped>
.app--buttons-group-box {
  display: grid;
}
</style>
